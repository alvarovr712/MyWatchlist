import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigation/RootNavigator';
import { useWatchlistStore } from './store/WatchlistStore';
import { mockInstruments } from './data/MockInstruments';
import Toast from 'react-native-toast-message';




function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const setInstruments = useWatchlistStore((state) => state.setInstruments);

  useEffect(() => {

    const { fetchInstruments } = useWatchlistStore.getState();

    fetchInstruments();

    const interval = setInterval(() => {
      fetchInstruments();
    }, 5000)

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RootNavigator />
      <Toast />
    </SafeAreaProvider>
  );
}

export default App;
