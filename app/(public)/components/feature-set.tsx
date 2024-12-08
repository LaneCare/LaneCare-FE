// Layout
import { Section, Container } from "@/components/craft";
import Balancer from "react-wrap-balancer";
import Link from "next/link";

// Icons
import {
  Coins,
  ArrowRight,
  Eye,
  BarChart2,
  MessageSquare,
  Bell,
} from "lucide-react";

type FeatureText = {
  icon: JSX.Element;
  title: string;
  description: string;
  href?: string;
  cta?: string;
};

const featureText: FeatureText[] = [
  {
    icon: <Eye className="h-6 w-6 text-primary" />,
    title: "Automatic Damage Detection",
    description:
      "AI-powered system for accurate and timely road damage identification.",
    href: "/",
    cta: "Learn More",
  },
  {
    icon: <BarChart2 className="h-6 w-6 text-primary" />,
    title: "Real-time Monitoring",
    description: "Continuous tracking of road conditions using IoT sensors.",
    href: "/",
    cta: "Learn More",
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-primary" />,
    title: "Reporting Platform",
    description:
      "User-friendly interface for public reporting and communication.",
    href: "/",
    cta: "Learn More",
  },
  {
    icon: <Bell className="h-6 w-6 text-primary" />,
    title: "Email Notifications",
    description:
      "Stay informed with updates on reported issues and repair progress.",
    href: "/",
    cta: "Learn More",
  },
];

const singleFeatureText: FeatureText[] = [
  // {
  //   icon: <MessageSquare className="h-6 w-6 text-primary" />,
  //   title: "Reporting Platform",
  //   description:
  //     "User-friendly interface for public reporting and communication.",
  //   href: "/",
  //   cta: "Learn More",
  // },
];

const FeatureSet = () => {
  return (
    <Section>
      <Container className="not-prose">
        <div className="flex flex-col gap-6">
          <h3 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            <Balancer>Key Features</Balancer>
          </h3>
          <h4 className="text-2xl font-light opacity-70">
            <Balancer>
              Discover the powerful features that make our platform stand out.
            </Balancer>
          </h4>

          <div className="mt-6 grid gap-6 md:mt-12 md:grid-cols-2">
            {featureText.map(
              ({ icon, title, description, href, cta }, index) => (
                <Link
                  href={`${href}`}
                  className="flex flex-col justify-between gap-6 rounded-lg border p-6 transition-all hover:-mt-2 hover:mb-2"
                  key={index}
                >
                  <div className="grid gap-4">
                    {icon}
                    <h4 className="text-xl text-primary">{title}</h4>
                    <p className="text-base opacity-75">{description}</p>
                  </div>
                  {cta && (
                    <div className="flex h-fit items-center text-sm font-semibold">
                      <p>{cta}</p> <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  )}
                </Link>
              )
            )}
          </div>
          <div>
            {singleFeatureText.map(
              ({ icon, title, description, href, cta }, index) => (
                <Link
                  href={`${href}`}
                  className="flex flex-col justify-between gap-6 rounded-lg border bg-muted/25 p-6 transition-all hover:-mt-2 hover:mb-2"
                  key={index}
                >
                  <div className="grid gap-4">
                    {icon}
                    <h4 className="text-xl text-primary">{title}</h4>
                    <p className="text-base opacity-75">{description}</p>
                  </div>
                  {cta && (
                    <div className="flex h-fit items-center text-sm font-semibold">
                      <p>{cta}</p> <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  )}
                </Link>
              )
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default FeatureSet;
