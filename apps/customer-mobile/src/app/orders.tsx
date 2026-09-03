import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput,
  StyleSheet, useColorScheme, Linking, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore, Order, OrderStatus } from '../store/useAppStore';
import { useRouter } from 'expo-router';
import { Confetti } from '../components/Confetti';
import { Receipt, ChefHat, Package, Bike, CheckCircle, Navigation, Utensils, Home, User, Star, Phone, PhoneOff, MessageCircle, PartyPopper } from 'lucide-react-native';

// ------ STATUS CONFIG ------
const STEPS: { key: OrderStatus; label: string; icon: React.ReactNode; desc: string }[] = [
  { key: 'incoming', label: 'Order Received',    icon: <Receipt size={16} />, desc: 'Kitchen checking ticket' },
  { key: 'cooking',  label: 'Kitchen Preparing', icon: <ChefHat size={16} />, desc: 'Chef crafting your food' },
  { key: 'ready',    label: 'Ready for Pickup',  icon: <Package size={16} />, desc: 'Sealed & bagged' },
  { key: 'picked_up',label: 'Courier On Route',  icon: <Bike size={16} />, desc: 'Rider is on the way' },
  { key: 'delivered',label: 'Delivered!',        icon: <CheckCircle size={16} />, desc: 'Enjoy your meal!' },
];

const getStepIdx = (status: OrderStatus) => STEPS.findIndex((s) => s.key === status);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// ------ ORDER TRACKING DETAIL ------
function OrderTracking({ order, onBack }: { order: Order; onBack: () => void }) {
  const { advanceOrderStatus } = useAppStore();
  const scheme = useColorScheme();
  const dark = scheme === 'dark';
  const router = useRouter();

  const [showConfetti, setShowConfetti] = useState(order.status === 'incoming');

  // Auto-stop confetti after 2.5s
  useEffect(() => {
    if (showConfetti) {
      const t = setTimeout(() => setShowConfetti(false), 2500);
      return () => clearTimeout(t);
    }
  }, [showConfetti]);

  const [etaMinutes, setEtaMinutes] = useState(18);
  const [isCallingRider, setIsCallingRider] = useState(false);
  const [isCallConnected, setIsCallConnected] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [chatMessage, setChatMessage] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { sender: 'rider', text: 'Hi! Just arrived at the restaurant. Heading your way shortly! 🛵', time: formatDate(order.placedAt) },
  ]);

  const bg = dark ? '#111' : '#faf9f8';
  const surface = dark ? '#1e1e1e' : '#fff';
  const border = dark ? '#333' : '#efe0d8';
  const textPrimary = dark ? '#f5f5f5' : '#1a1c1c';
  const textSecondary = dark ? '#9a9a9a' : '#594139';

  // Countdown ETA
  useEffect(() => {
    const t = setInterval(() => setEtaMinutes((p) => (p > 2 ? p - 1 : 2)), 25000);
    return () => clearInterval(t);
  }, []);

  // Call timer
  useEffect(() => {
    if (!isCallConnected) return;
    const t = setInterval(() => setCallDuration((p) => p + 1), 1000);
    return () => clearInterval(t);
  }, [isCallConnected]);

  const formatCall = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const handleCall = () => {
    if (isCallConnected) {
      setIsCallConnected(false);
      setCallDuration(0);
    } else if (!isCallingRider) {
      setIsCallingRider(true);
      setTimeout(() => {
        setIsCallingRider(false);
        setIsCallConnected(true);
      }, 2000);
    }
  };

  const handleSendChat = () => {
    if (!chatMessage.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatHistory((prev) => [...prev, { sender: 'customer', text: chatMessage, time: now }]);
    setChatMessage('');
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        { sender: 'rider', text: 'Got it! Following your instructions carefully 👍', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ]);
    }, 1800);
  };

  const stepIdx = getStepIdx(order.status);
  const progressPct = ((stepIdx + 1) / STEPS.length) * 100;

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      <Confetti running={showConfetti} onDone={() => setShowConfetti(false)} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>

        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <View>
            <Text style={{ fontSize: 22, fontWeight: '900', color: textPrimary }}>Live Tracking</Text>
            <Text style={{ color: '#f97316', fontWeight: '700', fontSize: 13, marginTop: 2 }}>
              {order.orderNumber}
            </Text>
          </View>
          <TouchableOpacity onPress={onBack} style={[styles.backBtn, { backgroundColor: surface, borderColor: border }]}>
            <Text style={{ color: textSecondary, fontWeight: '700', fontSize: 13 }}>← Orders</Text>
          </TouchableOpacity>
        </View>

        {/* Status Card */}
        <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View style={styles.pulseDot} />
              <Text style={{ fontWeight: '800', color: textPrimary, fontSize: 14, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {order.status.replace('_', ' ')}
              </Text>
            </View>
            <View>
              <Text style={{ color: textSecondary, fontSize: 11, textAlign: 'right' }}>Estimated Arrival</Text>
              <Text style={{ color: '#f97316', fontWeight: '900', fontSize: 15, textAlign: 'right' }}>
                {order.status === 'delivered' ? <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}><Text style={{ color: '#f97316', fontWeight: '900', fontSize: 15 }}>Delivered</Text><PartyPopper size={16} color="#f97316" /></View> : `~${etaMinutes} min`}
              </Text>
            </View>
          </View>

          {/* Progress bar */}
          <View style={[styles.progressTrack, { backgroundColor: dark ? '#333' : '#eeeeee' }]}>
            <View style={[styles.progressFill, { width: `${progressPct}%` as any }]} />
          </View>

          {/* Step nodes */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            {STEPS.map((step, i) => {
              const done = i <= stepIdx;
              const current = i === stepIdx;
              return (
                <View key={step.key} style={{ alignItems: 'center', flex: 1 }}>
                  <View style={[
                    styles.stepCircle,
                    current ? { backgroundColor: '#f97316', transform: [{ scale: 1.15 }] } :
                    done ? { backgroundColor: '#22c55e' } :
                    { backgroundColor: dark ? '#333' : '#e5e7eb' }
                  ]}>
                    {React.cloneElement(step.icon as any, { color: current || done ? '#fff' : textSecondary })}
                  </View>
                  <Text style={{ fontSize: 9, fontWeight: '700', color: current ? '#f97316' : done ? textPrimary : textSecondary, marginTop: 4, textAlign: 'center' }} numberOfLines={2}>
                    {step.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Simulated Map */}
        <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <Navigation size={14} color={textPrimary} />
            <Text style={{ fontWeight: '800', color: textPrimary, fontSize: 13 }}>
              GPS Live Dispatch Radar
            </Text>
          </View>
          <View style={[styles.mapBox, { backgroundColor: dark ? '#1a1c1c' : '#e8edf2', borderColor: border }]}>
            {/* Street grid lines */}
            <View style={[StyleSheet.absoluteFill, styles.gridOverlay]} pointerEvents="none" />

            {/* Route dashes — simplified SVG-like via Views */}
            <View style={[styles.routeLine, { backgroundColor: '#f97316', opacity: 0.6 }]} />

            {/* Restaurant pin */}
            <View style={[styles.pin, { top: 18, left: 18 }]}>
              <View style={[styles.pinBubble, { backgroundColor: '#2563eb', flexDirection: 'row', alignItems: 'center', gap: 4 }]}>
                <Utensils size={10} color="#fff" />
                <Text style={{ fontSize: 10, color: '#fff', fontWeight: '700' }}>{order.tenantName.split(' ')[0]}</Text>
              </View>
            </View>

            {/* Rider */}
            <View style={[styles.pin, { top: '35%', left: '42%' }]}>
              <View style={styles.riderPing} />
              <View style={[styles.riderCircle]}>
                <Bike size={16} color="#fff" />
              </View>
              <Text style={{ fontSize: 9, color: '#f97316', fontWeight: '800', marginTop: 2, textAlign: 'center' }}>
                {order.riderName.split(' ')[0]}
              </Text>
            </View>

            {/* Home pin */}
            <View style={[styles.pin, { bottom: 18, right: 18 }]}>
              <View style={[styles.pinBubble, { backgroundColor: '#16a34a', flexDirection: 'row', alignItems: 'center', gap: 4 }]}>
                <Home size={10} color="#fff" />
                <Text style={{ fontSize: 10, color: '#fff', fontWeight: '700' }}>You</Text>
              </View>
            </View>

            {/* Speed badge */}
            <View style={[styles.speedBadge, { backgroundColor: dark ? 'rgba(30,30,30,0.92)' : 'rgba(255,255,255,0.92)', borderColor: border }]}>
              <View style={[styles.greenDot]} />
              <Text style={{ color: textPrimary, fontSize: 10, fontWeight: '600' }}>28 km/h · 1.4 km remaining</Text>
            </View>
          </View>
        </View>

        {/* Courier Card */}
        <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
          <Text style={{ color: textSecondary, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>
            Assigned Delivery Partner
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <View style={[styles.riderAvatarCircle, { backgroundColor: dark ? '#333' : '#e5e7eb' }]}>
              <User size={24} color={textSecondary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '800', color: textPrimary, fontSize: 15 }}>{order.riderName}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Star size={12} color="#f59e0b" fill="#f59e0b" />
                <Text style={{ color: '#f59e0b', fontWeight: '700', fontSize: 13 }}>{order.riderRating}</Text>
              </View>
              <Text style={{ color: textSecondary, fontSize: 12 }}>{order.riderVehicle}</Text>
              <Text style={{ color: '#16a34a', fontSize: 11, fontWeight: '600', marginTop: 2 }}>
                ✓ Temperature-controlled bag verified
              </Text>
            </View>
          </View>

          {/* Action buttons */}
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity
              onPress={handleCall}
              style={[
                styles.actionBtn,
                { borderColor: isCallConnected ? '#ef4444' : border, backgroundColor: isCallConnected ? '#ef4444' : isCallingRider ? '#f97316' : dark ? '#2a2a2a' : '#f3f4f6' },
              ]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                {isCallingRider ? <Phone size={14} color="#fff" /> : isCallConnected ? <PhoneOff size={14} color="#fff" /> : <Phone size={14} color={textPrimary} />}
                <Text style={{ color: isCallConnected || isCallingRider ? '#fff' : textPrimary, fontWeight: '700', fontSize: 13 }}>
                  {isCallingRider ? 'Calling...' : isCallConnected ? formatCall(callDuration) : 'Call Driver'}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setChatOpen(!chatOpen)}
              style={[styles.actionBtn, { flex: 1, backgroundColor: '#f97316', borderColor: '#f97316', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }]}
            >
              <MessageCircle size={14} color="#fff" />
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 13 }}>Message</Text>
            </TouchableOpacity>
          </View>

          {/* Chat panel */}
          {chatOpen && (
            <View style={[styles.chatPanel, { backgroundColor: dark ? '#2a2a2a' : '#f9f9f9', borderColor: border }]}>
              <View style={[styles.chatHeader, { borderBottomColor: border }]}>
                <Text style={{ fontWeight: '800', color: textPrimary, fontSize: 12 }}>
                  Chat with {order.riderName.split(' ')[0]}
                </Text>
                <TouchableOpacity onPress={() => setChatOpen(false)}>
                  <Text style={{ color: textSecondary, fontSize: 12 }}>Close</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={{ maxHeight: 140 }} showsVerticalScrollIndicator={false}>
                {chatHistory.map((msg, i) => (
                  <View key={i} style={[
                    styles.bubble,
                    msg.sender === 'customer'
                      ? { alignSelf: 'flex-end', backgroundColor: '#f97316' }
                      : { alignSelf: 'flex-start', backgroundColor: dark ? '#1e1e1e' : '#fff', borderWidth: 1, borderColor: border },
                  ]}>
                    <Text style={{ color: msg.sender === 'customer' ? '#fff' : textPrimary, fontSize: 12 }}>{msg.text}</Text>
                    <Text style={{ color: msg.sender === 'customer' ? 'rgba(255,255,255,0.7)' : textSecondary, fontSize: 9, marginTop: 2, textAlign: 'right' }}>{msg.time}</Text>
                  </View>
                ))}
              </ScrollView>
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
                <TextInput
                  placeholder="Message courier..."
                  placeholderTextColor={textSecondary}
                  value={chatMessage}
                  onChangeText={setChatMessage}
                  style={[styles.chatInput, { backgroundColor: dark ? '#1e1e1e' : '#fff', color: textPrimary, borderColor: border }]}
                  onSubmitEditing={handleSendChat}
                  returnKeyType="send"
                />
                <TouchableOpacity onPress={handleSendChat} style={styles.sendBtn}>
                  <Text style={{ color: '#fff', fontWeight: '800', fontSize: 13 }}>→</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Receipt */}
        <View style={[styles.card, { backgroundColor: surface, borderColor: border }]}>
          <Text style={{ fontWeight: '800', color: textPrimary, fontSize: 13, marginBottom: 12 }}>🧾 Receipt</Text>
          {order.items.map((item, i) => (
            <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
              <Text style={{ color: textPrimary, fontWeight: '600', fontSize: 13 }}>{item.quantity}× {item.name}</Text>
              <Text style={{ color: textPrimary, fontWeight: '700', fontSize: 13 }}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
          <View style={[styles.receiptDivider, { borderTopColor: border }]}>
            {[['Subtotal', `$${order.subtotal.toFixed(2)}`], ['Delivery Fee', `$${order.deliveryFee.toFixed(2)}`], ['Driver Tip', `$${order.tip.toFixed(2)}`]].map(([l, v]) => (
              <View key={l} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={{ color: textSecondary, fontSize: 12 }}>{l}</Text>
                <Text style={{ color: textPrimary, fontSize: 12 }}>{v}</Text>
              </View>
            ))}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6, paddingTop: 8, borderTopWidth: 1, borderTopColor: border }}>
              <Text style={{ color: textPrimary, fontWeight: '800', fontSize: 15 }}>Paid via {order.paymentMethod}</Text>
              <Text style={{ color: '#f97316', fontWeight: '900', fontSize: 15 }}>${order.total.toFixed(2)}</Text>
            </View>
          </View>
          <TouchableOpacity style={{ marginTop: 10, alignItems: 'center' }}>
            <Text style={{ color: textSecondary, fontSize: 12, textDecorationLine: 'underline' }}>
              Having an issue? Report to Help Desk
            </Text>
          </TouchableOpacity>
        </View>

        {/* Dev helper — advance status for demo */}
        {order.status !== 'delivered' && (
          <TouchableOpacity
            style={[styles.advanceBtn, { borderColor: border }]}
            onPress={() => advanceOrderStatus(order.id)}
          >
            <Text style={{ color: textSecondary, fontSize: 12, fontWeight: '600' }}>
              [Demo] Advance Order Status →
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

// ------ ORDERS LIST ------
export default function OrdersScreen() {
  const { orders } = useAppStore();
  const scheme = useColorScheme();
  const dark = scheme === 'dark';
  const router = useRouter();

  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);

  const bg = dark ? '#111' : '#faf9f8';
  const surface = dark ? '#1e1e1e' : '#fff';
  const border = dark ? '#333' : '#efe0d8';
  const textPrimary = dark ? '#f5f5f5' : '#1a1c1c';
  const textSecondary = dark ? '#9a9a9a' : '#594139';

  // Auto-open latest active order
  useEffect(() => {
    const active = orders.find((o) => o.status !== 'delivered');
    if (active && !trackingOrder) {
      setTrackingOrder(active);
    }
  }, [orders]);

  if (trackingOrder) {
    // Re-fetch latest version of the order
    const latest = orders.find((o) => o.id === trackingOrder.id) ?? trackingOrder;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: bg }} edges={['top']}>
        <OrderTracking order={latest} onBack={() => setTrackingOrder(null)} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <Text style={{ fontSize: 28, fontWeight: '900', color: textPrimary, marginBottom: 4 }}>My Orders</Text>
        <Text style={{ color: textSecondary, fontSize: 13, marginBottom: 20 }}>Track and manage your recent deliveries</Text>

        {orders.length === 0 ? (
          <View style={{ alignItems: 'center', paddingTop: 60 }}>
            <Text style={{ fontSize: 56, marginBottom: 14 }}>🍽️</Text>
            <Text style={{ fontSize: 20, fontWeight: '800', color: textPrimary, marginBottom: 8 }}>No orders yet</Text>
            <Text style={{ color: textSecondary, textAlign: 'center', lineHeight: 20, maxWidth: 280 }}>
              Your order history will appear here once you place your first order.
            </Text>
            <TouchableOpacity
              style={{ marginTop: 24, backgroundColor: '#f97316', paddingHorizontal: 28, paddingVertical: 14, borderRadius: 14 }}
              onPress={() => router.push('/')}
            >
              <Text style={{ color: '#fff', fontWeight: '800', fontSize: 15 }}>Browse Restaurants</Text>
            </TouchableOpacity>
          </View>
        ) : (
          orders.map((order) => {
            const stepIdx = getStepIdx(order.status);
            const pct = ((stepIdx + 1) / STEPS.length) * 100;
            const isActive = order.status !== 'delivered';

            return (
              <TouchableOpacity
                key={order.id}
                onPress={() => setTrackingOrder(order)}
                activeOpacity={0.8}
                style={[styles.orderCard, { backgroundColor: surface, borderColor: isActive ? '#f97316' : border }]}
              >
                {isActive && (
                  <View style={styles.liveBadge}>
                    <View style={styles.pulseDot} />
                    <Text style={{ color: '#f97316', fontWeight: '800', fontSize: 11 }}>LIVE</Text>
                  </View>
                )}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <View>
                    <Text style={{ fontWeight: '800', color: textPrimary, fontSize: 15 }}>{order.tenantName}</Text>
                    <Text style={{ color: textSecondary, fontSize: 12, marginTop: 2 }}>{order.orderNumber} · {formatDate(order.placedAt)}</Text>
                  </View>
                  <Text style={{ color: '#f97316', fontWeight: '900', fontSize: 16 }}>${order.total.toFixed(2)}</Text>
                </View>

                {/* Items list */}
                <Text style={{ color: textSecondary, fontSize: 12, marginBottom: 10 }}>
                  {order.items.map((i) => `${i.quantity}× ${i.name}`).join(' · ')}
                </Text>

                {/* Progress */}
                <View style={[styles.progressTrack, { backgroundColor: dark ? '#333' : '#eee', marginBottom: 8 }]}>
                  <View style={[styles.progressFill, { width: `${pct}%` as any }]} />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Text style={{ fontSize: 14 }}>{STEPS[stepIdx].icon}</Text>
                    <Text style={{ color: isActive ? '#f97316' : '#22c55e', fontWeight: '700', fontSize: 12 }}>
                      {STEPS[stepIdx].label}
                    </Text>
                  </View>
                  <Text style={{ color: '#f97316', fontWeight: '700', fontSize: 12 }}>
                    {isActive ? 'Track Order →' : 'View Details →'}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  card: {
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
    marginRight: 6,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#f97316',
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapBox: {
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    position: 'relative',
  },
  gridOverlay: {
    borderWidth: 0,
    opacity: 0.2,
  },
  routeLine: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    right: '10%',
    height: 3,
    borderRadius: 2,
    transform: [{ rotate: '15deg' }],
  },
  pin: {
    position: 'absolute',
    alignItems: 'center',
  },
  pinBubble: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  riderPing: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(249,115,22,0.3)',
    top: -4,
    left: -4,
  },
  riderCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f97316',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  speedBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    gap: 6,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22c55e',
  },
  riderAvatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#f97316',
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  chatPanel: {
    marginTop: 10,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  bubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 14,
    marginBottom: 6,
  },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#f97316',
    alignItems: 'center',
    justifyContent: 'center',
  },
  receiptDivider: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  orderCard: {
    padding: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  advanceBtn: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    marginTop: 4,
  },
});
