import { Topbar } from "@/components/sections/topbar";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { ServicesList } from "@/components/sections/services-list";

export const metadata = {
  title: "Our Services",
  description: "Explore the full range of services we offer.",
};

export default function ServicesPage() {
  return (
    <>
      <Topbar />
      <Header />
      <ServicesList />
      <Footer />
    </>
  );
}
