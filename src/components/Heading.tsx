import type { ElementType, ReactNode } from "react";
import { avstava } from "@/lib/text";

export function Heading({
  as: Tag = "h2",
  className = "",
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={className}>{children}</Tag>;
}

/** Markerat ord – gul understrykning (en riktig text-underline). */
export function Mark({ children, nowrap = false }: { children: ReactNode; nowrap?: boolean }) {
  return (
    <span
      className={`italic underline decoration-sun decoration-[0.07em] underline-offset-[0.1em] [text-decoration-skip-ink:none] ${
        nowrap ? "whitespace-nowrap" : ""
      }`}
    >
      {children}
    </span>
  );
}

/** Tavla i sidhuvudet: ett verk från startsidans galleri, inramat på väggen. */
export type HeroTavla = { src: string; bredd: number; hojd: number };

/**
 * Sidhuvud för undersidor: galleriväggen med ljus uppifrån, serif-rubrik och – när `tavla`
 * finns – ett inramat verk från startsidans galleri till höger (bara på stora skärmar; på
 * mobil laddas den aldrig, se loading="lazy" på ett dolt element). Utan tavla: bara väggen.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  tavla,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  tavla?: HeroTavla;
}) {
  return (
    <section className="vagg-ljus relative isolate overflow-hidden">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 border-b border-ink/70"
      />
      <div className="mx-auto grid max-w-[78rem] items-center gap-12 px-6 py-16 sm:py-24 lg:grid-cols-[minmax(0,1fr)_auto] lg:py-28">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-6 max-w-3xl text-[clamp(2.5rem,6.4vw,5.5rem)] leading-[1.02]">
            {title}
          </h1>
          {intro && <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/80">{intro}</p>}
          {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </div>
        {tavla && (
          <div aria-hidden="true" className="galleri-verk hidden lg:block">
            <div className="galleri-ram w-[min(22rem,28vw)]">
              <img
                src={tavla.src}
                alt=""
                width={tavla.bredd}
                height={tavla.hojd}
                loading="lazy"
                decoding="async"
                className="block aspect-[4/5] h-auto w-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/** Rubriktext där en del (`markera`) får gul understrykning. */
export function Markerad({ text, markera }: { text: string; markera: string }) {
  const i = text.indexOf(markera);
  if (i < 0) return <>{avstava(text)}</>;
  return (
    <>
      {avstava(text.slice(0, i))}
      <Mark>{avstava(markera)}</Mark>
      {avstava(text.slice(i + markera.length))}
    </>
  );
}
