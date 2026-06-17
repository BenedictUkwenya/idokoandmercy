"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { type ReactNode, useState } from "react";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { LocationMap } from "@/components/ui/expand-map";
import { WeddingShuffleGrid } from "@/components/ui/shuffle-grid";
import { SparklesCore } from "@/components/ui/sparkles";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";
import TeamShowcase from "@/components/ui/team-showcase";
import { WelcomeSplash } from "@/components/welcome-splash";
import { WeddingScratchCard } from "@/components/wedding-scratch-card";
import { WeddingSplineHero } from "@/components/wedding-spline-hero";

type Design = {
  id: "champagne";
  label: string;
  theme: string;
  promise: string;
  intro: string;
  heroLine: string;
  button: string;
  photo: string;
  alt: string;
  sections: string[];
};

const design: Design = {
  id: "champagne",
  label: "Wedding Invitation",
  theme: "theme-champagne",
  promise: "A warm luminous invitation with soft light, polished motion, and graceful guest guidance.",
  intro: "Together with their families, Idoko and Mercy invite you into a celebration wrapped in golden light.",
  heroLine: "A warm welcome awaits",
  button: "Open the invitation",
  photo:
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=85",
  alt: "A warm wedding ceremony setup with floral details.",
  sections: ["Private welcome", "Scratch reveal", "Formal program"],
};

const program = [
  ["10:00am", "Guest arrival"],
  ["11:00am", "Wedding ceremony"],
  ["1:00pm", "Reception opens"],
  ["2:00pm", "Couple entrance"],
  ["3:00pm", "Lunch and toasts"],
  ["5:00pm", "Dance and celebration"],
];

const details = [
  ["Traditional", "Friday, 11 Dec", "4:00 PM", "Family compound"],
  ["White Wedding", "Saturday, 12 Dec", "11:00 AM", "St. Amara Chapel"],
  ["Reception", "Saturday, 12 Dec", "1:00 PM", "Grand Palace Hall"],
];

const story = [
  ["How we met", "A short hello after service became a conversation neither of them wanted to end."],
  ["First date", "A quiet table, too much laughter, and the first small promise to see each other again."],
  ["The yes", "Under warm evening lights, Mercy said yes before Idoko finished the question."],
];

const weddingVenue = "Grand Palace Hall, Victoria Island, Lagos, Nigeria";
const weddingVenueCoordinates = "6.4281° N, 3.4219° E";
const weddingVenueQuery = encodeURIComponent(weddingVenue);

const easeOut = [0.23, 1, 0.32, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1 },
};

function getSparkleColor(design: Design) {
  return design.id === "champagne" ? "#f1d78a" : "#f5d37a";
}

function MotionSection({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className: string;
  id?: string;
}) {
  return (
    <motion.section
      className={className}
      id={id}
      initial="hidden"
      transition={{ duration: 0.65, ease: easeOut }}
      variants={reveal}
      viewport={{ amount: 0.22, once: true }}
      whileInView="show"
    >
      {children}
    </motion.section>
  );
}

function AppHeader() {
  return (
    <header className="app-header">
      <a className="brand-mark" href="#">
        <span>Idoko & Mercy</span>
        <small>Wedding Experience</small>
      </a>
      <div className="app-header-meta">
        <p className="header-note header-note-center">Wedding Invitation</p>
        <p className="header-note">Saturday, 12th December 2026</p>
      </div>
    </header>
  );
}

function CursorCompanion() {
  const x = useMotionValue(32);
  const y = useMotionValue(32);
  const springX = useSpring(x, { damping: 16, stiffness: 130 });
  const springY = useSpring(y, { damping: 16, stiffness: 130 });

  return (
    <motion.div
      className="cursor-field"
      initial={{ opacity: 0, y: 20 }}
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        x.set(Math.min(Math.max(event.clientX - bounds.left - 32, 0), bounds.width - 64));
        y.set(Math.min(Math.max(event.clientY - bounds.top - 32, 0), bounds.height - 64));
      }}
      transition={{ duration: 0.55, ease: easeOut }}
      viewport={{ amount: 0.45, once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <motion.span
        aria-hidden="true"
        className="cute-guide"
        style={{ x: springX, y: springY }}
        whileHover={{ rotate: -8, scale: 1.08 }}
      >
        <span className="guide-face">
          <span />
          <span />
        </span>
      </motion.span>
      <p>Move around. The invitation reacts.</p>
    </motion.div>
  );
}

function Hero({ design }: { design: Design }) {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -70]);

  return (
    <section className="hero-shell">
      <div className="hero-sparkles" aria-hidden="true">
        <SparklesCore
          background="transparent"
          className="h-full w-full"
          maxSize={1.15}
          minSize={0.35}
          particleColor={getSparkleColor(design)}
          particleDensity={110}
          speed={0.65}
        />
      </div>
      <motion.div
        className="hero-copy"
        key={`${design.id}-copy`}
        style={{ y: heroY }}
        transition={{ duration: 0.7, ease: easeOut }}
      >
        <motion.p className="guest-pill" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          You are warmly invited
        </motion.p>
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 34 }}
          transition={{ delay: 0.08, duration: 0.7, ease: easeOut }}
        >
          Idoko & Mercy
        </motion.h1>
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="hero-intro"
          initial={{ opacity: 0, y: 22 }}
          transition={{ delay: 0.18, duration: 0.65, ease: easeOut }}
        >
          {design.intro}
        </motion.p>
        <motion.div
          animate="show"
          initial="hidden"
          variants={reveal}
        >
          <CountdownTimer />
        </motion.div>
        <div className="hero-actions">
          <a href="#rsvp">{design.button}</a>
          <a href="#program">View program</a>
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="hero-preview"
        initial={{ opacity: 0, y: 42, scale: 0.96 }}
        transition={{ delay: 0.1, duration: 0.75, ease: easeOut }}
      >
        <WeddingShuffleGrid />
      </motion.div>
    </section>
  );
}

function ScrollInvitationSection({ design }: { design: Design }) {
  return (
    <section className="scroll-invitation-section" aria-label="Scroll animated invitation preview">
      <ContainerScroll
        titleComponent={
          <div className="scroll-invitation-title">
            <span>Scroll experience</span>
            <h2>Let the invitation open as guests move through it.</h2>
            <p>{design.promise}</p>
          </div>
        }
      >
        <div className="scroll-invitation-card">
          <div
            aria-label={design.alt}
            className="scroll-invitation-photo"
            role="img"
            style={{ backgroundImage: `url(${design.photo})` }}
          />
          <div className="scroll-invitation-overlay">
            <span>{design.label}</span>
            <h3>Idoko & Mercy</h3>
            <p>Saturday, 12th December 2026 · Grand Palace Hall</p>
          </div>
          <div className="scroll-invitation-panel">
            <span>Guest path</span>
            <strong>Welcome → Reveal → RSVP</strong>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}

function FeatureRail({ design }: { design: Design }) {
  return (
    <motion.section
      className="feature-rail"
      initial="hidden"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      viewport={{ amount: 0.25, once: true }}
      whileInView="show"
    >
      {design.sections.map((section) => (
        <motion.article key={section} transition={{ duration: 0.55, ease: easeOut }} variants={reveal}>
          <span />
          <h2>{section}</h2>
          <p>{design.promise}</p>
        </motion.article>
      ))}
    </motion.section>
  );
}

function ScratchRevealSection() {
  return (
    <MotionSection className="content-section scratch-section" id="scratch-reveal">
      <div className="scratch-section-copy">
        <span>Scratch reveal</span>
        <h2>The date should feel discovered, not just displayed.</h2>
        <p>
          Guests can rub the golden card with a thumb to reveal the date and venue. It gives the
          invitation a playful moment without hiding the important details for long.
        </p>
        <div className="scratch-hints" aria-label="Scratch card highlights">
          <span>Touch friendly</span>
          <span>Particle reveal</span>
          <span>Venue unlocked</span>
        </div>
      </div>

      <div className="scratch-section-card">
        <WeddingScratchCard
          coupleNames="Idoko & Mercy"
          venue="Grand Palace Hall, Victoria Island"
          weddingDate="April 30, 2026"
        />
      </div>
    </MotionSection>
  );
}

function StorySection() {
  return (
    <section className="flow-story-shell" id="story">
      <div className="section-heading flow-story-heading">
        <span>The love sequence</span>
        <h2>
          Their story should unfold like a scene guests can feel.
        </h2>
        <p>
          A cinematic scroll through the moments that carried Idoko and Mercy from first
          hello to forever.
        </p>
      </div>
      <FlowArt aria-label="Idoko and Mercy wedding story scroll" className="flow-story">
        <FlowSection aria-label="The first hello" className="flow-panel flow-panel-primary">
          <p className="flow-kicker">01 — First hello</p>
          <hr />
          <h2>
            A hello
            <br />
            became
            <br />
            forever.
          </h2>
          <hr />
          <p>{story[0][1]}</p>
        </FlowSection>

        <FlowSection aria-label="The first date" className="flow-panel flow-panel-dark">
          <p className="flow-kicker">02 — First date</p>
          <hr />
          <h2>
            Laughter
            <br />
            made the
            <br />
            room soft.
          </h2>
          <hr />
          <div className="flow-detail-grid">
            <article>
              <span>Memory</span>
              <p>{story[1][1]}</p>
            </article>
            <article>
              <span>Feeling</span>
              <p>Warm, easy, familiar, and full of the kind of peace that stays.</p>
            </article>
            <article>
              <span>Promise</span>
              <p>A small yes to another conversation became a bigger yes to a shared life.</p>
            </article>
          </div>
        </FlowSection>

        <FlowSection aria-label="The yes" className="flow-panel flow-panel-soft">
          <p className="flow-kicker">03 — The yes</p>
          <hr />
          <h2>
            Mercy
            <br />
            said yes.
          </h2>
          <hr />
          <p>{story[2][1]}</p>
        </FlowSection>
      </FlowArt>
    </section>
  );
}

function WeddingCircleSection() {
  return (
    <section className="wedding-circle-section" aria-label="Wedding circle showcase">
      <div className="wedding-circle-intro">
        <span>The people around the day</span>
        <h2>Meet the circle carrying the celebration.</h2>
        <p>
          Family, friends, planners, glam, and film. A softer way to introduce the hands making
          Idoko and Mercy&apos;s day feel effortless.
        </p>
      </div>
      <TeamShowcase />
    </section>
  );
}

function DetailsSection() {
  return (
    <MotionSection className="content-section details-section">
      <div className="section-heading">
        <span>Wedding details</span>
        <h2>Everything guests keep asking for, beautifully organized.</h2>
      </div>
      <motion.div
        className="details-grid"
        initial="hidden"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        viewport={{ amount: 0.25, once: true }}
        whileInView="show"
      >
        {details.map(([title, date, time, venue]) => (
          <motion.article key={title} transition={{ duration: 0.5, ease: easeOut }} variants={reveal}>
            <h3>{title}</h3>
            <p>{date}</p>
            <p>{time}</p>
            <strong>{venue}</strong>
            <button type="button">Add to calendar</button>
          </motion.article>
        ))}
      </motion.div>
    </MotionSection>
  );
}

function ProgramSection() {
  return (
    <MotionSection className="content-section program-section" id="program">
      <div className="section-heading">
        <span>Program</span>
        <h2>A thumb-friendly schedule for the whole day.</h2>
      </div>
      <motion.div
        className="program-list"
        initial="hidden"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.075 } } }}
        viewport={{ amount: 0.35, once: true }}
        whileInView="show"
      >
        {program.map(([time, activity]) => (
          <motion.div key={activity} transition={{ duration: 0.45, ease: easeOut }} variants={reveal}>
            <time>{time}</time>
            <span>{activity}</span>
          </motion.div>
        ))}
      </motion.div>
    </MotionSection>
  );
}

function NavigationSection() {
  return (
    <MotionSection className="content-section navigation-section">
      <div className="section-heading">
        <span>Smart navigation</span>
        <h2>Venue help for guests who do not want to call anyone.</h2>
      </div>
      <motion.div className="map-card" whileHover={{ y: -4 }}>
        <div className="venue-map-stack">
          <LocationMap
            className="venue-expand-map"
            coordinates={weddingVenueCoordinates}
            location="Victoria Island, Lagos"
          />
          <iframe
            aria-label={`Google Map showing ${weddingVenue}`}
            className="google-map-frame"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${weddingVenueQuery}&output=embed`}
            title="Wedding venue Google Map"
          />
        </div>
        <div>
          <h3>{weddingVenue}</h3>
          <p>
            Landmark: Victoria Island, Lagos. Tap the map card to expand the location preview, or
            open Google Maps for live directions.
          </p>
          <div className="map-actions">
            <a href={`https://www.google.com/maps/search/?api=1&query=${weddingVenueQuery}`} target="_blank" rel="noreferrer">
              Google Maps
            </a>
            <a href={`https://waze.com/ul?q=${weddingVenueQuery}&navigate=yes`} target="_blank" rel="noreferrer">
              Waze
            </a>
            <a href="tel:+2348000000000">Call planner</a>
          </div>
        </div>
      </motion.div>
    </MotionSection>
  );
}

function RsvpSection() {
  return (
    <MotionSection className="content-section rsvp-section" id="rsvp">
      <div className="section-heading">
        <span>RSVP preview</span>
        <h2>Frontend now, Supabase-powered guest tracking later.</h2>
      </div>
      <motion.form
        initial={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.55, ease: easeOut }}
        viewport={{ amount: 0.4, once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <label>
          Full name
          <input placeholder="Your full name" type="text" />
        </label>
        <label>
          Will you attend?
          <select defaultValue="yes">
            <option value="yes">Yes, we will attend</option>
            <option value="maybe">Maybe</option>
            <option value="no">No, with love</option>
          </select>
        </label>
        <label>
          Number of guests
          <select defaultValue="2">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </label>
        <label>
          Special note
          <textarea placeholder="Meal preference, accessibility, transport, or accommodation request" />
        </label>
        <button type="button">Confirm RSVP</button>
      </motion.form>
    </MotionSection>
  );
}

function KeepsakeSection() {
  return (
    <MotionSection className="keepsake-section">
      <div>
        <span>After the wedding</span>
        <h2>The invitation becomes a memory room.</h2>
        <p>
          Countdown turns into thank-you notes, live stream turns into video, and guests can return for
          photos, speeches, and uploads.
        </p>
      </div>
      <motion.div
        aria-hidden="true"
        className="memory-strip"
        initial="hidden"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.13 } } }}
        viewport={{ amount: 0.35, once: true }}
        whileInView="show"
      >
        {[0, 1, 2].map((item) => (
          <motion.span key={item} transition={{ duration: 0.55, ease: easeOut }} variants={reveal} />
        ))}
      </motion.div>
    </MotionSection>
  );
}

function SplineMomentSection() {
  return (
    <MotionSection className="content-section spline-moment-section">
      <div className="section-heading">
        <span>Interactive welcome</span>
        <h2>A 3D moment can live after the first fold, not disturb the invitation.</h2>
      </div>
      <WeddingSplineHero />
    </MotionSection>
  );
}

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [splashVisible, setSplashVisible] = useState(true);

  return (
    <>
      {hasEntered && (
        <motion.main
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }}
          className={`experience ${design.theme}`}
          initial={{ opacity: 0.35, filter: "blur(10px)", scale: 1.03, y: 24 }}
          transition={{ duration: 1.15, ease: easeOut }}
        >
            <AppHeader />
            <AnimatePresence mode="wait">
              <motion.div
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                key={design.id}
                transition={{ duration: 0.35, ease: easeOut }}
              >
                <Hero design={design} />
                <ScrollInvitationSection design={design} />
                <StorySection />
                <WeddingCircleSection />
                <CursorCompanion />
                <FeatureRail design={design} />
                <ScratchRevealSection />
                <SplineMomentSection />
                <DetailsSection />
                <ProgramSection />
                <NavigationSection />
                <RsvpSection />
                <KeepsakeSection />
              </motion.div>
            </AnimatePresence>
          </motion.main>
      )}

      <AnimatePresence>
        {splashVisible && (
          <WelcomeSplash
            coupleNames="Idoko & Mercy"
            onBeginOpen={() => setHasEntered(true)}
            onComplete={() => setSplashVisible(false)}
            photo={design.photo}
            photoAlt={design.alt}
            sparkleColor={getSparkleColor(design)}
            venue="Grand Palace Hall, Victoria Island"
            weddingDate="Saturday, 12th December 2026"
          />
        )}
      </AnimatePresence>
    </>
  );
}
