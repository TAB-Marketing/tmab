import type { Mastare } from "@/components/MastarHero";

/**
 * Mästarna i Sal II (startsidans galleri) som hero på varje tjänstesida: en målning man kliver
 * in i (MastarHero.tsx). Tavlan växlar sida – Linné till höger, Sokrates till vänster osv. –
 * så att tjänstesidorna inte ser likadana ut. Bilderna är AI-genererade (okt–nov 2026):
 * bakgrund 1672 × 941 (+ 1000 px), figuren utklippt med genomskinlig bakgrund (900 + 560 px).
 */
export type MastarHeroData = Mastare;

function bilder(namn: string, figurHojd: number) {
  return {
    bakgrund: {
      src: `/mastare/${namn}-bakgrund.webp`,
      srcSet: `/mastare/${namn}-bakgrund-1000.webp 1000w, /mastare/${namn}-bakgrund.webp 1672w`,
    },
    figur: {
      src: `/mastare/${namn}-900.webp`,
      srcSet: `/mastare/${namn}-560.webp 560w, /mastare/${namn}-900.webp 900w`,
      bredd: 900,
      hojd: figurHojd,
    },
  };
}

function mastare(
  namn: string,
  figurHojd: number,
  d: Omit<MastarHeroData, "bakgrund" | "figur"> & { alt: string },
): MastarHeroData {
  const b = bilder(namn, figurHojd);
  const { alt, ...rest } = d;
  return { ...rest, bakgrund: { ...b.bakgrund, alt }, figur: b.figur };
}

/** Per tjänst (slug i tjanster.ts). */
export const MASTAR_HERO = {
  seo: mastare("linne", 1082, {
    person: "Carl von Linné",
    levde: "1707–1778",
    bildtext: "Gav varje växt ett namn och en plats, så att allt gick att hitta.",
    alt: "Målning av ett svenskt landskap i morgondimma, med blomsteräng, björkskog och sjöar",
    plats: "Sal II · Verk nr 1",
    sida: "hoger",
  }),
  geo: mastare("sokrates", 1094, {
    person: "Sokrates",
    levde: "ca 470–399 f.Kr.",
    bildtext: "Lärde ut genom frågor och svar, så att sanningen kom fram.",
    alt: "Målning av antikens Aten i morgonljus, med Parthenon på Akropolis, olivlundar och Egeiska havet",
    plats: "Sal II · Verk nr 2",
    sida: "vanster",
  }),
  "meta-annonser": mastare("aristoteles", 1094, {
    person: "Aristoteles",
    levde: "384–322 f.Kr.",
    bildtext: "Skrev om hur man övertygar: med förtroende, känsla och förnuft.",
    alt: "Målning av det antika Makedonien i eftermiddagsljus, med en flodslätt, ett tempel och Olympen i fjärran",
    plats: "Sal II · Verk nr 3",
    sida: "hoger",
  }),
  hemsideoptimering: mastare("nightingale", 1094, {
    person: "Florence Nightingale",
    levde: "1820–1910",
    bildtext: "Mätte, ritade diagram och ändrade efter vad siffrorna visade.",
    alt: "Målning av engelsk landsbygd i skymning, med kullar, stenmurar och en herrgård med tända fönster",
    plats: "Sal II · Verk nr 4",
    sida: "vanster",
  }),
  marknadsforingsbilder: mastare("vermeer", 1094, {
    person: "Johannes Vermeer",
    levde: "1632–1675",
    bildtext: "Började varje bild med hur ljuset föll.",
    alt: "Målning av holländsk landsbygd utanför Delft, med kanaler, väderkvarnar och en stor molnhimmel",
    plats: "Sal II · Verk nr 5",
    sida: "hoger",
  }),
  hemsida: mastare("davinci", 1094, {
    person: "Leonardo da Vinci",
    levde: "1452–1519",
    bildtext: "Förenade konst och teknik i samma hand.",
    alt: "Målning av toskanska kullar i morgondis, med cypresser, vingårdar och Florens domkyrka i fjärran",
    plats: "Sal II · Verk nr 6",
    sida: "vanster",
  }),
} satisfies Record<string, MastarHeroData>;

export function mastarHero(slug: string): MastarHeroData | undefined {
  return (MASTAR_HERO as Record<string, MastarHeroData>)[slug];
}
