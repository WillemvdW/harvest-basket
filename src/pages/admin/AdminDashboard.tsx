import { Link } from 'react-router-dom';
import { Package, MapPin, Tractor, BarChart3 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export default function AdminDashboard() {
  const { crops, farms, dropOffPoints } = useStore();

  const stats = [
    {
      name: 'Total Products',
      value: crops.length,
      icon: Package,
      color: 'bg-blue-500',
      link: '/admin/inventory',
    },
    {
      name: 'Active Farms',
      value: farms.length,
      icon: Tractor,
      color: 'bg-green-500',
      link: '/admin/farms',
    },
    {
      name: 'Drop-off Points',
      value: dropOffPoints.length,
      icon: MapPin,
      color: 'bg-purple-500',
      link: '/admin/dropoffs',
    },
    {
      name: 'Total Stock',
      value: crops.reduce((sum, crop) => sum + crop.stock, 0),
      icon: BarChart3,
      color: 'bg-orange-500',
      link: '/admin/inventory',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your urban farm marketplace</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map(stat => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.name}
                to={stat.link}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">{stat.name}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-4 rounded-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/admin/inventory"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 group"
          >
            <Package className="w-12 h-12 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Inventory Management</h3>
            <p className="text-gray-600">Add, edit, or remove products. Update prices and stock levels.</p>
          </Link>

          <Link
            to="/admin/farms"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 group"
          >
            <Tractor className="w-12 h-12 text-green-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Farm Registry</h3>
            <p className="text-gray-600">Manage source farms and assign suppliers to products.</p>
          </Link>

          <Link
            to="/admin/dropoffs"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 group"
          >
            <MapPin className="w-12 h-12 text-purple-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Drop-off Points</h3>
            <p className="text-gray-600">Manage collection points and view locations on map.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
