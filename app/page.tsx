import DfaVisualizer from "./components/dfa-visualizer"

export const metadata = {
  openGraph: {
    url: "https://dfa-flow.vercel.app/",
    type: "article",
  },
}

export default function Home() {

  return (
    <main className="">
      <div className='w-full h-[85vh] p-2 sm:p-4 md:p-8'>
          <DfaVisualizer />
      </div>
    </main>
  )
}
