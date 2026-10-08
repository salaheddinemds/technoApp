# Projet : site web catalogue Tech

> Source : plan de projet du 7 octobre 2026 (Salah et Samad). Ce fichier dit **quoi** construire. Les tâches sont dans `TASKS.md`, les choix techniques dans `DECISIONS.md`.

## Objectif

Un catalogue web complet pour une marque tech : un site pour les clients (parcourir, chercher et filtrer les produits) et un espace admin (ajouter, modifier et supprimer articles, catégories et marques). Projet en « learning by doing » : Salah et Samad apprennent le frontend, le backend et la base de données sur le même projet, en 8 à 10 semaines à deux, à raison de 4 h par jour chacun.

## Périmètre du MVP

- Inclus : recherche et filtres côté client ; ajout, modification et suppression d'articles, de catégories et de marques côté admin ; mise en ligne.
- Hors MVP (liste « Plus tard » de `TASKS.md`) : panier, paiement en ligne, comptes clients, avis. Rien de tout cela avant la fin de la phase 5.

## Hypothèses du plan (à corriger si elles sont fausses)

- Le catalogue regroupe des produits de plusieurs marques tech : d'où une table `brands` en plus de `categories`.
- Salah et Samad ont déjà quelques bases de HTML, CSS et JavaScript ; sinon, ajouter 1 à 2 semaines au début.
- Une journée de plan = 4 h de travail concentré par personne, 5 jours par semaine.
- Le site est une vitrine : le client contacte la marque (téléphone, WhatsApp, e-mail), sans paiement en ligne.
- Un seul compte admin au départ, partagé par la marque.

## Pages et tâches

Les URL sont proposées (à valider en T08).

| Espace | Page | L'utilisateur peut | URL | Tâches |
|---|---|---|---|---|
| Client | Accueil | voir les catégories et les derniers produits | `/` | T18 |
| Client | Catalogue | chercher par mot-clé ; filtrer par catégorie, marque, prix et disponibilité ; trier ; changer de page | `/produits` | T15, T19 |
| Client | Fiche produit | voir photos, description, caractéristiques et prix ; contacter la marque | `/produits/:slug` | T16 |
| Admin | Connexion | se connecter avec un e-mail et un mot de passe | `/admin/login` | T21, T25 |
| Admin | Produits | lister, chercher et supprimer un article, avec confirmation | `/admin/produits` | T22, T26 |
| Admin | Formulaire produit | ajouter ou modifier un article : nom, prix, description, caractéristiques, stock, catégorie, marque, photos | `/admin/produits/nouveau`, `/admin/produits/:id/modifier` | T22, T24, T27 |
| Admin | Catégories et marques | ajouter et supprimer des catégories et des marques | `/admin/categories-marques` | T23, T28 |

## Règle de suppression

Une catégorie ou une marque qui contient encore des produits ne peut pas être supprimée tant que ces produits n'ont pas été déplacés ou supprimés. C'est le choix le plus sûr pour débuter ; à confirmer à la tâche T23.

## Équipe et rôles

- Salah et Samad font chacun environ 36 jours de 4 h et touchent aux trois couches.
- Phases 1 et 2 : Salah commence par la base de données et l'API, Samad par le frontend. Phase 3 (espace admin) : ils inversent leurs rôles.
- Pour ne jamais attendre l'autre, le frontend travaille d'abord sur des données fictives qui respectent le contrat d'API (T08, `API.md`).
- Les phases avancent ensemble : celui qui finit sa part en avance relit le code de l'autre ou prépare la phase suivante.

## Calendrier (rythme normal : 4 h par jour, 5 jours par semaine)

La durée d'une phase suit le plus lent des deux. Chemin critique : 40 jours de plan, soit 8 semaines, ou 10 avec une marge de 20 % pour les imprévus.

| Phase | Jours de plan (cumul) | Semaines (approx.) |
|---|---|---|
| 0 · Préparation et bases | 0 → 8 | 1 à 2 |
| 1 · Fondations techniques | 8 → 12 | 2 à 3 |
| 2 · Espace client | 12 → 20,5 | 3 à 5 |
| 3 · Espace admin (rôles inversés) | 20,5 → 30,5 | 5 à 7 |
| 4 · Qualité et finitions | 30,5 → 35,5 | 7 à 8 |
| 5 · Mise en ligne | 35,5 → 40 | 8 |

Autres rythmes (sans marge → avec marge de 20 %) : intensif, 8 h par jour : 4 → 5 semaines ; léger, 10 h par semaine : 16 → 19 semaines.

## Glossaire

- **MVP** : première version utilisable, sans les extras.
- **Slug** : version lisible du nom dans l'adresse d'une page (par exemple `casque-bluetooth-pro`), utile pour le référencement.
- **Contrat d'API** : liste convenue des routes, paramètres et réponses JSON (T08, `API.md`).
