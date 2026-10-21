// Zajednički okvir: mreža od 12 stupaca, iste margine na svim stranicama.
export const container = "mx-auto max-w-[1440px] px-6 md:px-12";
export const grid = "grid grid-cols-12 gap-x-6";

// Redni broj u obliku "01", "02"...
export const number = (i) => String(i + 1).padStart(2, "0");
