'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'
import { CheckCircle2, Flame, Target, Zap, TrendingUp, AlertCircle } from 'lucide-react'

export default function StatsMainPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => { if (!loading && !user) router.push('/login') }, [user, loading])
  if (loading || !user) return null

  const stats = [
    { label: 'Completion Rate', value: '74%', icon: CheckCircle2, color: '#FFD60A', trend: '+12%' },
    { label: 'Best Streak', value: '12', icon: Flame, color: '#F97316', trend: '0%' },
    { label: 'Total Done', value: '89', icon: Target, color: '#3B82F6', trend: '+8%' },
    { label: 'Active Habits', value: '4', icon: Zap, color: '#10B981', trend: '0%' },
  ]

  const weekly = [
    { day: 'Mon', pct: 80 }, { day: 'Tue', pct: 50 }, { day: 'Wed', pct: 100 },
    { day: 'Thu', pct: 25 }, { day: 'Fri', pct: 75 }, { day: 'Sat', pct: 60 }, { day: 'Sun', pct: 40 },
  ]

  const topHabits = [
    { name: 'Drink 8 glasses of water', rate: 92, streak: 12 },
    { name: 'Workout', rate: 85, streak: 7 },
    { name: 'Read 20 minutes', rate: 71, streak: 5 },
    { name: 'No social media before 9am', rate: 64, streak: 3 },
  ]

  const missed = [
    { name: 'Read 20 minutes', missed: 3 },
    { name: 'No social media before 9am', missed: 2 },
    { name: 'Workout', missed: 1 },
  ]

  const periods = ['This Week', 'This Month', 'This Year']
  const [period, setPeriod] = useState('This Week')

  const heatmap = Array.from({ length: 10 }, () => Array.from({ length: 7 }, () => Math.floor(Math.random() * 4)))

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800" style={{ fontFamily: 'var(--font-jakarta)' }}>Statistics</h1>
        <p className="text-gray-400 text-sm mt-1" style={{ fontFamily: 'var(--font-jakarta)' }}>Track your progress over time</p>
      </motion.div>

      {/* Period filter */}
      <div className="flex gap-2 mb-6">
        {periods.map(p => (
          <button key={p} onClick={() => setPeriod(p)}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{ fontFamily: 'var(--font-jakarta)', background: period === p ? '#FFD60A' : 'white', color: period === p ? '#1f2937' : '#9CA3AF', border: period === p ? 'none' : '1px solid #F3F4F6' }}>
            {p}
          </button>
        ))}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-400" style={{ fontFamily: 'var(--font-jakarta)' }}>{s.label}</p>
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <p className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'var(--font-jakarta)' }}>{s.value}</p>
            <p className={`text-xs mt-1 ${s.trend.startsWith('+') ? 'text-green-400' : 'text-gray-300'}`} style={{ fontFamily: 'var(--font-jakarta)' }}>
              {s.trend} vs last week
            </p>
          </motion.div>
        ))}
      </div>

      {/* Heatmap */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'var(--font-jakarta)' }}>Activity Heatmap</h2>
          <span className="text-xs text-gray-400" style={{ fontFamily: 'var(--font-jakarta)' }}>Last 10 weeks</span>
        </div>
        <div className="flex gap-1 overflow-x-auto pb-2">
          {heatmap.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((day, di) => (
                <div key={di} className="w-4 h-4 rounded-sm"
                  style={{ background: day === 0 ? '#F3F4F6' : day === 1 ? 'rgba(255,214,10,0.3)' : day === 2 ? 'rgba(255,214,10,0.6)' : '#FFD60A' }} />
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xs text-gray-400" style={{ fontFamily: 'var(--font-jakarta)' }}>Less</span>
          {[0.1, 0.3, 0.6, 1].map((o, i) => (
            <div key={i} className="w-4 h-4 rounded-sm" style={{ background: `rgba(255,214,10,${o})` }} />
          ))}
          <span className="text-xs text-gray-400" style={{ fontFamily: 'var(--font-jakarta)' }}>More</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Weekly Chart */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'var(--font-jakarta)' }}>Weekly Completion</h2>
            <TrendingUp size={18} style={{ color: '#FFD60A' }} />
          </div>
          <div className="flex items-end justify-between gap-2 h-36">
            {weekly.map(d => (
              <div key={d.day} className="flex flex-col items-center gap-1.5 flex-1">
                <span className="text-xs text-gray-400" style={{ fontFamily: 'var(--font-jakarta)' }}>{d.pct}%</span>
                <motion.div initial={{ height: 0 }} animate={{ height: `${d.pct}%` }} transition={{ duration: 0.5, delay: 0.5 }}
                  className="w-full rounded-xl" style={{ background: 'linear-gradient(to top, #FFD60A, #F59E0B)', minHeight: 4 }} />
                <span className="text-[10px] text-gray-400 uppercase" style={{ fontFamily: 'var(--font-jakarta)', fontWeight: 900 }}>{d.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Habits */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'var(--font-jakarta)' }}>Top Habits</h2>
            <Flame size={18} className="text-orange-400" />
          </div>
          <div className="flex flex-col gap-3">
            {topHabits.map((h, i) => (
              <div key={h.name} className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-300 w-4" style={{ fontFamily: 'var(--font-jakarta)' }}>{i + 1}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700" style={{ fontFamily: 'var(--font-jakarta)' }}>{h.name}</span>
                    <span className="text-xs text-gray-400" style={{ fontFamily: 'var(--font-jakarta)' }}>{h.rate}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${h.rate}%` }} transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                      className="h-1.5 rounded-full" style={{ background: 'linear-gradient(to right, #FFD60A, #FF4500)' }} />
                  </div>
                </div>
                <div className="flex items-center gap-1 text-orange-400">
                  <Flame size={12} />
                  <span className="text-xs font-semibold" style={{ fontFamily: 'var(--font-jakarta)' }}>{h.streak}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Needs Attention */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'var(--font-jakarta)' }}>Needs Attention</h2>
            <AlertCircle size={18} className="text-red-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {missed.map(m => (
              <div key={m.name} className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                <div className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700" style={{ fontFamily: 'var(--font-jakarta)' }}>{m.name}</p>
                  <p className="text-xs text-red-400 mt-0.5" style={{ fontFamily: 'var(--font-jakarta)' }}>Missed {m.missed}x this week</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
