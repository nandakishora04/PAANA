import React, { useState } from 'react';
import { X, Trash2, Heart, Tag, ArrowRight, ShieldCheck, Truck, Plus, Minus, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { COUPONS } from '../data/mockData';
import { ShippingAddress } from '../types';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartDrawerOpen,
    setCartDrawerOpen,
    removeFromCart,
    updateCartQuantity,
    cartSummary,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    checkout,
    toggleWishlist,
    addToast,
  } = useShop();

  const [step, setStep] = useState<'cart' | 'address' | 'payment'>('cart');
  const [couponInput, setCouponInput] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'UPI' | 'Card'>('COD');

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: 'Rahul Sharma',
    phoneNumber: '9876543210',
    pincode: '560001',
    addressLine: 'Flat 402, Lotus Residency, 12th Cross, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    addressType: 'Home',
  });

  if (!cartDrawerOpen) return null;

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = codeToApply || couponInput;
    if (!code) return;
    const res = applyCoupon(code);
    if (res.success) {
      setCouponInput('');
    } else {
      addToast(res.message, 'error');
    }
  };

  const handlePlaceOrder = () => {
    if (!address.fullName || !address.phoneNumber || !address.addressLine) {
      addToast('Please fill out all address details', 'error');
      return;
    }
    checkout(address, paymentMethod);
    setStep('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="p-4 bg-white border-b border-zinc-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-zinc-900 font-display">
                SHOPPING BAG
              </span>
              <span className="text-xs bg-[#fed7e2] text-[#4a0515] font-bold px-2 py-0.5 rounded-full tabular-nums">
                {cartSummary.itemCount} Items
              </span>
            </div>
            <button
              onClick={() => {
                setCartDrawerOpen(false);
                setStep('cart');
              }}
              className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper indicator if in checkout */}
          {step !== 'cart' && (
            <div className="bg-zinc-50 px-4 py-2 border-b border-zinc-200 flex items-center justify-between text-xs font-semibold text-zinc-500">
              <button
                onClick={() => setStep('cart')}
                className="cursor-pointer hover:text-zinc-900"
              >
                1. Bag
              </button>
              <span>→</span>
              <button
                onClick={() => setStep('address')}
                className={`cursor-pointer ${step === 'address' ? 'text-[#4a0515] font-bold' : 'hover:text-zinc-900'}`}
              >
                2. Address
              </button>
              <span>→</span>
              <span className={step === 'payment' ? 'text-[#4a0515] font-bold' : ''}>
                3. Payment
              </span>
            </div>
          )}

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-zinc-900">Your Shopping Bag is empty</h3>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  Explore fresh streetwear drops, ethnic couture, and trending footwear to fill it up.
                </p>
                <button
                  onClick={() => setCartDrawerOpen(false)}
                  className="px-6 py-2 bg-[#4a0515] text-white text-xs font-bold uppercase rounded-lg shadow-sm hover:bg-[#60081d] transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                {step === 'cart' && (
                  <div className="space-y-4">
                    {/* Item list */}
                    <div className="divide-y divide-zinc-100 space-y-3">
                      {cart.map((item) => (
                        <div key={item.id} className="pt-3 flex gap-3">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-20 h-26 object-cover rounded-lg bg-zinc-100 shrink-0"
                          />
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-xs font-bold text-zinc-900 uppercase">
                                  {item.product.brand}
                                </p>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-zinc-400 hover:text-red-600 p-1 cursor-pointer"
                                  title="Remove item"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <p className="text-xs text-zinc-600 line-clamp-1">{item.product.name}</p>
                              <div className="mt-1 flex items-center gap-2 text-xs">
                                <span className="bg-zinc-100 text-zinc-800 font-bold px-2 py-0.5 rounded text-[11px]">
                                  Size: {item.size}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-100">
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm font-bold text-zinc-900 tabular-nums">
                                  ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                                </span>
                                <span className="text-xs text-zinc-400 line-through tabular-nums">
                                  ₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}
                                </span>
                              </div>

                              {/* Quantity Stepper */}
                              <div className="flex items-center border border-zinc-300 rounded-md">
                                <button
                                  onClick={() => updateCartQuantity(item.id, -1)}
                                  className="p-1 hover:bg-zinc-100 text-zinc-600"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2 text-xs font-bold text-zinc-800 tabular-nums">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateCartQuantity(item.id, 1)}
                                  className="p-1 hover:bg-zinc-100 text-zinc-600"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Coupons & Offers Section */}
                    <div className="pt-3 border-t border-zinc-200">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
                        <Tag className="w-3.5 h-3.5 text-[#4a0515]" />
                        Apply Promo Coupons
                      </div>

                      {appliedCoupon ? (
                        <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs">
                          <div>
                            <span className="font-bold text-emerald-800">{appliedCoupon.code}</span>
                            <span className="text-emerald-700 ml-1.5">applied!</span>
                            <p className="text-[11px] text-emerald-600">{appliedCoupon.description}</p>
                          </div>
                          <button
                            onClick={removeCoupon}
                            className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Enter coupon code"
                              value={couponInput}
                              onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                              className="flex-1 px-3 py-1.5 border border-zinc-300 rounded-lg text-xs focus:outline-hidden focus:border-[#4a0515]"
                            />
                            <button
                              onClick={() => handleApplyCoupon()}
                              className="px-4 py-1.5 bg-[#4a0515] text-white text-xs font-bold rounded-lg hover:bg-[#60081d] transition-colors cursor-pointer"
                            >
                              Apply
                            </button>
                          </div>

                          {/* Quick pick popular coupons */}
                          <div className="space-y-1.5 pt-1">
                            {COUPONS.slice(0, 2).map((c) => (
                              <button
                                key={c.code}
                                onClick={() => handleApplyCoupon(c.code)}
                                className="w-full text-left p-2 rounded-md bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-xs flex items-center justify-between"
                              >
                                <div>
                                  <span className="font-bold text-[#4a0515]">{c.code}</span>
                                  <p className="text-[10px] text-zinc-500">{c.description}</p>
                                </div>
                                <span className="text-[11px] font-bold text-zinc-700 hover:text-[#4a0515]">
                                  TAP TO APPLY
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Price Breakdown */}
                    <div className="pt-3 border-t border-zinc-200 space-y-2 text-xs">
                      <div className="flex justify-between text-zinc-600">
                        <span>Total MRP</span>
                        <span className="tabular-nums">₹{cartSummary.totalMRP.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-emerald-700 font-medium">
                        <span>Discount on MRP</span>
                        <span className="tabular-nums">- ₹{cartSummary.discountOnMRP.toLocaleString('en-IN')}</span>
                      </div>
                      {cartSummary.couponDiscount > 0 && (
                        <div className="flex justify-between text-emerald-700 font-medium">
                          <span>Coupon Savings</span>
                          <span className="tabular-nums">- ₹{cartSummary.couponDiscount.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-zinc-600">
                        <span>Convenience / Delivery Fee</span>
                        <span className="tabular-nums">
                          {cartSummary.shippingFee === 0 ? (
                            <strong className="text-emerald-700">FREE</strong>
                          ) : (
                            `₹${cartSummary.shippingFee}`
                          )}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-zinc-200 flex justify-between text-sm font-extrabold text-zinc-900">
                        <span>Total Amount</span>
                        <span className="tabular-nums">₹{cartSummary.totalAmount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                )}

                {step === 'address' && (
                  <div className="space-y-4 text-xs">
                    <h3 className="font-bold text-sm text-zinc-900 uppercase tracking-wide">
                      Shipping Details
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-zinc-600 mb-1 font-semibold">Full Name</label>
                        <input
                          type="text"
                          value={address.fullName}
                          onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                          className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-hidden focus:border-[#4a0515]"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-600 mb-1 font-semibold">10-Digit Mobile Number</label>
                        <input
                          type="text"
                          value={address.phoneNumber}
                          onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
                          className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-hidden focus:border-[#4a0515]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-zinc-600 mb-1 font-semibold">PIN Code</label>
                          <input
                            type="text"
                            value={address.pincode}
                            onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                            className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-hidden focus:border-[#4a0515]"
                          />
                        </div>
                        <div>
                          <label className="block text-zinc-600 mb-1 font-semibold">City</label>
                          <input
                            type="text"
                            value={address.city}
                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                            className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-hidden focus:border-[#4a0515]"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-zinc-600 mb-1 font-semibold">Street / Flat / House No.</label>
                        <textarea
                          rows={2}
                          value={address.addressLine}
                          onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
                          className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-hidden focus:border-[#4a0515]"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-600 mb-1 font-semibold">State</label>
                        <input
                          type="text"
                          value={address.state}
                          onChange={(e) => setAddress({ ...address, state: e.target.value })}
                          className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-hidden focus:border-[#4a0515]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 'payment' && (
                  <div className="space-y-4 text-xs">
                    <h3 className="font-bold text-sm text-zinc-900 uppercase tracking-wide">
                      Select Payment Mode
                    </h3>
                    <div className="space-y-2">
                      <label className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                        paymentMethod === 'COD' ? 'border-[#4a0515] bg-[#fed7e2]/30 font-bold' : 'border-zinc-200'
                      }`}>
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'COD'}
                          onChange={() => setPaymentMethod('COD')}
                          className="accent-[#4a0515]"
                        />
                        <div className="flex-1">
                          <p className="text-zinc-900">Cash on Delivery (COD)</p>
                          <p className="text-[11px] text-zinc-500 font-normal">Pay cash/UPI at your doorstep upon arrival</p>
                        </div>
                      </label>

                      <label className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                        paymentMethod === 'UPI' ? 'border-[#4a0515] bg-[#fed7e2]/30 font-bold' : 'border-zinc-200'
                      }`}>
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'UPI'}
                          onChange={() => setPaymentMethod('UPI')}
                          className="accent-[#4a0515]"
                        />
                        <div className="flex-1">
                          <p className="text-zinc-900">Instant UPI (GPay / PhonePe / Paytm)</p>
                          <p className="text-[11px] text-zinc-500 font-normal">Fastest checkout with 1-click UPI verification</p>
                        </div>
                      </label>

                      <label className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                        paymentMethod === 'Card' ? 'border-[#4a0515] bg-[#fed7e2]/30 font-bold' : 'border-zinc-200'
                      }`}>
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'Card'}
                          onChange={() => setPaymentMethod('Card')}
                          className="accent-[#4a0515]"
                        />
                        <div className="flex-1">
                          <p className="text-zinc-900">Credit / Debit Card</p>
                          <p className="text-[11px] text-zinc-500 font-normal">All Visa, Mastercard, and RuPay cards accepted</p>
                        </div>
                      </label>
                    </div>

                    <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200 text-[11px] text-zinc-500 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-zinc-800">
                        <Truck className="w-3.5 h-3.5 text-[#4a0515]" /> Delivery Address:
                      </div>
                      <p>{address.fullName} · {address.phoneNumber}</p>
                      <p className="truncate">{address.addressLine}, {address.city} - {address.pincode}</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sticky Bottom Action Button */}
          {cart.length > 0 && (
            <div className="p-4 bg-white border-t border-zinc-200 space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>Final Payable:</span>
                <span className="text-base font-extrabold text-zinc-900 tabular-nums">
                  ₹{cartSummary.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              {step === 'cart' && (
                <button
                  onClick={() => setStep('address')}
                  className="w-full py-3 bg-[#4a0515] hover:bg-[#60081d] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Proceed to Shipping
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {step === 'address' && (
                <button
                  onClick={() => setStep('payment')}
                  className="w-full py-3 bg-[#4a0515] hover:bg-[#60081d] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Proceed to Payment
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {step === 'payment' && (
                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Confirm & Place Order (₹{cartSummary.totalAmount.toLocaleString('en-IN')})
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
