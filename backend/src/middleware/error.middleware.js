export function notFoundHandler(_request, response) {
  response.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: 'Route inconnue.'
    }
  });
}

export function errorHandler(error, _request, response, _next) {
  console.error(error);

  response.status(500).json({
    error: {
      code: 'SERVER_ERROR',
      message: 'Une erreur inattendue est survenue.'
    }
  });
}
