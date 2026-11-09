import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme/colors';
import { TEXT } from '../theme/typography';

// showLogo: tampilkan logo di kiri judul (dipakai di Beranda)
export default function HeaderBar({ title, description, showLogo = false }) {
  return (
    <View style={styles.container}>
      {showLogo && (
        <Image
          source={require('../../assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      )}
      <View style={styles.texts}>
        <Text style={styles.title}>{title}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  logo: { width: 45, height: 42 }, // ukuran logo di Figma
  texts: { flexShrink: 1, gap: 4 },
  title: { ...TEXT.heading, color: COLORS.primaryLightA },
  description: { ...TEXT.caption, color: COLORS.text },
});