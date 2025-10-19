import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Address } from '../types';
import { hashPasswordWithSalt, verifyPassword, generateSalt } from '../utils/crypto';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (email: string, password: string, name: string, phone: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (address: Address) => void;
  deleteAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface StoredUser {
  user: User;
  passwordHash: string;
  salt: string;
}

const USERS_KEY = 'harvest_basket_users';
const CURRENT_USER_KEY = 'harvest_basket_current_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(CURRENT_USER_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState<Map<string, StoredUser>>(() => {
    const saved = localStorage.getItem(USERS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return new Map(Object.entries(parsed));
    }
    return new Map();
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [user]);

  useEffect(() => {
    const obj = Object.fromEntries(users);
    localStorage.setItem(USERS_KEY, JSON.stringify(obj));
  }, [users]);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const userEntry = users.get(email.toLowerCase());
      
      if (!userEntry) {
        return { success: false, message: 'Invalid email or password' };
      }

      const passwordHash = await hashPasswordWithSalt(password, userEntry.salt);
      
      if (passwordHash === userEntry.passwordHash) {
        setUser(userEntry.user);
        return { success: true, message: 'Login successful! Welcome back.' };
      }
      
      return { success: false, message: 'Invalid email or password' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'An error occurred during login. Please try again.' };
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    phone: string
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const emailLower = email.toLowerCase();
      
      if (users.has(emailLower)) {
        return { success: false, message: 'An account with this email already exists' };
      }

      const salt = generateSalt();
      const passwordHash = await hashPasswordWithSalt(password, salt);

      const newUser: User = {
        id: crypto.randomUUID(),
        email: emailLower,
        name: name.trim(),
        phone: phone.trim(),
        addresses: [],
        createdAt: new Date(),
      };

      const newUsers = new Map(users);
      newUsers.set(emailLower, {
        user: newUser,
        passwordHash,
        salt
      });
      
      setUsers(newUsers);
      setUser(newUser);
      
      return { success: true, message: 'Account created successfully! Welcome to Harvest Basket.' };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'An error occurred during registration. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    
    const userEntry = users.get(user.email);
    if (userEntry) {
      const newUsers = new Map(users);
      newUsers.set(user.email, { ...userEntry, user: updatedUser });
      setUsers(newUsers);
    }
  };

  const addAddress = (addressData: Omit<Address, 'id'>) => {
    if (!user) return;

    const newAddress: Address = {
      ...addressData,
      id: crypto.randomUUID(),
    };

    const addresses = user.addresses.map(a => ({ ...a, isDefault: false }));
    if (addressData.isDefault || user.addresses.length === 0) {
      newAddress.isDefault = true;
    }

    updateProfile({ addresses: [...addresses, newAddress] });
  };

  const updateAddress = (address: Address) => {
    if (!user) return;

    const addresses = user.addresses.map(a => {
      if (a.id === address.id) {
        return address;
      }
      if (address.isDefault && a.isDefault) {
        return { ...a, isDefault: false };
      }
      return a;
    });

    updateProfile({ addresses });
  };

  const deleteAddress = (addressId: string) => {
    if (!user) return;
    const addresses = user.addresses.filter(a => a.id !== addressId);
    updateProfile({ addresses });
  };

  const setDefaultAddress = (addressId: string) => {
    if (!user) return;

    const addresses = user.addresses.map(a => ({
      ...a,
      isDefault: a.id === addressId,
    }));

    updateProfile({ addresses });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
