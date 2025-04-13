export type WebringEntry = {
  name: string; // Full name
  year: number; // Graduation (or expected) year
  url: string; // Full website URL
};

export const webring: WebringEntry[] = [
  {
    name: "Ian DJ",
    year: 2026,
    url: "https://ian.dcism.org",
  },
  {
    name: "John Doe",
    year: 2026,
    url: "https://example.com",
  },
];
