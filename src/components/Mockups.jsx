import { useLang } from "../i18n";
import Reveal from "./Reveal";
import Screenshot from "./Screenshot";

// Tailwind treba pune nazive klasa, pa se širine mapiraju ovdje.
const spans = {
  12: "col-span-12",
  8: "col-span-12 md:col-span-8",
  6: "col-span-12 md:col-span-6",
  4: "col-span-12 md:col-span-4",
};

// Mockupovi s opisom ispod, složeni u mrežu od 12 stupaca.
function Mockups({ mockups }) {
  const { lang } = useLang();

  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-14">
      {mockups.map((mockup, i) => (
        <Reveal key={mockup.src} delay={(i % 2) * 0.12} className={spans[mockup.span]}>
          <figure>
            <Screenshot src={mockup.src} alt={mockup[lang]} zoomable />
            <figcaption className="mt-4 font-mono text-xs text-muted">
              {mockup[lang]}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}

export default Mockups;
