import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './navigation/AppNavigator';
import { useWatchlistStore } from './store/WatchlistStore';
import { mockInstruments } from './data/mockInstruments';


function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const setInstruments = useWatchlistStore((state) => state.setInstruments);

  useEffect(() => {
    setInstruments(mockInstruments);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;
