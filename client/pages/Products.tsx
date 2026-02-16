import { useState } from "react";
import { ArrowLeft, Plus, Minus, Star, Zap, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

interface Product {
  id: string;
  sno: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  badge?: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function Products() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const products: Product[] = [
    {
      id: "1",
      sno: 1,
      name: "Pro Software License",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=300&fit=crop",
      price: 99.99,
      originalPrice: 149.99,
      category: "Software",
      rating: 4.8,
      reviews: 128,
      description: "Complete enterprise software suite",
      badge: "Best Seller",
    },
    {
      id: "2",
      sno: 2,
      name: "Premium Support Package",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      price: 149.99,
      category: "Support",
      rating: 4.9,
      reviews: 95,
      description: "24/7 dedicated support with priority response",
    },
    {
      id: "3",
      sno: 3,
      name: "Advanced Analytics Module",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      price: 199.99,
      originalPrice: 249.99,
      category: "Software",
      rating: 4.7,
      reviews: 156,
      description: "Real-time data analytics and reporting",
      badge: "Trending",
    },
    {
      id: "4",
      sno: 4,
      name: "Cloud Storage Upgrade",
      image:
        "https://images.unsplash.com/photo-1635356891619-4e0232df28d5?w=400&h=300&fit=crop",
      price: 49.99,
      category: "Storage",
      rating: 4.6,
      reviews: 203,
      description: "500GB cloud storage with encryption",
    },
    {
      id: "5",
      sno: 5,
      name: "API Access License",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
      price: 299.99,
      category: "Software",
      rating: 4.9,
      reviews: 87,
      description: "Unlimited API calls and integration support",
      badge: "Premium",
    },
    {
      id: "6",
      sno: 6,
      name: "Training Certification",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      price: 79.99,
      originalPrice: 129.99,
      category: "Training",
      rating: 4.8,
      reviews: 142,
      description: "Comprehensive online training course",
    },
  ];

  const categories = [
    "All Products",
    "Software",
    "Support",
    "Storage",
    "Training",
  ];

  const filteredProducts = selectedCategory
    ? selectedCategory === "All Products"
      ? products
      : products.filter((p) => p.category === selectedCategory)
    : products;

  const addToCart = (product: Product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter((item) => item.id !== productId));
    } else {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const discount = cart.reduce(
    (sum, item) =>
      sum +
      ((item.originalPrice || item.price) - item.price) * item.quantity,
    0
  );

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
                Explore our premium software solutions and services
              </p>
            </div>
            {totalItems > 0 && (
              <button
                onClick={() => setShowCart(!showCart)}
                className="ml-auto bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all relative"
              >
                <span className="flex items-center gap-2">
                  🛒 Cart
                </span>
                <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full w-7 h-7 flex items-center justify-center font-bold shadow-lg">
                  {totalItems}
                </span>
              </button>
            )}
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>{filteredProducts.length} Products</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Shield className="w-4 h-4 text-green-500" />
              <span>100% Secure</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24 shadow-sm">
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

              {/* Price Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600 space-y-2">
                  <p className="font-semibold text-gray-900">
                    Price Range
                  </p>
                  <p>
                    ${Math.min(...filteredProducts.map((p) => p.price)).toFixed(
                      2
                    )}{" "}
                    -{" "}
                    ${Math.max(...filteredProducts.map((p) => p.price)).toFixed(
                      2
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className={showCart ? "lg:col-span-2" : "lg:col-span-3"}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Product Image Container */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 aspect-square">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                      <div className="flex flex-col gap-2">
                        <div className="inline-flex items-center gap-1 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                          <span>#</span>
                          <span>{product.sno}</span>
                        </div>
                        {product.badge && (
                          <div className="inline-flex bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                            {product.badge}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            wishlist.includes(product.id)
                              ? "fill-red-500 text-red-500"
                              : "text-gray-400"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Discount Badge */}
                    {product.originalPrice && (
                      <div className="absolute bottom-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-lg">
                        -
                        {Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100
                        )}
                        %
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-5 space-y-4">
                    {/* Category Badge */}
                    <div className="inline-flex items-center gap-1 text-xs font-semibold text-primary bg-blue-50 px-3 py-1 rounded-full">
                      <Zap className="w-3 h-3" />
                      {product.category}
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
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
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {product.rating}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({product.reviews} reviews)
                      </span>
                    </div>

                    {/* Price Section */}
                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-3xl font-bold text-primary">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <Button
                        onClick={() => addToCart(product)}
                        className="w-full bg-gradient-to-r from-secondary to-emerald-600 hover:shadow-lg text-white font-bold py-3 rounded-lg transition-all"
                      >
                        Want This
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          {showCart && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Shopping Cart
                  </h2>
                  <button
                    onClick={() => setShowCart(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-3">🛒</div>
                    <p className="text-gray-500 font-medium">
                      Your cart is empty
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Add products to get started
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Cart Items */}
                    <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200 hover:border-primary transition-colors"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-gray-900 line-clamp-1">
                              {item.name}
                            </p>
                            <p className="text-xs text-primary font-bold">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 px-2 py-1">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-1 hover:bg-gray-100 rounded transition-colors"
                            >
                              <Minus className="w-3 h-3 text-gray-600" />
                            </button>
                            <span className="w-5 text-center font-bold text-gray-900 text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-1 hover:bg-gray-100 rounded transition-colors"
                            >
                              <Plus className="w-3 h-3 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Cart Summary */}
                    <div className="space-y-3 pt-4 border-t-2 border-gray-200">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-semibold text-gray-900">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>

                      {discount > 0 && (
                        <div className="flex justify-between text-sm bg-green-50 p-2 rounded-lg border border-green-200">
                          <span className="text-green-700 font-medium">
                            Savings:
                          </span>
                          <span className="font-bold text-green-700">
                            -${discount.toFixed(2)}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax (10%):</span>
                        <span className="font-semibold text-gray-900">
                          ${(totalPrice * 0.1).toFixed(2)}
                        </span>
                      </div>

                      <div className="flex justify-between bg-gradient-to-r from-primary to-blue-600 text-white p-3 rounded-lg">
                        <span className="font-bold">Total:</span>
                        <span className="text-lg font-bold">
                          ${(totalPrice * 1.1).toFixed(2)}
                        </span>
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-primary to-blue-600 hover:shadow-xl text-white font-bold py-3 rounded-lg transition-all"
                        onClick={() =>
                          alert(
                            `Order placed! Total: $${(totalPrice * 1.1).toFixed(2)}`
                          )
                        }
                      >
                        Checkout Now
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2"
                        onClick={() => setShowCart(false)}
                      >
                        Continue Shopping
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
