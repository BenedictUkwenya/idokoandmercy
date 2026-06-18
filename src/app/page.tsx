import { RsvpForm } from "@/components/rsvp-form";

export default function Home() {
  return (
    <main className="rsvp-page">
      <div aria-hidden="true" className="rsvp-floral rsvp-floral-left" />
      <div aria-hidden="true" className="rsvp-floral rsvp-floral-right" />
      <RsvpForm />
    </main>
  );
}
