import pool from "./connection";

// Get all products
export async function getAllProducts() {
  const query = `
    SELECT product_id, name, description, price, original_price, category, rating, reviews, image_url, in_stock, created_at
    FROM products;
  `;
  const result = await pool.query(query);
  return result.rows;
}

// Insert a new product
export async function addProduct(
  name: string,
  description: string,
  price: number,
  originalPrice: number,
  category: string,
  rating: number,
  reviews: number,
  imageUrl: string,
  inStock: boolean
) {
  const query = `
    INSERT INTO products (name, description, price, original_price, category, rating, reviews, image_url, in_stock)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING product_id, name, description, price, original_price, category, rating, reviews, image_url, in_stock, created_at;
  `;
  const values = [name, description, price, originalPrice, category, rating, reviews, imageUrl, inStock];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// Find product by ID
export async function findProductById(productId: number) {
  const query = "SELECT * FROM products WHERE product_id = $1;";
  const result = await pool.query(query, [productId]);
  return result.rows[0];
}

// Register a new user
export async function registerUser(
  name: string,
  email: string,
  phone: string,
  address: string,
  passwordHash: string,
  customerType: string
) {
  // 🔍 DEBUG LOGS
  console.log("🔐 registerUser called with:", {
    name,
    email,
    phone,
    address,
    customerType, // The value being inserted
  });

  // ✅ CRITICAL: Explicitly specify all columns and use parameterized values
  const query = `
    INSERT INTO users (name, email, phone, address, password_hash, customer_type, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
    RETURNING id, name, email, phone, address, customer_type, created_at, updated_at;
  `;
  
  const values = [name, email, phone, address, passwordHash, customerType];
  
  console.log("📊 Query parameters:", values); // DEBUG
  
  try {
    const result = await pool.query(query, values);
    
    console.log("✅ User inserted successfully:", result.rows[0]); // DEBUG
    console.log("✅ Returned customer_type:", result.rows[0].customer_type); // DEBUG
    
    return result.rows[0];
  } catch (err) {
    console.error("❌ Error inserting user:", err);
    throw err;
  }
}

// Find user by email
export async function findUserByEmail(email: string) {
  const query = "SELECT * FROM users WHERE email = $1;";
  
  try {
    const result = await pool.query(query, [email]);
    
    if (result.rows.length > 0) {
      console.log("📦 User found:", result.rows[0]); // DEBUG
      console.log("📦 Found customer_type:", result.rows[0].customer_type); // DEBUG
    }
    
    return result.rows[0];
  } catch (err) {
    console.error("❌ Error finding user:", err);
    throw err;
  }
}
