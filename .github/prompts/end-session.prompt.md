---
description: "Fin de séance : mettre à jour la mémoire du projet (TASKS, PROGRESS, DECISIONS)"
argument-hint: "Salah ou Samad"
agent: "agent"
---
C'est la fin de ma séance. Mets à jour la mémoire du projet sans rien inventer.

Je suis la personne dont le prénom suit la commande (Salah ou Samad). S'il manque, demande-le-moi avant de continuer.

1. Regarde ce qui a changé : `git status --short` et `git diff --stat` si le terminal est disponible, ainsi que notre conversation.
2. `docs/TASKS.md` : coche `[x]` uniquement les tâches terminées et fonctionnelles. Une tâche partielle reste décochée.
3. `docs/PROGRESS.md`, section « État actuel » : mets à jour seulement ma sous-section (en cours, dernière séance avec la date, prochain pas, bloquants). Ne change « Phase en cours » que si une phase vient de se terminer. Ne touche pas à la sous-section de l'autre frère.
4. `docs/PROGRESS.md`, mon journal : ajoute en haut 3 à 5 lignes (fait, appris, prochain pas).
5. `docs/DECISIONS.md` : si une décision durable a été prise (bibliothèque, format, règle métier), ajoute-la à la fin avec le prochain ID libre. Sinon, ne change rien.
6. Si une commande de lancement, une adresse ou un autre fait utile est apparu, ajoute-le à « À retenir » dans `docs/PROGRESS.md`. Jamais de mot de passe ni de clé.
7. Si mon journal dépasse 40 lignes, déplace les entrées les plus anciennes vers `docs/archive/PROGRESS-AAAA-MM.md` (à créer).
8. Montre-moi les modifications, puis propose un message de commit : `docs: update progress (Txx)`.
