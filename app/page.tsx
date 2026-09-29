import { Hero } from "./components/hero";
import { SoundFamiliar } from "./components/sound-familiar";
import { SessionTimeline } from "./components/session-timeline";
import { WalkAway } from "./components/walk-away";
import { WhoShouldJoin } from "./components/who-should-join";
import { WhoWeAre } from "./components/who-we-are";
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
        <SessionTimeline />
        <WalkAway />
        <WhoShouldJoin />
        <WhoWeAre />
      </main>
      <SiteFooter />
    </>
  );
}
