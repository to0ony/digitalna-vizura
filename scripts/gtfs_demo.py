# Generira src/data/brcko.js iz raspakiranog GTFS feeda.
# Upotreba: python scripts/gtfs_demo.py <mapa-s-feedom> src/data/brcko.js [route_id] [route_id_grafikona]
# Bez route_id bira se linija s najviše polazaka radnim danom; grafikon je zadano linija 8.
import csv, sys, os, math, json
sys.stdout.reconfigure(encoding="utf-8")
feed, out = sys.argv[1], sys.argv[2]
only = sys.argv[3] if len(sys.argv) > 3 and sys.argv[3] else None
graph_route = sys.argv[4] if len(sys.argv) > 4 else "8"
r = lambda f: list(csv.DictReader(open(os.path.join(feed, f), encoding="utf-8-sig")))
routes, trips, stops, cal = r("routes.txt"), r("trips.txt"), r("stops.txt"), r("calendar.txt")
shapes = {}
for p in r("shapes.txt"):
    shapes.setdefault(p["shape_id"], []).append((int(p["shape_pt_sequence"]), float(p["shape_pt_lat"]), float(p["shape_pt_lon"])))
weekday = {c["service_id"] for c in cal if c["monday"] == "1" and c["start_date"].startswith("2026")}
weekend = {c["service_id"] for c in cal if c["saturday"] == "1" and c["start_date"].startswith("2026")}
st = {}
for row in r("stop_times.txt"):
    st.setdefault(row["trip_id"], []).append(row)
for v in st.values(): v.sort(key=lambda x: int(x["stop_sequence"]))
stopname = {s["stop_id"]: s["stop_name"] for s in stops}

# Istaknuta linija (zadana ili ona s najviše polazaka radnim danom), smjer s više polazaka
best = None
for rt in routes:
    if only and rt["route_id"] != only: continue
    for d in ("0", "1"):
        ts = [t for t in trips if t["route_id"] == rt["route_id"] and t["direction_id"] == d and t["service_id"] in weekday]
        if ts and (best is None or len(ts) > len(best[2])): best = (rt, d, ts)
rt, d, ts = best
# Glavna varijanta trase: shape s najviše polazaka radnim danom
main_shape = max({t["shape_id"] for t in ts}, key=lambda sh: sum(t["shape_id"] == sh for t in ts))
ts = [t for t in ts if t["shape_id"] == main_shape]
ts.sort(key=lambda t: st[t["trip_id"]][0]["departure_time"])
# Projekcija i pojednostavljenje trasa
lat0 = 44.87
def proj(lat, lon): return (lon * math.cos(math.radians(lat0)), -lat)
def dp(pts, eps):
    if len(pts) < 3: return pts
    (x1, y1), (x2, y2) = pts[0], pts[-1]
    dx, dy = x2 - x1, y2 - y1; n = math.hypot(dx, dy) or 1e-12
    i, dmax = 0, 0
    for k in range(1, len(pts) - 1):
        dd = abs(dy * pts[k][0] - dx * pts[k][1] + x2 * y1 - y2 * x1) / n
        if dd > dmax: i, dmax = k, dd
    if dmax > eps: return dp(pts[:i + 1], eps)[:-1] + dp(pts[i:], eps)
    return [pts[0], pts[-1]]
used = {}
for t in trips:
    if t["shape_id"]: used.setdefault(t["shape_id"], t["route_id"])
lines = []
for sid, rid in used.items():
    pts = [proj(la, lo) for _, la, lo in sorted(shapes[sid])]
    lines.append((sid, rid, dp(pts, 0.00012)))
stoppts = [proj(float(s["stop_lat"]), float(s["stop_lon"])) for s in stops]
allp = [p for _, _, l in lines for p in l]
minx, maxx = min(p[0] for p in allp), max(p[0] for p in allp)
miny, maxy = min(p[1] for p in allp), max(p[1] for p in allp)
W = 1000; sc = W / (maxx - minx); H = round((maxy - miny) * sc)
f = lambda p: (round((p[0] - minx) * sc, 1), round((p[1] - miny) * sc, 1))
def path(l): return "M" + "L".join(f"{x} {y}" for x, y in map(f, l))
inside = lambda p: minx <= p[0] <= maxx and miny <= p[1] <= maxy
data = {
    "viewBox": f"0 0 {W} {H}",
    "highlight": main_shape,
    "routes": [{"id": sid, "route": rid, "d": path(l)} for sid, rid, l in lines],
    "names": {r["route_id"]: [r["route_short_name"], r["route_long_name"].replace(" - ", " · ")] for r in routes},
    "highlightRoute": rt["route_id"],
    "stops": [list(f(p)) for p in stoppts if inside(p)],
    "stats": {
        "routes": len({t["route_id"] for t in trips}),
        "stops": len(stops),
        "weekdayTrips": sum(t["service_id"] in weekday for t in trips),
    },
}

# Grafikon voznog reda jedne linije: oba smjera radnim danom i vikendom, stanice kao redci.
# Redci su poredani i razmaknuti po vremenu vožnje prvog polaska u smjeru 0.
gr = next(x for x in routes if x["route_id"] == graph_route)
gts = [t for t in trips if t["route_id"] == graph_route and t["service_id"] in weekday | weekend]
mins = lambda hms: int(hms[:2]) * 60 + int(hms[3:5])
ref = st[min((t for t in gts if t["direction_id"] == "0" and t["service_id"] in weekday), key=lambda t: st[t["trip_id"]][0]["departure_time"])["trip_id"]]
rows = [stopname[x["stop_id"]] for x in ref]
t0, t1 = mins(ref[0]["departure_time"]), mins(ref[-1]["arrival_time"])
graph_trips = []
for t in sorted(gts, key=lambda t: (t["direction_id"], st[t["trip_id"]][0]["departure_time"])):
    times = [None] * len(rows)
    for x in st[t["trip_id"]]:
        name = stopname[x["stop_id"]]
        if name in rows: times[rows.index(name)] = mins(x["departure_time"])
    day = "weekday" if t["service_id"] in weekday else "weekend"
    graph_trips.append({"day": day, "dir": int(t["direction_id"]), "t": times})
data["graph"] = {
    "line": gr["route_short_name"],
    "name": gr["route_long_name"].replace(" - ", " · "),
    "stops": rows,
    "pos": [round((mins(x["arrival_time"]) - t0) / (t1 - t0), 3) for x in ref],
    "trips": graph_trips,
}

# Polasci sa stanice radnim danom, kao u ploči stanice na karti uživo; `time` je početni trenutak.
board_stop, board_time = "centar", "13:10"
rname = {x["route_id"]: x["route_short_name"] for x in routes}
board = sorted(
    # Bez natpisa smjera vrijedi zadnja stanica vožnje, kao u Terminusu.
    (row["departure_time"][:5], rname[t["route_id"]],
     row["stop_headsign"] or t["trip_headsign"] or stopname[st[t["trip_id"]][-1]["stop_id"]])
    for t in trips if t["service_id"] in weekday
    for row in st.get(t["trip_id"], [])[:-1] if row["stop_id"] == board_stop
)
data["board"] = {
    "stop": stopname[board_stop],
    "time": board_time,
    "departures": [[route, headsign, time] for time, route, headsign in board],
}

# Nekoliko stvarnih redaka svake tablice za pregled na stranici GTFS.
# Stupci prazni u svim odabranim redcima se izostavljaju.
def sample(name, rows):
    cols = [c for c in rows[0] if any(x[c] for x in rows)]
    return {"file": name, "cols": cols, "rows": [[x[c] for c in cols] for x in rows]}
g_trip = next(t for t in sorted(gts, key=lambda t: st[t["trip_id"]][0]["departure_time"]) if t["direction_id"] == "0" and t["service_id"] in weekday)
g_stops = [x["stop_id"] for x in st[g_trip["trip_id"]][:3]]
data["samples"] = [
    sample("stops.txt", [next(s for s in stops if s["stop_id"] == i) for i in g_stops]),
    sample("routes.txt", [x for x in routes if x["route_id"] in ("1", graph_route)]),
    sample("trips.txt", sorted((t for t in trips if t["route_id"] == graph_route and t["service_id"] in weekday
                                and t["direction_id"] == "0"), key=lambda t: st[t["trip_id"]][0]["departure_time"])[:3]),
    sample("stop_times.txt", st[g_trip["trip_id"]][:4]),
    sample("calendar.txt", sorted((c for c in cal if c["service_id"] in weekday | weekend), key=lambda c: c["saturday"])),
    sample("shapes.txt", [p for p in r("shapes.txt") if p["shape_id"] == g_trip["shape_id"]][:3]),
]

js = "// Generirano iz eksperimentalnog GTFS feeda za Brčko distrikt.\nexport const brcko = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n"
open(out, "w", encoding="utf-8").write(js)
print(rt["route_short_name"], rt["route_long_name"], d, len(ts), data["stats"], len(js), H)
