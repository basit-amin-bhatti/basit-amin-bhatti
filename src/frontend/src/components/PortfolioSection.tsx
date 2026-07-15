type PortfolioItem = {
  name: string;
  src: string;
};

const portfolioItems: PortfolioItem[] = [
  { name: "Fizmo", src: "/Portfolio/fizmo.webp" },
  { name: "Habibi Technology", src: "/Portfolio/habibi-technology.webp" },
  { name: "Juniper Kids", src: "/Portfolio/juniper-kids.webp" },
  { name: "Lumea Organics", src: "/Portfolio/lumea-organics.webp" },
  { name: "Moda Jewels", src: "/Portfolio/moda-jewels.webp" },
  { name: "Runnics Sports", src: "/Portfolio/runnics-sports.webp" },
  { name: "Skstones", src: "/Portfolio/skstones.webp" },
  { name: "Solarlink", src: "/Portfolio/solarlink.webp" },
  { name: "The Shoppies", src: "/Portfolio/the-shoppies.webp" },
  { name: "Versus Sports", src: "/Portfolio/versus-sports.webp" },
];

const portfolioRows = [portfolioItems.slice(0, 5), portfolioItems.slice(5)];

export function PortfolioSection() {
  return (
    <section className="home-section portfolio-section" id="portfolio">
      <div className="container">
        <header className="simple-section-intro">
          <p className="simple-eyebrow">Portfolio</p>
          <h2>Selected builds across websites, Shopify, and automation.</h2>
          <p>
            A quick look at selected website, Shopify, and automation projects.
          </p>
        </header>

        <div className="portfolio-rows" aria-label="Portfolio projects">
          <PortfolioRow items={portfolioRows[0]} direction="left" />
          <PortfolioRow items={portfolioRows[1]} direction="right" />
        </div>
      </div>
    </section>
  );
}

function PortfolioRow({
  direction,
  items,
}: {
  direction: "left" | "right";
  items: PortfolioItem[];
}) {
  const duplicatedItems = [...items, ...items];

  return (
    <div className="portfolio-row">
      <ul className={`portfolio-track portfolio-track--${direction}`}>
        {duplicatedItems.map((item, index) => {
          const isDuplicate = index >= items.length;
          const imageSmall = item.src.replace(/\.webp$/i, "-640.webp");

          return (
            <li
              className="portfolio-card"
              key={`${item.src}-${index}`}
              aria-hidden={isDuplicate}
            >
              <div className="portfolio-card__image">
                <img
                  alt={`${item.name} portfolio project`}
                  decoding="async"
                  height="720"
                  loading="lazy"
                  sizes="(max-width: 800px) 74vw, 27vw"
                  src={imageSmall}
                  srcSet={`${imageSmall} 640w, ${item.src} 1280w`}
                  width="1280"
                />
              </div>
              <h3>{item.name}</h3>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
