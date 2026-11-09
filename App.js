import { useEffect, useMemo, useState } from 'react';
import { BackHandler, FlatList, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from './src/theme/colors';
import { DUMMY_FLOWERS } from './src/data/dummy';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import FlowerCard from './src/components/FlowerCard';
import FavoritesEmptyState from './src/components/FavoritesEmptyState';
import ButtonNavigation from './src/components/ButtonNavigation';
import AccountField from './src/components/AccountField';

const TAB_HOME = 'Beranda';
const TAB_FAVORITES = 'Favorit';
const TAB_PROFILE = 'Profil';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState(TAB_HOME);
  const [selectedId, setSelectedId] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [profile, setProfile] = useState({ name: '', email: '' });

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

  const toggleFavorite = (id) =>
    setFavoriteIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const favoriteFlowers = useMemo(
    () => DUMMY_FLOWERS.filter((f) => favoriteIds.includes(f.id)),
    [favoriteIds]
  );
  const selectedFlower = DUMMY_FLOWERS.find((f) => f.id === selectedId);

  if (showSplash) {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <SplashScreen />
      </SafeAreaProvider>
    );
  }

  const renderFavorites = () =>
    favoriteFlowers.length === 0 ? (
      <FavoritesEmptyState />
    ) : (
      <FlatList
        data={favoriteFlowers}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.cell}>
            <FlowerCard
              name={item.name}
              description={item.description}
              image={item.image}
              discount={item.discount}
              onPress={() => setSelectedId(item.id)}
              onRemove={() => toggleFavorite(item.id)}
            />
          </View>
        )}
      />
    );

  const renderProfile = () => (
    <View style={styles.profile}>
      <AccountField
        label="Nama"
        value={profile.name}
        onChangeText={(name) => setProfile((p) => ({ ...p, name }))}
      />
      <AccountField
        label="Email"
        value={profile.email}
        keyboardType="email-address"
        onChangeText={(email) => setProfile((p) => ({ ...p, email }))}
      />
    </View>
  );

  const detailOpen = Boolean(selectedFlower);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe}>
        <StatusBar style="dark" />

        {detailOpen && (
          <DetailScreen
            flower={selectedFlower}
            isFavorite={favoriteIds.includes(selectedFlower.id)}
            onToggleFavorite={toggleFavorite}
            onBack={() => setSelectedId(null)}
          />
        )}

        {/* Disembunyikan (bukan di-unmount) saat detail terbuka, supaya state pencarian tetap */}
        <View style={[styles.flex, detailOpen && styles.hidden]}>
          <View style={styles.flex}>
            {activeTab === TAB_HOME && <HomeScreen onOpenFlower={setSelectedId} />}
            {activeTab === TAB_FAVORITES && renderFavorites()}
            {activeTab === TAB_PROFILE && renderProfile()}
          </View>
          <ButtonNavigation activeTab={activeTab} onChange={setActiveTab} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  flex: { flex: 1 },
  hidden: { display: 'none' },
  list: { padding: 16, paddingBottom: 24 },
  row: { gap: 12, marginBottom: 12 },
  cell: { flex: 1, maxWidth: '50%' },
  profile: { padding: 16, gap: 16 },
});