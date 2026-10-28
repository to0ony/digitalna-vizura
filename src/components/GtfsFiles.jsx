import { useState } from "react";
import { useLang } from "../i18n";
import { brcko } from "../data/brcko";
import Reveal from "./Reveal";

const samples = Object.fromEntries(brcko.samples.map((s) => [s.file, s]));

// Tablice GTFS-a; klik na tablicu otvara nekoliko stvarnih redaka iz feeda.
function GtfsFiles() {
  const { t } = useLang();
  const g = t.gtfs;
  const [open, setOpen] = useState(g.files[0].file);

  return (
    <>
      <p className="mb-6 font-mono text-xs text-muted">{g.samplesHint}</p>
      <div>
        {g.files.map((item) => {
          const isOpen = open === item.file;
          const sample = samples[item.file];
          return (
            <Reveal key={item.file} className="border-t border-ink/15">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : item.file)}
                className="group grid w-full gap-x-6 gap-y-1 py-5 text-left md:grid-cols-12"
              >
                <span className="font-mono text-xs text-signal md:col-span-3 md:pt-1">
                  {item.file}
                </span>
                <span className="font-semibold tracking-tight transition-colors group-hover:text-signal md:col-span-3">
                  {item.title}
                </span>
                <span className="flex justify-between gap-4 text-muted md:col-span-6">
                  {item.text}
                  <span className="font-mono text-signal" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </span>
              </button>
              <div
                inert={!isOpen}
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="mb-5 overflow-x-auto bg-ink/[0.04] p-4">
                    <table className="font-mono text-xs whitespace-nowrap">
                      <thead>
                        <tr className="text-muted">
                          {sample.cols.map((col) => (
                            <th key={col} className="pr-6 pb-2 text-left font-normal">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sample.rows.map((row, i) => (
                          <tr key={i}>
                            {row.map((cell, j) => (
                              <td key={j} className="pr-6 pb-1">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </>
  );
}

export default GtfsFiles;
