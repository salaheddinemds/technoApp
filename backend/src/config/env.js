import 'dotenv/config';

const port = Number.parseInt(process.env.PORT ?? '3000', 10);
const jwtSecret = process.env.JWT_SECRET ?? '';
const jwtExpiresIn = process.env.JWT_EXPIRES_IN ?? '8h';
const corsOrigin = process.env.CORS_ORIGIN?.trim() || 'http://localhost:5173';
const adminSignupCode = process.env.ADMIN_SIGNUP_CODE?.trim() ?? '';

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535.');
}

if (Buffer.byteLength(jwtSecret, 'utf8') < 32) {
  throw new Error('JWT_SECRET must contain at least 32 bytes.');
}

let parsedCorsOrigin;
try {
  parsedCorsOrigin = new URL(corsOrigin);
} catch {
  throw new Error('CORS_ORIGIN must be a valid HTTP(S) origin.');
}

if (
  !['http:', 'https:'].includes(parsedCorsOrigin.protocol)
  || parsedCorsOrigin.origin !== corsOrigin
) {
  throw new Error('CORS_ORIGIN must contain only an HTTP(S) origin without a path.');
}

export const config = {
  port,
  corsOrigin,
  databaseUrl: process.env.DATABASE_URL ?? '',
  jwtSecret,
  jwtExpiresIn,
  adminSignupCode,
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? '',
    apiKey: process.env.CLOUDINARY_API_KEY ?? '',
    apiSecret: process.env.CLOUDINARY_API_SECRET ?? ''
  }
};
