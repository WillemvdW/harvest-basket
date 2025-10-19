import { useState } from 'react';
import { Plus, Edit, Trash2, Tractor } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Crop } from '../../types';

export default function Inventory() {
  const { crops, addCrop, updateCrop, deleteCrop, farms, assignFarmToCrop } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingCrop, setEditingCrop] = useState<Crop | null>(null);
  const [showFarmSelector, setShowFarmSelector] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    unit: '',
    image: '',
    stock: '',
    category: 'Vegetables',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cropData: Crop = {
      id: editingCrop?.id || '',
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      unit: formData.unit,
      image: formData.image || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400',
      stock: parseInt(formData.stock),
      category: formData.category,
      farmId: editingCrop?.farmId,
    };

    if (editingCrop) {
      updateCrop(cropData);
    } else {
      addCrop(cropData);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      unit: '',
      image: '',
      stock: '',
      category: 'Vegetables',
    });
    setEditingCrop(null);
    setShowForm(false);
  };

  const handleEdit = (crop: Crop) => {
    setEditingCrop(crop);
    setFormData({
      name: crop.name,
      description: crop.description,
      price: crop.price.toString(),
      unit: crop.unit,
      image: crop.image,
      stock: crop.stock.toString(),
      category: crop.category,
    });
    setShowForm(true);
  };

  const handleDelete = (cropId: string) => {
    if (confirm('Are you sure you want to delete this crop?')) {
      deleteCrop(cropId);
    }
  };

  const handleAssignFarm = (cropId: string, farmId: string) => {
    assignFarmToCrop(cropId, farmId);
    setShowFarmSelector(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingCrop ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Herbs">Herbs</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., lb, bunch, pint"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  {editingCrop ? 'Update' : 'Add'} Product
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crops.map(crop => {
            const assignedFarm = farms.find(f => f.id === crop.farmId);
            return (
              <div key={crop.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-40 overflow-hidden bg-gray-100">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{crop.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{crop.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-xl font-bold text-green-600">
                        ${crop.price.toFixed(2)}
                      </span>
                      <span className="text-gray-500 text-sm ml-1">/{crop.unit}</span>
                    </div>
                    <span className="text-sm text-gray-500">Stock: {crop.stock}</span>
                  </div>

                  {assignedFarm && (
                    <div className="mb-3 p-2 bg-green-50 rounded border border-green-200">
                      <div className="flex items-center gap-2 text-sm text-green-700">
                        <Tractor className="w-4 h-4" />
                        <span className="font-medium">{assignedFarm.name}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowFarmSelector(showFarmSelector === crop.id ? null : crop.id)}
                      className="flex-1 flex items-center justify-center gap-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <Tractor className="w-4 h-4" />
                      Farm
                    </button>
                    <button
                      onClick={() => handleEdit(crop)}
                      className="flex items-center justify-center gap-1 bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(crop.id)}
                      className="flex items-center justify-center gap-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {showFarmSelector === crop.id && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Assign Supplier Farm
                      </label>
                      <select
                        value={crop.farmId || ''}
                        onChange={(e) => handleAssignFarm(crop.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        <option value="">No farm assigned</option>
                        {farms.map(farm => (
                          <option key={farm.id} value={farm.id}>
                            {farm.name} - {farm.location}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
