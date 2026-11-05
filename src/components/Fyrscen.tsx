import { useEffect, useId, useRef, type CSSProperties, type ReactNode } from "react";
import { BOKA_PANEL_TEXT, BokaKnappar, BokaRubrik } from "@/components/Boka";
import { Reveal } from "@/components/Reveal";

/**
 * Avslutningen på alla sidor (startsidan direkt, övriga via BokaPanel): en målad fyr i
 * Göteborgs skärgård i skymningen.
 * - Bilderna (AI-genererade, oktober 2026, målade i holländsk marinstil som resten av startsidan)
 *   har tänd lykta men ingen stråle. Strålen ritas i
 *   WebGL ovanpå och tänder rubriken där den går – samma kon i shadern och i CSS-masken.
 * - Strålen sveper en gång över rubriken när scenen syns och följer sedan muspekaren (på mobil:
 *   dit man trycker). När ingen rör sig står allt still, så inget rör sig längre än fem sekunder
 *   av sig självt (WCAG 2.2.2) och grafikkortet vilar.
 * - Det markerade ordet i rubriken ("synas") är nästan osynligt tills strålen lyser på det
 *   eller man håller muspekaren över rubriken (.fyr-rubrik i styles.css). Strålen vilar på
 *   ordet, så det syns så länge ingen styr bort ljuset.
 * - Minskad rörelse: strålen står still på ordet. Utan WebGL tänds hela rubriken.
 * - Målningen hänger i den förgyllda ramen (.galleri-ram-bred) och sidfoten under är dess
 *   museiskylt i mässing (Footer.tsx).
 * - Samma komponent ritar heron på /tjanster (LANTERNIN): där står man uppe i fyren och ser ut
 *   över kusten, lyktan ligger strax under bildens nederkant och käglan är mycket bredare.
 */

// Under den här bredden används den stående bilden. Samma gräns som .fyr-kort i styles.css.
const SMAL = "(max-width: 1023px)";

type Bild = {
  src: string;
  bredd: number;
  hojd: number;
  /** Lyktans mitt och horisonten som andel av bildens bredd/höjd, uppmätta i bilden. */
  lyktaX: number;
  lyktaY: number;
  horisont: number;
  /** Lyktglasets bredd som andel av bildens höjd – styr hur stort skenet blir. */
  lyktstorlek: number;
  /** Samma som object-position i sidled för .fyr-bild. */
  posX: number;
  /** Hur snabbt käglan vidgas (radianer per enhet höjd). Startsidans fyr: 0,07. */
  spridning: number;
  /** Hur snabbt ljuset avtar med avståndet. */
  avtagande: number;
  srcSet?: string;
  alt?: string;
};

export type Fyrbilder = { bred: Bild; hog: Bild };

const BRED: Bild = {
  src: "/fyr/fyr-bred.webp",
  bredd: 1916,
  hojd: 821,
  lyktaX: 0.8108,
  lyktaY: 0.2355,
  horisont: 0.588,
  lyktstorlek: 0.026,
  posX: 0.7,
  spridning: 0.07,
  avtagande: 0.35,
  srcSet: "/fyr/fyr-bred-1280.webp 1280w, /fyr/fyr-bred.webp 1916w",
};

const HOG: Bild = {
  src: "/fyr/fyr-hog.webp",
  bredd: 940,
  hojd: 1672,
  lyktaX: 0.6874,
  lyktaY: 0.5535,
  horisont: 0.688,
  lyktstorlek: 0.016,
  posX: 0.5,
  spridning: 0.07,
  avtagande: 0.35,
};

/** Startsidans och avslutningens fyr, sedd utifrån. */
export const FYREN: Fyrbilder = { bred: BRED, hog: HOG };

/**
 * Utsikten från lanterninen (heron på /tjanster). Lyktan sitter bakom betraktaren, strax under
 * bildens nederkant, så käglan går ut över havet och vidgas kraftigt.
 */
export const LANTERNIN: Fyrbilder = {
  bred: {
    src: "/fyr/lanternin-bred.webp",
    srcSet: "/fyr/lanternin-bred-960.webp 960w, /fyr/lanternin-bred.webp 1344w",
    bredd: 1344,
    hojd: 752,
    lyktaX: 0.5,
    lyktaY: 1.12,
    horisont: 0.55,
    lyktstorlek: 0.12,
    posX: 0.5,
    spridning: 0.42,
    avtagande: 0.12,
    alt: "Målning: utsikt från fyrens lanternin i skymningen över havet, en segelskuta och skärgårdens klippor med röda stugor",
  },
  hog: {
    src: "/fyr/lanternin-hog.webp",
    bredd: 752,
    hojd: 1344,
    lyktaX: 0.5,
    lyktaY: 1.08,
    horisont: 0.69,
    lyktstorlek: 0.05,
    posX: 0.5,
    spridning: 0.5,
    avtagande: 0.3,
  },
};

// Canvasens upplösning i förhållande till skärmen. Strålen är mjuk och tål låg upplösning.
const KVALITET = 0.5;
const SVEP_MS = 4000;
// Så länge strålen stannar där man pekat/tryckt innan den går tillbaka till rubriken.
const HEM_MS = 3000;
// Halva öppningsvinkeln i CSS-masken (grader) räknas från käglans spridning: kärna + mjuk kant
// ≈ shaderns kon. För startsidans fyr (0,07 rad) blir det 2,4° + 2,6°.
const maskVinklar = (spridning: number) => {
  const halv = ((spridning * 180) / Math.PI) * 1.25;
  return { karna: halv * 0.48, kant: halv * 0.52 };
};

const HORN = `
attribute vec2 aPos;
varying vec2 vUv;
void main() { vUv = aPos * .5 + .5; gl_Position = vec4(aPos, 0., 1.); }
`;

// Allt mäts i kortets höjd (p.y 0–1 nerifrån), så att vinklarna blir desamma som i CSS-pixlar.
const STRALE = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec2 vUv;
uniform vec2 uRes;
uniform float uTid;
uniform vec2 uLykta;
uniform float uVinkel;
uniform float uHorisont;
uniform float uStorlek;
uniform float uSpridning;
uniform float uAvtagande;

const vec3 LJUS = vec3(1., .93, .76);

float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float brus(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1., 0.)), u.x), mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), u.x), u.y);
}
float fbm(vec2 p) { float v = 0., a = .5; for (int i = 0; i < 3; i++) { v += a * brus(p); p = p * 2.03 + vec2(17.1, 9.2); a *= .5; } return v / .875; }

void main() {
  float asp = uRes.x / uRes.y;
  vec2 v = vec2(vUv.x * asp, vUv.y) - vec2(uLykta.x * asp, uLykta.y);
  vec2 riktning = vec2(cos(uVinkel), sin(uVinkel));
  float langs = dot(v, riktning);
  float tvars = abs(v.x * riktning.y - v.y * riktning.x);
  float k = uStorlek;

  // Ljuskäglan: smal vid lyktan, vidgas och avtar med avståndet, med damm som driver i ljuset
  float bredd = k * .4 + langs * uSpridning;
  float fram = smoothstep(0., k * 1.5, langs);
  float kon = smoothstep(bredd, bredd * .1, tvars) * fram;
  float karna = smoothstep(bredd * .5, 0., tvars) * fram;
  float damm = .55 + .45 * fbm(vec2(langs * 5. - uTid * .25, tvars * 30. + uTid * .05));
  float strale = (kon * .55 + karna * .45) * exp(-langs * uAvtagande) * damm;
  // Svagare stråle bakåt, som i en roterande fyrlins
  float bak = -langs;
  float breddBak = k * .4 + bak * uSpridning * .85;
  strale += smoothstep(breddBak, breddBak * .1, tvars) * smoothstep(0., k * 1.5, bak) * exp(-bak * 1.6) * .22;
  // Under horisonten träffar ljuset vattnet och syns svagare
  strale *= mix(.3, 1., smoothstep(uHorisont - .1, uHorisont + .01, vUv.y));

  // Lyktan bländar: kärna, gloria och fyra korta strålar
  float r = length(v);
  float sken = exp(-r / (k * .45)) * 1.1 + exp(-r / (k * 2.2)) * .3 + exp(-r * 4.) * .05;
  sken += pow(abs(cos(atan(v.y, v.x) * 2.)), 80.) * exp(-r / (k * 3.)) * .3;

  // Genomskinligt där inget ljus finns (förmultiplicerad alfa), så att canvasen aldrig blir en
  // svart ruta utanför kortets rundade hörn.
  vec3 ljus = LJUS * (strale * .85 + sken);
  float alfa = clamp(max(ljus.r, max(ljus.g, ljus.b)), 0., 1.);
  gl_FragColor = vec4(min(ljus, vec3(alfa)), alfa);
}
`;

function skapaProgram(gl: WebGLRenderingContext): WebGLProgram | null {
  const skuggare = (typ: number, kalla: string) => {
    const s = gl.createShader(typ);
    if (!s) return null;
    gl.shaderSource(s, kalla);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  };
  const horn = skuggare(gl.VERTEX_SHADER, HORN);
  const strale = skuggare(gl.FRAGMENT_SHADER, STRALE);
  const program = gl.createProgram();
  if (!horn || !strale || !program) return null;
  gl.attachShader(program, horn);
  gl.attachShader(program, strale);
  gl.linkProgram(program);
  return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null;
}

/** Skillnaden b − a i radianer, den kortaste vägen runt cirkeln. */
const skillnad = (a: number, b: number) =>
  ((((b - a + Math.PI) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) - Math.PI;

const RUBRIK = "text-[clamp(2.2rem,5vw,4.25rem)] leading-[1.05]";
const RUBRIK_HERO = "text-[clamp(2.4rem,5.6vw,5rem)] leading-[1.02]";

type Val = { tjanst?: string; paket?: string };

/** Samma innehåll som BokaPanel – rubrik, text och knappar kan bytas per sida. */
export function Fyrscen({
  rubrik = <BokaRubrik />,
  text = BOKA_PANEL_TEXT,
  etikett = "Gratis genomgång",
  bilder = FYREN,
  hero = false,
  knappar,
  onBoka,
  prislank,
  ...val
}: Val & {
  rubrik?: ReactNode;
  text?: string;
  /** Versalraden ovanför rubriken. */
  etikett?: string;
  bilder?: Fyrbilder;
  /** Sidans första skärm: h1, större rubrik och bildens eget format på dator. */
  hero?: boolean;
  /** Egna knappar i stället för BokaKnappar. */
  knappar?: ReactNode;
  onBoka?: () => void;
  prislank?: { href: string; text: string };
} = {}) {
  const rubrikId = useId();
  const Rubrik = hero ? "h1" : "h2";
  const rubrikStorlek = hero ? RUBRIK_HERO : RUBRIK;
  const kortRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rubrikRef = useRef<HTMLHeadingElement>(null);
  const tandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const kort = kortRef.current;
    const canvas = canvasRef.current;
    const rubrik = rubrikRef.current;
    const tand = tandRef.current;
    if (!kort || !canvas || !rubrik || !tand) return;

    const tandHela = () => tand.style.setProperty("--strale", "linear-gradient(#000, #000)");
    const gl = canvas.getContext("webgl", {
      antialias: false,
      depth: false,
      stencil: false,
    });
    const program = gl ? skapaProgram(gl) : null;
    if (!gl || !program) {
      tandHela();
      return;
    }
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    const u = {
      res: gl.getUniformLocation(program, "uRes"),
      tid: gl.getUniformLocation(program, "uTid"),
      lykta: gl.getUniformLocation(program, "uLykta"),
      vinkel: gl.getUniformLocation(program, "uVinkel"),
      horisont: gl.getUniformLocation(program, "uHorisont"),
      storlek: gl.getUniformLocation(program, "uStorlek"),
      spridning: gl.getUniformLocation(program, "uSpridning"),
      avtagande: gl.getUniformLocation(program, "uAvtagande"),
    };

    const smal = window.matchMedia(SMAL);
    const stilla = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Lyktan och horisonten i kortet (CSS-pixlar), räknat som object-fit: cover gör.
    let bredd = 1;
    let hojd = 1;
    let lyktaX = 0;
    let lyktaY = 0;
    let horisont = 0;
    let lyktstorlek = 0;
    let bild = bilder.bred;
    let mask = maskVinklar(bild.spridning);
    const mat = () => {
      bild = smal.matches ? bilder.hog : bilder.bred;
      mask = maskVinklar(bild.spridning);
      bredd = Math.max(1, kort.clientWidth);
      hojd = Math.max(1, kort.clientHeight);
      const skala = Math.max(bredd / bild.bredd, hojd / bild.hojd);
      const dx = (bredd - bild.bredd * skala) * bild.posX;
      const dy = (hojd - bild.hojd * skala) / 2;
      lyktaX = dx + bild.lyktaX * bild.bredd * skala;
      lyktaY = dy + bild.lyktaY * bild.hojd * skala;
      horisont = dy + bild.horisont * bild.hojd * skala;
      lyktstorlek = bild.lyktstorlek * bild.hojd * skala;
      const upplosning = Math.min(window.devicePixelRatio || 1, 2) * KVALITET;
      canvas.width = Math.max(1, Math.round(bredd * upplosning));
      canvas.height = Math.max(1, Math.round(hojd * upplosning));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    // Vinkeln från lyktan mot en punkt i kortet, med y uppåt som i shadern.
    const vinkelMot = (x: number, y: number) => Math.atan2(lyktaY - y, x - lyktaX);
    // Rubrikens text (inte dess ruta) sedd från lyktan, så att svepet går över orden.
    const textyta = document.createRange();
    // Det markerade ordet (<Mark>, t.ex. "synas") är dolt tills strålen eller muspekaren
    // når det, så strålen vilar på ordet i stället för på rubrikens mitt.
    const ord = rubrik.querySelector("span");
    const rubrikVinklar = (k: DOMRect) => {
      textyta.selectNodeContents(rubrik);
      const r = textyta.getBoundingClientRect();
      const vanster = vinkelMot(r.left - k.left, r.top - k.top + r.height * 0.4);
      const hoger = vinkelMot(r.right - k.left, r.top - k.top + r.height * 0.6);
      let mitt = vanster + skillnad(vanster, hoger) / 2;
      if (ord) {
        const o = ord.getBoundingClientRect();
        mitt = vinkelMot(o.left - k.left + o.width / 2, o.top - k.top + o.height / 2);
      }
      return { vanster, mitt, hoger };
    };

    let vinkel = 0;
    let tid = 0;
    let svepStart = -1;
    let svepKlart = false;
    let pekare: { x: number; y: number } | null = null;
    let senastPekare = -Infinity;
    let synlig = false;
    let raf = 0;
    let forra = 0;
    let hemTimer = 0;

    const rita = (k: DOMRect) => {
      gl.uniform2f(u.res, canvas.width, canvas.height);
      gl.uniform1f(u.tid, tid);
      gl.uniform2f(u.lykta, lyktaX / bredd, 1 - lyktaY / hojd);
      gl.uniform1f(u.vinkel, vinkel);
      gl.uniform1f(u.horisont, 1 - horisont / hojd);
      gl.uniform1f(u.storlek, lyktstorlek / hojd);
      gl.uniform1f(u.spridning, bild.spridning);
      gl.uniform1f(u.avtagande, bild.avtagande);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      // Samma kon som i shadern, som conic-gradient i det tända lagrets koordinater (0° = upp).
      const t = tand.getBoundingClientRect();
      const x = k.left + lyktaX - t.left;
      const y = k.top + lyktaY - t.top;
      const grader = (Math.atan2(Math.cos(vinkel), Math.sin(vinkel)) * 180) / Math.PI;
      const { karna, kant } = mask;
      const fran = grader - karna - kant;
      tand.style.setProperty(
        "--strale",
        `conic-gradient(from ${fran.toFixed(2)}deg at ${x.toFixed(1)}px ${y.toFixed(1)}px, ` +
          `transparent 0deg, #000 ${kant.toFixed(2)}deg, #000 ${(kant + 2 * karna).toFixed(2)}deg, ` +
          `transparent ${(2 * (kant + karna)).toFixed(2)}deg)`,
      );
    };

    const kanRora = () =>
      synlig && !stilla.matches && document.visibilityState === "visible" && !gl.isContextLost();
    const vacka = () => {
      if (!raf && kanRora()) raf = window.requestAnimationFrame(tick);
    };
    const stanna = () => {
      if (raf) window.cancelAnimationFrame(raf);
      raf = 0;
      forra = 0;
    };

    const tick = (nu: number) => {
      raf = 0;
      tid += (forra ? Math.min(nu - forra, 50) : 16) / 1000;
      forra = nu;
      const k = kort.getBoundingClientRect();
      const r = rubrikVinklar(k);
      let mal = r.mitt;
      let foljer = 0.06;
      if (!svepKlart) {
        // Höger ände av rubriken → vänster ände → det markerade ordet, med mjuk fart.
        const s = Math.min((nu - svepStart) / SVEP_MS, 1);
        const mjuk = (t: number) => t * t * (3 - 2 * t);
        mal =
          s < 0.55
            ? r.hoger + skillnad(r.hoger, r.vanster) * mjuk(s / 0.55)
            : r.vanster + skillnad(r.vanster, r.mitt) * mjuk((s - 0.55) / 0.45);
        foljer = 0.25;
        if (s >= 1) svepKlart = true;
      } else if (pekare) {
        mal = vinkelMot(pekare.x - k.left, pekare.y - k.top);
        foljer = 0.14;
      }
      vinkel += skillnad(vinkel, mal) * foljer;
      rita(k);
      const vilar =
        svepKlart && Math.abs(skillnad(vinkel, mal)) < 0.0005 && nu - senastPekare > 600;
      if (vilar) forra = 0;
      else vacka();
    };

    const stillbild = () => {
      const k = kort.getBoundingClientRect();
      vinkel = rubrikVinklar(k).mitt;
      rita(k);
    };
    const uppdatera = () => {
      mat();
      if (!synlig) return;
      if (stilla.matches) stillbild();
      else {
        rita(kort.getBoundingClientRect());
        vacka();
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        synlig = entry?.isIntersecting ?? false;
        if (!synlig) return stanna();
        if (stilla.matches) return stillbild();
        if (svepStart < 0) {
          vinkel = rubrikVinklar(kort.getBoundingClientRect()).hoger;
          svepStart = performance.now();
        }
        vacka();
      },
      { threshold: 0.35 },
    );
    const ro = new ResizeObserver(uppdatera);

    const sikta = (x: number, y: number) => {
      if (stilla.matches) return;
      pekare = { x, y };
      senastPekare = performance.now();
      svepKlart = true;
      window.clearTimeout(hemTimer);
      vacka();
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") sikta(e.clientX, e.clientY);
    };
    const onDown = (e: PointerEvent) => sikta(e.clientX, e.clientY);
    const onLeave = () => {
      window.clearTimeout(hemTimer);
      hemTimer = window.setTimeout(() => {
        pekare = null;
        vacka();
      }, HEM_MS);
    };
    const onStilla = () => {
      if (stilla.matches) {
        stanna();
        if (synlig) stillbild();
      } else vacka();
    };
    const onFlik = () => (document.visibilityState === "visible" ? vacka() : stanna());
    const onTappad = (e: Event) => {
      e.preventDefault();
      stanna();
      tandHela();
    };

    mat();
    io.observe(kort);
    ro.observe(kort);
    ro.observe(rubrik);
    smal.addEventListener("change", uppdatera);
    stilla.addEventListener("change", onStilla);
    document.addEventListener("visibilitychange", onFlik);
    kort.addEventListener("pointermove", onMove, { passive: true });
    kort.addEventListener("pointerdown", onDown, { passive: true });
    kort.addEventListener("pointerleave", onLeave, { passive: true });
    canvas.addEventListener("webglcontextlost", onTappad);

    return () => {
      stanna();
      window.clearTimeout(hemTimer);
      io.disconnect();
      ro.disconnect();
      smal.removeEventListener("change", uppdatera);
      stilla.removeEventListener("change", onStilla);
      document.removeEventListener("visibilitychange", onFlik);
      kort.removeEventListener("pointermove", onMove);
      kort.removeEventListener("pointerdown", onDown);
      kort.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("webglcontextlost", onTappad);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, [bilder]);

  const { bred, hog } = bilder;
  return (
    <section
      aria-labelledby={rubrikId}
      className={`fyr-panel ${hero ? "fyr-hero" : ""}`}
      style={{ "--fyr-format": `${bred.bredd} / ${bred.hojd}` } as CSSProperties}
    >
      {/* Målningen hänger i samma förgyllda ram som projektfilmen; sidfoten är dess skylt. */}
      <div className="galleri-ram galleri-ram-bred fyr-ram galleri-verk mx-auto max-w-[88rem]">
        <div ref={kortRef} className="fyr-kort relative isolate overflow-hidden bg-ink text-white">
          <picture>
            <source media={SMAL} srcSet={hog.src} width={hog.bredd} height={hog.hojd} />
            <img
              src={bred.src}
              {...(bred.srcSet ? { srcSet: bred.srcSet } : {})}
              sizes="(min-width: 1456px) 1408px, calc(100vw - 48px)"
              alt={bred.alt ?? ""}
              width={bred.bredd}
              height={bred.hojd}
              {...(hero ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
              decoding="async"
              className="fyr-bild absolute inset-0 -z-20 size-full object-cover"
            />
          </picture>
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 -z-10 size-full mix-blend-screen"
          />
          <div className="relative px-6 pt-14 pb-24 sm:px-14 sm:pt-16">
            <Reveal>
              <p className="caps fyr-skugga text-white/75">{etikett}</p>
              <div className="relative mt-5 max-w-2xl">
                <Rubrik
                  ref={rubrikRef}
                  id={rubrikId}
                  className={`${rubrikStorlek} fyr-rubrik fyr-skugga text-elfenben`}
                >
                  {rubrik}
                </Rubrik>
                <div
                  ref={tandRef}
                  aria-hidden="true"
                  className={`fyr-tand font-display ${rubrikStorlek}`}
                >
                  {rubrik}
                </div>
              </div>
              <p className="fyr-skugga mt-5 max-w-xl text-white/85">{text}</p>
              {knappar ?? (
                <BokaKnappar
                  {...(onBoka ? { onBoka } : {})}
                  {...(prislank ? { prislank } : {})}
                  {...val}
                />
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
