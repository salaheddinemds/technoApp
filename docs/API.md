# Contrat d'API (brouillon à valider en T08)

> Statut : **brouillon** proposé par le kit Copilot. À relire et corriger ensemble en T08 ; ensuite, ce fichier fait foi pour le frontend et le backend. Toute modification de route passe d'abord par ici.

Base : `/api` · JSON en UTF-8 · dates en ISO 8601 · prix en DA, entiers (D-012).

## Formes de réponse

- Succès : `{ "data": ... }`. Liste paginée : `{ "data": [...], "meta": { "page": 1, "limit": 12, "total": 30, "totalPages": 3 } }`.
- Erreur : `{ "error": { "code": "VALIDATION_ERROR", "message": "Le prix doit être un entier positif." } }`.
- Codes : 400 `VALIDATION_ERROR` · 401 `UNAUTHORIZED` · 404 `NOT_FOUND` · 409 `CONFLICT` · 500 `SERVER_ERROR`.

## Objets

`ProductCard` (dans les listes) :

```json
{
  "id": 1, "name": "Casque Bluetooth Pro", "slug": "casque-bluetooth-pro",
  "price": 12900, "stock": 5, "image": "https://res.cloudinary.com/exemple/1.jpg",
  "category": { "name": "Audio", "slug": "audio" },
  "brand": { "name": "Marque X", "slug": "marque-x" }
}
```

`Product` (fiche produit) :

```json
{
  "id": 1, "name": "Casque Bluetooth Pro", "slug": "casque-bluetooth-pro",
  "description": "Casque sans fil à réduction de bruit.", "price": 12900, "stock": 5,
  "specs": { "Autonomie": "30 h", "Bluetooth": "5.3" },
  "createdAt": "2026-10-08T10:00:00Z",
  "category": { "id": 2, "name": "Audio", "slug": "audio" },
  "brand": { "id": 3, "name": "Marque X", "slug": "marque-x" },
  "images": [ { "id": 7, "url": "https://res.cloudinary.com/exemple/1.jpg", "position": 0 } ]
}
```

`Category` et `Brand` : `{ "id": 2, "name": "Audio", "slug": "audio", "productCount": 12 }`.

## Routes publiques

| Méthode | Route | Rôle | Tâche |
|---|---|---|---|
| GET | `/api/categories` | liste des catégories (`Category`) | T14 |
| GET | `/api/brands` | liste des marques (`Brand`) | T14 |
| GET | `/api/products` | liste de `ProductCard` : recherche, filtres, tri, pagination | T14, T15 |
| GET | `/api/products/:slug` | un `Product`, ou 404 | T14 |

Paramètres de `GET /api/products` (les mêmes noms servent dans l'URL du catalogue côté frontend) :

| Paramètre | Valeur | Effet |
|---|---|---|
| `q` | texte | mot-clé cherché dans le nom et la description |
| `category` | slug | filtre par catégorie |
| `brand` | slug | filtre par marque |
| `minPrice`, `maxPrice` | entiers | fourchette de prix en DA |
| `inStock` | `true` | seulement les produits en stock (`stock > 0`) |
| `sort` | `newest` (défaut), `price_asc`, `price_desc`, `name` | tri |
| `page`, `limit` | entiers | pagination : page 1 par défaut, `limit` 12 par défaut et 50 au maximum |

## Routes admin

Toutes sauf la connexion demandent l'en-tête `Authorization: Bearer <jeton>` ; sinon 401.

| Méthode | Route | Corps | Réponse | Tâche |
|---|---|---|---|---|
| POST | `/api/admin/login` | `{ email, password }` | 200 `{ data: { token } }` ; 401 si les identifiants sont faux | T21 |
| POST | `/api/admin/products` | `name`, `description?`, `price`, `stock`, `specs?`, `categoryId`, `brandId` | 201 `{ data: Product }` | T22 |
| PUT | `/api/admin/products/:id` | mêmes champs | 200 `{ data: Product }` | T22 |
| DELETE | `/api/admin/products/:id` | aucun | 204 | T22 |
| POST | `/api/admin/products/:id/images` | `multipart/form-data`, champ `images` | 201 `{ data: [image] }` ; 400 si le type ou la taille sont refusés | T24 |
| DELETE | `/api/admin/images/:id` | aucun | 204 | T24 |
| POST | `/api/admin/categories` | `{ name }` | 201 `{ data: Category }` | T23 |
| PUT | `/api/admin/categories/:id` | `{ name }` (renommer, facultatif) | 200 | T23 |
| DELETE | `/api/admin/categories/:id` | aucun | 204 ; 409 s'il reste des produits | T23 |
| POST, PUT, DELETE | `/api/admin/brands`, `/api/admin/brands/:id` | comme pour les catégories | comme pour les catégories | T23 |

Notes :
- Le formulaire produit (T27) crée d'abord le produit, puis envoie les photos sur `/api/admin/products/:id/images`.
- Validation proposée : `name` obligatoire ; `price` et `stock` entiers supérieurs ou égaux à 0 ; `categoryId` et `brandId` doivent exister ; `specs` est un objet nom → valeur.
- Photos proposées : JPEG, PNG ou WebP, 5 Mo au maximum chacune.
- Le jeton expire après 8 h (proposé).
