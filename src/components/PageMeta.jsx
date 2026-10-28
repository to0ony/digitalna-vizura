import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const site = "https://digitalnavizura.com";

function setMeta(selector, attr, value) {
  document.head.querySelector(selector)?.setAttribute(attr, value);
}

// Naslov kartice i podaci za tražilice po stranici. Naslov React podiže u <head>,
// a opis, canonical i og oznake iz index.html se ažuriraju na mjestu.
function PageMeta({ title, description }) {
  const { pathname } = useLocation();
  const full = title ? `${title} · Digitalna Vizura` : "Digitalna Vizura";

  useEffect(() => {
    const url = site + pathname;
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:title"]', "content", full);
    if (description) {
      setMeta('meta[name="description"]', "content", description);
      setMeta('meta[property="og:description"]', "content", description);
    }
  }, [pathname, full, description]);

  return <title>{full}</title>;
}

export default PageMeta;
