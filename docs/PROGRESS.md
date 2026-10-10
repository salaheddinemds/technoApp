# Avancement du projet : mémoire de travail

> Début de séance : lire seulement « État actuel » (les 60 premières lignes). Fin de séance : le mettre à jour (`/end-session`). Les journaux en bas sont l'historique : ne pas les relire en entier.
> Règle anti-conflit : chacun modifie seulement sa sous-section dans « État actuel » et son propre journal.

## État actuel

- Phase en cours : 1 · Fondations techniques (semaines 2 à 3)
- Avancement détaillé : cases cochées de `TASKS.md`

### Salah
- En cours : rien
- Dernière séance : 2026-10-10, T09 terminée
- Prochain pas : T10
- Bloquants : aucun

### Samad
- En cours : T11, frontend initialisé ; PR et fusion à faire
- Dernière séance : 2026-10-10, T11 en cours
- Prochain pas : relire le frontend, puis ouvrir la PR T11
- Bloquants : revue et fusion de T11 en attente

## À retenir (10 lignes au maximum)

Faits utiles à tout moment. Jamais de mot de passe ni de clé ici.

- Dépôt GitHub : à compléter (T01)
<<<<<<< HEAD
- Lancer l'API : à compléter (T09)
- Lancer le frontend : `cd frontend` puis `npm run dev` (http://localhost:5173)
- Vérifier le frontend : depuis `frontend/`, `npm run lint` et `npm run build`
=======
- Lancer l'API : `cd backend`, puis `npm install` et `npm run dev` (T09)
- Lancer le frontend : à compléter (T11)
>>>>>>> main
- Base de données locale : à compléter (T10)
- Adresses en ligne (frontend, API) : à compléter (phase 5)
- Services à créer : Neon, Cloudinary, Render, Firebase Hosting

## Journal de Salah (le plus récent en haut)

### 2026-10-09
- Fait : T06 terminée avec le cahier des charges et le schéma de la base dans `docs/Schéma_BDDtechnoApp.md`.
- Prochain pas : T08, définir ensemble le contrat d'API.

### 2026-10-10
- Fait : T08 terminée ; le contrat détaillé est aligné dans `docs/API.md`, avec les routes, paramètres, réponses et erreurs convenus.
- Fait : T09 terminée ; backend Express initialisé dans `backend/`, configuration d'environnement, dossiers de base et route `/api/health` ajoutés.
- Appris : une configuration centralisée et des réponses JSON d'erreur uniformes facilitent le démarrage et les tests de l'API.
- Prochain pas : T10, créer le schéma Prisma et les migrations.


## Journal de Samad (le plus récent en haut)

### 2026-10-10
- Fait : initialisé React avec Vite, ajouté Tailwind et React Router, et créé la mise en page commune avec l'accueil et le catalogue.
- Appris : Tailwind s'intègre à Vite par son plugin ; React Router associe les URL aux pages.
- Vérifié : `npm run lint`, `npm run build` et réponses HTTP 200 sur `/` et `/produits`.
- Prochain pas : relire les changements et ouvrir la PR T11 pour revue et fusion.
