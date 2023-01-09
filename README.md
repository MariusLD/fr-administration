<h1>Les objectifs du projet :</h1>

<p align='justify'>
Le projet se présente comme le développement d’un site web, que ce soit sa partie back-office avec le back-end ou bien l’interface utilisateur avec le front-end.
<p>
<p align='justify'>
Ce repertoire contient la partie back-end du projet. Après l'avoir cloné, pour le lancer en mode production il faut lancer les commandes suivantes :
</p>

```bash
npm install
```

pour installer les dépendances du projet, puis

```bash
npm run build
```

pour le compiler, et enfin

```bash
node dist/main.js
```
pour lancer l'application.

<p align='justify'>
Il faut ensuite ouvrir un navigateur et aller sur <a href='http://localhost:3000/'>http://localhost:3000/</a> pour voir apparaître un magnifique "Hello World!", ou sur <a href='http://localhost:3000/api'>http://localhost:3000/api</a> pour acceder à l'interface Swagger et intéragir pleinement avec notre API.
</p>

<p align='justify'>
Depuis cet interface, il est possible de tester tous les endpoints proposés par notre API, et de voir les résultats obtenus. Ces endpoints ont été regroupés par catégorie.
</p>

<p align='justify'>
Il y a le groupe défaut qui ne sert qu'à recevoir le message "Hello World!" ; le groupe users qui permet de créér, modifier, supprimer ou obtenir les informations sur un utilisateur, d'obtenir les informations sur tous les utilisateurs, ou enfin d'obtenir les informations sur les associations auxquelles appartient un utilisateur ; le groupe association permet l'équivalent du groupe users, avec un endpoint pour obtenir les informations sur tous les membres appartenant à une association ; le groupe auth permet de se connecter en utilisant l'identifiant et le mot de passe d'un utilisateur, et si la connexion est réussie, de recevoir un token permettant de déverrouiller les endpoints avec un cadenas (GET /users/{id} du groupe users) ; enfin le groupe role permet de créér, modifier, supprimer ou obtenir les informations sur un rôle pour un utilisateur donné dans une association donnée.
</p>

<p align='justify'>
Pour chacun des endpoints, un schéma d'input a été créé pour savoir quel type de donnée est attendu. Ils sont visibles en bas de l'interface Swagger.
</p>

<p align='justify'>
Nous stockons toutes les données dans une base de donnée SQLite (le fichier mydatabase.db à la racine du projet), y compris les mots de passes qui sont cependant hachés auparavant, pour plus de sécurité.
</p>

<br>

---

<br>


<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
