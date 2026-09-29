import { Hero } from "./components/hero";
import { SoundFamiliar } from "./components/sound-familiar";
import { MathBackground } from "./components/math-background";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";

export default function Home() {
  return (
    <>
      <MathBackground />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <SoundFamiliar />
      </main>
      <SiteFooter />
    </>
  );
}
