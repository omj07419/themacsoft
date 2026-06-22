type ContactPayload = {
  formType: "contact";
  fullName: string;
  email: string;
  message: string;
};

type AppointmentPayload = {
  formType: "appointment";
  fullName: string;
  email: string;
  date: string;
  time: string;
  consultationArea: string;
  brief: string;
};

export type LeadPayload = ContactPayload | AppointmentPayload;

const wrapper = (title: string, body: string) => `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#09090b;font-family:'Segoe UI',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#09090b;padding:32px 0;">
      <tr>
        <td align="center">
          <table width="560" cellpadding="0" cellspacing="0" style="background:#111114;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background:linear-gradient(90deg,#22d3ee,#a855f7);padding:18px 28px;">
                <span style="color:#09090b;font-size:18px;font-weight:800;letter-spacing:0.5px;">THEMACSOFT</span>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 28px 8px;">
                <h2 style="color:#f4f4f5;margin:0 0 16px;font-size:20px;">${title}</h2>
                ${body}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 28px;border-top:1px solid rgba(255,255,255,0.08);">
                <p style="color:#a1a1aa;font-size:12px;margin:0;">TheMacSoft · info@themacsoft.com</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

const row = (label: string, value: string) => `
  <tr>
    <td style="padding:8px 0;color:#a1a1aa;font-size:13px;width:160px;vertical-align:top;">${label}</td>
    <td style="padding:8px 0;color:#f4f4f5;font-size:14px;">${escapeHtml(value)}</td>
  </tr>
`;

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildAdminEmail(payload: LeadPayload) {
  if (payload.formType === "contact") {
    const body = `
      <table width="100%" cellpadding="0" cellspacing="0">
        ${row("Full Name", payload.fullName)}
        ${row("Email", payload.email)}
        ${row("Message", payload.message)}
      </table>
    `;
    return {
      subject: `New Contact Form Submission — ${payload.fullName}`,
      html: wrapper("New Contact Message", body),
    };
  }

  const body = `
    <table width="100%" cellpadding="0" cellspacing="0">
      ${row("Full Name", payload.fullName)}
      ${row("Email", payload.email)}
      ${row("Date", payload.date)}
      ${row("Time", payload.time)}
      ${row("Consultation Area", payload.consultationArea)}
      ${row("Briefing Notes", payload.brief)}
    </table>
  `;
  return {
    subject: `New Appointment Request — ${payload.fullName}`,
    html: wrapper("New Appointment Booking", body),
  };
}

export function buildUserReceiptEmail(payload: LeadPayload) {
  if (payload.formType === "contact") {
    const body = `
      <p style="color:#d4d4d8;font-size:14px;line-height:1.6;">
        Hi ${escapeHtml(payload.fullName)}, thanks for reaching out to TheMacSoft. We've received your
        message and a member of our team will get back to you shortly.
      </p>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
        ${row("Your Message", payload.message)}
      </table>
    `;
    return {
      subject: "We've received your message — TheMacSoft",
      html: wrapper("Thanks for contacting us!", body),
    };
  }

  const body = `
    <p style="color:#d4d4d8;font-size:14px;line-height:1.6;">
      Hi ${escapeHtml(payload.fullName)}, your consultation request has been logged. Our team will
      confirm your slot shortly. Here's what you booked:
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
      ${row("Date", payload.date)}
      ${row("Time", payload.time)}
      ${row("Consultation Area", payload.consultationArea)}
      ${row("Briefing Notes", payload.brief)}
    </table>
  `;
  return {
    subject: "Your appointment request is confirmed — TheMacSoft",
    html: wrapper("Appointment Received", body),
  };
}
