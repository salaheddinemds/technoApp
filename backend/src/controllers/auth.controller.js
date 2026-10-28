import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import prisma from '../lib/prisma.js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const dummyPasswordHash = '$2b$12$7Pa54RP2wAYUZU4KfZ/vB.oZY9MmM1UzKDJcFEhYVJUbG83iAf.jq';

function validationError(response, message) {
  response.status(400).json({
    error: {
      code: 'VALIDATION_ERROR',
      message
    }
  });
}

export async function login(request, response) {
  const { email, password } = request.body ?? {};

  if (
    typeof email !== 'string'
    || email.trim().length > 254
    || !emailPattern.test(email.trim())
    || typeof password !== 'string'
    || password.length === 0
    || Buffer.byteLength(password, 'utf8') > 72
  ) {
    validationError(response, 'Adresse e-mail ou mot de passe invalide.');
    return;
  }

  const admin = await prisma.admin.findUnique({
    where: { email: email.trim().toLowerCase() },
    select: { id: true, email: true, passwordHash: true }
  });

  const passwordMatches = await bcrypt.compare(password, admin?.passwordHash ?? dummyPasswordHash);
  if (!admin || !passwordMatches) {
    response.status(401).json({
      error: {
        code: 'INVALID_CREDENTIALS',
        message: 'Identifiants incorrects'
      }
    });
    return;
  }

  const token = jwt.sign(
    { sub: String(admin.id) },
    config.jwtSecret,
    { algorithm: 'HS256', expiresIn: config.jwtExpiresIn }
  );

  response.json({
    data: {
      token,
      admin: { id: admin.id, email: admin.email }
    }
  });
}

export function getCurrentAdmin(request, response) {
  response.json({
    data: {
      id: request.admin.id,
      email: request.admin.email
    }
  });
}
