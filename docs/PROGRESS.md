# Avancement du projet : mémoire de travail

> Début de séance : lire seulement « État actuel » (les 60 premières lignes). Fin de séance : le mettre à jour (`/end-session`). Les journaux en bas sont l'historique : ne pas les relire en entier.
> Règle anti-conflit : chacun modifie seulement sa sous-section dans « État actuel » et son propre journal.

## État actuel

- Phase en cours : 3 · Espace admin (rôles inversés) (semaines 5 à 7)
- Avancement détaillé : cases cochées de `TASKS.md`

### Salah
- En cours : préparation de T25 (page de connexion admin, routes protégées et session)
- Dernière séance : T21 validé, la base d'authentification admin est maintenant en place et prête à servir la couche interface
- Prochain pas : finaliser T25 puis avancer sur T27 et T28 selon le calendrier de phase 3
- Bloquants : T25 n'a plus de blocage après la validation de T21

### Samad
- En cours : T22 implémentée localement ; gestion des produits protégée par JWT et validée avant revue/fusion
- Dernière séance : 2026-10-30, routes admin de liste, détail, création, modification et suppression des produits ajoutées
- Prochain pas : faire relire et fusionner T22, puis poursuivre T23 et T24
- Bloquants : aucun ; T22 reste à relire et fusionner avant de cocher la tâche

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

### 2026-10-20
- Fait : T16 implémentée avec l'appel `GET /api/products/:slug`, les états de chargement et d'erreur, la galerie photo, la description et les caractéristiques.
- Fait : boutons de contact Appeler et WhatsApp ajoutés sur la fiche produit.
- Corrigé : proxy Vite local ajouté pour relayer `/api` vers l'API Express sur le port 3000.
- Vérifié : `npm run lint`, `npm run build`, `git diff --check` et ouverture d'une fiche réelle avec le slug du seed.
- Prochain pas : commit, push et pull request pour relecture avant fusion.

### 2026-10-17
- Fait : T14 implémentée côté backend avec les routes `GET /api/categories`, `GET /api/brands`, `GET /api/products` et `GET /api/products/:slug`.
- Fait : validation des paramètres de la liste produits (pagination, tri et filtres) et réponses d'erreur alignées avec `docs/API.md`.
- Vérifié : tests en local sur PostgreSQL avec `db:deploy`, `db:seed`, puis contrôles manuels de `/api/health` et `/api/categories`.
- Sécurité : retour de `DATABASE_URL` vers Neon après les tests locaux ; seed utilisé uniquement sur la base locale.
- Prochain pas : commit de T14, ouverture de la PR et relecture avant fusion.

### 2026-10-19
- Fait : T15 vérifiée avec la recherche par mot-clé, les filtres de catégorie, marque, prix et disponibilité, le tri et la pagination.
- Fait : validation renforcée des paramètres de query ; les valeurs répétées ou invalides renvoient `400 VALIDATION_ERROR`.
- Vérifié : API locale avec 30 produits ; recherche `cartable`, filtre `scolaire`, `inStock=true`, tri `price_asc` et pagination `page=2&limit=5`.
- Important : `backend/.env` utilise la base PostgreSQL locale et ne doit pas être commité ; le seed refuse Neon.
- Prochain pas : committer uniquement le code et `docs/TASKS.md`, pousser la branche, puis ouvrir la PR pour relecture.

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

### 2026-10-30
- Fait : T22 implémentée localement avec les routes admin de liste, détail, création, modification et suppression des produits.
- Fait : validation des champs, des catégories/marques référencées et génération d'un slug unique ; les filtres de la liste publique sont réutilisés.
- Vérifié : schéma Prisma, syntaxe et chargement de l'application ; contrôles simulés de création, modification, suppression et validation.
- Prochain pas : revue et fusion de T22, puis commencer T23.

### 2026-10-26
- Fait : T20 terminée ; adaptation mobile, états vides et erreurs des pages client traités.
- Fait : erreurs 502/503/504 et réseau injoignable affichent le même message français sur l'accueil, le catalogue et les filtres ; détail technique masqué.
- Appris : le client API centralise la traduction des erreurs de disponibilité pour garder un message cohérent entre les pages.
- Vérifié : lint, build et `git diff --check` ; le navigateur affiche le message attendu sur l'accueil, les résultats et les filtres lors d'une indisponibilité 502.
- Prochain pas : faire relire et fusionner T19 et T20, puis commencer T21.

### 2026-10-26
- Fait : T20 complétée avec recherche et navigation adaptées aux petits écrans, formulaires catalogue empilés sur mobile et fiche produit responsive.
- Fait : états vides documentés sur les pages client ; nouvelle tentative ajoutée aux erreurs de chargement de la fiche produit.
- Vérifié : lint, build et `git diff --check` réussis ; contrôle navigateur à 320, 375, 768 et 1280 px sans débordement horizontal, avec recherche et liens de navigation visibles à 320 px.
- Limite de vérification : l'API répondait 502 dans l'environnement navigateur ; les états d'erreur et boutons Réessayer s'affichent, mais les réponses réussies de l'API n'ont pas pu être vérifiées dans ce contrôle.
- Prochain pas : faire relire et fusionner T19 et T20, puis commencer T21.

### 2026-10-25
- Fait : accueil T18 terminé localement avec bannière, catégories, derniers produits et appel à l'action ; design aligné sur les maquettes.
- Fait : éléments communs, catalogue et contact restylés ; fiche produit de Salah non modifiée.
- Vérifié : `npm run lint`, `npm run build` et `git diff --check` réussis après chaque étape de la refonte.
- Commit : T18 enregistrée sur `samad-Dev` dans le commit `4571cb7`.
- Fusion : T18 fusionnée dans `main` via la PR #17.
- Fait : T19 implémentée sur `samad-Dev` dans le commit `81a9985` : recherche, filtres, tri, pagination avec état dans l'URL et message « Cette page n’existe pas » pour une page hors plage.
- Vérifié : `npm run lint`, `npm run build` et `git diff --check`.
- À faire à cette date : relecture et fusion de T19 dans `main`, avant de commencer T20.

### 2026-10-23
- Fait : T17 fusionnée dans `main` via la PR #16 ; l'accueil et le catalogue chargent les catégories et les produits depuis l'API.
- Vérifié : `npm run lint`, `npm run build` et `git diff --check` réussis depuis `frontend/`.
- Prochain pas : T18, compléter la page d'accueil avec les catégories et les derniers produits.

### 2026-10-15
- Vérifié : T13 fonctionne sur PostgreSQL local ; le seed exécuté deux fois laisse 8 catégories, 2 marques, 30 produits et 30 images, sans doublons.
- Vérifié : les produits en rupture et le nom très long sont présents ; le script refuse les URL Neon.
- Prochain pas : demander à Salah la relecture de T13, puis pousser et fusionner avant de cocher la tâche.
- Bloquants : relecture et fusion en attente.
