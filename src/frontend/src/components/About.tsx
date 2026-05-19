import { personalInfo } from "@/data/cv-data";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const valueProps = [
  "Conversion-focused: Every decision traced to revenue impact",
  "Automation-first: Systems that run without you",
  "API-native: Comfortable connecting any stack",
  "Results-driven: 50+ projects, zero ghosting clients",
];

export default function About() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="about"
      data-ocid="about.section"
      style={{
        borderBottom: "1px solid #1E2E1C",
        padding: "6rem 2rem",
      }}
    >
      <div
        ref={ref}
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "4rem",
          alignItems: "start",
        }}
        className="about-grid"
      >
        {/* Left */}
        <div>
          <span
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#7AFF6E",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            02 / About
          </span>
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: 1.1,
              color: "#E8F5E6",
              margin: 0,
            }}
          >
            About
            <br />
            Me
          </h2>
        </div>

        {/* Right */}
        <div>
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "1.1rem",
              lineHeight: 1.8,
              color: "#8A9E88",
              marginBottom: "2.5rem",
            }}
          >
            {personalInfo.bio} With a deep focus on Shopify CRO and intelligent
            automation workflows, I bring both technical depth and strategic
            thinking to every engagement.
          </p>

          {/* Value props */}
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 2.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {valueProps.map((v) => (
              <li
                key={v}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.95rem",
                  color: "#E8F5E6",
                  lineHeight: 1.6,
                }}
              >
                <span
                  style={{ color: "#7AFF6E", flexShrink: 0, lineHeight: "1.6" }}
                >
                  →
                </span>
                {v}
              </li>
            ))}
          </ul>

          {/* Contact info */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1px",
              border: "1px solid #1E2E1C",
            }}
            className="contact-info-grid"
          >
            <div
              style={{
                padding: "1rem 1.25rem",
                borderRight: "1px solid #1E2E1C",
              }}
            >
              <div
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#7AFF6E",
                  marginBottom: "4px",
                }}
              >
                Location
              </div>
              <div
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.85rem",
                  color: "#E8F5E6",
                }}
              >
                {personalInfo.location}
              </div>
            </div>
            <div
              style={{
                padding: "1rem 1.25rem",
                borderRight: "1px solid #1E2E1C",
              }}
            >
              <div
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#7AFF6E",
                  marginBottom: "4px",
                }}
              >
                Email
              </div>
              <a
                href={`mailto:${personalInfo.email}`}
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.85rem",
                  color: "#E8F5E6",
                  textDecoration: "none",
                }}
              >
                {personalInfo.email}
              </a>
            </div>
            <div style={{ padding: "1rem 1.25rem" }}>
              <div
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#7AFF6E",
                  marginBottom: "4px",
                }}
              >
                LinkedIn
              </div>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="about.linkedin_link"
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.85rem",
                  color: "#E8F5E6",
                  textDecoration: "none",
                }}
              >
                View Profile →
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .contact-info-grid { grid-template-columns: 1fr !important; }
          .contact-info-grid > div { border-right: none !important; border-bottom: 1px solid #1E2E1C; }
        }
      `}</style>
    </section>
  );
}
