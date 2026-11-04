import { useRouterState } from "@tanstack/react-router";
import { absolut, FORETAG } from "@/lib/foretag";

/**
 * "Få en AI-sammanfattning av sidan": länkar som öppnar ChatGPT, Claude, Gemini och Copilot
 * med en färdig fråga om sidan besökaren står på. Allt sker i besökarens eget konto hos
 * respektive tjänst – vi skickar inget själva.
 *
 * Gemini på gemini.google.com tar inte emot en fråga i adressen, så Gemini-länken går till
 * Googles AI-läge (udm=50), som drivs av Gemini. Copilot nås via Bing.
 */
const TJANSTER: readonly { namn: string; ikon: string; url: (fraga: string) => string }[] = [
  { namn: "Claude", ikon: "/ai/claude.png", url: (q) => `https://claude.ai/new?q=${q}` },
  { namn: "ChatGPT", ikon: "/ai/chatgpt.png", url: (q) => `https://chatgpt.com/?q=${q}` },
  {
    namn: "Gemini",
    ikon: "/ai/gemini.png",
    url: (q) => `https://www.google.com/search?udm=50&q=${q}`,
  },
  {
    namn: "Copilot",
    ikon: "/ai/copilot.png",
    url: (q) => `https://www.bing.com/search?showconv=1&sendquery=1&q=${q}`,
  },
];

export function AiSammanfattning() {
  const sokvag = useRouterState({ select: (s) => s.location.pathname });
  const fraga = encodeURIComponent(
    `Sammanfatta de viktigaste punkterna på den här sidan från ${FORETAG.namn}: ${absolut(sokvag)}`,
  );
  return (
    <div className="ai-sammanfattning mt-8">
      <p className="text-sm font-bold">Få en AI-sammanfattning av sidan</p>
      <ul className="mt-3 flex flex-wrap gap-3">
        {TJANSTER.map((t) => (
          <li key={t.namn}>
            <a
              href={t.url(fraga)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Sammanfatta sidan med ${t.namn} (öppnas i en ny flik)`}
              title={t.namn}
              className="grid size-11 place-items-center rounded-full opacity-70 transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100"
            >
              <img src={t.ikon} alt="" width={28} height={28} loading="lazy" className="size-7" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
