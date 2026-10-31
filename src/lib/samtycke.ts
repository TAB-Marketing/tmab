// Samtycke till cookies och spårverktyg.
//
// Regeln: inget som inte behövs för att sajten ska fungera får laddas förrän besökaren sagt ja
// (lagen om elektronisk kommunikation, 9 kap. 28 §, tillsyn av PTS). Det ska vara lika lätt att
// neka som att godkänna, och besökaren ska kunna ändra sig när som helst.
//
// Verktygen slås på med miljövariabler i Vercel (se README). Är inget påslaget visas ingen
// banner – sajten använder då bara Vercel Analytics, som inte sätter cookies.

declare const __SPARVERKTYG__: { metaPixel: string; clarity: string };

type Anrop = (...args: unknown[]) => void;
type Fbq = Anrop & {
  callMethod?: Anrop;
  queue: unknown[][];
  push: Anrop;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    clarity?: Anrop & { q?: unknown[][] };
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export type Kategori = "statistik" | "marknadsforing";
export type Val = Record<Kategori, boolean>;

export const KATEGORIER: Record<Kategori, { namn: string; text: string; syfte: string }> = {
  statistik: {
    namn: "Statistik",
    text: "Visar hur sajten används, till exempel vad besökare klickar på.",
    syfte: "se hur sajten används",
  },
  marknadsforing: {
    namn: "Marknadsföring",
    text: "Mäter vilka annonser på Facebook och Instagram som ger resultat.",
    syfte: "mäta våra annonser",
  },
};

export type Verktyg = {
  id: "clarity" | "meta-pixel";
  namn: string;
  leverantor: string;
  kategori: Kategori;
  syfte: string;
  lagring: string;
  /** Cookies som tas bort när besökaren ångrar sig. */
  kakor: readonly string[];
  nyckel: string;
};

const ALLA: readonly Verktyg[] = [
  {
    id: "clarity",
    namn: "Microsoft Clarity",
    leverantor: "Microsoft",
    kategori: "statistik",
    syfte:
      "Visar hur besökare klickar och scrollar, som heatmaps och inspelningar av besök. Text som skrivs i formulär döljs.",
    lagring: "Upp till 1 år",
    kakor: ["_clck", "_clsk"],
    nyckel: __SPARVERKTYG__.clarity,
  },
  {
    id: "meta-pixel",
    namn: "Meta-pixeln",
    leverantor: "Meta (Facebook och Instagram)",
    kategori: "marknadsforing",
    syfte:
      "Mäter vilka annonser som leder till bokningar och gör att vi kan visa annonser för personer som besökt sajten.",
    lagring: "Upp till 90 dagar",
    kakor: ["_fbp", "_fbc"],
    nyckel: __SPARVERKTYG__.metaPixel,
  },
];

/** Verktyg som är påslagna i den här driftsättningen. */
export const AKTIVA_VERKTYG = ALLA.filter((v) => v.nyckel);
export const BEHOVER_SAMTYCKE = AKTIVA_VERKTYG.length > 0;
export const AKTIVA_KATEGORIER = (Object.keys(KATEGORIER) as Kategori[]).filter((k) =>
  AKTIVA_VERKTYG.some((v) => v.kategori === k),
);

// Bannern visas alltid, även innan något spårverktyg är påslaget. Är inget påslaget frågar den
// om alla kategorier; valet sparas, och när ett verktyg slås på ändras versionen och besökaren
// får frågan igen. Sätt till false för att bara visa bannern när ett verktyg kräver samtycke.
export const VISA_BANNER = false;
export const BANNER_KATEGORIER: Kategori[] = AKTIVA_KATEGORIER.length
  ? AKTIVA_KATEGORIER
  : (Object.keys(KATEGORIER) as Kategori[]);

export const INGET: Val = { statistik: false, marknadsforing: false };
export const ALLT: Val = { statistik: true, marknadsforing: true };

// Ett nytt verktyg ger en ny version, och då frågar vi igen.
const VERSION = AKTIVA_VERKTYG.map((v) => v.id).join(",");
const NYCKEL = "tab-samtycke";
const OPPNA = "tab:samtycke";

export function lasVal(): Val | null {
  try {
    const sparat = JSON.parse(localStorage.getItem(NYCKEL) ?? "null") as
      (Val & { version?: string }) | null;
    if (!sparat || sparat.version !== VERSION) return null;
    return { statistik: sparat.statistik === true, marknadsforing: sparat.marknadsforing === true };
  } catch {
    return null;
  }
}

/** Sparar besökarens val och startar eller stoppar verktygen därefter. */
export function sparaVal(val: Val) {
  const tidigare = lasVal();
  try {
    localStorage.setItem(
      NYCKEL,
      JSON.stringify({ ...val, version: VERSION, tid: new Date().toISOString() }),
    );
  } catch {
    // Privat läge eller blockerad lagring: valet gäller bara den här sidvisningen.
  }
  const aterkallat =
    tidigare && (Object.keys(val) as Kategori[]).some((k) => tidigare[k] && !val[k]);
  if (aterkallat) {
    stoppa(val);
    // Skript som redan körs går inte att stänga av – en omladdning startar sidan utan dem.
    window.location.reload();
    return;
  }
  starta(val);
}

/** Öppnar cookieinställningarna, t.ex. från länken i sidfoten. */
export function oppnaInstallningar() {
  window.dispatchEvent(new Event(OPPNA));
}

export function narInstallningarOppnas(fn: () => void) {
  window.addEventListener(OPPNA, fn);
  return () => window.removeEventListener(OPPNA, fn);
}

const startade = new Set<Verktyg["id"]>();

export function starta(val: Val) {
  for (const v of AKTIVA_VERKTYG) {
    if (!val[v.kategori] || startade.has(v.id)) continue;
    startade.add(v.id);
    if (v.id === "clarity") startaClarity(v.nyckel, val);
    if (v.id === "meta-pixel") startaMetaPixel(v.nyckel);
  }
}

/** Ny sidvisning efter navigering inom sajten. Clarity sköter det själv. */
export function sidvisning() {
  window.fbq?.("track", "PageView");
}

/** Konvertering till Meta – skickas bara om besökaren godkänt marknadsföring. */
export function metaKonvertering(namn: "Lead") {
  window.fbq?.("track", namn);
}

function laddaSkript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function startaClarity(id: string, val: Val) {
  if (!window.clarity) {
    const clarity = ((...args: unknown[]) => {
      (clarity.q ??= []).push(args);
    }) as NonNullable<Window["clarity"]>;
    window.clarity = clarity;
    laddaSkript(`https://www.clarity.ms/tag/${encodeURIComponent(id)}`);
  }
  window.clarity("consentv2", {
    ad_Storage: val.marknadsforing ? "granted" : "denied",
    analytics_Storage: "granted",
  });
}

function startaMetaPixel(id: string) {
  if (!window.fbq) {
    const fbq = ((...args: unknown[]) => {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    }) as Fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = fbq;
    window._fbq ??= fbq;
    laddaSkript("https://connect.facebook.net/en_US/fbevents.js");
  }
  window.fbq("init", id);
  window.fbq("track", "PageView");
}

function stoppa(val: Val) {
  if (!val.statistik) window.clarity?.("consent", false);
  if (!val.marknadsforing) window.fbq?.("consent", "revoke");
  const huvuddoman = window.location.hostname.split(".").slice(-2).join(".");
  for (const v of AKTIVA_VERKTYG) {
    if (val[v.kategori]) continue;
    for (const kaka of v.kakor) {
      for (const doman of ["", `; domain=.${huvuddoman}`]) {
        document.cookie = `${kaka}=; max-age=0; path=/${doman}`;
      }
    }
  }
}
