import { bindActionCreators } from 'redux';
import * as React from 'react';
import { useColorScheme } from 'react-native-appearance';
import { lightColors, darkColors } from './colors';
import { themeAc } from '../store/useThemeStore/actions';
import { getThemeColor } from '../store/useThemeStore/selector';
import { useDispatch, useSelector } from 'react-redux';
export const ThemeContext = React.createContext({
  isDark: false,
  colors: lightColors,
  setScheme: (data) => {},
});
export const ThemeProvider = (props) => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const DAC = bindActionCreators(themeAc, dispatch);
  const themeColor = useSelector(getThemeColor);
  const getIsDark = () => {
    if (themeColor.color && themeColor.color === 'dark') {
      return true;
    }
    return false;
  };
  const [isDark, setIsDark] = React.useState(getIsDark());
  React.useEffect(() => {
    setIsDark(colorScheme === 'dark');
    // DAC.changeTheme('dark');
  }, [colorScheme]);
  React.useEffect(() => {
    if (isDark === true) {
      DAC.changeTheme('dark');
    } else {
      DAC.changeTheme('light');
    }
  }, [DAC, isDark]);
  const defaultTheme = {
    isDark,
    colors: isDark ? darkColors : lightColors,
    setScheme: (scheme) => setIsDark(scheme === 'dark'),
  };
  return (
    <ThemeContext.Provider value={defaultTheme}>
      {props.children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => React.useContext(ThemeContext);
