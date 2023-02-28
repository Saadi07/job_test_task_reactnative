import React from 'react';
import {ConversionProvider} from './src/contextapi/ConversionContext';
import LoginScreen from './src/LoginScreen';

const App = () => {
  return (
    <ConversionProvider>
      <LoginScreen />
    </ConversionProvider>
  );
};

export default App;
