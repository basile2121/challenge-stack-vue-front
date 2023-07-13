# Documentation côté Front end

## 1. Technologies

- Framework : [VueJS](https://fr.vuejs.org/) v3
- Langage :  [Typescript](https://www.typescriptlang.org/docs/home) v5.0
- Dépendances importantes :
  - Axios : [v1.4](https://www.npmjs.com/package/axios) 
    - Client HTTP basé sur les promesses compatible avec node.js et les navigateurs.
  - Vuetify : [v3.0](https://www.npmjs.com/package/vuetify)
    - Framework de composants d'interface utilisateur , il nous permet de développer le site pour multiplateforme
  - Pinia : [v2.1](https://www.npmjs.com/package/pinia)
    - Store centralisé qui permet de partager des données entre tout nos composants
- GitHub : https://github.com/basile2121/challenge-stack-vue-front

## 2. Installation locale projet

Cloner le projet github :

```shell
git clone https://github.com/basile2121/challenge-stack-vue-front
```

Installer les dépendances :

```shell
npm install
```

Lancer le projet :

```shell
npm run dev
```

L’API démarre par défaut sur http://localhost:3000 par défaut. **Attention l'API n'accepte que le port 3000**

## 3. Store pinia

Le projet utilise le store Pinia pour faire les appels l'API avec Axios. Ce store nous permet de partager des données entre tous nos composant comme par exemple les données de l'utilisateur connecté. Cependant nous utilisons également les props pour passer des données à nos composants.

## 4. Architecture des projets

```
|_challenge-stack-node-front
	|_ public/
	|_ node_modules/       -->(template)
	|_ src/
		|_ /assets
		|_ /components  --> (Composants de l'application)
		|_ /layouts     --> (Permet d'appliquer des mises en pages comme la nav bar à un ensemble de page)
		|_ /plugins     --> (Utilisation de Vuetify et Material Icon)
		|_ /router
		|_ /stores      --> (Stores gérés par Pinia)
		|_ /styles
		|_ /views       --> (Pages de l'application)
		|-- App.vue
		|-- main.ts
		|-- vite-env.d.ts
```