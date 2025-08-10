import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import ChatScreen from './src/screens/ChatScreen';

const AppContent = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <>
      <ChatScreen />
      <StatusBar style={isDarkMode ? "light" : "dark"} />
    </>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}