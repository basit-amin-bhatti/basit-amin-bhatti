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
    setMetaTag("application-name", siteContent.brand.name);
    setMetaTag("author", siteContent.brand.name);
    setMetaTag("description", description);
    setMetaTag("robots", "index, follow");

    setMetaTag("og:type", type, "property");
    setMetaTag("og:site_name", siteContent.brand.name, "property");
    setMetaTag("og:title", title, "property");
    setMetaTag("og:description", description, "property");
    setMetaTag("og:url", url, "property");
    setMetaTag("og:image", image, "property");
    setMetaTag("og:image:alt", siteContent.seo.ogImageAlt, "property");
    setMetaTag("og:image:width", "1200", "property");
    setMetaTag("og:image:height", "630", "property");
    setMetaTag("og:image:type", "image/svg+xml", "property");
    setMetaTag("og:locale", "en_US", "property");

    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:url", url);
    setMetaTag("twitter:image", image);
    setMetaTag("twitter:image:alt", siteContent.seo.ogImageAlt);

    setCanonical(url);
    setJsonLd(jsonLd);
  }, [description, jsonLd, path, title, type]);
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
    jobTitle: siteContent.brand.primaryTitle,
    description: siteContent.seo.description,
    url: absoluteUrl("/"),
    image: absoluteUrl("/assets/images/basit-amin-bhatti-ai-automation.webp"),
    knowsAbout: [
      "AI Website Development",
      "SaaS & AI Solutions",
      "Shopify Ecommerce CRO",
      "n8n Workflows",
      "Web Automation",
      "React",
      "Next.js",
      "Tailwind CSS",
      "OpenAI",
      "APIs",
    ],
    sameAs: [personalInfo.linkedin].filter(Boolean),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteContent.brand.name,
    description: siteContent.seo.description,
    url: absoluteUrl("/"),
    publisher: {
      "@id": absoluteUrl("/#person"),
    },
  };
}

export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": absoluteUrl("/#profile"),
    name: `${siteContent.brand.name} | ${siteContent.brand.primaryTitle}`,
    description: siteContent.seo.description,
    url: absoluteUrl("/"),
    mainEntity: {
      "@id": absoluteUrl("/#person"),
    },
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
      "@id": absoluteUrl("/#person"),
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
