import { FlannelPattern, FlannelStrip } from "@/components/flannel-pattern"
import { RuggedTerrain } from "@/components/rugged-terrain"
import { Mail, Phone } from "lucide-react"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* Animated terrain background */}
      <RuggedTerrain />

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 md:p-10">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded overflow-hidden">
              <FlannelPattern className="absolute inset-0" />
            </div>
            <span className="text-foreground font-medium tracking-wide">rugged.as</span>
          </div>
        </header>

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-10 lg:px-16 pb-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight leading-none">
              <span className="text-balance">Rugged AS</span>
            </h1>

            <p className="mt-6 md:mt-8 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Built to last. Norwegian craftsmanship meets modern solutions. We create things that endure.
            </p>

            {/* Flannel accent strip */}
            <div className="mt-10 md:mt-12 flex items-center gap-4">
              <div className="relative h-3 w-32 rounded overflow-hidden">
                <FlannelPattern className="absolute inset-0" />
              </div>
              <span className="text-sm text-muted-foreground uppercase tracking-widest">Est. 2024</span>
            </div>
          </div>
        </div>

        {/* Flannel divider */}
        <FlannelStrip className="relative z-20 h-4" />
        
        {/* Contact section */}
        <footer className="relative z-20 bg-card/80 backdrop-blur-sm">
          <div className="px-6 md:px-10 lg:px-16 py-10 md:py-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Brand column */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-6 h-6 rounded overflow-hidden">
                    <FlannelPattern className="absolute inset-0" />
                  </div>
                  <span className="text-foreground font-semibold">Rugged AS</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Norwegian limited company (AS)
                </p>
              </div>

              {/* Contact column */}
              <div>
                <h2 className="text-sm font-medium text-foreground uppercase tracking-wider mb-4">
                  Contact
                </h2>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="mailto:hello@rugged.as"
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                    >
                      <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="text-sm">hello@rugged.as</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+4712345678"
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                    >
                      <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="text-sm">+47 123 45 678</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-muted-foreground">
                Rugged AS. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground">
                Org.nr: XXX XXX XXX
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
