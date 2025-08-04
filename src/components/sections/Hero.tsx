'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

const Hero = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToPortfolio = () => {
    const element = document.querySelector('#portfolio')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!mounted) return null

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Engenheiro de Software
              </span>
              <br />
              <span className="text-foreground">Sênior</span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-8 animate-fade-in delay-200">
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 leading-relaxed">
              Especialista em <span className="text-blue-400 font-semibold">desenvolvimento de sistemas</span>, 
              <span className="text-cyan-400 font-semibold"> automação RPA</span> e 
              <span className="text-blue-400 font-semibold"> soluções inteligentes com IA</span>
            </p>
          </div>

          {/* Key technologies */}
          <div className="mb-12 animate-fade-in delay-400">
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                'Backend & APIs',
                'UiPath & Power Automate', 
                'Integração SAP/ERP',
                'LLMs & Agentes IA',
                'Python & PowerShell',
                'Hiperautomação'
              ].map((tech, index) => (
                <span 
                  key={tech}
                  className="px-4 py-2 bg-secondary/50 backdrop-blur-sm rounded-full text-sm font-medium border border-border/50 hover:border-blue-400/50 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div className="mb-12 animate-fade-in delay-800">
            <div className="relative max-w-4xl mx-auto">
              <img 
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4090a010-53de-46c2-b11b-a47cce23aa3b.png"
                alt="Workspace moderno de engenheiro de software com múltiplos monitores exibindo código, dashboards de automação RPA, integrações de sistemas e interfaces de IA, ambiente escuro com iluminação neon azul"
                className="w-full rounded-2xl shadow-2xl border border-border/20 hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl" />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-1000">
            <Button 
              size="lg" 
              onClick={scrollToPortfolio}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            >
              Ver Portfólio
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={scrollToContact}
              className="border-blue-400/50 text-blue-400 hover:bg-blue-400/10 hover:border-blue-400 font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
            >
              Entrar em Contato
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in delay-1200">
            {[
              { number: '10+', label: 'Anos de Experiência' },
              { number: '50+', label: 'Projetos Entregues' },
              { number: '15+', label: 'Automações RPA' },
              { number: '5+', label: 'Integrações SAP' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-blue-400/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}

export default Hero
