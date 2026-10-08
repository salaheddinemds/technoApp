---
description: "Conventions Express, Prisma et PostgreSQL pour le dossier backend"
applyTo: "backend/**"
---
# Backend (Node.js + Express + Prisma + PostgreSQL)

- Modules ES, `async/await`. Une route = un contrôleur court ; la logique répétée va dans `src/lib` ou `src/utils`.
- Dossiers : `src/routes`, `src/controllers`, `src/middleware`, `src/lib` (client Prisma, Cloudinary), `prisma/schema.prisma`, `prisma/seed.js`.
- Le contrat est `docs/API.md` : si le code et le contrat divergent, propose de mettre le contrat à jour au lieu de le contourner.
- API REST JSON sous `/api`. Lecture publique ; écriture seulement sous `/api/admin/*`, derrière le middleware JWT.
- Succès : `{ data, meta? }`. Erreur : `{ error: { code, message } }` avec le bon statut HTTP (400, 401, 404, 409, 500).
- Valide chaque entrée (corps, paramètres, query) avant de toucher à la base. Accès à la base uniquement via Prisma ; jamais de SQL construit par concaténation.
- Mots de passe : bcrypt. Jeton : JWT signé avec `JWT_SECRET`. Ne renvoie jamais `passwordHash`.
- Prisma : modèles en PascalCase au singulier, tables en snake_case au pluriel (`@@map`), comme dans `docs/ARCHITECTURE.md` ; une migration nommée par changement de schéma.
- Suppression : refuse (409) celle d'une catégorie ou d'une marque qui a encore des produits. Supprimer un produit supprime ses images en base et sur Cloudinary.
- Photos : envoi vers Cloudinary avec contrôle du type et de la taille ; on ne garde en base que l'URL.
- Configuration : variables `DATABASE_URL`, `JWT_SECRET`, `CLOUDINARY_*`, `CORS_ORIGIN`, `PORT` (et `ADMIN_EMAIL`, `ADMIN_PASSWORD` pour le seed), lues dans un seul fichier de config ; `.env.example` toujours à jour.
- Sécurité de base (T29) : CORS limité à `CORS_ORIGIN`, Helmet, limite de requêtes sur la connexion admin.
