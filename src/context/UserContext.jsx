import { createContext, useContext, useMemo, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const UserContext = createContext(null);

const defaultUser = {
  name: '',
  phone: '',
  email: '',
  addresses: [],
};

export function UserProvider({ children }) {
  const [user, setUser] = useLocalStorage('honey_user', defaultUser);
  const [orders, setOrders] = useLocalStorage('honey_orders', []);

  const updateUser = useCallback((data) => {
    setUser((prev) => ({ ...prev, ...data }));
  }, [setUser]);

  const addAddress = useCallback((address) => {
    setUser((prev) => ({
      ...prev,
      addresses: [...prev.addresses, { id: Date.now(), ...address }],
    }));
  }, [setUser]);

  const removeAddress = useCallback((addressId) => {
    setUser((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((addr) => addr.id !== addressId),
    }));
  }, [setUser]);

  const addOrder = useCallback((order) => {
    setOrders((prev) => [
      {
        id: `ORD-${Date.now()}`,
        date: new Date().toISOString(),
        status: 'processing',
        ...order,
      },
      ...prev,
    ]);
  }, [setOrders]);

  const value = useMemo(
    () => ({
      user,
      orders,
      updateUser,
      addAddress,
      removeAddress,
      addOrder,
    }),
    [user, orders, updateUser, addAddress, removeAddress, addOrder]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
