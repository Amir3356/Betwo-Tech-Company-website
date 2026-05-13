import Hero from "../components/sections/Hero";
import WhatWeDo from "../components/sections/WhatWeDo";
import FeaturedProjects from "../components/sections/FeaturedProjects";
import ServicesOverview from "../components/sections/ServicesOverview";
import AboutUsOverview from "../components/sections/AboutUsOverview";
import TrustedBy from "../components/sections/TrustedBy";
import ContactOverview from "../components/sections/ContactOverview";
export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <FeaturedProjects />
      <ServicesOverview />
      <AboutUsOverview />
      <TrustedBy />
      <ContactOverview />
    </>
  );
}
