import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { buildAdminEmail, buildUserReceiptEmail, type LeadPayload } from "@/lib/emailTemplates";

const ADMIN_RECIPIENT = "om@themacsoft.com";
const SENDER_ADDRESS = "contact@themacsoft.com";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validatePayload(body: any): { valid: boolean; error?: string; payload?: LeadPayload } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Invalid request body." };
  }

  const { formType, fullName, email } = body;

  if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
    return { valid: false, error: "Full name is required." };
  }
  if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
    return { valid: false, error: "A valid email address is required." };
  }

  if (formType === "contact") {
    const { message } = body;
    if (!message || typeof message !== "string" || !message.trim()) {
      return { valid: false, error: "Message details are required." };
    }
    return {
      valid: true,
      payload: { formType: "contact", fullName, email, message },
    };
  }

  if (formType === "appointment") {
    const { date, time, consultationArea, brief } = body;
    if (!date || !time || !consultationArea || !brief) {
      return { valid: false, error: "All appointment fields are required." };
    }
    return {
      valid: true,
      payload: { formType: "appointment", fullName, email, date, time, consultationArea, brief },
    };
  }

  return { valid: false, error: "Unknown form type." };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { valid, error, payload } = validatePayload(body);

    if (!valid || !payload) {
      return NextResponse.json({ error: error || "Invalid submission." }, { status: 400 });
    }

    if (!process.env.SMTP_PASSWORD) {
      console.error("SMTP_PASSWORD environment variable is not set.");
      return NextResponse.json(
        { error: "Email service is not configured. Please try again later." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.themacsoft.com",
      port: 465,
      secure: true,
      auth: {
        user: SENDER_ADDRESS,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const admin = buildAdminEmail(payload);
    const receipt = buildUserReceiptEmail(payload);

    await Promise.all([
      transporter.sendMail({
        from: `"TheMacSoft" <${SENDER_ADDRESS}>`,
        to: ADMIN_RECIPIENT,
        replyTo: payload.email,
        subject: admin.subject,
        html: admin.html,
      }),
      transporter.sendMail({
        from: `"TheMacSoft" <${SENDER_ADDRESS}>`,
        to: payload.email,
        subject: receipt.subject,
        html: receipt.html,
      }),
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("send-email error:", err);
    return NextResponse.json(
      { error: "Something went wrong while sending your message. Please try again." },
      { status: 500 }
    );
  }
}
