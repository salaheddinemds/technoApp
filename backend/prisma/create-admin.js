import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
const resetPassword = process.argv.includes('--reset-password');

if (!process.env.DATABASE_URL?.trim()) {
  throw new Error('DATABASE_URL est absent. Configurez backend/.env.');
}

if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
  throw new Error('ADMIN_EMAIL doit contenir une adresse e-mail valide.');
}

const prisma = new PrismaClient();

try {
  const existingAdmin = await prisma.admin.findUnique({
    where: { email },
    select: { email: true }
  });

  if (existingAdmin && !resetPassword) {
    console.info(`Le compte admin existe déjà pour ${email}.`);
  } else {
    if (!password || Buffer.byteLength(password, 'utf8') > 72) {
      throw new Error('ADMIN_PASSWORD doit être renseigné et contenir au plus 72 octets.');
    }

    const passwordHash = await bcrypt.hash(password, 12);

    if (existingAdmin) {
      await prisma.admin.update({
        where: { email },
        data: { passwordHash }
      });
      console.info(`Mot de passe admin réinitialisé pour ${email}.`);
    } else {
      const admin = await prisma.admin.create({
        data: { email, passwordHash },
        select: { id: true, email: true }
      });
      console.info(`Compte admin créé : ${admin.email} (id ${admin.id}).`);
    }
  }
} catch (error) {
  if (error?.code === 'P2002') {
    if (resetPassword) {
      if (!password || Buffer.byteLength(password, 'utf8') > 72) {
        throw new Error('ADMIN_PASSWORD doit être renseigné et contenir au plus 72 octets.');
      }

      const passwordHash = await bcrypt.hash(password, 12);
      await prisma.admin.update({
        where: { email },
        data: { passwordHash }
      });
      console.info(`Mot de passe admin réinitialisé pour ${email}.`);
    } else {
      console.info(`Le compte admin existe déjà pour ${email}.`);
    }
  } else {
    throw error;
  }
} finally {
  await prisma.$disconnect();
}
