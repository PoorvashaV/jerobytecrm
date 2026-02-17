import { useState } from "react";
import { ArrowLeft, Star, Zap, Shield, Heart, Plus, Minus } from "lucide-react";
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
  inStock: boolean;
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

  const products: Product[] = [
    // Battery Products
    {
      id: "1",
      sno: 1,
      name: "SF FSPO - TT60S150",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
      price: 12650,
      originalPrice: 13257,
      category: "Battery",
      rating: 4.8,
      reviews: 45,
      description: "150AH Lithium Battery with 24 months warranty",
      inStock: true,
    },
    {
      id: "2",
      sno: 2,
      name: "SF FSPO - TT60S200",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
      price: 15950,
      originalPrice: 16716,
      category: "Battery",
      rating: 4.9,
      reviews: 38,
      description: "200AH Lithium Battery with 24 months warranty",
      inStock: true,
    },
    {
      id: "3",
      sno: 3,
      name: "SF FSPO - ST60S100",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
      price: 9900,
      originalPrice: 10375,
      category: "Battery",
      rating: 4.7,
      reviews: 52,
      description: "100AH Lithium Battery with 24 months warranty",
      inStock: false,
    },
    {
      id: "4",
      sno: 4,
      name: "SF FSPO - ST60S150",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
      price: 12400,
      originalPrice: 12995,
      category: "Battery",
      rating: 4.8,
      reviews: 48,
      description: "150AH Lithium Battery with 24 months warranty",
      inStock: true,
    },
    {
      id: "5",
      sno: 5,
      name: "SF FSPO - TT60S150",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
      price: 13400,
      originalPrice: 14043,
      category: "Battery",
      rating: 4.9,
      reviews: 41,
      description: "150AH Lithium Battery with 24 months warranty",
      inStock: true,
    },
    {
      id: "6",
      sno: 6,
      name: "SF FSPO - TT60S200",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
      price: 16700,
      originalPrice: 17502,
      category: "Battery",
      rating: 4.8,
      reviews: 39,
      description: "200AH Lithium Battery with 24 months warranty",
      inStock: true,
    },
    {
      id: "7",
      sno: 7,
      name: "SF FSPO - ST60S100",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
      price: 10400,
      originalPrice: 10899,
      category: "Battery",
      rating: 4.7,
      reviews: 50,
      description: "100AH Lithium Battery with 24 months warranty",
      inStock: true,
    },
    {
      id: "8",
      sno: 8,
      name: "SF FSPO - ST60S150",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
      price: 13200,
      originalPrice: 13834,
      category: "Battery",
      rating: 4.8,
      reviews: 46,
      description: "150AH Lithium Battery with 24 months warranty",
      inStock: true,
    },
    // CPU Products
    {
      id: "9",
      sno: 1,
      name: "Intel Core i7-13700K",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
      price: 45000,
      originalPrice: 52000,
      category: "CPU",
      rating: 4.9,
      reviews: 128,
      description: "High-performance desktop processor with 16 cores",
      inStock: true,
    },
    {
      id: "10",
      sno: 2,
      name: "AMD Ryzen 7 7700X",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
      price: 42000,
      originalPrice: 48500,
      category: "CPU",
      rating: 4.8,
      reviews: 95,
      description: "Powerful processor with 8 cores for gaming and workstations",
      inStock: true,
    },
    {
      id: "11",
      sno: 3,
      name: "Intel Core i5-13600K",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
      price: 28000,
      originalPrice: 32000,
      category: "CPU",
      rating: 4.7,
      reviews: 156,
      description: "Mid-range processor ideal for gaming and content creation",
      inStock: false,
    },
    {
      id: "12",
      sno: 4,
      name: "AMD Ryzen 5 5600X",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
      price: 18500,
      originalPrice: 21000,
      category: "CPU",
      rating: 4.6,
      reviews: 203,
      description: "Budget-friendly processor with excellent performance",
      inStock: true,
    },
    // CCTV Products
    {
      id: "13",
      sno: 1,
      name: "Hikvision 4MP Turret Camera",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      price: 8500,
      originalPrice: 10000,
      category: "CCTV",
      rating: 4.8,
      reviews: 67,
      description: "4MP resolution with night vision and motion detection",
      inStock: true,
    },
    {
      id: "14",
      sno: 2,
      name: "Dahua 8MP Bullet Camera",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      price: 12000,
      originalPrice: 14500,
      category: "CCTV",
      rating: 4.9,
      reviews: 54,
      description: "8MP resolution with 50m infrared night vision",
      inStock: true,
    },
    {
      id: "15",
      sno: 3,
      name: "CP Plus Dome Camera",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      price: 6500,
      originalPrice: 7800,
      category: "CCTV",
      rating: 4.7,
      reviews: 89,
      description: "2MP dome camera with weatherproof design",
      inStock: false,
    },
    {
      id: "16",
      sno: 4,
      name: "Uniview PTZ Camera",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      price: 22000,
      originalPrice: 26000,
      category: "CCTV",
      rating: 4.8,
      reviews: 42,
      description: "Pan-Tilt-Zoom camera with 4MP resolution",
      inStock: true,
    },
  ];

  const categories = [
    "All Products",
    "Battery",
    "CPU",
    "CCTV",
  ];

  const filteredProducts = selectedCategory
    ? selectedCategory === "All Products"
      ? products
      : products.filter((p) => p.category === selectedCategory)
    : products;

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const getQuantity = (productId: string) => quantities[productId] || 1;

  const increaseQuantity = (productId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  };

  const decreaseQuantity = (productId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) - 1),
    }));
  };

  const addToCart = (product: Product, quantity: number) => {
    const existingItem = cart.find((item) => item.productId === product.id);
    if (existingItem) {
      setCart((prev) =>
        prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart((prev) => [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
        },
      ]);
    }
    // Show alert with cart confirmation
    alert(
      `✓ Added to Cart\n\nProduct: ${product.name}\nQuantity: ${quantity}\nPrice: ₹${(product.price * quantity).toLocaleString('en-IN')}\n\nTotal Items in Cart: ${cart.length + 1}`
    );
  };

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
            <div className="rounded-xl border border-gray-200 p-6 sticky top-24 shadow-sm" style={{ backgroundColor: 'rgba(217, 232, 248, 1)', borderColor: 'rgba(132, 171, 210, 1)', borderWidth: '1px' }}>
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
          <div className="lg:col-span-3">
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
                        <div className={`inline-flex text-white text-xs font-bold px-3 py-1 rounded-full ${
                          product.inStock
                            ? "bg-gradient-to-r from-green-400 to-green-600"
                            : "bg-gradient-to-r from-red-400 to-red-600"
                        }`}>
                          {product.inStock ? "Available" : "Out of Stock"}
                        </div>
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
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          {product.originalPrice && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              ₹{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls and Buy Now Button */}
                      <div className="space-y-3">
                        {/* Quantity Selector */}
                        <div className={`flex items-center gap-2 border border-gray-200 rounded-lg p-2 ${
                          !product.inStock ? "opacity-50 cursor-not-allowed bg-gray-50" : ""
                        }`}>
                          <span className="text-xs font-semibold text-gray-700 flex-1">Qty</span>
                          <button
                            onClick={() => decreaseQuantity(product.id)}
                            disabled={!product.inStock}
                            className={`p-1 rounded transition-colors ${
                              product.inStock
                                ? "hover:bg-gray-100"
                                : "cursor-not-allowed"
                            }`}
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="w-8 text-center font-semibold text-gray-900">
                            {getQuantity(product.id)}
                          </span>
                          <button
                            onClick={() => increaseQuantity(product.id)}
                            disabled={!product.inStock}
                            className={`p-1 rounded transition-colors ${
                              product.inStock
                                ? "hover:bg-gray-100"
                                : "cursor-not-allowed"
                            }`}
                          >
                            <Plus className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>

                        {/* Buy Now Button */}
                        <Button
                          onClick={() => addToCart(product, getQuantity(product.id))}
                          disabled={!product.inStock}
                          className={`w-full text-white font-bold py-3 rounded-lg transition-all ${
                            product.inStock
                              ? "bg-gradient-to-r from-secondary to-emerald-600 hover:shadow-lg cursor-pointer"
                              : "bg-gray-400 cursor-not-allowed opacity-50"
                          }`}
                        >
                          {product.inStock ? "Buy Now" : "Out of Stock"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
