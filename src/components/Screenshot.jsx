// Screenshot u paleti stranice; na hover se otkriva original u boji.
// Filter #duotone definiran je u Layout.jsx.
function Screenshot({ src, alt, className = "" }) {
  return (
    <div className={`duotone ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="w-full" />
      <img src={src} alt="" aria-hidden="true" loading="lazy" className="duotone-layer" />
    </div>
  );
}

export default Screenshot;
