import { ThemeProvider } from 'next-themes'
import './globals.css'
import { Inter } from 'next/font/google'
import '@xyflow/react/dist/style.css';
import Header from './components/header';
import Footer from './components/footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DFA Flow',
  description: 'An interactive tool for designing, editing, and minimizing deterministic finite automata (DFA). Visualize state transitions, minimize automata, and export results effortlessly.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="data-theme" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
