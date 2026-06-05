import transporter from "../config/Mail.js";
import contactFormEmail from "../views/emails/contactForm.js";
import { createMessage, getAllMessages, deleteMessageById } from "../models/contact.model.js";

export async function createContactMessage(req, res) {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required." });
  }

  try {
    const newMessage = await createMessage({ name, email, subject, message });

    await transporter.sendMail({
      from: `"Contact Form" <${process.env.SMTP_EMAIL}>`,
      to: process.env.SMTP_EMAIL,
      replyTo: email.trim(),
      subject: `New Contact Message from ${name.trim()}`,
      html: contactFormEmail({ name, email, subject, message }),
    });

    return res.status(201).json({ message: "Message sent successfully.", data: newMessage });
  } catch (error) {
    console.error("Failed to send message:", error);
    return res.status(500).json({ message: "Failed to send message.", error: error.message });
  }
}

export async function getContactMessages(req, res) {
  try {
    const messages = await getAllMessages();
    return res.json({ data: messages });
  } catch (error) {
    console.error("Failed to fetch contact messages:", error);
    return res.status(500).json({ message: "Failed to load messages." });
  }
}

export async function deleteContactMessage(req, res) {
  const { id } = req.params;

  try {
    const rowCount = await deleteMessageById(id);

    if (rowCount === 0) {
      return res.status(404).json({ message: "Message not found." });
    }

    return res.json({ message: "Message deleted." });
  } catch (error) {
    console.error("Failed to delete contact message:", error);
    return res.status(500).json({ message: "Failed to delete message." });
  }
}
