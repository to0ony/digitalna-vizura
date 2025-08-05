import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
    setCurrentImageIndex(0);
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    if (selectedProject?.images) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject?.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
      if (e.key === "ArrowLeft" && isModalOpen) {
        prevImage();
      }
      if (e.key === "ArrowRight" && isModalOpen) {
        nextImage();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const getTechIcon = (tech) => {
    const icons = {
      "Next.js": "⚡",
      React: "⚛️",
      NestJS: "🔴",
      "Node.js": "🟢",
      MongoDB: "🍃",
      Python: "🐍",
      Docker: "🐳",
      JavaScript: "📝",
      TypeScript: "🔷",
      "Tailwind CSS": "🎨",
      PostgreSQL: "🐘",
      MySQL: "🐬",
      "Vue.js": "💚",
      Angular: "🔺",
      Laravel: "🔴",
      PHP: "🐘",
      Java: "☕",
      "C#": "🟣",
      Stripe: "💳",
      Firebase: "🔥",
      AWS: "☁️",
      Vercel: "▲",
      Netlify: "🌐",
      Git: "📋",
      GitHub: "🐙",
      Figma: "🎨",
      Photoshop: "🖼️",
      "Framer Motion": "🎭",
    };
    return icons[tech] || "🔧";
  };

  // ========================================
  // 🚨 PROJEKTI LISTA - DODAJ NOVE PROJEKTE OVDJE!
  // ========================================
  const projects = [
    {
      id: 1,
      title: "Blokich",
      category: "Web aplikacija",
      description:
        "Moderna web aplikacija namjenjena vozačima ZET gradskog prijevoza. Upravljanje i prikaz aktualnih podataka vezanih uz vožnje.",
      detailedDescription:
        "Blokich je web aplikacija razvijena za ZET (Zagrebački električni tramvaj) koja omogućuje vozačima lakše upravljanje rasporedima i praćenje informacija o vožnjama. Aplikacija koristi moderan tech stack s Next.js frontend-om, NestJS backend-om i MongoDB bazom podataka. Sustav je containeriziran pomoću Docker-a i uključuje Python skripte za obradu podataka.",
      image: "/blokich/laptop_phone_mockup.png",
      images: [
        "blokich/laptop_phone_mockup.png",
        "blokich/login_demo.png",
        "blokich/schedule_demo.png",
        "blokich/schedule1_demo.png",
      ],
      technologies: ["Next.js", "NestJS", "MongoDB", "Python", "Docker"],
      features: [
        "Responzivni dizajn za sve uređaje",
        "Automatizacija obrade podataka sa ZET-ovog servisa",
        "Pregled aktualnih i narednih vožnji za tjedan",
        "Prikaz rute sa stajalištima i smjerom kretanja u karti",
      ],
      liveLink: "https://blokich.vercel.app/login",
      githubLink: "https://github.com/to0ony/blokich",
      duration: "2 mjeseca",
      client: "ZET Zagreb",
    },
    // ========================================
    // 📝 DODAJ NOVI PROJEKT OVDJE (kopiraj gornji format)
    // ========================================
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white">
        <Link to="/">
          <img
            src="/plaintext_type_logo.png"
            alt="Digitalna Vizura"
            className="h-8"
          />
        </Link>

        <nav className="flex space-x-6">
          <Link to="/" className="hover:underline">
            Početna
          </Link>
          <Link to="/#services" className="hover:underline">
            Usluge
          </Link>
          <Link to="/radovi" className="hover:underline font-semibold">
            Radovi
          </Link>
          <Link to="/#contact" className="hover:underline">
            Kontakt
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold">Naši radovi</h1>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div
          className={`grid gap-8 ${
            projects.length === 1
              ? "grid-cols-1 max-w-md mx-auto"
              : projects.length === 2
              ? "md:grid-cols-2 max-w-4xl mx-auto"
              : "md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full max-w-sm mx-auto cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => openModal(project)}
            >
              <div className="aspect-video bg-gray-100 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-115 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="inline-flex items-center gap-1 text-xs bg-black text-white px-2 py-1 rounded"
                      >
                        <span className="text-sm">{getTechIcon(tech)}</span>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    className="inline-flex items-center text-black hover:underline text-sm font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(project);
                    }}
                  >
                    Pogledaj projekt
                    <span className="ml-1">→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <motion.section
        className="bg-gray-50 py-20 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
            Spremni za vaš projekt?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Vidite li sebe u ovim radovima? Kontaktirajte nas i pokrenimo vaš
            sljedeći projekt.
          </p>
          <Link
            to="/#contact"
            className="inline-block px-8 py-4 bg-black text-white rounded-full hover:bg-gray-900 transition"
          >
            Zatraži ponudu
          </Link>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-10 border-t border-gray-200">
        © {new Date().getFullYear()} Digitalna Vizura. Sva prava pridržana.
      </footer>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              style={{
                boxShadow:
                  "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)",
              }}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
                <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  <span className="text-2xl text-gray-500">×</span>
                </button>
              </div>

              <div className="p-6">
                <div className="mb-8">
                  <div className="mb-4 bg-gray-50 rounded-xl flex items-center justify-center">
                    <img
                      src={
                        selectedProject.images?.[currentImageIndex] ||
                        selectedProject.image
                      }
                      alt={`${selectedProject.title} ${currentImageIndex + 1}`}
                      className="max-w-full max-h-80 object-contain rounded-xl"
                    />
                  </div>

                  {selectedProject.images?.length > 1 && (
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={prevImage}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <svg
                          className="w-5 h-5 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>

                      <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">
                        {currentImageIndex + 1} /{" "}
                        {selectedProject.images?.length}
                      </div>

                      <button
                        onClick={nextImage}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <svg
                          className="w-5 h-5 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  )}

                  {selectedProject.images?.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {selectedProject.images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                            index === currentImageIndex
                              ? "border-black border-opacity-100"
                              : "border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="mb-6">
                      <span className="inline-block text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full mb-4">
                        {selectedProject.category}
                      </span>
                      <p className="text-gray-700 leading-relaxed text-base">
                        {selectedProject.detailedDescription ||
                          selectedProject.description}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900">
                        Tehnologije
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-2 text-sm bg-gray-900 text-white px-3 py-2 rounded-lg font-medium"
                          >
                            <span className="text-base">
                              {getTechIcon(tech)}
                            </span>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    {selectedProject.features && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900">
                          Ključne funkcionalnosti
                        </h3>
                        <ul className="space-y-3">
                          {selectedProject.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-2 h-2 bg-black rounded-full mr-3 mt-2.5 flex-shrink-0"></span>
                              <span className="text-gray-700 text-base leading-relaxed">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900">
                        Detalji projekta
                      </h3>
                      <div className="space-y-4">
                        {selectedProject.client && (
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-gray-600 font-medium">
                              Klijent:
                            </span>
                            <span className="font-semibold text-gray-900">
                              {selectedProject.client}
                            </span>
                          </div>
                        )}
                        {selectedProject.duration && (
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-gray-600 font-medium">
                              Trajanje:
                            </span>
                            <span className="font-semibold text-gray-900">
                              {selectedProject.duration}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
                  <a
                    href={selectedProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-900 transition-all duration-300 font-semibold flex items-center justify-center gap-2 group"
                  >
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Pogledaj Live Demo
                  </a>
                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-100 text-gray-900 text-center py-4 px-6 rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold flex items-center justify-center gap-2 group"
                  >
                    <svg
                      className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    GitHub Repository
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Portfolio;
