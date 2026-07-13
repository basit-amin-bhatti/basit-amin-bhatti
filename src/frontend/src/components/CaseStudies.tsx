import {
  type CaseStudy,
  caseStudies,
  proofWithoutFakeNumbers,
  siteContent,
} from "@/data/siteContent";
import { ArrowRight, Check, Home } from "lucide-react";
import { absoluteUrl, breadcrumbSchema, useSeoMetadata } from "./Seo";

export function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <article className="premium-card case-study-card">
      <div className="case-study-card__top">
        <span className="status-pill">{caseStudy.statusLabel}</span>
        <span className="chip chip--strong">{caseStudy.category}</span>
      </div>
      <CodedMockup caseStudy={caseStudy} />
      <h3>{caseStudy.title}</h3>
      <p>{caseStudy.shortHeadline}</p>
      <CaseStudyDetail label="Problem" text={caseStudy.problem} />
      <CaseStudyDetail label="Solution" text={caseStudy.solution} />
      <CaseStudyDetail label="What this proves" text={caseStudy.proves} />
      <div className="chip-row">
        {caseStudy.tools.map((tool) => (
          <span className="chip" key={tool}>
            {tool}
          </span>
        ))}
      </div>
      <a className="text-link" href={caseStudy.path}>
        {caseStudy.cta}
        <ArrowRight size={16} aria-hidden="true" />
      </a>
    </article>
  );
}

export function CaseStudiesPage() {
  useCaseStudyMetadata(
    "Case Studies, Demo Concepts & Proof | Basit Amin Bhatti",
    "Honest demo concepts and internal builds showing AI website development, Shopify CRO, SaaS dashboard, AI solution, and automation thinking for clients.",
    "/case-studies",
    [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Case Studies", path: "/case-studies" },
      ]),
    ],
  );

  return (
    <main>
      <section className="service-hero">
        <div className="container service-hero__inner">
          <a className="breadcrumb-link" href="/">
            <Home size={16} aria-hidden="true" />
            Home
          </a>
          <p className="eyebrow">Case Studies</p>
          <h1>Reviewable proof without fake numbers or fake testimonials.</h1>
          <p className="hero-subheadline">
            Review honest demo concepts, internal builds, and the thinking
            behind conversion-focused websites, Shopify CRO, AI-assisted SaaS
            dashboards, AI solutions, and business automations.
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
              className="btn btn--secondary"
              data-cta="view-work"
              href="#case-study-grid"
            >
              {siteContent.ctas.secondary.label}
            </a>
          </div>
        </div>
      </section>

      <section className="section" id="case-study-grid">
        <div className="container">
          <header className="section-header">
            <p className="eyebrow">Portfolio Proof</p>
            <h2>Three examples of how I think, structure, and build.</h2>
            <p>
              These are labeled clearly as demo concepts or internal builds, so
              clients can evaluate the approach without invented client names,
              revenue numbers, or testimonials.
            </p>
          </header>
          <div className="case-study-grid">
            {caseStudies.map((caseStudy) => (
              <CaseStudyCard caseStudy={caseStudy} key={caseStudy.slug} />
            ))}
          </div>
        </div>
      </section>

      <ProofWithoutFakeNumbers />
      <CaseStudyCTA />
    </main>
  );
}

export function CaseStudyDetailPage({ caseStudy }: { caseStudy: CaseStudy }) {
  useCaseStudyMetadata(
    `${caseStudy.title} | Basit Amin Bhatti`,
    `${caseStudy.category} case-study concept: ${caseStudy.shortHeadline}`,
    caseStudy.path,
    [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Case Studies", path: "/case-studies" },
        { name: caseStudy.title, path: caseStudy.path },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: caseStudy.title,
        description: caseStudy.shortHeadline,
        url: absoluteUrl(caseStudy.path),
        about: caseStudy.category,
        creator: {
          "@type": "Person",
          name: siteContent.brand.name,
          jobTitle: siteContent.brand.primaryTitle,
        },
      },
    ],
  );

  return (
    <main>
      <section className="service-hero">
        <div className="container service-hero__inner">
          <a className="breadcrumb-link" href="/case-studies">
            <Home size={16} aria-hidden="true" />
            Case Studies
          </a>
          <p className="eyebrow">{caseStudy.category}</p>
          <h1>{caseStudy.title}</h1>
          <p className="hero-subheadline">{caseStudy.shortHeadline}</p>
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
              className="btn btn--secondary"
              data-cta="view-work"
              href="/case-studies"
            >
              {siteContent.ctas.secondary.label}
            </a>
          </div>
        </div>
      </section>

      <section className="section" id="case-study-overview">
        <div className="container case-study-detail-layout">
          <div className="case-study-detail-copy">
            <CaseStudyPanel title="Overview" text={caseStudy.overview} />
            <CaseStudyPanel title="Challenge" text={caseStudy.challenge} />
            <CaseStudyPanel title="Strategy" text={caseStudy.strategy} />
            <article className="service-detail-block service-detail-block--single">
              <header>
                <p className="eyebrow">Build Highlights</p>
                <h2>What the concept includes.</h2>
              </header>
              <ul className="service-list">
                {caseStudy.buildHighlights.map((highlight) => (
                  <li key={highlight}>
                    <Check size={17} aria-hidden="true" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <aside className="case-study-sidebar">
            <CodedMockup caseStudy={caseStudy} isLarge />
            <div className="premium-card">
              <p className="eyebrow">Tech Stack</p>
              <div className="chip-row">
                {caseStudy.tools.map((tool) => (
                  <span className="chip chip--strong" key={tool}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className="premium-card">
              <p className="eyebrow">Improve Next</p>
              <ul className="clean-list">
                {caseStudy.nextImprovements.map((item) => (
                  <li key={item}>
                    <Check size={16} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <ProofWithoutFakeNumbers />
      <CaseStudyCTA />
    </main>
  );
}

export function ProofWithoutFakeNumbers() {
  return (
    <section className="section section--muted" id="proof-without-fake-numbers">
      <div className="container">
        <header className="section-header">
          <p className="eyebrow">Proof Without Fake Numbers</p>
          <h2>Trust can be built through inspection, not exaggeration.</h2>
          <p>
            If public testimonials are limited, the proof system should make the
            work easy to inspect, discuss, and verify before engagement.
          </p>
        </header>
        <div className="proof-grid proof-grid--four">
          {proofWithoutFakeNumbers.map((item) => (
            <article className="proof-card" key={item}>
              <Check size={20} aria-hidden="true" />
              <div>
                <h3>{item}</h3>
                <p>
                  A practical trust-builder for clients who want to see clarity,
                  process, and execution before committing.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudyCTA() {
  return (
    <section className="final-cta" id="case-study-cta">
      <div className="container final-cta__inner">
        <p className="eyebrow">Start With Proof</p>
        <h2>
          Want a quick consultation or concept for your own website, SaaS idea,
          AI solution, or workflow?
        </h2>
        <p>
          Send the page, product, SaaS idea, AI solution, or workflow
          bottleneck. I can review the opportunity and suggest the fastest
          practical path to improve, launch, or automate it.
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
            href="/case-studies"
          >
            {siteContent.ctas.secondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}

function CaseStudyPanel({ title, text }: { title: string; text: string }) {
  return (
    <article className="service-detail-block service-detail-block--single">
      <header>
        <p className="eyebrow">{title}</p>
        <h2>{title}</h2>
      </header>
      <p>{text}</p>
    </article>
  );
}

function CaseStudyDetail({ label, text }: { label: string; text: string }) {
  return (
    <div className="project-detail">
      <strong>{label}</strong>
      <p>{text}</p>
    </div>
  );
}

function CodedMockup({
  caseStudy,
  isLarge = false,
}: {
  caseStudy: CaseStudy;
  isLarge?: boolean;
}) {
  return (
    <div
      aria-label={`${caseStudy.title} coded mockup`}
      className={`coded-mockup ${isLarge ? "coded-mockup--large" : ""}`}
      role="img"
    >
      <div className="coded-mockup__top">
        <span />
        <span />
        <span />
      </div>
      <div className="coded-mockup__body">
        <strong>{caseStudy.mockup.title}</strong>
        {caseStudy.mockup.rows.map((row, index) => (
          <div className="coded-mockup__row" key={row}>
            <span>{row}</span>
            <i style={{ width: `${86 - index * 12}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function useCaseStudyMetadata(
  title: string,
  description: string,
  path: string,
  jsonLd: Parameters<typeof useSeoMetadata>[0]["jsonLd"] = [],
) {
  useSeoMetadata({ title, description, path, jsonLd });
}
