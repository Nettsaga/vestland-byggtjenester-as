import { Topbar } from "@/components/sections/topbar";
import { Header } from "@/components/sections/header";
import { ContactPage } from "@/components/sections/contact-page";
import { Footer } from "@/components/sections/footer";

export const metadata = {
  title: "Kontakt oss | JHK Tømrerservice AS",
  description:
    "Ta kontakt med JHK Tømrerservice AS for en gratis og uforpliktende befaring i Bergen og omegn.",
};

export default function KontaktPage() {
  return (
    <>
      <Topbar />
      <Header />
      <ContactPage />
      <Footer />
    </>
  );
}
