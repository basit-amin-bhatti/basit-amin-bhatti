import { siteContent } from "@/data/siteContent";
import {
  ArrowRight,
  Bot,
  CalendarCheck2,
  CheckCircle2,
  MessageSquareText,
  UserCheck,
} from "lucide-react";

const demoSteps = [
  {
    label: "Lead arrives",
    message: "I need a roof inspection after recent storm damage.",
    icon: MessageSquareText,
  },
  {
    label: "AI responds",
    message: "Thanks for reaching out. I’ll ask a few quick questions.",
    icon: Bot,
  },
  {
    label: "Lead qualified",
    message: "Residential · Urgent · Inside service area",
    icon: UserCheck,
  },
  {
    label: "Inspection booked",
    message: "Tuesday · 10:30 AM · Added to the sales calendar",
    icon: CalendarCheck2,
  },
] as const;

const flowSteps = ["Respond", "Qualify", "Book"] as const;

export default function BavexaDemoSection() {
  return (
    <section
      aria-labelledby="bavexa-demo-title"
      className="home-section home-section--muted bavexa-demo"
      id="bavexa"
    >
      <div className="container bavexa-demo__layout">
        <div className="bavexa-demo__copy">
          <p className="simple-eyebrow">BAVEXA System</p>
          <h2 id="bavexa-demo-title">See BAVEXA in Action</h2>
          <p>
            BAVEXA helps roofing companies turn new inquiries into qualified
            opportunities and booked inspections through fast, consistent AI
            follow-up.
          </p>

          <ol className="bavexa-demo__flow" aria-label="BAVEXA three-step flow">
            {flowSteps.map((step, index) => (
              <li key={step}>
                <span>{index + 1}</span>
                <strong>{step}</strong>
                {index < flowSteps.length - 1 ? (
                  <ArrowRight aria-hidden="true" size={14} />
                ) : null}
              </li>
            ))}
          </ol>

          <a
            className="btn btn--primary bavexa-demo__cta"
            data-cta="book-free-roofing-growth-call"
            href={siteContent.ctas.primary.href}
          >
            {siteContent.ctas.primary.label}
            <ArrowRight aria-hidden="true" size={17} />
          </a>
        </div>

        <div
          aria-label="Illustrative BAVEXA lead-to-inspection conversation"
          className="bavexa-demo__preview"
          role="img"
        >
          <div className="bavexa-demo__toolbar">
            <div aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <small>Illustrative automation preview</small>
          </div>

          <div className="bavexa-demo__conversation">
            {demoSteps.map(({ icon: Icon, label, message }) => (
              <div className="bavexa-demo__message" key={label}>
                <div className="bavexa-demo__message-icon">
                  <Icon aria-hidden="true" size={16} />
                </div>
                <div>
                  <span>{label}</span>
                  <p>{message}</p>
                </div>
                <CheckCircle2
                  aria-hidden="true"
                  className="bavexa-demo__message-check"
                  size={15}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
