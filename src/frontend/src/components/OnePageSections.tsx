import { caseStudies, siteContent } from "@/data/siteContent";
import {
  ArrowUpRight,
  Bot,
  Check,
  Code2,
  Gauge,
  Layers3,
  Workflow,
} from "lucide-react";

const serviceIcons = [Code2, Layers3, Gauge, Workflow];

export function HomeServicesSection() {
  return (
    <section className="home-section" id="services">
      <div className="container">
        <SectionIntro
          eyebrow="Services"
          title="What I Can Build For You"
          description="Focused digital builds that make your offer clearer, your launch faster, and repetitive work easier to manage."
        />

        <div className="simple-card-grid simple-card-grid--services">
          {siteContent.services.map((service, index) => {
            const Icon = serviceIcons[index] ?? Code2;
            const serviceImageSmall = service.image.replace(
              /\.webp$/i,
              "-640.webp",
            );

            return (
              <article className="simple-card service-summary" key={service.id}>
                <div className="service-summary__visual">
                  <img
                    alt={service.imageAlt}
                    decoding="async"
                    height="1086"
                    loading="lazy"
                    sizes="(max-width: 800px) calc(100vw - 2.5rem), 50vw"
                    src={serviceImageSmall}
                    srcSet={`${serviceImageSmall} 640w, ${service.image} 1448w`}
                    width="1448"
                  />
                </div>
                <div className="simple-card__icon" aria-hidden="true">
                  <Icon size={21} strokeWidth={1.8} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="simple-list">
                  {service.deliverables.slice(0, 3).map((deliverable) => (
                    <li key={deliverable}>
                      <Check aria-hidden="true" size={15} />
                      <span>{deliverable}</span>
                    </li>
                  ))}
                </ul>
                <a className="simple-link" href="/#contact">
                  Discuss this
                  <ArrowUpRight aria-hidden="true" size={16} />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HomeWorkSection() {
  return (
    <section className="home-section home-section--muted" id="work">
      <div className="container">
        <SectionIntro
          eyebrow="Work"
          title="Selected Work & Demo Concepts"
          description="Honest examples of how I approach website clarity, ecommerce conversion, and focused SaaS or AI solution delivery. No invented results or client claims."
        />

        <div className="simple-card-grid simple-card-grid--work">
          {caseStudies.slice(0, 3).map((project) => (
            <article className="simple-card work-summary" key={project.slug}>
              <div className="work-summary__meta">
                <span>{project.category}</span>
                <strong>{project.statusLabel}</strong>
              </div>
              <h3>{project.title}</h3>
              <div className="work-summary__detail">
                <span>Problem</span>
                <p>{project.problem}</p>
              </div>
              <div className="work-summary__detail">
                <span>Solution</span>
                <p>{project.solution}</p>
              </div>
              <div
                className="simple-chips"
                aria-label={`${project.title} tools`}
              >
                {project.tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeProcessSection() {
  return (
    <section className="home-section" id="process">
      <div className="container">
        <SectionIntro
          eyebrow="Process"
          title="How I Work"
          description="A straightforward path from the first review to a launch-ready website, SaaS or AI solution, ecommerce improvement, or automation."
        />

        <ol className="simple-process">
          {siteContent.process.map((item) => (
            <li key={item.step}>
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function HomeTechStackSection() {
  return (
    <section className="home-section home-section--muted" id="tools">
      <div className="container tools-layout">
        <SectionIntro
          eyebrow="Tools"
          title="Tools I Work With"
          description="A practical stack selected around the product, workflow, and launch goal."
        />

        <div
          className="simple-chips simple-chips--tools"
          aria-label="Tools I work with"
        >
          {siteContent.techStack.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionIntro({
  description,
  eyebrow,
  title,
}: {
  description: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <header className="simple-section-intro">
      <p className="simple-eyebrow">
        <Bot aria-hidden="true" size={14} />
        {eyebrow}
      </p>
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  );
}
