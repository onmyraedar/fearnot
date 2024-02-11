import './globals.css'
import { Archivo_Black, Inter } from 'next/font/google'

const archivoBlack = Archivo_Black({ weight: "400", subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FearNot',
  description: 'Conquering anxieties through brave encounters',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={archivoBlack.className}>{children}</body>
    </html>
  )
}
