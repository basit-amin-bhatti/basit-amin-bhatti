import { siteContent } from "@/data/siteContent";
import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  Home,
  LoaderCircle,
  Map as MapIcon,
  SearchCheck,
  Workflow,
} from "lucide-react";
import { type FormEvent, type ReactNode, useState } from "react";
import { usePageSeo } from "./Seo";

type ContactFormState = {
  name: string;
  email: string;
  company: string;
  website: string;
  helpWith: string;
  message: string;
};

type FormErrors = Partial<Record<keyof ContactFormState, string>>;
type SubmissionStatus = "idle" | "submitting" | "success" | "error";

const initialFormState: ContactFormState = {
  name: "",
  email: "",
  company: "",
  website: "",
  helpWith: "",
  message: "",
};

const callAgenda = [
  {
    title: "Review your lead flow",
    description: "See how new roofing leads are currently handled.",
    icon: Workflow,
  },
  {
    title: "Find the biggest conversion gap",
    description: "Identify where leads are being lost.",
    icon: SearchCheck,
  },
  {
    title: "Get a next-step plan",
    description: "Leave with practical recommendations.",
    icon: MapIcon,
  },
] as const;

export function ContactPage() {
  useContactMetadata();

  return (
    <main id="main-content">
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
              aria-label={siteContent.contact.form.submitLabel}
              className="btn btn--primary"
              data-cta="book-free-roofing-growth-call"
              href={siteContent.ctas.primary.href}
            >
              {siteContent.contact.form.submitLabel}
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

      <ContactSection />
    </main>
  );
}

export function ContactSection() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container contact-layout">
        <div className="contact-strategy">
          <header className="contact-strategy__header">
            <p className="simple-eyebrow">Free Roofing Strategy Call</p>
            <h2>Book a free roofing strategy call.</h2>
            <p>
              Get a focused review of how your roofing company responds to new
              leads, follows up, and turns qualified opportunities into booked
              inspections.
            </p>
            <a
              className="btn btn--primary contact-strategy__cta"
              data-cta="book-free-roofing-growth-call"
              href={siteContent.ctas.primary.href}
            >
              Book a Free Roofing Strategy Call
              <ArrowRight aria-hidden="true" size={18} />
            </a>
          </header>

          <div
            aria-labelledby="call-agenda-title"
            className="contact-call-agenda"
          >
            <h3 className="simple-eyebrow" id="call-agenda-title">
              What happens on this call?
            </h3>
            <div className="contact-call-agenda__list">
              {callAgenda.map(({ description, icon: Icon, title }) => (
                <article className="contact-call-card" key={title}>
                  <span className="contact-call-card__icon" aria-hidden="true">
                    <Icon size={19} strokeWidth={1.8} />
                  </span>
                  <div>
                    <h4>{title}</h4>
                    <p>{description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState<ContactFormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");

  function updateField(name: keyof ContactFormState, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    if (submissionStatus !== "submitting") {
      setSubmissionStatus("idle");
      setSubmissionMessage("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;

    const nextErrors = validateContactForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmissionStatus("error");
      setSubmissionMessage(
        "Please review the highlighted fields and try again.",
      );
      requestAnimationFrame(() => {
        formElement
          .querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus();
      });
      return;
    }

    const formData = new FormData(formElement);
    setSubmissionStatus("submitting");
    setSubmissionMessage("");

    try {
      const response = await fetch("/api/contact", {
        body: JSON.stringify({
          ...form,
          companyFax: String(formData.get("companyFax") ?? ""),
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      const payload = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(
          payload?.message ??
            "Your message could not be sent. Please try again shortly.",
        );
      }

      setForm(initialFormState);
      setErrors({});
      setSubmissionStatus("success");
      setSubmissionMessage(
        "Thanks — your message has been sent. I’ll reply as soon as possible.",
      );
    } catch (error) {
      setSubmissionStatus("error");
      setSubmissionMessage(
        error instanceof Error
          ? error.message
          : "Your message could not be sent. Please try again shortly.",
      );
    }
  }

  return (
    <form
      aria-busy={submissionStatus === "submitting"}
      aria-describedby="contact-form-note"
      className="contact-form premium-card"
      id="contact-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <header className="contact-form__header">
        <h3>Send a message</h3>
        <p>
          Prefer email? Share a few details and I’ll reply at the address you
          provide.
        </p>
      </header>

      <div aria-hidden="true" className="form-honeypot">
        <label htmlFor="companyFax">Company fax</label>
        <input
          autoComplete="off"
          id="companyFax"
          name="companyFax"
          tabIndex={-1}
          type="text"
        />
      </div>

      <div className="form-grid form-grid--two">
        <FormField error={errors.name} id="name" label="Full Name">
          <input
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={Boolean(errors.name)}
            autoComplete="name"
            id="name"
            maxLength={100}
            name="name"
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Your full name"
            required
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
            maxLength={254}
            name="email"
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="you@company.com"
            required
            type="email"
            value={form.email}
          />
        </FormField>
      </div>

      <div className="form-grid form-grid--two">
        <FormField error={errors.company} id="company" label="Company Name">
          <input
            aria-describedby={errors.company ? "company-error" : undefined}
            aria-invalid={Boolean(errors.company)}
            autoComplete="organization"
            id="company"
            maxLength={150}
            name="company"
            onChange={(event) => updateField("company", event.target.value)}
            placeholder="Your roofing company"
            required
            type="text"
            value={form.company}
          />
        </FormField>

        <FormField
          error={errors.website}
          id="website"
          label="Website (optional)"
        >
          <input
            aria-describedby={errors.website ? "website-error" : undefined}
            aria-invalid={Boolean(errors.website)}
            autoComplete="url"
            id="website"
            inputMode="url"
            maxLength={300}
            name="website"
            onChange={(event) => updateField("website", event.target.value)}
            placeholder="https://yourcompany.com"
            type="url"
            value={form.website}
          />
        </FormField>
      </div>

      <FormField
        error={errors.helpWith}
        id="helpWith"
        label="What do you need help with?"
      >
        <select
          aria-describedby={errors.helpWith ? "helpWith-error" : undefined}
          aria-invalid={Boolean(errors.helpWith)}
          id="helpWith"
          name="helpWith"
          onChange={(event) => updateField("helpWith", event.target.value)}
          required
          value={form.helpWith}
        >
          <option value="">Select one</option>
          {siteContent.contact.form.leadProblems.map((problem) => (
            <option key={problem} value={problem}>
              {problem}
            </option>
          ))}
        </select>
      </FormField>

      <FormField error={errors.message} id="message" label="Message">
        <textarea
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-invalid={Boolean(errors.message)}
          id="message"
          maxLength={3000}
          name="message"
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Tell me about your current lead process and where you need help."
          required
          rows={5}
          value={form.message}
        />
      </FormField>

      <button
        aria-label="Send Message"
        className="btn btn--primary contact-submit"
        data-cta="send-message"
        disabled={submissionStatus === "submitting"}
        type="submit"
      >
        {submissionStatus === "submitting" ? (
          <>
            Sending
            <LoaderCircle
              aria-hidden="true"
              className="contact-submit__spinner"
              size={18}
            />
          </>
        ) : (
          <>
            Send Message
            <ArrowRight size={18} aria-hidden="true" />
          </>
        )}
      </button>

      {submissionStatus === "success" ? (
        <output
          aria-live="polite"
          className="form-status form-status--success"
          id="contact-form-note"
        >
          <CheckCircle2 size={19} aria-hidden="true" />
          <span>{submissionMessage}</span>
        </output>
      ) : submissionStatus === "error" ? (
        <div
          aria-live="assertive"
          className="form-status form-status--error"
          id="contact-form-note"
          role="alert"
        >
          <CircleAlert size={19} aria-hidden="true" />
          <span>{submissionMessage}</span>
        </div>
      ) : (
        <p className="form-note" id="contact-form-note">
          Your details are sent securely to hello@basitaminbhatti.me.
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

  if (!form.company.trim()) {
    errors.company = "Please add your company name.";
  }

  if (form.website.trim()) {
    try {
      const website = new URL(form.website);
      if (!["http:", "https:"].includes(website.protocol)) {
        errors.website = "Please add a valid website URL.";
      }
    } catch {
      errors.website = "Please add a full URL, including https://.";
    }
  }

  if (!form.helpWith) {
    errors.helpWith = "Please choose what you need help with.";
  }

  if (!form.message.trim()) {
    errors.message = "Please add a short message.";
  }

  return errors;
}

function useContactMetadata() {
  usePageSeo("/contact");
}
