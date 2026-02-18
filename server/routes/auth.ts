import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { registerUser, findUserByEmail } from "../db/queries";

const router = express.Router();

// Register
router.post("/register", async (req: Request, res: Response) => {
  // ✅ FIX: Expect customer_type (snake_case) from frontend
  const { name, email, phone, address, password, customer_type } = req.body;

  try {
    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, email, phone, password",
      });
    }

    // ✅ Validate customer_type
    if (
      !customer_type ||
      !["product", "service", "both"].includes(customer_type)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid customer_type. Must be 'product', 'service', or 'both'",
      });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // ✅ Hash password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Register user with correct field name
    const user = await registerUser(
      name,
      email,
      phone,
      address || "",
      hashedPassword,
      customer_type // ✅ Pass snake_case
    );

    // ✅ Return proper response format
    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address || "",
        customer_type: user.customer_type,
        created_at: user.created_at,
      },
    });
  } catch (err: any) {
    console.error("Registration error:", err);
    return res.status(500).json({
      success: false,
      message: "Registration failed",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
});

// Login
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Compare password hash
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // ✅ Return proper response format
    return res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address || "",
        customer_type: user.customer_type,
        created_at: user.created_at,
      },
    });
  } catch (err: any) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
});

export default router;
