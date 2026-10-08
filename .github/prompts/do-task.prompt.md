---
description: "Travailler une tâche du plan, par petites étapes (ex. /do-task T14)"
argument-hint: "ID de la tâche, par exemple T14 (facultatif)"
agent: "agent"
---
Je veux avancer sur une tâche du plan, en apprenant.

1. Tâche : celle indiquée après la commande. Sinon, propose la première tâche non cochée de `docs/TASKS.md` dont toutes les dépendances (« après ») sont cochées, et attends ma confirmation.
2. Lis seulement la ligne de cette tâche dans `docs/TASKS.md` (cherche `**T14**`), puis les parties utiles de `docs/API.md`, `docs/ARCHITECTURE.md` ou `docs/DECISIONS.md`. Ne lis pas le reste de `docs/`.
3. Annonce en 3 à 5 lignes ton plan en petites étapes (fichiers à créer ou à modifier) et attends mon accord.
4. Fais une étape à la fois. Après chaque étape : dis-moi comment la tester (commande ou adresse) et explique en 2 ou 3 phrases ce qu'elle m'apprend. Je suis débutant : ne saute pas d'étape.
5. Quand la tâche fonctionne, rappelle-moi de lancer `/end-session` puis d'ouvrir la pull request.
