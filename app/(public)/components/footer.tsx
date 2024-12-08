// React and Next.js imports
import Image from "next/image";
import Link from "next/link";

// Third-party library imports
import Balancer from "react-wrap-balancer";

// Local component imports

// Asset imports
import Logo from "@/public/next.svg";
import { Container, Section } from "@/components/craft";

export default function Footer() {
  return (
    <footer>
      <Section>
        <Container className="grid gap-12 md:grid-cols-[1.5fr_0.5fr_0.5fr]">
          <div className="grid gap-6">
            <Link href="/">
              <h3 className="sr-only">brijr/components</h3>

              <Image
                src="/LaneCareWithText.svg"
                alt="LaneCare Logo"
                className="dark:invert transition-all hover:opacity-75"
                width={150}
                height={80}
              />
            </Link>
            <p>
              <Balancer>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam voluptate quidem natus.
              </Balancer>
            </p>
            <p className="text-muted-foreground">
              © <a href="#">LaneCare</a>. All rights reserved. 2024-present.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h5>Website</h5>
            <Link href="/">Blog</Link>
            <Link href="/">Authors</Link>
            <Link href="/">Categories</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h5>Legal</h5>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
            <Link href="/cookie-policy">Cookie Policy</Link>
          </div>
        </Container>
      </Section>
    </footer>
  );
}
