# Archive de progression — octobre 2026

Entrées anciennes déplacées depuis `docs/PROGRESS.md`.

## Journal de Samad

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
