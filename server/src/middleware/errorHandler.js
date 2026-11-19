export function notFoundHandler(request, response, next) {
  const error = new Error(`Route not found: ${request.method} ${request.originalUrl}`);
  error.status = 404;
  next(error);
}

export function errorHandler(error, request, response, next) {
  if (response.headersSent) {
    next(error);
    return;
  }

  const status =
    error.status ||
    (error.name === "ValidationError" || error.name === "CastError" ? 400 : 500);

  if (status >= 500) {
    console.error(error);
  }

  response.status(status).json({
    message: status >= 500 ? "Internal server error" : error.message,
  });
}
