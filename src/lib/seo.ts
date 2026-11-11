// Gemensam SEO/GEO-hjälp: metadata per sida och strukturerad data (schema.org).
// Varje route anropar sidhuvud() i sin head() – då blir titel, beskrivning, canonical,
// delningsbild och strukturerad data likadana överallt.
import { absolut, FORETAG, SAJT_URL } from "@/lib/foretag";
import { utanLankar } from "@/lib/lankar";
import type { Guide } from "@/lib/guider";
import type { ProjektVideo } from "@/lib/projekt";
import { PAKET, PRIS, type Fraga } from "@/lib/priser";
import { TJANSTER, tjanstSokvag, type Tjanst } from "@/lib/tjanster";

/** Standardbilden när en länk delas. Sidor med egen bild skickar `bild` till sidhuvud(). */
export const DELNINGSBILD = { src: "/og.jpg", bredd: 1200, hojd: 630 } as const;

/** Guidens egen delningsbild (public/og/guider/<slug>.jpg), annars standardbilden. */
export function guideBild(g: Guide): string {
  return g.delningsbild ?? DELNINGSBILD.src;
}

const FORETAG_ID = `${SAJT_URL}/#foretag`;

type Schema = Record<string, unknown>;

/** JSON-LD som går säkert att lägga i en <script>-tagg. */
export function jsonLd(schema: Schema) {
  return {
    type: "application/ld+json",
    children: JSON.stringify(schema).replace(/</g, "\\u003c"),
  };
}

export function sidhuvud({
  titel,
  beskrivning,
  sokvag,
  schema = [],
  bild,
}: {
  /** Titel utan företagsnamn – det läggs till automatiskt. */
  titel: string;
  beskrivning: string;
  sokvag: string;
  schema?: readonly Schema[];
  /** Egen delningsbild (1200 × 630) med alt-text. Utelämnad = standardbilden. */
  bild?: { src: string; alt: string };
}) {
  const fullTitel = titel === FORETAG.namn ? titel : `${titel} | ${FORETAG.namn}`;
  const url = absolut(sokvag);
  return {
    meta: [
      { title: fullTitel },
      { name: "description", content: beskrivning },
      { property: "og:title", content: fullTitel },
      { property: "og:description", content: beskrivning },
      { property: "og:url", content: url },
      { property: "og:image", content: absolut(bild?.src ?? DELNINGSBILD.src) },
      { property: "og:image:width", content: String(DELNINGSBILD.bredd) },
      { property: "og:image:height", content: String(DELNINGSBILD.hojd) },
      {
        property: "og:image:alt",
        content: bild?.alt ?? `${FORETAG.namn} – bilder, SEO, GEO, Meta-annonser och hemsidor`,
      },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: schema.map(jsonLd),
  };
}

/** Företaget och webbplatsen – ligger på alla sidor via roten. */
export function grundSchema(): Schema {
  const adress: Schema = {
    "@type": "PostalAddress",
    addressLocality: FORETAG.ort,
    addressCountry: "SE",
  };
  if (FORETAG.gata) adress["streetAddress"] = FORETAG.gata;
  if (FORETAG.postnummer) adress["postalCode"] = FORETAG.postnummer;

  const foretag: Schema = {
    "@type": "ProfessionalService",
    "@id": FORETAG_ID,
    name: FORETAG.namn,
    legalName: FORETAG.juridisktNamn,
    description: FORETAG.beskrivning,
    url: absolut("/"),
    logo: absolut("/logo.png"),
    image: absolut(DELNINGSBILD.src),
    address: adress,
    areaServed: { "@type": "Country", name: "Sverige" },
    priceRange: `${PRIS.studioS}–${PRIS.extern} SEK`,
    knowsAbout: TJANSTER.map((t) => t.titel),
  };
  if (FORETAG.telefon) foretag["telephone"] = FORETAG.telefonLank;
  if (FORETAG.epost) foretag["email"] = FORETAG.epost;
  if (FORETAG.orgnr) foretag["taxID"] = FORETAG.orgnr;
  if (FORETAG.momsnr) foretag["vatID"] = FORETAG.momsnr;

  return {
    "@context": "https://schema.org",
    "@graph": [
      foretag,
      {
        "@type": "WebSite",
        "@id": `${SAJT_URL}/#webbplats`,
        // Namnet Google visar som sajtnamn i sökresultaten.
        name: FORETAG.namn,
        alternateName: FORETAG.kortnamn,
        url: absolut("/"),
        inLanguage: "sv-SE",
        publisher: { "@id": FORETAG_ID },
      },
    ],
  };
}

/**
 * Tjänsten som strukturerad data. `sida` används när en landningssida beskriver en del av
 * tjänsten (t.ex. /seo-byra för SEO) – då med sidans eget namn, text och adress.
 */
export function tjanstSchema(
  t: Tjanst,
  sida?: {
    namn: string;
    beskrivning: string;
    sokvag: string;
    /** Orter/regioner tjänsten riktar sig till på just den sidan. Utelämnas: hela Sverige. */
    omraden?: readonly { typ: "City" | "AdministrativeArea"; namn: string }[];
  },
): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: sida?.namn ?? t.titel,
    serviceType: t.titel,
    description: sida?.beskrivning ?? t.seoBeskrivning,
    url: absolut(sida?.sokvag ?? tjanstSokvag(t)),
    ...(t.galleri ? { image: t.galleri.map((b) => absolut(b.src)) } : {}),
    provider: { "@id": FORETAG_ID },
    areaServed: sida?.omraden
      ? sida.omraden.map((o) => ({ "@type": o.typ, name: o.namn }))
      : { "@type": "Country", name: "Sverige" },
    offers: {
      "@type": "Offer",
      description: t.pris.avser,
      priceCurrency: "SEK",
      priceSpecification: {
        "@type": t.pris.manad ? "UnitPriceSpecification" : "PriceSpecification",
        priceCurrency: "SEK",
        valueAddedTaxIncluded: false,
        ...(t.pris.manad ? { unitText: "månad" } : {}),
        ...(t.pris.fran ? { minPrice: t.pris.belopp } : { price: t.pris.belopp }),
      },
    },
  };
}

/** Gör ett datum (ÅÅÅÅ-MM-DD) till fullständig ISO 8601 med tid och svensk tidszon, t.ex.
 * "2026-10-22T12:00:00+02:00". Google vill ha tid och tidszon i uploadDate. Klockslaget är
 * satt till mitt på dagen så att datumet blir rätt i alla tidszoner. Värden som redan har tid
 * lämnas orörda. */
export function svenskDatumTid(datum: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(datum)) return datum;
  const mitt = new Date(`${datum}T12:00:00Z`);
  const zon = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Stockholm",
    timeZoneName: "longOffset",
  })
    .formatToParts(mitt)
    .find((d) => d.type === "timeZoneName")?.value;
  const offset = zon?.replace("GMT", "") || "+01:00";
  return `${datum}T12:00:00${offset}`;
}

/** VideoObject för en visningsfilm på sidan. Ger ingen videominiatyr i Google (filmen är inte
 * sidans huvudinnehåll), men beskriver filmen för sökmotorer och AI-tjänster. */
export function videoSchema(v: ProjektVideo): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.namn,
    description: v.beskrivning,
    thumbnailUrl: absolut(`/video/${v.fil}.webp`),
    contentUrl: absolut(`/video/${v.fil}.mp4`),
    uploadDate: svenskDatumTid(v.publicerad),
    duration: v.langd,
    inLanguage: "sv-SE",
    publisher: { "@id": FORETAG_ID },
  };
}

export function faqSchema(fragor: readonly Fraga[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: fragor.map((f) => ({
      "@type": "Question",
      name: f.fraga,
      acceptedAnswer: { "@type": "Answer", text: utanLankar(f.svar) },
    })),
  };
}

export function brodsmulor(steg: readonly { namn: string; sokvag: string }[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: steg.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.namn,
      item: absolut(s.sokvag),
    })),
  };
}

/** Alla månadsnivåer som erbjudanden – används på prissidan. */
export function paketSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Löpande tjänster",
    url: absolut("/priser"),
    itemListElement: PAKET.map((p) => ({
      "@type": "Offer",
      name: p.namn,
      description: p.ingar.join(", "),
      seller: { "@id": FORETAG_ID },
      priceCurrency: "SEK",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: p.belopp,
        priceCurrency: "SEK",
        unitText: "månad",
        valueAddedTaxIncluded: false,
      },
    })),
  };
}

/** En guide som artikel – visar Google och AI-tjänster vem som skrivit den och när. */
export function artikelSchema(g: Guide): Schema {
  const url = absolut(`/guider/${g.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.rubrik.text,
    description: g.seoBeskrivning,
    url,
    mainEntityOfPage: url,
    datePublished: g.publicerad,
    dateModified: g.uppdaterad,
    inLanguage: "sv-SE",
    image: absolut(guideBild(g)),
    author: { "@id": FORETAG_ID },
    publisher: { "@id": FORETAG_ID },
  };
}
