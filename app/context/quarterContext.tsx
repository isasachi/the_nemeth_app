'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Quarter {
  quarter_id: String;
  name: string;
  start_date: Date;
  end_date: Date;
  break_dates: Date[];
}

interface QuarterContextProps {
  quarters: Quarter[];
  selectedQuarter: Quarter | null;
  setQuarters: React.Dispatch<React.SetStateAction<Quarter[]>>;
  setSelectedQuarter: React.Dispatch<React.SetStateAction<Quarter | null>>;
}

const QuarterContext = createContext<QuarterContextProps | undefined>(undefined);

export const useQuarter = () => {
  const context = useContext(QuarterContext);
  if (!context) {
    throw new Error('useQuarter must be used within a QuarterProvider');
  }
  return context;
};

interface QuarterProviderProps {
  children: ReactNode;
}

const LOCAL_STORAGE_KEY = 'quarterData';

export const QuarterProvider: React.FC<QuarterProviderProps> = ({ children }) => {
  const [quarters, setQuarters] = useState<Quarter[]>([]);
  const [selectedQuarter, setSelectedQuarter] = useState<Quarter | null>(null);

  // Load data from local storage on initial render
  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData, (key, value) => {
        if (key === 'start_date' || key === 'end_date') {
          return new Date(value);
        }
        if (key === 'break_dates') {
          return value.map((date: string) => new Date(date));
        }
        return value;
      });
      setQuarters(parsedData);
    }
  }, []);

  // Save data to local storage whenever quarters change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(quarters));
  }, [quarters]);

  return (
    <QuarterContext.Provider value={{ quarters, selectedQuarter, setQuarters, setSelectedQuarter }}>
      {children}
    </QuarterContext.Provider>
  );
};
