import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Check,
  Clapperboard,
  Compass,
  Eye,
  FileText,
  GalleryHorizontal,
  Handshake,
  Heart,
  Image,
  LayoutTemplate,
  MessageCircle,
  MousePointerClick,
  PenLine,
  Send,
  Settings2,
  ShoppingBag,
  SlidersHorizontal,
  Smartphone,
  Target,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { BokaKnapp, BokaPanel } from "@/components/Boka";
import { KortVy, type Kort } from "@/components/Kort";
import { Markerad, Mark } from "@/components/Heading";
import { MastarHero } from "@/components/MastarHero";
import { Reveal } from "@/components/Reveal";
import { Stegliste, type Steg } from "@/components/Steg";
import { VanligaFragor } from "@/components/VanligaFragor";
import { FORETAG } from "@/lib/foretag";
import { MASTAR_HERO } from "@/lib/mastare";
import { HEMSIDA_FORETAG } from "@/lib/hemsida-foretag";
import { HEMSIDA_PRIS } from "@/lib/hemsida-pris";
import { META_ADS_BYRA, META_FRAGOR } from "@/lib/meta-ads-byra";
import { ANNONSER, BINDNING_TEXT, kr, MOMS_TEXT, PRIS } from "@/lib/priser";
import { SEO_BYRA } from "@/lib/seo-byra";
import { brodsmulor, faqSchema, sidhuvud, tjanstSchema } from "@/lib/seo";
import { bokaKlick } from "@/lib/sparning";
import { hittaTjanst, tjanstSokvag } from "@/lib/tjanster";

const SIDA = META_ADS_BYRA.sokvag;
const TJANST = "meta-annonser";

export const Route = createFileRoute("/meta-ads-byra")({
  head: () => {
    const t = hittaTjanst(TJANST);
    return sidhuvud({
      titel: META_ADS_BYRA.seoTitel,
      beskrivning: META_ADS_BYRA.seoBeskrivning,
      sokvag: SIDA,
      schema: [
        ...(t
          ? [
              tjanstSchema(t, {
                namn: "Annonsering på Facebook och Instagram (Meta Ads)",
                beskrivning: META_ADS_BYRA.seoBeskrivning,
                sokvag: SIDA,
              }),
            ]
          : []),
        faqSchema(META_FRAGOR),
        brodsmulor([
          { namn: "Hem", sokvag: "/" },
          { namn: "Tjänster", sokvag: "/tjanster" },
          { namn: META_ADS_BYRA.titel, sokvag: SIDA },
        ]),
      ],
    });
  },
  component: MetaAdsByra,
});

const LANK =
  "font-bold text-ink underline decoration-sun decoration-2 underline-offset-4 hover:decoration-ink";

const FORDELAR_HERO = [
  "Annonsering anpassad efter ert företag",
  "Fokus på förfrågningar och försäljning",
  "Löpande analys och förbättring",
] as const;

const VAD_GER: readonly Kort[] = [
  {
    titel: "Nå rätt personer",
    text: "Kampanjer byggda efter vem kunden är och vad annonsen ska leda till.",
    ikon: Target,
  },
  {
    titel: "Skapa efterfrågan",
    text: "Visa erbjudandet för personer som inte letar efter er – än.",
    ikon: TrendingUp,
  },
  {
    titel: "Mät det som spelar roll",
    text: "Klick, förfrågningar och köp, där mätningen tillåter det.",
    ikon: BarChart3,
  },
  {
    titel: "Bli bättre över tid",
    text: "Varje vecka ger data om vad som fungerar och vad som ska bort.",
    ikon: SlidersHorizontal,
  },
];

const TJANSTER: readonly Kort[] = [
  {
    titel: "Annonseringsstrategi",
    text: "Mål, målgrupp, budskap och budgetfördelning, och vilka resultat vi ska följa upp, innan första kronan går till Meta.",
    ikon: Compass,
  },
  {
    titel: "Kampanjuppsättning",
    text: "Annonskonto och Business Manager i ert namn, kampanjer i Ads Manager och rätt kampanjmål för det ni vill uppnå.",
    ikon: Settings2,
  },
  {
    titel: "Målgruppsanalys",
    text: "Vilka era kunder är, var de bor och vad de bryr sig om, med de målgruppsinställningar Meta tillåter.",
    ikon: Users,
  },
  {
    titel: "Annonsmaterial och texter",
    text: "Bild, video och karusell för flödet, Stories och Reels, gjorda av ert befintliga material med rubriker och texter i flera varianter. Nytt material tas fram i Studio.",
    ikon: PenLine,
  },
  {
    titel: "Kampanjoptimering",
    text: "Vi flyttar budget till det som fungerar, byter ut annonser som tappar och justerar målgrupperna löpande.",
    ikon: SlidersHorizontal,
  },
  {
    titel: "Rapport varje månad",
    text: "Vad budgeten gav i klick, förfrågningar och köp, och vad vi ändrar härnäst. På svenska, utan jargong.",
    ikon: FileText,
  },
];

const PRINCIPER: readonly Kort[] = [
  {
    titel: "Ett tydligt mål",
    text: "Förfrågningar, bokningar eller köp – en sak per kampanj, så att det går att mäta.",
    ikon: Target,
  },
  {
    titel: "En budget ni har koll på",
    text: "Ni bestämmer annonsbudgeten och kan ändra den när som helst.",
    ikon: Wallet,
  },
  {
    titel: "Utvärdera innan ni skalar",
    text: "Låt kampanjen gå några veckor, se vad den ger, och öka först när den fungerar.",
    ikon: BarChart3,
  },
];

const KUNDRESA = [
  { titel: "Annons", text: "Fångar uppmärksamheten i flödet", ikon: Smartphone },
  { titel: "Klick", text: "Personen vill veta mer", ikon: MousePointerClick },
  { titel: "Landningssida", text: "Erbjudandet blir tydligt", ikon: LayoutTemplate },
  { titel: "Förfrågan", text: "Formulär, bokning eller köp", ikon: Send },
] as const;

const MAL = [
  "Offertförfrågningar",
  "Bokade konsultationer",
  "Produktförsäljning",
  "Relevanta besök på hemsidan",
] as const;

const FORMAT: readonly Kort[] = [
  { titel: "Bildannonser", text: "En stark bild och ett tydligt budskap.", ikon: Image },
  {
    titel: "Videoannonser",
    text: "Korta videor som visar produkten eller tjänsten i användning.",
    ikon: Clapperboard,
  },
  {
    titel: "Reels och Stories",
    text: "Vertikalt format för helskärm i mobilen.",
    ikon: Smartphone,
  },
  {
    titel: "Karusellannonser",
    text: "Flera produkter eller budskap i samma annons.",
    ikon: GalleryHorizontal,
  },
  {
    titel: "Annonstexter",
    text: "Rubriker och texter i flera varianter som gör erbjudandet och nästa steg tydligt.",
    ikon: PenLine,
  },
];

const NYCKELTAL = [
  { kort: "CPL", namn: "Kostnad per lead", text: "Annonskostnad per förfrågan eller formulär." },
  {
    kort: "CPA",
    namn: "Kostnad per konvertering",
    text: "Annonskostnad per köp, bokning eller annan händelse ni valt.",
  },
  {
    kort: "ROAS",
    namn: "Return on Ad Spend",
    text: "Rapporterad försäljning delat med annonskostnaden. Inte samma sak som vinst.",
  },
  { kort: "CTR", namn: "Klickfrekvens", text: "Andelen visningar som leder till ett klick." },
  { kort: "CPM", namn: "Kostnad per tusen visningar", text: "Vad det kostar att synas." },
  {
    kort: "Konverteringar",
    namn: "Registrerade händelser",
    text: "Formulär, bokningar eller köp som mätningen fångat.",
  },
] as const;

const STEG: readonly Steg[] = [
  {
    titel: "Gratis genomgång",
    text: "Erbjudandet, kunderna ni vill nå och vad annonseringen ska ge.",
  },
  {
    titel: "Strategi och budget",
    text: "Förslag på kampanjer, budskap och annonsbudget utifrån målen.",
  },
  {
    titel: "Material och uppsättning",
    text: "Konto, pixel och cookiebanner (när vi har tillgång till sajten), annonser och kampanjer.",
  },
  {
    titel: "Lansering",
    text: "Ni godkänner annonserna, sedan går de live och vi följer de första resultaten.",
  },
  {
    titel: "Optimering",
    text: "Löpande justeringar och en rapport varje månad om vad budgeten gav.",
  },
];

const JAMFORELSE = [
  {
    titel: "Meta Ads",
    rader: [
      "Betald räckvidd – syns direkt",
      "Når personer som inte letar än",
      "Annonsmaterial och målgrupper",
      "Kostar så länge annonserna går",
    ],
    stil: "mork-kort text-elfenben",
  },
  {
    titel: "SEO",
    rader: [
      "Organisk synlighet på Google",
      "Når personer som redan söker",
      "Sökord, innehåll och teknik",
      "Byggs upp över tid och fortsätter ge",
    ],
    stil: "skylt text-ink",
  },
] as const;

const LANDNINGSSIDA: readonly Kort[] = [
  {
    titel: "Tydligt erbjudande",
    text: "Samma budskap som i annonsen, direkt överst.",
    ikon: Target,
  },
  {
    titel: "Byggd för mobilen",
    text: "De flesta klick från Facebook och Instagram kommer från en telefon.",
    ikon: Smartphone,
  },
  {
    titel: "Snabb och begriplig",
    text: "Varje sekund av laddning och varje oklarhet kostar besökare.",
    ikon: TrendingUp,
  },
  {
    titel: "Lätt att ta nästa steg",
    text: "Ett formulär, en bokning eller en köpknapp, utan att leta.",
    ikon: Send,
  },
];

const BRANSCHER: readonly { titel: string; text: string }[] = [
  {
    titel: "Lokala tjänsteföretag",
    text: "Annonser till personer i ert område som leder till en förfrågan eller bokning.",
  },
  {
    titel: "Skönhetssalonger och frisörer",
    text: "Visuella annonser för behandlingar och erbjudanden, med bokning ett klick bort.",
  },
  {
    titel: "E-handel",
    text: "Produktannonser, karuseller och annonser till besökare som lämnat varukorgen.",
  },
  {
    titel: "Konsultföretag",
    text: "Annonser som visar kompetensen och leder till en bokad konsultation.",
  },
  {
    titel: "Hantverkare och byggföretag",
    text: "Före och efter-bilder från era egna jobb och ett tydligt erbjudande som leder till offertförfrågningar.",
  },
];

const VARFOR: readonly Kort[] = [
  {
    titel: "Personlig kontakt",
    text: "En kontaktperson som förklarar strategin och resultaten – svar inom en arbetsdag.",
    ikon: Handshake,
  },
  {
    titel: "Affärsmål först",
    text: "Vi mäter förfrågningar och köp, inte gillamarkeringar.",
    ikon: Target,
  },
  {
    titel: "Bilder och analys",
    text: "Vi tar fram annonsmaterialet själva och följer upp vad det ger.",
    ikon: Image,
  },
  {
    titel: "Annons, sajt och SEO",
    text: "Behöver landningssidan eller hemsidan förbättras gör vi det som ett Webb-jobb, när annonserna visar att det behövs.",
    ikon: LayoutTemplate,
  },
];

function MetaAdsByra() {
  return (
    <>
      <MastarHero
        mastare={MASTAR_HERO[TJANST]}
        hantverk={META_ADS_BYRA.titel}
        title={
          <Markerad
            text="Meta Ads-byrå&nbsp;– annonsering på Facebook och Instagram"
            markera="Facebook och Instagram"
          />
        }
        intro="Vill ni nå fler kunder med annonser på Facebook och Instagram? Vi planerar, skapar och optimerar era Meta-kampanjer, med en tydlig strategi, annonser gjorda av ert material och uppföljning varje månad. Oavsett om målet är fler förfrågningar, mer försäljning eller bättre resultat av annonser ni redan kör."
      >
        <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "hero")} />
        <a href="#process" className="btn-base btn-outline">
          Se hur vi arbetar
        </a>
      </MastarHero>

      {/* Fördelar och illustration */}
      <section
        aria-label="Kort om tjänsten"
        className="container-page grid [&>*]:min-w-0 items-center gap-10 pt-10 pb-4 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
      >
        <ul className="space-y-3">
          {FORDELAR_HERO.map((f) => (
            <li key={f} className="flex items-center gap-3 font-bold text-ink">
              <span className="grid size-7 shrink-0 place-items-center rounded-full text-guld-mork border border-guld">
                <Check className="size-4" strokeWidth={3} aria-hidden="true" />
              </span>
              {f}
            </li>
          ))}
          <li className="pt-2">
            <span className="rounded-full bg-sun px-3 py-1 text-sm font-bold text-ink">
              Från {kr(PRIS.annonser1)}/mån · annonsbudget betalas till Meta
            </span>
          </li>
        </ul>
        <Annonsmockup />
      </section>

      {/* Vad är Meta Ads */}
      <section aria-labelledby="vad" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Grunderna</p>
            <h2 id="vad" className="mt-4 text-4xl sm:text-5xl">
              Vad är Meta Ads och hur fungerar <Mark>annonseringen</Mark>?
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              Meta Ads är Metas annonssystem för Facebook och Instagram. Där väljer ni vad
              annonserna ska uppnå – kännedom, besök på hemsidan, förfrågningar eller köp – och
              betalar för att de visas.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Vilka som ser annonserna styrs av kampanjmålet, materialet, budgeten, målgruppen och
              Metas eget leveranssystem. Därför räcker det sällan med en snygg bild: budskap,
              målgrupp, erbjudande och sidan man landar på måste hänga ihop.
            </p>
          </Reveal>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VAD_GER.map((k, i) => (
            <li key={k.titel}>
              <Reveal delay={i * 60} className="h-full">
                <KortVy k={k} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Tjänster */}
      <section aria-labelledby="tjanster" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Det här gör vi</p>
            <h2 id="tjanster" className="mt-4 max-w-4xl text-4xl sm:text-5xl">
              Våra Meta Ads-tjänster – från strategi till <Mark>optimering</Mark>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
              Bra annonsering är mer än en annons och en budget. Vi planerar, gör annonserna av ert
              material, sköter kampanjerna och följer upp vad de ger.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TJANSTER.map((k, i) => (
              <li key={k.titel}>
                <Reveal delay={i * 60} className="h-full">
                  <KortVy k={k} />
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal delay={80} className="mt-10">
            <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "tjanster")}>
              Få hjälp med Meta Ads
            </BokaKnapp>
          </Reveal>
        </div>
      </section>

      {/* Facebook och Instagram */}
      <section className="container-page grid [&>*]:min-w-0 gap-6 py-14 sm:py-20 lg:grid-cols-2">
        <Reveal className="h-full">
          <article aria-labelledby="facebook" className="skylt h-full p-8 sm:p-10">
            <span className="grid size-12 place-items-center rounded-full text-guld-mork border border-guld/60">
              <MessageCircle className="size-6" aria-hidden="true" />
            </span>
            <h2 id="facebook" className="mt-6 text-3xl sm:text-4xl">
              Facebook-annonsering som når <Mark>rätt kunder</Mark>
            </h2>
            <p className="mt-5 leading-relaxed text-ink/80">
              Facebook når en bred publik i alla åldrar och fungerar bra för att presentera
              tjänster, nå lokala kunder och få in förfrågningar, gärna med formulärannonser där
              kunden lämnar sina uppgifter utan att lämna appen.
            </p>
            <p className="mt-4 leading-relaxed text-ink/80">
              Oavsett om ni kallar det Facebook-reklam, Facebook Ads eller att annonsera på Facebook
              utgår strategin från erbjudandet, vem ni vill nå och vad annonsen ska leda till.
            </p>
          </article>
        </Reveal>
        <Reveal delay={80} className="h-full">
          <article
            aria-labelledby="instagram"
            className="mork-kort h-full p-8 text-elfenben sm:p-10"
          >
            <span className="grid size-12 place-items-center rounded-full border border-guld text-guld">
              <Heart className="size-6" aria-hidden="true" />
            </span>
            <h2 id="instagram" className="mt-6 text-3xl sm:text-4xl">
              Instagram-annonsering som väcker intresse och <Mark>skapar handling</Mark>
            </h2>
            <p className="mt-5 leading-relaxed text-white/80">
              Instagram är visuellt – bilder, Reels och Stories i helskärm. Annonserna syns som
              sponsrade inlägg i flödet och mellan Stories, och skapas i samma Ads Manager som på
              Facebook. Det passar verksamheter där utseendet säljer: produkter, mode, skönhet, mat
              och inredning.
            </p>
            <p className="mt-4 leading-relaxed text-white/80">
              Men när ni annonserar på Instagram är designen bara halva jobbet. Ett tydligt
              erbjudande, rätt kampanjmål och en sida att landa på avgör om intresset från era
              Instagram Ads blir en kund.
            </p>
          </article>
        </Reveal>
      </section>

      {/* Småföretag */}
      <section aria-labelledby="smaforetag" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">Småföretag</p>
              <h2 id="smaforetag" className="mt-4 text-4xl sm:text-5xl">
                Meta Ads för småföretag – annonsering utifrån <Mark>er budget</Mark>
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-lg leading-relaxed text-ink/80">
                Annonser är ett snabbt sätt att nå personer som inte känner till er än. Men med en
                mindre budget gäller det att veta vad pengarna ska ge.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-ink/80">
                Ni behöver inte köra många kampanjer samtidigt. Oftast är det bättre att börja med
                ett erbjudande, en tydlig målgrupp och en kampanj som går att följa upp, och bygga
                vidare på det som fungerar.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-ink/80">
                Vill ni testa själva först? Guiden{" "}
                <Link to="/guider/$slug" params={{ slug: "facebook-annonsering" }} className={LANK}>
                  Facebook-annonsering: så kommer du igång själv
                </Link>{" "}
                går igenom konto, mål, målgrupp och budget steg för steg.
              </p>
            </Reveal>
          </div>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {PRINCIPER.map((k, i) => (
              <li key={k.titel}>
                <Reveal delay={i * 60} className="h-full">
                  <KortVy k={k} />
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal delay={80} className="mt-10">
            <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "smaforetag")}>
              Diskutera er annonsbudget
            </BokaKnapp>
          </Reveal>
        </div>
      </section>

      {/* Leads och försäljning */}
      <section aria-labelledby="leads" className="container-page py-14 sm:py-20">
        <Reveal>
          <p className="eyebrow">Affärsmål</p>
          <h2 id="leads" className="mt-4 max-w-4xl text-4xl sm:text-5xl">
            Meta Ads för fler kundförfrågningar och <Mark>ökad försäljning</Mark>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
            Ett tjänsteföretag vill ha offertförfrågningar, en e-handel vill ha köp och en konsult
            vill ha bokade möten. Därför bygger vi annonsen och mätningen kring det som ska hända
            efter klicket, och utvärderar kampanjerna på det, inte på visningar. Behöver
            landningssidan byggas eller förbättras gör vi det som ett Webb-jobb.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {KUNDRESA.map((s, i) => (
              <li key={s.titel} className="skylt relative flex gap-4 p-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-full text-guld-mork border border-guld">
                  <s.ikon className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-bold text-ink">
                    {i + 1}. {s.titel}
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-muted-foreground">
                    {s.text}
                  </span>
                </span>
                {i < KUNDRESA.length - 1 && (
                  <ArrowRight
                    className="absolute top-1/2 -right-4 z-10 hidden size-5 -translate-y-1/2 rounded-full border border-guld bg-background p-0.5 text-guld-mork lg:block"
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>
        </Reveal>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="mr-2 text-sm font-bold text-ink">Vanliga mål:</span>
          {MAL.map((m) => (
            <span
              key={m}
              className="rounded-full border border-guld/60 bg-[#f3f0e7] px-4 py-1.5 text-sm font-bold text-ink"
            >
              {m}
            </span>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Annonser kan inte garantera ett visst antal förfrågningar eller köp – det beror också på
          erbjudandet, priset, konkurrensen och hemsidan.
        </p>
      </section>

      {/* Kreativt */}
      <section aria-labelledby="kreativt" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">Annonsmaterial</p>
              <h2 id="kreativt" className="mt-4 text-4xl sm:text-5xl">
                Annonser som kombinerar kreativitet och <Mark>strategi</Mark>
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-lg leading-relaxed text-ink/80">
                En annons har bara ett ögonblick på sig i flödet. Den ska stoppa tummen och snabbt
                säga varför erbjudandet är relevant, med en stark bild, en kort video eller en
                rubrik som träffar.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-ink/80">
                Vi gör flera varianter av varje annons, eftersom det sällan går att veta i förväg
                vilken som vinner. Utan Studio använder vi ert befintliga material; nytt material
                tas fram i Studio. Resultaten avgör vad som får fortsätta.{" "}
                <Link to={tjanstSokvag("marknadsforingsbilder")} className={LANK}>
                  Se bilder vi tagit fram
                </Link>
                .
              </p>
            </Reveal>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {FORMAT.map((k, i) => (
              <li key={k.titel}>
                <Reveal delay={i * 50} className="h-full">
                  <KortVy k={k} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mätning */}
      <section aria-labelledby="matning" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Mätning</p>
            <h2 id="matning" className="mt-4 text-4xl sm:text-5xl">
              Mät resultatet av er <Mark>Meta-annonsering</Mark>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              För att förbättra annonserna måste vi veta vad som händer efter klicket. Hur vi mäter
              beror på om vi har tillgång till er hemsida.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="mork-kort p-6 text-elfenben">
                <p className="font-bold">Med tillgång till hemsidan</p>
                <p className="mt-2 text-sm leading-relaxed text-white/85">
                  Meta-pixeln och vid behov Conversions API, tillsammans med en cookiebanner och
                  texten i integritetspolicyn. Pixeln laddas först efter ett ja.
                </p>
              </div>
              <div className="skylt p-6">
                <p className="font-bold text-ink">Utan tillgång till hemsidan</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Ingen banner behövs. Vi märker annonslänkarna med spårningslänkar och använder
                  formulärannonser där kunden svarar direkt i Facebook eller Instagram.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {NYCKELTAL.map((n, i) => (
            <li key={n.kort}>
              <Reveal delay={i * 50} className="h-full">
                <div className="skylt h-full p-6">
                  <p className="font-display text-3xl text-guld-mork">{n.kort}</p>
                  <h3 className="mt-2 font-sans text-base font-bold tracking-normal text-ink">
                    {n.namn}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{n.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Konverteringar och intäkter som Meta rapporterar är en uppskattning. Mätningen missar en
          del, och alla köp som kopplas till en annons hade inte uteblivit utan den.
        </p>
      </section>

      {/* Process */}
      <section
        id="process"
        aria-labelledby="process-rubrik"
        className="scroll-mt-28 bg-fade-tint py-14 sm:py-20"
      >
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Så går det till</p>
            <h2 id="process-rubrik" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
              Från första mötet till löpande annonsering&nbsp;– <Mark>så går det till</Mark>
            </h2>
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <Stegliste steg={STEG} rad />
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <BokaKnapp tjanst={TJANST} onClick={() => bokaKlick(SIDA, "process")}>
              Boka ett första möte
            </BokaKnapp>
          </Reveal>
        </div>
      </section>

      {/* Pris */}
      <section aria-labelledby="pris-rubrik" className="container-page py-14 sm:py-20">
        <Reveal>
          <p className="eyebrow">Pris</p>
          <h2 id="pris-rubrik" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
            Vad kostar Meta Ads och en <Mark>Meta Ads-byrå</Mark>?
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
            Det är två olika kostnader. Vårt arvode betalar ni till oss för arbetet. Annonsbudgeten
            betalar ni direkt till Meta för att annonserna ska visas – den bestämmer ni själva, och
            den ingår aldrig i våra priser.
          </p>
        </Reveal>

        <div id="pris" className="mt-12 grid scroll-mt-28 gap-4 lg:grid-cols-[1.4fr_0.6fr]">
          <Reveal className="h-full">
            <div className="inramad h-full p-8 text-elfenben sm:p-10">
              <p className="caps text-sun">1 · Vårt arvode</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="bg-white/8 p-5 ring-1 ring-guld/35">
                  <p className="text-sm text-white/75">Uppsättning, engång</p>
                  <p className="mt-2 font-display text-4xl">{kr(PRIS.annonsUppsattning)}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">
                    Konto, pixel, samtyckesbanner och första kampanjen. Hoppas över om det redan är
                    gjort.
                  </p>
                </div>
                {ANNONSER.nivaer.map((p) => (
                  <div key={p.id} className="bg-white/8 p-5 ring-1 ring-guld/35">
                    <p className="text-sm text-white/75">{p.namn}, löpande</p>
                    <p className="mt-2 font-display text-4xl">
                      {kr(p.belopp)}
                      <span className="text-xl text-white/70">/mån</span>
                    </p>
                    <ul className="mt-3 space-y-1.5 text-sm text-white/80">
                      {p.ingar.map((r) => (
                        <li key={r} className="flex gap-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-sun" aria-hidden="true" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-white/70">
                Arvodet styrs av antalet nya kampanjer, inte av hur mycket ni annonserar för. Högre
                budget, fler kampanjer eller katalogannonser: offert från{" "}
                {kr(PRIS.annonserSkraddarsytt)}/mån. {BINDNING_TEXT} {MOMS_TEXT}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <BokaKnapp variant="white" tjanst={TJANST} onClick={() => bokaKlick(SIDA, "pris")}>
                  Få prisförslag på Meta Ads
                </BokaKnapp>
                <Link to="/priser" className="btn-base btn-outline-white">
                  Allt som ingår
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={80} className="h-full">
            <div className="skylt flex h-full flex-col p-8 sm:p-10">
              <p className="caps text-guld-mork">2 · Er annonsbudget</p>
              <Wallet className="mt-6 size-10 text-guld-mork" aria-hidden="true" />
              <p className="mt-4 font-display text-3xl text-ink">Betalas direkt till Meta</p>
              <p className="mt-4 flex-1 leading-relaxed text-ink/80">
                Ni bestämmer beloppet och kan ändra eller pausa när som helst. Kontot och
                betalkortet är era – vi rör aldrig pengarna.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Vi föreslår en budget utifrån målet på genomgången. Planera för minst fyra veckor
                innan ni utvärderar.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Meta Ads eller SEO */}
      <section aria-labelledby="seo" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">Annonser eller SEO</p>
              <h2 id="seo" className="mt-4 text-4xl sm:text-5xl">
                Meta Ads eller SEO – vilken kanal passar <Mark>ert företag</Mark>?
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-lg leading-relaxed text-ink/80">
                Annonser når personer som ännu inte letar efter er. SEO når dem som redan söker.
                Vill ni ha resultat snabbt är annonser oftast rätt start, vill ni ha synlighet som
                håller i sig är det{" "}
                <Link to={SEO_BYRA.sokvag} className={LANK}>
                  SEO och sökmotoroptimering
                </Link>
                . Många använder båda – annonserna fyller på medan SEO växer.
              </p>
            </Reveal>
          </div>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {JAMFORELSE.map((j, i) => (
              <li key={j.titel}>
                <Reveal delay={i * 60} className="h-full">
                  <div className={`h-full p-8 ${j.stil}`}>
                    <h3 className="font-sans text-2xl font-bold tracking-normal">{j.titel}</h3>
                    <ul className="mt-5 space-y-2.5">
                      {j.rader.map((r) => (
                        <li key={r} className="flex gap-3">
                          <Check className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Landningssidan */}
      <section aria-labelledby="landning" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Efter klicket</p>
            <h2 id="landning" className="mt-4 text-4xl sm:text-5xl">
              Annonseringen fungerar bäst när landningssidan är <Mark>genomtänkt</Mark>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              En bra annons slösas bort på en långsam eller otydlig sida. Annonsen och sidan man
              landar på är samma kundresa, och ofta är det sidan, inte annonsen, som avgör om
              klicket blir en kund.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Eftersom vi även bygger hemsidor kan vi göra båda. Behöver ni en ny sajt finns allt om
              att beställa en{" "}
              <Link to={HEMSIDA_FORETAG.sokvag} className={LANK}>
                hemsida till företag
              </Link>{" "}
              och våra{" "}
              <Link to={HEMSIDA_PRIS.sokvag} className={LANK}>
                priser för företagshemsidor
              </Link>
              .
            </p>
          </Reveal>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LANDNINGSSIDA.map((k, i) => (
            <li key={k.titel}>
              <Reveal delay={i * 60} className="h-full">
                <KortVy k={k} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Branscher */}
      <section aria-labelledby="branscher" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Branscher</p>
            <h2 id="branscher" className="mt-4 max-w-3xl text-4xl sm:text-5xl">
              Meta-annonsering anpassad efter <Mark>er verksamhet</Mark>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
              Exempel på hur annonseringen kan se ut i olika branscher.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {BRANSCHER.map((b, i) => (
              <li key={b.titel}>
                <Reveal delay={i * 50} className="h-full">
                  <div className="skylt h-full p-6">
                    <h3 className="font-sans text-lg font-bold tracking-normal text-ink">
                      {b.titel}
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{b.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Varför TAB */}
      <section aria-labelledby="varfor" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Varför {FORETAG.kortnamn}</p>
            <h2 id="varfor" className="mt-4 text-4xl sm:text-5xl">
              Varför anlita {FORETAG.kortnamn} för er <Mark>Meta-annonsering</Mark>?
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-ink/80">
              När ni betalar för annonser ska ni veta vad pengarna går till och vad de ger. Vi
              förklarar strategin, visar resultaten varje månad och föreslår vad som ska ändras.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Vi tar fram annonsmaterialet själva, och eftersom vi även arbetar med hemsidor, SEO
              och{" "}
              <Link to={tjanstSokvag("geo")} className={LANK}>
                GEO-optimering
              </Link>{" "}
              kan vi se hela vägen från annons till kund, inte bara annonskontot.
            </p>
          </Reveal>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VARFOR.map((k, i) => (
            <li key={k.titel}>
              <Reveal delay={i * 60} className="h-full">
                <KortVy k={k} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Vanliga frågor */}
      <section aria-labelledby="fragor" className="bg-fade-tint py-14 sm:py-20">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow">Vanliga frågor</p>
            <h2 id="fragor" className="mt-4 text-3xl sm:text-4xl">
              Vanliga frågor om Meta Ads och annonsering på <Mark>Facebook och Instagram</Mark>
            </h2>
            <div className="mt-8">
              <VanligaFragor fragor={META_FRAGOR} />
            </div>
          </div>
        </div>
      </section>

      <div className="pt-14 sm:pt-20">
        <BokaPanel
          tjanst={TJANST}
          onBoka={() => bokaKlick(SIDA, "avslutning")}
          prislank={{ href: "#pris", text: "Få prisförslag på Meta Ads" }}
          rubrik={
            <>
              Redo att nå fler kunder med <Mark>Meta Ads</Mark>?
            </>
          }
          text="På den gratis genomgången går vi igenom erbjudandet, målen och eventuella annonser ni redan kör, och ni får ett förslag med upplägg och pris."
        />
      </div>
    </>
  );
}

/**
 * Två annonsformat i mobilramar – flödet och Reels. Bilderna är konceptbilder vi tagit fram,
 * annonsören är påhittad. Ingen kampanj, inga siffror.
 */
function Annonsmockup() {
  return (
    <figure>
      <div
        className="relative mx-auto flex max-w-md items-end justify-center gap-4"
        aria-hidden="true"
      >
        {/* Flödet */}
        <div className="kortskugga w-[55%] overflow-hidden rounded-[1.75rem] border-[3px] border-ink bg-white">
          <div className="flex items-center gap-2 px-3 py-2.5">
            <span className="size-6 rounded-full bg-brand" />
            <span className="text-[0.7rem] leading-tight">
              <span className="block font-bold text-ink">Ert företag</span>
              <span className="text-muted-foreground">Sponsrad</span>
            </span>
          </div>
          <img
            src="/projekt/serum.webp"
            alt=""
            width={768}
            height={1376}
            className="aspect-square w-full object-cover"
            loading="eager"
          />
          <div className="flex items-center justify-between gap-2 bg-tint px-3 py-2.5">
            <span className="text-[0.7rem] font-bold text-ink">Nytt serum – beställ i dag</span>
            <span className="rounded-md bg-ink px-2 py-1 text-[0.6rem] font-bold text-white">
              Köp nu
            </span>
          </div>
          <div className="flex gap-3 px-3 py-2 text-ink/60">
            <Heart className="size-4" />
            <MessageCircle className="size-4" />
            <Send className="size-4" />
          </div>
        </div>
        {/* Reels */}
        <div className="kortskugga relative w-[40%] overflow-hidden rounded-[1.75rem] border-[3px] border-ink bg-ink">
          <img
            src="/projekt/solglasogon.webp"
            alt=""
            width={900}
            height={1599}
            className="aspect-[9/16] w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-3 pt-10 text-white">
            <span className="text-[0.6rem] font-bold">Ert företag · Sponsrad</span>
            <span className="mt-1 block rounded-md bg-white px-2 py-1 text-center text-[0.6rem] font-bold text-ink">
              Läs mer
            </span>
          </div>
          <Eye className="absolute top-3 right-3 size-4 text-white/80" />
        </div>
        <span className="absolute -top-3 -left-2 flex items-center gap-1.5 rounded-full bg-sun px-3 py-1 text-xs font-bold text-ink shadow-[3px_3px_0_var(--ink)]">
          <ShoppingBag className="size-3.5" />
          Flöde + Reels
        </span>
      </div>
      <figcaption className="mt-4 text-center text-sm text-muted-foreground">
        Illustration av två annonsformat med konceptbilder vi tagit fram, inte en kampanj vi kört.
      </figcaption>
    </figure>
  );
}
