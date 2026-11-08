import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

/**
 * CDN caching for rendered pages. Without this every page view (and every crawler hit) runs a full server render,
 * which uses up the Vercel team's shared Active CPU quota. Public GET pages that rendered fine are cached on
 * Vercel's CDN for 1 hour and then refreshed in the background (stale-while-revalidate), so repeat visits never
 * start a function. A new deploy starts with an empty cache, so content changes show up immediately.
 * Only Vercel's CDN reads `Vercel-CDN-Cache-Control`; browsers keep their normal behaviour.
 * Skipped for: non-GET, server functions/API, errors, responses that set cookies, and anything that already
 * declares its own caching.
 */
function withCdnCache(request: Request, response: Response): Response {
  if (request.method !== "GET" && request.method !== "HEAD") return response;
  if (response.status !== 200) return response;
  const path = new URL(request.url).pathname;
  if (path.startsWith("/_serverFn") || path.startsWith("/api/")) return response;
  if (request.headers.has("authorization")) return response;
  if (!(response.headers.get("content-type") ?? "").includes("text/html")) return response;
  if (response.headers.has("set-cookie")) return response;
  if (response.headers.has("vercel-cdn-cache-control") || response.headers.has("cdn-cache-control")) return response;
  if (/no-store|private/i.test(response.headers.get("cache-control") ?? "")) return response;
  const headers = new Headers(response.headers);
  headers.set("Vercel-CDN-Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return withCdnCache(request, await normalizeCatastrophicSsrResponse(response));
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
