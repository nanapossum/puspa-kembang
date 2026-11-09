import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

export default function FilterButton({ onPress, active = false }) {
  const color = active ? COLORS.onPrimary : COLORS.icon;
  return (
    <Pressable onPress={onPress} style={[styles.button, active && styles.active]}>
      <Ionicons name="options-outline" size={24} color={color} />
      <Text style={[styles.label, { color }]}>Filter</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 8,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
  },
  active: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  label: { fontSize: 14, lineHeight: 20 },
});