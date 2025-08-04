'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface CognitiveAgentDemoProps {
  project: {
    title: string
    category: string
    description: string
    technologies: string[]
    capabilities: string[]
    results: string[]
  }
}

const CognitiveAgentDemo = ({ project }: CognitiveAgentDemoProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [extractedData, setExtractedData] = useState<any>(null)
  const [extractedSummary, setExtractedSummary] = useState<string>('')
  const [processingFile, setProcessingFile] = useState(false)
  const [metrics, setMetrics] = useState({
    documentsProcessed: 0,
    fieldsExtracted: 0,
    ocrAccuracy: 0,
    processingTime: 0
  })

  const steps = [
    { name: 'Upload & Análise', description: 'Processando documento PDF com IA' },
    { name: 'Extração de Dados', description: 'OCR inteligente extraindo informações' },
    { name: 'Estruturação', description: 'Organizando dados em formato estruturado' },
    { name: 'Validação & Métricas', description: 'Validando dados e atualizando métricas' }
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file)
      processFile(file)
    }
  }

  const processFile = async (file: File) => {
    setProcessingFile(true)
    setIsRunning(true)
    setCurrentStep(0)

    try {
      // Criar FormData para enviar o arquivo
      const formData = new FormData()
      formData.append('file', file)

      // Enviar para o endpoint API /api/ocr
      const response = await fetch('/api/ocr', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Erro no processamento OCR')
      }

      const data = await response.json()

      // Atualizar estados com texto extraído real
      setExtractedSummary(data.text || 'Nenhum texto extraído do documento.')
      setExtractedData({ textoExtraido: data.text || '' })

      // Simular etapas de processamento
      const processingSteps = [
        { step: 0, delay: 1000 },
        { step: 1, delay: 2000 },
        { step: 2, delay: 1500 },
        { step: 3, delay: 1000 }
      ]

      for (const { step, delay } of processingSteps) {
        await new Promise(resolve => setTimeout(resolve, delay))
        setCurrentStep(step)
      }

      // Atualizar métricas simuladas
      setMetrics({
        documentsProcessed: 1,
        fieldsExtracted: 6,
        ocrAccuracy: 98.5,
        processingTime: 7.5
      })

    } catch (error) {
      setExtractedSummary('Erro ao processar o documento.')
      setExtractedData(null)
      setMetrics({
        documentsProcessed: 0,
        fieldsExtracted: 0,
        ocrAccuracy: 0,
        processingTime: 0
      })
    } finally {
      setIsRunning(false)
      setProcessingFile(false)
    }
  }

  const resetDemo = () => {
    setCurrentStep(0)
    setIsRunning(false)
    setUploadedFile(null)
    setExtractedData(null)
    setProcessingFile(false)
    setMetrics({
      documentsProcessed: 0,
      fieldsExtracted: 0,
      ocrAccuracy: 0,
      processingTime: 0
    })
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
            Demo: Agente de Automação Cognitiva
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Upload Section */}
          <Card className="border-purple-400/20 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
            <CardHeader>
              <CardTitle className="text-lg text-purple-400">Upload de Documento PDF</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pdf-upload">Selecione um arquivo PDF para processamento</Label>
                <Input
                  id="pdf-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  disabled={processingFile}
                  className="cursor-pointer"
                />
              </div>
              
              {uploadedFile && (
                <>
                  <div className="flex items-center space-x-2 p-3 bg-purple-500/10 rounded-lg">
                    <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center text-white text-sm font-bold">
                      📄
                    </div>
                    <div>
                      <p className="font-semibold">{uploadedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
      <div className="mt-4 p-4 bg-secondary/20 rounded-lg border border-border/50 max-h-40 overflow-y-auto whitespace-pre-wrap text-sm text-muted-foreground">
        {extractedSummary && extractedSummary !== 'Texto extraído do PDF (simulado)' ? extractedSummary : 'O texto extraído do documento aparecerá aqui após o processamento.'}
      </div>
      <div className="mt-4 p-4 bg-secondary/20 rounded-lg border border-border/50 max-h-40 overflow-y-auto text-sm text-muted-foreground">
        {extractedData && extractedData.textoExtraido !== 'Texto extraído do PDF (simulado)' ? (
          <pre>{JSON.stringify(extractedData, null, 2)}</pre>
        ) : (
          <p>Dados estruturados aparecerão aqui após o processamento.</p>
        )}
      </div>
                </>
              )}

              <div className="flex space-x-4">
                <Button 
                  onClick={resetDemo} 
                  variant="outline"
                  disabled={processingFile}
                >
                  Reiniciar Demo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Processing Steps */}
          {uploadedFile && (
            <Card className="border-purple-400/20 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
              <CardHeader>
                <CardTitle className="text-lg text-purple-400">Processamento de IA</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {steps.map((step, index) => (
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
          )}

          {/* Extracted Data */}
          {extractedData && (
            <Card className="border-green-400/20 bg-gradient-to-r from-green-500/5 to-blue-500/5">
              <CardHeader>
                <CardTitle className="text-lg text-green-400">Dados Extraídos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(extractedData).map(([key, value]) => (
                    <div key={key} className="p-3 bg-secondary/20 rounded-lg">
                      <div className="text-sm font-semibold text-blue-400 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {Array.isArray(value) ? value.join(', ') : String(value)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-pink-400">Métricas de Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg border bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-400/50">
                  <div className="text-2xl font-bold text-purple-400 mb-1">
                    {metrics.documentsProcessed}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Documentos Processados
                  </div>
                  {metrics.documentsProcessed > 0 && (
                    <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400 border-green-400/50">
                      +{metrics.documentsProcessed}
                    </Badge>
                  )}
                </div>

                <div className="p-4 rounded-lg border bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-400/50">
                  <div className="text-2xl font-bold text-purple-400 mb-1">
                    {metrics.fieldsExtracted}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Campos Extraídos
                  </div>
                  {metrics.fieldsExtracted > 0 && (
                    <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400 border-green-400/50">
                      +{metrics.fieldsExtracted}
                    </Badge>
                  )}
                </div>

                <div className="p-4 rounded-lg border bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-400/50">
                  <div className="text-2xl font-bold text-purple-400 mb-1">
                    {metrics.ocrAccuracy > 0 ? `${metrics.ocrAccuracy}%` : '0%'}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Precisão OCR
                  </div>
                  {metrics.ocrAccuracy > 0 && (
                    <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400 border-green-400/50">
                      +{metrics.ocrAccuracy}%
                    </Badge>
                  )}
                </div>

                <div className="p-4 rounded-lg border bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-400/50">
                  <div className="text-2xl font-bold text-purple-400 mb-1">
                    {metrics.processingTime > 0 ? `${metrics.processingTime}s` : '0s'}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Tempo de Processamento
                  </div>
                  {metrics.processingTime > 0 && (
                    <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400 border-green-400/50">
                      {metrics.processingTime}s
                    </Badge>
                  )}
                </div>
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

export default CognitiveAgentDemo
