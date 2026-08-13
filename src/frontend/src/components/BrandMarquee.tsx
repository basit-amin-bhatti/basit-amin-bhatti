import {
  Gem,
  HardHat,
  Laptop,
  Leaf,
  type LucideIcon,
  Mic2,
  Palette,
  PhoneCall,
  Rocket,
  ShoppingBag,
  Sparkles,
  Trophy,
  Webhook,
  Workflow,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  SiAirtable,
  SiCalendly,
  SiClaude,
  SiGooglegemini,
  SiGooglesheets,
  SiHubspot,
  SiMake,
  SiN8N,
  SiOpenai,
  SiSlack,
  SiTwilio,
  SiZapier,
} from "react-icons/si";

type BrandItem = {
  name: string;
  icon: LucideIcon;
};

type AutomationItem = {
  name: string;
  icon: ReactNode;
};

const automationItems: AutomationItem[] = [
  { name: "OpenAI", icon: <SiOpenai aria-hidden="true" /> },
  { name: "Claude", icon: <SiClaude aria-hidden="true" /> },
  { name: "Gemini", icon: <SiGooglegemini aria-hidden="true" /> },
  { name: "n8n", icon: <SiN8N aria-hidden="true" /> },
  {
    name: "GoHighLevel",
    icon: <Workflow aria-hidden="true" strokeWidth={1.8} />,
  },
  { name: "Twilio", icon: <SiTwilio aria-hidden="true" /> },
  { name: "Make", icon: <SiMake aria-hidden="true" /> },
  { name: "Zapier", icon: <SiZapier aria-hidden="true" /> },
  { name: "HubSpot", icon: <SiHubspot aria-hidden="true" /> },
  { name: "Calendly", icon: <SiCalendly aria-hidden="true" /> },
  { name: "Airtable", icon: <SiAirtable aria-hidden="true" /> },
  { name: "Google Sheets", icon: <SiGooglesheets aria-hidden="true" /> },
  { name: "Vapi", icon: <Mic2 aria-hidden="true" strokeWidth={1.8} /> },
  {
    name: "Retell AI",
    icon: <PhoneCall aria-hidden="true" strokeWidth={1.8} />,
  },
  { name: "Slack", icon: <SiSlack aria-hidden="true" /> },
  {
    name: "Webhooks / API",
    icon: <Webhook aria-hidden="true" strokeWidth={1.8} />,
  },
  { name: "JobNimbus", icon: <HardHat aria-hidden="true" strokeWidth={1.8} /> },
  { name: "AccuLynx", icon: <HardHat aria-hidden="true" strokeWidth={1.8} /> },
];

const portfolioBrandItems: BrandItem[] = [
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
    <section className="brand-marquee" aria-labelledby="automation-stack-title">
      <div className="container">
        <h2 id="automation-stack-title">
          AI &amp; Automation Systems I Build With
        </h2>
      </div>

      <MarqueeViewport
        ariaLabel="AI and automation technology stack"
        items={automationItems.map((item) => ({
          icon: item.icon,
          name: item.name,
        }))}
      />
    </section>
  );
}

export function PortfolioBrandMarquee() {
  const items = portfolioBrandItems.map((item) => {
    const Icon = item.icon;

    return {
      name: item.name,
      icon: <Icon aria-hidden="true" size={15} strokeWidth={1.8} />,
    };
  });

  return (
    <div
      aria-labelledby="portfolio-brands-title"
      className="brand-marquee brand-marquee--portfolio"
    >
      <h3 id="portfolio-brands-title">
        Selected ecommerce and technology work
      </h3>
      <MarqueeViewport ariaLabel="Portfolio brands" items={items} />
    </div>
  );
}

function MarqueeViewport({
  ariaLabel,
  items,
}: {
  ariaLabel: string;
  items: AutomationItem[];
}) {
  const duplicatedItems = [...items, ...items];

  return (
    <div className="brand-marquee__viewport">
      <ul className="brand-marquee__track" aria-label={ariaLabel}>
        {duplicatedItems.map((item, index) => (
          <li
            aria-hidden={index >= items.length}
            className="brand-marquee__chip"
            key={`${item.name}-${index}`}
          >
            <span className="brand-marquee__icon">{item.icon}</span>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
