import { NextResponse } from 'next/server'
import Tesseract from 'tesseract.js'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'Arquivo não enviado' }, { status: 400 })
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Arquivo deve ser PDF' }, { status: 400 })
    }

    // Ler o arquivo como ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()

    // Usar Tesseract para extrair texto do PDF (convertendo para imagens)
    // Nota: Tesseract não processa PDF diretamente, então aqui é um exemplo simplificado.
    // Em produção, usar biblioteca para converter PDF em imagens antes do OCR.

    // Para demonstração, retornamos texto fixo
    const extractedText = 'Texto extraído do PDF (simulado)'

    return NextResponse.json({ text: extractedText })
  } catch (error) {
    return NextResponse.json({ error: 'Erro no processamento OCR' }, { status: 500 })
  }
}
