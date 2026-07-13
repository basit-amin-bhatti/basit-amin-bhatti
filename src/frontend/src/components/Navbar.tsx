import { siteContent } from "@/data/siteContent";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="simple-header">
      <nav className="container simple-nav" aria-label="Primary navigation">
        <a
          className="simple-brand"
          href="/"
          aria-label="Basit Amin Bhatti home"
        >
          <strong>{siteContent.brand.name}</strong>
          <span>{siteContent.brand.primaryTitle}</span>
        </a>

        <div className="simple-nav__links" aria-label="Homepage sections">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </div>

        <a
          aria-label="Book a Free Consultation"
          className="btn btn--primary simple-nav__cta"
          data-cta="book-free-consultation"
          href="/#contact"
        >
          Book Free Consultation
        </a>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="simple-nav__menu"
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          {isOpen ? (
            <X aria-hidden="true" size={21} />
          ) : (
            <Menu aria-hidden="true" size={21} />
          )}
        </button>
      </nav>

      {isOpen ? (
        <div className="simple-mobile-menu" id="mobile-navigation">
          <div className="container">
            {navItems.map((item) => (
              <a
                href={item.href}
                key={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              className="btn btn--primary"
              data-cta="book-free-consultation"
              href="/#contact"
            >
              Book Free Consultation
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
