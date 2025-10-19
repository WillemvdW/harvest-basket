import { ShoppingCart, User, Menu, X, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import AuthModal from './AuthModal';

export default function Header() {
  const { cart, isAdmin, setIsAdmin } = useStore();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAdminToggle = () => {
    setIsAdmin(!isAdmin);
    navigate(isAdmin ? '/' : '/admin');
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-green-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">🌾</span>
              </div>
              <span className="text-2xl font-bold">Harvest Basket</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="hover:text-green-200 transition-colors font-medium">
                Shop
              </Link>
              <Link to="/baskets" className="hover:text-green-200 transition-colors font-medium">
                My Baskets
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="flex items-center space-x-2 hover:text-green-200 transition-colors font-medium">
                    <User className="w-5 h-5" />
                    <span>{user?.name}</span>
                  </Link>
                  <button
                    onClick={handleAdminToggle}
                    className="hover:text-green-200 transition-colors font-medium text-sm"
                  >
                    {isAdmin ? 'Customer' : 'Admin'}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center space-x-2 hover:text-green-200 transition-colors font-medium"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </button>
              )}
              {!isAdmin && (
                <Link
                  to="/cart"
                  className="relative flex items-center space-x-2 bg-green-700 px-4 py-2 rounded-lg hover:bg-green-800 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart</span>
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
              )}
            </nav>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-green-700 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-green-700 border-t border-green-500">
            <nav className="px-4 py-4 space-y-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-green-200 transition-colors font-medium"
              >
                Shop
              </Link>
              <Link
                to="/baskets"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-green-200 transition-colors font-medium"
              >
                My Baskets
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 hover:text-green-200 transition-colors font-medium"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleAdminToggle}
                    className="w-full text-left py-2 hover:text-green-200 transition-colors font-medium"
                  >
                    {isAdmin ? 'Customer View' : 'Admin View'}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2 hover:text-green-200 transition-colors font-medium"
                >
                  Login
                </button>
              )}
              {!isAdmin && (
                <Link
                  to="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 py-2 hover:text-green-200 transition-colors font-medium"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart ({cartItemsCount})</span>
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
