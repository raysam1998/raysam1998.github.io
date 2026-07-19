# raysam1998.github.io

Portfolio personnel de Rayane Bouzroura. Site statique en HTML/CSS/JS pur, sans framework ni étape de build, déployé via GitHub Pages depuis la branche `main`.

## Architecture

Tout le contenu variable (profil, CV, projets) vit dans **`manifest.json`** à la racine. `index.html` ne fait que charger ce fichier et l'afficher via `app.js`. **Il ne faut jamais éditer `index.html` pour changer le contenu du site** — seulement `manifest.json` (et les PDF dans `/cvs/`).

```
index.html      shell HTML, ne pas éditer pour le contenu
style.css       thème sombre
app.js          lit manifest.json et génère le HTML des sections
manifest.json   toutes les données du site (profil, CV, projets)
cvs/            PDF des CV, référencés par manifest.json
```

## Mettre à jour le site

### 1. Ajouter / mettre à jour un CV

1. Copier le PDF dans le dossier `cvs/` (ex. `cvs/CV_Rayane_Bouzroura_Dev_Junior.pdf`).
2. Dans `manifest.json`, ajouter ou modifier l'entrée correspondante dans le tableau `"cvs"` :
   ```json
   {
     "id": "dev-junior",
     "label_fr": "CV — Développeur junior",
     "description_fr": "Profil orienté développement logiciel.",
     "file": "CV_Rayane_Bouzroura_Dev_Junior.pdf",
     "updated": "2026-07-19"
   }
   ```
   Le champ `file` doit correspondre exactement au nom du fichier dans `cvs/`.
3. Commiter et pousser :
   ```bash
   git add cvs/CV_Rayane_Bouzroura_Dev_Junior.pdf manifest.json
   git commit -m "Mise à jour du CV développeur junior"
   git push
   ```

Si le fichier PDF n'existe pas encore dans `cvs/`, la carte affiche automatiquement « Bientôt disponible » à la place des boutons Voir/Télécharger.

### 2. Modifier le profil ou les projets

Éditer uniquement `manifest.json` (sections `"profile"` ou `"projects"`), puis :

```bash
git add manifest.json
git commit -m "Mise à jour du profil"
git push
```

Le site se met à jour automatiquement après quelques minutes (délai normal de GitHub Pages).

## Pas de build

Aucune commande à lancer. Pour prévisualiser localement, ouvrir `index.html` avec un petit serveur statique (ex. `python -m http.server`) — l'ouverture directe en `file://` peut bloquer le `fetch()` de `manifest.json` selon le navigateur.
