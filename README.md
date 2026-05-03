# TotoGames

TotoGames est une application web permettant de découvrir, rechercher et consulter des jeux vidéo à partir de l’API RAWG.  
Le projet permet aussi d’afficher les détails d’un jeu, ses captures d’écran, ainsi que de gérer une liste de favoris.

## Aperçu

Cette application a été réalisée avec React et Vite pour le frontend, ainsi qu’avec Node.js et Express pour le backend.  
Le frontend est déployé sur Vercel et le backend sur Render.

## Fonctionnalités

- Affichage des jeux populaires
- Recherche de jeux par nom
- Filtrage par genre
- Tri des résultats
- Consultation des détails d’un jeu
- Affichage des captures d’écran
- Gestion des favoris
- Interface responsive

## Technologies utilisées

### Frontend
- React
- Vite
- CSS

### Backend
- Node.js
- Express

### API externe
- RAWG Video Games Database API

### Déploiement
- Vercel (frontend)
- Render (backend)

## Liens

- **Application en ligne** : https://totogames-indol.vercel.app/
- **Répertoire GitHub** : https://github.com/GeneralTotoss/TotoGames
- **Backend Render** : https://gamevault-u3dn.onrender.com/api/games

## Installation locale

### 1. Cloner le projet
```bash
git clone https://github.com/GeneralTotoss/TotoGames
cd totogames
```

### 2. Installer les dépendances du frontend
```bash
npm install
```

### 3. Installer les dépendances du backend
```bash
cd server
npm install
cd ..
```

## Variables d’environnement

### Frontend (Vercel / local)
Créer un fichier `.env` à la racine du projet frontend avec :

```env
VITE_API_BASE_URL=http://localhost:3001
```

### Backend (Render / local)
Créer un fichier `.env` dans le dossier `server` avec :

```env
RAWG_API_KEY=ta_cle_api_rawg
PORT=3001
```

## Lancer le projet en local

### 1. Démarrer le backend
Dans le dossier `server` :

```bash
node server.js
```

### 2. Démarrer le frontend
À la racine du projet :

```bash
npm run dev
```

## Structure du projet

```bash
Totogames/
├── public/
├── src/
├── server/
│   ├── server.js
│   └── ...
├── package.json
├── vite.config.js
└── README.md
```

## Déploiement

Le projet est séparé en deux parties :

- **Frontend** déployé sur Vercel
- **Backend** déployé sur Render

Le frontend communique avec le backend via la variable d’environnement :

```env
VITE_API_BASE_URL=https://ton-backend.onrender.com
```

Le backend utilise la variable :

```env
RAWG_API_KEY=ta_cle_api_rawg
```

## Auteur

Projet réalisé par Jean-Christophe Cyr.

## Remarques

Ce projet utilise l’API RAWG via un backend Express afin d’éviter d’exposer directement la clé API dans le frontend.  
Certaines améliorations futures pourraient inclure une meilleure gestion des erreurs, plus de filtres, et une amélioration visuelle de certaines composantes.