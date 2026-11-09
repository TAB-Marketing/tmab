import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ProjektVideo as Video } from "@/lib/projekt";

/**
 * Ljudlös visningsfilm av sajter vi byggt.
 * - Laddas först när den närmar sig skärmen (preload="none" + IntersectionObserver),
 *   så den påverkar inte sidans laddtid.
 * - Fast bildformat (16:9) – sidan hoppar inte när stillbild eller film laddas. Stillbilden hämtas
 *   först när filmen är en bit från skärmen: annars laddas den direkt och tar bandbredd från
 *   första skärmen på mobil (videons poster följer inte loading="lazy").
 * - Pausas utanför skärmen. Den som valt minskad rörelse ser bara stillbilden.
 * - Paus-knapp, eftersom rörligt innehåll längre än fem sekunder ska gå att stoppa (WCAG 2.2.2).
 */
export function ProjektVideo({ video, className = "" }: { video: Video; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [laddad, setLaddad] = useState(false);
  const [spelar, setSpelar] = useState(false);
  const [pausadAvAnvandare, setPausadAvAnvandare] = useState(false);
  const [minskadRorelse, setMinskadRorelse] = useState(false);
  const [naraSkarm, setNaraSkarm] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setNaraSkarm(true);
        observer.disconnect();
      },
      { rootMargin: "1200px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMinskadRorelse(mq.matches);
    const andrad = () => setMinskadRorelse(mq.matches);
    mq.addEventListener("change", andrad);
    return () => mq.removeEventListener("change", andrad);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || minskadRorelse) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLaddad(true); // källorna läggs in → effekten nedan laddar och startar
          if (el.currentSrc && !pausadAvAnvandare) el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [minskadRorelse, pausadAvAnvandare]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !laddad) return;
    el.load();
    el.play().catch(() => {});
  }, [laddad]);

  const vaxla = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      setPausadAvAnvandare(false);
      el.play().catch(() => {});
    } else {
      setPausadAvAnvandare(true);
      el.pause();
    }
  };

  const bas = `/video/${video.fil}`;

  return (
    <figure className={className}>
      <div className="relative overflow-hidden rounded-[1.25rem] bg-background sm:rounded-[2rem]">
        <video
          ref={ref}
          className="block aspect-video w-full object-cover"
          width={1920}
          height={1080}
          {...(naraSkarm ? { poster: `${bas}.webp` } : {})}
          muted
          loop
          playsInline
          preload="none"
          aria-label={video.namn}
          onPlay={() => setSpelar(true)}
          onPause={() => setSpelar(false)}
        >
          {laddad && <source src={`${bas}.webm`} type="video/webm" />}
          {laddad && <source src={`${bas}.mp4`} type="video/mp4" />}
        </video>
        {!minskadRorelse && (
          <button
            type="button"
            onClick={vaxla}
            className="absolute right-2.5 bottom-2.5 grid size-9 place-items-center rounded-full bg-ink/60 text-white backdrop-blur transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:right-5 sm:bottom-5 sm:size-11"
            aria-label={spelar ? "Pausa filmen" : "Spela filmen"}
          >
            {spelar ? (
              <Pause className="size-4 sm:size-5" aria-hidden="true" />
            ) : (
              <Play className="size-4 sm:size-5" aria-hidden="true" />
            )}
          </button>
        )}
      </div>
      <figcaption className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
        {video.beskrivning}
      </figcaption>
    </figure>
  );
}
