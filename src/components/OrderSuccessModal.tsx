import React from 'react';
import { CheckCircle2, PackageCheck, Truck, ArrowRight, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderSuccessModal: React.FC = () => {
  const { lastOrder, closeOrderModal } = useShop();

  if (!lastOrder) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeOrderModal}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-left overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 space-y-6">
          {/* Success Banner */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-extrabold text-zinc-900 font-display">
              Order Confirmed!
            </h2>
            <p className="text-xs text-zinc-500">
              Thank you for shopping at Paana. Your items have been dispatched to our fulfillment hub.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200 text-xs space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
              <span className="text-zinc-500">Order ID:</span>
              <span className="font-mono font-bold text-[#4a0515] tracking-wider text-sm">
                {lastOrder.id}
              </span>
            </div>

            <div className="flex items-center gap-2 text-emerald-800 font-medium bg-emerald-50 p-2.5 rounded-lg border border-emerald-100">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Estimated Arrival: <strong>{lastOrder.expectedDelivery}</strong>
              </span>
            </div>

            <div className="space-y-1.5 pt-1">
              <span className="font-bold text-zinc-700 block">Deliver to:</span>
              <p className="text-zinc-800 font-medium">
                {lastOrder.address.fullName} ({lastOrder.address.phoneNumber})
              </p>
              <p className="text-zinc-500">
                {lastOrder.address.addressLine}, {lastOrder.address.city} - {lastOrder.address.pincode}
              </p>
            </div>

            <div className="pt-2 border-t border-zinc-200 flex justify-between items-center">
              <div>
                <span className="text-zinc-500 block">Payment Method:</span>
                <span className="font-bold text-zinc-800">
                  {lastOrder.paymentMethod === 'COD'
                    ? 'Cash On Delivery'
                    : lastOrder.paymentMethod === 'UPI'
                    ? 'Prepaid UPI'
                    : 'Credit/Debit Card'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-zinc-500 block">Amount Paid:</span>
                <span className="font-extrabold text-[#4a0515] text-base tabular-nums">
                  ₹{lastOrder.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Ordered items miniature preview */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">
              Ordered Items ({lastOrder.items.length})
            </span>
            <div className="max-h-36 overflow-y-auto space-y-2 pr-1">
              {lastOrder.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-2 bg-zinc-50 rounded-lg text-xs"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-10 h-12 object-cover rounded bg-white"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-zinc-900 truncate">{item.product.brand}</p>
                    <p className="text-zinc-500 truncate">{item.product.name}</p>
                    <p className="text-zinc-400">
                      Size: {item.size} · Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-zinc-900 tabular-nums">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="space-y-2">
            <button
              onClick={closeOrderModal}
              className="w-full py-3 bg-[#4a0515] hover:bg-[#60081d] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>SMS & Email tracking updates dispatched</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
