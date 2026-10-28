export function notFoundHandler(_request, response) {
  response.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: 'Route inconnue.'
    }
  });
}

export function errorHandler(error, _request, response, _next) {
  if (error.type === 'entity.parse.failed') {
    response.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Le corps JSON est invalide.'
      }
    });
    return;
  }

  console.error(error);

  response.status(error.statusCode ?? 500).json({
    error: {
      code: error.code ?? 'SERVER_ERROR',
      message: error.statusCode ? error.message : 'Une erreur inattendue est survenue.',
      ...(error.details ? { details: error.details } : {})
    }
  });
}
