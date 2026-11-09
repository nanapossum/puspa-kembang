import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DUMMY_FLOWERS } from '../data/dummy';
import AccountField from '../components/AccountField';
import FlowerCard from '../components/FlowerCard';
import { useFavorites } from '../context/FavoritesContext';

export default function ProfilScreen({ navigation, profile: profileProp, setProfile: setProfileProp }) {
  const insets = useSafeAreaInsets();
  const { favoriteIds } = useFavorites();
  const [localProfile, setLocalProfile] = useState({ name: '', email: '', phone: '' });
  const profile = profileProp ?? localProfile;
  const setProfile = setProfileProp ?? setLocalProfile;
  const favoriteFlowers = useMemo(
    () => DUMMY_FLOWERS.filter((f) => favoriteIds.includes(f.id)),
    [favoriteIds]
  );
  const preview = favoriteFlowers.slice(0, 2);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: insets.top, paddingBottom: 24 }}
    >
      {/* ProfileHeader */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Profil</Text>
        <View style={styles.userSummary}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={24} color="#212121" />
          </View>
          <View style={styles.identity}>
            <Text style={styles.userName}>{profile.name || 'Nama Pengguna'}</Text>
            <Text style={styles.userEmail}>{profile.email || 'email@contoh.com'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {/* AccountInformation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informasi Akun</Text>
          <AccountField
            label="Nama"
            value={profile.name}
            onChangeText={(name) => setProfile((p) => ({ ...p, name }))}
          />
          <AccountField
            label="Email"
            value={profile.email}
            keyboardType="email-address"
            onChangeText={(email) => setProfile((p) => ({ ...p, email }))}
          />
          <AccountField
            label="Nomor HP"
            value={profile.phone}
            keyboardType="phone-pad"
            onChangeText={(phone) => setProfile((p) => ({ ...p, phone }))}
          />
        </View>

        {/* FavoritePreview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Favorit</Text>
          {preview.length > 0 && (
            <View style={styles.row}>
              {preview.map((item) => (
                <View key={item.id} style={styles.cell}>
                  <FlowerCard
                    name={item.name}
                    description={item.description}
                    image={item.image}
                    discount={item.discount}
                    onPress={() => navigation.navigate('Detail', { id: item.id })}
                  />
                </View>
              ))}
              {preview.length === 1 && <View style={styles.cell} />}
            </View>
          )}
          <Pressable style={styles.linkButton} onPress={() => navigation.navigate('Fave')}>
            <Text style={styles.linkLabel}>Lihat semua favorit</Text>
            <Ionicons name="arrow-forward" size={24} color="#FFFFFF" />
          </Pressable>
        </View>

        {/* Latihan 3: buka layar Tentang lewat Stack */}
        <Pressable style={styles.outlineButton} onPress={() => navigation.navigate('Tentang')}>
          <Text style={styles.outlineLabel}>Tentang Aplikasi</Text>
          <Ionicons name="information-circle-outline" size={24} color="#3B5B2A" />
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  header: { padding: 16, gap: 16 },
  pageTitle: { fontFamily: 'Figtree_700Bold', fontSize: 20, lineHeight: 24, color: '#BE5478' },
  userSummary: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: '#BDBDBD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  identity: { flex: 1, gap: 4 },
  userName: { fontFamily: 'Figtree_700Bold', fontSize: 20, lineHeight: 24, color: '#212121' },
  userEmail: { fontFamily: 'Figtree_400Regular', fontSize: 15, lineHeight: 20, color: '#212121' },
  content: { paddingHorizontal: 16, gap: 24 },
  section: { gap: 12 },
  sectionTitle: { fontFamily: 'Figtree_700Bold', fontSize: 20, lineHeight: 24, color: '#212121' },
  row: { flexDirection: 'row', columnGap: 12 },
  cell: { flex: 1, maxWidth: '50%' },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#BE5478',
  },
  linkLabel: {
    flex: 1,
    fontFamily: 'Figtree_400Regular',
    fontSize: 15,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  outlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3B5B2A',
  },
  outlineLabel: { fontFamily: 'Figtree_400Regular', fontSize: 15, lineHeight: 20, color: '#3B5B2A' },
});
