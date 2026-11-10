import NetworkMap from "./NetworkMap";
import Screenshot from "./Screenshot";

const lifted = "transition-transform duration-700 ease-out group-hover:-translate-y-2";

// Vizual projekta: karta mreže ili niz screenshotova.
// Na kartici projekta (`lift`) cijela je kartica link, pa se slike ne povećavaju,
// a umjesto karte mreže prikazuje se naslovna slika (`cover`) ako je ima.
function ProjectVisual({ project, lift = false, caption = true }) {
  if (lift && project.cover)
    return <Screenshot src={project.cover} alt={project.title} className={lifted} />;

  if (project.visual === "network")
    return <NetworkMap caption={caption} collapsible={!lift} />;

  // Na kartici u popisu radova dovoljna su prva tri screenshota.
  const images = lift ? project.images.slice(0, 3) : project.images;

  return (
    <div
      className={`grid gap-6 ${
        images.length % 3 === 0 ? "grid-cols-3" : "grid-cols-2 md:grid-cols-4"
      }`}
    >
      {images.map((src) => (
        <Screenshot
          key={src}
          src={src}
          alt={project.title}
          zoomable={!lift}
          className={lift ? lifted : ""}
        />
      ))}
    </div>
  );
}

export default ProjectVisual;
