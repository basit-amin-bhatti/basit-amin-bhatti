import { toolGroups } from "@/data/cv-data";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Tools() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="tools"
      data-ocid="tools.section"
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
          06 / Tools
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
          Tools & Technologies
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            backgroundColor: "#1E2E1C",
            border: "1px solid #1E2E1C",
          }}
          className="tools-grid"
        >
          {toolGroups.map((group, i) => (
            <div
              key={group.category}
              data-ocid={`tools.item.${i + 1}`}
              style={{
                backgroundColor: "#080C08",
                padding: "2rem",
              }}
            >
              <div
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#7AFF6E",
                  marginBottom: "1.25rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "1px solid #1E2E1C",
                }}
              >
                {group.category}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {group.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.08em",
                      border: "1px solid #1E2E1C",
                      padding: "5px 10px",
                      color: "#8A9E88",
                      borderRadius: 0,
                      transition: "border-color 0.2s, color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.target as HTMLElement;
                      el.style.borderColor = "#7AFF6E";
                      el.style.color = "#7AFF6E";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.target as HTMLElement;
                      el.style.borderColor = "#1E2E1C";
                      el.style.color = "#8A9E88";
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .tools-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
