import logo from "@/../public/logo.svg";

export const SITE_CONFIG = Object.freeze({
  baseUrl:
    import.meta.env.MODE === "development"
      ? "http://localhost:4321"
      : "https://ring.dcism.org",
  title: "DCISM Webring",
  description:
    "A webring for DCISM students & alumni at the University of San Carlos.",
  logoTitle: "ring.dcism.org",
  logo,
  githubUrl: "https://github.com",
});
