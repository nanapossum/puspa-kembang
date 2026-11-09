import { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DUMMY_FLOWERS } from '../data/dummy';
import { useFavorites } from '../context/FavoritesContext';
import FlowerCard from '../components/FlowerCard';
import FavoritesEmptyState from '../components/FavoritesEmptyState';

export default function FavoritScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { favoriteIds, toggleFavorite } = useFavorites();
  const favoriteFlowers = useMemo(
    () => DUMMY_FLOWERS.filter((f) => favoriteIds.includes(f.id)),
    [favoriteIds]
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorit</Text>
        <Text style={styles.description}>Bunga yang kamu simpan</Text>
      </View>

      {favoriteFlowers.length === 0 ? (
        <View style={styles.empty}>
          <FavoritesEmptyState />
        </View>
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
                onPress={() => navigation.navigate('Detail', { id: item.id })}
                onRemove={() => toggleFavorite(item.id)}
              />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  header: { padding: 16, gap: 4 },
  title: { fontFamily: 'Figtree_700Bold', fontSize: 20, lineHeight: 24, color: '#BE5478' },
  description: {
    fontFamily: 'Figtree_400Regular',
    fontSize: 13,
    lineHeight: 18,
    color: '#212121',
  },
  empty: { flex: 1, paddingHorizontal: 16 },
  list: { paddingHorizontal: 16, paddingBottom: 16, rowGap: 12 },
  row: { columnGap: 12 },
  cell: { flex: 1, maxWidth: '50%' },
});
