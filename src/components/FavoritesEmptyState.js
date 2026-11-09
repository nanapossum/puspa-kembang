import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { TEXT } from '../theme/typography';
import { SHADOW } from '../theme/shadow';

export default function FavoritesEmptyState({
  title = 'Belum ada favorit',
  description = 'Simpan bunga dari halaman detail untuk melihatnya di sini.',
}) {
  return (
    <View style={styles.container}>
      <View style={styles.placeholder}>
        <Feather name="heart" size={24} color={COLORS.onPrimary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
    gap: 12,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    ...SHADOW,
  },
  placeholder: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryLightA,
    borderRadius: 12,
  },
  title: { ...TEXT.heading, color: COLORS.primaryLightA },
  description: { ...TEXT.body, color: COLORS.text, textAlign: 'center', alignSelf: 'stretch' },
});