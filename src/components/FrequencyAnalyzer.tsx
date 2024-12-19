import { useState, useEffect } from 'react'

import './FrequencyAnalyzer.css'

const FrequencyAnalyzer = () => {
  const [frequency, setFrequency] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let audioContext: AudioContext
    let analyser: AnalyserNode
    let dataArray: Float32Array
    let source: MediaStreamAudioSourceNode
    let rafId: number

    const startAudioProcessing = async () => {
      try {
        // Request microphone access
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true
        })

        // Initialize Web Audio API components
        audioContext = new AudioContext()
        analyser = audioContext.createAnalyser()
        analyser.fftSize = 2048

        const bufferLength = analyser.frequencyBinCount
        dataArray = new Float32Array(bufferLength)

        source = audioContext.createMediaStreamSource(stream)
        source.connect(analyser)

        const detectFrequency = () => {
          analyser.getFloatFrequencyData(dataArray)

          // Find the peak frequency
          let maxIndex = 0
          for (let i = 1; i < dataArray.length; i++) {
            if (dataArray[i] > dataArray[maxIndex]) {
              maxIndex = i
            }
          }

          const nyquist = audioContext.sampleRate / 2
          const frequencyValue = (maxIndex / bufferLength) * nyquist

          setFrequency(Math.round(frequencyValue))
          rafId = requestAnimationFrame(detectFrequency)
        }

        detectFrequency()
      } catch (err) {
        setError('Microphone access denied or not supported.')
      }
    }

    startAudioProcessing()

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (audioContext) audioContext.close()
    }
  }, [])

  return (
    <div>
      <h1 className="frequency-analyzer-title">
        Microphone Frequency Analyzer
      </h1>
      {error ? (
        <p className="frequency-analyzer-error">{error}</p>
      ) : (
        <p className="frequency-analyzer-text">
          Frequency: {frequency ? `${frequency} Hz` : 'Listening...'}
        </p>
      )}
    </div>
  )
}

export default FrequencyAnalyzer
