import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Switch,
  useColorScheme, StyleSheet, TextInput, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Home, CreditCard, Gift, Bell, Receipt, Star, Bookmark, HeadphonesIcon, FileText, AlertCircle, User, Award, Edit2, Check } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';

const MENU_SECTIONS = [
  {
    title: 'Account',
    items: [
      { icon: <Home size={20} color="#f97316" />, label: 'Delivery Addresses', subtitle: '742 Evergreen Terrace (Home)' },
      { icon: <CreditCard size={20} color="#f97316" />, label: 'Payment Methods', subtitle: 'Apple Pay · Visa •••• 4242' },
      { icon: <Gift size={20} color="#f97316" />, label: 'Rewards & Points', subtitle: '1,240 pts — Silver Tier' },
      { icon: <Bell size={20} color="#f97316" />, label: 'Notification Preferences', subtitle: 'Push, Email, SMS enabled' },
    ],
  },
  {
    title: 'Order History',
    items: [
      { icon: <Receipt size={20} color="#f97316" />, label: 'Past Orders', subtitle: 'View your order history' },
      { icon: <Star size={20} color="#f97316" />, label: 'My Reviews', subtitle: '3 reviews written' },
      { icon: <Bookmark size={20} color="#f97316" />, label: 'Saved Items & Favourites', subtitle: '12 items saved' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: <HeadphonesIcon size={20} color="#f97316" />, label: 'Help Desk & Chat', subtitle: 'Get help with your orders' },
      { icon: <FileText size={20} color="#f97316" />, label: 'Terms & Privacy Policy', subtitle: 'Last updated Sep 2026' },
      { icon: <AlertCircle size={20} color="#f97316" />, label: 'Report an Issue', subtitle: 'Something went wrong?' },
    ],
  },
];

export default function ProfileScreen() {
  const { logout, orders } = useAppStore();
  const scheme = useColorScheme();
  const dark = scheme === 'dark';

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(dark);
  const [name, setName] = useState('Michael Rossi');
  const [email, setEmail] = useState('michael.rossi@example.com');
  const [phone, setPhone] = useState('+1 (555) 432-1099');
  const [editMode, setEditMode] = useState(false);

  const bg = dark ? '#111' : '#faf9f8';
  const surface = dark ? '#1e1e1e' : '#fff';
  const border = dark ? '#333' : '#efe0d8';
  const textPrimary = dark ? '#f5f5f5' : '#1a1c1c';
  const textSecondary = dark ? '#9a9a9a' : '#594139';
  const inputBg = dark ? '#2a2a2a' : '#f8f4f2';

  const completedOrders = orders.filter((o) => o.status === 'delivered').length;
  const totalSpent = orders.reduce((s, o) => s + o.total, 0);

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* Header */}
        <View style={[styles.headerBand, { backgroundColor: surface, borderBottomColor: border }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 20 }}>
            <View>
              <Text style={{ fontSize: 22, fontWeight: '900', color: textPrimary }}>My Profile</Text>
              <Text style={{ color: textSecondary, fontSize: 13, marginTop: 2 }}>Manage your account & preferences</Text>
            </View>
            <TouchableOpacity
              onPress={() => setEditMode(!editMode)}
              style={[styles.editBtn, { backgroundColor: editMode ? '#f97316' : inputBg, borderColor: editMode ? '#f97316' : border, flexDirection: 'row', alignItems: 'center', gap: 6 }]}
            >
              {editMode ? <Check size={14} color="#fff" /> : <Edit2 size={14} color={textPrimary} />}
              <Text style={{ color: editMode ? '#fff' : textPrimary, fontWeight: '700', fontSize: 13 }}>
                {editMode ? 'Save' : 'Edit'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Avatar + Info */}
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <View style={[styles.avatarCard, { backgroundColor: surface, borderColor: border }]}>
            <View style={styles.avatarRing}>
              <View style={styles.avatarInner}>
                <User size={32} color="#9ca3af" />
              </View>
              {/* Silver badge */}
              <View style={styles.tierBadge}>
                <Award size={14} color="#92400e" />
              </View>
            </View>

            <View style={{ flex: 1 }}>
              {editMode ? (
                <>
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    style={[styles.editInput, { backgroundColor: inputBg, color: textPrimary, borderColor: border }]}
                    placeholder="Full Name"
                    placeholderTextColor={textSecondary}
                  />
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    style={[styles.editInput, { backgroundColor: inputBg, color: textPrimary, borderColor: border, marginTop: 6 }]}
                    placeholder="Email"
                    placeholderTextColor={textSecondary}
                    keyboardType="email-address"
                  />
                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    style={[styles.editInput, { backgroundColor: inputBg, color: textPrimary, borderColor: border, marginTop: 6 }]}
                    placeholder="Phone"
                    placeholderTextColor={textSecondary}
                    keyboardType="phone-pad"
                  />
                </>
              ) : (
                <>
                  <Text style={{ fontSize: 18, fontWeight: '800', color: textPrimary }}>{name}</Text>
                  <Text style={{ color: textSecondary, fontSize: 13, marginTop: 2 }}>{email}</Text>
                  <Text style={{ color: textSecondary, fontSize: 13, marginTop: 2 }}>{phone}</Text>
                  <View style={[styles.tierPill, { marginTop: 8, flexDirection: 'row', alignItems: 'center', gap: 4 }]}>
                    <Award size={14} color="#92400e" />
                    <Text style={{ color: '#92400e', fontWeight: '800', fontSize: 11 }}>Silver Member · 1,240 pts</Text>
                  </View>
                </>
              )}
            </View>
          </View>

          {/* Stats row */}
          <View style={[styles.statsRow, { borderColor: border }]}>
            {[
              { label: 'Orders', value: orders.length.toString() },
              { label: 'Completed', value: completedOrders.toString() },
              { label: 'Total Spent', value: `$${totalSpent.toFixed(0)}` },
              { label: 'Rewards', value: '1,240' },
            ].map((stat, i) => (
              <View key={i} style={[styles.stat, i < 3 && { borderRightWidth: 1, borderRightColor: border }]}>
                <Text style={{ fontSize: 18, fontWeight: '900', color: '#f97316' }}>{stat.value}</Text>
                <Text style={{ fontSize: 11, color: textSecondary, marginTop: 2 }}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Quick Toggles */}
          <View style={[styles.sectionCard, { backgroundColor: surface, borderColor: border }]}>
            <Text style={[styles.sectionLabel, { color: textSecondary }]}>PREFERENCES</Text>
            <View style={[styles.toggleRow, { borderBottomColor: border }]}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '700', color: textPrimary }}>Push Notifications</Text>
                <Text style={{ color: textSecondary, fontSize: 12, marginTop: 2 }}>Order updates and offers</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#555', true: '#f97316' }}
                thumbColor="#fff"
              />
            </View>
            <View style={styles.toggleRow}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '700', color: textPrimary }}>Dark Mode</Text>
                <Text style={{ color: textSecondary, fontSize: 12, marginTop: 2 }}>Follows system by default</Text>
              </View>
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: '#555', true: '#f97316' }}
                thumbColor="#fff"
              />
            </View>
          </View>

          {/* Menu sections */}
          {MENU_SECTIONS.map((section) => (
            <View key={section.title} style={[styles.sectionCard, { backgroundColor: surface, borderColor: border }]}>
              <Text style={[styles.sectionLabel, { color: textSecondary }]}>{section.title.toUpperCase()}</Text>
              {section.items.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.menuItem,
                    i < section.items.length - 1 && { borderBottomWidth: 1, borderBottomColor: border },
                  ]}
                  activeOpacity={0.7}
                >
                  <View style={{ marginRight: 16 }}>{item.icon}</View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: '700', color: textPrimary, fontSize: 14 }}>{item.label}</Text>
                    <Text style={{ color: textSecondary, fontSize: 12, marginTop: 1 }}>{item.subtitle}</Text>
                  </View>
                  <Text style={{ color: textSecondary, fontSize: 18 }}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}

          {/* Sign Out */}
          <TouchableOpacity onPress={handleLogout} style={[styles.signOutBtn, { borderColor: '#ef4444' }]}>
            <Text style={{ color: '#ef4444', fontWeight: '800', fontSize: 15 }}>Sign Out</Text>
          </TouchableOpacity>

          <Text style={{ textAlign: 'center', color: textSecondary, fontSize: 11, marginTop: 16 }}>
            Umunthuhub Foods v1.0.0 · © 2026
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerBand: {
    borderBottomWidth: 1,
  },
  editBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  avatarCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 12,
  },
  avatarRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 3,
    borderColor: '#f97316',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flexShrink: 0,
  },
  avatarInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tierBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fef3c7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  tierPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 99,
  },
  editInput: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 13,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 14,
  },
  stat: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  sectionCard: {
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 14,
    overflow: 'hidden',
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  signOutBtn: {
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginTop: 4,
  },
});
