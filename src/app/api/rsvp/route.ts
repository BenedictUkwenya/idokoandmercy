import { NextResponse } from "next/server";

import { buildGuestConfirmationEmail, buildPlannerNotificationEmail } from "@/lib/email-templates";
import { getNotifyEmail, getResendClient, getResendFromEmail } from "@/lib/resend";
import { rsvpSchema } from "@/lib/rsvp-schema";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = rsvpSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstIssue?.message ?? "Invalid form data." },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const supabase = createSupabaseAdmin();

    const { data: record, error: insertError } = await supabase
      .from("rsvps")
      .insert({
        email: data.email,
        full_name: data.fullName,
        phone: data.phone,
        wedding_attendance: data.weddingAttendance,
        guest_count: data.weddingAttendance === "accepts" ? data.guestCount ?? null : null,
        guest_names: data.weddingAttendance === "accepts" ? data.guestNames ?? null : null,
        traditional_attendance: data.traditionalAttendance,
        song_request: data.songRequest || null,
        special_notes: data.specialNotes || null,
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json({ error: "Could not save your RSVP. Please try again." }, { status: 500 });
    }

    const resend = getResendClient();
    const fromEmail = getResendFromEmail();
    const guestEmail = buildGuestConfirmationEmail(data);
    const notifyEmail = getNotifyEmail();

    const guestSend = await resend.emails.send({
      from: `Idoko & Mercy Wedding <${fromEmail}>`,
      to: data.email,
      subject: guestEmail.subject,
      html: guestEmail.html,
    });

    if (guestSend.error) {
      console.error("Resend guest email error:", guestSend.error);
      return NextResponse.json(
        {
          error:
            "Your RSVP was saved, but we could not send the confirmation email yet. Please contact the couple directly.",
        },
        { status: 502 },
      );
    }

    if (notifyEmail) {
      const plannerEmail = buildPlannerNotificationEmail(data);
      const notifySend = await resend.emails.send({
        from: `Wedding RSVP <${fromEmail}>`,
        to: notifyEmail,
        subject: plannerEmail.subject,
        html: plannerEmail.html,
      });

      if (notifySend.error) {
        console.error("Resend notify email error:", notifySend.error);
      }
    }

    await supabase.from("rsvps").update({ confirmation_email_sent: true }).eq("id", record.id);

    return NextResponse.json({ success: true, id: record.id });
  } catch (error) {
    console.error("RSVP API error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
