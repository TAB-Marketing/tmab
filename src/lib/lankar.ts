// Länkar i löptext skrivs som i Markdown: [länktext](/sokvag) eller [länktext](https://…).
// MedLankar (components/MedLankar.tsx) gör dem till länkar på sidan. utanLankar() tar bort
// syntaxen där texten används utan HTML: strukturerad data, llms.txt och lästid.

export const LANK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export function utanLankar(text: string): string {
  return text.replace(LANK, "$1");
}
