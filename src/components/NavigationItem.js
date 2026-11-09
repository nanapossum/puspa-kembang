import { Pressable, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

export default function NavigationItem({ label, icon, active = false, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.item, active && styles.active]}>
      <Feather name={icon} size={24} color={COLORS.accentDark} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 64,
    alignItems: 'center',
    padding: 8,
    gap: 4,
    backgroundColor: COLORS.background,
    borderRadius: 12,
  },
  active: { backgroundColor: COLORS.navActive },
  label: { fontSize: 14, lineHeight: 20, color: COLORS.accentDark },
});