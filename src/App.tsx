import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider, useStore } from './context/StoreContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import SavedBaskets from './pages/SavedBaskets';
import Profile from './pages/Profile';
import AdminDashboard from './pages/admin/AdminDashboard';
import Inventory from './pages/admin/Inventory';
import Farms from './pages/admin/Farms';
import DropOffPoints from './pages/admin/DropOffPoints';

function AppRoutes() {
  const { isAdmin } = useStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        {isAdmin ? (
          <>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/inventory" element={<Inventory />} />
            <Route path="/admin/farms" element={<Farms />} />
            <Route path="/admin/dropoffs" element={<DropOffPoints />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/baskets" element={<SavedBaskets />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <StoreProvider>
          <AppRoutes />
        </StoreProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
