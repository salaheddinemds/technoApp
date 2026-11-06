import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import prisma from '../lib/prisma.js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9 ()-]{8,20}$/;
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

export async function signup(request, response) {
  if (!config.adminSignupCode) {
    response.status(503).json({
      error: {
        code: 'SIGNUP_NOT_CONFIGURED',
        message: 'La création de comptes administrateurs n’est pas configurée.'
      }
    });
    return;
  }

  const { email, password, name, firstName, phone, signupCode } = request.body ?? {};
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  const normalizedName = typeof name === 'string' ? name.trim() : '';
  const normalizedFirstName = typeof firstName === 'string' ? firstName.trim() : '';
  const normalizedPhone = typeof phone === 'string' ? phone.trim() : '';

  if (
    !emailPattern.test(normalizedEmail)
    || normalizedEmail.length > 254
    || typeof password !== 'string'
    || password.length < 12
    || Buffer.byteLength(password, 'utf8') > 72
    || normalizedName.length < 2
    || normalizedName.length > 80
    || normalizedFirstName.length < 2
    || normalizedFirstName.length > 80
    || !phonePattern.test(normalizedPhone)
    || typeof signupCode !== 'string'
    || signupCode !== config.adminSignupCode
  ) {
    validationError(response, 'Les informations d’inscription ou le code sont invalides.');
    return;
  }

  const existingAdmin = await prisma.admin.findUnique({
    where: { email: normalizedEmail },
    select: { id: true }
  });

  if (existingAdmin) {
    response.status(409).json({
      error: {
        code: 'EMAIL_TAKEN',
        message: 'Cette adresse e-mail est déjà utilisée.'
      }
    });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const admin = await prisma.admin.create({
    data: {
      email: normalizedEmail,
      passwordHash,
      name: normalizedName,
      firstName: normalizedFirstName,
      phone: normalizedPhone
    },
    select: { id: true, email: true, name: true, firstName: true, phone: true }
  });

  response.status(201).json({ data: admin });
}

export function getCurrentAdmin(request, response) {
  response.json({
    data: {
      id: request.admin.id,
      email: request.admin.email
    }
  });
}
