import { personalInfo } from "@/data/cv-data";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Contact() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="contact"
      data-ocid="contact.section"
      style={{
        borderBottom: "1px solid #1E2E1C",
        padding: "8rem 2rem",
        backgroundColor: "#050905",
      }}
    >
      <div
        ref={ref}
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#7AFF6E",
            display: "block",
            marginBottom: "1.5rem",
          }}
        >
          07 / Contact
        </span>
        <h2
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            lineHeight: 1.05,
            color: "#E8F5E6",
            margin: "0 0 1.5rem",
          }}
        >
          Let's Work
          <br />
          <span style={{ color: "#7AFF6E" }}>Together</span>
        </h2>
        <p
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "1.05rem",
            lineHeight: 1.75,
            color: "#8A9E88",
            marginBottom: "3rem",
          }}
        >
          Ready to grow your eCommerce business or automate your workflows?
          Let's talk.
        </p>

        {/* Contact links */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
            marginBottom: "3rem",
          }}
        >
          <a
            href={`mailto:${personalInfo.email}`}
            data-ocid="contact.email_link"
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#8A9E88",
              textDecoration: "none",
              borderBottom: "1px solid #1E2E1C",
              paddingBottom: "4px",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.target as HTMLElement;
              el.style.color = "#E8F5E6";
              el.style.borderColor = "#7AFF6E";
            }}
            onMouseLeave={(e) => {
              const el = e.target as HTMLElement;
              el.style.color = "#8A9E88";
              el.style.borderColor = "#1E2E1C";
            }}
          >
            {personalInfo.email}
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="contact.linkedin_link"
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#8A9E88",
              textDecoration: "none",
              borderBottom: "1px solid #1E2E1C",
              paddingBottom: "4px",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.target as HTMLElement;
              el.style.color = "#E8F5E6";
              el.style.borderColor = "#7AFF6E";
            }}
            onMouseLeave={(e) => {
              const el = e.target as HTMLElement;
              el.style.color = "#8A9E88";
              el.style.borderColor = "#1E2E1C";
            }}
          >
            LinkedIn Profile
          </a>
          <a
            href={personalInfo.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="contact.whatsapp_link"
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#7AFF6E",
              textDecoration: "none",
              borderBottom: "1px solid #7AFF6E",
              paddingBottom: "4px",
            }}
          >
            WhatsApp
          </a>
        </div>

        {/* Primary CTA */}
        <a
          href={personalInfo.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="contact.whatsapp_primary_button"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            fontFamily: "DM Mono, monospace",
            fontSize: "0.75rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            backgroundColor: "#7AFF6E",
            color: "#080C08",
            fontWeight: 700,
            padding: "16px 36px",
            textDecoration: "none",
            transition: "background-color 0.2s",
            borderRadius: 0,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "#5FD95A";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "#7AFF6E";
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-label="WhatsApp"
            role="img"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Message Me on WhatsApp
        </a>
      </div>
    </section>
  );
}
