# Avancement du projet : mémoire de travail

> Début de séance : lire seulement « État actuel » (les 60 premières lignes). Fin de séance : le mettre à jour (`/end-session`). Les journaux en bas sont l'historique : ne pas les relire en entier.
> Règle anti-conflit : chacun modifie seulement sa sous-section dans « État actuel » et son propre journal.

## État actuel

- Phase en cours : 1 · Fondations techniques (semaines 2 à 3)
- Avancement détaillé : cases cochées de `TASKS.md`

### Salah
- En cours : T14, routes publiques de lecture (catégories, marques, produits, détail) implémentées
- Dernière séance : 2026-10-17, T14 vérifiée en local (PostgreSQL) avec seed et contrôles des routes publiques
- Prochain pas : ouvrir la PR T14 et la faire relire avant fusion
- Bloquants : aucun

### Samad
- En cours : T13, préparer un jeu de données réaliste et l'importer avec un script
- Dernière séance : 2026-10-15, T13 vérifiée en local ; seed exécuté deux fois sans doublons
- Prochain pas : demander à Salah de relire T13, puis pousser et fusionner avant de cocher la tâche
- Bloquants : relecture et fusion en attente ; le seed refuse les bases Neon

## À retenir (10 lignes au maximum)

Faits utiles à tout moment. Jamais de mot de passe ni de clé ici.

- Dépôt GitHub : à compléter (T01)
- Lancer le frontend : `cd frontend` puis `npm run dev` (http://localhost:5173)
- Vérifier le frontend : depuis `frontend/`, `npm run lint` et `npm run build`
- Lancer l'API : depuis `backend/`, `npm install` puis `npm run dev` (T09)
- Base de données locale : `technoapp_local` sur `localhost:5432`
- Adresses en ligne (frontend, API) : à compléter (phase 5)
- Services à créer : Neon, Cloudinary, Render, Firebase Hosting

## Journal de Salah (le plus récent en haut)

### 2026-10-17
- Fait : T14 implémentée côté backend avec les routes `GET /api/categories`, `GET /api/brands`, `GET /api/products` et `GET /api/products/:slug`.
- Fait : validation des paramètres de la liste produits (pagination, tri et filtres) et réponses d'erreur alignées avec `docs/API.md`.
- Vérifié : tests en local sur PostgreSQL avec `db:deploy`, `db:seed`, puis contrôles manuels de `/api/health` et `/api/categories`.
- Sécurité : retour de `DATABASE_URL` vers Neon après les tests locaux ; seed utilisé uniquement sur la base locale.
- Prochain pas : commit de T14, ouverture de la PR et relecture avant fusion.

### 2026-10-09
- Fait : T06 terminée avec le cahier des charges et le schéma de la base dans `docs/Schéma_BDDtechnoApp.md`.
- Prochain pas : T08, définir ensemble le contrat d'API.

### 2026-10-10
- Fait : T08 terminée ; le contrat détaillé est aligné dans `docs/API.md`, avec les routes, paramètres, réponses et erreurs convenus.
- Fait : T09 terminée ; backend Express initialisé dans `backend/`, configuration d'environnement, dossiers de base et route `/api/health` ajoutés.
- Appris : une configuration centralisée et des réponses JSON d'erreur uniformes facilitent le démarrage et les tests de l'API.
- Prochain pas : T10, créer le schéma Prisma et les migrations.

### 2026-10-11
- Fait : schéma Prisma et migration initiale T10 ajoutés pour les catégories, marques, produits, images et administrateurs.
- Vérifié : `npm run db:validate` réussit depuis `backend/`.
- Sécurité : `.env.example` contient uniquement des valeurs fictives ; les secrets restent dans `.env`.
- Prochain pas : appliquer et tester la migration, puis faire relire et fusionner T10.

### 2026-10-12
- Fait : migration initiale appliquée sur Neon et vérifiée avec `db:status` et `db:deploy`.
- Vérifié : `db:validate` et `db:generate` réussissent depuis `backend/`.
- Expliqué : Prisma Studio peut être lancé avec `npx prisma studio` pour consulter et saisir des données de test.
- Prochain pas : ouvrir la PR T10 et la faire relire avant fusion.


## Journal de Samad (le plus récent en haut)

### 2026-10-15
- Vérifié : T13 fonctionne sur PostgreSQL local ; le seed exécuté deux fois laisse 8 catégories, 2 marques, 30 produits et 30 images, sans doublons.
- Vérifié : les produits en rupture et le nom très long sont présents ; le script refuse les URL Neon.
- Prochain pas : demander à Salah la relecture de T13, puis pousser et fusionner avant de cocher la tâche.
- Bloquants : relecture et fusion en attente.

### 2026-10-13
- Fait : T12 terminée et fusionnée dans `main` via la PR #9 ; composants réutilisables et interface client intégrés.
- Fait : script `backend/prisma/seed.js` créé avec les 8 catégories, 2 marques et 30 produits demandés ; chaque produit a une image provisoire.
- Vérifié : migration appliquée sur PostgreSQL local ; `npm run db:seed` exécuté deux fois. Les comptes restent à 8 catégories, 2 marques, 30 produits et 30 images, sans doublons ; 4 produits sont en rupture et le nom long est présent.
- Sécurité : le script refuse une URL Neon ; aucune donnée n'a été écrite en ligne.
- Prochain pas : partager la branche T13 avec Salah pour relecture, puis pousser et fusionner avant de cocher la tâche.
- Bloquants : relecture et fusion en attente.

### 2026-10-12
- Avancement : composants réutilisables (`ProductCard`, boutons, champs, chargement) et interface client retravaillés selon les maquettes, avec données fictives.
- Vérifié : `npm run lint` et `npm run build` réussis sur le frontend.
- À cette date, le partage et la fusion de T12 restaient à faire ; la tâche a été fusionnée dans `main` le 2026-10-13. T13 vient ensuite.

### 2026-10-11
- Fait : T11 fusionnée dans `main`.
- Prochain pas : T12.

### 2026-10-10
- Fait : initialisé React avec Vite, ajouté Tailwind et React Router, et créé la mise en page commune avec l'accueil et le catalogue.
- Appris : Tailwind s'intègre à Vite par son plugin ; React Router associe les URL aux pages.
- Vérifié : `npm run lint`, `npm run build` et réponses HTTP 200 sur `/` et `/produits`.
- Prochain pas : T12, créer les composants réutilisables avec des données fictives.
