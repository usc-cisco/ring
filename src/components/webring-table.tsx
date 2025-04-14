import { SITE_CONFIG } from "@/config/site.config";
import { webring } from "@/data/webring";
import Fuse from "fuse.js";
import { useState } from "react";

const options = {
  keys: ["name", "year", "url"],
  threshold: 0.2,
};

export default function WebringTable() {
  const fuse = new Fuse(webring, options);
  const [query, setQuery] = useState("");
  const results = query
    ? fuse.search(query).map((result) => result.item)
    : webring;

  return (
    <>
      <div className="mt-6 mb-4 relative">
        <input
          type="text"
          placeholder="Search by name, year, or URL..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full ps-9 p-2 border border-border rounded-lg text-xs sm:text-sm font-mono"
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <svg
            className="size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <title>Search by name, year, or URL</title>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed">
          <thead className="ltr:text-left rtl:text-right font-logo lowercase text-xl">
            <tr className="*:font-medium">
              <th className="w-1/3 px-3 py-2 pb-4 pl-0 whitespace-nowrap">
                Name
              </th>
              <th className="w-1/6 px-3 py-2 pb-4 whitespace-nowrap">Year</th>
              <th className="w-1/12 sm:w-1/2 px-3 py-2 pb-4 whitespace-nowrap">
                URL
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border divide-dashed">
            {results.map((entry) => (
              <tr
                key={`webring-entry-${entry.url}`}
                className="*:first:font-medium text-sm"
              >
                <td className="px-3 py-2 pl-0 whitespace-nowrap">
                  {entry.name}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">{entry.year}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <a
                    rel="external"
                    href={`${entry.url}?utm_source=${SITE_CONFIG.baseUrl.replace("https://", "").replace("http://", "")}&utm_medium=referral`}
                    className="w-full group link inline-flex items-center gap-1"
                  >
                    <span className="sm:inline hidden">{entry.url}</span>
                    <svg
                      className="size-5 sm:size-4 text-foreground/30 group-hover:text-foreground transition-colors"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <title>Open URL in new tab</title>
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
                      <path d="M11 13l9 -9" />
                      <path d="M15 4h5v5" />
                    </svg>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
