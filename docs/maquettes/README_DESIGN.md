# Design des maquettes T07 (source de vérité pour le frontend)

Les fichiers *.dc.html sont lisibles : tout le style est en `style="..."` inline. Ouvrir un fichier = voir exactement les valeurs à reprendre.

| Maquette | Page React |
|---|---|
| Main | Accueil (/) |
| Catalogue, CatalogueMobile | Catalogue (/produits) |
| Fiche, FicheMobile | Fiche produit (/produits/:id) |
| Contact | Contact (/contact) |
| NotFound | 404 |
| Admin* | Espace admin (T25 à T28, Salah) |

## Couleurs
red #D71920 · red-dark #C8141B · orange #F0561E · yellow #FFD400 · amber #FF9F1C
ink #111111 · sand (fond) #F7F5F0 · line #E6E1D8 · muted #5B5B5B

## Dégradés
- bouton : 135deg, #C8141B -> #DC3A17
- bannière / bandeaux : 100deg, #C8141B 0%, #D71920 40%, #F0561E 100%
- pastilles d'icônes : 135deg, #F0561E -> #D71920
- jaune : 135deg, #FFD400 -> #FF9F1C
- noir (menu, pied de page) : 135deg, #111111 -> #3A3A3A
- zone photo vide : 135deg, #F3EFE7 -> #E2DCCF

## Typographie et formes
Police DM Sans (400, 500, 700, 800), titres en graisse 800 (pas de police condensée).
Rayons : cartes 16 px, boutons et champs 10 px, bannière 24 px.
Carte : fond blanc, bordure 1 px #E6E1D8, padding 20 px (carte produit 14 px).
Hauteur minimale des boutons et champs : 46 px.

## Animations (toutes coupées si prefers-reduced-motion)
- carte : au survol, monte de 6 px + ombre 0 16px 30px rgba(17,17,17,.16), 0.25 s
- bouton : au survol, monte de 2 px, luminosité 1.1, ombre rgba(215,25,32,.35)
- bannières : dégradé qui se déplace (background-size 200 %, 10 s, infini)
- cercles décoratifs : flottent de 14 px (5 s, infini)
- apparition de la page : fondu + montée de 18 px (0.7 s)

## En-tête (sticky)
1. Bande noire (13 px) : « Fabriqué en Algérie · qualité Techno Stationery » à gauche, téléphone à droite.
2. Ligne blanche : logo 56 px, recherche (liste catégories 200 px + champ + bouton dégradé « RECHERCHER »).
3. Barre dégradé noir : bloc rouge 260 px « TOUTES LES CATÉGORIES » + liens Accueil, Tous les produits, Contact (actif : jaune + trait jaune 3 px).

## Pied de page
Trait 4 px dégradé feu, puis bloc dégradé noir en 4 colonnes (logo + phrase, Navigation, Catégories, Nous contacter), puis barre #0B0B0B avec les réseaux et le copyright.
