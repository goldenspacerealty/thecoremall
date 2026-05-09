'use client'

const brands = [
  { image: '/Brand/B king.jpg', name: 'Burger King' },
  { image: '/Brand/Barista.png', name: 'Barista' },
  { image: "/Brand/Café Coffee Day.jpg", name: 'Café Coffee Day' },
  { image: '/Brand/Cantabil.png', name: 'Cantabil' },
  { image: '/Brand/Coffee Day.png', name: 'Coffee Day' },
  { image: '/Brand/Croma.png', name: 'Croma' },
  { image: "/Brand/Dominos Pizza.png", name: "Domino's Pizza" },
  { image: '/Brand/download.png', name: 'spencers' },
  { image: '/Brand/KFC.jpg', name: 'KFC' },
  { image: "/Brand/Levis.png", name: "Levi's" },
  { image: '/Brand/Miraj Cinemas.png', name: 'Miraj Cinemas' },
  { image: '/Brand/Pizza.jpg', name: 'Pizza' },
  { image: '/Brand/Popeyes.png', name: 'Popeyes' },
  { image: '/Brand/puma.jpg', name: 'Puma' },
  { image: '/Brand/Regus.png', name: 'Regus' },
  { image: '/Brand/Reliance Digital.png', name: 'Reliance Digital' },
  { image: '/Brand/Sag Ratna.jpg', name: 'Sag Ratna' },
  { image: '/Brand/Subway.png', name: 'Subway' },
  { image: '/Brand/Wow! Momo.jpg', name: 'Wow! Momo' },
  { image: '/Brand/Yousta.webp', name: 'Yousta' },
]

export function Awards() {
  return (
    <section id="highlights" className="relative py-24 bg-background overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 via-background to-accent-blue/5 pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight text-center">
            Our Brands & <span className="text-accent-purple">Tenants</span>
          </h2>
        </div>

        {/* 2 Column Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — About Content */}
          <div className="space-y-8">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.3em] text-accent-purple font-semibold">The Destination</p>
              <h3 className="text-3xl sm:text-4xl font-black text-foreground">THE CORE MALL</h3>
            </div>

            <p className="text-muted-foreground leading-relaxed text-base">
              The Core Mall Ghaziabad represents the perfect synergy of luxury retail and modern living. Strategically located where the crowd is today, it offers a high-yield investment opportunity in the heart of a flourishing market.
            </p>

            <div className="border-l-4 border-accent-purple pl-5 space-y-3">
              <p className="text-lg font-black text-foreground">Why Choose The Core Mall?</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="font-semibold text-foreground">Prime Reality:</span> Located in Ghaziabad's most active hub.</li>
                <li><span className="font-semibold text-foreground">Retail Excellence:</span> Home to 21+ premium international brands.</li>
                <li><span className="font-semibold text-foreground">Dual Investment:</span> Luxury retail shops and stylish studio apartments.</li>
                <li><span className="font-semibold text-foreground">Instant Footfall:</span> Positioned where the people are, ensuring immediate returns.</li>
                <li><span className="font-semibold text-foreground">Modern Lifestyle:</span> Exceptional amenities paired with world-class architecture.</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
              <p className="text-base font-black text-foreground"> Secure Your Future</p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Investing in <span className="font-bold text-foreground">"The Core"</span> isn't just about buying property; it's about securing a stake in a thriving economy. Whether you are looking for a high-visibility shop or a premium studio apartment, this is where luxury meets profitability.
              </p>
              <div className="w-12 h-px bg-accent-purple" />
              <p className="text-sm text-accent-purple font-semibold">
                 Experience the moment of definition in Ghaziabad's architecture.
              </p>
              <p className="text-sm font-bold text-foreground">Contact us today to book your space!  +91 9953548629</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '21+', label: 'Brands' },
                { value: 'Prime', label: 'Location' },
                { value: '100%', label: 'Premium' },
              ].map((stat) => (
                <div key={stat.label} className="bg-card border border-border rounded-xl p-4 text-center">
                  <div className="text-2xl font-black text-accent-purple">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Brands Grid */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-6">
              Brands at The Core Mall
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {brands.map((brand, index) => (
                <div key={index} className="flex flex-col items-center text-center group">
                  <div className="w-full p-3 rounded-xl border border-border bg-card transition-all duration-300 group-hover:border-accent-purple/50 group-hover:shadow-lg group-hover:shadow-accent-purple/10 group-hover:scale-105">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-14 object-contain mx-auto"
                    />
                  </div>
                  <span className="mt-2 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}



