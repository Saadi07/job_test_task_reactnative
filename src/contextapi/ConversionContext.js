import React, {createContext, useState} from 'react';

export const ConversionContext = createContext();

export const ConversionProvider = ({children}) => {
  const [isImperial, setIsImperial] = useState(true);
  const [weight, setWeight] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [heightMeters, setHeightMeters] = useState('');

  // Helper function to convert units
  const convertUnits = (value, factor) => {
    return isImperial ? Math.round(value * factor) : Math.round(value / factor);
  };

  return (
    <ConversionContext.Provider
      value={{
        isImperial,
        setIsImperial,
        weight,
        setWeight,
        heightFeet,
        setHeightFeet,
        heightInches,
        setHeightInches,
        heightMeters,
        setHeightMeters,
        convertUnits,
      }}>
      {children}
    </ConversionContext.Provider>
  );
};
