import { personalInfo } from "@/data/cv-data";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp() {
  if (!personalInfo.whatsapp) {
    return null;
  }

  return (
    <a
      aria-label="Chat on WhatsApp"
      className="floating-whatsapp"
      data-cta="floating-whatsapp"
      href={personalInfo.whatsapp}
      rel="noopener noreferrer"
      target="_blank"
    >
      <FaWhatsapp aria-hidden="true" size={26} />
    </a>
  );
}
