import DfaVisualizer from './components/dfa-visualizer'

export default function Home() {
  return (
    <main className="flex-grow">
      <div className='w-full h-[85vh] p-2 sm:p-4 md:p-8'>
        <DfaVisualizer/>
      </div>
    </main>
  )
}
