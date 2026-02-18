import { Router } from "express";
import { getAllProducts, addProduct, findProductById } from "../db/queries";

const router = Router();

// Get all products
router.get("/", async (_req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Server error");
  }
});

// Add product
router.post("/", async (req, res) => {
  const { name, description, price, originalPrice, category, rating, reviews, imageUrl, inStock } = req.body;

  try {
    if (!name || !price) {
      return res.status(400).json({ error: "Name and price required" });
    }

    const product = await addProduct(
      name,
      description || "",
      price,
      originalPrice || price,
      category || "general",
      rating || 0,
      reviews || 0,
      imageUrl || "",
      inStock ?? true
    );

    res.status(201).json({ success: true, product });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);
    const product = await findProductById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error("Error finding product:", err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

export default router;
