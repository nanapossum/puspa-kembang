import { StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS } from '../theme/colors';
import { TEXT } from '../theme/typography';

export default function AccountField({ label, value, onChangeText, keyboardType }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          style={styles.value}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
  label: { ...TEXT.small, color: COLORS.text },
  input: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
  },
  value: { flex: 1, paddingVertical: 0, ...TEXT.body, color: COLORS.text },
});