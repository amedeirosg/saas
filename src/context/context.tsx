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
};

type AppProviderProps = {
  children: ReactNode;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: AppProviderProps) => {
  const [resultRC, setResultRC] = useState<RC[]>([]);

  return (
    <AppContext.Provider value={{ resultRC, setResultRC }}>
      {children}
    </AppContext.Provider>
  );
};
