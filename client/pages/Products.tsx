import { useState, useEffect, useMemo } from "react";
import {
  ArrowLeft,
  Star,
  Zap,
  Shield,
  Heart,
  Plus,
  Minus,
  ShoppingCart,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  category: string;
  rating: number;
  reviews: number;
  image_url: string;
  in_stock: boolean;
}

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export default function Products() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = useMemo(
    () => ["All Products", "Battery", "CPU", "CCTV"],
    []
  );

  // ✅ Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/products");

        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.status}`);
        }

        const data = await res.json();
        console.log("✅ Fetched products:", data);
        setProducts(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        console.error("❌ Error fetching products:", errorMessage);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Filter products by category
  const filteredProducts = useMemo(() => {
    if (!selectedCategory || selectedCategory === "All Products") {
      return products;
    }
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, products]);

  // ✅ Toggle wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // ✅ Get quantity for product
  const getQuantity = (productId: string) => quantities[productId] || 1;

  // ✅ Increase quantity
  const increaseQuantity = (productId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  };

  // ✅ Decrease quantity
  const decreaseQuantity = (productId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) - 1),
    }));
  };

  // ✅ Add to cart
  const addToCart = (product: Product, quantity: number) => {
    const productIdStr = product.product_id.toString();
    const existingItem = cart.find((item) => item.productId === productIdStr);

    if (existingItem) {
      setCart((prev) =>
        prev.map((item) =>
          item.productId === productIdStr
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart((prev) => [
        ...prev,
        {
          productId: productIdStr,
          name: product.name,
          price: product.price,
          quantity: quantity,
        },
      ]);
    }

    // ✅ Show success notification
    const totalPrice = product.price * quantity;
    alert(
      `✅ Added to Cart\n\nProduct: ${product.name}\nQuantity: ${quantity}\nPrice: ₹${totalPrice.toLocaleString(
        "en-IN"
      )}\n\nTotal Items in Cart: ${cart.length + 1}`
    );

    // ✅ Reset quantity after adding to cart
    setQuantities((prev) => ({
      ...prev,
      [productIdStr]: 1,
    }));
  };

  // ✅ Loading state
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Product Catalog
              </h1>
              <p className="text-gray-600 mt-2">
                Explore our premium battery, CPU, and CCTV products
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>
                {filteredProducts.length} Product
                {filteredProducts.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Shield className="w-4 h-4 text-green-500" />
              <span>100% Secure</span>
            </div>
            {cart.length > 0 && (
              <div className="flex items-center gap-2 text-primary font-semibold">
                <ShoppingCart className="w-4 h-4" />
                <span>
                  {cart.length} Item{cart.length !== 1 ? "s" : ""} in Cart
                </span>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-700 text-sm font-semibold">Error</p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="text-red-600 hover:text-red-800 underline text-sm font-semibold flex-shrink-0"
              >
                Retry
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-gray-200 p-6 sticky top-24 shadow-sm bg-blue-50">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() =>
                      setSelectedCategory(
                        category === "All Products" ? null : category
                      )
                    }
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all font-medium ${
                      (selectedCategory === category ||
                        (category === "All Products" && !selectedCategory))
                        ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 text-lg font-semibold">
                  No products found in this category
                </p>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="mt-4 text-primary hover:text-blue-600 underline font-semibold"
                >
                  View all products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.product_id}
                    className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Product Image */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 aspect-square">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/400?text=Product+Image";
                        }}
                      />

                      {/* Availability Badge */}
                      <div
                        className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white ${
                          product.in_stock
                            ? "bg-gradient-to-r from-green-400 to-green-600"
                            : "bg-gradient-to-r from-red-400 to-red-600"
                        }`}
                      >
                        {product.in_stock ? "Available" : "Out of Stock"}
                      </div>

                      {/* Discount Badge */}
                      {product.original_price && (
                        <div className="absolute bottom-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-lg">
                          -
                          {Math.round(
                            ((product.original_price - product.price) /
                              product.original_price) *
                              100
                          )}
                          %
                        </div>
                      )}

                      {/* Wishlist Button */}
                      <button
                        onClick={() =>
                          toggleWishlist(product.product_id.toString())
                        }
                        className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
                        title={
                          wishlist.includes(product.product_id.toString())
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                        }
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            wishlist.includes(product.product_id.toString())
                              ? "fill-red-500 text-red-500"
                              : "text-gray-600"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Product Details */}
                    <div className="p-5 space-y-4">
                      <div className="inline-flex items-center gap-1 text-xs font-semibold text-primary bg-blue-50 px-3 py-1 rounded-full">
                        <Zap className="w-3 h-3" />
                        {product.category}
                      </div>

                      <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm font-semibold text-gray-900">
                          {product.rating}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({product.reviews} review
                          {product.reviews !== 1 ? "s" : ""})
                        </span>
                      </div>

                      {/* Price Section */}
                      <div className="pt-2 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="text-3xl font-bold text-primary">
                              ₹{product.price.toLocaleString("en-IN")}
                            </span>
                            {product.original_price && (
                              <span className="ml-2 text-sm text-gray-500 line-through">
                                ₹
                                {product.original_price.toLocaleString(
                                  "en-IN"
                                )}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controls and Buy Now Button */}
                        <div className="space-y-3">
                          {/* Quantity Selector */}
                          <div
                            className={`flex items-center gap-2 border border-gray-200 rounded-lg p-2 ${
                              !product.in_stock
                                ? "opacity-50 cursor-not-allowed bg-gray-50"
                                : ""
                            }`}
                          >
                            <span className="text-xs font-semibold text-gray-700 flex-1">
                              Qty
                            </span>
                            <button
                              onClick={() =>
                                decreaseQuantity(
                                  product.product_id.toString()
                                )
                              }
                              disabled={!product.in_stock}
                              className={`p-1 rounded transition-colors ${
                                product.in_stock
                                  ? "hover:bg-gray-100"
                                  : "cursor-not-allowed"
                              }`}
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="w-8 text-center font-semibold text-gray-900">
                              {getQuantity(product.product_id.toString())}
                            </span>
                            <button
                              onClick={() =>
                                increaseQuantity(
                                  product.product_id.toString()
                                )
                              }
                              disabled={!product.in_stock}
                              className={`p-1 rounded transition-colors ${
                                product.in_stock
                                  ? "hover:bg-gray-100"
                                  : "cursor-not-allowed"
                              }`}
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>

                          {/* Buy Now Button */}
                          <Button
                            onClick={() =>
                              addToCart(
                                product,
                                getQuantity(product.product_id.toString())
                              )
                            }
                            disabled={!product.in_stock}
                            className={`w-full text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
                              product.in_stock
                                ? "bg-gradient-to-r from-secondary to-emerald-600 hover:shadow-lg cursor-pointer"
                                : "bg-gray-400 cursor-not-allowed opacity-50"
                            }`}
                          >
                            <ShoppingCart className="w-4 h-4" />
                            {product.in_stock ? "Buy Now" : "Out of Stock"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
