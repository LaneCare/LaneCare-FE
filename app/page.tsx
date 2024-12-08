import { Container, Main, Section } from "@/components/craft";
import Hero from "@/app/(public)/components/hero";
import FeatureLeft from "@/app/(public)/components/feature-left";
import FeatureRight from "@/app/(public)/components/feature-right";
import FeatureSet from "@/app/(public)/components/feature-set";
import CTA from "@/app/(public)/components/cta";
import Footer from "@/app/(public)/components/footer";
import PublicTopbar from "@/components/navbar/PublicTopbar";

export default function Home() {
  return (
    <>
      <PublicTopbar isLoggedIn={false} />
      <Main className="">
        <Section className="bg-gray-100 dark:bg-gray-800">
          <Hero />
        </Section>

        <Section>
          <FeatureLeft />
        </Section>

        <Section className="bg-gray-100 dark:bg-gray-800">
          <FeatureRight />
        </Section>

        <Section>
          <FeatureSet />
        </Section>

        <Section className="bg-gray-100 dark:bg-gray-800">
          <CTA />
        </Section>

        <Section>
          <Footer />
        </Section>
      </Main>
    </>
  );
}
