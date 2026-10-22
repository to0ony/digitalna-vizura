// Sav tekst stranice, na hrvatskom i engleskom.
export const content = {
  hr: {
    nav: { gtfs: "Za prijevoznike", work: "Radovi", contact: "Kontakt" },
    theme: { light: "Svijetlo", dark: "Tamno" },
    hero: {
      title: "Digitalizacija voznih redova.",
      lead: "Vozni redovi iz PDF-a, tablica ili s papira pretvoreni u GTFS, standard koji koriste Google Maps i druge aplikacije za planiranje putovanja. Za gradske, prigradske i regionalne prijevoznike.",
      cta: "Kako to izgleda",
    },
    flow: {
      label: "Kako radi",
      title: "Od voznog reda do karte.",
      steps: ["Vozni red", "GTFS", "Karta"],
      weekday: "Radni dan",
      weekend: "Subota i nedjelja",
      line: "Linija",
      more: "Više o digitalizaciji",
    },
    work: {
      title: "Radovi.",
      lead: "Aplikacije i alati nastali uz prijevoz.",
      inProgress: "U razvoju",
      view: "Pogledaj projekt",
    },
    contact: {
      label: "Kontakt",
      text: "Javite se.",
    },
    project: {
      back: "Natrag",
      stack: "Tehnologije",
      links: "Poveznice",
      features: "Mogućnosti",
      live: "Aplikacija",
    },
    gtfs: {
      label: "GTFS",
      title: "Vaše linije na Google Mapsu.",
      lead: "Stajališta, linije i polasci u standardnom GTFS formatu, vidljivi putnicima na Google Mapsu i u drugim aplikacijama za planiranje putovanja.",
      processLabel: "Proces",
      process: [
        {
          title: "Prikupljanje",
          text: "Vozni redovi u obliku koji već imate: PDF, tablica, fotografija ili papir.",
        },
        {
          title: "Modeliranje",
          text: "Stajališta, linije, trase, polasci, kalendar i iznimke za praznike.",
        },
        {
          title: "Validacija",
          text: "Provjera feeda validatorom prije objave, da Google prihvati podatke bez grešaka.",
        },
        {
          title: "Objava i održavanje",
          text: "Prijava na Google Maps i ažuriranje feeda kad se vozni red promijeni.",
        },
      ],
      benefitsLabel: "Prednosti",
      benefitsTitle: "Jedan vozni red, više namjena.",
      benefits: [
        {
          title: "Automatizacija",
          text: "Promjena voznog reda upisuje se jednom. Karte, vozni redovi na stanicama i zasloni osvježavaju se iz istih podataka.",
        },
        {
          title: "Vozni redovi za stanice",
          text: "Svaka stanica dobiva vlastiti vozni red u PDF-u, spreman za print, s QR kodom za sljedeće polaske.",
        },
        {
          title: "Zasloni na stanicama",
          text: "Monitori na stanicama i kolodvorima prikazuju sljedeće polaske i koliko je minuta do dolaska.",
        },
      ],
      demoLabel: "Primjer",
      demoTitle: "Brčko distrikt",
      demoText: "Eksperimentalni feed za gradski i prigradski prijevoz Brčko distrikta: linije, stajališta, trase i polasci u jednom GTFS feedu.",
      stats: { routes: "linija", stops: "stajališta", trips: "polazaka radnim danom" },
      faqLabel: "Pitanja",
      faq: [
        {
          q: "Što trebam pripremiti?",
          a: "Vozne redove u obliku koji već imate. Ako ne postoji popis stajališta s lokacijama, stajališta se mogu odrediti s karte.",
        },
        {
          q: "Koliko traje izrada?",
          a: "Ovisi o broju linija i polazaka. Okvirni rok dobivate uz ponudu, nakon pregleda voznih redova.",
        },
        {
          q: "Naplaćuje li Google objavu?",
          a: "Ne. Objava voznih redova na Google Mapsu za prijevoznike je besplatna.",
        },
        {
          q: "Što kad se vozni red promijeni?",
          a: "Feed se ažurira i ponovno objavljuje, za sezonske promjene, praznike ili nove linije.",
        },
        {
          q: "Gdje će se još linije pojaviti?",
          a: "GTFS je otvoreni standard. Isti feed mogu koristiti Apple Maps, Moovit, Transit i druge aplikacije.",
        },
        {
          q: "Koliko košta?",
          a: "Cijena se dogovara prema veličini mreže i potrebama. Javite se za ponudu.",
        },
      ],
    },
  },
  en: {
    nav: { gtfs: "For operators", work: "Work", contact: "Contact" },
    theme: { light: "Light", dark: "Dark" },
    hero: {
      title: "Timetables, digitised.",
      lead: "Timetables from PDFs, spreadsheets or paper turned into GTFS, the standard used by Google Maps and other journey planning apps. For urban, suburban and regional operators.",
      cta: "See how it works",
    },
    flow: {
      label: "How it works",
      title: "From timetable to map.",
      steps: ["Timetable", "GTFS", "Map"],
      weekday: "Weekdays",
      weekend: "Saturday and Sunday",
      line: "Line",
      more: "More about digitisation",
    },
    work: {
      title: "Work.",
      lead: "Apps and tools built around transport.",
      inProgress: "In progress",
      view: "View project",
    },
    contact: {
      label: "Contact",
      text: "Get in touch.",
    },
    project: {
      back: "Back",
      stack: "Stack",
      links: "Links",
      features: "Features",
      live: "Application",
    },
    gtfs: {
      label: "GTFS",
      title: "Your routes on Google Maps.",
      lead: "Stops, routes and departures in the standard GTFS format, visible to passengers on Google Maps and other journey planning apps.",
      processLabel: "Process",
      process: [
        {
          title: "Collection",
          text: "Timetables in whatever form you already have: PDF, spreadsheet, photo or paper.",
        },
        {
          title: "Modelling",
          text: "Stops, routes, shapes, departures, calendars and holiday exceptions.",
        },
        {
          title: "Validation",
          text: "The feed is checked with a validator before publishing, so Google accepts it without errors.",
        },
        {
          title: "Publishing and upkeep",
          text: "Onboarding to Google Maps and updating the feed whenever the timetable changes.",
        },
      ],
      benefitsLabel: "Benefits",
      benefitsTitle: "One timetable, many uses.",
      benefits: [
        {
          title: "Automation",
          text: "A timetable change is entered once. Maps, stop timetables and displays all update from the same data.",
        },
        {
          title: "Stop timetables",
          text: "Every stop gets its own print-ready PDF timetable, with a QR code for upcoming departures.",
        },
        {
          title: "Stop displays",
          text: "Screens at stops and stations show upcoming departures and how many minutes until they leave.",
        },
      ],
      demoLabel: "Example",
      demoTitle: "Brčko District",
      demoText: "An experimental feed for urban and suburban transport in Brčko District: routes, stops, shapes and departures in a single GTFS feed.",
      stats: { routes: "routes", stops: "stops", trips: "weekday departures" },
      faqLabel: "Questions",
      faq: [
        {
          q: "What do I need to prepare?",
          a: "Your timetables, in whatever form they exist. If there is no list of stop locations, stops can be placed from the map.",
        },
        {
          q: "How long does it take?",
          a: "It depends on the number of routes and departures. You get an estimate with the offer, after the timetables are reviewed.",
        },
        {
          q: "Does Google charge for publishing?",
          a: "No. Publishing timetables on Google Maps is free for transport operators.",
        },
        {
          q: "What happens when the timetable changes?",
          a: "The feed is updated and republished, for seasonal changes, holidays or new routes.",
        },
        {
          q: "Where else will my routes appear?",
          a: "GTFS is an open standard. The same feed can be used by Apple Maps, Moovit, Transit and other apps.",
        },
        {
          q: "How much does it cost?",
          a: "Pricing depends on the size of the network and your needs. Get in touch for an offer.",
        },
      ],
    },
  },
};

export const contact = {
  email: "info@digitalnavizura.com",
  whatsapp: "+385 99 670 5321",
  whatsappLink: "https://wa.me/385996705321",
};

// Projekti redom kojim se prikazuju. Vizual je niz screenshotova (`images`) ili karta mreže (`visual: "network"`).
export const projects = [
  {
    slug: "terminus",
    title: "Terminus",
    status: true,
    visual: "network",
    stack: [".NET", "PostgreSQL", "React", "MapLibre"],
    githubLink: "https://github.com/to0ony/terminus",
    hr: {
      summary: "Izrada, objava i prikaz voznih redova u GTFS formatu.",
      description:
        "U Terminusu prijevoznik vodi stanice, linije, kalendare i vožnje. Iz njih se izvozi GTFS feed za Google Maps i druge aplikacije, za stanice se rade PDF vozni redovi za print, a putnici sljedeće polaske vide na javnim zaslonima stanica. Mreža Brčko distrikta na ovoj stranici izrađena je u Terminusu.",
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
        "In Terminus an operator manages stops, routes, calendars and trips. A GTFS feed for Google Maps and other apps is exported from them, stops get print-ready PDF timetables, and passengers see upcoming departures on public stop displays. The Brčko District network on this site was built in Terminus.",
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
    liveLink: "https://blokich.vercel.app/login",
    githubLink: "https://github.com/to0ony/blokich",
    hr: {
      summary: "Rasporedi vožnji za vozače zagrebačkog javnog prijevoza.",
      description:
        "Raspored službi i disponenata objavljuje se kao PDF. Blokich te dokumente automatski obrađuje i svakom vozaču prikazuje samo ono što ga se tiče: njegove vožnje ovaj i idući tjedan, današnju smjenu i kolege s kojima je dijeli.",
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
        "Duty and dispatch rosters are published as PDFs. Blokich processes those documents automatically and shows each driver only what concerns them: their runs this week and next, today's shift and the colleagues sharing it.",
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
