"use server";

import { Resend } from "resend";
import he from "he";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
}) {
    const name = he.encode(formData.name);
    const email = he.encode(formData.email);
    const subject = he.encode(formData.subject);
    const message = he.encode(formData.message).replace(/\n/g, "<br>");

    await resend.emails.send({
        from: "Contact <onboarding@resend.dev>",
        to: ["benlamineriadh@gmail.com"],
        subject: `📩 ${subject}`,
        replyTo: email,
        html: `
      <h3>New Contact Message</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
    });
}
