import { useEffect } from 'react'
import './App.css'
import { useTelegram } from './hooks/useTelegram'
import FrequencyAnalyzer from './components/FrequencyAnalyzer'

const App = () => {
  const tg = useTelegram()

  useEffect(() => {
    tg.requestFullscreen()
  }, [])

  return (
    <div className="app-container">
      <h1 className="app-title">Pitch detector</h1>
      <FrequencyAnalyzer />
    </div>
  )
}

export default App
