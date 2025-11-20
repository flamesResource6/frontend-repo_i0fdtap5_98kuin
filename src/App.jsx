import { Routes, Route, Link } from 'react-router-dom'
import Landing from './components/Landing'
import Letter from './components/Letter'
import Timeline from './components/Timeline'
import Constellation from './components/Constellation'

export default function App(){
  return (
    <div className="min-h-screen text-white">
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex gap-3 bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/10">
        <Link to="/" className="px-3 py-1.5 rounded-full hover:bg-white/10">Home</Link>
        <Link to="/letter" className="px-3 py-1.5 rounded-full hover:bg-white/10">Letter</Link>
        <Link to="/timeline" className="px-3 py-1.5 rounded-full hover:bg-white/10">Memories</Link>
        <Link to="/constellation" className="px-3 py-1.5 rounded-full hover:bg-white/10">Constellation</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/letter" element={<Letter/>} />
        <Route path="/timeline" element={<Timeline/>} />
        <Route path="/constellation" element={<Constellation/>} />
      </Routes>
    </div>
  )
}
