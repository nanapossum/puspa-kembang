import { useEffect, useState } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Figtree_400Regular,
  Figtree_500Medium,
  Figtree_600SemiBold,
  Figtree_700Bold,
} from '@expo-google-fonts/figtree';

import { COLORS } from './src/theme/colors';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import FavoritScreen from './src/screens/FavoritScreen';
import CartScreen from './src/screens/CartScreen';
import ProfilScreen from './src/screens/ProfilScreen';
import ButtonNavigation from './src/components/ButtonNavigation';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { CartProvider } from './src/context/CartContext';

const TAB_HOME = 'Home';
const TAB_FAVORITES = 'Fave';
const TAB_CART = 'Cart';
const TAB_PROFILE = 'Me';

export default function App() {
  return (
    <FavoritesProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </FavoritesProvider>
  );
}

function AppContent() {
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({
    Figtree_400Regular,
    Figtree_500Medium,
    Figtree_600SemiBold,
    Figtree_700Bold,
  });
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState(TAB_HOME);
  const [selectedId, setSelectedId] = useState(null);
  const [profile, setProfile] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Tombol back Android menutup layar detail
  useEffect(() => {
    if (selectedId === null) return undefined;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      setSelectedId(null);
      return true;
    });
    return () => sub.remove();
  }, [selectedId]);

  if (!fontsLoaded) return null;

  if (showSplash) {
    return (
      <>
        <StatusBar style="dark" />
        <SplashScreen />
      </>
    );
  }

  const detailOpen = selectedId !== null;

  return (
    <View style={styles.safe}>
      <StatusBar style="dark" />

      {detailOpen && (
        <DetailScreen
          route={{ params: { id: selectedId } }}
          navigation={{ goBack: () => setSelectedId(null) }}
        />
      )}

      {/* Disembunyikan (bukan di-unmount) saat detail terbuka, supaya state pencarian tetap */}
      <View style={[styles.flex, detailOpen && styles.hidden]}>
        <View style={styles.flex}>
          {activeTab === TAB_HOME && (
            <HomeScreen onOpenFlower={setSelectedId} topInset={insets.top} />
          )}
          {activeTab === TAB_FAVORITES && (
            <FavoritScreen
              navigation={{
                navigate: (screen, params) => {
                  if (screen === 'Detail') setSelectedId(params?.id);
                  if (screen === 'Fave') setActiveTab(TAB_FAVORITES);
                },
              }}
            />
          )}
          {activeTab === TAB_CART && <CartScreen />}
          {activeTab === TAB_PROFILE && (
            <ProfilScreen
              profile={profile}
              setProfile={setProfile}
              navigation={{
                navigate: (screen, params) => {
                  if (screen === 'Detail') setSelectedId(params?.id);
                  if (screen === 'Fave') setActiveTab(TAB_FAVORITES);
                },
              }}
            />
          )}
        </View>
        <ButtonNavigation
          activeTab={activeTab}
          onChange={setActiveTab}
          bottomInset={insets.bottom}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  flex: { flex: 1 },
  hidden: { display: 'none' },
});
