import { useMemo, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { COLORS } from '../theme/colors';
import { TEXT } from '../theme/typography';
import { DUMMY_FLOWERS } from '../data/dummy';
import HeaderBar from '../components/HeaderBar';
import SearchBar from '../components/SearchBar';
import FilterButton from '../components/FilterButton';
import FilterBottomSheet from '../components/FilterBottomSheet';
import FlowerCard from '../components/FlowerCard';
import CategoryChips from '../components/CategoryChips';

// true = banner + chip urutan (Latihan 1 & 2), false = persis desain Figma
const TUGAS_MODUL4 = true;
// Warna overlay banner: hijau = COLORS.accentDark, merah = COLORS.primary
const BANNER_COLOR = COLORS.accentDark;

const SORTS = ['Termurah', 'Termahal'];
const PAD = 16;
const GAP = 12;

const rupiah = (n) => 'Rp ' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export default function HomeScreen({ onOpenFlower }) {
  const { width } = useWindowDimensions();
  const numColumns = width >= 768 ? 4 : width >= 500 ? 3 : 2;
  const itemWidth = (width - PAD * 2 - GAP * (numColumns - 1)) / numColumns;

  const [query, setQuery] = useState('');
  const [tradition, setTradition] = useState('Semua');
  const [sort, setSort] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    const hasil = DUMMY_FLOWERS.filter(
      (f) =>
        (tradition === 'Semua' || f.tradition === tradition) &&
        (q === '' || f.name.toLowerCase().includes(q))
    );
    if (sort === 'Termurah') return [...hasil].sort((a, b) => a.price - b.price);
    if (sort === 'Termahal') return [...hasil].sort((a, b) => b.price - a.price);
    return hasil;
  }, [query, tradition, sort]);

  return (
    <>
      <FlatList
        key={numColumns}
        data={data}
        keyExtractor={(item) => String(item.id)}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View style={styles.header}>
            <HeaderBar title="Puspa" showLogo />

            <View style={styles.content}>
              <View style={styles.searchRow}>
                <SearchBar value={query} onChangeText={setQuery} />
                <FilterButton active={tradition !== 'Semua'} onPress={() => setSheetOpen(true)} />
              </View>

              {TUGAS_MODUL4 && (
                <>
                  <View style={styles.banner}>
                    <Image
                      source={require('../../assets/flowers/melati.jpg')}
                      style={styles.bannerImage}
                      resizeMode="cover"
                    />
                    <View style={[styles.bannerOverlay, { backgroundColor: BANNER_COLOR }]} />
                    <Text style={styles.bannerText}>Diskon 50%</Text>
                  </View>

                  <View style={styles.chips}>
                    <CategoryChips
                      items={SORTS}
                      selected={sort}
                      onSelect={(s) => setSort((prev) => (prev === s ? null : s))}
                    />
                  </View>
                </>
              )}

              <Text style={styles.collectionTitle}>Jelajahi bunga</Text>
            </View>
          </View>
        }
        ListEmptyComponent={<Text style={styles.empty}>Bunga tidak ditemukan.</Text>}
        renderItem={({ item }) => (
          <View style={{ width: itemWidth }}>
            <FlowerCard
              name={item.name}
              description={item.description}
              image={item.image}
              discount={item.discount}
              onPress={() => onOpenFlower?.(item.id)}
            />
            {TUGAS_MODUL4 && <Text style={styles.price}>{rupiah(item.price)} / tangkai</Text>}
          </View>
        )}
      />

      <FilterBottomSheet
        visible={sheetOpen}
        selected={tradition}
        onApply={(value) => {
          setTradition(value);
          setSheetOpen(false);
        }}
        onClose={() => setSheetOpen(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: PAD, paddingBottom: 16 },
  row: { gap: GAP, marginBottom: GAP },

  header: { marginHorizontal: -PAD },
  content: { paddingHorizontal: PAD, gap: 16, marginBottom: 16 },
  searchRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },

  banner: { height: 120, borderRadius: 16, overflow: 'hidden', justifyContent: 'center' },
  bannerImage: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  bannerOverlay: { ...StyleSheet.absoluteFillObject, opacity: 0.55 },
  bannerText: {
    position: 'absolute',
    left: 16,
    bottom: 12,
    color: COLORS.onPrimary,
    fontSize: 24,
    fontWeight: 'bold',
  },

  chips: { marginHorizontal: -PAD },
  collectionTitle: { ...TEXT.heading, color: COLORS.accentDark },

  price: { marginTop: 6, ...TEXT.caption, color: COLORS.muted },
  empty: { textAlign: 'center', color: COLORS.muted, marginTop: 32 },
});
