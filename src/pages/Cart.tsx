import { useState } from 'react';
import { Trash2, Minus, Plus, Home, MapPin, Save } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../components/PaymentForm';

const stripePromise = loadStripe('pk_test_demo');

export default function Cart() {
  const { cart, updateCartQuantity, removeFromCart, clearCart, dropOffPoints, saveBasket } = useStore();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [deliveryMethod, setDeliveryMethod] = useState<'home' | 'collection'>('home');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedDropOff, setSelectedDropOff] = useState('');
  const [basketName, setBasketName] = useState('');
  const [showSaveBasket, setShowSaveBasket] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.crop.price * item.quantity, 0);

  const handleSaveBasket = () => {
    if (!basketName.trim()) {
      alert('Please enter a basket name');
      return;
    }
    saveBasket(basketName);
    setBasketName('');
    setShowSaveBasket(false);
    alert('Basket saved successfully!');
  };

  const handleProceedToPayment = () => {
    if (cart.length === 0) return;

    if (!isAuthenticated) {
      alert('Please login to continue with checkout');
      navigate('/');
      return;
    }

    if (deliveryMethod === 'home' && !selectedAddress) {
      alert('Please select a delivery address');
      return;
    }

    if (deliveryMethod === 'collection' && !selectedDropOff) {
      alert('Please select a collection point');
      return;
    }

    setShowPayment(true);
  };

  const handlePaymentSuccess = (paymentIntentId: string) => {
    alert('Payment successful! Your order has been placed. Order ID: ' + paymentIntentId);
    clearCart();
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some fresh produce to get started!</p>
          <button
            onClick={() => navigate('/')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  if (showPayment) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Complete Your Order</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
            <div className="space-y-2 mb-4">
              {cart.map(item => (
                <div key={item.crop.id} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.crop.name} × {item.quantity}
                  </span>
                  <span className="text-gray-900 font-semibold">
                    ${(item.crop.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">Total:</span>
                <span className="font-bold text-green-600">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Elements stripe={stripePromise}>
            <PaymentForm
              amount={total}
              onSuccess={handlePaymentSuccess}
              onCancel={() => setShowPayment(false)}
            />
          </Elements>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <button
            onClick={() => setShowSaveBasket(!showSaveBasket)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-5 h-5" />
            Save as Basket
          </button>
        </div>

        {!isAuthenticated && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 text-sm">
              Please login to save addresses and complete checkout
            </p>
          </div>
        )}

        {showSaveBasket && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter basket name..."
                value={basketName}
                onChange={(e) => setBasketName(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSaveBasket}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setShowSaveBasket(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          {cart.map(item => (
            <div key={item.crop.id} className="flex items-center gap-4 p-4 border-b border-gray-200 last:border-b-0">
              <img
                src={item.crop.image}
                alt={item.crop.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.crop.name}</h3>
                <p className="text-gray-600 text-sm">${item.crop.price.toFixed(2)} / {item.crop.unit}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateCartQuantity(item.crop.id, item.quantity - 1)}
                  className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateCartQuantity(item.crop.id, item.quantity + 1)}
                  className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="w-24 text-right font-bold text-gray-900">
                ${(item.crop.price * item.quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(item.crop.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery Method</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="delivery"
                value="home"
                checked={deliveryMethod === 'home'}
                onChange={(e) => setDeliveryMethod(e.target.value as 'home')}
                className="w-5 h-5 text-green-600"
              />
              <Home className="w-6 h-6 text-gray-600" />
              <div className="flex-1">
                <div className="font-semibold text-gray-900">Home Delivery</div>
                <div className="text-sm text-gray-600">We will deliver to your address</div>
              </div>
            </label>

            {deliveryMethod === 'home' && (
              <div className="ml-11">
                {isAuthenticated && user?.addresses && user.addresses.length > 0 ? (
                  <select
                    value={selectedAddress}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select a delivery address...</option>
                    {user.addresses.map(address => (
                      <option key={address.id} value={address.id}>
                        {address.label} - {address.street}, {address.city}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {isAuthenticated ? (
                      <>
                        No saved addresses.{' '}
                        <button
                          onClick={() => navigate('/profile')}
                          className="text-green-600 hover:text-green-700 font-medium"
                        >
                          Add an address
                        </button>
                      </>
                    ) : (
                      'Please login to select a saved address'
                    )}
                  </div>
                )}
              </div>
            )}

            <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="delivery"
                value="collection"
                checked={deliveryMethod === 'collection'}
                onChange={(e) => setDeliveryMethod(e.target.value as 'collection')}
                className="w-5 h-5 text-green-600"
              />
              <MapPin className="w-6 h-6 text-gray-600" />
              <div className="flex-1">
                <div className="font-semibold text-gray-900">Collection Point</div>
                <div className="text-sm text-gray-600">Pick up from a nearby location</div>
              </div>
            </label>

            {deliveryMethod === 'collection' && (
              <div className="ml-11">
                <select
                  value={selectedDropOff}
                  onChange={(e) => setSelectedDropOff(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select a collection point...</option>
                  {dropOffPoints.map(point => (
                    <option key={point.id} value={point.id}>
                      {point.name} - {point.address} ({point.hours})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-bold text-gray-900">Total:</span>
            <span className="text-3xl font-bold text-green-600">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={handleProceedToPayment}
            className="w-full bg-green-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
