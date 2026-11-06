import { useEffect, useId, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Heron på /tjanster: en avtäckning styrd av skrollen.
 * - Två målningar av samma scen (AI-genererade, november 2026, i holländsk ljusdunkelstil):
 *   "före" – en gammal man vid ett bord med en liten, nästan slocknad låga – och "efter", där
 *   lågan har flammat upp och rummet syns.
 * - Innan man skrollar fyller "före" hela skärmen, nedmörkad, utan text. Bara lågan glöder (ett
 *   fladdrande skimmer ritat i WebGL exakt där lågan sitter i bilden).
 * - När man skrollar flammar lågan upp: skimret växer, "efter" tonas in över "före", rubriken
 *   träder fram i det mörka fältet och målningen krymper in i den förgyllda ramen.
 * - Ett skrollsteg från toppen spelar hela sekvensen av sig självt (sidan skrollas i lugnt tempo
 *   till sektionens slut); skrollar man igen under tiden hoppar den till slutet.
 * - Läget i sekvensen (0–1) skrivs som --p på sektionen; CSS sköter tonerna, texten och
 *   krympningen, shadern glöden. Minskad rörelse och utan JS: färdigt läge direkt (--p är 1 i
 *   CSS tills skriptet tar över).
 */

// Under den här bredden används de stående bilderna. Samma gräns som i styles.css.
const SMAL = "(max-width: 1023px)";

type Punkt = { x: number; y: number };
type Bildpar = {
  fore: string;
  efter: string;
  foreSrcSet?: string;
  efterSrcSet?: string;
  bredd: number;
  hojd: number;
  /** Lågans läge som andel av bildens bredd/höjd, i "före" och i "efter" (den växer uppåt). */
  lagaFore: Punkt;
  lagaEfter: Punkt;
  /** Lågans höjd som andel av bildens höjd, före och efter. */
  storlekFore: number;
  storlekEfter: number;
  alt: string;
};

const BRED: Bildpar = {
  fore: "/ljus/fore-bred.webp",
  efter: "/ljus/efter-bred.webp",
  foreSrcSet: "/ljus/fore-bred-960.webp 960w, /ljus/fore-bred.webp 1344w",
  efterSrcSet: "/ljus/efter-bred-960.webp 960w, /ljus/efter-bred.webp 1344w",
  bredd: 1344,
  hojd: 752,
  lagaFore: { x: 0.909, y: 0.545 },
  lagaEfter: { x: 0.905, y: 0.5 },
  storlekFore: 0.035,
  storlekEfter: 0.11,
  alt: "Målning i holländsk ljusdunkelstil: en gammal man läser i en bok vid ett bord, upplyst av ett stearinljus",
};

const HOG: Bildpar = {
  fore: "/ljus/fore-hog.webp",
  efter: "/ljus/efter-hog.webp",
  bredd: 752,
  hojd: 1344,
  lagaFore: { x: 0.862, y: 0.684 },
  lagaEfter: { x: 0.84, y: 0.645 },
  storlekFore: 0.022,
  storlekEfter: 0.06,
  alt: "Målning i holländsk ljusdunkelstil: en gammal man läser i en bok vid ett bord, upplyst av ett stearinljus",
};

const KVALITET = 0.5;

const HORN = `
attribute vec2 aPos;
varying vec2 vUv;
void main() { vUv = aPos * .5 + .5; gl_Position = vec4(aPos, 0., 1.); }
`;

// Ljusets skimmer: en varm glöd runt lågan som fladdrar, och en bred, svag värme över rummet
// när lågan flammat upp. Allt mäts i kortets höjd så att formen blir densamma på alla skärmar.
const GLOD = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec2 vUv;
uniform vec2 uRes;
uniform float uTid;
uniform vec2 uLaga;
uniform float uStorlek;
uniform float uGlod;
uniform float uFlamma;

float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float brus(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1., 0.)), u.x), mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), u.x), u.y);
}

void main() {
  float asp = uRes.x / uRes.y;
  vec2 v = vec2(vUv.x * asp, vUv.y) - vec2(uLaga.x * asp, uLaga.y);
  float r = length(v);
  float k = uStorlek;
  // Lågan fladdrar: långsam andning och snabbare små ryck
  float fladder = .9 + .1 * brus(vec2(uTid * 5., 2.3)) + .05 * brus(vec2(uTid * 19., 7.7));
  // Glöden är lite högre än bred (lågan står upp) och mjukast nedåt
  vec2 vv = vec2(v.x, v.y * .8);
  float rr = length(vv);
  float karna = exp(-rr / (k * .35)) * 1.3;
  float gloria = exp(-rr / (k * 1.6)) * .45;
  float rum = exp(-r / (k * 7.)) * .16 * uFlamma;
  float sken = (karna + gloria) * fladder * uGlod + rum;
  vec3 farg = mix(vec3(1., .72, .35), vec3(1., .9, .7), clamp(karna, 0., 1.));
  vec3 ljus = farg * sken;
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
  const glod = skuggare(gl.FRAGMENT_SHADER, GLOD);
  const program = gl.createProgram();
  if (!horn || !glod || !program) return null;
  gl.attachShader(program, horn);
  gl.attachShader(program, glod);
  gl.linkProgram(program);
  return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null;
}

const mjuk = (t: number) => {
  const x = Math.min(Math.max(t, 0), 1);
  return x * x * (3 - 2 * x);
};

export function Ljusscen({
  etikett,
  rubrik,
  text,
  knappar,
}: {
  etikett: string;
  rubrik: ReactNode;
  text: string;
  knappar: ReactNode;
}) {
  const rubrikId = useId();
  const sektionRef = useRef<HTMLElement>(null);
  const kortRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const sektion = sektionRef.current;
    const kort = kortRef.current;
    const canvas = canvasRef.current;
    if (!sektion || !kort || !canvas) return;

    const smal = window.matchMedia(SMAL);
    const stilla = window.matchMedia("(prefers-reduced-motion: reduce)");

    let p = 0;
    let synlig = false;
    let raf = 0;
    let forra = 0;
    let tid = 0;

    // Skrollens läge i sektionen → --p (CSS) och --s0 (skalan som fyller skärmen).
    const lasSkroll = () => {
      if (stilla.matches) p = 1;
      else {
        const r = sektion.getBoundingClientRect();
        const bana = Math.max(1, r.height - window.innerHeight);
        p = Math.min(Math.max(-r.top / bana, 0), 1);
      }
      sektion.style.setProperty("--p", p.toFixed(4));
      // Lite mer än skärmen (×1,08), så att inget av väggen skymtar runt kanterna i mörkret.
      const s0 =
        1.08 *
        Math.max(
          window.innerWidth / Math.max(1, kort.offsetWidth),
          window.innerHeight / Math.max(1, kort.offsetHeight),
        );
      sektion.style.setProperty("--s0", s0.toFixed(4));
    };

    // Ett enda skrollsteg från startläget spelar hela sekvensen: sidan skrollas själv, i lugnt
    // tempo, från toppen till sektionens slut (där målningen hänger i ramen). Skrollar man igen
    // under tiden hoppar sekvensen till slutet och den vanliga skrollen tar vid. Skrollar man
    // uppåt avbryts den. Inget av detta med minskad rörelse.
    const INTRO_MS = 2800;
    // Hjulhändelser närmare varandra än så här hör till samma gest (styrplatta, mjuk mus).
    const GEST_MS = 350;
    let intro = 0; // rAF-id medan introt spelas
    let introStart = 0;
    let senasteHjul = -Infinity;
    const bana = () => Math.max(1, sektion.offsetHeight - window.innerHeight);
    const iStart = () =>
      !stilla.matches && window.scrollY <= 2 && sektion.getBoundingClientRect().top >= -2;
    const stoppaIntro = () => {
      if (intro) window.cancelAnimationFrame(intro);
      intro = 0;
      document.documentElement.style.removeProperty("scroll-behavior");
    };
    const hoppaTillSlut = () => {
      stoppaIntro();
      window.scrollTo({ top: sektion.offsetTop + bana(), behavior: "instant" as ScrollBehavior });
    };
    const introSteg = (nu: number) => {
      intro = 0;
      const t = Math.min((nu - introStart) / INTRO_MS, 1);
      // Mjuk start och mjukt slut
      const e = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      window.scrollTo({
        top: sektion.offsetTop + bana() * e,
        behavior: "instant" as ScrollBehavior,
      });
      if (t < 1) intro = window.requestAnimationFrame(introSteg);
    };
    const startaIntro = () => {
      introStart = performance.now();
      // Sidans mjuka skroll (html { scroll-behavior: smooth }) får inte lägga sig ovanpå.
      document.documentElement.style.setProperty("scroll-behavior", "auto");
      intro = window.requestAnimationFrame(introSteg);
    };
    const onHjul = (e: WheelEvent) => {
      if (stilla.matches) return;
      const nu = performance.now();
      const sammaGest = nu - senasteHjul < GEST_MS;
      senasteHjul = nu;
      if (intro) {
        // Pågående intro: en ny gest nedåt hoppar till slutet, uppåt avbryter. Händelser som
        // hör till gesten som startade introt ignoreras.
        e.preventDefault();
        if (sammaGest) return;
        if (e.deltaY > 0) hoppaTillSlut();
        else stoppaIntro();
        return;
      }
      if (e.deltaY > 0 && iStart()) {
        e.preventDefault();
        startaIntro();
      }
    };
    let pekY = 0;
    const onPekStart = (e: TouchEvent) => {
      pekY = e.touches[0]?.clientY ?? 0;
    };
    const onPekFlytt = (e: TouchEvent) => {
      if (stilla.matches) return;
      const y = e.touches[0]?.clientY ?? 0;
      const nedat = pekY - y > 8;
      if (intro) {
        e.preventDefault();
        if (nedat) hoppaTillSlut();
        else if (y - pekY > 8) stoppaIntro();
        return;
      }
      if (nedat && iStart()) {
        e.preventDefault();
        startaIntro();
      }
    };
    const onTangent = (e: KeyboardEvent) => {
      if (stilla.matches) return;
      const ned = e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey);
      if (!ned || e.target !== document.body) return;
      if (intro) {
        e.preventDefault();
        hoppaTillSlut();
      } else if (iStart()) {
        e.preventDefault();
        startaIntro();
      }
    };
    window.addEventListener("wheel", onHjul, { passive: false });
    window.addEventListener("touchstart", onPekStart, { passive: true });
    window.addEventListener("touchmove", onPekFlytt, { passive: false });
    window.addEventListener("keydown", onTangent);
    const stadaIntro = () => {
      stoppaIntro();
      window.removeEventListener("wheel", onHjul);
      window.removeEventListener("touchstart", onPekStart);
      window.removeEventListener("touchmove", onPekFlytt);
      window.removeEventListener("keydown", onTangent);
    };

    const gl = canvas.getContext("webgl", { antialias: false, depth: false, stencil: false });
    const program = gl ? skapaProgram(gl) : null;
    if (gl && program) {
      gl.useProgram(program);
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW,
      );
      const aPos = gl.getAttribLocation(program, "aPos");
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
      const u = {
        res: gl.getUniformLocation(program, "uRes"),
        tid: gl.getUniformLocation(program, "uTid"),
        laga: gl.getUniformLocation(program, "uLaga"),
        storlek: gl.getUniformLocation(program, "uStorlek"),
        glod: gl.getUniformLocation(program, "uGlod"),
        flamma: gl.getUniformLocation(program, "uFlamma"),
      };

      // Lågans läge i kortet (CSS-pixlar), räknat som object-fit: cover gör, före och efter.
      let bredd = 1;
      let hojd = 1;
      let fore = { x: 0, y: 0, k: 1 };
      let efter = { x: 0, y: 0, k: 1 };
      const mat = () => {
        const bild = smal.matches ? HOG : BRED;
        bredd = Math.max(1, kort.offsetWidth);
        hojd = Math.max(1, kort.offsetHeight);
        const skala = Math.max(bredd / bild.bredd, hojd / bild.hojd);
        const dx = (bredd - bild.bredd * skala) / 2;
        const dy = (hojd - bild.hojd * skala) / 2;
        const punkt = (l: Punkt, st: number) => ({
          x: dx + l.x * bild.bredd * skala,
          y: dy + l.y * bild.hojd * skala,
          k: st * bild.hojd * skala,
        });
        fore = punkt(bild.lagaFore, bild.storlekFore);
        efter = punkt(bild.lagaEfter, bild.storlekEfter);
        const upplosning = Math.min(window.devicePixelRatio || 1, 2) * KVALITET;
        canvas.width = Math.max(1, Math.round(bredd * upplosning));
        canvas.height = Math.max(1, Math.round(hojd * upplosning));
        gl.viewport(0, 0, canvas.width, canvas.height);
      };

      const rita = () => {
        // Lågan flammar upp mellan 0,12 och 0,45 av skrollen, med en överskjutning på toppen.
        const flamma = mjuk((p - 0.12) / 0.33);
        const x = fore.x + (efter.x - fore.x) * flamma;
        const y = fore.y + (efter.y - fore.y) * flamma;
        const k = fore.k + (efter.k - fore.k) * flamma;
        gl.uniform2f(u.res, canvas.width, canvas.height);
        gl.uniform1f(u.tid, tid);
        gl.uniform2f(u.laga, x / bredd, 1 - y / hojd);
        gl.uniform1f(u.storlek, k / hojd);
        gl.uniform1f(u.glod, 0.9 + 0.5 * Math.sin(flamma * Math.PI) - 0.25 * flamma);
        gl.uniform1f(u.flamma, flamma);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      };

      const kanRora = () =>
        synlig && !stilla.matches && document.visibilityState === "visible" && !gl.isContextLost();
      const tick = (nu: number) => {
        raf = 0;
        tid += (forra ? Math.min(nu - forra, 50) : 16) / 1000;
        forra = nu;
        rita();
        // Lågan fladdrar hela tiden så länge scenen syns – det är en låga.
        if (kanRora()) raf = window.requestAnimationFrame(tick);
      };
      const vacka = () => {
        if (!raf && kanRora()) raf = window.requestAnimationFrame(tick);
      };
      const stanna = () => {
        if (raf) window.cancelAnimationFrame(raf);
        raf = 0;
        forra = 0;
      };
      const uppdatera = () => {
        lasSkroll();
        mat();
        if (!synlig) return;
        if (stilla.matches) rita();
        else vacka();
      };

      const io = new IntersectionObserver(
        ([entry]) => {
          synlig = entry?.isIntersecting ?? false;
          if (!synlig) return stanna();
          if (stilla.matches) return rita();
          vacka();
        },
        { threshold: 0.02 },
      );
      const ro = new ResizeObserver(uppdatera);
      let skrollRaf = 0;
      const onSkroll = () => {
        if (!skrollRaf)
          skrollRaf = window.requestAnimationFrame(() => {
            skrollRaf = 0;
            lasSkroll();
            if (stilla.matches && synlig) rita();
          });
      };
      const onStilla = () => uppdatera();
      const onFlik = () => (document.visibilityState === "visible" ? vacka() : stanna());
      const onTappad = (e: Event) => {
        e.preventDefault();
        stanna();
      };

      uppdatera();
      io.observe(kort);
      ro.observe(kort);
      window.addEventListener("scroll", onSkroll, { passive: true });
      window.addEventListener("resize", onSkroll);
      smal.addEventListener("change", uppdatera);
      stilla.addEventListener("change", onStilla);
      document.addEventListener("visibilitychange", onFlik);
      canvas.addEventListener("webglcontextlost", onTappad);

      return () => {
        stadaIntro();
        stanna();
        if (skrollRaf) window.cancelAnimationFrame(skrollRaf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("scroll", onSkroll);
        window.removeEventListener("resize", onSkroll);
        smal.removeEventListener("change", uppdatera);
        stilla.removeEventListener("change", onStilla);
        document.removeEventListener("visibilitychange", onFlik);
        canvas.removeEventListener("webglcontextlost", onTappad);
        gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
      };
    }

    // Utan WebGL: bara skrollstyrningen (CSS tonar bilderna, ingen glöd).
    let skrollRaf = 0;
    const onSkroll = () => {
      if (!skrollRaf)
        skrollRaf = window.requestAnimationFrame(() => {
          skrollRaf = 0;
          lasSkroll();
        });
    };
    lasSkroll();
    window.addEventListener("scroll", onSkroll, { passive: true });
    window.addEventListener("resize", onSkroll);
    return () => {
      stadaIntro();
      if (skrollRaf) window.cancelAnimationFrame(skrollRaf);
      window.removeEventListener("scroll", onSkroll);
      window.removeEventListener("resize", onSkroll);
    };
  }, []);

  return (
    <section
      ref={sektionRef}
      aria-labelledby={rubrikId}
      className="ljus-hero"
      style={{ "--ljus-format": `${BRED.bredd} / ${BRED.hojd}` } as CSSProperties}
    >
      <div className="ljus-fast">
        {/* Ramen är samma konstruktion som på startsidan (border-image på föräldern). Under
            introt täcker det uppskalade kortet ramen; den glider fram när kortet krymper. */}
        <div className="galleri-ram galleri-ram-bred ljus-ram galleri-verk">
          <div
            ref={kortRef}
            className="ljus-kort relative isolate overflow-hidden bg-ink text-white"
          >
            <picture>
              <source media={SMAL} srcSet={HOG.fore} width={HOG.bredd} height={HOG.hojd} />
              <img
                src={BRED.fore}
                srcSet={BRED.foreSrcSet}
                sizes="100vw"
                alt={BRED.alt}
                width={BRED.bredd}
                height={BRED.hojd}
                fetchPriority="high"
                decoding="async"
                className="ljus-bild absolute inset-0 -z-30 size-full object-cover"
              />
            </picture>
            <picture>
              <source media={SMAL} srcSet={HOG.efter} width={HOG.bredd} height={HOG.hojd} />
              <img
                src={BRED.efter}
                srcSet={BRED.efterSrcSet}
                sizes="100vw"
                alt=""
                width={BRED.bredd}
                height={BRED.hojd}
                decoding="async"
                className="ljus-bild ljus-efter absolute inset-0 -z-20 size-full object-cover"
              />
            </picture>
            {/* Mörkret innan lågan flammat upp. Ligger under glöden, så bara lågan lyser igenom. */}
            <div aria-hidden="true" className="ljus-morker absolute inset-0 -z-[15]" />
            <canvas
              ref={canvasRef}
              aria-hidden="true"
              className="absolute inset-0 -z-10 size-full mix-blend-screen"
            />
            <div className="ljus-text relative px-6 pt-14 pb-20 sm:px-14 sm:pt-16">
              <p className="caps fyr-skugga text-white/75">{etikett}</p>
              <h1
                id={rubrikId}
                className="fyr-skugga mt-5 max-w-2xl text-[clamp(2.4rem,5.6vw,5rem)] leading-[1.02] text-elfenben"
              >
                {rubrik}
              </h1>
              <p className="fyr-skugga mt-5 max-w-xl text-white/85">{text}</p>
              {knappar}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
