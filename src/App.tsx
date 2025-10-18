import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { ShoppingCart, Leaf, MapPin, Home, Package, X, Plus, Minus, Trash2, Save, BookmarkPlus, Sprout } from 'lucide-react';

const App = () => {
  const [cart, setCart] = useState([]);
  const [savedBaskets, setSavedBaskets] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const mockProducts = [
    { id: '1', name: 'Organic Tomatoes', farm: 'Rooftop Gardens NYC', category: 'Vegetables', price: 4.99, unit: 'lb', image: '🍅', inStock: true },
    { id: '2', name: 'Fresh Lettuce', farm: 'Brooklyn Urban Farm', category: 'Greens', price: 3.49, unit: 'head', image: '🥬', inStock: true },
    { id: '3', name: 'Bell Peppers', farm: 'Queens Community Garden', category: 'Vegetables', price: 5.99, unit: 'lb', image: '🫑', inStock: true },
    { id: '4', name: 'Carrots', farm: 'Bronx Vertical Farm', category: 'Root Vegetables', price: 2.99, unit: 'bunch', image: '🥕', inStock: true },
    { id: '5', name: 'Fresh Basil', farm: 'Manhattan Herb Gardens', category: 'Herbs', price: 4.49, unit: 'bunch', image: '🌿', inStock: true },
    { id: '6', name: 'Cucumbers', farm: 'Rooftop Gardens NYC', category: 'Vegetables', price: 3.99, unit: 'lb', image: '🥒', inStock: true },
    { id: '7', name: 'Spinach', farm: 'Brooklyn Urban Farm', category: 'Greens', price: 4.29, unit: 'bunch', image: '🥬', inStock: true },
    { id: '8', name: 'Strawberries', farm: 'Staten Island Berry Farm', category: 'Fruits', price: 6.99, unit: 'pint', image: '🍓', inStock: true },
  ];

  const collectionPoints = [
    'Downtown Community Center - 123 Main St',
    'Eastside Farmers Market - 456 Oak Ave',
    'Westend Plaza - 789 Maple Dr',
    'Northside Hub - 321 Pine St'
  ];

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        toast.success(`Increased ${product.name} quantity`);
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success(`${product.name} added to cart`);
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    toast.success('Item removed from cart');
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const saveBasket = (name) => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    const newBasket = {
      id: crypto.randomUUID(),
      name,
      items: [...cart],
      createdAt: new Date()
    };
    setSavedBaskets(prev => [...prev, newBasket]);
    toast.success(`Basket "${name}" saved!`);
  };

  const loadBasket = (basket) => {
    setCart(basket.items);
    toast.success(`Basket "${basket.name}" loaded`);
    setShowCart(true);
  };

  const deleteBasket = (basketId) => {
    setSavedBaskets(prev => prev.filter(b => b.id !== basketId));
    toast.success('Basket deleted');
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setShowCheckout(true);
  };

  const completeOrder = () => {
    setCart([]);
    setDeliveryMethod(null);
    setShowCheckout(false);
    setShowCart(false);
    toast.success('Order placed successfully!');
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Toaster position="top-center" richColors />

      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                <Sprout className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">FreshHarvest</h1>
                <p className="text-sm text-gray-600">Urban Farm Produce</p>
              </div>
            </div>

            <button
              onClick={() => setShowCart(!showCart)}
              className="relative bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-semibold">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-8 h-8 text-green-600" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Fresh From Urban Farms
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Locally grown, sustainably harvested produce delivered to your door or collection point
          </p>
        </div>

        {/* Saved Baskets */}
        {savedBaskets.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookmarkPlus className="w-6 h-6 text-green-600" />
              Your Saved Baskets
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedBaskets.map(basket => (
                <div key={basket.id} className="bg-white rounded-xl shadow-md p-4 border-2 border-gray-200 hover:shadow-lg hover:border-green-400 transition-all duration-300">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">{basket.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {basket.items.length} items • ${basket.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => loadBasket(basket)}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-semibold"
                    >
                      Load
                    </button>
                    <button
                      onClick={() => deleteBasket(basket.id)}
                      className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Fresh Produce</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-gray-100 hover:border-green-400">
                <div className="h-40 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center text-6xl">
                  {product.image}
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-lg text-gray-900 mb-1">{product.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{product.farm}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-green-600">${product.price}</span>
                    <span className="text-sm text-gray-500">per {product.unit}</span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Package className="w-6 h-6 text-green-600" />
            Delivery Method
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setDeliveryMethod({ type: 'home' })}
              className={`p-6 rounded-xl border-2 transition-all duration-300 ${deliveryMethod?.type === 'home' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}
            >
              <Home className="w-8 h-8 text-green-600 mb-3" />
              <h4 className="font-bold text-lg mb-2">Home Delivery</h4>
              <p className="text-sm text-gray-600">Delivered to your doorstep</p>
            </button>
            <button
              onClick={() => setDeliveryMethod({ type: 'collection', collectionPoint: collectionPoints[0] })}
              className={`p-6 rounded-xl border-2 transition-all duration-300 ${deliveryMethod?.type === 'collection' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}
            >
              <MapPin className="w-8 h-8 text-green-600 mb-3" />
              <h4 className="font-bold text-lg mb-2">Collection Point</h4>
              <p className="text-sm text-gray-600">Pick up from nearby location</p>
            </button>
          </div>
          {deliveryMethod?.type === 'collection' && (
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Collection Point</label>
              <select
                onChange={(e) => setDeliveryMethod({ type: 'collection', collectionPoint: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none transition-colors duration-200"
              >
                {collectionPoints.map((point, idx) => (
                  <option key={idx} value={point}>{point}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </main>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-2xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b-2 border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.product.id} className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-3xl">{item.product.image}</span>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{item.product.name}</h4>
                            <p className="text-sm text-gray-600">${item.product.price} / {item.product.unit}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-2 bg-white border-2 border-gray-200 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-semibold text-lg w-12 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-2 bg-white border-2 border-gray-200 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <span className="ml-auto font-bold text-green-600">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t-2 border-gray-200 pt-4 mb-4">
                    <div className="flex items-center justify-between text-xl font-bold">
                      <span>Total:</span>
                      <span className="text-green-600">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const name = prompt('Enter a name for this basket:');
                      if (name) saveBasket(name);
                    }}
                    className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center gap-2 mb-3"
                  >
                    <Save className="w-5 h-5" />
                    Save Basket
                  </button>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Checkout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b-2 border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
              <button
                onClick={() => setShowCheckout(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                <div className="space-y-2">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span>{item.product.name} x {item.quantity}</span>
                      <span className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t-2 border-gray-200 mt-4 pt-4 flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-green-600">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2">Delivery Method</h3>
                {deliveryMethod ? (
                  <div className="bg-green-50 border-2 border-green-600 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {deliveryMethod.type === 'home' ? <Home className="w-5 h-5 text-green-600" /> : <MapPin className="w-5 h-5 text-green-600" />}
                      <span className="font-semibold capitalize">{deliveryMethod.type} {deliveryMethod.type === 'home' ? 'Delivery' : 'Point'}</span>
                    </div>
                    {deliveryMethod.collectionPoint && (
                      <p className="text-sm text-gray-700">{deliveryMethod.collectionPoint}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-red-600 text-sm">Please select a delivery method</p>
                )}
              </div>

              <button
                onClick={completeOrder}
                disabled={!deliveryMethod}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
