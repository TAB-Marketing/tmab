import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Check, FileCheck, Receipt, Unlock } from "lucide-react";
import { BokaPanel } from "@/components/Boka";
import { Heading, Mark, PageHero } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { FORETAG } from "@/lib/foretag";
import { AGANDE_TEXT, BINDNING_TEXT } from "@/lib/priser";
import { sidhuvud } from "@/lib/seo";

/*
 * UTKAST (gren utkast/om-oss) – inte publicerat.
 * Allt inom [hakparenteser] i texterna är platshållare eller sådant ni måste bekräfta innan
 * sidan går live. Sök efter "[" i filen.
 *
 * Ordning: vilka vi är → erfarenhet → det vi byggt → hur vi använder AI → det vi står för →
 * fakta → boka. Teamet och bevisen först, villkoren som stöd längre ner.
 */

export const Route = createFileRoute("/om-oss")({
  head: () =>
    sidhuvud({
      titel: "Om oss – teamet bakom byrån",
      beskrivning: `${FORETAG.namn} drivs av tre grundare från Handelshögskolan i Göteborg som marknadsför sitt eget bolag. Nu gör vi samma jobb åt företag i hela Sverige.`,
      sokvag: "/om-oss",
    }),
  component: OmOss,
});

// Teamet. Inga foton (ert beslut okt 2026) – initialerna står i stället för bild.
// [BESLUT] I oktober bestämde ni att /om-oss skulle vara anonym. Namn är det som bygger mest
// förtroende, men vill ni inte visa dem: töm listan, så visas bara texten ovanför.
const TEAMET: readonly { namn: string; roll: string; text: string }[] = [
  {
    namn: "Edvin Tell",
    roll: "[Roll – t.ex. kundkontakt och SEO/GEO]",
    text: "[En mening om vad Edvin gör i era uppdrag och vad kunden pratar med honom om.]",
  },
  {
    namn: "Alex Hvittfeldt",
    roll: "[Roll – t.ex. hemsidor och utveckling]",
    text: "[En mening om vad Alex gör i era uppdrag.]",
  },
  {
    namn: "Nikolaj Algera",
    roll: "[Roll – t.ex. bilder, video och annonser]",
    text: "[En mening om vad Nikolaj gör i era uppdrag.]",
  },
];

// Erfarenheten – bara sådant som har hänt. Teamets erfarenhet, inte byråns ålder.
const ERFARENHET = [
  {
    rubrik: "Vi har marknadsfört vårt eget bolag från noll",
    text: "Treatly, vårt andra bolag, levererar tårtor och blommor till anställda åt företag. Hemsidan, kundplattformen, bilderna, LinkedIn-innehållet till HR-chefer och försäljningen har vi gjort själva.",
  },
  {
    rubrik: "Vi testar det vi säljer på oss själva",
    text: "Till Treatly prövade vi att lämna en tårta i receptionen till en namngiven person i stället för att mejla. Av de första tio leveranserna blev fyra bokade möten. Så jobbar vi med marknadsföring: testa, mät och gör mer av det som fungerar.",
  },
  {
    rubrik: "Marknadsföring är också vårt jobb utanför TAB",
    text: "[Bekräfta innan publicering: t.ex. ”En av oss tar fram produktbilder och innehåll för e-handel på ett industriföretag.” Nämn arbetsgivaren bara om ni fått lov.]",
  },
] as const;

// Det vi byggt. Relationen står öppet – egna projekt ska inte se ut som kunduppdrag.
const BYGGT: readonly {
  namn: string;
  url: string;
  doman: string;
  relation: string;
  behov: string;
  gjorde: readonly string[];
}[] = [
  {
    namn: "Treatly",
    url: "https://www.treatly.se",
    doman: "treatly.se",
    relation: "Vårt eget bolag",
    behov:
      "En tjänst där företag godkänner uppvaktning av personalen i ett klick, och kunder som hittar den.",
    gjorde: [
      "Hemsida och kundplattform – design, texter och utveckling",
      "Automatiserad backend för beställningar och leveranser",
      "LinkedIn-innehåll riktat till HR-chefer",
    ],
  },
  {
    namn: "Scudaro",
    url: "https://www.scudaro.com",
    doman: "scudaro.com",
    relation: "[Bekräfta: eget varumärke / byggt åt en vän]",
    behov: "Ett streetwearmärke som behövde en egen bildvärld och en butik som säljer.",
    gjorde: [
      "Visuell identitet och lookbook framtagen med AI",
      "Egen butik kopplad till Shopify via Storefront API",
    ],
  },
  {
    namn: "Hvittfeldt Invest",
    url: "https://www.hvittfeldtinvest.se",
    doman: "hvittfeldtinvest.se",
    relation: "[Bekräfta: byggt åt en bekant / familj]",
    behov: "En styrelseproffs med över 30 uppdrag som behövde en seriös hemsida som går att hitta.",
    gjorde: [
      "Hemsida – design och utveckling",
      "Sökmotoranpassade titlar, beskrivningar och delningsbild",
      "Drift och administration av sajten",
    ],
  },
];

// AI som kundnytta – vad det ger kunden, och vad vi själva ansvarar för.
const AI_GOR = [
  "Bilder och korta videor utan fotografering. En bild tar oss ungefär 10–15 minuter i stället för en fotodag.",
  "Fler förslag att välja mellan, och samma material anpassat till Instagram, Facebook och hemsidan.",
  "Hemsidor som byggs snabbare – därför kan vi hålla fasta priser.",
];
const VI_GOR = [
  "Väljer vad som ska sägas och till vem. Det gör inget verktyg åt er.",
  "Läser, rättar och faktagranskar varje text innan den publiceras.",
  "Sorterar bort bilder som ser AI-gjorda ut, och använder era riktiga produktbilder som grund.",
  "Kontrollerar koden och tekniken – snabbhet, mobil och att Google kan läsa sidan.",
];

const VARDERINGAR = [
  {
    ikon: Receipt,
    titel: "Fasta priser",
    text: "Ni ser vad det kostar innan vi börjar. Alla grundpriser står på sajten, och arbete utanför det avtalade stämmer vi av först.",
  },
  {
    ikon: Unlock,
    titel: "Ingen bindningstid",
    text: BINDNING_TEXT.replace("Ingen bindningstid. ", ""),
  },
  {
    ikon: FileCheck,
    titel: "Ni äger allt",
    text: AGANDE_TEXT,
  },
] as const;

const FAKTA = [
  { rubrik: "Varumärke", varde: FORETAG.namn },
  { rubrik: "Bolag", varde: FORETAG.juridisktNamn },
  { rubrik: "Organisationsnummer", varde: FORETAG.orgnr },
  { rubrik: "Bransch", varde: "Marknadsföring & kommunikation" },
  { rubrik: "Säte", varde: FORETAG.adress },
  { rubrik: "E-post", varde: FORETAG.epost },
  { rubrik: "Skatt", varde: "Godkänd för F-skatt, momsregistrerad" },
] as const;

const initialer = (namn: string) =>
  namn
    .split(" ")
    .filter((_, i, a) => i === 0 || i === a.length - 1)
    .map((d) => d[0])
    .join("");

function OmOss() {
  return (
    <>
      <PageHero
        tavla={{ src: "/galleri/detalj-pion.webp", bredd: 905, hojd: 1119 }}
        eyebrow="Om oss"
        title={
          <>
            Vi marknadsför vårt <Mark>eget bolag</Mark>. Nu gör vi det åt er
          </>
        }
        intro="Bakom TAB står tre grundare från Handelshögskolan i Göteborg. Vi har byggt hemsidor, tagit fram bilder och sålt till företag åt oss själva – och vet därför vad som faktiskt ger kunder."
      />

      {/* Vilka vi är */}
      <section aria-labelledby="vilka" className="container-page py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Vilka vi är</p>
            <Heading className="mt-4 text-4xl sm:text-5xl">
              <span id="vilka">
                Tre personer, <Mark>en kontakt</Mark>
              </span>
            </Heading>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink/80">
              <p>
                {FORETAG.namn} drivs av {FORETAG.juridisktNamn}, bolaget vi startade för att göra
                det enkelt för företag att fira sina anställda. För att få Treatly att växa lärde vi
                oss att göra marknadsföringen själva.
              </p>
              <p>
                Tillsammans har vi snart tre års erfarenhet av marknadsföring. Ni har en kontakt hos
                oss, och det är samma personer som gör jobbet – inga underkonsulter ni aldrig
                träffar.
              </p>
            </div>
          </Reveal>
          {TEAMET.length > 0 && (
            <Reveal delay={100}>
              <ul className="space-y-3">
                {TEAMET.map((p) => (
                  <li key={p.namn} className="skylt-liten flex gap-5 p-5">
                    <span
                      aria-hidden="true"
                      className="grid size-14 shrink-0 place-items-center rounded-full border border-guld font-display text-xl text-guld-mork"
                    >
                      {initialer(p.namn)}
                    </span>
                    <span>
                      <span className="block text-lg font-bold text-ink">{p.namn}</span>
                      <span className="block text-sm text-muted-foreground">{p.roll}</span>
                      <span className="mt-2 block leading-relaxed text-ink/80">{p.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </section>

      {/* Erfarenhet */}
      <section aria-labelledby="erfarenhet" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Erfarenhet</p>
            <h2 id="erfarenhet" className="mt-4 text-4xl sm:text-5xl">
              Vi har gjort det <Mark>för oss själva</Mark> först
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3 [&>*]:min-w-0">
            {ERFARENHET.map((e, i) => (
              <Reveal key={e.rubrik} delay={i * 90}>
                <article className="skylt h-full p-8 text-ink">
                  <h3 className="text-2xl">{e.rubrik}</h3>
                  <p className="mt-3 leading-relaxed opacity-90">{e.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Det vi byggt */}
      <section aria-labelledby="byggt" className="container-page py-14 sm:py-20">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Det vi byggt</p>
          <h2 id="byggt" className="mt-4 text-4xl sm:text-5xl">
            Hemsidor ni kan <Mark>öppna själva</Mark>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/80">
            Vi är en ny byrå, så vi visar det vi faktiskt har gjort – och säger rakt ut om det är
            vårt eget bolag eller byggt åt någon vi känner.
          </p>
        </Reveal>
        <ul className="mt-10 grid gap-4 lg:grid-cols-3 [&>*]:min-w-0">
          {BYGGT.map((p, i) => (
            <li key={p.url}>
              <Reveal delay={i * 80} className="h-full">
                <article className="skylt flex h-full flex-col p-7 text-ink">
                  <p className="caps text-muted-foreground">{p.relation}</p>
                  <h3 className="mt-3 text-3xl">{p.namn}</h3>
                  <p className="mt-4 text-sm font-bold">Behövde</p>
                  <p className="mt-1 leading-relaxed text-ink/80">{p.behov}</p>
                  <p className="mt-5 text-sm font-bold">Vi gjorde</p>
                  <ul className="mt-2 space-y-2">
                    {p.gjorde.map((g) => (
                      <li key={g} className="flex gap-2 leading-snug text-ink/80">
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-guld-mork"
                          aria-hidden="true"
                        />
                        {g}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener"
                    className="mt-auto inline-flex items-center gap-1 pt-6 font-bold text-ink underline-offset-4 hover:underline"
                  >
                    {p.doman}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* AI */}
      <section aria-labelledby="ai" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Så använder vi AI</p>
            <h2 id="ai" className="mt-4 text-4xl sm:text-5xl">
              Verktygen gör det snabbt. <Mark>Vi gör det bra</Mark>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              Alla har tillgång till samma AI-verktyg. Skillnaden ligger i vad man ber om, vad man
              kastar och vad man kontrollerar innan det når era kunder.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 [&>*]:min-w-0">
            <Reveal>
              <div className="skylt-liten h-full p-8">
                <h3 className="text-2xl text-ink">Det AI ger er</h3>
                <ul className="mt-5 space-y-3">
                  {AI_GOR.map((t) => (
                    <li key={t} className="flex gap-3 leading-relaxed text-ink/80">
                      <Check className="mt-1 size-4 shrink-0 text-guld-mork" aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="skylt-liten h-full p-8">
                <h3 className="text-2xl text-ink">Det vi ansvarar för</h3>
                <ul className="mt-5 space-y-3">
                  {VI_GOR.map((t) => (
                    <li key={t} className="flex gap-3 leading-relaxed text-ink/80">
                      <Check className="mt-1 size-4 shrink-0 text-guld-mork" aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Det vi står för */}
      <section aria-labelledby="star-for" className="container-page py-14 sm:py-20">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Det vi står för</p>
          <h2 id="star-for" className="mt-4 text-4xl sm:text-5xl">
            Inga <Mark>överraskningar</Mark>
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3 [&>*]:min-w-0">
          {VARDERINGAR.map((v, i) => (
            <Reveal key={v.titel} delay={i * 90}>
              <article className="skylt h-full p-8 text-ink">
                <span className="grid size-14 place-items-center rounded-full border border-guld text-guld-mork">
                  <v.ikon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-8 text-3xl">{v.titel}</h3>
                <p className="mt-3 leading-relaxed opacity-90">{v.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Fakta */}
      <section aria-label="Fakta om företaget" className="container-page pb-14 sm:pb-20">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Fakta om företaget</p>
          <dl className="skylt-liten mt-6 divide-y-2 divide-line px-6 py-2 sm:px-8">
            {FAKTA.filter((f) => f.varde).map((f) => (
              <div key={f.rubrik} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="text-sm font-bold text-ink">{f.rubrik}</dt>
                <dd className="text-muted-foreground">{f.varde}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-muted-foreground">
            Adressen är bolagets säte. Vi möts på video, telefon eller hos er i Göteborgsområdet.
          </p>
        </Reveal>
      </section>

      <BokaPanel />
    </>
  );
}
