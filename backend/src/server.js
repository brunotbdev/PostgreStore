import express from "express";
import helmet from "helmet";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import { rateLimit } from "express-rate-limit";
import { pool } from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      imgSrc: ["'self'", "data:", "https:"],
    },
  })
);

// const corsOptions = {
//   origin: process.env.ORIGIN || "http://localhost:5173",
//   credentials: true,
// };

app.use(cors());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler: (req, res) => {
    res.sendStatus(429);
  },
});

app.use(limiter);
app.set("trust proxy", 1);

const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/products", productRoutes);

async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price_cents INT NOT NULL,
        image VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (error) {
    process.exitCode = 1;
  }
}

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

initDB().then(() => {
  app.listen(PORT);
});
