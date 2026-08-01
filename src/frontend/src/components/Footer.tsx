import { personalInfo } from "@/data/cv-data";
import { siteContent } from "@/data/siteContent";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="simple-footer">
      <div className="container simple-footer__grid">
        <div>
          <strong>{siteContent.brand.name}</strong>
          <span>{siteContent.brand.primaryTitle}</span>
          <p>{siteContent.brand.promise}</p>
        </div>

        <nav aria-label="Services">
          <strong>Services</strong>
          <a href="/services/ai-website-development">AI Website Development</a>
          <a href="/services/vibe-coded-mvp">SaaS & AI Solutions</a>
          <a href="/services/shopify-ecommerce-cro">Shopify CRO</a>
          <a href="/services/ai-automation">AI Automation & n8n</a>
        </nav>

        <div className="simple-footer__contact">
          <strong>Contact</strong>
          <a
            href={personalInfo.whatsapp}
            rel="noopener noreferrer"
            target="_blank"
          >
            WhatsApp: +923214337294
          </a>
          <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
          <a
            href={personalInfo.linkedin}
            rel="noopener noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="container simple-footer__bottom">
        <span>
          Copyright {year} {siteContent.brand.name}
        </span>
        <span>Built for clarity, speed, and business outcomes.</span>
      </div>
    </footer>
  );
}
