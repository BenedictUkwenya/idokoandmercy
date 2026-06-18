import type { RsvpInput } from "@/lib/rsvp-schema";

function escapeHtml(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function attendanceLabel(value: "accepts" | "declines") {
  return value === "accepts" ? "Joyfully accepts" : "Regretfully declines";
}

type GuestEmailContent = {
  subject: string;
  headline: string;
  paragraphs: string[];
  summary: Array<{ label: string; value: string }>;
  closing: string;
};

function buildGuestEmailContent(data: RsvpInput): GuestEmailContent {
  const weddingAccepts = data.weddingAttendance === "accepts";
  const traditionalAccepts = data.traditionalAttendance === "accepts";

  const summary: Array<{ label: string; value: string }> = [
    { label: "Wedding celebration", value: attendanceLabel(data.weddingAttendance) },
    { label: "Traditional ceremony", value: attendanceLabel(data.traditionalAttendance) },
  ];

  if (weddingAccepts && data.guestCount) {
    summary.push({
      label: "Guests attending",
      value: `${data.guestCount} guest${data.guestCount === 1 ? "" : "s"}`,
    });
  }

  if (weddingAccepts && data.guestNames) {
    summary.push({ label: "Guest names", value: data.guestNames });
  }

  if (data.songRequest) {
    summary.push({ label: "Song request", value: data.songRequest });
  }

  if (bothAccept(weddingAccepts, traditionalAccepts)) {
    return {
      subject: "We cannot wait to celebrate with you — Idoko & Mercy",
      headline: "Your RSVP is confirmed",
      paragraphs: [
        `Dear ${data.fullName},`,
        "What wonderful news. We are overjoyed that you will be with us for both the traditional ceremony and the wedding celebration.",
        "Your response has been received, and we are already looking forward to sharing this beautiful chapter with you.",
      ],
      summary,
      closing: "With love and gratitude,",
    };
  }

  if (weddingAccepts && !traditionalAccepts) {
    return {
      subject: "Your wedding RSVP is confirmed — Idoko & Mercy",
      headline: "We will celebrate with you",
      paragraphs: [
        `Dear ${data.fullName},`,
        "Thank you for letting us know you will be joining us for the wedding celebration.",
        "We understand you will not be able to attend the traditional ceremony, and we are still so happy you will be part of our special day.",
      ],
      summary,
      closing: "With warm wishes,",
    };
  }

  if (!weddingAccepts && traditionalAccepts) {
    return {
      subject: "Thank you for your RSVP — Idoko & Mercy",
      headline: "We are grateful you will join us",
      paragraphs: [
        `Dear ${data.fullName},`,
        "Thank you for confirming that you will be with us for the traditional ceremony.",
        "That moment means a great deal to us, and we are thankful you will be there.",
      ],
      summary,
      closing: "With appreciation,",
    };
  }

  return {
    subject: "Thank you for your response — Idoko & Mercy",
    headline: "We received your RSVP",
    paragraphs: [
      `Dear ${data.fullName},`,
      "Thank you for taking the time to respond to our wedding invitation.",
      "While we are sorry you will not be able to join us in person, please know you are in our thoughts and hearts as we prepare for this season.",
    ],
    summary,
    closing: "With love,",
  };
}

function bothAccept(weddingAccepts: boolean, traditionalAccepts: boolean) {
  return weddingAccepts && traditionalAccepts;
}

function renderSummaryRows(summary: Array<{ label: string; value: string }>) {
  return summary
    .map(
      (row) => `
        <tr>
          <td style="padding: 0.55rem 0; border-bottom: 1px solid #e8dfd0; color: #6a6156; font-size: 13px; width: 42%; vertical-align: top;">
            ${escapeHtml(row.label)}
          </td>
          <td style="padding: 0.55rem 0; border-bottom: 1px solid #e8dfd0; color: #1c1712; font-size: 14px; font-weight: 600; vertical-align: top;">
            ${escapeHtml(row.value)}
          </td>
        </tr>
      `,
    )
    .join("");
}

function renderEmailShell({
  headline,
  paragraphs,
  summary,
  closing,
}: Omit<GuestEmailContent, "subject">) {
  const paragraphHtml = paragraphs
    .map(
      (paragraph) => `
        <p style="margin: 0 0 16px; color: #4f473d; font-family: Georgia, 'Times New Roman', serif; font-size: 16px; line-height: 1.75;">
          ${escapeHtml(paragraph)}
        </p>
      `,
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RSVP Confirmation</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4efe3;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4efe3; padding: 32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 560px; background-color: #fffdf9; border: 1px solid #eadfce; border-radius: 12px; overflow: hidden; box-shadow: 0 12px 30px rgba(28, 23, 18, 0.08);">
            <tr>
              <td style="height: 6px; background: linear-gradient(90deg, #b8942f, #d9b84a, #e8cc72);"></td>
            </tr>
            <tr>
              <td style="padding: 34px 32px 18px; text-align: center; background: linear-gradient(180deg, rgba(247, 232, 216, 0.35), rgba(255, 253, 249, 0));">
                <p style="margin: 0 0 10px; color: #b8942f; font-family: Arial, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;">
                  With love
                </p>
                <h1 style="margin: 0; color: #1c1712; font-family: Georgia, 'Times New Roman', serif; font-size: 34px; font-weight: 600; line-height: 1.1;">
                  Mercy &amp; Idoko
                </h1>
                <p style="margin: 10px 0 0; color: #8a7f72; font-family: Georgia, 'Times New Roman', serif; font-size: 15px; font-style: italic;">
                  Wedding RSVP confirmation
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 32px 0;">
                <h2 style="margin: 0 0 18px; color: #1c1712; font-family: Georgia, 'Times New Roman', serif; font-size: 24px; font-weight: 600; text-align: center;">
                  ${escapeHtml(headline)}
                </h2>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 32px 8px;">
                ${paragraphHtml}
              </td>
            </tr>
            <tr>
              <td style="padding: 0 32px 24px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #fbf6ee; border: 1px solid #eadfce; border-radius: 10px; padding: 14px 16px;">
                  <tr>
                    <td>
                      <p style="margin: 0 0 10px; color: #b8942f; font-family: Arial, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;">
                        Your response
                      </p>
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                        ${renderSummaryRows(summary)}
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 32px 28px;">
                <p style="margin: 0 0 6px; color: #1c1712; font-family: Georgia, 'Times New Roman', serif; font-size: 16px;">
                  ${escapeHtml(closing)}
                </p>
                <p style="margin: 0; color: #1c1712; font-family: Georgia, 'Times New Roman', serif; font-size: 20px; font-weight: 600;">
                  Mercy &amp; Idoko
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 18px 32px 28px; background-color: #f7f0e4; text-align: center;">
                <p style="margin: 0; color: #8a7f72; font-family: Arial, sans-serif; font-size: 12px; line-height: 1.6;">
                  Saturday, 12th December 2026<br />
                  Grand Palace Hall, Victoria Island
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
}

export function buildGuestConfirmationEmail(data: RsvpInput) {
  const content = buildGuestEmailContent(data);

  if (data.specialNotes) {
    content.paragraphs.push(
      "We have also noted your message and will do our best to make your experience as special as possible.",
    );
  }

  if (data.songRequest && bothAccept(data.weddingAttendance === "accepts", data.traditionalAttendance === "accepts")) {
    content.paragraphs.push("We loved your song request and will do our best to get you on the dance floor.");
  } else if (data.songRequest && data.weddingAttendance === "accepts") {
    content.paragraphs.push("Thank you for your song request. We will try our best to play it for you.");
  }

  return {
    subject: content.subject,
    html: renderEmailShell(content),
  };
}

export function buildPlannerNotificationEmail(data: RsvpInput) {
  return {
    subject: `New RSVP — ${data.fullName}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #1f1a14; line-height: 1.6;">
        <h2>New RSVP received</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
        <p><strong>Wedding:</strong> ${attendanceLabel(data.weddingAttendance)}</p>
        <p><strong>Traditional ceremony:</strong> ${attendanceLabel(data.traditionalAttendance)}</p>
        ${
          data.weddingAttendance === "accepts"
            ? `<p><strong>Guests:</strong> ${escapeHtml(String(data.guestCount ?? ""))}<br />${escapeHtml(data.guestNames ?? "")}</p>`
            : ""
        }
        ${data.songRequest ? `<p><strong>Song request:</strong> ${escapeHtml(data.songRequest)}</p>` : ""}
        ${data.specialNotes ? `<p><strong>Notes:</strong> ${escapeHtml(data.specialNotes)}</p>` : ""}
      </div>
    `,
  };
}
