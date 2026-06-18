import { z } from "zod";

export const attendanceChoice = z.enum(["accepts", "declines"]);

export const rsvpSchema = z
  .object({
    email: z.string().trim().email("Enter a valid email address."),
    fullName: z.string().trim().min(2, "Enter your full name."),
    phone: z.string().trim().min(7, "Enter a valid phone number."),
    weddingAttendance: attendanceChoice,
    guestCount: z.coerce.number().int().min(1).max(20).optional(),
    guestNames: z.string().trim().optional(),
    traditionalAttendance: attendanceChoice,
    songRequest: z.string().trim().max(300).optional(),
    specialNotes: z.string().trim().max(1000).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.weddingAttendance === "accepts") {
      if (!data.guestCount) {
        ctx.addIssue({
          code: "custom",
          message: "Enter the number of guests attending.",
          path: ["guestCount"],
        });
      }

      if (!data.guestNames || data.guestNames.length < 2) {
        ctx.addIssue({
          code: "custom",
          message: "Provide the full names of your guests.",
          path: ["guestNames"],
        });
      }
    }
  });

export type RsvpInput = z.infer<typeof rsvpSchema>;

export type RsvpRecord = {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  wedding_attendance: "accepts" | "declines";
  guest_count: number | null;
  guest_names: string | null;
  traditional_attendance: "accepts" | "declines";
  song_request: string | null;
  special_notes: string | null;
  confirmation_email_sent: boolean;
  created_at: string;
};
