import { useState, useEffect } from 'react'
import { X, Send } from 'lucide-react'
import { apiPost, apiGet } from '@/lib/api'

// Global helpers so any button can open/close the popup
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global {
  interface Window {
    openPopupForm?: () => void
    closePopupForm?: () => void
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(window as any).openPopupForm = () =>
  document.dispatchEvent(new CustomEvent('open-popup-form'))
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(window as any).closePopupForm = () =>
  document.dispatchEvent(new CustomEvent('close-popup-form'))

interface PopupFormProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function PopupForm({ open: controlledOpen, onOpenChange }: PopupFormProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const isControlled = controlledOpen !== undefined
  const visible = isControlled ? controlledOpen : internalOpen

  const doOpen = () => {
    localStorage.removeItem('popupDone')
    setSubmitted(false)
    if (isControlled && onOpenChange) {
      onOpenChange(true)
    } else {
      setInternalOpen(true)
    }
  }

  const doClose = () => {
    localStorage.setItem('popupDone', 'true')
    if (isControlled && onOpenChange) {
      onOpenChange(false)
    } else {
      setInternalOpen(false)
    }
  }

  // listen for window.openPopupForm / window.closePopupForm calls
  useEffect(() => {
    const handleOpen = () => doOpen()
    const handleClose = () => doClose()

    document.addEventListener('open-popup-form', handleOpen)
    document.addEventListener('close-popup-form', handleClose)
    return () => {
      document.removeEventListener('open-popup-form', handleOpen)
      document.removeEventListener('close-popup-form', handleClose)
    }
  }, [isControlled, onOpenChange])

  // Auto-open after 15 seconds on first page visit (only uncontrolled mode)
  useEffect(() => {
    if (localStorage.getItem('popupDone')) return
    if (isControlled) return
    const timer = setTimeout(doOpen, 15000)
    return () => clearTimeout(timer)
  }, [isControlled])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email) return
    setSubmitting(true)
    try {
      const inquiry = {
        id: Date.now().toString(),
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message || 'Popup enquiry',
        source: 'popup',
        status: 'new',
        created_at: new Date().toISOString(),
      }
      const existing = JSON.parse(localStorage.getItem('inquiries') || '[]')
      localStorage.setItem('inquiries', JSON.stringify([inquiry, ...existing]))

      await apiPost('/api/inquiries', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message || 'Popup enquiry',
      })
    } catch {
      // ignore submission errors
    }
    setSubmitting(false)
    setSubmitted(true)
    localStorage.setItem('popupDone', 'true')
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={doClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-foreground p-6 text-background">
          {/* Close (X) button in top-right corner */}
          <button
            onClick={doClose}
            type="button"
            className="absolute top-4 right-4 p-2 rounded-full text-background/80 hover:text-background hover:bg-background/10 active:bg-background/20 transition-all cursor-pointer z-50"
            aria-label="Close"
            style={{ pointerEvents: 'auto' }}
          >
            <X className="w-5 h-5" />
          </button>
          {/* Background logo watermark (content-blocking removed) */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <img src="/logoremov.png" alt="" className="w-full h-full object-contain" style={{ pointerEvents: 'none' }} />
          </div>
          <div className="relative z-10">
            <div className="text-xs uppercase tracking-widest mb-1 opacity-60">
              Exclusive Offer
            </div>
            <h3 className="text-2xl font-black">Book a Site Visit</h3>
            <p className="text-sm opacity-70 mt-1">
              Get priority access &amp; special pricing at The Core Mall
            </p>
          </div>
        </div>

        {/* Form Body */}
        <div className="bg-white p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="text-5xl">🙏</div>
              <h4 className="text-xl font-black text-gray-800">Thank You!</h4>
              <p className="text-gray-500 text-sm">
                We will connect with you within <strong>24 hours</strong>.
              </p>
              <button
                onClick={doClose}
                type="button"
                className="mt-4 px-8 py-3 bg-foreground text-background rounded-full font-semibold text-sm hover:opacity-90 transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Name *
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-foreground/30 text-sm"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Email *
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-foreground/30 text-sm"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-foreground/30 text-sm"
                  placeholder="+91"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Message
                </label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-foreground/30 text-sm resize-none"
                  placeholder="I'm interested in..."
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-foreground hover:opacity-90 text-background font-bold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                {submitting ? (
                  'Sending...'
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" /> Send Enquiry
                  </span>
                )}
              </button>
              <p className="text-xs text-gray-400 text-center">
                Limited period offer for early bookings
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
