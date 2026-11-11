import { Link } from "@tanstack/react-router";
import { Fragment } from "react";
import { LANK } from "@/lib/lankar";

const LANK_STIL =
  "font-medium text-ink underline decoration-guld decoration-2 underline-offset-[3px] transition-colors hover:decoration-ink";

/** Text där [länktext](/sokvag) blir en länk. Interna adresser (börjar med /) blir <Link>. */
export function MedLankar({ text }: { text: string }) {
  const delar: React.ReactNode[] = [];
  let sist = 0;
  for (const m of text.matchAll(LANK)) {
    const [hela, lanktext, href] = m;
    const start = m.index ?? 0;
    if (start > sist) delar.push(text.slice(sist, start));
    delar.push(
      href?.startsWith("/") ? (
        <Link key={start} to={href} className={LANK_STIL}>
          {lanktext}
        </Link>
      ) : (
        <a key={start} href={href} className={LANK_STIL} target="_blank" rel="noopener">
          {lanktext}
        </a>
      ),
    );
    sist = start + hela.length;
  }
  if (sist < text.length) delar.push(text.slice(sist));
  return (
    <>
      {delar.map((d, i) => (
        <Fragment key={i}>{d}</Fragment>
      ))}
    </>
  );
}
