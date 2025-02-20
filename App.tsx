import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { useFonts } from 'expo-font';
import Header from './app/components/Header';
import Propinas from './app/screens/Propinas';
import Footer from './app/components/Footer';
import { COLORS } from './app/constants/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Winter Lemon.ttf'),
    'Poppins-Bold': require('./assets/fonts/Winter Lemon.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Winter Lemon.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
      <View style={styles.container}>
        <Header 
          titulo='Calculadora de Propinas'
          nombre='Moises Ramirez Martinez'
          imagen={require('./assets/profile.png')} 
        />
        <Propinas />
        <Footer fecha='2025-02-07' telefono='614-123-4567' />
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});

