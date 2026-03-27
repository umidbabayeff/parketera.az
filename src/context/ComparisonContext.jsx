import React, { createContext, useContext, useState, useEffect } from 'react';

const ComparisonContext = createContext();

export const ComparisonProvider = ({ children }) => {
  const [comparedProducts, setComparedProducts] = useState(() => {
    const saved = localStorage.getItem('comparison_list');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('comparison_list', JSON.stringify(comparedProducts));
  }, [comparedProducts]);

  const addToCompare = (product) => {
    if (comparedProducts.find(p => p.id === product.id)) {
      return { success: false, message: 'already_added' };
    }
    if (comparedProducts.length >= 4) {
      return { success: false, message: 'limit_reached' };
    }
    setComparedProducts([...comparedProducts, product]);
    return { success: true };
  };

  const removeFromCompare = (productId) => {
    setComparedProducts(comparedProducts.filter(p => p.id !== productId));
  };

  const clearComparison = () => {
    setComparedProducts([]);
  };

  return (
    <ComparisonContext.Provider value={{ 
      comparedProducts, 
      addToCompare, 
      removeFromCompare, 
      clearComparison 
    }}>
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};
