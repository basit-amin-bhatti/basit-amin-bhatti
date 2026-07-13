# Project Guidance

## Project Purpose

This repository powers the personal branding website for Basit Amin Bhatti.

The business goal is to win clients for AI-powered websites, vibe-coded SaaS and AI solutions, Shopify/ecommerce CRO, and AI automations.

## Brand Positioning

- **Primary title:** AI Website & Automation Builder
- **Main headline direction:** AI-Powered Websites, Web Apps & Automations for Businesses
- **Core promise:** Launch faster with AI-assisted development, human-reviewed quality, conversion strategy, and automation.

Position Basit as a professional AI-powered builder for business outcomes, not as someone who only "vibe codes." Vibe coding can be used as a service keyword, but frame it as AI-assisted speed paired with human-reviewed quality.

## Target Audience

- Marketing agencies
- Ecommerce brands
- Local service businesses
- Startup founders
- Consultants and coaches
- Small businesses needing fast modern websites

## Tone

- Confident
- Premium
- Clear
- Direct
- Not hype-heavy
- No cheap-freelancer language
- Clear business English
- Outcome-focused

## Words And Phrases To Use

- AI-powered websites
- AI-assisted development
- human-reviewed quality
- conversion-focused
- SaaS & AI Solutions
- web apps
- Shopify CRO
- ecommerce growth
- automation workflows
- n8n automation
- launch faster
- businesses

## Words And Phrases To Avoid

- cheap
- affordable developer
- basic website
- I just vibe code
- guaranteed results
- unrealistic claims
- fake metrics
- fake testimonials

## Content Integrity

- Do not create fake client names.
- Do not invent revenue numbers, conversion lifts, or delivery metrics.
- Do not add fake testimonials.
- Placeholder work must be labeled honestly as "demo concept," "sample build," or "internal project."

## Engineering Conventions

- Keep components modular.
- Prefer data-driven sections.
- Avoid duplicate hardcoded copy.
- Maintain responsive design.
- Maintain accessibility.
- Use semantic HTML.
- Keep animations subtle and performant.
- Do not add unnecessary dependencies.
- Run lint, build, and relevant checks before the final response when code or content files change.

## Definition Of Done

- Website clearly communicates the offer in 5 seconds.
- Main CTA appears in the hero, header, mid-page, and final CTA.
- Services are clear.
- Target market is obvious.
- SEO metadata exists.
- Mobile layout is polished.
- Accessibility basics pass.
- Build succeeds.

## Verified Commands

**Frontend** (run from `src/frontend/`):

- **install**: `pnpm install --prefer-offline`
- **typecheck**: `pnpm typecheck`
- **lint fix**: `pnpm fix`
- **build**: `pnpm build`

**Backend** (run from `src/backend/`):

- **install**: `mops install`
- **typecheck**: `mops check --fix`
- **build**: `mops build`

**Backend and frontend integration** (run from root):

- **generate bindings**: `pnpm bindgen` This step is necessary to ensure the frontend can call the backend methods.

## Learnings

[No learnings yet]
