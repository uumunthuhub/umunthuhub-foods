import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput,
  StyleSheet, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '../store/useAppStore';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Confetti } from '../components/Confetti';
import { ShoppingCart, Trash2, MapPin, Coins, CreditCard, Receipt } from 'lucide-react-native';

export default function CartScreen() {
  const { cart, updateQuantity, removeFromCart, placeOrder, cartTotal } = useAppStore();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [address, setAddress] = useState('742 Evergreen Terrace');
  const [name, setName] = useState('Michael Rossi');
  const [phone, setPhone] = useState('+1 (555) 432-1099');
  const [notes, setNotes] = useState('');
  const [tip, setTip] = useState(5);
  const [payment, setPayment] = useState('Apple Pay');
  const router = useRouter();
  const scheme = useColorScheme();
  const dark = scheme === 'dark';

  const tax = cartTotal() * 0.08;
  const delivery = 2.99;
  const total = cartTotal() + tax + delivery;

  const handleCheckout = () => {
    placeOrder({
      items: cart,
      subtotal: cartTotal(),
      deliveryFee: delivery,
      tax,
      tip,
      total: total + tip,
      paymentMethod: payment,
      address,
    });
    setShowCheckoutModal(false);
    setShowConfetti(true);
    setTimeout(() => {
      router.push('/orders');
    }, 1600);
  };

  const bg = dark ? '#111' : '#faf9f8';
  const surface = dark ? '#1e1e1e' : '#fff';
  const border = dark ? '#333' : '#efe0d8';
  const textPrimary = dark ? '#f5f5f5' : '#1a1c1c';
  const textSecondary = dark ? '#9a9a9a' : '#594139';
  const inputBg = dark ? '#2a2a2a' : '#f8f4f2';

  if (cart.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: bg }} edges={['top']}>
        {/* Confetti fires above everything */}
        <Confetti running={showConfetti} onDone={() => setShowConfetti(false)} />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <View style={{ marginBottom: 12 }}><ShoppingCart size={48} color={textPrimary} /></View>
          <Text style={{ fontSize: 22, fontWeight: '800', color: textPrimary, marginBottom: 8 }}>
            Your cart is empty
          </Text>
          <Text style={{ color: textSecondary, textAlign: 'center', marginBottom: 24, lineHeight: 20 }}>
            Looks like you haven't added any delicious food yet.
          </Text>
          <TouchableOpacity
            style={{ backgroundColor: '#f97316', paddingHorizontal: 28, paddingVertical: 14, borderRadius: 14 }}
            onPress={() => router.push('/')}
          >
            <Text style={{ color: '#fff', fontWeight: '800', fontSize: 15 }}>Browse Restaurants</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }} edges={['top']}>
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16 }} showsVerticalScrollIndicator={false}>
          <Text style={{ fontSize: 28, fontWeight: '900', color: textPrimary, marginBottom: 20 }}>Your Cart</Text>

          {cart.map((item) => (
            <View key={item.id} style={[styles.cartItem, { backgroundColor: surface, borderColor: border }]}>
              <View style={{ flex: 1, marginRight: 12 }}>
                <Text style={{ fontWeight: '700', color: textPrimary, fontSize: 15 }}>{item.name}</Text>
                <Text style={{ color: '#f97316', fontWeight: '700', marginTop: 2 }}>${item.price.toFixed(2)}</Text>
              </View>
              <View style={[styles.qtyRow, { borderColor: border, backgroundColor: inputBg }]}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => {
                    if (item.quantity > 1) updateQuantity(item.id, item.quantity - 1);
                    else removeFromCart(item.id);
                  }}
                >
                  {item.quantity === 1 ? (
                    <Trash2 size={18} color="#f97316" />
                  ) : (
                    <Text style={{ color: textPrimary, fontWeight: '800', fontSize: 18 }}>−</Text>
                  )}
                </TouchableOpacity>
                <Text style={{ color: textPrimary, fontWeight: '700', fontSize: 16, minWidth: 24, textAlign: 'center' }}>
                  {item.quantity}
                </Text>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.id, item.quantity + 1)}>
                  <Text style={{ color: textPrimary, fontWeight: '800', fontSize: 18 }}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Summary */}
          <View style={[styles.summaryBox, { borderColor: border }]}>
            {[['Subtotal', `$${cartTotal().toFixed(2)}`], ['Delivery Fee', `$${delivery.toFixed(2)}`], ['Tax (8%)', `$${tax.toFixed(2)}`]].map(([label, value]) => (
              <View key={label} style={styles.summaryRow}>
                <Text style={{ color: textSecondary, fontSize: 13 }}>{label}</Text>
                <Text style={{ color: textPrimary, fontSize: 13 }}>{value}</Text>
              </View>
            ))}
            <View style={[styles.summaryRow, styles.totalRow, { borderTopColor: border }]}>
              <Text style={{ color: textPrimary, fontWeight: '800', fontSize: 17 }}>Total</Text>
              <Text style={{ color: '#f97316', fontWeight: '900', fontSize: 17 }}>${total.toFixed(2)}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => setShowCheckoutModal(true)}
          >
            <Text style={{ color: '#fff', fontWeight: '800', fontSize: 16 }}>
              Checkout — ${total.toFixed(2)}
            </Text>
          </TouchableOpacity>

          <View style={{ height: 100 }} />
        </ScrollView>
      </View>

      {/* Checkout sheet — rendered as absolute overlay to sit above bottom bar */}
      {showCheckoutModal && (
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          {/* Backdrop */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setShowCheckoutModal(false)}
            style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.55)' }]}
          />

          {/* Sheet */}
          <View style={[styles.sheet, { backgroundColor: bg }]}>
            {/* Handle */}
            <View style={styles.sheetHandle} />

            {/* Header */}
            <View style={[styles.sheetHeader, { borderBottomColor: border }]}>
              <Text style={{ fontSize: 18, fontWeight: '800', color: textPrimary }}>Checkout</Text>
              <TouchableOpacity onPress={() => setShowCheckoutModal(false)}>
                <Text style={{ color: textSecondary, fontWeight: '700', fontSize: 15 }}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={{ flex: 1, paddingHorizontal: 16 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

              {/* Delivery */}
              <View style={[styles.section, { backgroundColor: surface, borderColor: border }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                  <MapPin size={16} color={textPrimary} />
                  <Text style={[styles.sectionTitle, { color: textPrimary, marginBottom: 0 }]}>Delivery Location</Text>
                </View>
                <TextInput
                  placeholder="Full Street Address"
                  placeholderTextColor={textSecondary}
                  value={address}
                  onChangeText={setAddress}
                  style={[styles.input, { backgroundColor: inputBg, color: textPrimary, borderColor: border }]}
                />
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <TextInput
                    placeholder="Recipient Name"
                    placeholderTextColor={textSecondary}
                    value={name}
                    onChangeText={setName}
                    style={[styles.input, { flex: 1, backgroundColor: inputBg, color: textPrimary, borderColor: border }]}
                  />
                  <TextInput
                    placeholder="Phone"
                    placeholderTextColor={textSecondary}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    style={[styles.input, { flex: 1, backgroundColor: inputBg, color: textPrimary, borderColor: border }]}
                  />
                </View>
                <TextInput
                  placeholder="Drop-off instructions (optional)"
                  placeholderTextColor={textSecondary}
                  value={notes}
                  onChangeText={setNotes}
                  style={[styles.input, { backgroundColor: inputBg, color: textPrimary, borderColor: border }]}
                />
              </View>

              {/* Tip */}
              <View style={[styles.section, { backgroundColor: surface, borderColor: border }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                  <Coins size={16} color={textPrimary} />
                  <Text style={[styles.sectionTitle, { color: textPrimary, marginBottom: 0 }]}>Driver Tip (100% to rider)</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  {[0, 3, 5, 7].map((t) => (
                    <TouchableOpacity
                      key={t}
                      onPress={() => setTip(t)}
                      style={[
                        styles.tipBtn,
                        { borderColor: tip === t ? '#f97316' : border, backgroundColor: tip === t ? '#f97316' : inputBg },
                      ]}
                    >
                      <Text style={{ color: tip === t ? '#fff' : textPrimary, fontWeight: '700', fontSize: 13 }}>
                        {t === 0 ? 'None' : `$${t}`}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Payment */}
              <View style={[styles.section, { backgroundColor: surface, borderColor: border }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                  <CreditCard size={16} color={textPrimary} />
                  <Text style={[styles.sectionTitle, { color: textPrimary, marginBottom: 0 }]}>Payment Method</Text>
                </View>
                {['Apple Pay', 'Credit Card', 'Cash on Delivery'].map((method) => (
                  <TouchableOpacity
                    key={method}
                    onPress={() => setPayment(method)}
                    style={[
                      styles.paymentOption,
                      {
                        borderColor: payment === method ? '#f97316' : border,
                        backgroundColor: payment === method ? 'rgba(249,115,22,0.08)' : inputBg,
                      },
                    ]}
                  >
                    <Text style={{ color: payment === method ? '#f97316' : textPrimary, fontWeight: '700' }}>
                      {method}
                    </Text>
                    {payment === method && <View style={styles.selectedDot} />}
                  </TouchableOpacity>
                ))}
              </View>

              {/* Order summary mini */}
              <View style={[styles.section, { backgroundColor: surface, borderColor: border }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                  <Receipt size={16} color={textPrimary} />
                  <Text style={[styles.sectionTitle, { color: textPrimary, marginBottom: 0 }]}>Order Summary</Text>
                </View>
                {[
                  ['Subtotal', `$${cartTotal().toFixed(2)}`],
                  ['Delivery', `$${delivery.toFixed(2)}`],
                  ['Tax', `$${tax.toFixed(2)}`],
                  ['Tip', `$${tip.toFixed(2)}`],
                ].map(([l, v]) => (
                  <View key={l} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text style={{ color: textSecondary, fontSize: 13 }}>{l}</Text>
                    <Text style={{ color: textPrimary, fontSize: 13 }}>{v}</Text>
                  </View>
                ))}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: border }}>
                  <Text style={{ color: textPrimary, fontWeight: '800', fontSize: 15 }}>Total</Text>
                  <Text style={{ color: '#f97316', fontWeight: '900', fontSize: 15 }}>${(total + tip).toFixed(2)}</Text>
                </View>
              </View>

              {/* Place Order */}
              <TouchableOpacity style={[styles.checkoutBtn, { marginTop: 8 }]} onPress={handleCheckout}>
                <Text style={{ color: '#fff', fontWeight: '900', fontSize: 16 }}>
                  🚀 Place Order — ${(total + tip).toFixed(2)}
                </Text>
              </TouchableOpacity>
              <View style={{ height: 40 }} />
            </ScrollView>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginBottom: 10,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  qtyBtn: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryBox: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    gap: 6,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  checkoutBtn: {
    backgroundColor: '#f97316',
    padding: 18,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#f97316',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '88%',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 30,
    zIndex: 999,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 4,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  section: {
    padding: 16,
    borderRadius: 18,
    marginVertical: 8,
    borderWidth: 1,
    gap: 10,
  },
  sectionTitle: {
    fontWeight: '800',
    fontSize: 13,
    marginBottom: 2,
  },
  input: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 13,
  },
  tipBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  selectedDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#f97316',
  },
});
