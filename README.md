# 🛒 PostgreStore

Aplicação de uma loja com operações CRUD.

![Screenshot](./screenshot.jpg)

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## 🚀 Instalação

### Pré-requisitos

- Docker

```sh
git clone https://github.com/brunotbdev/PostgreStore.git
cd postgrestore
```

### Uso

#### Iniciar o docker

```sh
docker compose up --build -d
```

O projeto estará disponivel em http://localhost:3000/

#### Adicionar alguns produtos para testes

```sh
docker exec backend node src/seeds/products.js
```

### 🛠️ Funcionalidades

- Adicionar, remover e editar produtos
- Suporte a tema claro e escuro
- Multiplos idiomas
