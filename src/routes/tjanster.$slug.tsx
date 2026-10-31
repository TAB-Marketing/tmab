import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { ArrowRight, Check, FileCheck } from "lucide-react";
import { BokaKnapp, BokaPanel } from "@/components/Boka";
import { Markerad, Mark, PageHero } from "@/components/Heading";
import { SjalvMotOss } from "@/components/LyckasDigitalt";
import { BildGalleri } from "@/components/Projekt";
import { Reveal } from "@/components/Reveal";
import { Stegliste } from "@/components/Steg";
import { VanligaFragor } from "@/components/VanligaFragor";
import { kr, MOMS_TEXT } from "@/lib/priser";
import { brodsmulor, faqSchema, sidhuvud, tjanstSchema } from "@/lib/seo";
import { avstava } from "@/lib/text";
import { landningssidaForTjanst } from "@/lib/landningssidor";
import { hittaDelomrade, hittaTjanst, TJANSTER, tjanstSokvag, type Tjanst } from "@/lib/tjanster";

export const Route = createFileRoute("/tjanster/$slug")({
  beforeLoad: ({ params }) => {
    // Tjänster med egen landningssida (t.ex. /hemsida-foretag) har bara en adress, så att
    // två sidor inte konkurrerar om samma sökningar. Permanent omdirigering.
    // Områden som ingår i en annan tjänst (t.ex. cookies i Meta-annonser) har ingen egen sida.
    const del = hittaDelomrade(params.slug);
    if (del) throw redirect({ href: tjanstSokvag(del.ingarI), statusCode: 301 });
    const sida = landningssidaForTjanst(params.slug);
    if (sida) throw redirect({ href: sida.sokvag, statusCode: 301 });
  },
  loader: ({ params }) => {
    if (!hittaTjanst(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const t = hittaTjanst(params.slug);
    if (!t) return {};
    return sidhuvud({
      titel: t.seoTitel,
      beskrivning: t.seoBeskrivning,
      sokvag: `/tjanster/${t.slug}`,
      schema: [
        tjanstSchema(t),
        faqSchema(t.fragor),
        brodsmulor([
          { namn: "Hem", sokvag: "/" },
          { namn: "Tjänster", sokvag: "/tjanster" },
          { namn: t.titel, sokvag: `/tjanster/${t.slug}` },
        ]),
      ],
    });
  },
  component: TjanstSida,
});

/** Mästarens verk från startsidans Sal II (galleri/{namn}-840.webp), per tjänst. */
const MASTARE: Record<string, string> = {
  seo: "linne",
  geo: "sokrates",
  "meta-annonser": "aristoteles",
  hemsideoptimering: "nightingale",
  marknadsforingsbilder: "vermeer",
  hemsida: "davinci",
};

function TjanstSida() {
  const { slug } = Route.useParams();
  const t = hittaTjanst(slug);
  if (!t) return null;
  const ovriga = TJANSTER.filter((o) => o.slug !== t.slug);

  return (
    <>
      <PageHero
        {...(MASTARE[t.slug]
          ? { tavla: { src: `/galleri/${MASTARE[t.slug]}-840.webp`, bredd: 840, hojd: 1050 } }
          : {})}
        eyebrow={`Tjänster · ${t.titel}`}
        title={<Markerad text={t.rubrik.text} markera={t.rubrik.markera} />}
        intro={t.forklaring}
      >
        <BokaKnapp tjanst={t.slug} />
        <a href="#pris" className="btn-base btn-outline">
          Pris: {t.pris.fran ? "från " : ""}
          {kr(t.pris.belopp)}
          {t.pris.manad ? "/mån" : ""}
        </a>
      </PageHero>

      {t.galleri && (
        <section aria-labelledby="exempel" className="container-page pt-14 sm:pt-20">
          <Reveal>
            <p className="eyebrow">Exempel</p>
            <h2 id="exempel" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
              Bilder vi <Mark>tagit fram</Mark>
            </h2>
          </Reveal>
          <BildGalleri bilder={t.galleri} className="mt-10" />
        </section>
      )}

      <section aria-labelledby="jamforelse" className="container-page py-14 sm:py-20">
        <Reveal>
          <p className="eyebrow">Själv eller med oss</p>
          <h2 id="jamforelse" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
            Det här krävs för {avstava(t.iText)} – <Mark>vi gör det åt er</Mark>
          </h2>
        </Reveal>
        <Reveal delay={80} className="mt-10">
          <SjalvMotOss o={t} />
        </Reveal>
      </section>

      {t.arbetssatt && (
        <section aria-labelledby="arbetssatt" className="container-page pb-14 sm:pb-20">
          <Reveal>
            <p className="eyebrow">Så jobbar vi</p>
            <h2 id="arbetssatt" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
              Ni godkänner allt <Mark>innan vi bygger</Mark>
            </h2>
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <Stegliste steg={t.arbetssatt.steg} rad />
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 flex max-w-3xl gap-3 text-lg leading-relaxed text-ink/80">
              <FileCheck className="mt-1 size-5 shrink-0 text-guld-mork" aria-hidden="true" />
              {t.arbetssatt.underlag}
            </p>
          </Reveal>
        </section>
      )}

      {t.fordjupning?.map((f, i) => (
        <section
          key={f.rubrik.text}
          aria-labelledby={`fordjupning-${i}`}
          className="container-page pb-14 sm:pb-20"
        >
          <div className="max-w-3xl">
            <Reveal>
              <h2 id={`fordjupning-${i}`} className="text-3xl sm:text-4xl">
                <Markerad text={f.rubrik.text} markera={f.rubrik.markera} />
              </h2>
            </Reveal>
            {f.stycken?.map((p) => (
              <p key={p} className="mt-5 text-lg leading-relaxed text-ink/80">
                {p}
              </p>
            ))}
            {f.lista && (
              <ul className="mt-6 space-y-3">
                {f.lista.map((r) => (
                  <li key={r} className="skylt-liten flex gap-3 p-4 text-ink">
                    <Check className="mt-0.5 size-5 shrink-0 text-guld-mork" aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>
            )}
            {f.efter?.map((p) => (
              <p key={p} className="mt-5 text-lg leading-relaxed text-ink/80">
                {p}
              </p>
            ))}
            {f.lank && (
              <Link
                to={f.lank.till}
                className="mt-6 inline-flex items-center gap-2 font-bold text-ink underline decoration-sun decoration-2 underline-offset-4"
              >
                {f.lank.text}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            )}
          </div>
        </section>
      ))}

      <section className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page grid [&>*]:min-w-0 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <Pris t={t} />
          </Reveal>
          <Reveal delay={80}>
            <p className="eyebrow">Vanliga frågor</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">Frågor om {avstava(t.iText)}</h2>
            <div className="mt-8">
              <VanligaFragor fragor={t.fragor} />
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="fler-tjanster" className="container-page py-14 sm:py-20">
        <h2 id="fler-tjanster" className="text-3xl sm:text-4xl">
          Fler <Mark>tjänster</Mark>
        </h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {ovriga.map((o) => (
            <li key={o.slug}>
              <Link
                to={tjanstSokvag(o)}
                className="skylt group flex h-full items-center justify-between gap-3 p-5"
              >
                <span>
                  <span className="block font-bold text-ink">{o.titel}</span>
                  <span className="mt-1 block text-sm leading-snug text-muted-foreground">
                    {o.vad}
                  </span>
                </span>
                <ArrowRight
                  className="size-5 shrink-0 text-ink transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <BokaPanel tjanst={t.slug} />
    </>
  );
}

function Pris({ t }: { t: Tjanst }) {
  return (
    <div id="pris" className="inramad scroll-mt-28 p-8 text-elfenben sm:p-10">
      <p className="caps text-sun">Pris</p>
      <p className="mt-5 text-white/80">{t.pris.avser}</p>
      <p className="mt-2 font-display text-5xl leading-none sm:text-6xl">
        {t.pris.fran ? <span className="text-3xl sm:text-4xl">från </span> : null}
        {kr(t.pris.belopp)}
        {t.pris.manad ? <span className="text-3xl sm:text-4xl">/mån</span> : null}
      </p>
      <p className="mt-3 text-sm text-white/70">{MOMS_TEXT}</p>
      {t.iPaket && <p className="mt-8 leading-relaxed text-white/85">{t.iPaket}</p>}
      <div className="mt-8 flex flex-wrap gap-3">
        <BokaKnapp variant="white" tjanst={t.slug} />
        <Link to="/priser" className="btn-base btn-outline-white">
          Alla priser
        </Link>
      </div>
    </div>
  );
}
