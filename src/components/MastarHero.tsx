import { useEffect, useRef, type ReactNode } from "react";

/**
 * Första skärmen på en tjänstesida: hantverkets mästare (från startsidans galleri) som en
 * inramad målning på museiväggen, med texten på ett utställningskort bredvid. När man scrollar
 * kliver man in i tavlan: ramen växer ut ur bild och mästaren (eget utklippt lager) kommer
 * närmare än landskapet bakom, så att det känns djup.
 *
 * Allt drivs av scroll (och pekaren för figuren) med transform – inget WebGL och inget som rör
 * sig av sig självt. På mobil och vid minskad rörelse hänger tavlan still och kortet ligger under.
 */

export type Mastare = {
  /** Personens namn, för alt-text och kortet. */
  person: string;
  /** Levnadsår, t.ex. "1707–1778". */
  levde: string;
  /** Kort bildtext på kortet – vår egen text, inte ett citat. */
  bildtext: string;
  bakgrund: { src: string; srcSet: string; alt: string };
  figur: { src: string; srcSet: string; bredd: number; hojd: number };
};

// Tavlans storlek på väggen (andel av scenen) och hur långt in man kliver.
const SKALA_VAGG = 0.6;
const SKALA_INNE = 1.28;
// Hur mycket närmare mästaren kommer än landskapet när man kliver in.
const FIGUR_NARMARE = 0.1;
const BAKGRUND_BORT = 0.08;
const PEKARE_FIGUR = 14;
const STOR = "(min-width: 1024px)";

export function MastarHero({
  mastare,
  plats,
  hantverk,
  title,
  intro,
  children,
  sida = "hoger",
}: {
  mastare: Mastare;
  /** Var tavlan hänger på väggen; kortet tar andra sidan. Växla mellan sidorna så att
   *  tjänstesidorna inte ser likadana ut. */
  sida?: "hoger" | "vanster";
  /** Var verket hänger, t.ex. "Sal II · Verk nr 1". */
  plats: string;
  /** Hantverket, t.ex. "SEO". */
  hantverk: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  const rotRef = useRef<HTMLElement>(null);
  const scenRef = useRef<HTMLDivElement>(null);
  const tavlaRef = useRef<HTMLDivElement>(null);
  const bakRef = useRef<HTMLImageElement>(null);
  const figurRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const rot = rotRef.current;
    const scen = scenRef.current;
    const tavla = tavlaRef.current;
    const bak = bakRef.current;
    const figur = figurRef.current;
    if (!rot || !scen || !tavla || !bak || !figur) return;
    const stilla = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stor = window.matchMedia(STOR);
    let px = 0;
    let raf = 0;

    const rensa = () => {
      for (const el of [tavla, bak, figur]) el.style.transform = "";
      rot.style.removeProperty("--inne");
    };
    const rita = () => {
      raf = 0;
      if (stilla.matches || !stor.matches) return rensa();
      const r = rot.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const stracka = rot.offsetHeight - scen.offsetHeight;
      const fast = parseFloat(getComputedStyle(scen).top) || 0;
      const p = stracka > 0 ? Math.min(1, Math.max(0, (fast - r.top) / stracka)) : 0;
      const e = p * p * (3 - 2 * p);
      // På väggen hänger tavlan åt ena sidan (kortet tar den andra); inne i den är den centrerad.
      const w = scen.offsetWidth;
      const riktning = sida === "vanster" ? -1 : 1;
      const tx = riktning * (1 - e) * (w * (0.5 - SKALA_VAGG / 2) - 48);
      const s = SKALA_VAGG + (SKALA_INNE - SKALA_VAGG) * e;
      tavla.style.transform = `translate3d(${tx.toFixed(1)}px, 0, 0) scale(${s.toFixed(4)})`;
      bak.style.transform = `scale(${(1.04 - BAKGRUND_BORT * e).toFixed(4)})`;
      figur.style.transform = `translate3d(${(px * PEKARE_FIGUR).toFixed(1)}px, 0, 0) scale(${(1 + FIGUR_NARMARE * e).toFixed(4)})`;
      rot.style.setProperty("--inne", e.toFixed(3));
    };
    const begar = () => {
      if (!raf) raf = requestAnimationFrame(rita);
    };
    const onMove = (ev: PointerEvent) => {
      if (ev.pointerType !== "mouse") return;
      px = (ev.clientX / window.innerWidth) * 2 - 1;
      begar();
    };
    const onLeave = () => {
      px = 0;
      begar();
    };
    rita();
    window.addEventListener("scroll", begar, { passive: true });
    window.addEventListener("resize", begar, { passive: true });
    rot.addEventListener("pointermove", onMove, { passive: true });
    rot.addEventListener("pointerleave", onLeave, { passive: true });
    stilla.addEventListener("change", begar);
    stor.addEventListener("change", begar);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", begar);
      window.removeEventListener("resize", begar);
      rot.removeEventListener("pointermove", onMove);
      rot.removeEventListener("pointerleave", onLeave);
      stilla.removeEventListener("change", begar);
      stor.removeEventListener("change", begar);
    };
  }, [sida]);

  return (
    <section
      ref={rotRef}
      className={`mastar-hero${sida === "vanster" ? " mastar-vanster" : ""}`}
      aria-labelledby="mastar-rubrik"
    >
      <div ref={scenRef} className="mastar-scen">
        <div ref={tavlaRef} className="mastar-tavla">
          <img
            ref={bakRef}
            src={mastare.bakgrund.src}
            srcSet={mastare.bakgrund.srcSet}
            sizes="100vw"
            alt={mastare.bakgrund.alt}
            width={1672}
            height={941}
            fetchPriority="high"
            decoding="async"
            className="mastar-bakgrund"
          />
          <img
            ref={figurRef}
            src={mastare.figur.src}
            srcSet={mastare.figur.srcSet}
            sizes="(min-width: 1024px) 34vw, 30vw"
            alt={`${mastare.person} sedd bakifrån`}
            width={mastare.figur.bredd}
            height={mastare.figur.hojd}
            fetchPriority="high"
            decoding="async"
            className="mastar-figur"
          />
        </div>
        <div className="mastar-kort">
          <p className="mastar-plats">
            <span>{plats}</span>
            <span>{hantverk}</span>
          </p>
          <h1 id="mastar-rubrik" className="mt-5 text-[clamp(2.1rem,3.6vw,3.5rem)] leading-[1.04]">
            {title}
          </h1>
          {intro && <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink/80">{intro}</p>}
          {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
          <p className="mastar-verk">
            <span className="mastar-person">{mastare.person}</span>
            <span>{mastare.levde}</span>
            <span className="mastar-bildtext">{mastare.bildtext}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
