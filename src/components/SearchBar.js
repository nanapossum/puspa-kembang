import { StyleSheet, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { TEXT } from '../theme/typography';

export default function SearchBar({ value, onChangeText, placeholder = 'Cari nama bunga' }) {
  return (
    <View style={styles.container}>
      <Feather name="search" size={24} color={COLORS.icon} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.icon}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  input: {
    flex: 1,
    paddingVertical: 0,
    ...TEXT.body,
    color: COLORS.text,
  },
});
