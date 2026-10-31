// Enda källan till företagsuppgifter. Allt på sajten (sidfot, kontakt, integritetspolicy,
// metadata, strukturerad data och llms.txt) läser härifrån.
//
// Fält med tomt värde visas inte på sajten förrän de fylls i.
// Adressen är bolagets säte – inte en besöksadress. TAB träffar kunder digitalt, på telefon eller
// hos kunden i Göteborgsområdet – skriv aldrig "besök oss" eller "vårt kontor". TODO(TAB): fyll i telefon när ni vill visa den.
export const FORETAG: {
  /** Varumärket som syns på sajten. */
  namn: string;
  /** Kort form – "Varför TAB", "Om TAB" m.m. */
  kortnamn: string;
  /** Bolaget som driver verksamheten (personuppgiftsansvarig, fakturerar). */
  juridisktNamn: string;
  /** En mening om vad företaget gör – används i metadata, strukturerad data och llms.txt. */
  beskrivning: string;
  /** Säte. Används bara i adressen och den strukturerade datan – inte i rubriker eller texter. */
  ort: string;
  orgnr: string;
  momsnr: string;
  gata: string;
  postnummer: string;
  adress: string;
  telefon: string;
  telefonLank: string;
  epost: string;
  oppettider: readonly { dagar: string; tid: string }[];
  personer: readonly { namn: string; roll: string }[];
} = {
  namn: "TAB Marketing",
  kortnamn: "TAB",
  juridisktNamn: "Treatly AB",
  beskrivning:
    "Marknadsföringsbyrå som tar fram marknadsföringsbilder, sköter SEO, GEO och Meta-annonser och bygger och förbättrar hemsidor åt företag i hela Sverige, till fasta priser.",
  ort: "Göteborg",
  orgnr: "559582-8046",
  momsnr: "SE559582804601",
  gata: "Svenslyckegatan 16",
  postnummer: "416 56",
  adress: "Svenslyckegatan 16, 416 56 Göteborg",
  telefon: "",
  telefonLank: "",
  epost: "edvin@treatlymarketing.se",
  oppettider: [],
  personer: [],
};

declare const __SAJT_URL__: string;
declare const __VERIFIERING__: { google: string; bing: string };

/** Verifieringskoder för Search Console och Bing Webmaster Tools (tomma om de inte är satta). */
export const VERIFIERING = __VERIFIERING__;

/** Sajtens publika adress utan avslutande snedstreck, t.ex. https://exempel.se */
export const SAJT_URL: string = __SAJT_URL__;

/** Gör en sökväg (/priser) till en absolut adress (https://…/priser). */
export function absolut(sokvag: string): string {
  return `${SAJT_URL}${sokvag === "/" ? "/" : sokvag}`;
}
