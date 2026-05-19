import { experience } from "@/data/cv-data";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Experience() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="experience"
      data-ocid="experience.section"
      style={{
        borderBottom: "1px solid #1E2E1C",
        padding: "6rem 2rem",
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
          04 / Experience
        </span>
        <h2
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "#E8F5E6",
            margin: "0 0 3.5rem",
          }}
        >
          Experience
        </h2>

        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: "2px" }}>
          {/* Left accent line */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "2px",
              backgroundColor: "#1E2E1C",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {experience.map((exp, i) => (
              <div
                key={exp.role}
                data-ocid={`experience.item.${i + 1}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "180px 1fr",
                  gap: "3rem",
                  padding: "2.5rem 0 2.5rem 3rem",
                  borderBottom:
                    i < experience.length - 1 ? "1px solid #1E2E1C" : "none",
                  position: "relative",
                }}
                className="exp-row"
              >
                {/* Timeline dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-5px",
                    top: "2.75rem",
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#7AFF6E",
                  }}
                />

                {/* Period */}
                <div
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    color: "#7AFF6E",
                    paddingTop: "4px",
                    lineHeight: 1.4,
                  }}
                >
                  {exp.period}
                  <br />
                  <span
                    style={{
                      color: "#8A9E88",
                      marginTop: "4px",
                      display: "block",
                    }}
                  >
                    {exp.type}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 700,
                      fontSize: "1.15rem",
                      color: "#E8F5E6",
                      margin: "0 0 0.75rem",
                    }}
                  >
                    {exp.role}
                  </h3>
                  <p
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "0.95rem",
                      lineHeight: 1.75,
                      color: "#8A9E88",
                      margin: "0 0 1.25rem",
                    }}
                  >
                    {exp.description}
                  </p>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
                  >
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "DM Mono, monospace",
                          fontSize: "0.6rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          border: "1px solid #1E2E1C",
                          padding: "3px 10px",
                          color: "#8A9E88",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .exp-row { grid-template-columns: 1fr !important; gap: 1rem !important; padding-left: 2.5rem !important; }
        }
      `}</style>
    </section>
  );
}
