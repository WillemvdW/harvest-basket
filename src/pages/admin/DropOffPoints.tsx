import { useState } from 'react';
import { Plus, Edit, Trash2, MapPin, Clock } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { DropOffPoint } from '../../types';

export default function DropOffPoints() {
  const { dropOffPoints, addDropOffPoint, updateDropOffPoint, deleteDropOffPoint } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingPoint, setEditingPoint] = useState<DropOffPoint | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    lat: '',
    lng: '',
    hours: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const pointData: DropOffPoint = {
      id: editingPoint?.id || '',
      name: formData.name,
      address: formData.address,
      lat: parseFloat(formData.lat),
      lng: parseFloat(formData.lng),
      hours: formData.hours,
    };

    if (editingPoint) {
      updateDropOffPoint(pointData);
    } else {
      addDropOffPoint(pointData);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      lat: '',
      lng: '',
      hours: '',
    });
    setEditingPoint(null);
    setShowForm(false);
  };

  const handleEdit = (point: DropOffPoint) => {
    setEditingPoint(point);
    setFormData({
      name: point.name,
      address: point.address,
      lat: point.lat.toString(),
      lng: point.lng.toString(),
      hours: point.hours,
    });
    setShowForm(true);
  };

  const handleDelete = (pointId: string) => {
    if (confirm('Are you sure you want to delete this drop-off point?')) {
      deleteDropOffPoint(pointId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Drop-off Collection Points</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Point
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingPoint ? 'Edit Drop-off Point' : 'Add New Drop-off Point'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location Name
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
                    Operating Hours
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Mon-Fri 9AM-5PM"
                    value={formData.hours}
                    onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    required
                    value={formData.lat}
                    onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    required
                    value={formData.lng}
                    onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  {editingPoint ? 'Update' : 'Add'} Point
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

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">All Collection Points</h2>
          <div className="space-y-3">
            {dropOffPoints.map(point => (
              <div key={point.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{point.name}</h3>
                    <div className="flex items-start gap-2 text-sm text-gray-600 mb-1">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{point.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span>{point.hours}</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEdit(point)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(point.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Coordinates: {point.lat.toFixed(6)}, {point.lng.toFixed(6)}
                </div>
              </div>
            ))}
          </div>

          {dropOffPoints.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-500 text-lg">No drop-off points added yet</p>
              <p className="text-gray-400 text-sm mt-2">Click "Add Point" to create your first collection point</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
