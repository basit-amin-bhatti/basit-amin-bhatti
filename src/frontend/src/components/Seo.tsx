import { personalInfo } from "@/data/cv-data";
import { type ServicePageContent, siteContent } from "@/data/siteContent";
import { useEffect } from "react";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  jsonLd?: JsonLdValue[];
};

type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [key: string]: JsonLdValue };

export function useSeoMetadata({
  description,
  jsonLd = [],
  path,
  title,
  type = "website",
}: SeoInput) {
  useEffect(() => {
    const url = absoluteUrl(path);
    const image = absoluteUrl(siteContent.seo.ogImage);

    document.title = title;
    setMetaTag("description", description);
    setMetaTag("robots", "index, follow");

    setMetaTag("og:type", type, "property");
    setMetaTag("og:site_name", siteContent.brand.name, "property");
    setMetaTag("og:title", title, "property");
    setMetaTag("og:description", description, "property");
    setMetaTag("og:url", url, "property");
    setMetaTag("og:image", image, "property");
    setMetaTag("og:image:alt", siteContent.seo.ogTitle, "property");
    setMetaTag("og:locale", "en_US", "property");

    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:image", image);
    setMetaTag("twitter:image:alt", siteContent.seo.ogTitle);

    setCanonical(url);
    setJsonLd(jsonLd);
  }, [description, jsonLd, path, title, type]);
}

export function getBaseUrl() {
  if (typeof window === "undefined") {
    return siteContent.seo.siteUrl;
  }

  if (window.location.protocol === "file:") {
    return siteContent.seo.siteUrl;
  }

  return window.location.origin;
}

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) {
    return path;
  }

  return `${getBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteContent.brand.name,
    jobTitle: siteContent.brand.primaryTitle,
    description: siteContent.seo.description,
    url: absoluteUrl("/"),
    sameAs: [personalInfo.linkedin].filter(Boolean),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteContent.brand.name,
    description: siteContent.seo.description,
    url: absoluteUrl("/"),
  };
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${siteContent.brand.name} - ${siteContent.brand.primaryTitle}`,
    description:
      "AI website development, SaaS dashboard development, AI solution development, Shopify CRO, and AI automation workflows for businesses.",
    url: absoluteUrl("/"),
    areaServed: {
      "@type": "Place",
      name: "Global",
    },
    serviceType: [
      "AI website development",
      "SaaS dashboard development",
      "AI solution development",
      "Shopify CRO",
      "AI automation workflows",
      "n8n automation",
    ],
    provider: {
      "@type": "Person",
      name: siteContent.brand.name,
    },
  };
}

export function serviceSchema(page: ServicePageContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    description: page.metaDescription,
    url: absoluteUrl(page.path),
    areaServed: {
      "@type": "Place",
      name: "Global",
    },
    provider: {
      "@type": "Person",
      name: siteContent.brand.name,
      jobTitle: siteContent.brand.primaryTitle,
    },
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
