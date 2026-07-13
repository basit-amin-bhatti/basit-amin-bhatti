import { personalInfo } from "@/data/cv-data";
import { siteContent } from "@/data/siteContent";
import { ArrowRight, Check, Home, Linkedin, Mail } from "lucide-react";
import { type FormEvent, type ReactNode, useMemo, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { breadcrumbSchema, useSeoMetadata } from "./Seo";

type ContactFormState = {
  name: string;
  email: string;
  company: string;
  need: string;
  budget: string;
  timeline: string;
  message: string;
};

type FormErrors = Partial<Record<keyof ContactFormState, string>>;

const initialFormState: ContactFormState = {
  name: "",
  email: "",
  company: "",
  need: "",
  budget: "",
  timeline: "",
  message: "",
};

export function ContactPage() {
  useContactMetadata();

  return (
    <main>
      <section className="service-hero">
        <div className="container service-hero__inner">
          <a className="breadcrumb-link" href="/">
            <Home size={16} aria-hidden="true" />
            Home
          </a>
          <p className="eyebrow">{siteContent.contact.eyebrow}</p>
          <h1>{siteContent.contact.headline}</h1>
          <p className="hero-subheadline">{siteContent.contact.subheadline}</p>
          <div className="hero-actions">
            <a
              aria-label={siteContent.ctas.primary.label}
              className="btn btn--primary"
              data-cta="book-free-consultation"
              href="#contact-form"
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

      <ContactSection showIntro={false} />
    </main>
  );
}

export function ContactSection({ showIntro = true }: { showIntro?: boolean }) {
  return (
    <section className="section contact-section" id="contact">
      <div className="container contact-layout">
        <div className="contact-copy">
          {showIntro ? (
            <header className="section-header">
              <p className="eyebrow">{siteContent.contact.eyebrow}</p>
              <h2>{siteContent.contact.headline}</h2>
              <p>{siteContent.contact.subheadline}</p>
            </header>
          ) : null}

          <div className="trust-callout contact-reassurance">
            {siteContent.contact.reassurance}
          </div>

          <div className="next-step-list" aria-label="What happens next">
            <p className="eyebrow">What Happens Next</p>
            {siteContent.contact.nextSteps.map((step, index) => (
              <div className="next-step" key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>

          <AlternateContactLinks />
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState<ContactFormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [hasPreparedEmail, setHasPreparedEmail] = useState(false);

  const mailtoHref = useMemo(() => createMailtoHref(form), [form]);

  function updateField(name: keyof ContactFormState, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setHasPreparedEmail(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateContactForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setHasPreparedEmail(false);
      return;
    }

    // TODO: Replace this frontend-only flow with a secure API route or email
    // provider integration. Keep secrets in environment variables only.
    setHasPreparedEmail(true);
  }

  return (
    <form
      aria-describedby="contact-form-note"
      className="contact-form premium-card"
      id="contact-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="form-grid form-grid--two">
        <FormField error={errors.name} id="name" label="Name">
          <input
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={Boolean(errors.name)}
            autoComplete="name"
            id="name"
            name="name"
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Your name"
            type="text"
            value={form.name}
          />
        </FormField>

        <FormField error={errors.email} id="email" label="Email">
          <input
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
            id="email"
            name="email"
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="you@company.com"
            type="email"
            value={form.email}
          />
        </FormField>
      </div>

      <FormField
        error={errors.company}
        id="company"
        label="Company / Website URL"
      >
        <input
          aria-describedby={errors.company ? "company-error" : undefined}
          aria-invalid={Boolean(errors.company)}
          autoComplete="organization"
          id="company"
          name="company"
          onChange={(event) => updateField("company", event.target.value)}
          placeholder="Company name or website URL"
          type="text"
          value={form.company}
        />
      </FormField>

      <div className="form-grid form-grid--two">
        <FormField error={errors.need} id="need" label="What do you need?">
          <select
            aria-describedby={errors.need ? "need-error" : undefined}
            aria-invalid={Boolean(errors.need)}
            id="need"
            name="need"
            onChange={(event) => updateField("need", event.target.value)}
            value={form.need}
          >
            <option value="">Select one</option>
            {siteContent.contact.form.needs.map((need) => (
              <option key={need} value={need}>
                {need}
              </option>
            ))}
          </select>
        </FormField>

        <FormField error={errors.budget} id="budget" label="Budget range">
          <select
            aria-describedby={errors.budget ? "budget-error" : undefined}
            aria-invalid={Boolean(errors.budget)}
            id="budget"
            name="budget"
            onChange={(event) => updateField("budget", event.target.value)}
            value={form.budget}
          >
            <option value="">Select one</option>
            {siteContent.contact.form.budgets.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField error={errors.timeline} id="timeline" label="Timeline">
        <select
          aria-describedby={errors.timeline ? "timeline-error" : undefined}
          aria-invalid={Boolean(errors.timeline)}
          id="timeline"
          name="timeline"
          onChange={(event) => updateField("timeline", event.target.value)}
          value={form.timeline}
        >
          <option value="">Select one</option>
          {siteContent.contact.form.timelines.map((timeline) => (
            <option key={timeline} value={timeline}>
              {timeline}
            </option>
          ))}
        </select>
      </FormField>

      <FormField error={errors.message} id="message" label="Message">
        <textarea
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-invalid={Boolean(errors.message)}
          id="message"
          name="message"
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Tell me what you want to build, improve, or automate."
          rows={6}
          value={form.message}
        />
      </FormField>

      <button
        aria-label={siteContent.ctas.primary.label}
        className="btn btn--primary contact-submit"
        data-cta="book-free-consultation"
        type="submit"
      >
        {siteContent.ctas.primary.label}
        <ArrowRight size={18} aria-hidden="true" />
      </button>

      {hasPreparedEmail ? (
        <output className="form-success" id="contact-form-note">
          <Check size={18} aria-hidden="true" />
          <div>
            <strong>Your consultation request is ready.</strong>
            <p>
              This form is frontend-only for now. Open the email draft below to
              send the details directly.
            </p>
            <a
              className="text-link"
              data-cta="send-consultation-email"
              href={mailtoHref}
            >
              Open email draft
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </output>
      ) : (
        <p className="form-note" id="contact-form-note">
          No secrets are stored here. Form delivery can be connected later using
          a secure API route or email service environment variables.
        </p>
      )}
    </form>
  );
}

function FormField({
  children,
  error,
  id,
  label,
}: {
  children: ReactNode;
  error?: string;
  id: string;
  label: string;
}) {
  const errorId = `${id}-error`;

  return (
    <label className="form-field" htmlFor={id}>
      <span>{label}</span>
      {children}
      {error ? (
        <small aria-live="polite" className="form-error" id={errorId}>
          {error}
        </small>
      ) : null}
    </label>
  );
}

function AlternateContactLinks() {
  const contactLinks = [
    {
      label: "Email",
      href: `mailto:${personalInfo.email}`,
      icon: Mail,
      external: false,
      detail: personalInfo.email,
    },
    {
      label: "LinkedIn",
      href: personalInfo.linkedin,
      icon: Linkedin,
      external: true,
      detail: "View profile",
    },
    {
      label: "Chat on WhatsApp",
      href: personalInfo.whatsapp,
      icon: FaWhatsapp,
      external: true,
      detail: "+923214337294",
    },
  ];

  return (
    <div className="alternate-contact">
      <p className="eyebrow">Alternate Contact</p>
      <div className="alternate-contact__links">
        {contactLinks.map(({ detail, external, href, icon: Icon, label }) => (
          <a
            className="proof-card"
            data-cta={`alternate-${label.toLowerCase()}`}
            href={href}
            key={label}
            rel={external ? "noopener noreferrer" : undefined}
            target={external ? "_blank" : undefined}
          >
            <Icon size={20} aria-hidden="true" />
            <span>
              <strong>{label}</strong>
              <small>{detail}</small>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function validateContactForm(form: ContactFormState) {
  const errors: FormErrors = {};

  if (!form.name.trim()) {
    errors.name = "Please add your name.";
  }

  if (!form.email.trim()) {
    errors.email = "Please add your email.";
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = "Please add a valid email.";
  }

  if (!form.need) {
    errors.need = "Please choose what you need.";
  }

  if (!form.budget) {
    errors.budget = "Please choose a budget range.";
  }

  if (!form.timeline) {
    errors.timeline = "Please choose a timeline.";
  }

  if (!form.message.trim()) {
    errors.message = "Please share a short message.";
  }

  return errors;
}

function createMailtoHref(form: ContactFormState) {
  const subject = encodeURIComponent(
    "Free Website & Automation Consultation Request",
  );
  const body = encodeURIComponent(
    [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company / Website URL: ${form.company || "Not provided"}`,
      `Need: ${form.need}`,
      `Budget: ${form.budget}`,
      `Timeline: ${form.timeline}`,
      "",
      "Message:",
      form.message,
    ].join("\n"),
  );

  return `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
}

function useContactMetadata() {
  useSeoMetadata({
    title: "Contact Basit Amin Bhatti | Free Website & Automation Consultation",
    description:
      "Tell Basit what you want to build, improve, or automate. Request a free website and automation consultation for business websites, SaaS dashboards, AI solutions, Shopify CRO pages, and n8n workflows.",
    path: "/contact",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]),
    ],
  });
}
