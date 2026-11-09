import { Pressable, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { COLORS } from '../theme/colors';
import { TEXT } from '../theme/typography';
import { SHADOW } from '../theme/shadow';

const CONFIG = {
  default: { label: 'Tambah ke keranjang', bg: COLORS.primaryTint, fg: COLORS.primary },
  added: { label: 'Sudah di keranjang', bg: COLORS.primaryLightA, fg: COLORS.onPrimary },
};

export default function CartButton({ state = 'default', onPress }) {
  const config = CONFIG[state];

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={config.label}
      accessibilityState={{ selected: state === 'added' }}
      style={[styles.button, { backgroundColor: config.bg }, SHADOW]}
    >
      <Feather name="shopping-cart" size={24} color={config.fg} />
      <Text style={[TEXT.body, { color: config.fg }]}>{config.label}</Text>
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
