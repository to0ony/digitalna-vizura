function SectionLabel({ children }) {
  return (
    <p className="col-span-12 mb-10 font-mono text-xs uppercase tracking-widest text-muted md:col-span-3 md:mb-0">
      {children}
    </p>
  );
}

export default SectionLabel;
