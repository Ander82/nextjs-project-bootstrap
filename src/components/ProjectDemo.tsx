'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface ProjectDemoProps {
  project: {
    title: string
    category: string
    description: string
    technologies: string[]
    features: string[]
    results: string[]
  }
  demoType: 'erp' | 'rpa' | 'integration' | 'portal' | 'gateway' | 'analytics'
}

const ProjectDemo = ({ project, demoType }: ProjectDemoProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const demos = {
    erp: {
      title: 'Demo: Sistema ERP Integrado',
      steps: [
        { name: 'Dashboard Principal', description: 'Visão geral com métricas em tempo real' },
        { name: 'Módulo Financeiro', description: 'Gestão de contas a pagar e receber' },
        { name: 'Controle de Estoque', description: 'Monitoramento de produtos e movimentações' },
        { name: 'Relatórios Automáticos', description: 'Geração de relatórios executivos' }
      ],
      metrics: [
        { label: 'Vendas Hoje', value: 'R$ 45.230', change: '+12%' },
        { label: 'Pedidos Processados', value: '127', change: '+8%' },
        { label: 'Estoque Crítico', value: '3 itens', change: '-2' },
        { label: 'Faturamento Mensal', value: 'R$ 1.2M', change: '+15%' }
      ]
    },
    rpa: {
      title: 'Demo: Automação SAP com RPA',
      steps: [
        { name: 'Extração de Dados', description: 'Bot coletando dados do SAP automaticamente' },
        { name: 'Validação Inteligente', description: 'Verificação automática de inconsistências' },
        { name: 'Processamento em Lote', description: 'Processamento de 500+ pedidos' },
        { name: 'Relatório Final', description: 'Geração automática de relatórios' }
      ],
      metrics: [
        { label: 'Registros Processados', value: '2.847', change: '+500%' },
        { label: 'Tempo Economizado', value: '6.5h', change: '80%' },
        { label: 'Precisão', value: '99.2%', change: '+4%' },
        { label: 'Erros Detectados', value: '12', change: '-85%' }
      ]
    },
    integration: {
      title: 'Demo: Plataforma de Integração',
      steps: [
        { name: 'Mapeamento de Sistemas', description: 'Identificação de 15 sistemas conectados' },
        { name: 'Sincronização em Tempo Real', description: 'Dados fluindo entre sistemas' },
        { name: 'Transformação de Dados', description: 'Conversão automática de formatos' },
        { name: 'Monitoramento de Saúde', description: 'Status de todos os sistemas' }
      ],
      metrics: [
        { label: 'Sistemas Conectados', value: '15', change: '+3' },
        { label: 'Mensagens/min', value: '1.247', change: '+25%' },
        { label: 'Uptime', value: '99.98%', change: '+0.1%' },
        { label: 'Latência Média', value: '45ms', change: '-20%' }
      ]
    },
    portal: {
      title: 'Demo: Portal de Automação Corporativa',
      steps: [
        { name: 'Dashboard Executivo', description: 'Visão geral de todas as automações' },
        { name: 'Monitoramento RPA', description: 'Status de bots em tempo real' },
        { name: 'Análise de ROI', description: 'Cálculo automático de retorno' },
        { name: 'Relatórios Personalizados', description: 'Geração de insights executivos' }
      ],
      metrics: [
        { label: 'Bots Ativos', value: '23', change: '+5' },
        { label: 'ROI Acumulado', value: '340%', change: '+40%' },
        { label: 'Horas Economizadas', value: '1.250h', change: '+200h' },
        { label: 'Processos Automatizados', value: '47', change: '+12' }
      ]
    },
    gateway: {
      title: 'Demo: API Gateway Empresarial',
      steps: [
        { name: 'Registro de APIs', description: 'Catalogação automática de endpoints' },
        { name: 'Autenticação JWT', description: 'Validação de tokens em tempo real' },
        { name: 'Rate Limiting', description: 'Controle de tráfego por cliente' },
        { name: 'Métricas e Logs', description: 'Monitoramento completo de performance' }
      ],
      metrics: [
        { label: 'APIs Gerenciadas', value: '247', change: '+47' },
        { label: 'Requests/min', value: '15.6K', change: '+30%' },
        { label: 'Latência P95', value: '120ms', change: '-15%' },
        { label: 'Uptime', value: '99.99%', change: '+0.01%' }
      ]
    },
    analytics: {
      title: 'Demo: Sistema de Análise Preditiva',
      steps: [
        { name: 'Coleta de Dados', description: 'Ingestão de dados históricos e em tempo real' },
        { name: 'Processamento ML', description: 'Modelos de machine learning em execução' },
        { name: 'Previsões Geradas', description: 'Predições para próximos 30 dias' },
        { name: 'Alertas Inteligentes', description: 'Notificações baseadas em anomalias' }
      ],
      metrics: [
        { label: 'Precisão do Modelo', value: '94.2%', change: '+2.1%' },
        { label: 'Previsões Geradas', value: '1.847', change: '+340' },
        { label: 'Economia Estimada', value: 'R$ 125K', change: '+R$ 25K' },
        { label: 'Alertas Enviados', value: '23', change: '+8' }
      ]
    }
  }

  const currentDemo = demos[demoType]

  const runDemo = () => {
    setIsRunning(true)
    setCurrentStep(0)
    
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= currentDemo.steps.length - 1) {
          clearInterval(interval)
          setIsRunning(false)
          return prev
        }
        return prev + 1
      })
    }, 2000)
  }

  const resetDemo = () => {
    setCurrentStep(0)
    setIsRunning(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          size="sm"
          className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
        >
          Ver Demo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {currentDemo.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Demo Controls */}
          <div className="flex space-x-4">
            <Button 
              onClick={runDemo} 
              disabled={isRunning}
              className="bg-green-600 hover:bg-green-700"
            >
              {isRunning ? 'Executando...' : 'Iniciar Demo'}
            </Button>
            <Button 
              onClick={resetDemo} 
              variant="outline"
              disabled={isRunning}
            >
              Reiniciar
            </Button>
          </div>

          {/* Progress Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Progresso da Demonstração</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentDemo.steps.map((step, index) => (
                  <div 
                    key={index}
                    className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 ${
                      index <= currentStep 
                        ? 'bg-blue-500/20 border border-blue-400/50' 
                        : 'bg-secondary/20'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index < currentStep 
                        ? 'bg-green-500 text-white' 
                        : index === currentStep && isRunning
                        ? 'bg-blue-500 text-white animate-pulse'
                        : 'bg-secondary text-muted-foreground'
                    }`}>
                      {index < currentStep ? '✓' : index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{step.name}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                    {index === currentStep && isRunning && (
                      <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Live Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Métricas em Tempo Real</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {currentDemo.metrics.map((metric, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border transition-all duration-500 ${
                      currentStep >= index 
                        ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-400/50' 
                        : 'bg-secondary/20 border-border/50'
                    }`}
                  >
                    <div className="text-2xl font-bold text-blue-400 mb-1">
                      {currentStep >= index ? metric.value : '---'}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {metric.label}
                    </div>
                    {currentStep >= index && (
                      <Badge 
                        variant="secondary" 
                        className="text-xs bg-green-500/20 text-green-400 border-green-400/50"
                      >
                        {metric.change}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Project Technologies */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Stack Tecnológico</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge 
                    key={tech} 
                    variant="secondary" 
                    className="bg-secondary/50 hover:bg-blue-500/20 hover:border-blue-400/50 transition-all duration-300"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Results Summary */}
          {currentStep >= currentDemo.steps.length - 1 && !isRunning && (
            <Card className="border-green-400/50 bg-green-500/10">
              <CardHeader>
                <CardTitle className="text-lg text-green-400">Resultados Alcançados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {project.results.map((result, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-sm">{result}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProjectDemo
