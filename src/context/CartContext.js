import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartIds, setCartIds] = useState([]);

  const toggleCart = (id) =>
    setCartIds((current) =>
      current.includes(id) ? current.filter((cartId) => cartId !== id) : [...current, id]
    );

  return (
    <CartContext.Provider value={{ cartIds, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
