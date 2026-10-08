# Guide : utiliser ce kit avec GitHub Copilot

## L'idée en deux phrases

Copilot ne garde aucun souvenir d'un chat à l'autre : ce qu'il sait de votre projet, c'est ce qu'il relit dans le dépôt. Ce kit met votre « mémoire » dans des fichiers `.md` versionnés par Git, donc partagés entre Salah et Samad (après un `git pull`) : plus besoin de réexpliquer le projet à chaque chat.

## Qui lit quoi, et quand

| Fichier | Quand Copilot le lit | Coût en tokens |
|---|---|---|
| `.github/copilot-instructions.md` | à chaque message, automatiquement | permanent : environ 2 800 caractères, soit de l'ordre de 800 tokens ; à garder court |
| `.github/instructions/frontend…` et `backend…` | quand il crée ou modifie un fichier du dossier concerné | seulement quand c'est utile |
| `.github/prompts/*.prompt.md` | quand vous tapez `/start-session`, `/do-task` ou `/end-session` dans le chat | à la demande |
| `docs/*.md` | seulement si vous les joignez au chat, ou si Copilot (mode agent) les ouvre parce que les instructions le lui indiquent | à la demande |

## Mise en place (une seule fois)

1. Dans le dépôt GitHub (créé en T01), copiez les dossiers `.github` et `docs` de ce kit à la racine.
2. `git add .github docs`, puis `git commit -m "docs: add copilot kit"` et `git push`. L'autre frère fait `git pull`.
3. Dans VS Code, ouvrez toujours le dossier racine du dépôt (pas seulement `frontend` ou `backend`) : Copilot cherche `.github` à la racine de l'espace de travail.
4. Vérifiez que le réglage `github.copilot.chat.codeGeneration.useInstructionFiles` est activé (Paramètres, puis cherchez `useInstructionFiles`).
5. Test : ouvrez un nouveau chat et demandez « Quelle est notre stack et quelles sont les règles du projet ? ». Copilot doit répondre React, Express, Prisma et PostgreSQL sans que vous les ayez cités. Si la réponse est vague, revoyez les étapes 3 et 4.

## Routine de séance

1. `git pull` pour récupérer le travail de l'autre.
2. Nouveau chat, puis `/start-session` : un résumé de 10 lignes sur l'état du projet.
3. `/do-task T14` (par exemple) : Copilot lit seulement la ligne de la tâche et les docs utiles, propose un plan, puis avance une étape à la fois.
4. `/end-session Salah` (ou `Samad`) : il coche `TASKS.md`, met à jour `PROGRESS.md` et `DECISIONS.md`. Relisez ses modifications, puis commit et push.

## Économiser des tokens

- Un nouveau chat par tâche : plus un chat est long, plus chaque message embarque d'historique.
- Joignez seulement les fichiers utiles (tapez `#` puis le nom, par exemple `#API.md`, ou glissez le fichier dans le chat) plutôt que `#codebase` pour tout le projet.
- Gardez `copilot-instructions.md` court : il est envoyé à chaque message. Les détails vont dans `docs/`.
- Ne collez plus le plan dans un chat : `PROJECT.md` et `TASKS.md` le remplacent.
- Demandez une étape à la fois (réglage par défaut du kit). Pour obtenir toute une fonctionnalité d'un coup, dites-le explicitement.
- Gardez `PROGRESS.md` léger : seul « État actuel » est lu ; l'ancien journal part dans `docs/archive/` (le prompt `/end-session` le propose).
- La mémoire d'agent de VS Code charge les 200 premières lignes de la mémoire « utilisateur » au début de chaque session : regardez-la de temps en temps (commande « Chat: Show Memory Files ») et supprimez le superflu.

## Qui modifie quoi (pour éviter les conflits Git)

- `PROGRESS.md` : chacun sa sous-section et son journal.
- `TASKS.md` : on coche ses tâches.
- `DECISIONS.md` : on ajoute à la fin, avec le prochain ID libre.
- En cas de conflit sur un fichier de `docs/`, gardez les deux versions.

## Limites à connaître

- Les instructions ne s'appliquent pas à l'autocomplétion pendant la frappe (c'est indiqué dans la documentation de VS Code) : seulement au chat et à l'agent.
- Copilot peut oublier une règle. Si elle compte, rappelez-la dans votre message, ou rendez-la plus précise dans le fichier plutôt que d'en ajouter dix.
- Les instructions par dossier (`applyTo`) s'appliquent quand Copilot crée ou modifie un fichier correspondant, pas pour une simple lecture.
- Les commandes `/…` sont des « prompt files » décrits dans la documentation de VS Code. Dans un autre éditeur, `.github/copilot-instructions.md` et `docs/` restent utiles, mais ces commandes ne sont pas garanties.
- Copilot a aussi des mémoires automatiques. VS Code a une mémoire d'agent (utilisateur, dépôt, session) stockée localement sur chaque ordinateur, et sa documentation recommande des documents versionnés ou des instructions pour les conventions d'équipe. GitHub a « Copilot Memory » (aperçu public, forfaits payants) pour l'agent cloud, la revue de code et la CLI. Vous n'en contrôlez pas le contenu à l'avance : ce kit reste la mémoire commune, écrite et relue par vous deux.

## Entretien du kit

- À la fin de chaque phase, relisez `copilot-instructions.md` : retirez ce qui est devenu faux, ajoutez la règle que Copilot oublie le plus.
- Les points marqués « à valider » dans `DECISIONS.md` sont des propositions : corrigez-les, puis passez-les en « retenue ».
- Le plan `.docx` reste votre document de référence humain ; les `.md` en sont la version pour Copilot.

## Sources

Documentation consultée le 8 octobre 2026 : [instructions de dépôt (GitHub)](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions) · [fonctions prises en charge selon l'éditeur (GitHub)](https://docs.github.com/en/copilot/reference/custom-instructions-support) · [Copilot Memory (GitHub)](https://docs.github.com/en/copilot/concepts/agents/copilot-memory) · [instructions personnalisées (VS Code)](https://code.visualstudio.com/docs/copilot/customization/custom-instructions) · [prompt files (VS Code)](https://code.visualstudio.com/docs/copilot/customization/prompt-files) · [contexte du chat (VS Code)](https://code.visualstudio.com/docs/copilot/chat/copilot-chat-context) · [mémoire des agents (VS Code)](https://code.visualstudio.com/docs/agents/memory)
