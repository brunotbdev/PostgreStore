import { pool } from "../config/db.js";

const products = [
  {
    name: "Caneca",
    price_cents: 1000,
    image:
      "https://images.unsplash.com/photo-1605714196241-00bf7a8fe7bb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FuZWNhfGVufDB8fDB8fHww",
  },
  {
    name: "Relógio",
    price_cents: 15000,
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVsb2dpb3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Monitor",
    price_cents: 100000,
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9uaXRvcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Celular",
    price_cents: 250000,
    image:
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGhvbmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Câmera",
    price_cents: 500000,
    image:
      "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNhbWVyYXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Mochila",
    price_cents: 15000,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja3BhY2t8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Teclado",
    price_cents: 50000,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjbGFkb3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Fone",
    price_cents: 80000,
    image:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGVhZHBob25lfGVufDB8fDB8fHww",
  },
];

async function seed() {
  try {
    await pool.query(`TRUNCATE TABLE products RESTART IDENTITY`);

    for (const p of products) {
      await pool.query(
        `
      INSERT INTO products (name, price_cents, image)
      VALUES ($1, $2, $3)
      `,
        [p.name, p.price_cents, p.image]
      );
    }
  } catch (error) {
    process.exitCode = 1;
  }
}

seed();
