import { useState } from "react";
import { useLang } from "../i18n";
import { brcko } from "../data/brcko";

const line = {
  fill: "none",
  strokeLinejoin: "round",
  strokeLinecap: "round",
  vectorEffect: "non-scaling-stroke",
};

// Cijela mreža iz feeda, bez podloge karte. Istaknuta trasa je u boji akcenta,
// a linija preko koje se prijeđe mišem zasvijetli isto tako.
function NetworkMap({ caption = true }) {
  const { t } = useLang();
  const [hovered, setHovered] = useState(null);

  const lit = (r) => r.id === brcko.highlight || r.route === hovered;
  const [short, name] = brcko.names[hovered ?? brcko.highlightRoute];

  return (
    <>
      <svg
        viewBox={brcko.viewBox}
        className="w-full"
        aria-hidden="true"
        onPointerLeave={() => setHovered(null)}
      >
        {brcko.routes.map((r) => (
          <path
            key={r.id}
            d={r.d}
            {...line}
            className="stroke-ink"
            strokeOpacity="0.45"
            strokeWidth="1.25"
          />
        ))}
        {brcko.stops.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.2" className="fill-ink" />
        ))}
        {brcko.routes.filter(lit).map((r) => (
          <path
            key={r.id}
            d={r.d}
            {...line}
            className="stroke-signal"
            strokeWidth="2.5"
          />
        ))}
        {/* Nevidljive šire crte da se tanke linije lakše uhvate mišem */}
        {brcko.routes.map((r) => (
          <path
            key={r.id}
            d={r.d}
            {...line}
            stroke="transparent"
            strokeWidth="14"
            pointerEvents="stroke"
            className="cursor-pointer"
            onPointerEnter={() => setHovered(r.route)}
          />
        ))}
      </svg>
      {caption && (
        <p className="mt-6 font-mono text-xs text-muted">
          <span className="text-signal">
            {t.flow.line} {short}
          </span>
          <span className="ml-4">{name}</span>
        </p>
      )}
    </>
  );
}

export default NetworkMap;
