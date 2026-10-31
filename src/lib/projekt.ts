// Tidigare projekt som visas på startsidan.
// TODO(TAB): stämmer beskrivningarna med vad ni faktiskt gjorde i varje uppdrag?
export type Projekt = {
  namn: string;
  kategori: string;
  text: string;
  url: string;
  doman: string;
  /** Två färger ur blob-paletten som ger kortet sin egen färgklick. */
  farger: readonly [string, string];
  /**
   * Riktiga skärmbilder av sajten (public/projekt/). Tagna från projektets egen källkod
   * 2026-10-19 – ta nya när sajten ändras.
   */
  skarmbild?: { dator: string; mobil: string };
  /** Vad vi gjorde – bara sådant som faktiskt levererats. Inga påhittade siffror. */
  gjorde?: readonly string[];
};

export const PROJEKT: readonly Projekt[] = [
  {
    namn: "Hvittfeldt Invest",
    kategori: "Styrelsearbete",
    text: "Ankie Hvittfeldt, styrelseordförande och styrelseledamot med över 30 styrelseuppdrag i ägarledda, statligt ägda och noterade bolag.",
    url: "https://www.hvittfeldtinvest.se",
    doman: "hvittfeldtinvest.se",
    farger: ["#ff7ad9", "#a0237a"],
    // TODO(TAB): stämmer listan? Skrev ni texterna också – lägg i så fall till det.
    gjorde: [
      "Hemsida – design och utveckling",
      "Sökmotoranpassade titlar, beskrivningar och delningsbild",
      "Drift och administration av sajten",
    ],
  },
  {
    namn: "Treatly",
    kategori: "Personaluppvaktning",
    text: "Födelsedagar, jubileum och fredagsfika från lokala bagerier, godkänt i ett klick.",
    url: "https://www.treatly.se",
    doman: "treatly.se",
    farger: ["#ffb066", "#ff4f6e"],
    // TODO(TAB): stämmer listan? Lägg till siffror (besök, kunder) när ni har dem.
    gjorde: [
      "Hemsida och kundplattform – design, texter och utveckling",
      "Fullt automatiserad backend",
      "Innehåll för LinkedIn riktat till HR-chefer",
    ],
  },
  {
    namn: "Scudaro",
    kategori: "Streetwear",
    text: "Oversized streetwear med racing i blodet, släppt i små kollektioner.",
    url: "https://www.scudaro.com",
    doman: "scudaro.com",
    farger: ["#8a4dff", "#3a1fe0"],
    // TODO(TAB): stämmer listan? Lägg till siffror (följare, försäljning) när ni har dem.
    gjorde: [
      "Visuell identitet och lookbook framtagen med AI",
      "Fullt fungerande Storefront API med Shopify",
    ],
    skarmbild: {
      dator: "/projekt/scudaro-hemsida.webp",
      mobil: "/projekt/scudaro-hemsida-mobil.webp",
    },
  },
];

// Marknadsföringsbilder som visas under projekten. Filerna ligger i public/projekt/.
// Bilder med andras varumärken är konceptbilder – märk dem så, så att ingen tror att
// varumärket är vår kund. TODO(TAB): byt mot bilder från riktiga uppdrag när ni har dem.
export type Bild = {
  src: string;
  alt: string;
  etikett: string;
  bredd: number;
  hojd: number;
};

export const BILDER: readonly Bild[] = [
  {
    src: "/projekt/karamellsas.webp",
    alt: "Flaska med karamellsås som rinner över glasskulor i en skål av metall",
    etikett: "Konceptbild · Dryck & dessert",
    bredd: 900,
    hojd: 1205,
  },
  {
    src: "/projekt/serum.webp",
    alt: "Serumflaska som ligger bland jordgubbar i röd sirap",
    etikett: "Konceptbild · Hudvård",
    bredd: 768,
    hojd: 1376,
  },
  {
    src: "/projekt/solglasogon.webp",
    alt: "Hand som håller upp solglasögon mot blå himmel, i en mobilkameras sökare",
    etikett: "Konceptbild · Glasögon",
    bredd: 900,
    hojd: 1599,
  },
  {
    src: "/projekt/tshirt.webp",
    alt: "Modell bakifrån i svart t-shirt med röd text på ryggen",
    etikett: "Lookbook · Streetwear",
    bredd: 768,
    hojd: 1376,
  },
];

/** Visningsfilmer av sajter vi byggt (public/video/). Ljudlösa loopar – texten bredvid bär innehållet. */
export type ProjektVideo = {
  namn: string;
  /** Kort beskrivning – visas under filmen och i VideoObject-schemat. */
  beskrivning: string;
  /** Filnamn utan ändelse i public/video/ – .webm, .mp4 och .webp (stillbild) måste finnas. */
  fil: string;
  /** ISO 8601-längd, t.ex. "PT23S". */
  langd: string;
  publicerad: string;
};

export const PROJEKT_VIDEO = {
  startsida: {
    namn: "Hemsidor byggda av TAB Marketing – Treatly och Scudaro",
    beskrivning:
      "Ett varv genom två hemsidor vi har byggt: Treatlys hemsida och kundplattform för personaluppvaktning och Scudaros webbshop för streetwear.",
    fil: "projekt-hemsidor",
    langd: "PT23S",
    publicerad: "2026-10-22",
  },
  hemsida: {
    namn: "Hemsidor på dator och mobil – Treatly och Scudaro",
    beskrivning:
      "Samma sajter på dator och mobil sida vid sida: Treatlys hemsida och kundplattform och Scudaros webbshop, byggda för att fungera lika bra i mobilen.",
    fil: "projekt-hemsidor-mobil",
    langd: "PT21S",
    publicerad: "2026-10-22",
  },
} as const satisfies Record<string, ProjektVideo>;
