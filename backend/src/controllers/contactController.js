import { createContactSubmission as saveContactSubmission } from '../models/contactModel.js';
import { contactServerErrorView, contactSuccessView } from '../views/contactView.js';

async function handleCreateContactSubmission(req, res) {
  const { name, email, subject, message } = req.body || {};

  try {
    const submission = await saveContactSubmission({ name, email, subject, message });

    return res.status(201).json(contactSuccessView(submission));
  } catch (error) {
    console.error('Failed to save contact submission:', error);
    return res.status(500).json(contactServerErrorView('Failed to save contact submission.'));
  }
}

export { handleCreateContactSubmission };
