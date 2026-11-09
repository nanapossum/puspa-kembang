import { StyleSheet, View } from 'react-native';
import { COLORS } from '../theme/colors';
import NavigationItem from './NavigationItem';

const TABS = [
  { label: 'Home', icon: 'home' },
  { label: 'Fave', icon: 'heart' },
  { label: 'Cart', icon: 'shopping-cart' },
  { label: 'Me', icon: 'user' },
];

export default function ButtonNavigation({ activeTab = 'Home', onChange, bottomInset = 0 }) {
  return (
    <View style={[styles.container, { height: 88 + bottomInset, paddingBottom: 12 + bottomInset }]}>
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
