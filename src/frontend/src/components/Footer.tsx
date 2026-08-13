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
          <a href="/#ai-lead-response">AI Lead Response</a>
          <a href="/#ai-lead-qualification">AI Lead Qualification</a>
          <a href="/#automated-follow-up">Automated Follow-Up</a>
          <a href="/#inspection-booking">Inspection Booking</a>
          <a href="/#bavexa">BAVEXA</a>
        </nav>

        <div className="simple-footer__contact">
          <strong>Contact</strong>
          <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
          <a
            href={personalInfo.whatsapp}
            rel="noopener noreferrer"
            target="_blank"
          >
            WhatsApp: +923214337294
          </a>
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
