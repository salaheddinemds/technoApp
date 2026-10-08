# Décisions du projet

> À lire avant de proposer un changement de stack, de format ou de règle. Une décision par ligne ; en ajouter à la fin avec le prochain ID libre, sans renuméroter. Pour en changer une : ajouter une nouvelle ligne qui la remplace et marquer l'ancienne « remplacée par D-0xx ».
> Statuts : **retenue** (dans le plan du 7 octobre 2026) · **à valider** (proposée par le kit Copilot) · **ouverte** (à trancher à la tâche indiquée).

## Retenues (plan du 7 octobre 2026)

- **D-001** (retenue) Stack : React + Vite + Tailwind CSS + React Router ; Node.js + Express ; PostgreSQL avec Prisma. Pourquoi : un seul langage (JavaScript), trois couches bien séparées, hébergement gratuit possible. Écartées : tout Firebase (NoSQL, filtres combinés plus contraignants) et Next.js (plus abstrait pour des débutants).
- **D-002** (retenue) PostgreSQL plutôt que MongoDB : un produit appartient à une catégorie et à une marque, des liens qui se gèrent naturellement avec des tables reliées.
- **D-003** (retenue) Connexion admin : JWT + bcrypt, un seul compte admin partagé par la marque au départ.
- **D-004** (retenue) Photos sur Cloudinary (plan gratuit, sans carte bancaire), jamais sur le disque du serveur (effacé à chaque redémarrage chez Render).
- **D-005** (retenue) Site vitrine : le client contacte la marque (téléphone, WhatsApp, e-mail). Pas de paiement en ligne ; MVP sans panier, comptes clients ni avis.
- **D-006** (retenue) Mise en ligne, parcours A (gratuit, sans moyen de paiement) : Firebase Hosting + Render + Neon + Cloudinary. Parcours B (API sur Cloud Run, plan Blaze) à envisager pour le site d'une vraie marque. Détails : `DEPLOYMENT.md`.
- **D-007** (retenue) Base en ligne : Neon, pas le PostgreSQL de Render (gratuit seulement 30 jours).
- **D-008** (retenue) Organisation : un dépôt avec les dossiers `frontend` et `backend` ; une branche par tâche (`T19-catalogue`) ; pull request relue par l'autre ; suivi dans GitHub Projects. Détails : `WORKFLOW.md`.
- **D-009** (retenue, à confirmer en T23) Une catégorie ou une marque qui contient des produits ne peut pas être supprimée tant que ces produits n'ont pas été déplacés ou supprimés.

## Propositions du kit (à valider ensemble)

- **D-010** (à valider) Langue : code, noms de colonnes, routes et messages de commit en anglais ; interface, documentation et réponses de Copilot en français. Une seule langue d'interface au départ ; la version multilingue est dans « Plus tard ».
- **D-011** (à valider) Modules ES (`import`/`export`) dans le frontend et le backend.
- **D-012** (à valider, T06) Prix : entier sans centimes, en dinars algériens (DA) par hypothèse. Disponible = `stock > 0`.
- **D-013** (à valider, T08) Contrat d'API : formes de réponse (`data`, `meta`, `error`) et noms des paramètres de recherche, dans `API.md`.
- **D-014** (ouverte, T25) Jeton JWT : envoyé dans l'en-tête `Authorization: Bearer`. Où le garder dans le navigateur : `localStorage` (simple, mais lisible par un script injecté) ou cookie `httpOnly` (plus sûr, mais demande des réglages CORS et une protection CSRF).
- **D-015** (à valider, T21) Compte admin : créé par le script `prisma/seed.js` à partir de `ADMIN_EMAIL` et `ADMIN_PASSWORD` du fichier `.env` ; mot de passe haché avec bcrypt.
- **D-016** (à valider, T16) Coordonnées de contact de la marque (téléphone, WhatsApp, e-mail) : constantes dans `frontend/src/config.js`, fournies par le client.
- **D-017** (à valider, T06) Caractéristiques d'un produit : un champ JSON `specs` (nom de la caractéristique → valeur).
