import { useState } from "react";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

interface Product {
  id: string;
  sno: number;
  name: string;
  image: string;
  price: number;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function Products() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const products: Product[] = [
    {
      id: "1",
      sno: 1,
      name: "Pro Software License",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=300&fit=crop",
      price: 99.99,
      category: "Software",
    },
    {
      id: "2",
      sno: 2,
      name: "Premium Support Package",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      price: 149.99,
      category: "Support",
    },
    {
      id: "3",
      sno: 3,
      name: "Advanced Analytics Module",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      price: 199.99,
      category: "Software",
    },
    {
      id: "4",
      sno: 4,
      name: "Cloud Storage Upgrade",
      image:
        "https://images.unsplash.com/photo-1635356891619-4e0232df28d5?w=400&h=300&fit=crop",
      price: 49.99,
      category: "Storage",
    },
    {
      id: "5",
      sno: 5,
      name: "API Access License",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
      price: 299.99,
      category: "Software",
    },
    {
      id: "6",
      sno: 6,
      name: "Training Certification",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      price: 79.99,
      category: "Training",
    },
  ];

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

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Catalog</h1>
            <p className="text-gray-600 mt-1">
              Browse and purchase our products
            </p>
          </div>
          {totalItems > 0 && (
            <button
              onClick={() => setShowCart(!showCart)}
              className="ml-auto bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors relative"
            >
              Cart
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products Grid */}
          <div className={`${showCart && "lg:col-span-2"}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden bg-gray-100 aspect-square">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                      S.No {product.sno}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <div className="text-xs text-gray-500 mb-2 uppercase font-semibold">
                      {product.category}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-primary">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                    <Button
                      onClick={() => addToCart(product)}
                      className="w-full bg-secondary hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors"
                    >
                      Want
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          {showCart && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Shopping Cart
                </h2>

                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Your cart is empty
                  </p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-gray-900 line-clamp-1">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="w-8 text-center font-semibold text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Cart Summary */}
                    <div className="border-t border-gray-200 pt-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-semibold text-gray-900">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Tax (10%):</span>
                        <span className="font-semibold text-gray-900">
                          ${(totalPrice * 0.1).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-t pt-3">
                        <span className="font-bold text-gray-900">Total:</span>
                        <span className="text-2xl font-bold text-primary">
                          ${(totalPrice * 1.1).toFixed(2)}
                        </span>
                      </div>
                      <Button
                        className="w-full bg-primary hover:bg-blue-600 text-white font-medium rounded-lg transition-colors h-10"
                        onClick={() => alert("Proceeding to checkout...")}
                      >
                        Proceed to Checkout
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
