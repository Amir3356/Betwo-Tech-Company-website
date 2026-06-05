import Hero from "../sections/Hero";
import WhatWeDo from "../sections/WhatWeDo";
import FeaturedProjects from "../sections/FeaturedProjects";
import ServicesOverview from "../sections/ServicesOverview";
import AboutUsOverview from "../sections/AboutUsOverview";
import TrustedBy from "../sections/TrustedBy";
import ContactOverview from "../sections/ContactOverview";
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
