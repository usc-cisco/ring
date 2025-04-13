import { SITE_CONFIG } from "@/config/site.config";
import { webring } from "@/data/webring";
import type { APIContext } from "astro";

export const prerender = true;

export function getStaticPaths() {
  return webring.map((entry, i) => {
    const prevIndex = (i - 1 + webring.length) % webring.length;
    const nextIndex = (i + 1) % webring.length;

    return {
      params: { name: entry.name },
      props: {
        prevEntry: webring[prevIndex],
        nextEntry: webring[nextIndex],
      },
    };
  });
}

export function GET({ props }: APIContext) {
  const { prevEntry, nextEntry } = props;

  const webringNavHtml = `
    <div class="webring-navigation" style="display: flex; align-items: center; justify-items: center; gap: 0.5rem;">
      <a style="color: black;" href="${prevEntry.url}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg></a>
      <a href="${SITE_CONFIG.baseUrl}"><img style="filter: invert(1); width: 16px; height: 16px; rotate: 25deg;" src="${SITE_CONFIG.baseUrl}/logo.svg"></img></a>
      <a style="color: black;" href="${nextEntry.url}"><svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg></a>
    </div>
  `;

  return new Response(webringNavHtml, {
    headers: { "Content-Type": "text/html" },
  });
}
