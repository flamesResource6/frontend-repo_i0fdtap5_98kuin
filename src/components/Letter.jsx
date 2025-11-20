import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const fullLetter = `My love,

From the quiet mornings to the starry nights, you've turned ordinary moments into constellations of joy. I cherish your laughter, your light, and the way you make the world feel soft and golden.

Hold this for a heartbeat and let the rest unfold...\n\nBecause there's more to say — more than pages can hold — about the way you are my favorite place in every day.`

export default function Letter(){
  const [text, setText] = useState('')
  const [hidden, setHidden] = useState(["I love how you smile with your eyes.", "I love how brave your heart is.", "I love the way you make ordinary days feel like magic."])
  const [revealed, setRevealed] = useState([])
  const holdTimer = useRef(null)

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      setText(prev => fullLetter.slice(0, i + 1))
      i++
      if (i >= fullLetter.length) clearInterval(id)
    }, 24)
    return () => clearInterval(id)
  }, [])

  const onHoldStart = () => {
    holdTimer.current = setInterval(() => {
      setRevealed(prev => {
        if (hidden.length === 0) return prev
        const next = hidden[0]
        setHidden(h => h.slice(1))
        return [...prev, next]
      })
    }, 900)
  }

  const onHoldEnd = () => {
    clearInterval(holdTimer.current)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-100/30 via-pink-50/20 to-slate-900 text-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl sm:text-4xl font-semibold mb-6">A Letter That Writes Itself</motion.h2>
        <motion.pre initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="whitespace-pre-wrap text-lg sm:text-xl leading-8 bg-white/10 rounded-2xl p-6 border border-white/10 shadow-xl">
          {text}
        </motion.pre>

        <div className="mt-8 flex items-center gap-4">
          <button onMouseDown={onHoldStart} onMouseUp={onHoldEnd} onMouseLeave={onHoldEnd} className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-2.5 shadow">
            Hold to reveal more
          </button>
          <span className="text-white/70 text-sm">Press and hold to unlock hidden lines</span>
        </div>

        <div className="mt-6 space-y-3">
          {revealed.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="bg-white/10 px-4 py-3 rounded-xl border border-white/10">
              {r}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
