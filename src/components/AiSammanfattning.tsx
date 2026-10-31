import { useRouterState } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { absolut, FORETAG } from "@/lib/foretag";

/**
 * "Få en AI-sammanfattning av sidan": länkar som öppnar ChatGPT, Claude, Gemini och Copilot
 * med en färdig fråga om sidan besökaren står på. Allt sker i besökarens eget konto hos
 * respektive tjänst – vi skickar inget själva.
 *
 * Gemini på gemini.google.com tar inte emot en fråga i adressen, så Gemini-länken går till
 * Googles AI-läge (udm=50), som drivs av Gemini. Copilot nås via Bing.
 */
const TJANSTER: readonly { namn: string; url: (fraga: string) => string }[] = [
  { namn: "ChatGPT", url: (q) => `https://chatgpt.com/?q=${q}` },
  { namn: "Claude", url: (q) => `https://claude.ai/new?q=${q}` },
  { namn: "Gemini", url: (q) => `https://www.google.com/search?udm=50&q=${q}` },
  {
    namn: "Copilot",
    url: (q) => `https://www.bing.com/search?showconv=1&sendquery=1&q=${q}`,
  },
];

export function AiSammanfattning() {
  const sokvag = useRouterState({ select: (s) => s.location.pathname });
  const fraga = encodeURIComponent(
    `Sammanfatta de viktigaste punkterna på den här sidan från ${FORETAG.namn}: ${absolut(sokvag)}`,
  );
  return (
    <div className="mt-8">
      <p className="text-sm font-bold text-white/85">Få en AI-sammanfattning av sidan</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {TJANSTER.map((t) => (
          <li key={t.namn}>
            <a
              href={t.url(fraga)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Sammanfatta sidan med ${t.namn} (öppnas i en ny flik)`}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/25 px-4 text-sm text-white/85 transition-colors duration-200 hover:border-sun hover:text-white"
            >
              {t.namn}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
