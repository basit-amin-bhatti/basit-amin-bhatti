import { BrandMarquee } from "@/components/BrandMarquee";
import { CaseStudiesPage, CaseStudyDetailPage } from "@/components/CaseStudies";
import { ContactPage, ContactSection } from "@/components/ContactSystem";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import {
  HomeProcessSection,
  HomeServicesSection,
  HomeTechStackSection,
  HomeWorkSection,
} from "@/components/OnePageSections";
import { PortfolioSection } from "@/components/PortfolioSection";
import { usePageSeo } from "@/components/Seo";
import { ServicePage } from "@/components/ServicePage";
import { caseStudies, servicePages } from "@/data/siteContent";

type AppProps = {
  path?: string;
};

export default function App({ path }: AppProps) {
  const currentPath = normalizePath(
    path ?? (typeof window === "undefined" ? "/" : window.location.pathname),
  );
  const servicePage = servicePages.find((page) => page.path === currentPath);
  const caseStudy = caseStudies.find((page) => page.path === currentPath);

  if (servicePage) {
    return (
      <div className="site-shell">
        <Navbar />
        <ServicePage page={servicePage} />
        <Footer />
        <FloatingWhatsApp />
      </div>
    );
  }

  if (currentPath === "/case-studies") {
    return (
      <div className="site-shell">
        <Navbar />
        <CaseStudiesPage />
        <Footer />
        <FloatingWhatsApp />
      </div>
    );
  }

  if (caseStudy) {
    return (
      <div className="site-shell">
        <Navbar />
        <CaseStudyDetailPage caseStudy={caseStudy} />
        <Footer />
        <FloatingWhatsApp />
      </div>
    );
  }

  if (currentPath === "/contact") {
    return (
      <div className="site-shell">
        <Navbar />
        <ContactPage />
        <Footer />
        <FloatingWhatsApp />
      </div>
    );
  }

  if (currentPath === "/") {
    return <HomePage />;
  }

  return <NotFoundPage path={currentPath} />;
}

function HomePage() {
  usePageSeo("/");

  return (
    <div className="site-shell">
      <Navbar />
      <main id="main-content">
        <Hero />
        <BrandMarquee />
        <HomeServicesSection />
        <PortfolioSection />
        <HomeWorkSection />
        <HomeProcessSection />
        <HomeTechStackSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function NotFoundPage({ path }: { path: string }) {
  usePageSeo(path);

  return (
    <div className="site-shell">
      <Navbar />
      <main id="main-content">
        <section className="service-hero">
          <div className="container service-hero__inner">
            <p className="eyebrow">404</p>
            <h1>That page could not be found.</h1>
            <p className="hero-subheadline">
              Return to the official website of Basit Amin Bhatti to explore AI
              websites, web apps, Shopify CRO, and automation services.
            </p>
            <div className="hero-actions">
              <a className="btn btn--primary" href="/">
                Return home
              </a>
              <a className="btn btn--secondary" href="/#contact">
                Contact Basit
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname;
}
