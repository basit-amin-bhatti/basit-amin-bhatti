// ─── Personal Information ────────────────────────────────────────────────────

export const personalInfo = {
  name: "Basit Amin Bhatti",
  title: "Ecommerce Growth | Shopify CRO, N8N | AI Automation & Agents",
  location: "Punjab, Pakistan",
  email: "abbhatti504@gmail.com",
  linkedin: "https://www.linkedin.com/in/basit-amin-bhatti/",
  whatsapp: "https://wa.me/923104875550",
  bio: "I help eCommerce brands grow through Shopify CRO, AI automation, and smart workflow systems using n8n and AI agents. Focused on increasing conversions, automating operations, and building scalable customer experiences.",
  availability: "Available for new projects",
} as const;

// ─── Key Stats ───────────────────────────────────────────────────────────────

export const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "3+", label: "Years Experience" },
  { value: "100%", label: "Client Focus" },
  { value: "∞", label: "Automations Built" },
] as const;

// ─── Skills ──────────────────────────────────────────────────────────────────

export type Skill = {
  name: string;
  category: string;
  level: number; // out of 5
};

export const skills: Skill[] = [
  { name: "Shopify CRO", category: "E-Commerce", level: 5 },
  { name: "Shopify Store Management", category: "E-Commerce", level: 5 },
  { name: "n8n Automation", category: "Automation", level: 5 },
  { name: "AI Workflow Automation", category: "AI", level: 5 },
  { name: "AI Agents", category: "AI", level: 5 },
  { name: "WhatsApp Automation", category: "Messaging", level: 5 },
  { name: "Telegram Bot Automation", category: "Automation", level: 4 },
  { name: "API Integrations", category: "Backend", level: 5 },
  { name: "REST APIs & Webhooks", category: "Backend", level: 5 },
  { name: "OpenAI API Integrations", category: "AI", level: 5 },
  { name: "Landing Page CRO", category: "CRO", level: 5 },
  { name: "Git & GitHub", category: "Tools", level: 4 },
  { name: "WordPress", category: "CMS", level: 4 },
  { name: "Postman", category: "API Testing", level: 4 },
  { name: "Visual Studio Code", category: "Development Tool", level: 5 },
];

export const skillCategories = [
  "All",
  "E-Commerce",
  "AI",
  "Automation",
  "Backend",
  "Messaging",
  "CRO",
  "Tools",
  "CMS",
  "API Testing",
] as const;

export type SkillCategory = (typeof skillCategories)[number];

// ─── Experience ──────────────────────────────────────────────────────────────

export type Experience = {
  period: string;
  role: string;
  type: string;
  description: string;
  tags: string[];
};

export const experience: Experience[] = [
  {
    period: "2023 – Present",
    role: "Shopify CRO & AI Automation Specialist",
    type: "Freelance",
    description:
      "Helping Shopify businesses improve conversions and automate workflows using n8n, AI tools, and WhatsApp integrations. Building automation systems that save time, improve operations, and support business growth.",
    tags: ["Shopify CRO", "n8n", "AI Automation", "WhatsApp API"],
  },
  {
    period: "2023 – Present",
    role: "AI Automation Developer",
    type: "Freelance / Remote Projects",
    description:
      "Creating AI-powered workflows, chatbot systems, and automation solutions using APIs, OpenAI, and messaging platforms. Focused on reducing manual work through smart business automations.",
    tags: ["n8n", "OpenAI", "APIs", "AI Agents"],
  },
  {
    period: "2022 – Present",
    role: "Shopify & Automation Freelancer",
    type: "Independent Projects",
    description:
      "Working on Shopify-related projects, landing pages, and AI automation systems for online businesses. Specialized in integrating tools, automating tasks, and improving workflow efficiency.",
    tags: ["Shopify", "Automation", "WhatsApp", "AI Tools"],
  },
];

// ─── Services ────────────────────────────────────────────────────────────────

export type Service = {
  number: string;
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    number: "01",
    title: "Shopify CRO",
    description:
      "Improve Shopify store conversions and optimize customer journeys for better sales performance.",
  },
  {
    number: "02",
    title: "AI Workflow Automation",
    description:
      "Build smart automation systems using n8n, APIs, and AI tools to reduce manual work.",
  },
  {
    number: "03",
    title: "WhatsApp AI Automation",
    description:
      "Create automated WhatsApp systems, AI chatbots, and customer support workflows.",
  },
  {
    number: "04",
    title: "Shopify & Business Solutions",
    description:
      "Develop automation-driven solutions for eCommerce brands and online businesses.",
  },
];

// ─── Tools ───────────────────────────────────────────────────────────────────

export type ToolGroup = {
  category: string;
  items: string[];
};

export const toolGroups: ToolGroup[] = [
  {
    category: "E-Commerce & CRO",
    items: ["Shopify", "Shopify Store Management", "Shopify CRO"],
  },
  {
    category: "Automation & AI",
    items: [
      "n8n",
      "AI Workflow Automation",
      "AI Agents",
      "OpenAI API Integration",
    ],
  },
  {
    category: "Messaging Automation",
    items: [
      "WhatsApp Automation",
      "WhatsApp API Integration",
      "Telegram Bot Automation",
    ],
  },
  {
    category: "API & Integrations",
    items: ["REST APIs", "Webhooks", "Third-Party API Integrations"],
  },
  {
    category: "Tools & Platforms",
    items: ["GitHub", "Postman", "Visual Studio Code"],
  },
  {
    category: "CMS & Platforms",
    items: ["Shopify", "WordPress"],
  },
];

// ─── Navigation ──────────────────────────────────────────────────────────────

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Tools", href: "#tools" },
  { label: "Contact", href: "#contact" },
] as const;
