function contactSuccessView(submission) {
  return {
    message: 'Contact form saved successfully.',
    submission,
  };
}

function contactValidationErrorView(message) {
  return {
    message,
  };
}

function contactServerErrorView(message) {
  return {
    message,
  };
}

export {
  contactSuccessView,
  contactValidationErrorView,
  contactServerErrorView,
};
