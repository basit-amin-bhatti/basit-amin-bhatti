import { personalInfo, services } from "@/data/cv-data";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Services() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="services"
      data-ocid="services.section"
      style={{
        borderBottom: "1px solid #1E2E1C",
        padding: "6rem 2rem",
        backgroundColor: "#050905",
      }}
    >
      <div ref={ref} style={{ maxWidth: "1200px", margin: "0 auto" }}>
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
          05 / Services
        </span>
        <h2
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "#E8F5E6",
            margin: "0 0 3rem",
          }}
        >
          Services
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1px",
            backgroundColor: "#1E2E1C",
            border: "1px solid #1E2E1C",
          }}
          className="services-grid"
        >
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

type Service = { number: string; title: string; description: string };

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.borderColor = "#7AFF6E";
    e.currentTarget.style.boxShadow = "inset 0 0 0 1px #7AFF6E";
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.borderColor = "transparent";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div
      data-ocid={`services.item.${index + 1}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: "#080C08",
        padding: "2.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        border: "1px solid transparent",
        transition: "border-color 0.2s, box-shadow 0.2s",
        cursor: "default",
      }}
    >
      <span
        style={{
          fontFamily: "DM Mono, monospace",
          fontSize: "0.75rem",
          letterSpacing: "0.14em",
          color: "#7AFF6E",
        }}
      >
        {service.number}
      </span>
      <h3
        style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 700,
          fontSize: "1.35rem",
          color: "#E8F5E6",
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        {service.title}
      </h3>
      <p
        style={{
          fontFamily: "DM Sans, sans-serif",
          fontSize: "0.95rem",
          lineHeight: 1.7,
          color: "#8A9E88",
          margin: 0,
          flex: 1,
        }}
      >
        {service.description}
      </p>
      <a
        href={personalInfo.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: "DM Mono, monospace",
          fontSize: "0.65rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#7AFF6E",
          textDecoration: "none",
          marginTop: "auto",
        }}
      >
        Get Started →
      </a>
    </div>
  );
}
