'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { LogOut, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const titles: Record<string, string> = {
  '/': 'Home',
  '/habits': 'Habits',
  '/stats-main': 'Statistics',
  '/profile': 'Profile',
  '/studio': 'Dashboard',
  '/studio/exercises': 'Exercises',
  '/studio/plans': 'Workout Plans',
  '/studio/checklist': 'Daily Checklist',
  '/studio/stats': 'Statistics',
}

export default function TopBar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const title = titles[pathname] || 'Mufit Daily'
  const isStudio = pathname.startsWith('/studio')
  const [showConfirm, setShowConfirm] = useState(false)

  const handleLogout = () => { logout(); window.location.href = '/login' }

  return (
    <>
      <header className={`md:hidden fixed top-0 left-0 right-0 z-40 h-14 backdrop-blur-xl border-b flex items-center justify-between px-4 ${
        isStudio ? 'bg-stone-950/90 border-stone-800/50' : 'bg-white/90 border-gray-100'
      }`}>
        <div className="flex items-center gap-2.5">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isStudio ? 'bg-fire-grad shadow-fire' : 'bg-[#FFD60A]'}`}>
            <Zap size={13} className={isStudio ? 'text-white' : 'text-gray-800'} />
          </div>
          <div>
            <span className={`font-display text-lg tracking-widest leading-none ${isStudio ? '' : 'text-gray-800'}`}
              style={isStudio ? { background: 'linear-gradient(135deg,#DC2626,#EA580C,#F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } : {}}>
              {isStudio ? 'MUFIT' : 'Mufit Daily'}
            </span>
            <span className={`mx-2 text-xs ${isStudio ? 'text-stone-500' : 'text-gray-300'}`}>·</span>
            <span className={`text-xs font-bold uppercase tracking-wider ${isStudio ? 'text-stone-400' : 'text-gray-400'}`}>{title}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-display text-xs ${isStudio ? 'bg-fire-grad shadow-fire text-white' : 'bg-[#FFD60A] text-gray-800'}`}>
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowConfirm(true)}
            className={`w-7 h-7 flex items-center justify-center rounded-full border transition-all ${
              isStudio ? 'border-stone-700 text-stone-400 hover:text-red-400 hover:border-red-800' : 'border-gray-200 text-gray-400 hover:text-red-400'
            }`}>
            <LogOut size={13} />
          </motion.button>
        </div>
      </header>

      <AnimatePresence>
        {showConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowConfirm(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.88, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }} onClick={e => e.stopPropagation()}
              className="bg-stone-900 border border-stone-700/50 rounded-2xl p-6 w-full max-w-xs text-center shadow-2xl">
              <h3 className="font-display text-2xl tracking-wider text-white mb-1">SIGN OUT?</h3>
              <p className="text-stone-500 text-sm mb-6">Yakin mau keluar dari Mufit Daily?</p>
              <div className="flex gap-3">
                <button onClick={() => setShowConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl border border-stone-700 text-stone-400 text-sm font-bold hover:bg-stone-800 transition-all">
                  Batal
                </button>
                <button onClick={handleLogout}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition-all">
                  Ya, Keluar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
