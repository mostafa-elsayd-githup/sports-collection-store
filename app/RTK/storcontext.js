"use client"
import { createContext, useContext, useState } from "react";

const storecontext = createContext();

export const StoreProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);
  return (

    <storecontext.Provider value={{ isOpen, setIsOpen ,selectedProduct, setSelectedProduct}}>
      {children}
    </storecontext.Provider>
  );
};

export const useOpneing = () => useContext(storecontext);