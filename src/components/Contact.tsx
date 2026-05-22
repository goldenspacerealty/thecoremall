import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { MapPin } from 'lucide-react'
import { apiPost } from '@/lib/api'

const locations = [
  {
    number: "1",
    name: "ABES Institute",
    distance: "Walking distance",
    description: "Explore the exciting realm of programming, where creativity meets technology!",
  },
  {
    number: "2",
    name: "Noida Extension",
    distance: "1 km",
    description: "Explore the exciting realm of programming, where your imagination can truly flourish through technology!",
  },
  {
    number: "3",
    name: "Noida Sector 62",
    distance: "10-minute drive",
    description: "Explore the vibrant world of coding, where creativity meets technology!",
  },
  {
    number: "4",
    name: "Metro Station",
    distance: "15-minute drive",
    description: "Explore the vibrant world of coding, where creativity meets technology!",
  },
]

export function Contact() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim()) {
      toast({ title: 'Please fill in all fields', variant: 'destructive' })
      return
    }
    setIsSubmitting(true)

    // Save to backend
    apiPost('/api/inquiries', { ...formData, source: 'contact' }).catch(() => {})

    setTimeout(() => {
      toast({ title: 'Message sent!', description: "We'll get back to you soon." })
      setFormData({ name: '', email: '', phone: '', message: '' })
      setIsSubmitting(false)
    }, 800)
  }

  return (
    <section id="location" className="relative py-4 bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 text-foreground">
            Contact Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Visit The Core Mall or reach out to us today
          </p>
        </div>

        {/* 2 Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left — Location Points */}
          <div className="space-y-6">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-accent-purple font-semibold mb-2">Prime Location</p>
              <h3 className="text-3xl font-black text-foreground">Nearby Landmarks</h3>
              <p className="text-muted-foreground mt-2 text-sm">The Core Mall is strategically located where the crowd is today.</p>
            </div>

            {locations.map((loc) => (
              <div key={loc.number} className="flex gap-4 group">
                {/* Number */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent-purple/10 border border-accent-purple/30 flex items-center justify-center group-hover:bg-accent-purple group-hover:border-accent-purple transition-all duration-300">
                  <span className="text-accent-purple group-hover:text-white font-black text-lg transition-colors">{loc.number}</span>
                </div>

                {/* Content */}
                <div className="flex-1 bg-card border border-border rounded-xl p-4 group-hover:border-accent-purple/50 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-accent-purple" />
                    <span className="font-black text-foreground">{loc.name}</span>
                    <span className="text-xs text-accent-purple font-semibold ml-auto">({loc.distance})</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{loc.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right — Contact Form */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="bg-accent-purple/10 px-8 py-5 border-b border-border">
              <h3 className="text-xl font-black text-foreground">Send Us a Message</h3>
              <p className="text-muted-foreground text-sm mt-1">We'll respond within 24 hours</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-purple/50 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-purple/50 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-purple/50 transition-all"
                  placeholder="+91"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-purple/50 transition-all resize-none"
                  placeholder="Tell us about your interest..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-accent-purple text-white font-black text-lg hover:bg-accent-purple/90 transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
