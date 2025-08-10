import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme, Appearance } from 'react-native';
import { LIGHT_COLORS, DARK_COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } from '../constants/theme';


const ThemeContext = createContext({
  colors: LIGHT_COLORS,
  isDarkMode: false,
  spacing: SPACING,
  fontSizes: FONT_SIZES,
  fontWeights: FONT_WEIGHTS,
  borderRadius: BORDER_RADIUS,
  shadows: SHADOWS,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(true); 
  const [useSystemTheme, setUseSystemTheme] = useState(false);

  useEffect(() => {
    if (useSystemTheme) {
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        // console.log('Appearance changed to:', colorScheme);
        setIsDarkMode(colorScheme === 'dark');
      });

      // console.log('System color scheme:', systemColorScheme);
      setIsDarkMode(systemColorScheme === 'dark');

      return () => subscription?.remove();
    }
  }, [systemColorScheme, useSystemTheme]);

  const toggleTheme = () => {
    if (useSystemTheme) {
      setUseSystemTheme(false);
      setIsDarkMode(!isDarkMode);
    } else {
      setIsDarkMode(!isDarkMode);
    }
  };

  const colors = isDarkMode ? DARK_COLORS : LIGHT_COLORS;

  const theme = {
    colors,
    isDarkMode,
    toggleTheme,
    useSystemTheme,
    setUseSystemTheme,
    spacing: SPACING,
    fontSizes: FONT_SIZES,
    fontWeights: FONT_WEIGHTS,
    borderRadius: BORDER_RADIUS,
    shadows: SHADOWS,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};