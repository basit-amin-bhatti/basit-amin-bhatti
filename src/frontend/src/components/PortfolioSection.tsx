import { useState } from "react";

type PortfolioItem = {
  category: string;
  imageHeight?: number;
  imageWidth?: number;
  name: string;
  src: string;
  whatIDid: string;
};

const portfolioItems: PortfolioItem[] = [
  {
    name: "BAVEXA Roofing Growth System",
    category: "AI Automation · Internal Product",
    whatIDid: "Lead conversion system design",
    src: "/service-images/ai-automation-n8n-workflows.webp",
    imageHeight: 1086,
    imageWidth: 1448,
  },
  {
    name: "AI Lead Operations Dashboard",
    category: "SaaS & AI · Internal Build",
    whatIDid: "Workflow UX & frontend architecture",
    src: "/service-images/saas-ai-solutions.webp",
    imageHeight: 1086,
    imageWidth: 1448,
  },
  {
    name: "Habibi Technology",
    category: "Technology Ecommerce",
    whatIDid: "Storefront design & build",
    src: "/Portfolio/habibi-technology.webp",
  },
  {
    name: "Solarlink",
    category: "Solar Services Website",
    whatIDid: "Website design & lead flow",
    src: "/Portfolio/solarlink.webp",
  },
  {
    name: "Fizmo",
    category: "Product Ecommerce",
    whatIDid: "Website design & build",
    src: "/Portfolio/fizmo.webp",
  },
  {
    name: "Juniper Kids",
    category: "Kids Ecommerce",
    whatIDid: "Storefront design & build",
    src: "/Portfolio/juniper-kids.webp",
  },
  {
    name: "Lumea Organics",
    category: "Beauty Ecommerce",
    whatIDid: "Storefront design & build",
    src: "/Portfolio/lumea-organics.webp",
  },
];

export function PortfolioSection() {
  return (
    <section className="home-section portfolio-section" id="work">
      <div className="container">
        <header className="simple-section-intro">
          <p className="simple-eyebrow">Portfolio</p>
          <h2>Digital systems, websites &amp; automation I’ve built.</h2>
          <p>
            A selection of past website, ecommerce, and automation work. Today,
            my focus is building AI growth systems for roofing companies.
          </p>
        </header>

        <div className="portfolio-carousel" aria-label="Portfolio projects">
          <PortfolioRow items={portfolioItems} />
        </div>
      </div>
    </section>
  );
}

function PortfolioRow({ items }: { items: PortfolioItem[] }) {
  const [isPressed, setIsPressed] = useState(false);
  const duplicatedItems = [...items, ...items];

  return (
    <div
      className={`portfolio-row${isPressed ? " is-pressing" : ""}`}
      onPointerCancel={() => setIsPressed(false)}
      onPointerDown={(event) => {
        if (event.pointerType !== "mouse" || event.button !== 0) {
          return;
        }

        event.currentTarget.setPointerCapture(event.pointerId);
        setIsPressed(true);
      }}
      onPointerUp={() => setIsPressed(false)}
      onLostPointerCapture={() => setIsPressed(false)}
    >
      <ul className="portfolio-track">
        {duplicatedItems.map((item, index) => {
          const isDuplicate = index >= items.length;
          const imageSmall = item.src.replace(/\.webp$/i, "-640.webp");
          const imageHeight = item.imageHeight ?? 720;
          const imageWidth = item.imageWidth ?? 1280;

          return (
            <li
              className="portfolio-card"
              key={`${item.src}-${index}`}
              aria-hidden={isDuplicate}
            >
              <div className="portfolio-card__content">
                <div className="portfolio-card__image">
                  <img
                    alt={`${item.name} project by Basit Amin Bhatti`}
                    decoding="async"
                    draggable={false}
                    height={imageHeight}
                    loading="lazy"
                    sizes="(max-width: 800px) 78vw, 29vw"
                    src={imageSmall}
                    srcSet={`${imageSmall} 640w, ${item.src} ${imageWidth}w`}
                    width={imageWidth}
                  />
                </div>
                <div className="portfolio-card__footer">
                  <h3>{item.name}</h3>
                  <p>
                    <span>{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>What I Did: {item.whatIDid}</span>
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
