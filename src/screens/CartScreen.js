import { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '../theme/colors';
import { TEXT } from '../theme/typography';
import { DUMMY_FLOWERS } from '../data/dummy';
import { useCart } from '../context/CartContext';
import FlowerCard from '../components/FlowerCard';
import CartButton from '../components/CartButton';

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  const { cartIds, toggleCart } = useCart();
  const cartFlowers = useMemo(
    () => DUMMY_FLOWERS.filter((flower) => cartIds.includes(flower.id)),
    [cartIds]
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <Text style={styles.title}>Keranjang</Text>
      {cartFlowers.length === 0 ? (
        <View style={styles.emptyState}>
          <Feather name="shopping-cart" size={32} color={COLORS.accentDark} />
          <Text style={styles.emptyTitle}>Keranjangmu masih kosong</Text>
          <Text style={styles.description}>Bunga yang kamu tambahkan akan muncul di sini.</Text>
        </View>
      ) : (
        <FlatList
          data={cartFlowers}
          keyExtractor={(flower) => String(flower.id)}
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
              />
              <CartButton state="added" onPress={() => toggleCart(item.id)} />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, backgroundColor: COLORS.background },
  title: { ...TEXT.heading, color: COLORS.accentDark },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  emptyTitle: { ...TEXT.bodySemiBold, color: COLORS.text },
  description: { ...TEXT.body, color: COLORS.text, textAlign: 'center' },
  list: { paddingVertical: 16, rowGap: 12 },
  row: { columnGap: 12 },
  cell: { flex: 1, maxWidth: '50%', gap: 8 },
});
