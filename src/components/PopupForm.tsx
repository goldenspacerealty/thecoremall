import { useState, useEffect } from 'react'
import { X, Send } from 'lucide-react'

export function PopupForm() {
  const [visible, setVisible] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('popupDone')) return
    const timer = setTimeout(() => setVisible(true), 15000)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setVisible(false)
    localStorage.setItem('popupDone', 'true')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email) return
    setSubmitting(true)
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, message: form.message || 'Popup enquiry' })
      })
    } catch {}
    setSubmitting(false)
    setSubmitted(true)
    localStorage.setItem('popupDone', 'true')
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={handleClose}>
      <div className="relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}>

        {/* Header - footer color (foreground bg) */}
        <div className="relative bg-foreground p-6 text-background">
          {/* Background logo watermark */}
          <div className="absolute inset-0 opacity-5">
            <img src="/logoremov.png" alt="" className="w-full h-full object-contain" />
          </div>
          <button onClick={handleClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-background/20 transition-colors z-10">
            <X className="w-5 h-5" />
          </button>
          <div className="relative z-10">
            <div className="text-xs uppercase tracking-widest mb-1 opacity-60">Exclusive Offer</div>
            <h3 className="text-2xl font-black">Book a Site Visit</h3>
            <p className="text-sm opacity-70 mt-1">Get priority access & special pricing at The Core Mall</p>
          </div>
        </div>

        {/* Body */}
        <div className="bg-white p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="text-5xl">🙏</div>
              <h4 className="text-xl font-black text-gray-800">Thank You!</h4>
              <p className="text-gray-500 text-sm">We will connect with you within <strong>24 hours</strong>.</p>
              <button onClick={handleClose}
                className="mt-4 px-8 py-3 bg-foreground text-background rounded-full font-semibold text-sm hover:opacity-90 transition-all">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Name *</label>
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-foreground/30 text-sm"
                  placeholder="Your name" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Email *</label>
                <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-foreground/30 text-sm"
                  placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Phone</label>
                <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-foreground/30 text-sm"
                  placeholder="+91" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Message</label>
                <textarea rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-foreground/30 text-sm resize-none"
                  placeholder="I'm interested in..." />
              </div>
              <button type="submit" disabled={submitting}
                className="w-full py-3 bg-foreground hover:opacity-90 text-background font-bold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50">
                {submitting ? 'Sending...' : <><Send className="w-4 h-4" /> Send Enquiry</>}
              </button>
              <p className="text-xs text-gray-400 text-center">Limited period offer for early bookings</p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
