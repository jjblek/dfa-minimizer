import { ThemeProvider } from 'next-themes'
import './globals.css'
import { Inter } from 'next/font/google'
import '@xyflow/react/dist/style.css';
import Head from 'next/head';
import Header from './components/header';
import Footer from './components/footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DFA Flow',
  description: 'An interactive tool for designing, editing, and minimizing deterministic finite automata (DFA). Visualize state transitions, minimize automata, and export results effortlessly.',
  // Open Graph for social sharing
  openGraph: {
    url: "https://dfa-flow.vercel.app/",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <Head>
        <title>{metadata.title}</title>
      </Head>
      <body className={inter.className}>
        <ThemeProvider attribute="data-theme">
          <div className='min-h-screen flex flex-col'>
          <Header />
          {children}
          <Footer />
          
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
