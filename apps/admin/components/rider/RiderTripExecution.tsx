'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Navigation, ArrowRight, Store, MapPin, Phone, MessageSquare, Camera } from 'lucide-react';

export const RiderTripExecution: React.FC = () => {
  const {
    activeOrder,
    orders,
    updateOrderStatus,
    setRiderTab,
    showToast,
    themeMode
  } = useApp();

  const [tripStage, setTripStage] = useState<'heading_to_kitchen' | 'at_kitchen' | 'heading_to_customer' | 'at_door' | 'completed'>('heading_to_kitchen');
  const [hasTakenProofPhoto, setHasTakenProofPhoto] = useState(false);

  const currentTrip = activeOrder || orders[0];

  if (!currentTrip) {
    return (
      <div className={`text-center py-20 rounded-3xl p-8 border space-y-4 max-w-md mx-auto ${
        themeMode === 'dark'
          ? 'bg-[#242625] border-[#3a3a3a]'
          : 'glass-panel border-[#e1bfb5]/50'
      }`}>
        <Navigation className={`text-4xl ${
          themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
        }`} />
        <h2 className={`font-heading font-extrabold text-lg ${
          themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
        }`}>No Active Trip Selected</h2>
        <p className={`text-xs ${
          themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
        }`}>Accept an inbound pickup request from the Rider Radar to initiate turn-by-turn guidance.</p>
        <button
          onClick={() => setRiderTab('radar')}
          className="px-5 py-2.5 rounded-xl glass-button-primary text-xs font-bold"
        >
          Open Rider Radar
        </button>
      </div>
    );
  }

  const courierPayout = 6.50 + currentTrip.tip;

  const handleAdvanceStage = () => {
    if (tripStage === 'heading_to_kitchen') {
      setTripStage('at_kitchen');
      showToast('Arrived at Kitchen', 'Show order number to restaurant counter staff', 'info');
    } else if (tripStage === 'at_kitchen') {
      setTripStage('heading_to_customer');
      updateOrderStatus(currentTrip.id, 'picked_up');
      showToast('Pickup Confirmed', 'Turn-by-turn navigation started to customer address', 'success');
    } else if (tripStage === 'heading_to_customer') {
      setTripStage('at_door');
      showToast('Arrived at Customer Door', 'Follow customer drop-off instructions', 'info');
    } else if (tripStage === 'at_door') {
      setTripStage('completed');
      updateOrderStatus(currentTrip.id, 'delivered');
      showToast('Delivery Finalized! 🎉', `$${courierPayout.toFixed(2)} added to your shift wallet`, 'success');
    }
  };

  return (
    <div className="space-y-6 pb-20 max-w-4xl">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className={`font-heading font-extrabold text-xl sm:text-2xl ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>
              Active GPS Delivery HUD
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#ab3500] text-white">
              {currentTrip.orderNumber}
            </span>
          </div>
          <p className={`text-xs mt-0.5 ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
          }`}>
            Earning: <span className="font-bold text-[#006c4f]">${courierPayout.toFixed(2)}</span> (${currentTrip.tip.toFixed(2)} tip included)
          </p>
        </div>

        <button
          onClick={() => setRiderTab('radar')}
          className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold shadow-sm transition-colors cursor-pointer self-start sm:self-auto ${
            themeMode === 'dark'
              ? 'bg-[#383a39] border-[#3a3a3a] text-[#c4c4c4] hover:bg-[#4a4a4a]'
              : 'bg-white border-[#e1bfb5]/60 text-[#594139] hover:bg-[#f3f3f3]'
          }`}
        >
          ← Return to Radar
        </button>
      </div>

      {/* Turn by Turn GPS Banner */}
      <div className={`rounded-3xl p-6 border-2 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 ${
        themeMode === 'dark'
          ? 'bg-[#383a39] border-[#24619d]'
          : 'glass-panel border-[#24619d] bg-linear-to-r from-blue-50/50 to-indigo-50/50'
      }`}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#24619d] text-white flex items-center justify-center shadow-lg">
            {tripStage === 'heading_to_kitchen' ? <ArrowRight className="w-[28px] h-[28px]" /> :
             tripStage === 'at_kitchen' ? <Store className="w-[28px] h-[28px]" /> :
             tripStage === 'heading_to_customer' ? <Navigation className="w-[28px] h-[28px]" /> :
             <MapPin className="w-[28px] h-[28px]" />}
          </div>
          <div>
            <span className="text-[11px] uppercase font-bold text-[#24619d] tracking-wider">
              {tripStage === 'heading_to_kitchen' && 'Next Maneuver in 200m'}
              {tripStage === 'at_kitchen' && 'Inside Venue'}
              {tripStage === 'heading_to_customer' && 'Next: Continue onto Metropolis Ave'}
              {tripStage === 'at_door' && 'At Customer Drop-off Point'}
              {tripStage === 'completed' && 'Trip Completed'}
            </span>
            <h2 className={`font-heading font-extrabold text-lg sm:text-xl ${
              themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
            }`}>
              {tripStage === 'heading_to_kitchen' && `Turn Right into ${currentTrip.tenantName}`}
              {tripStage === 'at_kitchen' && `Pick up Order #${currentTrip.orderNumber}`}
              {tripStage === 'heading_to_customer' && `Drive 1.2 km to 742 Evergreen Terrace`}
              {tripStage === 'at_door' && `Drop at door: Gate #4092`}
              {tripStage === 'completed' && 'Great job! Order delivered safely.'}
            </h2>
            <p className={`text-xs ${
              themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
            }`}>
              {tripStage === 'heading_to_kitchen' && 'Estimated 3 mins remaining to kitchen'}
              {tripStage === 'heading_to_customer' && 'Estimated 7 mins remaining to destination'}
            </p>
          </div>
        </div>

        {/* Action Button */}
        {tripStage !== 'completed' ? (
          <button
            onClick={handleAdvanceStage}
            className="w-full md:w-auto px-6 py-3.5 rounded-2xl glass-button-primary font-heading font-extrabold text-xs shadow-xl shadow-[#ab3500]/30 transition-all cursor-pointer whitespace-nowrap"
          >
            {tripStage === 'heading_to_kitchen' && 'Confirm Arrived at Restaurant →'}
            {tripStage === 'at_kitchen' && 'Verify Bag & Start Navigation →'}
            {tripStage === 'heading_to_customer' && 'Confirm Arrived at Customer Door →'}
            {tripStage === 'at_door' && 'Finalize Dropoff & Claim Cash →'}
          </button>
        ) : (
          <button
            onClick={() => setRiderTab('radar')}
            className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-[#006c4f] text-white font-heading font-extrabold text-xs shadow-lg cursor-pointer"
          >
            Back to Radar for Next Trip →
          </button>
        )}
      </div>

      {/* Trip Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Customer & Location Card */}
        <div className={`rounded-3xl p-6 border space-y-4 ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'glass-panel border-[#e1bfb5]/50'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className={`font-heading font-bold text-xs uppercase tracking-wider ${
              themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
            }`}>
              Customer Details & Drop-off Notes
            </h3>
            <span className="px-2 py-0.5 rounded bg-[#00ae81]/15 text-[#006c4f] text-[10px] font-bold">
              Contactless
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <p className={`font-heading font-bold text-sm ${
                themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
              }`}>{currentTrip.customerName}</p>
              <p className={`text-xs ${
                themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#594139]'
              }`}>{currentTrip.customerPhone}</p>
            </div>

            <div className={`p-3.5 rounded-2xl border space-y-1 ${
              themeMode === 'dark'
                ? 'bg-[#383a39] border-[#3a3a3a]'
                : 'bg-[#f9f9f9] border-[#e1bfb5]/40'
            }`}>
              <span className="text-[10px] font-extrabold uppercase text-[#ab3500]">Drop-off Instructions</span>
              <p className={`text-xs font-medium ${
                themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
              }`}>
                {currentTrip.deliveryNotes || 'Leave at front door and ring bell.'}
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => showToast('Calling Customer', `Dialing ${currentTrip.customerPhone}...`, 'info')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 border cursor-pointer ${
                  themeMode === 'dark'
                    ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5] hover:bg-[#4a4a4a]'
                    : 'bg-[#f3f3f3] border-[#e1bfb5]/50 text-[#1a1c1c] hover:bg-[#e8e8e8]'
                }`}
              >
                <Phone className="w-[16px] h-[16px] text-[#006c4f]" />
                <span>Call Customer</span>
              </button>

              <button
                onClick={() => showToast('SMS Sent', 'Automated ETA sent to customer', 'info')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 border cursor-pointer ${
                  themeMode === 'dark'
                    ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5] hover:bg-[#4a4a4a]'
                    : 'bg-[#f3f3f3] border-[#e1bfb5]/50 text-[#1a1c1c] hover:bg-[#e8e8e8]'
                }`}
              >
                <MessageSquare className="w-[16px] h-[16px] text-[#24619d]" />
                <span>Send Quick SMS</span>
              </button>
            </div>
          </div>
        </div>

        {/* Order Verification Items List */}
        <div className={`rounded-3xl p-6 border space-y-4 ${
          themeMode === 'dark'
            ? 'bg-[#242625] border-[#3a3a3a]'
            : 'glass-panel border-[#e1bfb5]/50'
        }`}>
          <h3 className={`font-heading font-bold text-xs uppercase tracking-wider ${
            themeMode === 'dark' ? 'text-[#7a7a7a]' : 'text-[#8d7168]'
          }`}>
            Order Items Checklist ({currentTrip.items.length} items)
          </h3>

          <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1 text-xs">
            {currentTrip.items.map((item, i) => (
              <div key={i} className={`flex justify-between items-center p-2 rounded-xl border ${
                themeMode === 'dark'
                  ? 'bg-[#383a39] border-[#3a3a3a]'
                  : 'bg-[#f9f9f9] border-[#e1bfb5]/30'
              }`}>
                <span className={`font-bold ${
                  themeMode === 'dark' ? 'text-[#f5f5f5]' : 'text-[#1a1c1c]'
                }`}>{item.quantity}x {item.name}</span>
                <span className={`text-[10px] font-bold ${
                  themeMode === 'dark' ? 'text-emerald-400' : 'text-[#006c4f]'
                }`}>✓ Sealed in Bag</span>
              </div>
            ))}
          </div>

          {tripStage === 'at_door' && (
            <div className={`pt-2 border-t space-y-2 ${
              themeMode === 'dark' ? 'border-[#3a3a3a]/40' : 'border-[#e1bfb5]/40'
            }`}>
              <button
                onClick={() => {
                  setHasTakenProofPhoto(true);
                  showToast('Proof Photo Captured', 'Geotagged image uploaded to proof-of-delivery log', 'success');
                }}
                className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  hasTakenProofPhoto
                    ? 'bg-[#00ae81]/15 text-[#006c4f] border border-[#00ae81]/40'
                    : themeMode === 'dark'
                      ? 'bg-[#383a39] border-[#3a3a3a] text-[#f5f5f5] hover:bg-[#4a4a4a]'
                      : 'bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[#1a1c1c] border border-[#e1bfb5]/50'
                }`}
              >
                <Camera className="w-[18px] h-[18px]" />
                <span>{hasTakenProofPhoto ? '✓ Delivery Photo Attached' : 'Take Drop-off Proof Photo'}</span>
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
