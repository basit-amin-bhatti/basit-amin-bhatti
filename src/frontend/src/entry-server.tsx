import { renderToString } from "react-dom/server";
import App from "./App";
import { getPageSeo } from "./components/Seo";
import { caseStudies, servicePages } from "./data/siteContent";

export const prerenderRoutes = [
  "/",
  ...servicePages.map((page) => page.path),
  "/case-studies",
  ...caseStudies.map((page) => page.path),
  "/contact",
];

export function render(path: string) {
  return renderToString(<App path={path} />);
}

export { getPageSeo };
