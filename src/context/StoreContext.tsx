import React, { createContext, useContext, useState, useEffect } from 'react';
import { Crop, Farm, DropOffPoint, CartItem, SavedBasket } from '../types';

interface StoreContextType {
  crops: Crop[];
  farms: Farm[];
  dropOffPoints: DropOffPoint[];
  cart: CartItem[];
  savedBaskets: SavedBasket[];
  isAdmin: boolean;
  addToCart: (crop: Crop, quantity: number) => void;
  removeFromCart: (cropId: string) => void;
  updateCartQuantity: (cropId: string, quantity: number) => void;
  clearCart: () => void;
  saveBasket: (name: string) => void;
  loadBasket: (basketId: string) => void;
  deleteBasket: (basketId: string) => void;
  addCrop: (crop: Crop) => void;
  updateCrop: (crop: Crop) => void;
  deleteCrop: (cropId: string) => void;
  addFarm: (farm: Farm) => void;
  updateFarm: (farm: Farm) => void;
  deleteFarm: (farmId: string) => void;
  addDropOffPoint: (point: DropOffPoint) => void;
  updateDropOffPoint: (point: DropOffPoint) => void;
  deleteDropOffPoint: (pointId: string) => void;
  setIsAdmin: (value: boolean) => void;
  assignFarmToCrop: (cropId: string, farmId: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const initialCrops: Crop[] = [
  {
    id: '1',
    name: 'Organic Tomatoes',
    description: 'Fresh, vine-ripened tomatoes grown in urban farms',
    price: 4.99,
    unit: 'lb',
    image: 'https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=400',
    stock: 50,
    category: 'Vegetables',
  },
  {
    id: '2',
    name: 'Fresh Lettuce',
    description: 'Crisp green lettuce, perfect for salads',
    price: 2.99,
    unit: 'head',
    image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400',
    stock: 30,
    category: 'Vegetables',
  },
  {
    id: '3',
    name: 'Carrots Bundle',
    description: 'Sweet, crunchy carrots with tops',
    price: 3.49,
    unit: 'bunch',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
    stock: 40,
    category: 'Vegetables',
  },
  {
    id: '4',
    name: 'Fresh Strawberries',
    description: 'Sweet and juicy local strawberries',
    price: 5.99,
    unit: 'pint',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400',
    stock: 25,
    category: 'Fruits',
  },
  {
    id: '5',
    name: 'Organic Kale',
    description: 'Nutrient-rich kale leaves',
    price: 3.99,
    unit: 'bunch',
    image: 'https://images.unsplash.com/photo-1560896575-d458cc1f2894?w=400',
    stock: 35,
    category: 'Vegetables',
  },
  {
    id: '6',
    name: 'Bell Peppers',
    description: 'Mixed color bell peppers',
    price: 4.49,
    unit: 'lb',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400',
    stock: 45,
    category: 'Vegetables',
  },
];

const initialFarms: Farm[] = [
  {
    id: 'f1',
    name: 'Green City Farms',
    location: 'Downtown District',
    description: 'Rooftop urban farm specializing in leafy greens',
    contact: '555-0101',
    email: 'info@greencityfarms.com',
  },
  {
    id: 'f2',
    name: 'Urban Harvest Co',
    location: 'Eastside',
    description: 'Community-based urban agriculture',
    contact: '555-0102',
    email: 'contact@urbanharvestco.com',
  },
];

const initialDropOffPoints: DropOffPoint[] = [
  {
    id: 'd1',
    name: 'Central Market',
    address: '123 Main St',
    lat: 40.7128,
    lng: -74.0060,
    hours: 'Mon-Sat 8AM-6PM',
  },
  {
    id: 'd2',
    name: 'Eastside Community Center',
    address: '456 East Ave',
    lat: 40.7300,
    lng: -73.9950,
    hours: 'Mon-Fri 9AM-5PM',
  },
  {
    id: 'd3',
    name: 'Westside Hub',
    address: '789 West Blvd',
    lat: 40.7100,
    lng: -74.0150,
    hours: 'Daily 7AM-7PM',
  },
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [crops, setCrops] = useState<Crop[]>(() => {
    const saved = localStorage.getItem('crops');
    return saved ? JSON.parse(saved) : initialCrops;
  });

  const [farms, setFarms] = useState<Farm[]>(() => {
    const saved = localStorage.getItem('farms');
    return saved ? JSON.parse(saved) : initialFarms;
  });

  const [dropOffPoints, setDropOffPoints] = useState<DropOffPoint[]>(() => {
    const saved = localStorage.getItem('dropOffPoints');
    return saved ? JSON.parse(saved) : initialDropOffPoints;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [savedBaskets, setSavedBaskets] = useState<SavedBasket[]>(() => {
    const saved = localStorage.getItem('savedBaskets');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    localStorage.setItem('crops', JSON.stringify(crops));
  }, [crops]);

  useEffect(() => {
    localStorage.setItem('farms', JSON.stringify(farms));
  }, [farms]);

  useEffect(() => {
    localStorage.setItem('dropOffPoints', JSON.stringify(dropOffPoints));
  }, [dropOffPoints]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('savedBaskets', JSON.stringify(savedBaskets));
  }, [savedBaskets]);

  const addToCart = (crop: Crop, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.crop.id === crop.id);
      if (existing) {
        return prev.map(item =>
          item.crop.id === crop.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { crop, quantity }];
    });
  };

  const removeFromCart = (cropId: string) => {
    setCart(prev => prev.filter(item => item.crop.id !== cropId));
  };

  const updateCartQuantity = (cropId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cropId);
    } else {
      setCart(prev =>
        prev.map(item =>
          item.crop.id === cropId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const saveBasket = (name: string) => {
    const newBasket: SavedBasket = {
      id: crypto.randomUUID(),
      name,
      items: cart,
      createdAt: new Date(),
    };
    setSavedBaskets(prev => [...prev, newBasket]);
  };

  const loadBasket = (basketId: string) => {
    const basket = savedBaskets.find(b => b.id === basketId);
    if (basket) {
      setCart(basket.items);
    }
  };

  const deleteBasket = (basketId: string) => {
    setSavedBaskets(prev => prev.filter(b => b.id !== basketId));
  };

  const addCrop = (crop: Crop) => {
    setCrops(prev => [...prev, { ...crop, id: crypto.randomUUID() }]);
  };

  const updateCrop = (crop: Crop) => {
    setCrops(prev => prev.map(c => (c.id === crop.id ? crop : c)));
  };

  const deleteCrop = (cropId: string) => {
    setCrops(prev => prev.filter(c => c.id !== cropId));
  };

  const addFarm = (farm: Farm) => {
    setFarms(prev => [...prev, { ...farm, id: crypto.randomUUID() }]);
  };

  const updateFarm = (farm: Farm) => {
    setFarms(prev => prev.map(f => (f.id === farm.id ? farm : f)));
  };

  const deleteFarm = (farmId: string) => {
    setFarms(prev => prev.filter(f => f.id !== farmId));
  };

  const addDropOffPoint = (point: DropOffPoint) => {
    setDropOffPoints(prev => [...prev, { ...point, id: crypto.randomUUID() }]);
  };

  const updateDropOffPoint = (point: DropOffPoint) => {
    setDropOffPoints(prev => prev.map(p => (p.id === point.id ? point : p)));
  };

  const deleteDropOffPoint = (pointId: string) => {
    setDropOffPoints(prev => prev.filter(p => p.id !== pointId));
  };

  const assignFarmToCrop = (cropId: string, farmId: string) => {
    setCrops(prev =>
      prev.map(c => (c.id === cropId ? { ...c, farmId } : c))
    );
  };

  return (
    <StoreContext.Provider
      value={{
        crops,
        farms,
        dropOffPoints,
        cart,
        savedBaskets,
        isAdmin,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        saveBasket,
        loadBasket,
        deleteBasket,
        addCrop,
        updateCrop,
        deleteCrop,
        addFarm,
        updateFarm,
        deleteFarm,
        addDropOffPoint,
        updateDropOffPoint,
        deleteDropOffPoint,
        setIsAdmin,
        assignFarmToCrop,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
};
