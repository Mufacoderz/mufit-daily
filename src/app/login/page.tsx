'use client'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'
import { Zap, Dumbbell, TrendingUp, Target, Eye, EyeOff, Flame } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const { login } = useAuth()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      const res = await fetch('/api/auth?action=login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) { setError(data.message); return }
      login(data.token, data.user)
      window.location.href = '/'
    } catch { setError('Network error.') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-stone-950 flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-center w-1/2 px-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-stone-950 to-orange-950/30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-fire-grad flex items-center justify-center shadow-fire-lg">
                <Zap size={22} className="text-white" />
              </div>
              <div>
                <div className="font-display text-4xl tracking-widest leading-none"
                  style={{ background: 'linear-gradient(135deg, #DC2626, #EA580C, #F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  MUFIT DAILY
                </div>
                <div className="text-[10px] text-stone-500 tracking-[4px] uppercase">Your Habit Hub</div>
              </div>
            </div>
            <h2 className="font-display text-6xl tracking-wider leading-[0.9] mb-6">
              <span className="text-white">BUILD</span><br />
              <span style={{ background: 'linear-gradient(135deg, #DC2626, #EA580C, #F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>HABITS.</span><br />
              <span className="text-stone-400">TRACK</span><br />
              <span className="text-white">PROGRESS.</span>
            </h2>
            <div className="space-y-4">
              {[
                { icon: Flame, text: 'Daily habit tracking with streaks' },
                { icon: Dumbbell, text: 'Dedicated workout studio' },
                { icon: TrendingUp, text: 'Progress analytics & insights' },
              ].map(({ icon: Icon, text }, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3 text-stone-400">
                  <div className="w-8 h-8 rounded-lg border border-stone-700/50 bg-stone-800/50 flex items-center justify-center">
                    <Icon size={15} className="text-ember-500" />
                  </div>
                  <span className="text-sm font-medium">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-fire-grad flex items-center justify-center shadow-fire">
              <Zap size={16} className="text-white" />
            </div>
            <div className="font-display text-3xl tracking-widest"
              style={{ background: 'linear-gradient(135deg, #DC2626, #EA580C, #F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              MUFIT DAILY
            </div>
          </div>
          <h1 className="font-display text-4xl tracking-wider text-white mb-1">WELCOME BACK</h1>
          <p className="text-stone-500 text-sm mb-8">Log in to continue your journey</p>
          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="bg-red-950/50 border border-red-800/50 text-red-400 text-sm font-semibold px-4 py-3 rounded-xl mb-5">
              ⚠️ {error}
            </motion.div>
          )}
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-xs font-black text-stone-400 uppercase tracking-widest mb-2">Email</label>
              <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full bg-stone-800/60 border border-stone-700/50 rounded-xl px-4 py-3 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-ember-600 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-black text-stone-400 uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} required value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••"
                  className="w-full bg-stone-800/60 border border-stone-700/50 rounded-xl px-4 py-3 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-ember-600 transition-all pr-11" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="w-full bg-fire-grad text-white font-black text-sm py-3.5 rounded-xl shadow-fire disabled:opacity-60 flex items-center justify-center gap-2 mt-2">
              <Zap size={16} /> {loading ? 'LOGGING IN...' : 'LOG IN'}
            </motion.button>
          </form>
          <p className="text-center text-sm text-stone-500 mt-6">
            No account? <Link href="/register" className="text-ember-500 font-bold hover:text-ember-400">Sign up free</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
