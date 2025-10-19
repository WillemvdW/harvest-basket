import { Trash2, ShoppingCart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export default function SavedBaskets() {
  const { savedBaskets, loadBasket, deleteBasket } = useStore();
  const navigate = useNavigate();

  const handleLoadBasket = (basketId: string) => {
    loadBasket(basketId);
    navigate('/cart');
  };

  if (savedBaskets.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🧺</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No saved baskets</h2>
          <p className="text-gray-600 mb-6">Save your cart to create reusable baskets!</p>
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Saved Baskets</h1>

        <div className="space-y-4">
          {savedBaskets.map(basket => {
            const total = basket.items.reduce((sum, item) => sum + item.crop.price * item.quantity, 0);
            const itemCount = basket.items.reduce((sum, item) => sum + item.quantity, 0);

            return (
              <div key={basket.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{basket.name}</h3>
                      <p className="text-sm text-gray-500">
                        Created {format(new Date(basket.createdAt), 'MMM dd, yyyy')}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this basket?')) {
                          deleteBasket(basket.id);
                        }
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-2 mb-4">
                    {basket.items.map(item => (
                      <div key={item.crop.id} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">
                          {item.crop.name} × {item.quantity}
                        </span>
                        <span className="text-gray-900 font-semibold">
                          ${(item.crop.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600">{itemCount} items</div>
                      <div className="text-xl font-bold text-green-600">${total.toFixed(2)}</div>
                    </div>
                    <button
                      onClick={() => handleLoadBasket(basket.id)}
                      className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Load to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
