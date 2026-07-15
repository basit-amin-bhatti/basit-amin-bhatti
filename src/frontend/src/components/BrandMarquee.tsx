import {
  Gem,
  Laptop,
  Leaf,
  type LucideIcon,
  Palette,
  Rocket,
  ShoppingBag,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";

type BrandItem = {
  name: string;
  icon: LucideIcon;
};

const brandItems: BrandItem[] = [
  { name: "Fizmo", icon: Gem },
  { name: "Habibi Technology", icon: Laptop },
  { name: "Juniper Kids", icon: Sparkles },
  { name: "Lumea Organics", icon: Leaf },
  { name: "Moda Jewels", icon: Gem },
  { name: "Runnics Sports", icon: Trophy },
  { name: "Skstones", icon: Palette },
  { name: "Solarlink", icon: Zap },
  { name: "The Shoppies", icon: ShoppingBag },
  { name: "Versus Sports", icon: Rocket },
];

export function BrandMarquee() {
  return (
    <section className="brand-marquee" aria-labelledby="portfolio-brands-title">
      <div className="container">
        <h2 id="portfolio-brands-title">
          Trusted by brands across 4 countries
        </h2>
      </div>

      <div className="brand-marquee__viewport">
        <ul className="brand-marquee__track" aria-label="Portfolio brands">
          {[...brandItems, ...brandItems].map((item, index) => {
            const Icon = item.icon;
            const isDuplicate = index >= brandItems.length;

            return (
              <li
                className="brand-marquee__chip"
                key={`${item.name}-${index}`}
                aria-hidden={isDuplicate}
              >
                <Icon size={15} strokeWidth={1.8} aria-hidden="true" />
                <span>{item.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
