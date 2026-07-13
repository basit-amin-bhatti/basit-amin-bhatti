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
import {
  faqPageSchema,
  personSchema,
  professionalServiceSchema,
  useSeoMetadata,
  websiteSchema,
} from "@/components/Seo";
import { ServicePage } from "@/components/ServicePage";
import { caseStudies, servicePages, siteContent } from "@/data/siteContent";

export default function App() {
  const currentPath = normalizePath(window.location.pathname);
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

  return <HomePage />;
}

function HomePage() {
  useSeoMetadata({
    title: siteContent.seo.homepageTitle,
    description: siteContent.seo.homepageDescription,
    path: "/",
    jsonLd: [
      personSchema(),
      websiteSchema(),
      professionalServiceSchema(),
      faqPageSchema(siteContent.faqs),
    ],
  });

  return (
    <div className="site-shell">
      <Navbar />
      <main>
        <Hero />
        <HomeServicesSection />
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

function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname;
}
