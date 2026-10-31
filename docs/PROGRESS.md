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
- En cours : T24 terminée ; prochaine tâche : T31 (référencement et vitesse)
- Dernière séance : 2026-10-31, upload multipart, validation des images et nettoyage Cloudinary ajoutés ; 6 tests automatisés réussis
- Prochain pas : commencer T31
- À noter : l'intégration avec un compte Cloudinary réel reste à vérifier

## À retenir (10 lignes au maximum)

Faits utiles à tout moment. Jamais de mot de passe ni de clé ici.

- Dépôt GitHub : à compléter (T01)
- Lancer le frontend : `cd frontend` puis `npm run dev` (http://localhost:5173)
- Vérifier le frontend : depuis `frontend/`, `npm run lint` et `npm run build`
- Lancer l'API : depuis `backend/`, `npm install` puis `npm run dev` ; tests : `npm test`
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

### 2026-10-31
- Fait : T24 cochée ; implémentation de l'upload d'images vers Cloudinary, des contrôles de format et de taille, et du nettoyage lors des suppressions.
- Appris : vérifier la signature du fichier est plus fiable que se fier à son extension ou au type MIME déclaré.
- Vérifié : 6 tests passent, dont les limites Multer de 5 Mio et 8 fichiers ; Prisma est valide et la route répond 401 sans jeton.
- À noter : envoi et suppression réels avec un compte Cloudinary non testés dans cette séance.
- Prochain pas : commencer T31, puis vérifier l'intégration Cloudinary dans un environnement configuré.

### 2026-10-31
- Fait : T23 implémentée avec les routes admin protégées de création, renommage et suppression des catégories et marques.
- Fait : validation des noms, génération de slugs uniques et réponses avec `productCount` ; la suppression renvoie `409 HAS_PRODUCTS` lorsqu’un produit est rattaché.
- Vérifié : création, doublon de nom, renommage, suppression et refus de suppression avec produits rattachés sur la base locale ; syntaxe JavaScript et schéma Prisma valides.
- Fusion : T23 fusionnée dans `main` ; tâche cochée dans `TASKS.md`.
- Prochain pas : commencer T24.

### 2026-10-30
- Fait : T22 implémentée localement avec les routes admin de liste, détail, création, modification et suppression des produits.
- Fait : validation des champs, des catégories/marques référencées et génération d'un slug unique ; les filtres de la liste publique sont réutilisés.
- Vérifié : schéma Prisma, syntaxe et chargement de l'application ; contrôles simulés de création, modification, suppression et validation.
- Commit : T22 poussée sur `samad-Dev` dans le commit `7084183`.
- Fusion : T22 fusionnée dans `main`.
- Prochain pas : poursuivre T23.

### 2026-10-26
- Fait : T20 terminée ; adaptation mobile, états vides et erreurs des pages client traités.
- Fait : erreurs 502/503/504 et réseau injoignable affichent le même message français sur l'accueil, le catalogue et les filtres ; détail technique masqué.
- Appris : le client API centralise la traduction des erreurs de disponibilité pour garder un message cohérent entre les pages.
- Vérifié : lint, build et `git diff --check` ; le navigateur affiche le message attendu sur l'accueil, les résultats et les filtres lors d'une indisponibilité 502.
- Prochain pas : faire relire et fusionner T19 et T20, puis commencer T21.
