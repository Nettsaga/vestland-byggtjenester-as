export interface CtaLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: "facebook" | "instagram" | "linkedin" | "twitter" | "youtube" | "tiktok";
  url: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  short: string;
  description: string;
  image: string;
  features?: string[];
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
    secondaryCta: { label: "Les mer om våre tjenester", href: "/tjenester" },
    images: ["/hero/jhk-renovation-hero.jpg", "/gallery/bergen-house.jpg", "/services/roofing.jpg"],
  },

  services: [
    {
      id: "rehabilitering-og-restaurering",
      slug: "rehabilitering-og-restaurering",
      title: "Rehabilitering og restaurering",
      short: "Oppussing og rehabilitering av boliger, fra gulv og vinduer til kledning, dører og restaurering.",
      description: "Rehabiliteringsarbeid dreier seg vanligvis om utskifting av gulv, dører, kledning og vindu. Under befaring gir vi råd om hva som kan eller bør skiftes ut, og hvilke produkter og løsninger som egner seg til ditt bygg.",
      image: "/services/rehabilitering.jpg",
      features: [
        "Gulvlegging",
        "Utskifting av vinduer og dører",
        "Utskifting av kledning",
        "Restaurering, terrasse og balkong",
      ],
    },
    {
      id: "taktekking",
      slug: "taktekking",
      title: "Taktekking",
      short: "Nytt tak, rehabilitering, reparasjon og forebyggende vedlikehold av eksisterende tak.",
      description: "Taket er en fundamental og viktig del av ethvert bygg. JHK Tømrerservice AS har lang erfaring innen takarbeid, formelle godkjenninger og allsidig utstyr for de fleste typer takrelaterte oppdrag.",
      image: "/services/roofing.jpg",
      features: ["Nytt tak", "Rehabilitering av eksisterende tak", "Reparasjon av tak", "Forebyggende vedlikehold"],
    },
    {
      id: "ombygging",
      slug: "ombygging",
      title: "Ombygging",
      short: "Endringer i planløsning, restaurering og praktiske ombygginger tilpasset bygget.",
      description: "Vi utfører ombygging fra mindre endringer i planløsning til større prosjekter som flytting av vegger og tilpasning av boliger eller næringslokaler.",
      image: "/services/ombygging.jpg",
      features: ["Endring av planløsning", "Flytting av vegger", "Tilpasning av boenheter", "Råd under befaring"],
    },
    {
      id: "monteringsarbeid-og-innredningssystem",
      slug: "monteringsarbeid-og-innredningssystem",
      title: "Monteringsarbeid og innredningssystem",
      short: "Leveranse og montering av systemhimling, systemvegger, systemgulv og kjøkken.",
      description: "JHK Tømrerservice tilbyr leveranse og montering av ulike innredningssystemer. Vi monterer systemhimling, systemvegger, systemgulv og kjøkken fra flatpakkede elementer til ferdig resultat.",
      image: "/services/interior-systems.jpg",
      features: ["Systemhimling", "Systemvegger", "Systemgulv og datagulv", "Kjøkken- og garderobemontering"],
    },
    {
      id: "tilbygg-og-pabygg",
      slug: "tilbygg-og-pabygg",
      title: "Tilbygg og påbygg",
      short: "Utvidelse av bolig med påbygg, tilbygg, kjøkken/spiseplass, vinterhage eller ekstra rom.",
      description: "Vi hjelper med tilbygg og påbygg når boligen trenger mer plass, enten det gjelder garasje, utvidelse av kjøkken og spiseplass, vinterhage eller andre løsninger.",
      image: "/services/extension.jpg",
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
      image: "/services/garage-carport.jpg",
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
      { src: "/hero/jhk-renovation-hero.jpg", alt: "Tømrerarbeid på bolig under rehabilitering" },
      { src: "/services/roofing.jpg", alt: "Takarbeid på bolig" },
      { src: "/services/interior-systems.jpg", alt: "Montering og innvendig tømrerarbeid" },
      { src: "/services/extension.jpg", alt: "Takkonstruksjon under arbeid" },
      { src: "/gallery/bergen-house.jpg", alt: "Trehus i Bergen" },
      { src: "/gallery/wood-detail.jpg", alt: "Detalj av trekonstruksjon" },
    ],
  },

  reviews: {
    headline: "Trygg tømrerhjelp i Bergen",
    description: "JHK Tømrerservice er synlig på etablerte markedsplasser og bygger tillit gjennom lokalt arbeid, god oppfølging og formelle godkjenninger.",
    items: [
      {
        id: "anbudstorget-oddvar",
        name: "Oddvar",
        rating: 5,
        text: "Topp!",
        source: "anbudstorget",
        date: "2014-10-15",
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
        name: "Google",
        url: "https://g.page/JHK-Tomrerservice-AS",
        logo: "/badges/google-logo.svg",
        rating: 5,
        count: 0,
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
      { label: "Kontakt", href: "/kontakt" },
    ],
    legalLinks: [
      { label: "Personvern", href: "/personvern" },
    ],
    copyright: "© 2026 JHK Tømrerservice AS. Alle rettigheter reservert.",
  },
};
