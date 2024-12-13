"use client";

import { createContext, ReactNode, useState } from "react";

type RC = {
  rc: number;
  fornecedor: string;
  CNPJ: number;
  reqDate: Date;
  status: string;
  solicitante: string;
};

type AppContextType = {
  resultRC: RC[];
  setResultRC: React.Dispatch<React.SetStateAction<RC[]>>;
  isNewRegister: boolean;
  setIsNewRegister: React.Dispatch<React.SetStateAction<boolean>>;
};

type AppProviderProps = {
  children: ReactNode;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: AppProviderProps) => {
  const [resultRC, setResultRC] = useState<RC[]>([]);
  const [isNewRegister, setIsNewRegister] = useState(false)
  return (
    <AppContext.Provider value={{ resultRC, setResultRC, isNewRegister,setIsNewRegister }}>
      {children}
    </AppContext.Provider>
  );
};
