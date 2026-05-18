function notFoundHandler(_req, res, _next) {
  res.status(404).json({
    message: 'Route not found.',
  });
}

function errorHandler(error, _req, res, _next) {
  console.error(error);
  res.status(500).json({
    message: 'Internal server error.',
  });
}

export { notFoundHandler, errorHandler };
