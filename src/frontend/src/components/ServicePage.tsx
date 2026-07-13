import {
  type ServicePageContent,
  servicePages,
  siteContent,
} from "@/data/siteContent";
import { ArrowRight, Check, Home } from "lucide-react";
import {
  breadcrumbSchema,
  faqPageSchema,
  serviceSchema,
  useSeoMetadata,
} from "./Seo";

export function ServicePage({ page }: { page: ServicePageContent }) {
  useSeoMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: page.path,
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: page.title, path: page.path },
      ]),
      serviceSchema(page),
      faqPageSchema(page.faqs),
    ],
  });

  const relatedServices = page.related
    .map((slug) => servicePages.find((service) => service.slug === slug))
    .filter((service): service is ServicePageContent => Boolean(service));

  return (
    <main>
      <section className="service-hero">
        <div className="container service-hero__inner">
          <a className="breadcrumb-link" href="/">
            <Home size={16} aria-hidden="true" />
            Home
          </a>
          <p className="eyebrow">Service Page</p>
          <h1>{page.title}</h1>
          <p className="hero-subheadline">{page.positioning}</p>
          <div className="hero-actions">
            <a
              aria-label={page.primaryCta}
              className="btn btn--primary"
              data-cta="book-free-consultation"
              href={siteContent.ctas.primary.href}
            >
              {page.primaryCta}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              aria-label={siteContent.ctas.secondary.label}
              className="btn btn--secondary"
              data-cta="view-work"
              href={siteContent.ctas.secondary.href}
            >
              {siteContent.ctas.secondary.label}
            </a>
          </div>
        </div>
      </section>

      <section className="section" id="service-details">
        <div className="container service-section-stack">
          {page.sections.map((section) => (
            <article className="service-detail-block" key={section.eyebrow}>
              <header>
                <p className="eyebrow">{section.eyebrow}</p>
                <h2>{section.title}</h2>
              </header>
              <ul className="service-list">
                {section.items.map((item) => (
                  <li key={item}>
                    <Check size={17} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--muted" id="service-faq">
        <div className="container">
          <header className="section-header">
            <p className="eyebrow">Service FAQ</p>
            <h2>Questions clients usually ask before starting.</h2>
            <p>
              Straight answers, realistic expectations, and no fake guarantees.
            </p>
          </header>
          <div className="faq-grid">
            {page.faqs.map((faq) => (
              <article className="faq-card" key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="related-services-title">
        <div className="container">
          <header className="section-header">
            <p className="eyebrow">Related Services</p>
            <h2 id="related-services-title">
              Explore the connected build paths.
            </h2>
            <p>
              Most projects combine a website, conversion strategy, SaaS or AI
              solution thinking, or automation workflow.
            </p>
          </header>
          <div className="related-service-grid">
            {relatedServices.map((service) => (
              <a
                className="premium-card related-service-card"
                href={service.path}
                key={service.slug}
              >
                <h3>{service.title}</h3>
                <p>{service.positioning}</p>
                <span className="text-link">
                  Read more
                  <ArrowRight size={16} aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta" id="service-cta">
        <div className="container final-cta__inner">
          <p className="eyebrow">Book The Consultation</p>
          <h2>Want to see the fastest useful path for this service?</h2>
          <p>
            Send the website, SaaS idea, AI solution, Shopify page, or workflow
            you want to improve. I will suggest the next practical step for your
            business.
          </p>
          <div className="hero-actions">
            <a
              aria-label={siteContent.ctas.primary.label}
              className="btn btn--primary"
              data-cta="book-free-consultation"
              href={siteContent.ctas.primary.href}
            >
              {siteContent.ctas.primary.label}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              aria-label={siteContent.ctas.secondary.label}
              className="btn btn--ghost"
              data-cta="view-work"
              href={siteContent.ctas.secondary.href}
            >
              {siteContent.ctas.secondary.label}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
