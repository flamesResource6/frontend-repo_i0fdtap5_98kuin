import { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function hashString(str){
  let h = 2166136261
  for(let i=0;i<str.length;i++){
    h ^= str.charCodeAt(i)
    h += (h<<1) + (h<<4) + (h<<7) + (h<<8) + (h<<24)
  }
  return h >>> 0
}

export default function Constellation(){
  const [birthday, setBirthday] = useState('1998-07-12')
  const seed = useMemo(()=>hashString(birthday),[birthday])
  const stars = useMemo(()=>{
    const arr=[]
    let s = seed
    const n = 18
    for(let i=0;i<n;i++){
      s = (1664525 * s + 1013904223) >>> 0
      const x = (s % 1000)/1000
      s = (1664525 * s + 1013904223) >>> 0
      const y = (s % 1000)/1000
      arr.push({ x, y, id: i })
    }
    return arr
  },[seed])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-indigo-900 text-white">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-semibold mb-4">Your Night Sky</h2>
        <p className="text-white/80 mb-6">A constellation generated from your birthday. Hover stars to read a memory.</p>
        <input type="date" value={birthday} onChange={e=>setBirthday(e.target.value)} className="bg-white/10 border border-white/20 rounded px-3 py-2" />
      </div>
      <div className="relative mx-auto max-w-5xl h-[60vh] rounded-3xl border border-white/10 overflow-hidden bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.15),transparent_60%)]">
        {stars.map((s,i)=> (
          <Star key={i} x={s.x} y={s.y} i={i} />
        ))}
      </div>
    </div>
  )
}

function Star({ x, y, i }){
  const messages = [
    'The first time I knew you were magic',
    'The laugh that stayed with me',
    'A quiet walk that meant everything',
    'Your brave heart',
    'Your kindness changed my day',
    'Coffee and sunlight',
    'A rainy window and warm hands',
    'Your favorite song on repeat',
    'A promise: I’m here',
  ]
  const msg = messages[i % messages.length]
  const [hover, setHover] = useState(false)
  return (
    <div className="absolute" style={{ left: `${x*100}%`, top: `${y*100}%` }}>
      <div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} className="relative">
        <span className="block w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]" />
        {hover && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute left-3 top-3 bg-white/10 backdrop-blur px-3 py-2 rounded-xl border border-white/10 text-xs whitespace-nowrap">
            {msg}
          </motion.div>
        )}
      </div>
    </div>
  )
}
