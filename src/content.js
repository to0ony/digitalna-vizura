// Sav tekst stranice, na hrvatskom i engleskom.
export const content = {
  hr: {
    nav: { gtfs: "GTFS", work: "Radovi", contact: "Kontakt" },
    theme: { light: "Svijetlo", dark: "Tamno" },
    hero: {
      title: "Digitalizacija voznih redova.",
      lead: "Vozni redovi javnog prijevoza još se često vode u PDF-ovima, tablicama i na papiru. Pretvoreni u podatke, otvaraju niz mogućnosti: od prikaza na Google Mapsu do automatski izrađenih voznih redova za stanice.",
      cta: "Kako to funkcionira",
    },
    outcomes: {
      label: "Mogućnosti",
      title: "Što sve može jedan vozni red.",
      intro: "Primjeri su iz Terminusa, alata za upravljanje voznim redovima, na mreži Brčko distrikta.",
      items: [
        {
          title: "Polasci na karti i u aplikacijama",
          text: "Kad je vozni red u GTFS-u, putnik u Google Mapsu, Apple Mapsu ili Moovitu upiše odredište i dobije liniju, stanicu i vrijeme polaska. Iz istih podataka radi i javna karta uživo, na kojoj klik na stanicu pokazuje sljedeće polaske. Upravo je tu najveća prilika: prijevoz postaje vidljiv tamo gdje putnici već traže.",
        },
        {
          title: "Lakše upravljanje linijama",
          text: "U Terminusu se stanice postavljaju klikom na kartu, linije slažu od stanica, a trase same prate ceste. Promjena polaska upiše se na jednom mjestu, umjesto u nekoliko tablica i dokumenata.",
        },
        {
          title: "Vozni red na stanici",
          text: "Iz istih podataka za svaku stanicu nastaje PDF spreman za print: sve linije koje tu staju, po smjerovima, s iznimkama za praznike i QR kodom. Kad se vozni red promijeni, nema ručnog prepisivanja.",
        },
      ],
      note: "Sve kreće od istog voznog reda. Kad je jednom dobro upisan, sve ostalo nastaje iz njega.",
      more: "Kako to funkcionira",
      board: {
        until: "Polasci do kraja dana",
        in: "za",
        today: "Danas",
        earlier: "Ranije",
        later: "Kasnije",
        none: "Danas više nema polazaka.",
      },
      graph: {
        weekday: "Radni dan",
        weekend: "Vikend",
        trips: "vožnji",
        departure: "Polazak",
      },
    },
    zoom: { open: "Povećaj", close: "Zatvori" },
    network: { show: "Prikaži kartu mreže", hide: "Sakrij kartu mreže" },
    line: "Linija",
    work: {
      title: "Radovi.",
      lead: "Aplikacije i alati vezani uz javni prijevoz.",
      inProgress: "U razvoju",
      view: "Pogledaj projekt",
    },
    contact: {
      label: "Kontakt",
      text: "Za pitanja i suradnju.",
    },
    project: {
      back: "Natrag",
      stack: "Tehnologije",
      links: "Poveznice",
      features: "Mogućnosti",
      live: "Aplikacija",
    },
    gtfs: {
      title: "Javni prijevoz na Google Mapsu.",
      lead: "Google Maps prikazuje javni prijevoz iz GTFS feeda, otvorenog formata za vozne redove. Feed se izrađuje iz voznih redova koje prijevoznik već ima, a nakon objave održava se uz svaku promjenu.",
      whatLabel: "Što je GTFS",
      whatTitle: "Vozni red u obliku koji aplikacije razumiju.",
      whatText: "GTFS zvuči tehnički, ali je zapravo skup povezanih tablica. Google ih redovito preuzima, pa se promjena voznog reda pojavi u aplikaciji bez ručnog unosa.",
      samplesHint: "Klik na tablicu prikazuje nekoliko stvarnih redaka iz feeda Brčko distrikta.",
      files: [
        { file: "stops.txt", title: "Stajališta", text: "Naziv i točna lokacija svake stanice." },
        { file: "routes.txt", title: "Linije", text: "Broj, naziv i boja linije." },
        { file: "trips.txt", title: "Polasci", text: "Svaka vožnja linije, sa smjerom i trasom." },
        { file: "stop_times.txt", title: "Vremena", text: "Kad koji polazak stiže na koju stanicu." },
        { file: "calendar.txt", title: "Kalendar", text: "Radni dani, vikendi, sezone i praznici." },
        { file: "shapes.txt", title: "Trase", text: "Put vozila po cestama, za crtanje na karti." },
      ],
      demoLabel: "Primjer",
      demoTitle: "Brčko distrikt",
      demoText: "Primjer cijelog postupka: gradski i prigradski prijevoz u jednom eksperimentalnom GTFS feedu, izrađenom u Terminusu.",
      demoMore: "Pogledaj Terminus",
      stats: { routes: "linija", stops: "stajališta", trips: "polazaka radnim danom" },
      processLabel: "Postupak",
      processTitle: "Od voznog reda do objave.",
      process: [
        {
          title: "Vozni redovi",
          text: "Polazište su vozni redovi u obliku koji prijevoznik već ima: PDF, tablica, fotografija ili papir.",
        },
        {
          title: "Izrada",
          text: "Upisuju se stajališta s lokacijama, linije, trase po cestama, polasci i kalendar s praznicima.",
        },
        {
          title: "Provjera",
          text: "Feed se provjerava validatorom, a prijevoznik pregledava linije i vremena prije objave.",
        },
        {
          title: "Objava i održavanje",
          text: "Feed se prijavljuje Googleu i ažurira kad se vozni red promijeni.",
        },
      ],
      faqLabel: "Pitanja",
      faq: [
        {
          q: "Što je potrebno za početak?",
          a: "Vozni redovi u obliku koji prijevoznik već ima. Ako nema popisa stajališta s lokacijama, stajališta se mogu odrediti s karte.",
        },
        {
          q: "Koliko traje izrada?",
          a: "Ovisi o broju linija i polazaka. Okvirni rok može se procijeniti nakon pregleda voznih redova.",
        },
        {
          q: "Naplaćuje li Google objavu?",
          a: "Ne. Objava voznih redova na Google Mapsu je besplatna, kao i u drugim aplikacijama koje koriste GTFS, poput Apple Mapsa, Moovita i Transita.",
        },
        {
          q: "Trebaju li vozila imati GPS?",
          a: "Ne. Za prikaz na Google Mapsu dovoljni su planirani polasci. Kašnjenja uživo mogu se dodati kasnije, uz GPS u vozilima.",
        },
      ],
    },
  },
  en: {
    nav: { gtfs: "GTFS", work: "Work", contact: "Contact" },
    theme: { light: "Light", dark: "Dark" },
    hero: {
      title: "Timetables, digitised.",
      lead: "Public transport timetables are still often kept in PDFs, spreadsheets and on paper. Turned into data, they open up a range of possibilities: from appearing on Google Maps to automatically generated stop timetables.",
      cta: "How it works",
    },
    outcomes: {
      label: "Possibilities",
      title: "What one timetable can do.",
      intro: "The examples come from Terminus, a tool for managing timetables, on the Brčko District network.",
      items: [
        {
          title: "Departures on the map and in apps",
          text: "Once a timetable is in GTFS, a passenger enters a destination in Google Maps, Apple Maps or Moovit and gets the route, the stop and the departure time. The same data drives a public live map, where clicking a stop shows the next departures. This is where the biggest opportunity lies: public transport becomes visible where passengers already look.",
        },
        {
          title: "Easier route management",
          text: "In Terminus, stops are placed with a click on the map, routes are built from stops, and shapes follow the roads on their own. A change to a departure is entered in one place instead of several spreadsheets and documents.",
        },
        {
          title: "Timetable at the stop",
          text: "The same data produces a print-ready PDF for every stop: all routes serving it, by direction, with holiday exceptions and a QR code. When the timetable changes, nothing has to be copied by hand.",
        },
      ],
      note: "It all starts from the same timetable. Once it is entered properly, everything else follows from it.",
      more: "How it works",
      board: {
        until: "Departures until end of day",
        in: "in",
        today: "Today",
        earlier: "Earlier",
        later: "Later",
        none: "No more departures today.",
      },
      graph: {
        weekday: "Weekdays",
        weekend: "Weekend",
        trips: "trips",
        departure: "Departure",
      },
    },
    zoom: { open: "Enlarge", close: "Close" },
    network: { show: "Show network map", hide: "Hide network map" },
    line: "Line",
    work: {
      title: "Work.",
      lead: "Apps and tools related to public transport.",
      inProgress: "In progress",
      view: "View project",
    },
    contact: {
      label: "Contact",
      text: "For questions and collaboration.",
    },
    project: {
      back: "Back",
      stack: "Stack",
      links: "Links",
      features: "Features",
      live: "Application",
    },
    gtfs: {
      title: "Public transport on Google Maps.",
      lead: "Google Maps shows public transport from a GTFS feed, an open format for timetables. The feed is built from the timetables an operator already has, and after publication it is kept up to date with every change.",
      whatLabel: "What is GTFS",
      whatTitle: "A timetable in a form apps understand.",
      whatText: "GTFS sounds technical, but it is really a set of linked tables. Google fetches them regularly, so a timetable change appears in the app without manual entry.",
      samplesHint: "Click a table to see a few real rows from the Brčko District feed.",
      files: [
        { file: "stops.txt", title: "Stops", text: "The name and exact location of every stop." },
        { file: "routes.txt", title: "Routes", text: "Route number, name and colour." },
        { file: "trips.txt", title: "Trips", text: "Every run of a route, with its direction and shape." },
        { file: "stop_times.txt", title: "Times", text: "When each trip reaches each stop." },
        { file: "calendar.txt", title: "Calendar", text: "Weekdays, weekends, seasons and holidays." },
        { file: "shapes.txt", title: "Shapes", text: "The path of the vehicle along the roads, for drawing on the map." },
      ],
      demoLabel: "Example",
      demoTitle: "Brčko District",
      demoText: "An example of the whole process: urban and suburban transport in one experimental GTFS feed, built in Terminus.",
      demoMore: "View Terminus",
      stats: { routes: "routes", stops: "stops", trips: "weekday trips" },
      processLabel: "Process",
      processTitle: "From timetable to publication.",
      process: [
        {
          title: "Timetables",
          text: "The starting point is the timetables in whatever form the operator already has: PDF, spreadsheet, photo or paper.",
        },
        {
          title: "Building",
          text: "Stops with locations, routes, shapes along the roads, trips and a calendar with holidays are entered.",
        },
        {
          title: "Review",
          text: "The feed is checked with a validator, and the operator reviews routes and times before publication.",
        },
        {
          title: "Publishing and upkeep",
          text: "The feed is registered with Google and updated whenever the timetable changes.",
        },
      ],
      faqLabel: "Questions",
      faq: [
        {
          q: "What is needed to get started?",
          a: "Timetables in whatever form the operator already has. If there is no list of stops with locations, stops can be placed from the map.",
        },
        {
          q: "How long does it take?",
          a: "It depends on the number of routes and trips. A timeline can be estimated after reviewing the timetables.",
        },
        {
          q: "Does Google charge for publishing?",
          a: "No. Publishing timetables on Google Maps is free, as it is in other apps that use GTFS, such as Apple Maps, Moovit and Transit.",
        },
        {
          q: "Do vehicles need GPS?",
          a: "No. Scheduled departures are enough for Google Maps. Live delays can be added later, with GPS in the vehicles.",
        },
      ],
    },
  },
};

export const contact = {
  email: "info@digitalnavizura.com",
  links: [
    ["GitHub", "https://github.com/to0ony"],
    ["LinkedIn", "https://www.linkedin.com/in/to0ony/"],
  ],
};

// Projekti redom kojim se prikazuju. Vizual je niz screenshotova (`images`) ili karta mreže (`visual: "network"`);
// `cover` je slika na kartici projekta u popisu radova.
export const projects = [
  {
    slug: "terminus",
    title: "Terminus",
    status: true,
    visual: "network",
    cover: "/terminus/map.webp",
    stack: [".NET", "PostgreSQL", "React", "MapLibre"],
    githubLink: "https://github.com/to0ony/terminus",
    // Mockupovi na stranici projekta. `span` je širina u stupcima mreže.
    mockups: [
      {
        src: "/terminus/map.webp",
        span: 12,
        hr: "Karta uživo s trasom linije",
        en: "Live map with a route shape",
      },
      {
        src: "/terminus/schedule.webp",
        span: 6,
        hr: "Grafikon voznog reda",
        en: "Timetable graph",
      },
      {
        src: "/terminus/gtfs.webp",
        span: 6,
        hr: "GTFS uvoz i izvoz",
        en: "GTFS import and export",
      },
      {
        src: "/terminus/departures.webp",
        span: 8,
        hr: "Zaslon polazaka na stanici",
        en: "Departures display at a stop",
      },
      {
        src: "/terminus/timetable-pdf.webp",
        span: 4,
        hr: "Ispisani vozni red na stanici",
        en: "Printed timetable at a stop",
      },
    ],
    hr: {
      summary: "Izrada, objava i prikaz voznih redova u GTFS formatu.",
      description:
        "Terminus je alat za prijevoznike. U njemu se vode stanice, linije, kalendari i vožnje. Iz njih se izvozi GTFS feed za Google Maps i druge aplikacije, za stanice se rade PDF vozni redovi za print, a putnici sljedeće polaske vide na javnim zaslonima stanica. Mreža Brčko distrikta na ovoj stranici izrađena je u Terminusu.",
      features: [
        "Stanice klikom na kartu, uz prijedloge stajališta iz OpenStreetMapa",
        "Linije i varijante slaganjem stanica na karti",
        "Trase automatski po cestama, s ručnom doradom",
        "Sezone, praznici i iznimke voznog reda",
        "Grafikon voznog reda za uređivanje vožnji",
        "Uvoz postojećeg i izvoz provjerenog GTFS feeda",
        "PDF vozni red za svaku stanicu, spreman za print, s QR kodom",
        "Javni zaslon stanice sa sljedećim polascima",
      ],
    },
    en: {
      summary: "Building, publishing and displaying timetables in GTFS.",
      description:
        "Terminus is a tool for operators. In it, an operator manages stops, routes, calendars and trips. A GTFS feed for Google Maps and other apps is exported from them, stops get print-ready PDF timetables, and passengers see upcoming departures on public stop displays. The Brčko District network on this site was built in Terminus.",
      features: [
        "Stops placed on the map, with stop suggestions from OpenStreetMap",
        "Routes and variants built by picking stops on the map",
        "Shapes routed along roads automatically, with manual refinement",
        "Seasons, holidays and timetable exceptions",
        "Timetable graph for editing trips",
        "Import of existing and export of validated GTFS feeds",
        "Print-ready PDF timetable for every stop, with a QR code",
        "Public stop display with upcoming departures",
      ],
    },
  },
  {
    slug: "blokich",
    title: "Blokich",
    stack: ["Angular", "SASS", "NestJS", "Python"],
    images: [
      "/blokich/screen_1.png",
      "/blokich/screen_2.png",
      "/blokich/screen_3.png",
      "/blokich/screen_4.png",
    ],
    githubLink: "https://github.com/to0ony/blokich",
    hr: {
      summary: "Rasporedi vožnji za vozače zagrebačkog javnog prijevoza.",
      description:
        "Raspored službi i disponenata objavljuje se kao PDF, pa vozač svoje vožnje traži po dugim dokumentima. Blokich te dokumente automatski obrađuje i svakom vozaču prikazuje samo ono što ga se tiče: njegove vožnje ovaj i idući tjedan, današnju smjenu i kolege s kojima je dijeli.",
      features: [
        "Automatska obrada PDF rasporeda disponenata i službi",
        "Raspored vožnji za aktualni i naredni tjedan",
        "Današnja smjena i vozači s kojima se dijeli",
        "Svi vozači određene linije za odabrani dan",
        "Vozni red linije i ruta na karti",
      ],
    },
    en: {
      summary: "Duty schedules for Zagreb public transport drivers.",
      description:
        "Duty and dispatch rosters are published as PDFs, so drivers have to search long documents for their runs. Blokich processes those documents automatically and shows each driver only what concerns them: their runs this week and next, today's shift and the colleagues sharing it.",
      features: [
        "Automated processing of PDF duty and dispatch rosters",
        "Duty schedule for the current and next week",
        "Today's shift and the drivers sharing it",
        "All drivers on a given line for a chosen day",
        "Line timetable and route on a map",
      ],
    },
  },
];
