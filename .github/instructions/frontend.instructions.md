---
description: "Conventions React, Vite et Tailwind pour le dossier frontend"
applyTo: "frontend/**"
---
# Frontend (React + Vite + Tailwind + React Router)

- JavaScript (`.jsx`), composants fonctionnels et hooks. Un composant par fichier, nom en PascalCase ; hooks nommés `useXxx`.
- Dossiers : `src/pages/client`, `src/pages/admin`, `src/components`, `src/services`, `src/hooks`, `src/utils`.
- Tous les appels réseau passent par `src/services/api.js` (fetch + JSON, base `import.meta.env.VITE_API_URL`). Jamais de `fetch` directement dans un composant.
- Respecte les formes de réponse de `docs/API.md`. Tant que l'API n'existe pas (T11 à T13), utilise des données fictives qui suivent exactement ce contrat.
- Chaque écran gère trois états : chargement, erreur, liste vide.
- Catalogue : l'état de la recherche et des filtres vit dans l'URL (`useSearchParams`), avec les mêmes noms que l'API : `q`, `category`, `brand`, `minPrice`, `maxPrice`, `inStock`, `sort`, `page`.
- Styles : classes Tailwind, mobile d'abord (`sm:`, `md:`) ; pas de CSS sur mesure sauf nécessité.
- Liens internes avec `<Link>`. Pages admin sous `/admin`, protégées par un composant `RequireAdmin` ; le jeton part dans l'en-tête `Authorization: Bearer ...` (où le garder : voir D-014 dans `docs/DECISIONS.md`).
- URL des pages : voir `docs/PROJECT.md`.
- Textes d'interface en français ; `alt` sur les images, `label` sur les champs de formulaire.
- Aucun secret dans le frontend : tout ce qui commence par `VITE_` est public.
- Pas de `dangerouslySetInnerHTML`.
