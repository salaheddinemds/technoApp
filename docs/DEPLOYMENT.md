# Mise en ligne

> Source : plan du 7 octobre 2026. Offres consultées le 7 octobre 2026 ; elles changent souvent : relire les pages liées avant de s'engager. Tâches concernées : T33 à T38.

## Deux parcours

Le parcours A met le site en ligne gratuitement et sans moyen de paiement. Il suffit pour apprendre et faire une démo. Pour le site d'une vraie marque, le parcours B passe l'API sur Cloud Run, chez Google.

| Brique | Parcours A : gratuit, sans moyen de paiement | Parcours B : plus proche d'un vrai site (plan Blaze de Google) |
|---|---|---|
| Frontend | [Firebase Hosting](https://firebase.google.com/pricing), plan Spark : 10 Go de stockage, 360 Mo de transfert par jour | identique |
| API Node | [Render](https://render.com/docs/free), service web gratuit : s'endort après 15 min sans visite, environ 1 min pour se réveiller | [Cloud Run](https://cloud.google.com/run/pricing) : 2 millions de requêtes par mois dans le quota gratuit, facturé à l'usage au-delà ; demande un compte de facturation Google Cloud (plan Blaze dans Firebase) |
| Base PostgreSQL | [Neon](https://neon.com/pricing), plan gratuit permanent : 1 Go par projet, mise en veille après 5 min d'inactivité | identique ; Cloud SQL, le PostgreSQL de Google, est payant après l'essai (à partir d'environ 9 $ par mois selon la configuration) |
| Photos | [Cloudinary](https://cloudinary.com/pricing), plan gratuit : 25 crédits par mois, sans carte bancaire | identique |

## À savoir avant de choisir

- La base PostgreSQL gratuite de Render expire 30 jours après sa création, puis elle est supprimée après 14 jours de grâce si on ne passe pas à un plan payant : prendre Neon à la place.
- Le disque d'un service Render gratuit est effacé à chaque redémarrage : les photos vont sur Cloudinary, jamais sur le serveur (T24).
- Render déconseille son offre gratuite pour un site en production, et une API endormie fait attendre le premier visiteur environ une minute.
- Vercel est pratique pour React, mais son offre gratuite Hobby est réservée à un usage personnel non commercial ([règles Vercel](https://vercel.com/docs/plans/hobby)) : l'éviter pour le site d'une vraie marque.
- Google exécute le JavaScript, mais des pages générées côté serveur (option Next.js) se référencent plus facilement.

## Checklist par tâche (étapes proposées, à adapter)

- **T33** Base en ligne (Neon) : créer le projet, mettre la chaîne de connexion dans `DATABASE_URL`, appliquer les migrations (`npx prisma migrate deploy`), créer l'admin avec le seed, essayer une sauvegarde manuelle (par exemple avec `pg_dump`).
- **T34** API (Render ; Cloud Run pour le parcours B) : relier le dépôt (dossier `backend`), définir les commandes de build et de démarrage (par exemple `npm install && npx prisma generate`, puis `npm start`), renseigner les variables (`DATABASE_URL`, `JWT_SECRET`, `CLOUDINARY_*`, `CORS_ORIGIN`), apprendre à lire les journaux.
- **T35** Frontend (Firebase Hosting) : définir `VITE_API_URL` sur l'adresse de l'API avant `npm run build`, déployer le dossier `dist`, réécrire toutes les adresses vers `index.html` (nécessaire avec React Router), puis mettre l'adresse du site dans `CORS_ORIGIN` côté API.
- **T36** Nom de domaine et HTTPS, si vous en achetez un.
- **T37** Saisir les vrais produits (20 à 30) depuis l'admin et corriger ce qui gêne.
- **T38** README, démonstration et bilan.
- Ensuite : déclarer le site dans Google Search Console et soumettre un fichier `sitemap.xml`.

## Sources

Pages officielles ouvertes le 7 octobre 2026 : [Firebase](https://firebase.google.com/pricing) · [Cloud Run](https://cloud.google.com/run/pricing) · [Google Cloud gratuit](https://cloud.google.com/free) · [Render](https://render.com/docs/free) · [Neon](https://neon.com/pricing) · [Vercel Hobby](https://vercel.com/docs/plans/hobby) · [Cloudinary](https://cloudinary.com/pricing)
