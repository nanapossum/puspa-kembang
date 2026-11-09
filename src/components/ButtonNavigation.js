import { StyleSheet, View } from 'react-native';
import { COLORS } from '../theme/colors';
import NavigationItem from './NavigationItem';

const TABS = [
  { label: 'Beranda', icon: 'home' },
  { label: 'Favorit', icon: 'heart' },
  { label: 'Profil', icon: 'user' },
];

export default function ButtonNavigation({ activeTab = 'Beranda', onChange }) {
  return (
    <View style={styles.container}>
      {TABS.map((t) => (
        <NavigationItem
          key={t.label}
          label={t.label}
          icon={t.icon}
          active={activeTab === t.label}
          onPress={() => onChange?.(t.label)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 88,
    flexDirection: 'row',
    padding: 12,
    gap: 8,
    backgroundColor: COLORS.background,
  },
});