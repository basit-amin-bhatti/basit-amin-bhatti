import { CaseStudyCard } from "@/components/CaseStudies";
import { caseStudies, siteContent } from "@/data/siteContent";
import {
  ArrowRight,
  Bot,
  Check,
  Code2,
  FileSearch,
  Gauge,
  Layers3,
  Rocket,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

const serviceIcons = [Code2, Layers3, Gauge, Workflow];
const packageIcons = [Rocket, Code2, Layers3, Workflow];
const proofIcons = [Code2, Sparkles, Workflow, FileSearch, ShieldCheck];

export function TrustBar() {
  return (
    <section className="trust-bar" aria-label="Who this is for">
      <div className="container trust-bar__inner">
        {siteContent.trustBar.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHeader
          eyebrow="Services"
          title="One connected build partner for websites, SaaS, AI solutions, ecommerce pages, and automations."
          description="Four focused ways to help businesses turn offers, product ideas, and repetitive workflows into launch-ready digital systems."
        />

        <div className="card-grid card-grid--services">
          {siteContent.services.map((service, index) => {
            const Icon = serviceIcons[index] ?? Code2;

            return (
              <article className="premium-card service-card" key={service.id}>
                <span className="card-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="card-icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="card-meta">
                  <strong>Ideal client</strong>
                  <span>{service.idealClient}</span>
                </div>
                <ul className="clean-list">
                  {service.deliverables.map((deliverable) => (
                    <li key={deliverable}>
                      <Check size={16} aria-hidden="true" />
                      <span>{deliverable}</span>
                    </li>
                  ))}
                </ul>
                <a className="text-link" href={service.href}>
                  {service.cta}
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function WhyAISection() {
  return (
    <section className="section section--muted" id="why-ai">
      <div className="container split-section">
        <div>
          <p className="eyebrow">Why AI-Assisted Development</p>
          <h2>{siteContent.aiDevelopment.title}</h2>
          <p className="section-copy">{siteContent.aiDevelopment.intro}</p>
          <p className="trust-callout">{siteContent.aiDevelopment.trustLine}</p>
          <a
            className="btn btn--secondary"
            data-cta="book-free-consultation"
            href={siteContent.ctas.primary.href}
          >
            {siteContent.ctas.primary.label}
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>

        <div className="ai-points-grid">
          {siteContent.aiDevelopment.points.map((point) => (
            <article className="proof-card" key={point.title}>
              <Bot size={22} aria-hidden="true" />
              <div>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedWorkSection() {
  return (
    <section className="section" id="work">
      <div className="container">
        <div className="section-header-with-link">
          <SectionHeader
            eyebrow="Featured Work"
            title="Proof you can inspect before you hire."
            description="No invented client names, revenue claims, or testimonials. These demo concepts show the strategy, structure, and execution style behind the work."
          />
          <a
            className="btn btn--secondary"
            data-cta="view-work"
            href="/case-studies"
          >
            View All Case Studies
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>

        <div className="case-study-grid">
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard caseStudy={caseStudy} key={caseStudy.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="section section--muted" id="process">
      <div className="container">
        <SectionHeader
          eyebrow="Process"
          title="A clear build path for clients who need momentum without chaos."
          description="Every project starts by clarifying the business goal, then moves through focused scope, AI-assisted build speed, and human-reviewed quality checks."
        />

        <div className="process-list">
          {siteContent.process.map((item) => (
            <article className="process-card" key={item.step}>
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TechStackSection() {
  return (
    <section className="section" id="stack">
      <div className="container split-section split-section--wide">
        <div>
          <p className="eyebrow">Tech Stack</p>
          <h2>Modern tools for websites, ecommerce, AI, and automation.</h2>
          <p className="section-copy">
            The stack stays practical: strong frontend foundations, Shopify CRO
            thinking, n8n workflow logic, APIs, and AI tools where they support
            the business outcome.
          </p>
        </div>

        <div className="tech-chip-grid" aria-label="Technology stack">
          {siteContent.techStack.map((tool) => (
            <span className="chip chip--strong tech-chip" key={tool}>
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PackagesSection() {
  return (
    <section className="section section--muted" id="pricing">
      <div className="container">
        <SectionHeader
          eyebrow="Pricing"
          title="Engagement models based on what needs to launch or improve"
          description="Each project starts with the free consultation, then a custom quote based on scope, timeline, content readiness, and integrations."
        />

        <div className="card-grid card-grid--packages">
          {siteContent.packages.map((item, index) => {
            const Icon = packageIcons[index] ?? Rocket;

            return (
              <article
                className={`premium-card package-card ${
                  item.title === "Website + Automation System"
                    ? "package-card--featured"
                    : ""
                }`}
                key={item.title}
              >
                <div className="card-icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <p className="package-card__best">For: {item.bestFor}</p>
                <h3>{item.title}</h3>
                <p className="price-note">{item.priceNote}</p>
                <ul className="clean-list">
                  {item.includes.map((included) => (
                    <li key={included}>
                      <Check size={16} aria-hidden="true" />
                      <span>{included}</span>
                    </li>
                  ))}
                </ul>
                <a className="text-link" href={item.href}>
                  {item.cta}
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ProofOfWorkSection() {
  return (
    <section className="section" id="proof">
      <div className="container">
        <SectionHeader
          eyebrow="Proof Of Work"
          title="Trust without pretending."
          description="When public testimonials are limited, the next best proof is reviewable work, clear thinking, demos, consultations, and walkthroughs."
        />

        <div className="proof-grid">
          {siteContent.proofOfWork.map((item, index) => {
            const Icon = proofIcons[index] ?? ShieldCheck;

            return (
              <article className="proof-card" key={item.title}>
                <Icon size={22} aria-hidden="true" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section className="section section--muted" id="faq">
      <div className="container">
        <SectionHeader
          eyebrow="FAQ"
          title="Straight answers before we talk."
          description="Clear scope, professional AI-assisted development, and practical expectations are part of the work."
        />

        <div className="faq-grid">
          {siteContent.faqs.map((faq) => (
            <article className="faq-card" key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTASection() {
  return (
    <section className="final-cta" id="contact">
      <div className="container final-cta__inner">
        <p className="eyebrow">Start With A Consultation</p>
        <h2>{siteContent.finalCta.headline}</h2>
        <p>{siteContent.finalCta.subheadline}</p>
        <div className="hero-actions">
          <a
            className="btn btn--primary"
            data-cta="book-free-consultation"
            href={siteContent.ctas.primary.href}
          >
            {siteContent.finalCta.cta}
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a
            className="btn btn--ghost"
            data-cta="view-work"
            href={siteContent.ctas.secondary.href}
          >
            {siteContent.ctas.secondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="section-header">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  );
}
