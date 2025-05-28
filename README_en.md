<div align="center">

# 🛒 PostgreStore

Store application with CRUD operations.

![Screenshot](./screenshot.jpg)

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

<a href="https://github.com/brunotbdev/PostgreStore/blob/main/README.md">🇧🇷 Readme em Português</a>

</div>

## 🚀 Installation

### Prerequisites

- Docker

```sh
git clone https://github.com/brunotbdev/PostgreStore.git
cd PostgreStore
```

### Usage

#### Start docker

```sh
docker compose up --build -d
```

The project will be available at http://localhost:3000/

#### Add some products for tests

```sh
docker exec backend node src/seeds/products.js
```

### 🛠️ Features

- Add, update and remove products
- Support for light and dark themes
- Multiple languages
