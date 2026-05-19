import { navLinks, personalInfo } from "@/data/cv-data";

export default function Navbar() {
  return (
    <nav
      data-ocid="navbar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "#080C08",
        borderBottom: "1px solid #1E2E1C",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2rem",
        height: "64px",
      }}
    >
      {/* Left: Name + subtitle */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <span
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: "1rem",
            color: "#E8F5E6",
            letterSpacing: "0.02em",
            lineHeight: 1.1,
          }}
        >
          {personalInfo.name}
        </span>
        <span
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "0.6rem",
            color: "#7AFF6E",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          CRO & AI Automation
        </span>
      </div>

      {/* Center: Nav links (hidden on mobile) */}
      <div className="nav-links" style={{ display: "flex", gap: "2rem" }}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            data-ocid={`navbar.${link.label.toLowerCase()}_link`}
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#8A9E88",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = "#7AFF6E";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = "#8A9E88";
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Right: WhatsApp CTA */}
      <a
        href={personalInfo.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="navbar.whatsapp_button"
        style={{
          fontFamily: "DM Mono, monospace",
          fontSize: "0.65rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          backgroundColor: "#7AFF6E",
          color: "#080C08",
          fontWeight: 700,
          padding: "8px 16px",
          textDecoration: "none",
          borderRadius: 0,
          border: "none",
          display: "inline-block",
          transition: "background-color 0.2s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.backgroundColor = "#5FD95A";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.backgroundColor = "#7AFF6E";
        }}
      >
        Hire Me
      </a>

      <style>{`
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
