import { pool } from "../config/db.js";

export const getAllProducts = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM products");
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(500).json({ message: "error in getAllProducts" });
  }
};

export const createProduct = async (req, res) => {
  const { name, price_cents, image } = req.body;
  if (!name || !price_cents || !image) {
    return res.status(400).json({ message: "Please provide all values" });
  }
  try {
    const newProduct = await pool.query(
      `
      INSERT INTO products (name, price_cents, image)
      VALUES ($1, $2, $3) RETURNING *
      `,
      [name, price_cents, image]
    );
    res.status(201).json({ message: "product added", data: newProduct });
  } catch (error) {
    res.status(500).json({ message: "error in createProduct" });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows, rowCount } = await pool.query(
      `SELECT * FROM products WHERE id = $1`,
      [id]
    );

    if (rowCount === 0) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(500).json({ message: "error in getProduct" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price_cents, image } = req.body;
  try {
    const { rows, rowCount } = await pool.query(
      `UPDATE products SET name = $1, price_cents = $2, image = $3 WHERE id = $4 RETURNING *`,
      [name, price_cents, image, id]
    );

    if (rowCount === 0) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(500).json({ message: "error in updateProduct" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows, rowCount } = await pool.query(
      `DELETE FROM products WHERE id = $1 RETURNING *`,
      [id]
    );

    if (rowCount === 0) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(500).json({ message: "error in deleteProduct" });
  }
};

export const checkImage = async (req, res) => {
  const { url } = req.query;
  try {
    const response = await fetch(url, { method: "HEAD" });
    const contentType = response.headers.get("Content-Type");

    if (contentType.startsWith("image/")) {
      res.json({ valid: true });
    } else {
      res.json({ valid: false });
    }
  } catch (error) {
    res.status(500).json({ message: "error in checkImage" });
  }
};
