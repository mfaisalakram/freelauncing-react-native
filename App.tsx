import React from 'react';
import { Provider } from 'react-redux';
import App from './app/components/Screens/index';
import store, { persistor } from './app/store/index';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from './app/utils/themeContext';
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'new NativeEventEmitter',
  'Overwriting fontFamily style attribute preprocessor',
]);
LogBox.ignoreAllLogs();

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      myOwnColor: string;
    }

    interface Theme {
      myOwnProperty: boolean;
    }
  }
}

// const _loadAssets = async () => {
//   try{
//     await Font.loadAsync({
//       'SFProDisplay-Bold': require('./assets/fonts/SFProDisplay-Bold.ttf'),
//       'SFProDisplay-Regular': require('./assets/fonts/SFProDisplay-Regular.ttf'),
//       'SFProDisplay-Light': require('./assets/fonts/SFProDisplay-Light.ttf'),
//       // 'MaterialCommunityIcons': require('./node_modules/@expo/vector-icons/MaterialCommunityIcons'),
//     });
//   } catch (ex) {
//   }
// };

export default function Main() {
  // const [isReady, setReady] = useState(false);
  // if (!isReady) {
  //   // this is what makes sure the fonts are ready before loading the app
  //   return (
  //     <AppLoading
  //       startAsync={_loadAssets} // this loads the fonts
  //       onFinish={() => setReady(true)}
  //       onError={(e) => console.error(e)}
  //     />
  //   );
  // }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <PaperProvider>
            <App />
          </PaperProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

// AppRegistry.registerComponent(appName.name, () => Main);
