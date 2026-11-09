import { Link } from "@tanstack/react-router";
import { Pause, Play } from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { BokaKnapp } from "@/components/Boka";
import { Mark } from "@/components/Heading";
import { FORETAG } from "@/lib/foretag";
import { kr, LAGSTA_MANADSPRIS } from "@/lib/priser";
import { tjanstSokvag } from "@/lib/tjanster";

/**
 * Startsidans första skärm: en inramad målning (AI-genererad, oktober 2026) i blobbens fem färger.
 * - Två målningar: en liggande för dator och en stående för mobil (public/masterverk/). Ramen är
 *   målningens egen och läggs som border-image, duken som bild – se .tavla i styles.css.
 * - Texten står på dukens tomma mörka del. Rubriken (H1) bär hela sökfrasen.
 * - Liv: rubriken målas fram, damm svävar i den målade ljusstrålen och viker undan för pekaren,
 *   kronblad lossnar från buketten och fler när pekaren rör den. Pausknappen stoppar allt som
 *   rör sig av sig självt (WCAG 2.2.2). Minskad rörelse: allt står still. Inget ritas när
 *   scenen inte syns eller fliken är dold.
 */

// Samma gräns som .tavla i styles.css: under den används den stående målningen.
const SMAL = "(max-width: 1023px)";

const KRONBLAD = [1, 2, 3, 4, 5].map((n) => `/masterverk/kronblad-${n}.webp`);
const MAX_KRONBLAD = 7;
const KRONBLAD_LIVSTID = 5.5;
/** Ungefär så ofta (ms) ett kronblad lossnar av sig självt. */
const KRONBLAD_VAR = 2600;
/** Minsta tid (ms) mellan kronblad som pekaren skakar loss. */
const KRONBLAD_PEKARE = 420;

/**
 * Den målade ljusstrålen, uppmätt i bilderna: vinkel (grader under vågrätt) från dukens övre
 * vänstra hörn, halva bredden och hur långt den når (andel av dukens bredd).
 */
const STRALE = {
  bred: { mitt: 37, halv: 22, rackvidd: 0.5 },
  smal: { mitt: 52, halv: 24, rackvidd: 1.05 },
} as const;
/** Var buketten är, som andel av dukbilden: bara där skakar pekaren loss kronblad. */
const BUKETT = {
  bred: { x0: 0.46, x1: 0.98, y0: 0.05, y1: 0.85 },
  smal: { x0: 0.03, x1: 0.97, y0: 0.02, y1: 0.85 },
} as const;
/**
 * Blommor i varje färg, uppmätta i målningarna (andel av dukbilden). Index = kronbladsbild:
 * ett kronblad lossnar alltid från en blomma i sin egen färg.
 */
const BLOMMOR: Record<"bred" | "smal", readonly (readonly (readonly [number, number])[])[]> = {
  bred: [
    // blå (kronblad-1)
    [
      [0.604, 0.115],
      [0.657, 0.115],
      [0.591, 0.14],
      [0.631, 0.166],
      [0.644, 0.166],
      [0.578, 0.191],
      [0.657, 0.217],
      [0.631, 0.268],
      [0.671, 0.293],
      [0.644, 0.344],
      [0.564, 0.471],
      [0.578, 0.522],
      [0.511, 0.548],
      [0.498, 0.624],
    ],
    // lila (kronblad-2)
    [
      [0.684, 0.242],
      [0.777, 0.268],
      [0.803, 0.268],
      [0.75, 0.318],
      [0.75, 0.369],
      [0.764, 0.369],
      [0.803, 0.369],
      [0.83, 0.369],
      [0.817, 0.395],
      [0.936, 0.752],
      [0.923, 0.777],
      [0.936, 0.803],
      [0.95, 0.828],
      [0.95, 0.854],
    ],
    // rosa (kronblad-3)
    [
      [0.91, 0.242],
      [0.71, 0.369],
      [0.644, 0.42],
      [0.604, 0.446],
      [0.618, 0.446],
      [0.604, 0.471],
      [0.71, 0.471],
      [0.644, 0.497],
      [0.684, 0.497],
      [0.644, 0.522],
      [0.631, 0.548],
      [0.657, 0.548],
      [0.604, 0.675],
      [0.896, 0.879],
    ],
    // orange (kronblad-4)
    [
      [0.777, 0.013],
      [0.79, 0.115],
      [0.803, 0.166],
      [0.91, 0.293],
      [0.564, 0.395],
      [0.87, 0.497],
      [0.923, 0.497],
      [0.777, 0.573],
      [0.883, 0.573],
      [0.896, 0.573],
      [0.923, 0.624],
      [0.936, 0.65],
      [0.923, 0.701],
      [0.95, 0.701],
    ],
    // gul (kronblad-5)
    [
      [0.538, 0.293],
      [0.525, 0.318],
      [0.538, 0.318],
      [0.578, 0.318],
      [0.578, 0.344],
      [0.564, 0.369],
      [0.618, 0.369],
      [0.485, 0.395],
      [0.618, 0.395],
      [0.75, 0.573],
      [0.817, 0.599],
      [0.817, 0.65],
      [0.83, 0.65],
      [0.79, 0.675],
    ],
  ],
  smal: [
    // blå (kronblad-1)
    [
      [0.375, 0.11],
      [0.349, 0.13],
      [0.401, 0.13],
      [0.297, 0.17],
      [0.323, 0.17],
      [0.323, 0.19],
      [0.401, 0.23],
      [0.401, 0.291],
      [0.375, 0.351],
      [0.116, 0.471],
      [0.168, 0.511],
      [0.065, 0.691],
      [0.09, 0.711],
      [0.142, 0.772],
    ],
    // lila (kronblad-2)
    [
      [0.659, 0.271],
      [0.711, 0.291],
      [0.581, 0.311],
      [0.607, 0.311],
      [0.607, 0.351],
      [0.711, 0.391],
      [0.711, 0.411],
      [0.891, 0.431],
      [0.866, 0.671],
      [0.866, 0.691],
      [0.866, 0.752],
      [0.891, 0.772],
      [0.943, 0.772],
      [0.943, 0.832],
    ],
    // rosa (kronblad-3)
    [
      [0.866, 0.23],
      [0.866, 0.331],
      [0.375, 0.391],
      [0.426, 0.411],
      [0.245, 0.451],
      [0.297, 0.471],
      [0.478, 0.471],
      [0.271, 0.491],
      [0.53, 0.491],
      [0.478, 0.511],
      [0.297, 0.531],
      [0.401, 0.531],
      [0.271, 0.631],
      [0.245, 0.651],
    ],
    // orange (kronblad-4)
    [
      [0.53, 0.05],
      [0.659, 0.13],
      [0.711, 0.21],
      [0.866, 0.271],
      [0.168, 0.431],
      [0.84, 0.491],
      [0.788, 0.511],
      [0.814, 0.551],
      [0.891, 0.551],
      [0.969, 0.551],
      [0.581, 0.571],
      [0.891, 0.591],
      [0.943, 0.591],
      [0.943, 0.611],
    ],
    // gul (kronblad-5)
    [
      [0.168, 0.251],
      [0.194, 0.251],
      [0.194, 0.271],
      [0.297, 0.271],
      [0.271, 0.311],
      [0.323, 0.311],
      [0.245, 0.331],
      [0.297, 0.351],
      [0.556, 0.531],
      [0.478, 0.591],
      [0.53, 0.611],
      [0.685, 0.651],
      [0.711, 0.651],
      [0.711, 0.711],
    ],
  ],
};

type Kronblad = {
  el: HTMLImageElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vrot: number;
  vand: number;
  vvand: number;
  svaj: number;
  alder: number;
  storlek: number;
};
type Damm = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  fas: number;
  fart: number;
  /** Sekunder sedan kornet föddes – det tonas in. */
  alder: number;
};
/** Högst så många dammkorn; färre på små skärmar. */
const DAMM_MAX = 90;

const KATALOG = [
  { text: "Bilder & video", till: tjanstSokvag("marknadsforingsbilder") },
  { text: "SEO & GEO", till: tjanstSokvag("seo") },
  // Hårt bindestreck: ordet bryts aldrig mitt i.
  { text: "Meta‑annonser", till: tjanstSokvag("meta-annonser") },
  { text: "Hemsidor", till: tjanstSokvag("hemsida") },
];

export function Masterverket() {
  const tavlaRef = useRef<HTMLDivElement>(null);
  const dukRef = useRef<HTMLImageElement>(null);
  const ljusRef = useRef<HTMLCanvasElement>(null);
  const bladRef = useRef<HTMLDivElement>(null);
  const [pausad, setPausad] = useState(false);
  const pausadRef = useRef(false);
  const vackRef = useRef<() => void>(() => {});

  useEffect(() => {
    const tavla = tavlaRef.current;
    const duk = dukRef.current;
    const ljus = ljusRef.current;
    const lager = bladRef.current;
    const ctx = ljus?.getContext("2d");
    if (!tavla || !duk || !ljus || !lager || !ctx) return;

    const smal = window.matchMedia(SMAL);
    const stilla = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stoppad = () => pausadRef.current || stilla.matches;

    // Kronbladen hämtas när scenen syns, så att det första inte dyker upp innan bilden laddats.
    let hamtade = false;
    const hamta = () => {
      if (hamtade) return;
      hamtade = true;
      for (const src of KRONBLAD) new Image().src = src;
    };

    // Ett dammkorn: ljus kärna som tonar ut helt mjukt. Ritas en gång och återanvänds.
    const korn = document.createElement("canvas");
    korn.width = korn.height = 32;
    const kctx = korn.getContext("2d");
    if (kctx) {
      const g = kctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      g.addColorStop(0, "rgba(255,248,228,1)");
      g.addColorStop(0.18, "rgba(255,240,205,0.85)");
      g.addColorStop(0.45, "rgba(255,226,170,0.22)");
      g.addColorStop(1, "rgba(255,226,170,0)");
      kctx.fillStyle = g;
      kctx.fillRect(0, 0, 32, 32);
    }

    let blad: Kronblad[] = [];
    let damm: Damm[] = [];
    let raf = 0;
    let forra = 0;
    let tid = 0;
    let synlig = false;
    let vind = 0;
    let sistaX: number | null = null;
    let sistaSlapp = 0;
    let nastaAuto = 0;
    let pekare: { x: number; y: number } | null = null;
    let bredd = 0;
    let hojd = 0;
    let skala = 1;

    const matLjus = () => {
      const r = ljus.getBoundingClientRect();
      bredd = r.width;
      hojd = r.height;
      skala = Math.min(window.devicePixelRatio || 1, 2);
      ljus.width = Math.max(1, Math.round(bredd * skala));
      ljus.height = Math.max(1, Math.round(hojd * skala));
      const antal = Math.round(Math.min(DAMM_MAX, (bredd * hojd) / 9000));
      damm = Array.from({ length: antal }, () => {
        const p = { x: 0, y: 0, vx: 0, vy: 0, r: 0, fas: 0, fart: 0, alder: 1 };
        placeraIStralen(p);
        return p;
      });
      ritaDamm(0);
    };

    // Kornen föds på en slumpad plats inne i strålen (polärt från dukens övre vänstra hörn).
    const placeraIStralen = (p: Damm) => {
      const s = smal.matches ? STRALE.smal : STRALE.bred;
      const vinkel = ((s.mitt + (Math.random() * 2 - 1) * s.halv * 0.75) * Math.PI) / 180;
      const avstand = bredd * s.rackvidd * (0.06 + Math.random() * 0.8);
      p.x = Math.cos(vinkel) * avstand;
      p.y = Math.sin(vinkel) * avstand;
      p.vx = 0;
      p.vy = 0;
      p.r = 0.7 + Math.random() * 1.6;
      p.fas = Math.random() * Math.PI * 2;
      p.fart = 0.2 + Math.random() * 0.4;
      p.alder = 0;
    };

    // 1 mitt i strålen, 0 utanför den.
    const iStralen = (x: number, y: number) => {
      const s = smal.matches ? STRALE.smal : STRALE.bred;
      const vinkel = (Math.atan2(y, x) * 180) / Math.PI;
      const tvars = Math.max(0, 1 - Math.abs(vinkel - s.mitt) / s.halv);
      const langs = Math.hypot(x, y) / (bredd * s.rackvidd);
      return tvars * Math.max(0, 1 - langs);
    };

    const ritaDamm = (dt: number) => {
      ctx.setTransform(skala, 0, 0, skala, 0, 0);
      ctx.clearRect(0, 0, bredd, hojd);
      const strale = smal.matches ? STRALE.smal : STRALE.bred;
      const rx = Math.cos((strale.mitt * Math.PI) / 180);
      const ry = Math.sin((strale.mitt * Math.PI) / 180);
      for (const p of damm) {
        if (dt) {
          p.fas += dt * 0.6;
          p.alder += dt;
          // Långsamt nedåt längs ljuset, med en svag virvel på tvären.
          const virvel = Math.sin(p.fas * 1.3) * 0.7;
          p.vx += (rx * 0.35 - ry * virvel) * p.fart * dt * 6;
          p.vy += (ry * 0.35 + rx * virvel) * p.fart * dt * 6;
          if (pekare) {
            const dx = p.x - pekare.x;
            const dy = p.y - pekare.y;
            const d = Math.sqrt(dx * dx + dy * dy) + 1;
            if (d < 140) {
              const k = (1 - d / 140) * 70 * dt;
              p.vx += (dx / d) * k;
              p.vy += (dy / d) * k;
            }
          }
          p.vx *= 0.94;
          p.vy *= 0.94;
          p.x += p.vx;
          p.y += p.vy;
        }
        const s = iStralen(p.x, p.y);
        // Kornet har lämnat ljuset: det föds igen någon annanstans i strålen.
        if (s <= 0.02) {
          if (dt) placeraIStralen(p);
          continue;
        }
        const glimt = 0.6 + 0.4 * Math.sin(p.fas * 3);
        const alfa = Math.min(1, p.alder / 0.8) * Math.min(1, s * 1.6) * glimt;
        // Kornet är ett förritat mjukt sken utan kant (inga skarpa skivor som ser ut som ringar).
        const d = p.r * 6;
        ctx.globalAlpha = alfa;
        ctx.drawImage(korn, p.x - d / 2, p.y - d / 2, d, d);
      }
      ctx.globalAlpha = 1;
    };

    const slapp = (kx: number | null, ky: number | null) => {
      if (blad.length >= MAX_KRONBLAD) return;
      const d = duk.getBoundingClientRect();
      const l = lager.getBoundingClientRect();
      const blommor = BLOMMOR[smal.matches ? "smal" : "bred"];
      // Pekaren: blomman närmast pekaren. Av sig själv: en slumpad blomma i en slumpad färg.
      let farg = Math.floor(Math.random() * blommor.length);
      let punkt = blommor[farg]?.[Math.floor(Math.random() * (blommor[farg]?.length ?? 0))];
      if (kx !== null && ky !== null) {
        let bast = Infinity;
        blommor.forEach((lista, f) =>
          lista.forEach((q) => {
            const avst = Math.hypot(d.left + q[0] * d.width - kx, d.top + q[1] * d.height - ky);
            if (avst < bast) {
              bast = avst;
              farg = f;
              punkt = q;
            }
          }),
        );
      }
      if (!punkt) return;
      const x = d.left + punkt[0] * d.width - l.left;
      const y = d.top + punkt[1] * d.height - l.top;
      const liten = window.innerWidth < 640;
      const storlek = (liten ? 32 : 46) + Math.random() * (liten ? 18 : 30);
      const el = document.createElement("img");
      el.src = KRONBLAD[farg] ?? "";
      el.alt = "";
      el.decoding = "async";
      el.className = "tavla-kronblad";
      el.style.width = `${storlek}px`;
      el.style.opacity = "0";
      lager.appendChild(el);
      blad.push({
        el,
        x: x - storlek / 2,
        y: y - storlek / 2,
        vx: (Math.random() - 0.5) * 30,
        vy: 14 + Math.random() * 18,
        rot: Math.random() * 360,
        vrot: (Math.random() - 0.5) * 90,
        vand: Math.random() * Math.PI * 2,
        vvand: 1.6 + Math.random() * 1.8,
        svaj: Math.random() * Math.PI * 2,
        alder: 0,
        storlek,
      });
    };
    const inomBuketten = (kx: number, ky: number) => {
      const b = smal.matches ? BUKETT.smal : BUKETT.bred;
      const d = duk.getBoundingClientRect();
      return (
        kx > d.left + d.width * b.x0 &&
        kx < d.left + d.width * b.x1 &&
        ky > d.top + d.height * b.y0 &&
        ky < d.top + d.height * b.y1
      );
    };

    const steg = (nu: number) => {
      raf = 0;
      const dt = forra ? Math.min(nu - forra, 50) / 1000 : 1 / 60;
      forra = nu;
      tid += dt;
      const stopp = stoppad();
      if (!stopp && nu >= nastaAuto) {
        nastaAuto = nu + KRONBLAD_VAR * (0.7 + Math.random() * 0.6);
        slapp(null, null);
      }
      const lagerHojd = lager.clientHeight;
      vind *= 0.96;
      blad = blad.filter((b) => {
        b.alder += dt;
        b.vy = Math.min(b.vy + 26 * dt, 62 + b.storlek * 0.4);
        b.vx += (vind * 260 - b.vx) * dt * 0.9;
        b.x += (b.vx + Math.sin(tid * 1.2 + b.svaj) * 26) * dt;
        b.y += b.vy * dt;
        b.rot += b.vrot * dt;
        b.vand += b.vvand * dt;
        const in_ = Math.min(1, b.alder / 0.35);
        const ut = Math.min(1, Math.max(0, (KRONBLAD_LIVSTID - b.alder) / 1.1));
        b.el.style.opacity = (in_ * ut).toFixed(3);
        b.el.style.transform =
          `translate3d(${b.x.toFixed(1)}px, ${b.y.toFixed(1)}px, 0) rotate(${b.rot.toFixed(1)}deg) ` +
          `rotateX(${(Math.sin(b.vand) * 48).toFixed(1)}deg) rotateY(${(Math.cos(b.vand * 0.7) * 18).toFixed(1)}deg)`;
        const kvar = b.alder < KRONBLAD_LIVSTID && b.y < lagerHojd + 60;
        if (!kvar) b.el.remove();
        return kvar;
      });
      if (!stopp) ritaDamm(dt);
      // Pausat: bladen som redan faller får landa, sedan vilar loopen helt.
      if (!stopp || blad.length) vacka();
      else forra = 0;
    };
    const vacka = () => {
      if (!raf && synlig && document.visibilityState === "visible")
        raf = requestAnimationFrame(steg);
    };
    const stanna = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      forra = 0;
    };
    vackRef.current = vacka;

    const onMove = (e: PointerEvent) => {
      const r = ljus.getBoundingClientRect();
      pekare = { x: e.clientX - r.left, y: e.clientY - r.top };
      if (stilla.matches) return;
      if (sistaX !== null) vind = Math.max(-1, Math.min(1, vind + (e.clientX - sistaX) / 900));
      sistaX = e.clientX;
      const nu = performance.now();
      if (inomBuketten(e.clientX, e.clientY) && nu - sistaSlapp > KRONBLAD_PEKARE) {
        sistaSlapp = nu;
        slapp(e.clientX, e.clientY);
      }
      vacka();
    };
    const onDown = (e: PointerEvent) => {
      if (stilla.matches || (e.target instanceof Element && e.target.closest("a, button"))) return;
      if (inomBuketten(e.clientX, e.clientY)) {
        slapp(e.clientX, e.clientY);
        vacka();
      }
    };
    const onLeave = () => {
      sistaX = null;
      pekare = null;
    };
    const onFlik = () => (document.visibilityState === "visible" ? vacka() : stanna());
    const onStilla = () => {
      if (stilla.matches) ctx.clearRect(0, 0, ljus.width, ljus.height);
      vacka();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        synlig = entry?.isIntersecting ?? false;
        if (!synlig) return stanna();
        hamta();
        if (!nastaAuto) nastaAuto = performance.now() + 900;
        vacka();
      },
      { threshold: 0.2 },
    );
    const ro = new ResizeObserver(matLjus);
    io.observe(tavla);
    ro.observe(ljus);
    tavla.addEventListener("pointermove", onMove, { passive: true });
    tavla.addEventListener("pointerdown", onDown, { passive: true });
    tavla.addEventListener("pointerleave", onLeave, { passive: true });
    document.addEventListener("visibilitychange", onFlik);
    stilla.addEventListener("change", onStilla);
    smal.addEventListener("change", matLjus);

    return () => {
      stanna();
      vackRef.current = () => {};
      io.disconnect();
      ro.disconnect();
      tavla.removeEventListener("pointermove", onMove);
      tavla.removeEventListener("pointerdown", onDown);
      tavla.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onFlik);
      stilla.removeEventListener("change", onStilla);
      smal.removeEventListener("change", matLjus);
      for (const b of blad) b.el.remove();
      blad = [];
    };
  }, []);

  // Loopen läser pausläget via ref; efter paus har den vilat och måste väckas.
  useEffect(() => {
    pausadRef.current = pausad;
    if (!pausad) vackRef.current();
  }, [pausad]);

  return (
    <section aria-labelledby="hero-rubrik" className="tavla-hero">
      <div ref={tavlaRef} className="tavla">
        <picture>
          <source media={SMAL} srcSet="/masterverk/duk-hog-under.webp" width={774} height={998} />
          <img
            ref={dukRef}
            src="/masterverk/duk-bred.webp"
            srcSet="/masterverk/duk-bred-1000.webp 1000w, /masterverk/duk-bred.webp 1506w"
            sizes="(min-width: 1024px) min(90vw, 90rem), 100vw"
            alt="Målning i holländsk guldåldersstil: en bukett i blått, lila, rosa, orange och gult i en bronsurna på en marmorhylla, i förgylld ram"
            width={1506}
            height={785}
            // Låg prioritet: den gäller även mobilens <source>, där bilden ligger under texten och
            // annars tar bandbredd från LCP (dukens överdel). Datorns bild förladdas med hög
            // prioritet i routes/index.tsx, och <img> använder den förladdade filen.
            fetchPriority="low"
            decoding="async"
            className="tavla-duk"
          />
        </picture>
        <div className="tavla-ovan">
          <canvas ref={ljusRef} className="tavla-ljus" aria-hidden="true" />
          <div className="tavla-text">
            <h1 id="hero-rubrik" className="tavla-rubrik">
              <span className="tavla-ord">Marknadsföringsbyrå för företag</span>{" "}
              <span className="tavla-lofte tavla-mala">
                som gör <Mark>jobbet</Mark> åt&nbsp;er
              </span>
            </h1>
            <span className="tavla-linje" aria-hidden="true" />
            <p className="tavla-katalog">
              {/* Mellanslaget ligger utanför varje ord-span: där får raden brytas, och punkten
                  följer med ordet före så att en rad aldrig börjar med en punkt. */}
              {KATALOG.map((k, i) => (
                <Fragment key={k.text}>
                  <span>
                    <Link to={k.till} className="tavla-katalog-lank">
                      {k.text}
                    </Link>
                    {i < KATALOG.length - 1 && <b aria-hidden="true">&nbsp;·</b>}
                  </span>{" "}
                </Fragment>
              ))}
            </p>
            <p className="tavla-villkor">
              Fast pris från {kr(LAGSTA_MANADSPRIS)} i månaden, exkl. moms. Ingen bindningstid på
              månadstjänster – för företag i hela Sverige.
            </p>
            <div className="tavla-knappar">
              <BokaKnapp variant="white" className="tavla-knapp" />
              <Link to="/priser" className="tavla-lank">
                Se priser
              </Link>
            </div>
          </div>
        </div>
        <span className="tavla-skylt" aria-hidden="true">
          {FORETAG.namn} · {FORETAG.ort}
        </span>
        <button
          type="button"
          className="tavla-paus"
          onClick={() => setPausad((p) => !p)}
          aria-label={pausad ? "Spela rörelsen i målningen" : "Pausa rörelsen i målningen"}
        >
          {pausad ? (
            <Play className="size-4" aria-hidden="true" />
          ) : (
            <Pause className="size-4" aria-hidden="true" />
          )}
        </button>
        <div ref={bladRef} className="tavla-blad" aria-hidden="true" />
      </div>
    </section>
  );
}
