import { type SkillCategory, skillCategories, skills } from "@/data/cv-data";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";

function SkillDots({ level }: { level: number }) {
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length static array, index is stable
          key={i}
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: i < level ? "#7AFF6E" : "#1E2E1C",
          }}
        />
      ))}
    </div>
  );
}

export default function Skills() {
  const ref = useScrollReveal<HTMLDivElement>();
  const [active, setActive] = useState<SkillCategory>("All");

  const filtered =
    active === "All" ? skills : skills.filter((s) => s.category === active);

  return (
    <section
      id="skills"
      data-ocid="skills.section"
      style={{
        borderBottom: "1px solid #1E2E1C",
        padding: "6rem 2rem",
        backgroundColor: "#050905",
      }}
    >
      <div ref={ref} style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
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
            03 / Skills
          </span>
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#E8F5E6",
              margin: "0 0 2rem",
            }}
          >
            Skills & Expertise
          </h2>

          {/* Filter tabs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {skillCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                data-ocid={`skills.filter.${cat.toLowerCase().replace(/[^a-z0-9]/g, "_")}_tab`}
                onClick={() => setActive(cat)}
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "6px 14px",
                  border: `1px solid ${active === cat ? "#7AFF6E" : "#1E2E1C"}`,
                  backgroundColor: active === cat ? "#7AFF6E" : "transparent",
                  color: active === cat ? "#080C08" : "#8A9E88",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  borderRadius: 0,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            backgroundColor: "#1E2E1C",
            border: "1px solid #1E2E1C",
          }}
          className="skills-grid"
        >
          {filtered.map((skill, i) => (
            <div
              key={skill.name}
              data-ocid={`skills.item.${i + 1}`}
              style={{
                backgroundColor: "#080C08",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "#E8F5E6",
                }}
              >
                {skill.name}
              </div>
              <div
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#7AFF6E",
                }}
              >
                {skill.category}
              </div>
              <SkillDots level={skill.level} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
