import multer from 'multer';

export function notFoundHandler(_request, response) {
  response.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: 'Route inconnue.'
    }
  });
}

export function errorHandler(error, _request, response, _next) {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      response.status(413).json({
        error: {
          code: 'FILE_TOO_LARGE',
          message: 'Chaque photo doit faire 5 Mio au maximum.'
        }
      });
      return;
    }

    response.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: error.code === 'LIMIT_UNEXPECTED_FILE'
          ? 'Utilisez le champ « images » et envoyez 8 photos au maximum.'
          : 'La requête ne peut contenir que 8 photos au maximum.'
      }
    });
    return;
  }

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
