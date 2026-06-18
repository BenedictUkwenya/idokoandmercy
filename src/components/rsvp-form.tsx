"use client";

import { type FormEvent, useState } from "react";

type Attendance = "accepts" | "declines";

type FormState = {
  email: string;
  fullName: string;
  phone: string;
  weddingAttendance: Attendance | "";
  guestCount: string;
  guestNames: string;
  traditionalAttendance: Attendance | "";
  songRequest: string;
  specialNotes: string;
};

const initialState: FormState = {
  email: "",
  fullName: "",
  phone: "",
  weddingAttendance: "",
  guestCount: "",
  guestNames: "",
  traditionalAttendance: "",
  songRequest: "",
  specialNotes: "",
};

export function RsvpForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          fullName: form.fullName,
          phone: form.phone,
          weddingAttendance: form.weddingAttendance,
          guestCount: form.guestCount ? Number(form.guestCount) : undefined,
          guestNames: form.guestNames,
          traditionalAttendance: form.traditionalAttendance,
          songRequest: form.songRequest,
          specialNotes: form.specialNotes,
        }),
      });

      const result = (await response.json()) as { error?: string; success?: boolean };

      if (!response.ok) {
        setError(result.error ?? "Could not submit your RSVP.");
        return;
      }

      setIsSuccess(true);
      setForm(initialState);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="rsvp-card rsvp-success">
        <div className="rsvp-card-accent" aria-hidden="true" />
        <div className="rsvp-header-floral" aria-hidden="true" />
        <p className="rsvp-eyebrow">With love</p>
        <h1>Thank you!</h1>
        <p>Your RSVP has been received. A confirmation email is on its way to you.</p>
        <button className="rsvp-submit" onClick={() => setIsSuccess(false)} type="button">
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <form className="rsvp-form" onSubmit={handleSubmit}>
      <section className="rsvp-card rsvp-card-hero">
        <div className="rsvp-card-accent" aria-hidden="true" />
        <div className="rsvp-header-floral" aria-hidden="true" />
        <div className="rsvp-hero-inner">
          <p className="rsvp-eyebrow">You are warmly invited</p>
          <div aria-hidden="true" className="rsvp-hero-divider">
            <span>✦</span>
          </div>
          <p className="rsvp-hero-label">RSVP</p>
          <h1 className="rsvp-hero-names">Mercy &amp; Idoko</h1>
          <p className="rsvp-hero-note">We cannot wait to celebrate with you.</p>
        </div>
      </section>

      <section className="rsvp-card">
        <label className="rsvp-field">
          <span>
            Email <span className="rsvp-required">*</span>
          </span>
          <input
            autoComplete="email"
            name="email"
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="Your email"
            required
            type="email"
            value={form.email}
          />
        </label>

        <label className="rsvp-field">
          <span>
            Your name <span className="rsvp-required">*</span>
          </span>
          <input
            autoComplete="name"
            name="fullName"
            onChange={(event) => updateField("fullName", event.target.value)}
            placeholder="Your name"
            required
            type="text"
            value={form.fullName}
          />
        </label>

        <label className="rsvp-field">
          <span>
            Phone number <span className="rsvp-required">*</span>
          </span>
          <input
            autoComplete="tel"
            name="phone"
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="Your phone number"
            required
            type="tel"
            value={form.phone}
          />
        </label>

        <p className="rsvp-helper rsvp-helper-warm">
          Kindly provide your email and phone number so we can keep you updated and reach out if needed.
        </p>
      </section>

      <section className="rsvp-card rsvp-card-bloom">
        <fieldset className="rsvp-fieldset">
          <legend>
            Will you be attending our wedding? <span className="rsvp-required">*</span>
          </legend>
          <label className="rsvp-choice">
            <input
              checked={form.weddingAttendance === "accepts"}
              name="weddingAttendance"
              onChange={() => updateField("weddingAttendance", "accepts")}
              required={!form.weddingAttendance}
              type="radio"
              value="accepts"
            />
            <span>Joyfully accepts</span>
          </label>
          <label className="rsvp-choice">
            <input
              checked={form.weddingAttendance === "declines"}
              name="weddingAttendance"
              onChange={() => updateField("weddingAttendance", "declines")}
              type="radio"
              value="declines"
            />
            <span>Regretfully declines</span>
          </label>
        </fieldset>

        {form.weddingAttendance === "accepts" && (
          <div className="rsvp-conditional">
            <label className="rsvp-field">
              <span>
                Number of guests attending <span className="rsvp-required">*</span>
              </span>
              <input
                min={1}
                name="guestCount"
                onChange={(event) => updateField("guestCount", event.target.value)}
                placeholder="e.g. 2"
                required
                type="number"
                value={form.guestCount}
              />
            </label>

            <label className="rsvp-field">
              <span>
                Full names of guests <span className="rsvp-required">*</span>
              </span>
              <textarea
                name="guestNames"
                onChange={(event) => updateField("guestNames", event.target.value)}
                placeholder="List the full names of everyone attending"
                required
                rows={3}
                value={form.guestNames}
              />
            </label>
          </div>
        )}

        <p className="rsvp-helper">
          If yes, kindly indicate the number of guests attending and provide their full names.
        </p>
      </section>

      <section className="rsvp-card rsvp-card-bloom">
        <fieldset className="rsvp-fieldset">
          <legend>
            Will you be attending our traditional ceremony? <span className="rsvp-required">*</span>
          </legend>
          <label className="rsvp-choice">
            <input
              checked={form.traditionalAttendance === "accepts"}
              name="traditionalAttendance"
              onChange={() => updateField("traditionalAttendance", "accepts")}
              required={!form.traditionalAttendance}
              type="radio"
              value="accepts"
            />
            <span>Joyfully accepts</span>
          </label>
          <label className="rsvp-choice">
            <input
              checked={form.traditionalAttendance === "declines"}
              name="traditionalAttendance"
              onChange={() => updateField("traditionalAttendance", "declines")}
              type="radio"
              value="declines"
            />
            <span>Regretfully declines</span>
          </label>
        </fieldset>
      </section>

      <section className="rsvp-card">
        <label className="rsvp-field">
          <span>Tell us a song that will get you dancing</span>
          <input
            name="songRequest"
            onChange={(event) => updateField("songRequest", event.target.value)}
            placeholder="Your song request"
            type="text"
            value={form.songRequest}
          />
        </label>
        <p className="rsvp-helper">We&apos;ll try to play it for you.</p>
      </section>

      <section className="rsvp-card">
        <label className="rsvp-field">
          <span>Is there anything else we should know to make your experience special?</span>
          <textarea
            name="specialNotes"
            onChange={(event) => updateField("specialNotes", event.target.value)}
            placeholder="Dietary needs, accessibility requests, or a sweet note"
            rows={4}
            value={form.specialNotes}
          />
        </label>
      </section>

      {error && (
        <p className="rsvp-error" role="alert">
          {error}
        </p>
      )}

      <button className="rsvp-submit" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Sending your RSVP..." : "Send my RSVP"}
      </button>
    </form>
  );
}
