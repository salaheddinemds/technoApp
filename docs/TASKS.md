# Tâches du projet (T01 à T38)

> Source : plan de projet du 7 octobre 2026. Une journée de plan = 4 h de travail concentré par personne.
> Cocher `[x]` seulement quand la tâche fonctionne **et** est fusionnée dans `main`. Les tâches en cours se notent dans `docs/PROGRESS.md`, pas ici.
> « Les deux » : chacun y consacre les jours indiqués. « après » : tâches à terminer avant de commencer celle-ci.
> Format d'une ligne : `- [ ] **ID** Tâche — Qui · durée · après : dépendances`

Total : Salah 36 j · Samad 36,5 j · 72,5 jours de travail à deux.

## Phase 0 — Préparation et bases (Salah 7,5 j · Samad 8 j)

- [x] **T01** Installer l'environnement : VS Code, Node.js LTS, Git, compte GitHub, dépôt du projet — Les deux · 0,5 j · après : —
- [x] **T02** Apprendre Git et GitHub : commit, branche, pull request, conflit simple — Les deux · 0,5 j · après : T01
- [x] **T03** Réviser HTML, CSS et JavaScript moderne (fetch, async/await, modules) en construisant une petite page — Les deux · 3 j · après : T01
- [x] **T04** Comprendre HTTP, JSON et les API REST en testant une API publique avec Thunder Client — Les deux · 0,5 j · après : T03
- [x] **T05** Apprendre les bases de SQL : SELECT, INSERT, JOIN, clés étrangères — Les deux · 1 j · après : T01
- [x] **T06** Rédiger le cahier des charges et dessiner le schéma de la base (tables et relations) — Salah · 1,5 j · après : T05
- [x] **T07** Dessiner les maquettes des pages client et admin (Figma ou papier) — Samad · 2 j · après : T04
- [ ] **T08** Définir ensemble le contrat d'API : routes, paramètres, exemples de réponses JSON — Les deux · 0,5 j · après : T06, T07

## Phase 1 — Fondations techniques (Salah 3 j · Samad 4 j)

- [ ] **T09** Backend : initialiser Express, organiser les dossiers, variables d'environnement, route de test — Salah · 1 j · après : T08
- [ ] **T10** Base de données : créer PostgreSQL (local puis Neon), schéma Prisma, migrations — Salah · 2 j · après : T06, T09
- [ ] **T11** Frontend : initialiser React, Vite, Tailwind et React Router ; mise en page commune (en-tête, pied de page) — Samad · 2 j · après : T07
- [ ] **T12** Frontend : composants réutilisables (carte produit, boutons, champs, chargement) avec données fictives — Samad · 1 j · après : T11
- [ ] **T13** Préparer un jeu de données réaliste (marques, catégories, 30 produits) et l'importer avec un script — Samad · 1 j · après : T10

## Phase 2 — Espace client (Salah 7 j · Samad 8,5 j)

- [ ] **T14** API : lire les catégories, marques et produits (liste et détail d'un produit) — Salah · 2 j · après : T10
- [ ] **T15** API : recherche par mot-clé, filtres (catégorie, marque, prix, disponibilité), tri et pagination — Salah · 3 j · après : T14
- [ ] **T16** Page détail produit : galerie photo, description, caractéristiques, bouton de contact — Salah · 2 j · après : T12, T14
- [ ] **T17** Brancher le frontend sur l'API : appels, chargement, erreurs — Samad · 1 j · après : T14, T13
- [ ] **T18** Page d'accueil : bannière, catégories, derniers produits — Samad · 2 j · après : T12, T17
- [ ] **T19** Page catalogue : liste, recherche, panneau de filtres, tri, pagination (état dans l'URL) — Samad · 4 j · après : T15, T17
- [ ] **T20** Adaptation mobile, états vides et messages d'erreur — Samad · 1,5 j · après : T18, T19

## Phase 3 — Espace admin (rôles inversés) (Salah 9 j · Samad 10 j)

- [ ] **T21** API : connexion admin avec mot de passe haché (bcrypt), jeton JWT, routes protégées — Samad · 3 j · après : T10
- [ ] **T22** API : ajouter, modifier et supprimer un produit, avec validation des données — Samad · 3 j · après : T21
- [ ] **T23** API : gérer catégories et marques, avec la règle à appliquer si des produits y sont rattachés — Samad · 2 j · après : T21
- [ ] **T24** API : envoi des photos vers Cloudinary, avec contrôle du type et de la taille — Samad · 2 j · après : T22
- [ ] **T25** Page de connexion admin, routes protégées, mémorisation de la session — Salah · 2 j · après : T21
- [ ] **T26** Tableau de bord : liste des produits, recherche, suppression avec confirmation — Salah · 2 j · après : T22, T25
- [ ] **T27** Formulaire d'ajout et de modification d'un produit (champs, catégorie, marque, photos) — Salah · 3 j · après : T22, T24
- [ ] **T28** Écrans de gestion des catégories et des marques : liste, ajout, suppression — Salah · 2 j · après : T23, T25

## Phase 4 — Qualité et finitions (Salah 5 j · Samad 3,5 j)

- [ ] **T29** Sécurité de base : CORS, en-têtes Helmet, limite de requêtes, secrets dans le fichier .env — Salah · 1,5 j · après : T24
- [ ] **T30** Messages d'erreur clairs côté API et interface, page 404, validation des formulaires — Salah · 1,5 j · après : T28
- [ ] **T31** Référencement et vitesse : titres et descriptions de page, URLs lisibles, images allégées, favicon — Samad · 1,5 j · après : T20
- [ ] **T32** Tests manuels croisés avec une liste de contrôle, puis corrections — Les deux · 2 j · après : T29, T30, T31

## Phase 5 — Mise en ligne (Salah 4,5 j · Samad 2,5 j)

- [ ] **T33** Base de données en ligne (Neon), migrations, essai de sauvegarde manuelle — Salah · 1 j · après : T32
- [ ] **T34** Déployer l'API (Render ou Cloud Run), variables d'environnement, lecture des journaux — Salah · 1,5 j · après : T33
- [ ] **T35** Déployer le frontend (Firebase Hosting) et le relier à l'API, CORS de production — Samad · 1 j · après : T34
- [ ] **T36** Nom de domaine et HTTPS, si vous en achetez un — Salah · 0,5 j · après : T35
- [ ] **T37** Saisir les vrais produits (20 à 30) depuis l'admin et corriger ce qui gêne — Les deux · 1 j · après : T35
- [ ] **T38** README, démonstration et bilan : ce que vous avez appris, ce qui reste à améliorer — Les deux · 0,5 j · après : T37

## Plus tard (hors MVP : n'y toucher qu'après la phase 5)

- Demande de devis ou panier
- Comptes clients avec liste de souhaits
- Comparateur de produits
- Avis
- Import de produits par fichier CSV
- Statistiques de visites
- Version multilingue
