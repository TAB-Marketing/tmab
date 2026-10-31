// Landningssidan /meta-ads-byra – annonser på Facebook och Instagram.
// Ersätter /tjanster/meta-annonser (som omdirigeras hit, se `tjanst` i landningssidor.ts) –
// en sida per sökavsikt. Facebook och Instagram täcks här, inte på egna sidor.
// Priser hämtas från priser.ts – skriv aldrig belopp här.
//
// TODO(TAB): finns en rekommenderad lägsta annonsbudget per månad? Visas inte förrän det är bestämt.
import { BINDNING_TEXT, kr, MOMS_TEXT, PRIS, type Fraga } from "@/lib/priser";

export const META_ADS_BYRA = {
  sokvag: "/meta-ads-byra",
  titel: "Meta Ads-byrå",
  etikett: "Tjänst · Annonser",
  seoTitel: "Meta Ads-byrå – annonser på Facebook & Instagram",
  seoBeskrivning: `Behöver ni hjälp med Meta Ads? TAB sköter strategi, annonser och optimering på Facebook och Instagram. Från ${kr(PRIS.annonser1)}/mån. Gratis genomgång.`,
  kortText:
    "Hur Meta Ads fungerar, vad vi gör, vad det kostar, och skillnaden mellan vårt arvode och er annonsbudget.",
  publicerad: "2026-10-20",
  uppdaterad: "2026-10-20",
} as const;

export const META_FRAGOR: readonly Fraga[] = [
  {
    fraga: "Vad är Meta Ads?",
    svar: "Metas annonssystem för Facebook, Instagram och Messenger. Där skapar och styr man betalda annonser – målgrupp, budget, format och vad annonsen ska leda till.",
  },
  {
    fraga: "Vad gör en Meta Ads-byrå?",
    svar: "Planerar annonseringen, sätter upp kontot och kampanjerna, tar fram annonsmaterialet, justerar löpande och rapporterar vad budgeten gav. Hos oss ingår pixel och samtyckesbanner i uppsättningen, när vi har tillgång till er hemsida.",
  },
  {
    fraga: "Vad kostar det att anlita er?",
    svar: `Uppsättningen kostar ${kr(PRIS.annonsUppsattning)} och första kampanjen ingår. Därefter Annonser 1 för ${kr(PRIS.annonser1)} per månad (1 ny kampanj, budget upp till 10\u00a0000\u00a0kr) eller Annonser 2 för ${kr(PRIS.annonser2)} per månad (upp till 3 nya kampanjer, budget upp till 25\u00a0000\u00a0kr). Arvodet styrs av antalet kampanjer, inte av hur mycket ni annonserar för. ${MOMS_TEXT}`,
  },
  {
    fraga: "Vad räknas som en kampanj?",
    svar: "Ett mål, en målgrupp, upp till 3 annonsvarianter och en löptid på upp till 4 veckor. En kampanj som löper längre räknas som en ny när den förnyas. Vi kontrollerar kampanjerna varje vecka, även när de sköter sig själva.",
  },
  {
    fraga: "Ingår annonsbudgeten?",
    svar: "Nej. Annonsbudgeten betalar ni direkt till Meta, från ert eget annonskonto. Vårt pris gäller arbetet med att sätta upp och sköta annonserna.",
  },
  {
    fraga: "Vad kostar det att annonsera på Facebook och Instagram?",
    svar: "Meta har ingen fast avgift. Annonsplatserna säljs i en auktion, och ni bestämmer själva dags- eller totalbudgeten och betalar den direkt till Meta. Vad en förfrågan eller ett köp kostar varierar med bransch, målgrupp och annonsernas kvalitet. Vårt arvode för uppsättning och hantering kommer utöver annonsbudgeten.",
  },
  {
    fraga: "Vad är sponsrade inlägg på Instagram?",
    svar: "Det är annonser: inlägg, Reels eller Stories som visas för personer som inte följer er och märks som sponsrade. De skapas i Metas Ads Manager, på samma sätt som Facebook-annonser, och kan gå på båda plattformarna i samma kampanj.",
  },
  {
    fraga: "Hur mycket bör vi lägga på annonser?",
    svar: "Det beror på målet, målgruppen och konkurrensen. Budgeten bestämmer ni, och vi går igenom en rimlig nivå på genomgången. Planera för att låta annonserna gå i minst fyra veckor – de behöver tid att hitta rätt personer, och vi behöver tid att testa vad som fungerar.",
  },
  {
    fraga: "Kan Meta Ads ge småföretag fler kunder?",
    svar: "Det kan nå personer som inte känner till er än och leda till förfrågningar eller köp. Hur många beror på erbjudandet, annonserna, budgeten och vad som händer efter klicket. Ingen kan garantera ett visst antal.",
  },
  {
    fraga: "Är Facebook eller Instagram bäst?",
    svar: "Det beror på målgruppen och vad ni säljer. Oftast låter vi samma kampanj gå på båda och ser i resultaten var den fungerar bäst, i stället för att gissa i förväg.",
  },
  {
    fraga: "Tar ni fram annonsbilder och videor?",
    svar: `Varje ny kampanj får upp till 3 varianter av era befintliga bilder eller videor, beskurna, med text och i rätt format. Nytt material köper ni till i Studio, från ${kr(PRIS.studioS)} per månad. Resultatet beror mycket på materialet, så det tar vi upp redan i genomgången.`,
  },
  {
    fraga: "Ingår cookiebanner?",
    svar: "Ja, när vi har tillgång till er hemsida eller bygger den åt er. Då lägger vi in Meta-pixeln tillsammans med en cookiebanner och texten i er integritetspolicy. Har vi inte tillgång till sajten behövs ingen banner: vi följer upp resultatet med spårningslänkar och Metas egen statistik.",
  },
  {
    fraga: "Vad är Meta-pixeln?",
    svar: "En kodsnutt på hemsidan som berättar för Meta vad besökare från annonserna gör, till exempel skickar ett formulär. Den sätter cookies och får därför bara laddas efter samtycke.",
  },
  {
    fraga: "Vad är Conversions API?",
    svar: "Ett sätt att skicka samma händelser till Meta från servern i stället för från webbläsaren. Det kompletterar pixeln när webbläsare blockerar den, men kräver samma rättsliga grund och samtycke.",
  },
  {
    fraga: "Varför behövs samtycke för Meta-pixeln?",
    svar: "Pixeln sätter cookies och skickar uppgifter om besöken till Meta. Enligt lagen om elektronisk kommunikation, med Post- och telestyrelsen (PTS) som tillsyn, får den bara laddas efter ett ja, och det ska vara lika lätt att neka som att godkänna. IMY har dessutom bötfällt svenska företag för hur de använt pixeln, bland annat Apoteket med 37 miljoner kronor 2024.",
  },
  {
    fraga: "Kan ni garantera att vi följer GDPR?",
    svar: "Nej, och det bör ingen byrå som inte är jurister lova. Vi ansvarar för det tekniska: att bannern fungerar, att pixeln väntar på samtycke och att policyn beskriver det som finns på sajten. Ni är personuppgiftsansvariga för er sajt, och vid juridiska frågor om just er verksamhet rekommenderar vi en jurist.",
  },
  {
    fraga: "Vad betyder ROAS?",
    svar: "Return on Ad Spend: intäkter som Meta kopplar till annonserna delat med vad annonserna kostade. Ett ROAS på 3 betyder 3 kronor i rapporterad försäljning per annonskrona – det är inte samma sak som vinst, och alla köp hade inte uteblivit utan annonsen.",
  },
  {
    fraga: "Hur snabbt ger Meta Ads resultat?",
    svar: "Annonserna syns direkt när de godkänts, och de första klicken kommer ofta samma dag. Att veta vad som faktiskt fungerar tar längre tid – räkna med några veckor innan det finns nog med data att dra slutsatser av.",
  },
  {
    fraga: "Kan ni förbättra annonser vi redan kör?",
    svar: "Ja. Vi går igenom kontot, kampanjstrukturen, målgrupperna, annonserna och mätningen och föreslår vad som bör ändras först.",
  },
  {
    fraga: "Vem äger annonskontot?",
    svar: "Ni. Annonskontot och Business Manager ligger i ert namn, och vi får åtkomst som partner. Slutar ni hos oss tar ni bort vår åtkomst och behåller allt – kampanjer, målgrupper och historik.",
  },
  {
    fraga: "Finns det bindningstid?",
    svar: `Uppsättningen är ett engångsjobb. För det löpande arbetet gäller: ${BINDNING_TEXT}`,
  },
  {
    fraga: "Hur kommer vi igång?",
    svar: "Boka en gratis genomgång på 20–25 minuter. Vi går igenom erbjudandet, målen och eventuella annonser ni redan kör, och ni får ett förslag efteråt.",
  },
];
