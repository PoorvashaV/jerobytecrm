import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { registerCustomer, findCustomerByEmail } from "../db/queries";

const router = express.Router();

// Register endpoint
router.post("/api/register", async (req: Request, res: Response) => {
  const { name, email, phone, address, password } = req.body;

  try {
    // Validate input
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if email already exists
    const existingCustomer = await findCustomerByEmail(email);
    if (existingCustomer) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Register customer
    const customer = await registerCustomer(
      name,
      email,
      phone,
      address || "",
      hashedPassword
    );

    res.status(201).json({
      success: true,
      customer: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        type: customer.customer_type,
        registeredAt: customer.created_at,
      },
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    res.status(500).json({ error: error.message || "Registration failed" });
  }
});

// Login endpoint
router.post("/api/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const customer = await findCustomerByEmail(email);
    if (!customer) {
      return res.status(401).json({ error: "Customer not found" });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      customer.password_hash
    );
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.json({
      success: true,
      customer: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        type: customer.customer_type,
        registeredAt: customer.created_at,
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;