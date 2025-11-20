import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Spline from '@splinetool/react-spline'

const Typewriter = ({ text, speed = 60 }) => {
  const [display, setDisplay] = useState('')
  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      setDisplay(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])
  return (
    <span>
      {display}
      <span className="inline-block w-2 h-6 bg-white/80 ml-1 animate-pulse align-middle" />
    </span>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  const [portal, setPortal] = useState(false)
  const audioRef = useRef(null)

  const handleBegin = () => {
    try {
      audioRef.current?.play()
    } catch {}
    setPortal(true)
    setTimeout(() => navigate('/letter'), 900)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-rose-300/20 via-pink-100/10 to-slate-900">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/ESO6PnMadasO0hU3/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <audio ref={audioRef} src="https://cdn.pixabay.com/download/audio/2022/03/30/audio_2a2b79b0b6.mp3?filename=romantic-piano-ambient-110397.mp3" preload="auto" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20">
        <div className="max-w-3xl text-center">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-sm tracking-[0.25em] uppercase text-white/80 mb-6">
            A Day Made For You
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="text-4xl sm:text-6xl font-semibold text-white drop-shadow">
            <Typewriter text={"Hi, my love ✨"} speed={50} />
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-6 text-lg sm:text-xl text-white/80">
            Drift into a little world made just for you. Follow the glow.
          </motion.p>

          <motion.button onClick={handleBegin} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} className="mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 shadow-[0_0_30px_rgba(244,114,182,0.5)]">
            Begin the Surprise ✨
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {portal && (
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 30 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: 'easeIn' }} className="pointer-events-none fixed left-1/2 top-1/2 z-50 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 shadow-[0_0_120px_60px_rgba(244,114,182,0.35)]" />
        )}
      </AnimatePresence>

      {/* Hidden voice note */}
      <VoiceNote />

      {/* Soft particles */}
      <Particles />
    </div>
  )
}

function Particles() {
  const particles = Array.from({ length: 40 }, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 6,
    size: 2 + Math.random() * 3,
  }))
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {particles.map((p, i) => (
        <span key={i} className="absolute rounded-full bg-white/60 blur-[1px]" style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size, animation: `float ${6 + p.delay}s ease-in-out ${p.delay}s infinite alternate` }} />
      ))}
      <style>{`@keyframes float{from{transform:translateY(0)}to{transform:translateY(-15px)}}`}</style>
    </div>
  )
}

function VoiceNote(){
  const audio = useRef(null)
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button onClick={() => audio.current?.play()} className="w-9 h-9 rounded-full bg-pink-500/90 text-white shadow-lg hover:shadow-pink-500/50 transition-shadow relative">
        <span className="absolute inset-0 rounded-full ring-2 ring-pink-300/60 animate-ping" />
        <span className="relative">❤</span>
      </button>
      <audio ref={audio} src="https://cdn.pixabay.com/download/audio/2022/03/24/audio_bf0dc127f1.mp3?filename=soft-message-110095.mp3" preload="auto" />
    </div>
  )
}
