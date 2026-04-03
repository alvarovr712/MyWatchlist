import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigation/RootNavigator';
import { useWatchlistStore } from './store/WatchlistStore';
import { mockInstruments } from './data/MockInstruments';




function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const setInstruments = useWatchlistStore((state) => state.setInstruments);

  useEffect(() => {
    
    setInstruments(mockInstruments);

    const interval = setInterval(() => {
      useWatchlistStore.getState().updatePrices();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RootNavigator />
    </SafeAreaProvider>
  );
}

export default App;
