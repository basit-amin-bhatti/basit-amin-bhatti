import { siteContent } from "@/data/siteContent";
import { setupCalBooking } from "@/lib/calBooking";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => setupCalBooking(), []);

  useEffect(() => {
    const updateHeaderState = () => {
      setIsScrolled(window.scrollY > 24);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.classList.remove("mobile-menu-open");
      return;
    }

    document.body.classList.add("mobile-menu-open");

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("mobile-menu-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      {isOpen ? (
        <button
          aria-hidden="true"
          className="mobile-menu-backdrop"
          onClick={() => setIsOpen(false)}
          tabIndex={-1}
          type="button"
        />
      ) : null}

      <header
        className={`simple-header${isScrolled ? " simple-header--floating" : ""}`}
        data-scrolled={isScrolled ? "true" : "false"}
      >
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
            aria-label="Book a Call →"
            className="btn btn--primary simple-nav__cta"
            data-cta="book-free-roofing-growth-call"
            href={siteContent.ctas.primary.href}
          >
            Book a Call →
          </a>

          <button
            aria-controls="mobile-navigation"
            aria-expanded={isOpen}
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
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
                aria-label="Book a Call →"
                className="btn btn--primary"
                data-cta="book-free-roofing-growth-call"
                href={siteContent.ctas.primary.href}
              >
                Book a Call →
              </a>
            </div>
          </div>
        ) : null}
      </header>
    </>
  );
}
