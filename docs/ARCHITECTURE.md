# Architecture et données

> Source : plan du 7 octobre 2026. Ce qui est marqué « proposé » vient du kit Copilot et reste à valider (voir `DECISIONS.md`).

## Les quatre blocs

Seule l'API lit et écrit dans la base de données. Les pages n'y touchent jamais : elles passent par l'API, qui vérifie le jeton de l'admin avant toute modification.

```text
Navigateur : frontend React
  pages client : accueil, catalogue (recherche, filtres), fiche produit
  pages admin  : connexion, produits, catégories et marques
        │  requêtes HTTPS, réponses JSON (admin : avec un jeton JWT)
        ▼
Serveur : API Express sur Node.js
  routes publiques : lecture, recherche, filtres, tri, pagination
  routes admin protégées : vérifient le JWT, puis ajoutent, modifient, suppriment ; envoient les photos
        │  lecture / écriture                       │  envoi des photos
        ▼                                           ▼
PostgreSQL via Prisma                            Cloudinary
produits, catégories, marques,                   stocke les photos et les
images des produits, comptes admin               redimensionne à la demande
```

## Stack

| Couche | Choix |
|---|---|
| Frontend | React + Vite, Tailwind CSS, React Router |
| Backend | Node.js + Express |
| Base de données | PostgreSQL avec l'ORM Prisma |
| Connexion admin | JWT + bcrypt |
| Photos | Cloudinary |
| Travail à deux | Git + GitHub, GitHub Projects |
| Outils | VS Code, Thunder Client ou Postman, Figma |

## Arborescence (proposée, à créer en T09 à T11)

```text
catalogue-tech/
├─ .github/          instructions et prompts Copilot
├─ docs/             mémoire du projet
├─ frontend/         React + Vite
│  └─ src/           pages/client, pages/admin, components, services, hooks, utils
└─ backend/          Express + Prisma
   ├─ prisma/        schema.prisma, seed.js, migrations/
   └─ src/           routes, controllers, middleware, lib, utils
```

## Modèle de données

Cinq tables, reliées par des clés étrangères. Le plan les décrit en français ; dans le code et la base, les noms sont en anglais (proposé, D-010).

| Table | Colonnes | Liens |
|---|---|---|
| `categories` | `id`, `name`, `slug` | une catégorie contient plusieurs produits |
| `brands` | `id`, `name`, `slug` | une marque regroupe plusieurs produits |
| `products` | `id`, `name`, `slug`, `description`, `price`, `stock`, `specs`, `createdAt`, `categoryId`, `brandId` | appartient à une catégorie et à une marque |
| `product_images` | `id`, `url` (Cloudinary), `position`, `productId` | appartient à un produit, qui peut avoir plusieurs photos |
| `admins` | `id`, `email`, `passwordHash` | aucun lien ; sert à la connexion |

Correspondance avec le plan : nom = `name`, prix = `price`, caractéristiques = `specs`, date de création = `createdAt`, adresse de la photo = `url`, mot de passe haché = `passwordHash`.

Règles proposées :
- `slug` : unique, fabriqué à partir du nom (minuscules, sans accents, tirets), utilisé dans l'adresse des pages.
- `price` : entier, en DA (D-012). `stock` : entier supérieur ou égal à 0 ; « disponible » veut dire `stock > 0`.
- `specs` : objet JSON, nom de la caractéristique → valeur (D-017).
- `position` : 0 pour la photo principale, puis 1, 2, etc.
- Supprimer un produit supprime ses images (en base et sur Cloudinary). Supprimer une catégorie ou une marque qui a encore des produits est refusé (D-009).

## Variables d'environnement (proposées)

Jamais de vraies valeurs dans Git : chaque dossier a un `.env.example` sans secrets.

| Fichier | Variable | Rôle |
|---|---|---|
| `backend/.env` | `DATABASE_URL` | connexion PostgreSQL (en local, puis Neon) |
| `backend/.env` | `JWT_SECRET` | clé qui signe les jetons de connexion |
| `backend/.env` | `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | compte Cloudinary |
| `backend/.env` | `CORS_ORIGIN` | adresse du frontend autorisée (en local : `http://localhost:5173`) |
| `backend/.env` | `PORT` | port de l'API |
| `backend/.env` | `ADMIN_EMAIL`, `ADMIN_PASSWORD` | utilisées seulement par le seed pour créer l'admin (D-015) |
| `frontend/.env` | `VITE_API_URL` | adresse de l'API (en local : `http://localhost:3000/api`) |
