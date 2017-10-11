![Easynvest](https://camo.githubusercontent.com/c4ee611d69893fec43b903eb88a444530eaf8e7f/68747470733a2f2f7777772e656173796e766573742e636f6d2e62722f66617669636f6e2e69636f)

# Easynvest API ETTJ
> Estrutura a Termo de Taxa de Juros

O intuito desse projeto é consolidar informacões de Estrutura a Termo de Taxa de Juros baseado na ANBIMA

## Desenvolvendo

### Built With

Lista das principais bibliotecas:
 * [axios](https://www.npmjs.com/package/axios)
 * [cron](https://www.npmjs.com/package/cron)
 * [fast-csv](https://www.npmjs.com/package/fast-csv)
 * [xml-js](https://www.npmjs.com/package/xml-js)
 * [mongoose](https://www.npmjs.com/package/mongoose)

### Pré-requisitos
Você precisará configurar seu ambiente. Para isso se faz necessário ter instalado:
 - [MongoDB](https://www.mongodb.com/)
 - [Node.js](https://nodejs.org/en/).

### Configurando

Para poder simular a aplicação localmente, basta efetuar os seguintes passos:

 - Será necessário subir o [MongoDB](https://www.mongodb.com/) localmente, isso fará que inicie um processo do MongoDB no porta default `27017`.
 - O arquivo `.env` por padrão já esta apontando para o ambiente local, caso tenha alterado a porta do processo do MongoDB edite o arquivo.

```shell
git clone https://github.com/easynvest/api-ettj.git
cd api-ettj/
npm install
mongod
npm start
```

### Building

 * TODO

## 6. Estrutura

```
    .app.js
    .config.js
    ├── controllers
    |   ├── cdi-controller.js
    |   ├── data-import-controller.js
    |   ├── ipca-controller.js
    ├── helpers
    |   ├── jobs
    |   ├──   ├── data-import.js
    ├── model
    |   ├── ettj
    |   ├──   ├── ettj.js
    |   ├── index
    |   ├──   ├── index.js
    ├── repositories
    |   ├── cdi-repositorio.js
    |   ├── ipca-repositorio.js
    ├── routes
    |   ├── cdi-route.js
    |   ├── data-import-route.js
    |   ├── index-route.js
    |   ├── icpa-route.js
    ├── services
    |   ├── import-ettj-service.js
```

## Versionamento

 * TODO podemoriamos talvez usar [SemVer](http://semver.org/) para versionamento.


## Configuração

Editar o arquivo `.env` na raiz do projeto caso o processo do MongoDB não esteja rodando na portal default `27017`

## Tests

 * TODO

## Style guide

 * TODO

## Referência de API

> `GET      /	                `

> `GET      /cdi            	`

> `GET      /cdi/:businessDays	`

> `GET      /ipca	            `

> `GET      /ipca/:businessDays	`

> `POST     /data-import	    `

```
http://localhost/cdi/252	
```

## Database

[MongoDB](https://www.mongodb.com/)

 - Exemplo de Schema ETTJ

```javascript
const ettjSchema = new Schema({
    businessDays: {
        type: Number,
        required: true
    },
    rateValue: {
        type: Number,
        required: true
    },    
});

```

 - Exemplo de Schema INDEX

```javascript
const indexSchema = new Schema({
    businessDays: {
        type: Number,
        required: true,
        unique: true,
        index: true
    },
    rateValue: {
        type: Number,
        required: true
    },
});
```

## Licensing

MIT