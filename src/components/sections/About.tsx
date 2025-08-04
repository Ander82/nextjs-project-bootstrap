'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const About = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const certifications = [
    'Certified UiPath Developer',
    'Microsoft Power Platform Certified',
    'AWS Solutions Architect',
    'SAP Integration Certified',
    'Scrum Master Certified'
  ]

  const technologies = {
    'Backend & APIs': ['Node.js', 'Python', 'C#', '.NET', 'Express', 'FastAPI', 'REST APIs', 'GraphQL'],
    'RPA & Automação': ['UiPath', 'Power Automate', 'AutomationEdge', 'Blue Prism', 'Python Scripts', 'PowerShell'],
    'Integração': ['SAP', 'Oracle ERP', 'SQL Server', 'PostgreSQL', 'MongoDB', 'Redis', 'Apache Kafka'],
    'IA & LLMs': ['OpenAI GPT', 'Google Gemini', 'Anthropic Claude', 'LangChain', 'Vector Databases', 'OCR'],
    'Cloud & DevOps': ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Jenkins'],
    'Frontend': ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js', 'Angular']
  }

  if (!mounted) return null

  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Sobre Mim
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Profissional com mais de 10 anos de experiência transformando processos através da tecnologia
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Bio & Image */}
            <div className="space-y-8">
              <div className="relative">
                <img 
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3314b526-44e2-456a-b490-98afe23e3b00.png"
                  alt="Foto profissional de engenheiro de software sênior em ambiente de trabalho moderno com múltiplos monitores e setup tecnológico avançado"
                  className="w-full rounded-2xl shadow-2xl border border-border/20"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl" />
              </div>

              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">Minha Jornada</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Iniciei minha carreira como desenvolvedor full-stack, evoluindo rapidamente para arquitetura de sistemas complexos. 
                      Nos últimos 5 anos, me especializei em automação de processos e integração de sistemas legados.
                    </p>
                    <p>
                      Minha paixão por inovação me levou a explorar o potencial da Inteligência Artificial aplicada à automação, 
                      desenvolvendo soluções que combinam RPA tradicional com agentes inteligentes e LLMs.
                    </p>
                    <p>
                      Hoje, ajudo empresas a modernizar seus processos através de hiperautomação, integrando sistemas legados 
                      com tecnologias modernas e implementando soluções de IA que geram impacto real nos negócios.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Skills & Certifications */}
            <div className="space-y-8">
              {/* Certifications */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400">Certificações</h3>
                  <div className="space-y-3">
                    {certifications.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                        <span className="text-muted-foreground">{cert}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Technologies */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-6 text-blue-400">Stack Tecnológico</h3>
                  <div className="space-y-6">
                    {Object.entries(technologies).map(([category, techs]) => (
                      <div key={category}>
                        <h4 className="text-sm font-semibold text-cyan-400 mb-3">{category}</h4>
                        <div className="flex flex-wrap gap-2">
                          {techs.map((tech) => (
                            <Badge 
                              key={tech} 
                              variant="secondary" 
                              className="bg-secondary/50 hover:bg-blue-500/20 hover:border-blue-400/50 transition-all duration-300 cursor-default"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Key Achievements */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400">Principais Conquistas</h3>
                  <div className="space-y-4">
                    {[
                      { metric: '40%', description: 'Redução média de tempo em processos automatizados' },
                      { metric: '25+', description: 'Sistemas legados integrados com sucesso' },
                      { metric: '95%', description: 'Taxa de sucesso em projetos de automação' },
                      { metric: '500k+', description: 'Horas de trabalho manual economizadas' }
                    ].map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="text-2xl font-bold text-blue-400 min-w-[60px]">
                          {achievement.metric}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {achievement.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
