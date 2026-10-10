# Contrat d'API

> Contrat validé en T08. Toute modification de route, de paramètre ou de réponse
> passe d'abord par ce fichier.

Base : `/api` · JSON en UTF-8 · dates en ISO 8601 UTC · prix en DA, entiers.

## Formes de réponse

- Succès simple : `{ "data": ... }`.
- Liste paginée :
  `{ "data": [...], "meta": { "page": 1, "limit": 12, "total": 30, "totalPages": 3 } }`.
- Erreur :
  `{ "error": { "code": "VALIDATION_ERROR", "message": "...", "details": [...] } }`.
  `details` est présent seulement quand plusieurs champs sont invalides.
- Codes communs : 400 `VALIDATION_ERROR`, 401 `UNAUTHORIZED`, 404 `NOT_FOUND`,
  409 `CONFLICT`, 500 `SERVER_ERROR`.

Les champs JSON utilisent le camelCase (`categoryId`, `createdAt`). La disponibilité
publique est renvoyée sous `inStock` (`stock > 0`) ; la quantité `stock` est réservée
aux routes admin.

## Objets

`ProductCard` (liste publique) :

```json
{
  "id": 4,
  "name": "Casque Bluetooth Pro",
  "slug": "casque-bluetooth-pro",
  "price": 12900,
  "inStock": true,
  "image": "https://res.cloudinary.com/exemple/image/upload/casque-4-a.jpg",
  "category": { "name": "Audio", "slug": "audio" },
  "brand": { "name": "Marque X", "slug": "marque-x" }
}
```

`Product` (fiche publique ou réponse admin) contient en plus `description`, `specs`,
`createdAt`, les objets `category` et `brand` avec leur `id`, et `images`.
Une réponse admin contient aussi `stock`.

`Category` et `Brand` :

```json
{ "id": 2, "name": "Audio", "slug": "audio", "productCount": 12 }
```

## Routes publiques

| Méthode | Route | Réponse |
| --- | --- | --- |
| GET | `/api/health` | 200 `{ "data": { "status": "ok" } }` |
| GET | `/api/categories` | 200, liste de `Category` triée par nom |
| GET | `/api/brands` | 200, liste de `Brand` triée par nom |
| GET | `/api/products` | 200, liste paginée de `ProductCard` |
| GET | `/api/products/:slug` | 200, `Product` ; 404 si inconnu |

### Paramètres de `GET /api/products`

| Paramètre | Valeur | Défaut ou effet |
| --- | --- | --- |
| `q` | texte | Recherche insensible à la casse dans le nom et la description |
| `category` | slug | Filtre par catégorie |
| `brand` | slug | Filtre par marque |
| `minPrice` | entier >= 0 | Prix minimum inclus |
| `maxPrice` | entier >= 0 | Prix maximum inclus |
| `inStock` | `true` | Filtre `stock > 0` |
| `sort` | `newest`, `price_asc`, `price_desc`, `name` | `newest` |
| `page` | entier >= 1 | `1` |
| `limit` | entier de 1 à 50 | `12` |

Les filtres se combinent et acceptent une seule valeur. Un slug inconnu ou une
fourchette sans résultat renvoie une liste vide. Un paramètre inconnu est ignoré.
Une valeur invalide renvoie 400. Une page au-delà de la dernière renvoie `data: []`
avec le même `meta`. À valeur égale, le tri est complété par `id`.

Exemple :

```json
{
  "data": [
    {
      "id": 4,
      "name": "Casque Bluetooth Pro",
      "slug": "casque-bluetooth-pro",
      "price": 12900,
      "inStock": true,
      "image": "https://res.cloudinary.com/exemple/image/upload/casque-4-a.jpg",
      "category": { "name": "Audio", "slug": "audio" },
      "brand": { "name": "Marque X", "slug": "marque-x" }
    }
  ],
  "meta": { "page": 1, "limit": 12, "total": 1, "totalPages": 1 }
}
```

## Authentification

| Méthode | Route | Accès |
| --- | --- | --- |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Jeton JWT requis |

`POST /api/auth/login` reçoit `{ "email", "password" }` et renvoie 200 :

```json
{
  "data": {
    "token": "******",
    "admin": { "id": 1, "email": "admin@exemple.dz" }
  }
}
```

Le frontend envoie ensuite `Authorization: Bearer <token>` sur chaque route
`/api/admin/*` et sur `/api/auth/me`. Le jeton expire après 8 heures.

`GET /api/auth/me` renvoie :

```json
{ "data": { "id": 1, "email": "admin@exemple.dz" } }
```

## Routes admin

Toutes les routes `/api/admin/*` demandent un jeton JWT valide.

| Méthode | Route | Réponse |
| --- | --- | --- |
| GET | `/api/admin/products` | 200, liste paginée avec `stock` |
| GET | `/api/admin/products/:id` | 200, produit avec `stock` ; 404 |
| POST | `/api/admin/products` | 201, produit créé |
| PUT | `/api/admin/products/:id` | 200, produit modifié |
| DELETE | `/api/admin/products/:id` | 204 ; supprime aussi ses photos |
| POST | `/api/admin/products/:id/images` | 201, liste des photos créées |
| DELETE | `/api/admin/images/:id` | 204 |
| POST | `/api/admin/categories` | 201, catégorie créée |
| PUT | `/api/admin/categories/:id` | 200, catégorie renommée |
| DELETE | `/api/admin/categories/:id` | 204 ; 409 si elle contient des produits |
| POST | `/api/admin/brands` | 201, marque créée |
| PUT | `/api/admin/brands/:id` | 200, marque renommée |
| DELETE | `/api/admin/brands/:id` | 204 ; 409 si elle contient des produits |

### Produit

Les corps de `POST` et `PUT` contiennent `name`, `price`, `stock`, `categoryId`,
`brandId`, et éventuellement `description`, `specs`. `name` fait 1 à 120 caractères,
`description` 5 000 au plus, `price` et `stock` sont des entiers de 0 à
2 147 483 647, et `specs` est un objet de textes. Les catégories et marques
référencées doivent exister.

Le slug est fabriqué par l'API, reste inchangé après modification et reçoit un
suffixe `-2`, `-3` en cas de doublon. Le `PUT` attend tous les champs ; un champ
facultatif absent est remis à vide.

`GET /api/admin/products` reprend les paramètres de la liste publique. Les réponses
admin exposent `stock` en plus de `inStock`.

### Photos

`POST /api/admin/products/:id/images` utilise `multipart/form-data` avec le champ
`images`. Les fichiers acceptés sont JPEG, PNG ou WebP, de 5 Mo au maximum chacun,
avec 8 photos au maximum par produit. L'envoi est tout ou rien. La première photo
est en position 0 et constitue la photo principale.

## Catégories et marques

Les corps de création et de renommage sont `{ "name": "..." }`. Le nom fait 1 à
60 caractères, est unique dans son type, et le slug est fabriqué par l'API.
Une catégorie ou une marque contenant encore des produits ne peut pas être supprimée.

## Erreurs et validation

Toute entrée (corps, paramètre, query et fichier) est validée avant l'accès à la
base. Les erreurs de validation peuvent détailler les champs concernés :

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Certains champs sont invalides.",
    "details": [
      { "field": "price", "message": "Le prix doit être un entier supérieur ou égal à 0." },
      { "field": "categoryId", "message": "Cette catégorie n'existe pas." }
    ]
  }
}
```

| Statut | Code | Situation |
| --- | --- | --- |
| 400 | `VALIDATION_ERROR` | Corps ou paramètre invalide |
| 401 | `INVALID_CREDENTIALS` | Identifiants de connexion faux |
| 401 | `UNAUTHORIZED` | Jeton absent, invalide ou expiré |
| 404 | `NOT_FOUND` | Ressource inconnue |
| 409 | `NAME_TAKEN` | Nom de catégorie ou marque déjà pris |
| 409 | `HAS_PRODUCTS` | Suppression d'une catégorie ou marque non vide |
| 413 | `FILE_TOO_LARGE` | Photo de plus de 5 Mo |
| 415 | `FILE_TYPE_NOT_ALLOWED` | Format de photo refusé |
| 429 | `TOO_MANY_REQUESTS` | Trop de tentatives de connexion |
| 500 | `SERVER_ERROR` | Erreur inattendue |
