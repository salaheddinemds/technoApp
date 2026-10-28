import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import prisma from '../lib/prisma.js';

function unauthorized(response) {
  response.status(401).json({
    error: {
      code: 'UNAUTHORIZED',
      message: 'Authentification requise.'
    }
  });
}

export async function requireAdmin(request, response, next) {
  const authorization = request.get('authorization');
  const match = authorization?.match(/^Bearer\s+(\S+)$/i);

  if (!match) {
    unauthorized(response);
    return;
  }

  let payload;
  try {
    payload = jwt.verify(match[1], config.jwtSecret, { algorithms: ['HS256'] });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      unauthorized(response);
      return;
    }

    throw error;
  }

  if (
    typeof payload === 'string'
    || typeof payload.sub !== 'string'
    || !/^[1-9]\d*$/.test(payload.sub)
    || !Number.isSafeInteger(Number(payload.sub))
  ) {
    unauthorized(response);
    return;
  }

  const admin = await prisma.admin.findUnique({
    where: { id: Number(payload.sub) },
    select: { id: true, email: true }
  });

  if (!admin) {
    unauthorized(response);
    return;
  }

  request.admin = admin;
  next();
}
