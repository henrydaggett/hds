import { createContext } from 'react';

export type RadioGroupContextValue = {
  size: 'small' | 'medium' | 'large';
};

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);
