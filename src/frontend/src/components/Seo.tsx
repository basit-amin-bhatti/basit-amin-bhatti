import { personalInfo } from "@/data/cv-data";
import {
  type ServicePageContent,
  caseStudies,
  servicePages,
  siteContent,
} from "@/data/siteContent";
import { useEffect } from "react";

export type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [key: string]: JsonLdValue };

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  robots?: string;
  jsonLd: JsonLdValue[];
};

const indexableRobots =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

export function usePageSeo(path: string) {
  useSeoMetadata(getPageSeo(path));
}

export function useSeoMetadata({
  description,
  jsonLd,
  path,
  robots = indexableRobots,
  title,
  type = "website",
}: PageSeo) {
  useEffect(() => {
    const url = absoluteUrl(path);
    const image = absoluteUrl(siteContent.seo.ogImage);

    document.title = title;
    setMetaTag("application-name", siteContent.brand.name);
    setMetaTag("author", siteContent.brand.name);
    setMetaTag("description", description);
    setMetaTag("robots", robots);
    setMetaTag("googlebot", robots);

    setMetaTag("og:type", type, "property");
    setMetaTag("og:site_name", siteContent.brand.name, "property");
    setMetaTag("og:title", title, "property");
    setMetaTag("og:description", description, "property");
    setMetaTag("og:url", url, "property");
    setMetaTag("og:image", image, "property");
    setMetaTag("og:image:secure_url", image, "property");
    setMetaTag("og:image:alt", siteContent.seo.ogImageAlt, "property");
    setMetaTag("og:image:width", "1200", "property");
    setMetaTag("og:image:height", "630", "property");
    setMetaTag("og:image:type", "image/png", "property");
    setMetaTag("og:locale", "en_US", "property");

    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:url", url);
    setMetaTag("twitter:image", image);
    setMetaTag("twitter:image:alt", siteContent.seo.ogImageAlt);

    setCanonical(url);
    setJsonLd(jsonLd);
  }, [description, jsonLd, path, robots, title, type]);
}

export function getPageSeo(rawPath: string): PageSeo {
  const path = normalizePath(rawPath);
  const servicePage = servicePages.find((page) => page.path === path);

  if (servicePage) {
    const title = servicePage.metaTitle;
    const description = servicePage.metaDescription;

    return {
      title,
      description,
      path,
      jsonLd: [
        ...identitySchemas(),
        webPageSchema(path, title, description),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: servicePage.title, path },
        ]),
        serviceSchema(servicePage),
        faqPageSchema(servicePage.faqs),
      ],
    };
  }

  if (path === "/case-studies") {
    const title = "Case Studies, Demo Concepts & Proof | Basit Amin Bhatti";
    const description =
      "Explore honest demo concepts and internal builds by Basit Amin Bhatti covering AI websites, Shopify CRO, SaaS dashboards, AI solutions, and automation workflows.";

    return {
      title,
      description,
      path,
      jsonLd: [
        ...identitySchemas(),
        collectionPageSchema(path, title, description),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Case Studies", path },
        ]),
      ],
    };
  }

  const caseStudy = caseStudies.find((item) => item.path === path);

  if (caseStudy) {
    const title = `${caseStudy.title} | Basit Amin Bhatti`;
    const description = `${caseStudy.category} demo concept by Basit Amin Bhatti: ${caseStudy.shortHeadline}`;

    return {
      title,
      description,
      path,
      type: "article",
      jsonLd: [
        ...identitySchemas(),
        webPageSchema(path, title, description, "CreativeWork"),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: caseStudy.title, path },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "@id": absoluteUrl(`${path}#creative-work`),
          name: caseStudy.title,
          headline: caseStudy.shortHeadline,
          description,
          url: absoluteUrl(path),
          about: caseStudy.category,
          genre: "Demo concept",
          isPartOf: { "@id": absoluteUrl("/#website") },
          creator: { "@id": absoluteUrl("/#person") },
        },
      ],
    };
  }

  if (path === "/contact") {
    const title =
      "Contact Basit Amin Bhatti | Website & Automation Consultation";
    const description =
      "Contact Basit Amin Bhatti to discuss an AI-powered website, web app, Shopify CRO project, AI agent, or n8n business automation workflow.";

    return {
      title,
      description,
      path,
      jsonLd: [
        ...identitySchemas(),
        webPageSchema(path, title, description, "ContactPage"),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path },
        ]),
      ],
    };
  }

  if (path !== "/") {
    const title = "Page Not Found | Basit Amin Bhatti";
    const description =
      "The requested page could not be found on the official website of Basit Amin Bhatti.";

    return {
      title,
      description,
      path,
      robots: "noindex, nofollow",
      jsonLd: [],
    };
  }

  const title = siteContent.seo.homepageTitle;
  const description = siteContent.seo.homepageDescription;

  return {
    title,
    description,
    path: "/",
    jsonLd: [
      ...identitySchemas(),
      profilePageSchema(),
      webPageSchema("/", title, description, "ProfilePage"),
      professionalServiceSchema(),
      faqPageSchema(siteContent.faqs),
    ],
  };
}

export function getBaseUrl() {
  return siteContent.seo.siteUrl;
}

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) {
    return path;
  }

  return new URL(
    path.startsWith("/") ? path : `/${path}`,
    getBaseUrl(),
  ).toString();
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl("/#person"),
    name: siteContent.brand.name,
    alternateName: ["Basit Bhatti", "Basit Amin"],
    givenName: "Basit Amin",
    familyName: "Bhatti",
    jobTitle: siteContent.brand.primaryTitle,
    description: siteContent.seo.description,
    url: absoluteUrl("/"),
    image: {
      "@type": "ImageObject",
      url: absoluteUrl("/assets/images/basit-amin-bhatti-ai-automation.webp"),
      caption: "Basit Amin Bhatti, AI Website and Automation Builder",
    },
    email: `mailto:${personalInfo.email}`,
    nationality: {
      "@type": "Country",
      name: "Pakistan",
    },
    homeLocation: {
      "@type": "Place",
      name: personalInfo.location,
      address: {
        "@type": "PostalAddress",
        addressRegion: "Punjab",
        addressCountry: "PK",
      },
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "AI Website & Automation Builder",
      occupationLocation: {
        "@type": "Country",
        name: "Pakistan",
      },
      skills: [
        "AI automation",
        "n8n workflow automation",
        "AI agent development",
        "Full-stack web development",
        "Shopify development and CRO",
      ],
    },
    knowsAbout: [
      "AI-powered websites",
      "AI agents",
      "AI automation",
      "Business automation",
      "Workflow automation",
      "n8n",
      "Full-stack development",
      "SaaS & AI Solutions",
      "Shopify development",
      "Shopify ecommerce CRO",
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "OpenAI APIs",
      "API integrations",
    ],
    sameAs: [personalInfo.linkedin].filter(Boolean),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: siteContent.brand.name,
    url: absoluteUrl("/"),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/favicon-logo.png"),
    },
    founder: { "@id": absoluteUrl("/#person") },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "client inquiries",
      email: personalInfo.email,
      availableLanguage: "English",
    },
    sameAs: [personalInfo.linkedin].filter(Boolean),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteContent.brand.name,
    alternateName: "Basit Amin Bhatti Portfolio",
    description: siteContent.seo.description,
    url: absoluteUrl("/"),
    inLanguage: "en",
    publisher: { "@id": absoluteUrl("/#person") },
  };
}

export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": absoluteUrl("/#profile-page"),
    name: `${siteContent.brand.name} | ${siteContent.brand.primaryTitle}`,
    description: siteContent.seo.description,
    url: absoluteUrl("/"),
    inLanguage: "en",
    isPartOf: { "@id": absoluteUrl("/#website") },
    mainEntity: { "@id": absoluteUrl("/#person") },
    about: { "@id": absoluteUrl("/#person") },
  };
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": absoluteUrl("/#professional-service"),
    name: `${siteContent.brand.name} - ${siteContent.brand.primaryTitle}`,
    description:
      "AI-powered website development, full-stack web apps, Shopify CRO, AI agents, and n8n automation workflows for businesses.",
    url: absoluteUrl("/"),
    email: personalInfo.email,
    areaServed: "Worldwide",
    serviceType: [
      "AI website development",
      "Full-stack web app development",
      "AI agent development",
      "Shopify development and CRO",
      "Business automation",
      "n8n workflow automation",
    ],
    provider: { "@id": absoluteUrl("/#person") },
  };
}

export function webPageSchema(
  path: string,
  name: string,
  description: string,
  additionalType = "WebPage",
) {
  return {
    "@context": "https://schema.org",
    "@type": ["WebPage", additionalType],
    "@id": absoluteUrl(`${path === "/" ? "/" : path}#webpage`),
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: "en",
    isPartOf: { "@id": absoluteUrl("/#website") },
    about: { "@id": absoluteUrl("/#person") },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(siteContent.seo.ogImage),
    },
  };
}

export function collectionPageSchema(
  path: string,
  name: string,
  description: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": ["WebPage", "CollectionPage"],
    "@id": absoluteUrl(`${path}#webpage`),
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: "en",
    isPartOf: { "@id": absoluteUrl("/#website") },
    about: { "@id": absoluteUrl("/#person") },
    hasPart: caseStudies.map((item) => ({
      "@type": "CreativeWork",
      "@id": absoluteUrl(`${item.path}#creative-work`),
      name: item.title,
      url: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(page: ServicePageContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`${page.path}#service`),
    name: page.title,
    description: page.metaDescription,
    url: absoluteUrl(page.path),
    areaServed: "Worldwide",
    serviceType: page.title,
    provider: { "@id": absoluteUrl("/#person") },
  };
}

export function faqPageSchema(
  faqs: ReadonlyArray<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: ReadonlyArray<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function identitySchemas() {
  return [personSchema(), organizationSchema(), websiteSchema()];
}

function normalizePath(pathname: string) {
  const withoutQuery = pathname.split(/[?#]/, 1)[0] || "/";
  if (withoutQuery.length > 1 && withoutQuery.endsWith("/")) {
    return withoutQuery.slice(0, -1);
  }
  return withoutQuery;
}

function setCanonical(href: string) {
  let canonical = document.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }

  canonical.href = href;
}

function setMetaTag(
  name: string,
  content: string,
  attr: "name" | "property" = "name",
) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }

  tag.content = content;
}

function setJsonLd(jsonLd: JsonLdValue[]) {
  const existingScripts = document.querySelectorAll<HTMLScriptElement>(
    'script[data-seo-json-ld="true"]',
  );

  for (const script of existingScripts) {
    script.remove();
  }

  for (const [index, schema] of jsonLd.entries()) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.seoJsonLd = "true";
    script.id = `seo-json-ld-${index + 1}`;
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }
}
