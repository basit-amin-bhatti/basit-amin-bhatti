import { personalInfo, stats } from "@/data/cv-data";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Hero() {
  const leftRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const rightRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section
      id="hero"
      data-ocid="hero.section"
      style={{
        minHeight: "100vh",
        paddingTop: "64px",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #1E2E1C",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "4rem 2rem",
          display: "grid",
          gridTemplateColumns: "1fr 420px",
          gap: "4rem",
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* Left column */}
        <div ref={leftRef}>
          {/* Availability badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              border: "1px solid #1E2E1C",
              padding: "6px 14px",
              marginBottom: "2.5rem",
            }}
          >
            <span
              className="avail-dot"
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#7AFF6E",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#7AFF6E",
              }}
            >
              Available for Projects
            </span>
          </div>

          {/* Name */}
          <h1
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(48px, 7vw, 88px)",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: "#E8F5E6",
              margin: "0 0 1.25rem",
            }}
          >
            {personalInfo.name}
          </h1>

          {/* Title */}
          <p
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#7AFF6E",
              margin: "0 0 1.75rem",
            }}
          >
            {personalInfo.title}
          </p>

          {/* Bio */}
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "1.05rem",
              lineHeight: 1.75,
              color: "#8A9E88",
              maxWidth: "520px",
              margin: "0 0 2.5rem",
            }}
          >
            {personalInfo.bio}
          </p>

          {/* Stats grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1px",
              border: "1px solid #1E2E1C",
              marginBottom: "2.5rem",
              maxWidth: "420px",
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  padding: "1.25rem 1.5rem",
                  borderRight: i % 2 === 0 ? "1px solid #1E2E1C" : "none",
                  borderBottom: i < 2 ? "1px solid #1E2E1C" : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 800,
                    fontSize: "2rem",
                    color: "#7AFF6E",
                    lineHeight: 1,
                    marginBottom: "4px",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#8A9E88",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href={personalInfo.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.start_project_button"
            style={{
              display: "inline-block",
              fontFamily: "DM Mono, monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              backgroundColor: "#7AFF6E",
              color: "#080C08",
              fontWeight: 700,
              padding: "14px 32px",
              textDecoration: "none",
              transition: "background-color 0.2s",
              borderRadius: 0,
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = "#5FD95A";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = "#7AFF6E";
            }}
          >
            Start a Project
          </a>
        </div>

        {/* Right column: Photo */}
        <div ref={rightRef}>
          <div
            data-ocid="hero.photo_placeholder"
            style={{
              width: "100%",
              aspectRatio: "3/4",
              border: "1px solid #1E2E1C",
              backgroundColor: "#0E1A0E",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Corner decorations */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "40px",
                height: "40px",
                borderRight: "1px solid #7AFF6E",
                borderBottom: "1px solid #7AFF6E",
                marginTop: "-1px",
                marginLeft: "-1px",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "40px",
                height: "40px",
                borderLeft: "1px solid #7AFF6E",
                borderTop: "1px solid #7AFF6E",
                marginBottom: "-1px",
                marginRight: "-1px",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
            <img
              src="/assets/images/profile.png"
              alt="Basit Amin Bhatti — Shopify CRO & AI Automation Specialist"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
