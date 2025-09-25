import React, { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'

function CheckoutModal({ open, onClose }) {
  const { items, totalPrice, clearCart } = useCart()
  const [step, setStep] = useState(1) // 1: address, 2: delivery, 3: payment, 4: confirm
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    deliveryType: 'standard', // standard, express
    paymentMethod: 'cod', // cod, online
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!open) return null

  function handleSubmit(e) {
    e.preventDefault()
    if (step === 1) {
      if (!form.name || !form.phone || !form.address || !form.city || !form.pincode) {
        alert('Please fill all address fields')
        return
      }
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    } else if (step === 3) {
      setStep(4)
    } else if (step === 4) {
      setIsSubmitting(true)
      // Simulate order processing
      setTimeout(() => {
        // Show success popup
        const successModal = document.createElement('div')
        successModal.className = 'fixed inset-0 z-50 flex items-center justify-center'
        successModal.innerHTML = `
          <div class="absolute inset-0 bg-black/50"></div>
          <div class="relative bg-white rounded-xl p-8 max-w-md mx-4 text-center">
            <div class="text-6xl mb-4">✅</div>
            <h3 class="text-2xl font-semibold mb-2">Order Placed Successfully!</h3>
            <p class="text-gray-600 mb-6">Your order has been confirmed and will be delivered soon.</p>
            <button class="w-full px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700" onclick="this.closest('.fixed').remove()">
              Continue Shopping
            </button>
          </div>
        `
        document.body.appendChild(successModal)
        
        clearCart()
        onClose()
        setIsSubmitting(false)
      }, 2000)
    }
  }

  const deliveryCost = form.deliveryType === 'express' ? 299 : 99
  const finalTotal = totalPrice + deliveryCost

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center p-4 sm:p-6">
        <div className="pointer-events-auto w-full max-w-2xl">
          <div className="relative rounded-xl border bg-white shadow-xl">
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="text-xl font-semibold">Checkout - Step {step} of 4</h3>
              <button className="rounded-md bg-gray-100 px-3 py-1 text-base hover:bg-gray-200" onClick={onClose}>Close</button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {step === 1 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Delivery Address</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-base outline-none focus:border-emerald-600"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-base outline-none focus:border-emerald-600"
                      required
                    />
                    <textarea
                      placeholder="Address"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-base outline-none focus:border-emerald-600 sm:col-span-2"
                      rows={3}
                      required
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-base outline-none focus:border-emerald-600"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Pincode"
                      value={form.pincode}
                      onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-base outline-none focus:border-emerald-600"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-base border border-gray-300 rounded-md hover:border-emerald-600">Cancel</button>
                    <button type="submit" className="flex-1 px-4 py-2 text-base bg-emerald-600 text-white rounded-md hover:bg-emerald-700">Proceed to Checkout</button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Delivery Options</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="deliveryType"
                        value="standard"
                        checked={form.deliveryType === 'standard'}
                        onChange={(e) => setForm({ ...form, deliveryType: e.target.value })}
                        className="text-emerald-600"
                      />
                      <div>
                        <div className="font-medium">Standard Delivery</div>
                        <div className="text-sm text-gray-600">5-7 business days • ₹99</div>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="deliveryType"
                        value="express"
                        checked={form.deliveryType === 'express'}
                        onChange={(e) => setForm({ ...form, deliveryType: e.target.value })}
                        className="text-emerald-600"
                      />
                      <div>
                        <div className="font-medium">Express Delivery</div>
                        <div className="text-sm text-gray-600">1-2 business days • ₹299</div>
                      </div>
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setStep(1)} className="px-4 py-2 text-base border border-gray-300 rounded-md hover:border-emerald-600">Back</button>
                    <button type="submit" className="flex-1 px-4 py-2 text-base bg-emerald-600 text-white rounded-md hover:bg-emerald-700">Continue</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Payment Method</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={form.paymentMethod === 'cod'}
                        onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                        className="text-emerald-600"
                      />
                      <div>
                        <div className="font-medium">Cash on Delivery</div>
                        <div className="text-sm text-gray-600">Pay when your order arrives</div>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="online"
                        checked={form.paymentMethod === 'online'}
                        onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                        className="text-emerald-600"
                      />
                      <div>
                        <div className="font-medium">Online Payment</div>
                        <div className="text-sm text-gray-600">Credit/Debit card, UPI, Net Banking</div>
                      </div>
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setStep(2)} className="px-4 py-2 text-base border border-gray-300 rounded-md hover:border-emerald-600">Back</button>
                    <button type="submit" className="flex-1 px-4 py-2 text-base bg-emerald-600 text-white rounded-md hover:bg-emerald-700">Continue</button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Order Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery ({form.deliveryType === 'express' ? 'Express' : 'Standard'})</span>
                      <span>₹{deliveryCost}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t pt-2">
                      <span>Total</span>
                      <span>₹{finalTotal}</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="text-sm">
                      <div><strong>Deliver to:</strong> {form.name}</div>
                      <div>{form.address}, {form.city} - {form.pincode}</div>
                      <div><strong>Phone:</strong> {form.phone}</div>
                      <div><strong>Payment:</strong> {form.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setStep(3)} className="px-4 py-2 text-base border border-gray-300 rounded-md hover:border-emerald-600">Back</button>
                    <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 text-base bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50">
                      {isSubmitting ? 'Placing Order...' : 'Place Order'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutModal
