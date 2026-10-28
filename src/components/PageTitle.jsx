// Naslov kartice preglednika; React ga podiže u <head>.
function PageTitle({ children }) {
  const title = children ? `${children} · Digitalna Vizura` : "Digitalna Vizura";
  return <title>{title}</title>;
}

export default PageTitle;
