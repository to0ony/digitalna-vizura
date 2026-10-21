import { useLang } from "../i18n";
import { contact } from "../content";
import { container, grid } from "../grid";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

function Contact() {
  const { t } = useLang();

  return (
    <section id="kontakt" className={`${container} ${grid} scroll-mt-8 pb-[14vh]`}>
      <SectionLabel>{t.contact.label}</SectionLabel>
      <Reveal className="col-span-12 md:col-span-9">
        <a
          href={`mailto:${contact.email}`}
          className="block text-[clamp(1.6rem,5.2vw,4.75rem)] leading-none font-extrabold tracking-[-0.03em] break-words transition-colors hover:text-signal"
        >
          {contact.email}
        </a>
        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-2 text-muted">
          <p>{t.contact.text}</p>
          <a
            href={contact.whatsappLink}
            className="text-ink transition-colors hover:text-signal"
          >
            WhatsApp {contact.whatsapp}
          </a>
        </div>
      </Reveal>
    </section>
  );
}

export default Contact;
