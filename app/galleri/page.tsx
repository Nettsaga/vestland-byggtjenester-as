import { Footer } from "@/components/sections/footer";
import { GalleryPage } from "@/components/sections/gallery-page";
import { Header } from "@/components/sections/header";
import { Topbar } from "@/components/sections/topbar";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: `Galleri | ${siteConfig.company.name}`,
  description:
    siteConfig.gallery.description ??
    "Se bilder fra utvalgte prosjekter og tømrerarbeid.",
};

export default function GalleriPage() {
  return (
    <>
      <Topbar />
      <Header />
      <GalleryPage />
      <Footer />
    </>
  );
}
