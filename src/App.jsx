import React, { useState } from "react";
import { motion } from "framer-motion";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    // Close mobile menu if open
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white z-10 relative">
        <img
          src="/plaintext_type_logo.png"
          alt="Digitalna Vizura"
          className="h-8"
        />

        <nav className="hidden md:flex space-x-6">
          <button
            onClick={() => scrollToSection("services")}
            className="hover:underline cursor-pointer"
          >
            Usluge
          </button>
          <button className="hover:underline cursor-pointer">Radovi</button>
          <button
            onClick={() => scrollToSection("contact")}
            className="hover:underline cursor-pointer"
          >
            Kontakt
          </button>
        </nav>

        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-gray-900 transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-gray-900 transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-gray-900 transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </header>

      {/* Mobile nav */}
      <div
        className={`md:hidden bg-white border-b border-gray-200 shadow-sm transition-all duration-200 ease-out overflow-hidden ${
          isMenuOpen ? "opacity-100 max-h-40" : "opacity-0 max-h-0"
        }`}
      >
        <nav className="px-6 py-4 space-y-4">
          <button
            onClick={() => scrollToSection("services")}
            className="block hover:underline cursor-pointer text-left w-full"
          >
            Usluge
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="block hover:underline cursor-pointer text-left w-full"
          >
            Kontakt
          </button>
        </nav>
      </div>

      {/* Hero with video */}
      <section className="relative h-[90vh] flex items-center justify-center text-center px-6">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/clips/maintaining_video.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 bg-white/70 backdrop-blur-sm rounded-xl p-10 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Izrada web rješenja i brending koji ostavlja dojam.
          </h1>
          <p className="text-lg text-gray-800 mb-8">
            Minimalizam. Elegancija. Performanse. Sve na jednom mjestu za vaš
            digitalni identitet.
          </p>
          <button
            onClick={() => scrollToSection("contact")}
            className="px-6 py-3 text-white bg-black rounded-full hover:bg-gray-900 transition"
          >
            Zatraži ponudu
          </button>
        </div>
      </section>

      {/* Web development */}
      <motion.section
        id="services"
        className="max-w-6xl mx-auto px-6 py-24"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
              Web rješenja koja rade
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Od jednostavnih landing stranica do kompleksnih web aplikacija.
              Moderne tehnologije za brza, sigurna i skalabilna rješenja.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                Responzivan dizajn
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-black rounded-full mr-3"></span>Brze
                performanse
              </li>
            </ul>
          </div>
          <div className="bg-gray-100 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">🚀</div>
            <p className="text-gray-600">Moderne web tehnologije</p>
          </div>
        </div>
      </motion.section>

      {/* Branding */}
      <motion.section
        id="branding"
        className="bg-gray-50 py-24"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-white rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">🎨</div>
            <p className="text-gray-600">Kreativni vizualni identitet</p>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
              Brending s karakterom
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Od logotipa do kompletnog vizuelnog identiteta – stvaramo
              prepoznatljive brendove koji komuniciraju jasnoću i vrijednost.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-black rounded-full mr-3"></span>Logo
                dizajn
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                Vizualni identitet
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="bg-white py-24"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
            Spremni za novi projekt?
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Zainteresirani ste, ali niste sigurni odakle krenuti? Slobodno nam
            se javite.
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center justify-center md:justify-start space-x-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">📧</span>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Email</h3>
                  <a
                    href="mailto:kontakt@digitalnavizura.com"
                    className="text-gray-600 hover:text-black transition"
                  >
                    digitalnavizura@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start space-x-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">💬</span>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">WhatsApp</h3>
                  <a
                    href="https://wa.me/385996705321"
                    className="text-gray-600 hover:text-black transition"
                  >
                    +385 99 670 5321
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start space-x-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">⏱️</span>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Odgovor</h3>
                  <p className="text-gray-600">Obično u roku od 24h</p>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6">Brza poruka</h3>
              <form
                action="https://formspree.io/f/mvgqwbnr"
                method="POST"
                className="space-y-4"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Vaše ime"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none transition"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email adresa"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none transition"
                />
                <textarea
                  name="message"
                  placeholder="Opišite vašu ideju u nekoliko rečenica..."
                  rows="4"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none transition resize-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition"
                >
                  Pošaljite poruku
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-10 border-t border-gray-200">
        © {new Date().getFullYear()} Digitalna Vizura. Sva prava pridržana.
      </footer>
    </div>
  );
}

export default App;
