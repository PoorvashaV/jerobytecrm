import pool from "./connection";

// Register a new customer
export async function registerCustomer(
  name: string,
  email: string,
  phone: string,
  address: string,
  passwordHash: string
) {
  const query = `
    INSERT INTO users (name, email, phone, address, password_hash, customer_type)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, name, email, phone, address, customer_type, created_at;
  `;

  try {
    const result = await pool.query(query, [
      name,
      email,
      phone,
      address,
      passwordHash,
      "both",
    ]);
    return result.rows[0];
  } catch (error: any) {
    if (error.code === "23505") {
      // Duplicate email
      throw new Error("Email already registered");
    }
    throw error;
  }
}

// Find customer by email
export async function findCustomerByEmail(email: string) {
  const query = "SELECT * FROM users WHERE email = $1;";
  const result = await pool.query(query, [email]);
  return result.rows[0];
}

// Get all customers
export async function getAllCustomers() {
  const query =
    "SELECT id, name, email, phone, address, customer_type, created_at FROM users;";
  const result = await pool.query(query);
  return result.rows;
}