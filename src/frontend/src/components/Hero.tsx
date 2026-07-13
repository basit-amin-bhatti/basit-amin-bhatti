import { siteContent } from "@/data/siteContent";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const portraitSrc = "/assets/images/basit-amin-bhatti-ai-automation.png";

export default function Hero() {
  return (
    <section className="home-hero" id="hero">
      <div className="container home-hero__grid">
        <div className="home-hero__copy">
          <p className="simple-eyebrow">AI Website & Automation Builder</p>
          <h1>{siteContent.hero.headline}</h1>
          <p className="home-hero__lead">{siteContent.hero.subheadline}</p>

          <div className="home-hero__actions">
            <a
              aria-label={siteContent.hero.primaryCta.label}
              className="btn btn--primary"
              data-cta="book-free-consultation"
              href={siteContent.hero.primaryCta.href}
            >
              {siteContent.hero.primaryCta.label}
              <ArrowRight aria-hidden="true" size={18} />
            </a>
            <a
              className="btn btn--secondary"
              data-cta="view-services"
              href={siteContent.hero.secondaryCta.href}
            >
              {siteContent.hero.secondaryCta.label}
            </a>
          </div>

          <p className="home-hero__trust">
            <CheckCircle2 aria-hidden="true" size={17} />
            {siteContent.hero.trustMicrocopy}
          </p>
        </div>

        <div className="home-hero__portrait">
          <img
            alt="Basit Amin Bhatti, AI Website and Automation Builder"
            decoding="async"
            fetchPriority="high"
            height="800"
            src={portraitSrc}
            width="800"
          />
          <div className="home-hero__portrait-label">
            <strong>Basit Amin Bhatti</strong>
            <span>Websites / SaaS / CRO / Automation</span>
          </div>
        </div>
      </div>
    </section>
  );
}
