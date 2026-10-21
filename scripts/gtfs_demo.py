# Generira src/data/brcko.js iz raspakiranog GTFS feeda.
# Upotreba: python scripts/gtfs_demo.py <mapa-s-feedom> src/data/brcko.js [route_id]
# Bez route_id bira se linija s najviše polazaka radnim danom.
import csv, sys, os, math, json
sys.stdout.reconfigure(encoding="utf-8")
feed, out = sys.argv[1], sys.argv[2]
only = sys.argv[3] if len(sys.argv) > 3 else None
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
first = st[ts[0]["trip_id"]]
wk = sorted(st[t["trip_id"]][0]["departure_time"][:5] for t in trips if t["route_id"] == rt["route_id"] and t["direction_id"] == d and t["shape_id"] == main_shape and t["service_id"] in weekend)
timetable = {
    "line": rt["route_short_name"],
    "from": stopname[first[0]["stop_id"]], "to": stopname[first[-1]["stop_id"]],
    "weekday": [st[t["trip_id"]][0]["departure_time"][:5] for t in ts],
    "weekend": wk,
}
sample = [f'{x["trip_id"]},{x["arrival_time"]},{x["departure_time"]},{x["stop_id"]},{x["stop_sequence"]}' for x in first[:9]]

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
    "timetable": timetable,
    "stopTimes": ["trip_id,arrival_time,departure_time,stop_id,stop_sequence"] + sample,
    "stats": {
        "routes": len({t["route_id"] for t in trips}),
        "stops": len(stops),
        "weekdayTrips": sum(t["service_id"] in weekday for t in trips),
    },
}
# Samo istaknuta linija, s vlastitim okvirom i stajalištima
hs = next(t["shape_id"] for t in ts)
hl = dp([proj(la, lo) for _, la, lo in sorted(shapes[hs])], 0.00006)
hstops = [proj(float(s["stop_lat"]), float(s["stop_lon"])) for s in stops if s["stop_id"] in {x["stop_id"] for x in first}]
hx, hy = [p[0] for p in hl], [p[1] for p in hl]
pad = (max(hx) - min(hx)) * 0.06
bx, by, bw, bh = min(hx) - pad, min(hy) - pad, max(hx) - min(hx) + 2 * pad, max(hy) - min(hy) + 2 * pad
hsc = 400 / bw
g = lambda p: (round((p[0] - bx) * hsc, 1), round((p[1] - by) * hsc, 1))
data["line"] = {
    "viewBox": f"0 0 400 {round(bh * hsc)}",
    "d": "M" + "L".join(f"{x} {y}" for x, y in map(g, hl)),
    "stops": [list(g(p)) for p in hstops],
}
js = "// Generirano iz eksperimentalnog GTFS feeda za Brčko distrikt.\nexport const brcko = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n"
open(out, "w", encoding="utf-8").write(js)
print(rt["route_short_name"], rt["route_long_name"], d, len(ts), data["stats"], len(js), H)
print(timetable); print("\n".join(sample[:3]))
