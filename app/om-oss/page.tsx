import { Topbar } from "@/components/sections/topbar";
import { Header } from "@/components/sections/header";
import { AboutPage } from "@/components/sections/about-page";
import { Footer } from "@/components/sections/footer";

export const metadata = {
  title: "Om oss | JHK Tømrerservice AS",
  description:
    "Les mer om JHK Tømrerservice AS, erfaringen, godkjenningene og tømrerarbeidet selskapet utfører i Bergen og omegn.",
};

export default function OmOssPage() {
  return (
    <>
      <Topbar />
      <Header />
      <AboutPage />
      <Footer />
    </>
  );
}
