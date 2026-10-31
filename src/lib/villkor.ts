// Allmänna villkor för TAB Marketing. Sidan /villkor renderas härifrån.
// TODO(TAB): utkast – låt någon med juridisk kunskap läsa igenom innan ni hänvisar kunder hit.
import { FORETAG } from "@/lib/foretag";
import { BETALNING_TEXT, kr, MOMS_TEXT, PRIS } from "@/lib/priser";

export const VILLKOR_DATUM = "2026-10-31";

export const VILLKOR: readonly { rubrik: string; stycken: readonly string[] }[] = [
  {
    rubrik: "1. Parter och tillämpning",
    stycken: [
      `${FORETAG.namn} drivs av ${FORETAG.juridisktNamn}, org.nr ${FORETAG.orgnr} ("vi"). Villkoren gäller när ett företag ("kunden") köper våra tjänster.`,
      "Våra tjänster riktar sig till företag och andra näringsidkare. Det som står i en godkänd offert gäller före dessa villkor.",
    ],
  },
  {
    rubrik: "2. Avtal",
    stycken: [
      "Avtal ingås när kunden godkänner vår offert skriftligt. Ett svar via mejl räcker.",
      "En offert gäller i 30 dagar från att den skickades.",
    ],
  },
  {
    rubrik: "3. Priser och betalning",
    stycken: [
      `${MOMS_TEXT} ${BETALNING_TEXT} Vid försenad betalning debiteras dröjsmålsränta enligt räntelagen.`,
      "Vissa tjänster kräver ett engångsjobb innan det löpande arbetet börjar – annonsuppsättning före Annonser och grundoptimering före Synlighet. Det står i offerten och hoppas över om det redan är gjort.",
      "Vi arbetar med fasta priser: ett pris per nivå eller en offert med fast pris. Timmar debiteras bara för ändringar på en färdig hemsida, enligt klippkort eller drift (se punkt 6).",
      "Annonsbudget för Meta och andra kanaler betalar kunden direkt till respektive plattform med eget betalkort. Vi hanterar aldrig kundens annonspengar, och budgeten ingår aldrig i våra priser.",
    ],
  },
  {
    rubrik: "4. Månadstjänster och uppsägning",
    stycken: [
      `Månadstjänsterna – Studio, Annonser, Synlighet, drift av hemsida och Extern marknadsavdelning – har ingen bindningstid. Kunden kan säga upp när som helst, och tjänsten löper till slutet av den period som redan är betald. Uppsägning görs via mejl till ${FORETAG.epost}.`,
      "Påbörjad period återbetalas inte. Leveranser som ingår i en månad (till exempel bilder, kampanjer, sidor eller ändringstimmar) gäller för den månaden och sparas inte till nästa.",
      "Synlighet omfattar nya och förbättrade texter, rubriker, metadata, strukturerad data och interna länkar, samt lokal SEO: löpande skötsel av Google-företagsprofilen, kontroll och rättning av företagsuppgifter i kataloger som Eniro och Hitta, och en rutin för att be om och svara på omdömen. Själva uppsättningen eller övertagandet av företagsprofilen är ett engångsjobb. Ny design, nya funktioner, nya sidmallar och ändringar i layout räknas som hemsidearbete (Webb). Länkbygge och outreach ingår inte – kunden får tips om var företaget kan nämnas.",
      "En annonskampanj är ett mål, en målgrupp, upp till tre annonsvarianter och en löptid på upp till fyra veckor. En kampanj som löper längre räknas som en ny när den förnyas.",
    ],
  },
  {
    rubrik: "5. Leveranser och ändringar",
    stycken: [
      "Vi levererar det som står i den valda nivån eller offerten.",
      `Bilder och videor: kunden godkänner 2–3 testbilder innan resten produceras. Fel från vår sida, till exempel förvrängd etikett, fel färg eller felaktiga detaljer, gör vi alltid om utan kostnad. Vill kunden ändra riktning – ny bakgrund, miljö eller känsla – ingår en omtagsrunda, därefter ${kr(PRIS.omtagPerBild)} per bild.`,
      "För att produktens utseende ska kunna återges behöver kunden skicka egna produktfoton. Fotografering på plats, riktiga personer eller kändisar, logotypdesign och tryckoriginal i stora format ingår inte.",
      "För hemsidor ingår en ändringsrunda innan lansering, enligt den tidplan kunden godkänt.",
      "Arbete utanför det avtalade stämmer vi alltid av med kunden innan det börjar, med fast pris.",
    ],
  },
  {
    rubrik: "6. Hemsida efter lansering",
    stycken: [
      `Efter lansering väljer kunden överlämning eller drift. Vid överlämning får kunden kod, konton och inloggningar och uppdraget avslutas. Senare ändringar köps som klippkort (2 timmar ${kr(PRIS.klippkort2)}, 5 timmar ${kr(PRIS.klippkort5)}), giltiga i 12 månader från köpet.`,
      `Drift Essential omfattar hosting, SSL, övervakning, säkerhetsuppdateringar och backup. Drift Total omfattar dessutom domän och upp till en timmes ändringar per månad. En domän med vanlig ändelse, som .se, .nu eller .com, ingår. Kostar det domännamn kunden väljer mer betalar kunden mellanskillnaden, efter avstämning innan domänen köps. Avslutas Total förnyar kunden domänen själv. Timmar som inte används sparas inte. Ändringar därutöver debiteras med ${kr(PRIS.extraTimme)} per påbörjad timme, efter avstämning med kunden.`,
      "Hosting i drift kan ligga på vårt konto hos hostingleverantören. Domänen registreras alltid i kundens namn. Kunden har rätt att flytta sajten när som helst och får då koden och en timmes flytthjälp utan kostnad.",
    ],
  },
  {
    rubrik: "7. Avbetalning av hemsida",
    stycken: [
      `Tjänstesida och E-handel kan betalas med avbetalning i 12 månader (${kr(PRIS.tjanstesidaManad)} respektive ${kr(PRIS.ehandelManad)} per månad). Avbetalningen är bindande i 12 månader. Det är det enda vi erbjuder med bindningstid.`,
      "Drift ingår inte i avbetalningen utan väljs och betalas för sig enligt punkt 6.",
      "Avslutar kunden avtalet i förtid, eller betalar inte trots påminnelse, faktureras det som återstår av avbetalningen. Rätten till koden går över till kunden när hela beloppet är betalt. Domänen ligger alltid i kundens namn.",
    ],
  },
  {
    rubrik: "8. Kundens ansvar",
    stycken: [
      "Kunden ger oss det material, den åtkomst och de svar vi behöver i tid. Förseningar hos kunden flyttar tidplanen lika mycket.",
      "Kunden ansvarar för att material som kunden själv lämnar, till exempel logotyper, bilder och texter, får användas.",
    ],
  },
  {
    rubrik: "9. Rättigheter till materialet",
    stycken: [
      "Kunden äger konton, domän, texter och kod som vi tar fram åt kunden. Rätten går över till kunden när betalning skett.",
      "Bilder och videor tas fram helt eller delvis med AI-verktyg. För dem får kunden en fri kommersiell användningsrätt. Kunden ansvarar för att märka sådant innehåll där lag eller en plattforms regler kräver det.",
      "Musik och text i videor är licensierade för kommersiellt bruk.",
      "Vi får visa arbetet som referens, om vi inte avtalat något annat.",
    ],
  },
  {
    rubrik: "10. Konton och åtkomst",
    stycken: [
      "Konton för exempelvis Google, Meta och domän ska ligga i kundens namn. Vi får åtkomst som användare eller partner. Innan vi ändrar något på en befintlig sajt tar vi en säkerhetskopia.",
      "När samarbetet upphör lämnar vi tillbaka all åtkomst och överlämnar material vi tagit fram.",
    ],
  },
  {
    rubrik: "11. Resultat",
    stycken: [
      "Vi lovar att utföra arbetet fackmannamässigt och rapportera vad vi gjort. Placeringar i sökresultat, omnämnanden i AI-svar och annonsresultat styrs av andra och kan inte garanteras.",
    ],
  },
  {
    rubrik: "12. Ansvarsbegränsning",
    stycken: [
      "Vårt ansvar är begränsat till det belopp kunden betalat för den aktuella tjänsten de senaste tre månaderna. Vi ansvarar inte för indirekta skador, till exempel utebliven vinst.",
    ],
  },
  {
    rubrik: "13. Personuppgifter",
    stycken: [
      "Kunden är personuppgiftsansvarig för sin webbplats och för de uppgifter som samlas in där. När vi behandlar personuppgifter för kundens räkning, till exempel kundlistor eller formulär, tecknar vi ett personuppgiftsbiträdesavtal.",
      "När vi sätter upp cookiebanner, spårning eller integritetspolicy ansvarar vi för det tekniska utförandet: att verktygen väntar på samtycke och att policyn beskriver det vi installerat. Vi ger inte juridisk rådgivning. Kunden ansvarar för att behandlingen har stöd i lag och att texterna stämmer med verksamheten.",
      "Hur vi hanterar uppgifter som lämnas på vår egen webbplats står i integritetspolicyn.",
    ],
  },
  {
    rubrik: "14. Ändringar och tvist",
    stycken: [
      "Vi kan ändra villkoren. Ändringar meddelas kunden minst 30 dagar i förväg och gäller från nästa betalningsperiod.",
      "Svensk lag gäller. Tvister avgörs av svensk allmän domstol.",
    ],
  },
];
