"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
}) {
    await resend.emails.send({
        from: "Contact <onboarding@resend.dev>",
        to: ["benlamineriadh@gmail.com"],
        subject: `📩 ${formData.subject}`,
        replyTo: formData.email,
        html: `
      <h3>New Contact Message</h3>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Message:</strong></p>
      <p>${formData.message}</p>
    `,
    });
}
