import { Pressable, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { TEXT } from '../theme/typography';
import { SHADOW } from '../theme/shadow';

const CONFIG = {
  saved: { label: 'Tersimpan di favorit', bg: COLORS.primaryLightA, fg: COLORS.onPrimary, shadow: true },
  default: { label: 'Simpan ke favorit', bg: COLORS.primaryTint, fg: COLORS.primary, shadow: true },
  remove: { label: 'Hapus favorit', bg: COLORS.primary, fg: COLORS.onPrimary, shadow: false },
};

export default function FavoriteButton({ state = 'default', onPress }) {
  const c = CONFIG[state];
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, { backgroundColor: c.bg }, c.shadow && SHADOW]}
    >
      <Feather name="heart" size={24} color={c.fg} />
      <Text style={[TEXT.body, { color: c.fg }]}>{c.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    gap: 8,
    borderRadius: 12,
  },
});