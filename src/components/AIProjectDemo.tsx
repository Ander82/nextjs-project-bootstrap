'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface AIProjectDemoProps {
  project: {
    title: string
    category: string
    description: string
    technologies: string[]
    capabilities: string[]
    results: string[]
  }
  demoType: 'assistant' | 'ocr' | 'cognitive' | 'predictive' | 'recommendation' | 'orchestrator'
}

const AIProjectDemo = ({ project, demoType }: AIProjectDemoProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [aiResponse, setAiResponse] = useState('')

  const demos = {
    assistant: {
      title: 'Demo: Assistente Virtual Corporativo',
      steps: [
        { name: 'Processamento NLP', description: 'Analisando consulta do usuário com IA' },
        { name: 'Busca Contextual', description: 'Pesquisando informações nos sistemas' },
        { name: 'Geração de Resposta', description: 'Criando resposta personalizada' },
        { name: 'Execução de Ação', description: 'Executando tarefa solicitada' }
      ],
      interactions: [
        { user: 'Qual o status do pedido #12345?', ai: 'O pedido #12345 foi enviado hoje às 14:30 via transportadora XYZ. Previsão de entrega: 2 dias úteis. Deseja o código de rastreamento?' },
        { user: 'Preciso agendar uma reunião para amanhã', ai: 'Verifiquei sua agenda. Tenho os seguintes horários disponíveis amanhã: 10:00, 14:00 e 16:30. Qual prefere? Também preciso saber o tema e participantes.' },
        { user: 'Gere um relatório de vendas do último mês', ai: 'Relatório gerado! Vendas de Janeiro: R$ 1.2M (+15% vs dezembro). Top 3 produtos: Produto A (R$ 340K), Produto B (R$ 280K), Produto C (R$ 190K). Enviando por email.' }
      ],
      metrics: [
        { label: 'Consultas Processadas', value: '2.847', change: '+23%' },
        { label: 'Precisão das Respostas', value: '94.2%', change: '+2.1%' },
        { label: 'Tempo Médio Resposta', value: '1.2s', change: '-0.3s' },
        { label: 'Satisfação Usuários', value: '4.8/5', change: '+0.2' }
      ]
    },
    ocr: {
      title: 'Demo: Sistema de OCR Inteligente',
      steps: [
        { name: 'Pré-processamento', description: 'Otimizando qualidade da imagem' },
        { name: 'Reconhecimento OCR', description: 'Extraindo texto com IA avançada' },
        { name: 'Validação Inteligente', description: 'Verificando consistência dos dados' },
        { name: 'Estruturação', description: 'Organizando dados extraídos' }
      ],
      interactions: [
        { user: 'Documento: Nota Fiscal #001234', ai: 'Extraído: Empresa ABC Ltda, CNPJ: 12.345.678/0001-90, Valor: R$ 1.250,00, Data: 15/01/2024, Produtos: 3 itens identificados' },
        { user: 'Documento: Contrato de Prestação', ai: 'Extraído: Contratante: XYZ Corp, Valor: R$ 50.000,00, Prazo: 12 meses, Início: 01/02/2024, Cláusulas: 15 identificadas' },
        { user: 'Documento: RG Digitalizado', ai: 'Extraído: Nome: João Silva, RG: 12.345.678-9, CPF: 123.456.789-00, Data Nasc: 15/03/1985, Órgão: SSP/SP' }
      ],
      metrics: [
        { label: 'Documentos Processados', value: '15.234', change: '+1.2K' },
        { label: 'Precisão OCR', value: '99.2%', change: '+0.8%' },
        { label: 'Tempo por Documento', value: '2.3s', change: '-1.1s' },
        { label: 'Campos Extraídos', value: '45.678', change: '+3.4K' }
      ]
    },
    cognitive: {
      title: 'Demo: Agente de Automação Cognitiva',
      steps: [
        { name: 'Upload & Análise', description: 'Processando documento PDF com IA' },
        { name: 'Extração de Dados', description: 'OCR inteligente extraindo informações' },
        { name: 'Estruturação', description: 'Organizando dados em formato estruturado' },
        { name: 'Validação & Métricas', description: 'Validando dados e atualizando métricas' }
      ],
      interactions: [
        { user: 'Upload: Nota Fiscal PDF', ai: 'Documento processado! Extraído: Empresa ABC Ltda, CNPJ: 12.345.678/0001-90, Valor: R$ 1.250,00, Data: 15/01/2024, 3 produtos identificados.' },
        { user: 'Upload: Contrato PDF', ai: 'Contrato analisado! Partes: XYZ Corp vs ABC Ltd, Valor: R$ 50.000,00, Prazo: 12 meses, 15 cláusulas identificadas, Status: Válido.' },
        { user: 'Upload: Currículo PDF', ai: 'Perfil extraído! Nome: João Silva, Experiência: 5 anos, Skills: React, Node.js, Python. Score: 8.5/10. Compatibilidade: 92%.' }
      ],
      metrics: [
        { label: 'Documentos Processados', value: '0', change: '+0' },
        { label: 'Campos Extraídos', value: '0', change: '+0' },
        { label: 'Precisão OCR', value: '0%', change: '+0%' },
        { label: 'Tempo de Processamento', value: '0s', change: '+0s' }
      ]
    },
    predictive: {
      title: 'Demo: Plataforma de Análise Preditiva',
      steps: [
        { name: 'Coleta de Dados', description: 'Agregando dados históricos e tempo real' },
        { name: 'Processamento ML', description: 'Modelos de ML analisando padrões' },
        { name: 'Geração de Previsões', description: 'Criando predições precisas' },
        { name: 'Alertas Inteligentes', description: 'Enviando notificações proativas' }
      ],
      interactions: [
        { user: 'Previsão: Demanda Produto A', ai: 'Previsão próximos 30 dias: 2.340 unidades (+15% vs período anterior). Recomendo aumentar estoque em 20%. Confiança: 94%' },
        { user: 'Análise: Risco de Churn', ai: 'Identificados 47 clientes com alto risco de cancelamento. Score médio: 8.2/10. Sugerindo ações de retenção personalizadas.' },
        { user: 'Otimização: Preços Dinâmicos', ai: 'Recomendação de preços para 156 produtos. Aumento médio: 3.2%. Impacto estimado na receita: +R$ 45K/mês.' }
      ],
      metrics: [
        { label: 'Modelos Ativos', value: '23', change: '+5' },
        { label: 'Precisão Média', value: '92.4%', change: '+1.8%' },
        { label: 'Previsões Geradas', value: '12.456', change: '+2.1K' },
        { label: 'Economia Identificada', value: 'R$ 340K', change: '+R$ 45K' }
      ]
    },
    recommendation: {
      title: 'Demo: Sistema de Recomendação Inteligente',
      steps: [
        { name: 'Análise de Padrões', description: 'Identificando comportamentos e preferências' },
        { name: 'Processamento IA', description: 'Algoritmos gerando recomendações' },
        { name: 'Personalização', description: 'Adaptando sugestões ao contexto' },
        { name: 'Otimização Contínua', description: 'Melhorando com feedback' }
      ],
      interactions: [
        { user: 'Usuário: Gerente de Vendas', ai: 'Recomendações: 1) Automatizar relatório semanal (economia: 3h), 2) Integrar CRM com WhatsApp, 3) Dashboard de pipeline em tempo real' },
        { user: 'Usuário: Analista Financeiro', ai: 'Sugestões: 1) Bot para conciliação bancária, 2) Alertas de vencimento automáticos, 3) Análise preditiva de fluxo de caixa' },
        { user: 'Usuário: Diretor de TI', ai: 'Oportunidades: 1) API Gateway para microserviços, 2) Monitoramento inteligente, 3) Backup automatizado com IA' }
      ],
      metrics: [
        { label: 'Recomendações Ativas', value: '1.234', change: '+234' },
        { label: 'Taxa de Adoção', value: '67.8%', change: '+12%' },
        { label: 'Economia Gerada', value: 'R$ 180K', change: '+R$ 30K' },
        { label: 'Satisfação Usuários', value: '4.6/5', change: '+0.3' }
      ]
    },
    orchestrator: {
      title: 'Demo: Orquestrador de Agentes IA',
      steps: [
        { name: 'Análise de Tarefa', description: 'Decomposição inteligente da solicitação' },
        { name: 'Distribuição', description: 'Alocando agentes especializados' },
        { name: 'Coordenação', description: 'Sincronizando execução paralela' },
        { name: 'Consolidação', description: 'Unificando resultados finais' }
      ],
      interactions: [
        { user: 'Tarefa: Análise Completa Cliente', ai: 'Orquestrando: Agente Financeiro (histórico pagamentos), Agente Vendas (comportamento compra), Agente Suporte (tickets). Resultado em 30s.' },
        { user: 'Tarefa: Relatório Executivo', ai: 'Distribuindo: Agente Analytics (métricas), Agente BI (gráficos), Agente Texto (narrativa). Consolidando relatório personalizado.' },
        { user: 'Tarefa: Onboarding Funcionário', ai: 'Coordenando: Agente RH (documentos), Agente TI (acessos), Agente Treinamento (cronograma). Processo completo em 2h.' }
      ],
      metrics: [
        { label: 'Agentes Coordenados', value: '45', change: '+12' },
        { label: 'Tarefas Paralelas', value: '156', change: '+34' },
        { label: 'Eficiência Geral', value: '89.3%', change: '+5.7%' },
        { label: 'Tempo Médio Tarefa', value: '2.1min', change: '-1.3min' }
      ]
    }
  }

  const currentDemo = demos[demoType]
  const [currentInteraction, setCurrentInteraction] = useState(0)

  const runDemo = () => {
    setIsRunning(true)
    setCurrentStep(0)
    setCurrentInteraction(0)
    setAiResponse('')
    
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= currentDemo.steps.length - 1) {
          clearInterval(interval)
          setIsRunning(false)
          // Simular resposta da IA
          setTimeout(() => {
            setAiResponse(currentDemo.interactions[currentInteraction].ai)
          }, 500)
          return prev
        }
        return prev + 1
      })
    }, 1500)
  }

  const nextInteraction = () => {
    if (currentInteraction < currentDemo.interactions.length - 1) {
      setCurrentInteraction(prev => prev + 1)
      setAiResponse('')
      setTimeout(() => {
        setAiResponse(currentDemo.interactions[currentInteraction + 1].ai)
      }, 1000)
    }
  }

  const resetDemo = () => {
    setCurrentStep(0)
    setIsRunning(false)
    setCurrentInteraction(0)
    setAiResponse('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          size="sm"
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          Ver Demo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {currentDemo.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Demo Controls */}
          <div className="flex space-x-4">
            <Button 
              onClick={runDemo} 
              disabled={isRunning}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isRunning ? 'Processando IA...' : 'Iniciar Demo IA'}
            </Button>
            <Button 
              onClick={nextInteraction} 
              variant="outline"
              disabled={isRunning || currentInteraction >= currentDemo.interactions.length - 1}
              className="border-purple-400/50 text-purple-400 hover:bg-purple-400/10"
            >
              Próxima Interação
            </Button>
            <Button 
              onClick={resetDemo} 
              variant="outline"
              disabled={isRunning}
            >
              Reiniciar
            </Button>
          </div>

          {/* AI Processing Steps */}
          <Card className="border-purple-400/20 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
            <CardHeader>
              <CardTitle className="text-lg text-purple-400">Processamento de IA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentDemo.steps.map((step, index) => (
                  <div 
                    key={index}
                    className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 ${
                      index <= currentStep 
                        ? 'bg-purple-500/20 border border-purple-400/50' 
                        : 'bg-secondary/20'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index < currentStep 
                        ? 'bg-green-500 text-white' 
                        : index === currentStep && isRunning
                        ? 'bg-purple-500 text-white animate-pulse'
                        : 'bg-secondary text-muted-foreground'
                    }`}>
                      {index < currentStep ? '✓' : index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{step.name}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                    {index === currentStep && isRunning && (
                      <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Interaction */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-blue-400">Entrada do Usuário</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-400/20">
                  <p className="text-sm">
                    {currentDemo.interactions[currentInteraction].user}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-purple-400">Resposta da IA</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-400/20 min-h-[80px] flex items-center">
                  {aiResponse ? (
                    <p className="text-sm">{aiResponse}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      {isRunning ? 'IA processando...' : 'Execute a demo para ver a resposta'}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-pink-400">Métricas de Performance IA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {currentDemo.metrics.map((metric, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border transition-all duration-500 ${
                      currentStep >= currentDemo.steps.length - 1 && !isRunning
                        ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-400/50' 
                        : 'bg-secondary/20 border-border/50'
                    }`}
                  >
                    <div className="text-2xl font-bold text-purple-400 mb-1">
                      {currentStep >= currentDemo.steps.length - 1 && !isRunning ? metric.value : '---'}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {metric.label}
                    </div>
                    {currentStep >= currentDemo.steps.length - 1 && !isRunning && (
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

          {/* Technologies */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Stack de IA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge 
                    key={tech} 
                    variant="secondary" 
                    className="bg-secondary/50 hover:bg-purple-500/20 hover:border-purple-400/50 transition-all duration-300"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AIProjectDemo
