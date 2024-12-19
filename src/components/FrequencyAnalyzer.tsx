import { useEffect, useState } from 'react'

import './FrequencyAnalyzer.css'

const FrequencyAnalyzer = () => {
  const [frequency, setFrequency] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let dataArray: Uint8Array
    let requestAnimationFrameId: number
    let audioContext: AudioContext
    const startAudioProcessing = async () => {
      try {
        // Request audio input from the user
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true
        })
        audioContext = new AudioContext()
        const analyser = audioContext.createAnalyser()
        analyser.fftSize = 2048

        const bufferLength = analyser.frequencyBinCount
        dataArray = new Uint8Array(bufferLength)

        const source = audioContext.createMediaStreamSource(stream)
        source.connect(analyser)

        const detectFrequency = () => {
          analyser.getByteFrequencyData(dataArray)
          const max = Math.max(...dataArray)
          const index = dataArray.indexOf(max)
          const frequency = (index * audioContext.sampleRate) / analyser.fftSize
          setFrequency(Math.round(frequency))
          requestAnimationFrameId = requestAnimationFrame(detectFrequency)
        }

        detectFrequency()
      } catch (error) {
        if (error instanceof Error) {
          setError(`${error.message}`)
        } else {
          setError('An unknown error occurred')
        }
      }
    }

    startAudioProcessing()

    return () => {
      if (requestAnimationFrameId) cancelAnimationFrame(requestAnimationFrameId)
      if (audioContext) audioContext.close()
    }
  }, [])

  return (
    <div>
      <p className="frequency-analyzer-title">Micro frequency analyzer</p>
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
