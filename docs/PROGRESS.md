# Avancement du projet : mémoire de travail

> Début de séance : lire seulement « État actuel » (les 60 premières lignes). Fin de séance : le mettre à jour (`/end-session`). Les journaux en bas sont l'historique : ne pas les relire en entier.
> Règle anti-conflit : chacun modifie seulement sa sous-section dans « État actuel » et son propre journal.

## État actuel

- Phase en cours : 2 · Espace client (semaines 3 à 5)
- Avancement détaillé : cases cochées de `TASKS.md`

### Salah
- En cours : aucune ; T16 est terminée et fusionnée dans `main` via la PR #15
- Dernière séance : 2026-10-20, page détail branchée sur l'API et vérifiée avec galerie, description, caractéristiques et boutons de contact
- Prochain pas : commencer T25 après la fin de T21, dont Samad est responsable
- Bloquants : T25 dépend de T21

### Samad
- En cours : T18 terminée localement ; commit, relecture et fusion restent à faire avant de cocher la tâche
- Dernière séance : 2026-10-25, accueil restylé selon la maquette ; éléments communs, catalogue et contact également restylés sans modifier les appels API ni les états
- Prochain pas : committer et faire fusionner T18 ; ensuite, terminer T19, notamment recherche et pagination synchronisée avec l'URL
- Bloquants : aucun

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

### 2026-10-25
- Fait : accueil T18 terminé localement avec bannière, catégories, derniers produits et appel à l'action ; design aligné sur les maquettes.
- Fait : éléments communs, catalogue et contact restylés ; fiche produit de Salah non modifiée.
- Vérifié : `npm run lint`, `npm run build` et `git diff --check` réussis après chaque étape de la refonte.
- À faire : commit, relecture et fusion avant de cocher T18 ; T19 reste à compléter, notamment recherche et pagination avec état dans l'URL.
- Note : les maquettes mobiles citées dans le README sont absentes ; T20 responsive détaillée reste à traiter lorsque ces maquettes seront disponibles.

### 2026-10-23
- Fait : T17 fusionnée dans `main` via la PR #16 ; l'accueil et le catalogue chargent les catégories et les produits depuis l'API.
- Vérifié : `npm run lint`, `npm run build` et `git diff --check` réussis depuis `frontend/`.
- Prochain pas : T18, compléter la page d'accueil avec les catégories et les derniers produits.

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
