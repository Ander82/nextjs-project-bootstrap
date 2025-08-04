import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Engenheiro de Software Sênior | Automação RPA & IA',
  description: 'Portfólio profissional de engenheiro de software sênior especializado em desenvolvimento de sistemas, automação RPA, integração de sistemas legados e soluções com IA e LLMs.',
  keywords: 'engenheiro software, automação, RPA, UiPath, Power Automate, integração sistemas, SAP, ERP, IA, LLM, GPT, desenvolvimento backend, APIs, fullstack',
  authors: [{ name: 'Engenheiro de Software Sênior' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Engenheiro de Software Sênior | Automação RPA & IA',
    description: 'Especialista em desenvolvimento, automação de processos e soluções inteligentes com IA',
    type: 'website',
    locale: 'pt_BR',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
