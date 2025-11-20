import { useMemo } from 'react'
import { motion } from 'framer-motion'

const memories = [
  { title: 'First Coffee', caption: 'Where it all felt easy', media: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1400&auto=format&fit=crop' },
  { title: 'The Laugh', caption: 'That one you love', media: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1400&auto=format&fit=crop' },
  { title: 'Beach Walk', caption: 'Footprints side by side', media: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop' },
  { title: 'Rainy Day', caption: 'Home is wherever you are', media: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1400&auto=format&fit=crop' },
]

export default function Timeline(){
  const items = useMemo(() => memories, [])
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white">
      <div className="px-6 py-16">
        <h2 className="text-3xl font-semibold mb-6">Our Journey</h2>
      </div>
      <div className="px-6 overflow-x-auto pb-16">
        <div className="flex gap-6 min-w-max">
          {items.map((m, i) => (
            <motion.div key={i} whileHover={{ rotateX: 8, rotateY: -8, scale: 1.03 }} className="w-[320px] h-[420px] bg-white/10 rounded-3xl border border-white/10 overflow-hidden shadow-xl backdrop-blur">
              <div className="h-2 bg-gradient-to-r from-pink-500 to-rose-500" />
              <div className="h-[60%]">
                <img src={m.media} alt={m.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{m.title}</h3>
                <p className="text-white/80">{m.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
