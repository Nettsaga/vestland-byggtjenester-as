import { Topbar } from "@/components/sections/topbar";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { About } from "@/components/sections/about";
import { Gallery } from "@/components/sections/gallery";
import { Reviews } from "@/components/sections/reviews";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Topbar />
      <Header />
      <Hero />
      <About />
      <div className="h-px w-full bg-border" aria-hidden="true" />
      <Services />
      <Gallery />
      <Reviews />
      <Footer />
    </>
  );
}
