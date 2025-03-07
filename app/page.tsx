import ColorProvider from './components/color-provider'
export const metadata = {
  openGraph: {
    url: "https://dfa-flow.vercel.app/",
    type: "article",
  },
}

export default function Home() {

  return (
    <main className="flex-grow">
        <ColorProvider/>
    </main>
  )
}
