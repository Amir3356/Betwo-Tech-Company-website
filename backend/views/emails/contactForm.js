export default function contactFormEmail({ name, email, subject, message }) {
  return `
    <div style="font-family: 'Figtree', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">New Contact Message</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; font-weight: bold; color: #374151;">Name:</td><td style="padding: 8px; color: #111827;">${name.trim()}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #374151;">Email:</td><td style="padding: 8px; color: #111827;">${email.trim()}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #374151;">Subject:</td><td style="padding: 8px; color: #111827;">${(subject || "N/A").trim()}</td></tr>
      </table>
      <hr style="border: 1px solid #e5e7eb; margin: 16px 0;" />
      <p style="font-weight: bold; color: #374151;">Message:</p>
      <p style="color: #111827; white-space: pre-wrap;">${message.trim()}</p>
      <hr style="border: 1px solid #e5e7eb; margin: 16px 0;" />
      <p style="font-size: 12px; color: #9ca3af;">Sent from Betwo Tech contact form</p>
    </div>
  `;
}
