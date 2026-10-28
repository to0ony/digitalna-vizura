import { useRef } from "react";
import { useLang } from "../i18n";

// Screenshot u paleti stranice; na hover se otkriva original u boji.
// Filter #duotone definiran je u Layout.jsx.
function Image({ src, alt, className = "" }) {
  return (
    <div className={`duotone ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="w-full" />
      <img src={src} alt="" aria-hidden="true" loading="lazy" className="duotone-layer" />
    </div>
  );
}

// `zoomable`: klik otvara sliku preko cijelog zaslona.
function Screenshot({ src, alt, className = "", zoomable = false }) {
  const { t } = useLang();
  const dialog = useRef(null);

  if (!zoomable) return <Image src={src} alt={alt} className={className} />;

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current.showModal()}
        aria-label={`${t.zoom.open}: ${alt}`}
        className={`block w-full cursor-zoom-in ${className}`}
      >
        <Image src={src} alt={alt} />
      </button>
      <dialog
        ref={dialog}
        onClick={() => dialog.current.close()}
        className="lightbox m-0 h-dvh max-h-none w-screen max-w-none cursor-zoom-out bg-transparent p-4 md:p-10"
      >
        <img src={src} alt={alt} className="h-full w-full object-contain" />
        <button
          type="button"
          className="fixed top-4 right-4 font-mono text-xs text-white/80 transition-colors hover:text-white md:top-6 md:right-6"
        >
          {t.zoom.close} ✕
        </button>
      </dialog>
    </>
  );
}

export default Screenshot;
