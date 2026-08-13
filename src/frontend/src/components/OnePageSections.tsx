import { siteContent } from "@/data/siteContent";
import {
  Bot,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Mail,
  MessageSquareText,
  PhoneIncoming,
  Sparkles,
  UserCheck,
} from "lucide-react";

const roofingServices = [
  {
    id: "ai-lead-response",
    title: "AI Lead Response",
    description:
      "Instantly responds to new roofing inquiries so hot leads don’t go cold.",
    supportingFeature: "Missed Call Text-Back",
  },
  {
    id: "ai-lead-qualification",
    title: "AI Lead Qualification",
    description:
      "Automatically qualifies roofing leads based on project type, urgency, location, and intent.",
    supportingFeature: "Project & Intent Scoring",
  },
  {
    id: "automated-follow-up",
    title: "Automated Follow-Up",
    description:
      "Consistently follows up with unresponsive leads through automated SMS and email sequences.",
    supportingFeature: "SMS & Email Sequences",
  },
  {
    id: "inspection-booking",
    title: "Inspection Booking",
    description:
      "Converts qualified leads into booked roof inspections directly on the sales calendar.",
    supportingFeature: "Roofing CRM Automation",
  },
] as const;

export function HomeServicesSection() {
  return (
    <section className="home-section" id="services">
      <div className="container">
        <SectionIntro
          eyebrow="Services"
          title="AI Growth Systems for Roofing Companies"
          description="Four connected automations designed to help your team respond faster, focus on qualified opportunities, and book more roof inspections."
        />

        <div className="simple-card-grid simple-card-grid--services">
          {roofingServices.map((service) => (
            <article
              aria-labelledby={`${service.id}-title`}
              className="simple-card roofing-service-card"
              id={service.id}
              key={service.id}
            >
              <RoofingServiceVisual serviceId={service.id} />
              <h3 id={`${service.id}-title`}>{service.title}</h3>
              <p>{service.description}</p>
              <div className="roofing-service-card__feature">
                <Check aria-hidden="true" size={15} strokeWidth={2.2} />
                <span>{service.supportingFeature}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RoofingServiceVisual({
  serviceId,
}: {
  serviceId: (typeof roofingServices)[number]["id"];
}) {
  if (serviceId === "ai-lead-response") {
    return (
      <div
        aria-hidden="true"
        className="roofing-service-visual roofing-service-visual--response"
      >
        <div className="roofing-service-visual__toolbar">
          <span />
          <span />
          <span />
        </div>
        <div className="roofing-response__lead">
          <PhoneIncoming size={17} />
          <div>
            <strong>New roof inquiry</strong>
            <span>Roof repair · Urgent</span>
          </div>
          <small>Now</small>
        </div>
        <div className="roofing-response__reply">
          <Sparkles size={14} />
          <span>Thanks for reaching out. Let’s arrange an inspection.</span>
        </div>
      </div>
    );
  }

  if (serviceId === "ai-lead-qualification") {
    return (
      <div
        aria-hidden="true"
        className="roofing-service-visual roofing-service-visual--qualification"
      >
        <div className="roofing-service-visual__toolbar">
          <span />
          <span />
          <span />
        </div>
        <div className="roofing-qualification__profile">
          <div className="roofing-qualification__avatar">
            <UserCheck size={18} />
          </div>
          <div>
            <strong>Qualified opportunity</strong>
            <span>Ready for sales follow-up</span>
          </div>
        </div>
        <div className="roofing-qualification__criteria">
          {["Project type", "Urgency", "Location", "Intent"].map(
            (criterion) => (
              <span key={criterion}>
                <CheckCircle2 size={12} />
                {criterion}
              </span>
            ),
          )}
        </div>
      </div>
    );
  }

  if (serviceId === "automated-follow-up") {
    return (
      <div
        aria-hidden="true"
        className="roofing-service-visual roofing-service-visual--follow-up"
      >
        <div className="roofing-service-visual__toolbar">
          <span />
          <span />
          <span />
        </div>
        <div className="roofing-follow-up__flow">
          <div className="roofing-follow-up__step is-active">
            <MessageSquareText size={16} />
            <span>SMS</span>
            <small>Instant</small>
          </div>
          <div className="roofing-follow-up__line" />
          <div className="roofing-follow-up__step">
            <Mail size={16} />
            <span>Email</span>
            <small>Day 1</small>
          </div>
          <div className="roofing-follow-up__line" />
          <div className="roofing-follow-up__step">
            <MessageSquareText size={16} />
            <span>SMS</span>
            <small>Day 3</small>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="roofing-service-visual roofing-service-visual--booking"
    >
      <div className="roofing-service-visual__toolbar">
        <span />
        <span />
        <span />
      </div>
      <div className="roofing-booking__layout">
        <div className="roofing-booking__calendar">
          <div>
            <CalendarDays size={15} />
            <strong>Available slots</strong>
          </div>
          <div className="roofing-booking__days">
            {["16", "17", "18", "19", "20"].map((day) => (
              <span className={day === "18" ? "is-selected" : ""} key={day}>
                {day}
              </span>
            ))}
          </div>
        </div>
        <div className="roofing-booking__confirmed">
          <CheckCircle2 size={18} />
          <strong>Inspection booked</strong>
          <span>
            <Clock3 size={12} /> 10:30 AM
          </span>
        </div>
      </div>
    </div>
  );
}

export function HomeProcessSection() {
  return (
    <section className="home-section" id="process">
      <div className="container">
        <SectionIntro
          eyebrow="Process"
          title="How I Work"
          description="A focused four-step process for turning roofing lead-flow gaps into a connected AI response, qualification, follow-up, and booking system."
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
