import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '../theme/colors';
import { TEXT } from '../theme/typography';
import { SHADOW } from '../theme/shadow';
import { DUMMY_FLOWERS } from '../data/dummy';
import { useFavorites } from '../context/FavoritesContext';
import FavoriteButton from '../components/FavoriteButton';
import { useCart } from '../context/CartContext';
import CartButton from '../components/CartButton';

export default function DetailScreen({ route, navigation }) {
  const { id } = route.params;
  const flower = DUMMY_FLOWERS.find((f) => f.id === id);
  const topInset = useSafeAreaInsets().top;
  const { favoriteIds, toggleFavorite } = useFavorites();
  const isFavorite = favoriteIds.includes(id);
  const { cartIds, toggleCart } = useCart();
  const isInCart = cartIds.includes(id);
  const onBack = () => navigation.goBack();

  if (!flower) return null;

  return (
    <View style={styles.container}>
      {/* DetailHeader */}
      <View style={[styles.header, { paddingTop: topInset + 16 }]}>
        <Pressable onPress={onBack} style={styles.backButton} hitSlop={8}>
          <Feather name="arrow-left" size={24} color={COLORS.primary} />
        </Pressable>
        <Text style={styles.pageTitle} numberOfLines={1}>{flower.name}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* FlowerImage */}
        {flower.image ? (
          <Image source={flower.image} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={[styles.image, { backgroundColor: COLORS.imagePlaceholder }]} />
        )}

        {/* FlowerInformation */}
        <View style={[styles.info, SHADOW]}>
          <Text style={styles.name}>{flower.name}</Text>
          <View style={styles.field}>
            <Text style={styles.label}>Nama lokal</Text>
            <Text style={styles.value}>{flower.localNames}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Nama ilmiah</Text>
            <Text style={styles.value}>{flower.scientificName}</Text>
          </View>
        </View>

        {/* FlowerMeaning */}
        <View style={[styles.section, SHADOW]}>
          <Text style={styles.sectionTitle}>Simbolisme</Text>
          <Text style={styles.value}>{flower.meaning}</Text>
        </View>

        {/* FlowerEnergy */}
        <View style={[styles.section, SHADOW]}>
          <Text style={styles.sectionTitle}>Energi</Text>
          <Text style={styles.value}>{flower.energy}</Text>
          <View style={styles.note}>
            <Text style={styles.noteText}>{flower.culturalNote}</Text>
          </View>
        </View>

        <FavoriteButton
          state={isFavorite ? 'saved' : 'default'}
          onPress={() => toggleFavorite(flower.id)}
        />
        <CartButton
          state={isInCart ? 'added' : 'default'}
          onPress={() => toggleCart(flower.id)}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryTint,
  },
  pageTitle: { flex: 1, ...TEXT.heading, color: COLORS.primaryLightA },

  content: { paddingHorizontal: 16, paddingBottom: 24, gap: 16 },
  image: { width: '100%', height: 160, borderRadius: 12 },

  info: { padding: 8, gap: 15, borderRadius: 12, backgroundColor: COLORS.card },
  name: { ...TEXT.heading, color: COLORS.text },
  field: { paddingHorizontal: 8, gap: 4 },
  label: { ...TEXT.smallBold, color: COLORS.accent },
  value: { ...TEXT.body, color: COLORS.text },

  section: { padding: 8, gap: 8, borderRadius: 12, backgroundColor: COLORS.card },
  sectionTitle: { ...TEXT.heading, color: COLORS.accentDark },
  note: { padding: 12, borderRadius: 12, backgroundColor: COLORS.cardTint },
  noteText: { ...TEXT.caption, color: COLORS.text },
});
