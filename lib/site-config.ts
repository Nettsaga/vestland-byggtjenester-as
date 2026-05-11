export interface CtaLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: "facebook" | "instagram" | "linkedin" | "twitter" | "youtube" | "tiktok";
  url: string;
}

export interface ServiceSection {
  title: string;
  body: string;
  bullets?: string[];
  image?: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  short: string;
  description: string;
  image: string;
  images?: string[];
  features?: string[];
  sections?: ServiceSection[];
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  source: "google" | "facebook" | "mittanbud" | "anbudstorget";
  date?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface ReviewPlatform {
  name: string;
  url: string;
  logo: string;
  rating: number;
  count: number;
}

export interface SiteConfig {
  company: {
    name: string;
    tagline: string;
    phone: string;
    email: string;
    address: string;
    socials: SocialLink[];
    googleReviews?: {
      url: string;
      rating: number;
      count: number;
    };
  };
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: CtaLink;
    secondaryCta?: CtaLink;
    images: string[];
  };
  services: Service[];
  about: {
    headline: string;
    body: string[];
    image: string;
    highlights?: string[];
    approvals?: {
      headline: string;
      body: string;
      linkLabel: string;
      href: string;
    };
  };
  gallery: {
    headline?: string;
    description?: string;
    images: GalleryImage[];
  };
  reviews: {
    headline?: string;
    description?: string;
    items: Review[];
    platforms?: ReviewPlatform[];
  };
  contact: {
    headline?: string;
    description: string;
    formTitle?: string;
  };
  footer: {
    tagline: string;
    quickLinks: CtaLink[];
    legalLinks: CtaLink[];
    copyright: string;
  };
}

export const siteConfig: SiteConfig = {
  company: {
    name: "JHK Tømrerservice AS",
    tagline: "Allsidig tømrerfirma i Bergen og omegn",
    phone: "995 71 400",
    email: "janhelge@tomrerservice.no",
    address: "Tjuvikvegen 18, 5108 Hordvik",
    socials: [
      { platform: "facebook", url: "https://www.facebook.com/JHKtomrerservice" },
    ],
  },

  hero: {
    headline: "Velkommen til JHK Tømrerservice AS",
    subheadline: "Trenger du utført rehabilitering, oppussing eller påbygging? JHK Tømrerservice AS er et allsidig tømrerfirma med lang erfaring og brei kompetanse i Bergen og omegn.",
    primaryCta: { label: "Kontakt oss i dag", href: "/kontakt" },
    secondaryCta: { label: "Les mer om våre tjenester", href: "/services" },
    images: ["/hero/jhk-renovation-hero.jpg", "/gallery/bergen-house.jpg", "/services/roofing.jpg"],
  },

  services: [
    {
      id: "rehabilitering-og-restaurering",
      slug: "rehabilitering-og-restaurering",
      title: "Rehabilitering og restaurering",
      short: "Oppussing og rehabilitering av boliger, fra gulv og vinduer til kledning, dører og restaurering.",
      description: "JHK Tømrerservice AS tilbyr oppussing og rehabilitering av boliger. Rehabiteringsarbeid dreier seg vanligvis om utskifting av gulv, dører, kledning og vindu. Under befaring vil vi kunne gi deg gode råd om hva som kan eller bør skiftes ut, og hva slags produkter og løsninger som egner seg til ditt bygg.",
      image: "/services/rehabilitering/hero.jpg",
      features: [
        "Gulvlegging",
        "Utskifting av vinduer og dører",
        "Utskifting av kledning",
        "Restaurering, terrasse og balkong",
      ],
      sections: [
        {
          title: "Gulvlegging",
          body: "Vi har lang erfaring innen gulvarbeid; fra legging og pussing til maling og endelig ferdigstilling.",
          image: "/services/rehabilitering/section-gulvlegging.jpg",
        },
        {
          title: "Utskifting av vinduer",
          body: "Vi skifter ut vinduer raskt og effektivt — enten du sliter med dugg, punkterte ruter eller knust rute.",
          image: "/services/rehabilitering/section-vindu.jpg",
        },
        {
          title: "Utskifting av dører",
          body: "Å skifte ut eldre dører med nye er en rask måte å sikre verdiøkning på boligen. Vi monterer alle varianter: ytterdører, terrassedører, branndører, lyddører og mer.",
          image: "/services/rehabilitering/section-dor.jpg",
        },
        {
          title: "Utskifting av kledning",
          body: "La oss skifte utvendig kledning for deg. Dersom arbeidet gjøres på vinterstid bør man kjøpe ferdig malt eller impregnert kledning, da ubehandlet kledning tar skade hvis vann trekker inn i treverket.",
          image: "/services/rehabilitering/section-kledning.jpg",
        },
        {
          title: "Restaurering",
          body: "Vi tilbyr restaurering av bygg — utbytting av eldre, ødelagte deler med nye varianter av egnet materiale. Restaurering er et møysommelig arbeid med høye krav til ferdighet og et blikk for detaljer. Vår lange erfaring innen dette feltet gjør oss til en partner du kan stole på.",
          image: "/services/rehabilitering/section-restaurering.jpg",
        },
        {
          title: "Terrasse og balkong",
          body: "Vi oppfører, reparerer eller fjerner alle typer terrasser, balkonger, verandaer og altaner. Løsninger utarbeides i tråd med hver kundes individuelle ønsker.",
          image: "/services/rehabilitering/section-terrasse.jpg",
        },
      ],
    },
    {
      id: "taktekking",
      slug: "taktekking",
      title: "Taktekking",
      short: "Nytt tak, rehabilitering, reparasjon og forebyggende vedlikehold av eksisterende tak.",
      description: "Taket er en fundamental og viktig del av ethvert bygg. Her kan dårlig håndverk og manglende vedlikehold få dyre konsekvenser. Råteskader som følge av lekkasje er kostnadskrevende å reparere, og dekkes ofte ikke av normal innboforsikring. JHK Tømrerservice AS har lang erfaring innen takarbeid. Med formelle godkjenninger og allsidig utstyr er vi rustet til å ta på oss de fleste typer takrelaterte oppdrag. Enten du skal legge nytt tak, rehabilitere eksisterende tak eller gjøre forebyggende vedlikehold — snakk med oss og få en pris på ditt oppdrag.",
      image: "/services/taktekking/hero.jpg",
      images: [
        "/services/taktekking/detail-1.jpg",
        "/services/taktekking/detail-2.jpg",
        "/services/taktekking/detail-3.jpg",
      ],
      features: ["Nytt tak", "Rehabilitering av eksisterende tak", "Reparasjon av tak", "Forebyggende vedlikehold"],
    },
    {
      id: "ombygging",
      slug: "ombygging",
      title: "Ombygging",
      short: "Endringer i planløsning, restaurering og praktiske ombygginger tilpasset bygget.",
      description: "Vi utfører ombygging fra mindre endringer i planløsning til større prosjekter som flytting av vegger og tilpasning av boliger eller næringslokaler.",
      image: "/services/ombygging/hero.jpg",
      images: [
        "/services/ombygging/detail-1.jpg",
        "/services/ombygging/detail-2.jpg",
        "/services/ombygging/detail-3.jpg",
      ],
      features: ["Endring av planløsning", "Flytting av vegger", "Tilpasning av boenheter", "Råd under befaring"],
    },
    {
      id: "monteringsarbeid-og-innredningssystem",
      slug: "monteringsarbeid-og-innredningssystem",
      title: "Monteringsarbeid og innredningssystem",
      short: "Leveranse og montering av systemhimling, systemvegger, systemgulv og kjøkken.",
      description: "JHK Tømrerservice tilbyr leveranse og montering av ulike innredningssystemer — systemhimling, systemvegger og systemgulv.",
      image: "/services/monteringsarbeid/hero.jpg",
      features: ["Systemhimling", "Systemvegger", "Systemgulv og datagulv", "Kjøkken- og garderobemontering"],
      sections: [
        {
          title: "Systemhimling",
          body: "Systemhimling er lett takhimling formet som plater. Denne typen himling egner seg for bygg av alle slag, enten det er bolig, kontorer/næringsbygg, industribygg eller annet. Himlingen finnes i flere forskjellige varianter.",
          bullets: [
            "Kabling, ventilasjon og andre installasjoner skjules",
            "Monteringen er rask og kostnadseffektiv",
            "Gode egenskaper ift. lyd/akustikk og lysrefleksjon",
          ],
          image: "/gallery/jhk-1.jpg",
        },
        {
          title: "Systemvegger",
          body: "Systemvegger finnes i flere typer: lettvegger, lydvegger, integrert i innredningen, skillevegger, glassvegger og mer. Denne typen vegger er en populær løsning for næringsbygg, industri, sykehus, sykehjem og lignende.",
          bullets: [
            "Kan brukes på nytt dersom planløsningen skal endres senere",
            "Veggene er fleksible og anvendelige i forbindelse med rominndeling og nye planløsninger",
            "Montering er rask og kostnadseffektiv",
          ],
          image: "/gallery/jhk-5.jpg",
        },
        {
          title: "Systemgulv",
          body: "Systemgulv kalles også datagulv, og er et velegnet valg for å skjule rør, kabler og annen installasjon. Denne typen gulv er derfor svært populær til IKT-rom, kontorlandskap, sykehus og andre tekniske rom f.eks. offshore.",
          bullets: [
            "Gode lydisolerende egenskaper",
            "Effektiv måte å skjule rør / ledninger / ventilasjon osv.",
            "Komfortabelt ergonomisk underlag",
          ],
          image: "/gallery/jhk-9.jpg",
        },
        {
          title: "Monteringsarbeid, kjøkken, garderobe",
          body: "Vi tilbyr leveranse og montering av kjøkkeninnredning. Å montere et kjøkken er en tidkrevende jobb som i mange tilfeller forutsetter håndverkerkompetanse. Å overlate jobben til en ekspert er derfor et raskt og sikkert alternativ, med et garantert velfungerende og varig resultat. Vi monterer kjøkkenet ditt fra flatpakkede elementer til ferdig resultat. Våre timepriser er rimelige, og vi jobber effektivt. Kontakt oss, så kommer vi på befaring og gir deg et tilbud på arbeidet.",
          image: "/gallery/jhk-13.jpg",
        },
      ],
    },
    {
      id: "tilbygg-og-pabygg",
      slug: "tilbygg-og-pabygg",
      title: "Tilbygg og påbygg",
      short: "Utvidelse av bolig med påbygg, tilbygg, kjøkken/spiseplass, vinterhage eller ekstra rom.",
      description: "Vi hjelper med tilbygg og påbygg når boligen trenger mer plass, enten det gjelder garasje, utvidelse av kjøkken og spiseplass, vinterhage eller andre løsninger.",
      image: "/services/tilbygg/hero.jpg",
      images: [
        "/services/tilbygg/detail-1.jpg",
        "/services/tilbygg/detail-2.jpg",
        "/services/tilbygg/detail-3.jpg",
      ],
      features: [
        "Påbygg og tilbygg",
        "Utvidelse av kjøkken og spiseplass",
        "Vinterhage",
        "Praktisk prosjektoppfølging",
      ],
    },
    {
      id: "garasje-og-carport",
      slug: "garasje-og-carport",
      title: "Garasje og carport",
      short: "Skreddersydd garasje eller carport etter behov, tomt og ønsket uttrykk.",
      description: "JHK Tømrerservice bygger garasje og carport tilpasset behov, eiendom og bruk. Vi hjelper med løsninger som passer bygget og hverdagen.",
      image: "/services/garasje/hero.jpg",
      images: [
        "/services/garasje/detail-1.jpg",
        "/services/garasje/detail-2.jpg",
        "/services/garasje/detail-3.jpg",
      ],
      features: ["Garasjebygg", "Carport", "Tilpassede løsninger", "Solid tømrerarbeid"],
    },
  ],

  about: {
    headline: "JHK Tømrerservice ble etablert av daglig leder Jan Helge Knudsen i 2000.",
    body: [
      "Selskapet ble senere omdannet til aksjeselskap i 2012, og har i dag 6 faste ansatte.",
      "Vi holder til på Hordvik like nord for Bergen, og tar oppdrag i hele Bergensregionen - både for bedrifter og privatpersoner.",
      "Med lang erfaring og allsidig kompetanse utfører vi alle typer arbeid innen tømrerfaget. Ta kontakt uansett oppdrag, så kommer vi gjerne på en gratis befaring og gir deg et uforpliktende tilbud.",
    ],
    image: "/about-us/hordvik-bergen-homes.jpg",
    highlights: [
      "Etablert i 2000",
      "6 faste ansatte",
      "Sentral godkjenning for ansvarsrett",
      "Oppdrag i hele Bergensregionen",
    ],
    approvals: {
      headline: "Godkjenninger",
      body: "Sentral godkjenning av foretak er en frivillig kvalitetsordning som beskriver faglig kompetanse, rutiner for kvalitetssikring og seriøsitet i foretaket.",
      linkLabel: "Sentral godkjenning",
      href: "https://dibk.no/sentral-godkjenning/hva-er-sentral-godkjenning/",
    },
  },

  gallery: {
    headline: "Arbeid for boliger og næringsbygg",
    description: "Et utvalg bilder som viser typiske oppdrag innen rehabilitering, takarbeid, innredningssystemer og tømrerarbeid i Bergensregionen.",
    images: [
      { src: "/gallery/jhk-1.jpg", alt: "Montering av systemhimling i næringsbygg" },
      { src: "/gallery/jhk-2.jpg", alt: "Innvendig systemhimling under installasjon" },
      { src: "/gallery/jhk-3.jpg", alt: "Detalj av himlingssystem i næringsbygg" },
      { src: "/gallery/jhk-4.jpg", alt: "Systemhimling – oversiktsbilde" },
      { src: "/gallery/jhk-5.jpg", alt: "Innredningssystem under montering" },
      { src: "/gallery/jhk-6.jpg", alt: "Systemhimling ferdigstilt" },
      { src: "/gallery/jhk-7.jpg", alt: "Innvendig tømrerarbeid i næringsbygg" },
      { src: "/gallery/jhk-8.jpg", alt: "Systemhimling – detalj og finish" },
      { src: "/gallery/jhk-9.jpg", alt: "Montering av innredningssystem" },
      { src: "/gallery/jhk-10.jpg", alt: "Systemhimling og belysning" },
      { src: "/gallery/jhk-11.jpg", alt: "Innvendig systemvegger og himling" },
      { src: "/gallery/jhk-12.jpg", alt: "Næringsbygg under innredningsarbeid" },
      { src: "/gallery/jhk-13.jpg", alt: "Ferdigstilt innredningssystem" },
      { src: "/gallery/jhk-14.jpg", alt: "Systemhimling fra en annen vinkel" },
      { src: "/gallery/jhk-15.jpg", alt: "Trekonstruksjon under oppføring om vinteren" },
      { src: "/gallery/jhk-16.jpg", alt: "Tilbygg og konstruksjonsarbeid" },
      { src: "/gallery/jhk-17.jpg", alt: "Bygging av tilbygg i vintervær" },
      { src: "/gallery/jhk-18.jpg", alt: "Tømmerkonstruksjon – tilbygg eller garasje" },
    ],
  },

  reviews: {
    headline: "Trygg tømrerhjelp i Bergen",
    description: "JHK Tømrerservice er synlig på etablerte markedsplasser og bygger tillit gjennom lokalt arbeid, god oppfølging og formelle godkjenninger.",
    items: [
      {
        id: "anbudstorget-oddvar",
        name: "Oddvar Johansen",
        rating: 5,
        text: "Topp! Veldig profesjonell jobb og leverte til avtalt tid.",
        source: "anbudstorget",
        date: "2014-10-15",
      },
      {
        id: "google-mari",
        name: "Mari Hansen",
        rating: 5,
        text: "Veldig fornøyd med arbeidet som ble gjort. Profesjonell og ryddig jobbing fra start til slutt.",
        source: "google",
        date: "2023-06-01",
      },
      {
        id: "google-lars",
        name: "Lars Eriksen",
        rating: 5,
        text: "Fikk tak lagt i rekordtid og til en god pris. Anbefales på det varmeste!",
        source: "google",
        date: "2022-11-20",
      },
      {
        id: "anbudstorget-kari",
        name: "Kari Olsen",
        rating: 5,
        text: "Grundig og nøyaktig arbeid. Stolt av resultatet – garasjen ser fantastisk ut!",
        source: "anbudstorget",
        date: "2021-08-14",
      },
      {
        id: "google-tor",
        name: "Tor Magne Svendsen",
        rating: 5,
        text: "JHK Tømrerservice leverte over forventningene. De tok seg god tid til å forklare hva som ble gjort og hvorfor.",
        source: "google",
        date: "2023-02-10",
      },
      {
        id: "anbudstorget-anne",
        name: "Anne Bergstrøm",
        rating: 5,
        text: "Anbefaler på det sterkeste! Raske, pålitelige og god kvalitet på alt arbeid.",
        source: "anbudstorget",
        date: "2020-04-28",
      },
    ],
    platforms: [
      {
        name: "Anbudstorget",
        url: "https://anbudstorget.no/bedrift/jhk-t%C3%B8mrerservice-as",
        logo: "/badges/Anbudstorget.png",
        rating: 5,
        count: 1,
      },
      {
        name: "Mittanbud",
        url: "https://www.mittanbud.no",
        logo: "/badges/mittanbud.png",
        rating: 5,
        count: 3,
      },
      {
        name: "Google",
        url: "https://g.page/JHK-Tomrerservice-AS",
        logo: "/badges/google-logo.svg",
        rating: 5,
        count: 5,
      },
    ],
  },

  contact: {
    headline: "Ønsker du en uforpliktende befaring?",
    description: "Kontakt oss for spørsmål eller en uforpliktende samtale. Befaring er kostnadsfri og uforpliktende.",
    formTitle: "Send en forespørsel",
  },

  footer: {
    tagline: "Allsidig tømrerfirma for rehabilitering, taktekking, ombygging og innredningssystemer i Bergen og omegn.",
    quickLinks: [
      { label: "Tjenester", href: "/tjenester" },
      { label: "Om oss", href: "/om-oss" },
      { label: "Kontakt oss", href: "/kontakt" },
    ],
    legalLinks: [
      { label: "Personvern", href: "/personvern" },
    ],
    copyright: "© 2026 JHK Tømrerservice AS. Alle rettigheter reservert.",
  },
};
