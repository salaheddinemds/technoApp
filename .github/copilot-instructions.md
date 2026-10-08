# Catalogue Tech : instructions pour Copilot

Site catalogue pour une marque tech : espace client (recherche, filtres) et espace admin (produits, catégories, marques). Salah et Samad, deux frères débutants, le construisent en « learning by doing » sur 8 à 10 semaines.

## Stack (n'en change pas sans demander)
- `frontend/` : React + Vite, Tailwind CSS, React Router. JavaScript, pas TypeScript.
- `backend/` : Node.js + Express, Prisma, PostgreSQL (Neon en ligne), JWT + bcrypt, Cloudinary pour les photos.
- Un seul dépôt GitHub ; modules ES (`import`/`export`) partout.

## Contexte détaillé : à ouvrir seulement si la question l'exige
- Où on en est, prochaine étape : `docs/PROGRESS.md` (section « État actuel », en haut)
- Tâches T01 à T38 : `docs/TASKS.md` · décisions : `docs/DECISIONS.md`
- Fonctionnalités : `docs/PROJECT.md` · données et architecture : `docs/ARCHITECTURE.md` · routes de l'API : `docs/API.md`
- Git : `docs/WORKFLOW.md` · mise en ligne : `docs/DEPLOYMENT.md`

## Comment répondre
- En français, court et concret. Code, noms (variables, colonnes, routes) et messages de commit en anglais ; textes affichés à l'écran en français.
- Ils apprennent : explique le pourquoi en 2 ou 3 phrases et propose le plus petit pas qui marche, pas toute la fonctionnalité d'un coup, sauf demande explicite.
- Modifie seulement ce qui est demandé (petits diffs). Pas de nouvelle bibliothèque, de nouveau dossier ni de refactorisation sans l'avoir proposé d'abord.
- S'il manque une information (route, règle métier), pose la question au lieu d'inventer. Si une décision est durable, propose de l'ajouter à `docs/DECISIONS.md`.

## Règles du projet
- Seule l'API Express lit et écrit dans la base ; le frontend appelle l'API en JSON (`/api/...`).
- Routes admin protégées par un jeton JWT ; mots de passe hachés avec bcrypt ; aucun secret en clair dans le code.
- Les secrets vivent dans `.env` (jamais sur GitHub) ; tenir `.env.example` à jour, sans vraies valeurs.
- Les photos vont sur Cloudinary, jamais sur le disque du serveur.
- Valide toutes les données reçues par l'API. Une catégorie ou une marque qui contient encore des produits ne peut pas être supprimée.
- Hors MVP, ne pas construire : panier, paiement en ligne, comptes clients, avis.
- Jamais de commande destructrice (suppression en masse, `git reset --hard`, `prisma migrate reset`, `DROP`) sans me la montrer et attendre mon accord.

## Git
- Une branche par tâche (`T19-catalogue`), une pull request relue par l'autre frère ; `main` ne reçoit que du code relu.
- Commits : `feat|fix|docs|chore(portée): message`, en anglais.

## Mémoire du projet
- Fin de séance : cocher `docs/TASKS.md`, mettre à jour `docs/PROGRESS.md` et, si besoin, `docs/DECISIONS.md` (prompt `/end-session`).
- Chacun modifie seulement sa section dans `docs/PROGRESS.md`.
