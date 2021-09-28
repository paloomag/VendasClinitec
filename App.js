import React, { useEffect } from 'react';
import * as Location from 'expo-location';
import Routes from './src/Routes'

const App = () => {
  useEffect(() => {
    (async () => {
      console.log('teste')
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status)
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
    })();
  }, []);
  return <Routes />;
}

export default App;