# Organisation à deux

> Source : plan du 7 octobre 2026. Un dépôt commun, une branche par tâche et une relecture croisée avant chaque fusion évitent presque tous les conflits et font apprendre à chacun le code de l'autre.

## Git et GitHub

- Un seul dépôt GitHub avec deux dossiers, `frontend` et `backend`, plus `docs` et `.github`. `main` ne reçoit que du code relu.
- Une branche par tâche, nommée avec son identifiant : `T19-catalogue`. Une pull request relue par l'autre avant la fusion.
- Commits : `type(portée): message` en anglais, avec `feat`, `fix`, `docs`, `chore`, `refactor` ou `test`. Exemple : `feat(catalogue): add price filter`. Petits commits, souvent.
- Chaque tâche T01 à T38 est une carte dans GitHub Projects (À faire, En cours, Terminé), mise à jour au début et à la fin du travail.
- Avant de commencer : `git pull` sur `main`, puis créer la branche de la tâche.

## Une tâche est terminée quand

1. Elle fonctionne en local et a été testée à la main.
2. Aucun secret ni `console.log` oublié ; `.env.example` à jour.
3. La pull request a été relue par l'autre, puis fusionnée.
4. `docs/TASKS.md` est coché et `docs/PROGRESS.md` à jour (prompt `/end-session`).
5. La carte GitHub Projects est dans « Terminé ».

## Rituels

- Point quotidien : 10 minutes pour dire ce qui est fait, ce qui vient et ce qui bloque.
- Binôme : deux séances par semaine devant le même écran, surtout là où le frontend et le backend se rencontrent (par exemple T08, T17 et T32).
- Celui qui finit sa part en avance relit le code de l'autre ou prépare la phase suivante.

## Secrets

- Le fichier `.env` (mots de passe, clés d'API) ne va jamais sur GitHub : l'ajouter au `.gitignore` dès T01.
- Si une clé fuit, la régénérer tout de suite.

## Fichiers de `docs/` et conflits Git

- Chacun ne modifie que sa propre sous-section et son propre journal dans `PROGRESS.md`.
- Dans `TASKS.md`, on coche ses tâches ; pour une tâche « Les deux », celui qui fusionne la coche.
- Dans `DECISIONS.md`, ajouter une ligne à la fin avec le prochain ID libre. En cas de conflit sur un fichier de `docs/`, garder les deux versions.

## Apprendre en faisant

- Pour chaque tâche : lire ou regarder le concept 30 minutes au plus, le coder, puis l'expliquer à l'autre en trois phrases.
- Face à un bug : relire le message d'erreur en entier, chercher 30 minutes, puis demander à l'autre avant de chercher plus longtemps.
- Noter dans le README ce qu'on a appris à chaque phase (T38).
- Une nouvelle idée ? La noter dans « Plus tard » de `TASKS.md` et n'y toucher qu'après la phase 5.

## Risques et parades

| Risque | Parade |
|---|---|
| L'apprentissage prend plus de temps que prévu, surtout en JavaScript | Garder la marge de 20 % ; si vous partez de zéro, ajouter 1 à 2 semaines avant la phase 1 |
| L'un attend l'autre | Contrat d'API (T08), données fictives, relecture du code de l'autre |
| De nouvelles idées s'ajoutent avant la fin du MVP | Liste « Plus tard », rien avant la fin de la phase 5 |
| Photos trop lourdes, site lent | Redimensionnement par Cloudinary, contrôle de la taille en T24, images allégées en T31 |
| Clés ou mots de passe publiés par erreur | `.env` exclu de GitHub dès T01 ; si une clé fuit, la régénérer tout de suite |
