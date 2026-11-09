import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme/colors';
import { TEXT } from '../theme/typography';
import { SHADOW } from '../theme/shadow';
import FavoriteButton from './FavoriteButton';

export default function FlowerCard({ name, description, image, discount, onPress, onRemove }) {
  return (
    <View style={styles.card}>
      <Pressable onPress={onPress}>
        <View>
          {image ? (
            <Image source={image} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={[styles.image, styles.placeholder]} />
          )}

          {discount ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>-{discount}%</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.summary}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        </View>
      </Pressable>
      {onRemove && <FavoriteButton state="remove" onPress={onRemove} />}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 196,
    backgroundColor: COLORS.cardTint,
    borderRadius: 12,
    ...SHADOW,
  },
  image: { width: '100%', height: 92, borderRadius: 12 },
  placeholder: { backgroundColor: COLORS.imagePlaceholder },
  summary: { padding: 12, gap: 4, minHeight: 104 },
  name: { ...TEXT.bodyMedium, color: COLORS.accentDark },
  description: { ...TEXT.caption, color: COLORS.text, minHeight: 36 },
  badge: {
  position: 'absolute',
  top: 8,
  right: 8,
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 8,
  backgroundColor: COLORS.primary,
},
badgeText: { ...TEXT.captionBold, color: COLORS.onPrimary },
});
