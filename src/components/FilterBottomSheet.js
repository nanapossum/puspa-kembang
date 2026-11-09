import { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme/colors';
import { TEXT } from '../theme/typography';
import { SHADOW } from '../theme/shadow';

const DEFAULT_OPTIONS = ['Semua', 'Jawa', 'Bali', 'Sunda'];

export default function FilterBottomSheet({
  visible,
  selected = 'Semua',
  options = DEFAULT_OPTIONS,
  onApply,
  onClose,
}) {
  const [pending, setPending] = useState(selected);

  // Setiap sheet dibuka, mulai dari pilihan yang sedang aktif
  useEffect(() => {
    if (visible) setPending(selected);
  }, [visible, selected]);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />

      <View style={styles.sheet}>
        <View style={styles.header}>
          <Text style={styles.title}>Filter bunga</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeLabel}>Tutup</Text>
          </Pressable>
        </View>

        <View style={styles.group}>
          <Text style={styles.groupLabel}>Tradisi</Text>
          <View style={styles.options}>
            {options.map((opt) => {
              const active = opt === pending;
              return (
                <Pressable
                  key={opt}
                  onPress={() => setPending(opt)}
                  style={[styles.option, active && styles.optionActive]}
                >
                  <Text style={[styles.optionLabel, active && styles.optionLabelActive]}>
                    {opt}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Pressable onPress={() => onApply(pending)} style={styles.applyButton}>
          <Text style={styles.applyLabel}>Terapkan</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' },
  sheet: {
    padding: 24,
    gap: 24,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    ...SHADOW,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  title: { flex: 1, ...TEXT.heading, color: COLORS.accentDark },
  closeButton: {
    height: 44,
    justifyContent: 'center',
    padding: 12,
    backgroundColor: COLORS.cardTint,
    borderRadius: 12,
  },
  closeLabel: { ...TEXT.body, color: COLORS.text },
  group: { gap: 12 },
  groupLabel: { ...TEXT.body, color: COLORS.text },
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  option: {
    height: 44,
    justifyContent: 'center',
    padding: 12,
    backgroundColor: COLORS.cardTint,
    borderRadius: 12,
  },
  optionActive: { backgroundColor: COLORS.accentDark },
  optionLabel: { ...TEXT.body, color: COLORS.text },
  optionLabelActive: { color: COLORS.onPrimary },
  applyButton: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: COLORS.primaryLightA,
    borderRadius: 12,
  },
  applyLabel: { ...TEXT.body, color: COLORS.onPrimary },
});