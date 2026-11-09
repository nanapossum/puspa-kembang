import { ScrollView, Pressable, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

export default function CategoryChips({ items, selected, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.row}
    >
      {items.map((item) => {
        const aktif = item === selected;
        return (
          <Pressable
            key={item}
            onPress={() => onSelect(item)}
            style={[styles.chip, aktif && styles.chipAktif]}
          >
            <Text style={[styles.text, aktif && styles.textAktif]}>{item}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 0 },
  row: { paddingHorizontal: 16, paddingBottom: 8, gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipAktif: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  text: { color: COLORS.text, textTransform: 'capitalize' },
  textAktif: { color: COLORS.onPrimary, fontWeight: 'bold' },
});
