import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Tools from "@/components/Tools";

export default function App() {
  return (
    <div
      style={{
        backgroundColor: "#080C08",
        color: "#E8F5E6",
        scrollPaddingTop: "64px",
      }}
    >
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Services />
      <Tools />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
