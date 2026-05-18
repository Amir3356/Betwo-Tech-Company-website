import { contactValidationErrorView } from '../views/contactView.js';

function validateContactSubmission(req, res, next) {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json(
      contactValidationErrorView('Name, email, subject, and message are required.')
    );
  }

  return next();
}

export default validateContactSubmission;
