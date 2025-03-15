import './globals.css'
import '@xyflow/react/dist/style.css';
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { ColorProvider } from './components/color-provider';
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
          <ColorProvider>
            <Header/>
            <div className='my-16'>
              {children}
            </div>
            <Footer/>
          </ColorProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}