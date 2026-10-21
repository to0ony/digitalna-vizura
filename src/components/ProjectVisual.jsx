import NetworkMap from "./NetworkMap";
import Screenshot from "./Screenshot";

// Vizual projekta: karta mreže ili niz screenshotova.
function ProjectVisual({ project, lift = false, caption = true }) {
  if (project.visual === "network") return <NetworkMap caption={caption} />;

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      {project.images.map((src) => (
        <Screenshot
          key={src}
          src={src}
          alt={project.title}
          className={
            lift
              ? "transition-transform duration-700 ease-out group-hover:-translate-y-2"
              : ""
          }
        />
      ))}
    </div>
  );
}

export default ProjectVisual;
