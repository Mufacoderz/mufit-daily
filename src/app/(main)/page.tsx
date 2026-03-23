'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'
import { CheckCircle2, Zap, Timer, TrendingUp, Flame, Check, Target, Dumbbell } from 'lucide-react'
import Link from 'next/link'

interface Habit { id: number; name: string; category: string; streak: number; done: boolean; color: string }

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => { if (!loading && !user) router.push('/login') }, [user, loading])

  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: 'Drink 8 glasses of water', category: 'Health', streak: 12, done: false, color: '#3B82F6' },
    { id: 2, name: 'Read 20 minutes', category: 'Mind', streak: 5, done: false, color: '#8B5CF6' },
    { id: 3, name: 'No social media before 9am', category: 'Personal', streak: 3, done: false, color: '#10B981' },
    { id: 4, name: 'Workout', category: 'Fitness', streak: 7, done: false, color: '#F97316' },
  ])

  const toggleHabit = (id: number) => setHabits(h => h.map(x => x.id === id ? { ...x, done: !x.done } : x))
  const completed = habits.filter(h => h.done).length
  const pct = Math.round((completed / habits.length) * 100)

  const stats = [
    { label: 'Habits Today', value: `${completed}/${habits.length}`, icon: CheckCircle2, color: 'text-[#FFD60A]' },
    { label: 'Day Streak', value: '0', icon: Zap, color: 'text-orange-400' },
    { label: 'This Week', value: '0', icon: Timer, color: 'text-blue-400' },
    { label: 'Completion', value: `${pct}%`, icon: TrendingUp, color: 'text-green-400' },
  ]

  const goals = [
    { label: 'Complete 30 habits', current: 12, target: 30 },
    { label: '10-day streak', current: 4, target: 10 },
  ]

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const weekData = [80, 0, 60, 0, 90, 0, 0]
  const todayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1

  if (loading || !user) return null

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-1" style={{ fontFamily: 'var(--font-jakarta)' }}>
          Welcome Back! <span style={{ color: '#FFD60A' }}>&#9889;</span>
        </h1>
        <p className="text-gray-400 text-sm" style={{ fontFamily: 'var(--font-jakarta)' }}>{today}</p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1" style={{ fontFamily: 'var(--font-jakarta)' }}>{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'var(--font-jakarta)' }}>{stat.value}</p>
              </div>
              <stat.icon size={32} className={stat.color} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Today's Habits */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'var(--font-jakarta)' }}>Today's Habits</h2>
            <Link href="/habits" className="text-sm text-gray-400 hover:text-gray-600 transition-colors" style={{ fontFamily: 'var(--font-jakarta)' }}>
              View All
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {habits.map((habit) => (
              <div key={habit.id} onClick={() => toggleHabit(habit.id)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all"
                  style={{ backgroundColor: habit.done ? '#FFD60A' : 'transparent', borderColor: habit.done ? '#FFD60A' : '#D1D5DB' }}>
                  {habit.done && <Check size={12} strokeWidth={3} className="text-gray-800" />}
                </div>
                <div className="flex-1">
                  <p className={`font-medium text-sm transition-all ${habit.done ? 'line-through text-gray-400' : 'text-gray-700'}`}
                    style={{ fontFamily: 'var(--font-jakarta)' }}>{habit.name}</p>
                  <p className="text-xs text-gray-400" style={{ fontFamily: 'var(--font-jakarta)' }}>{habit.category}</p>
                </div>
                <div className="flex items-center gap-1 text-orange-400">
                  <Flame size={12} />
                  <span className="text-xs font-semibold" style={{ fontFamily: 'var(--font-jakarta)' }}>{habit.streak} days</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Workout Studio CTA */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'var(--font-jakarta)' }}>Workout Studio</h2>
            <Dumbbell size={20} className="text-gray-300" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500 mb-1" style={{ fontFamily: 'var(--font-jakarta)' }}>Last Session</p>
              <p className="font-bold text-gray-800" style={{ fontFamily: 'var(--font-jakarta)' }}>Push Day</p>
              <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: 'var(--font-jakarta)' }}>3 days ago · 5 exercises · 20 sets</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'var(--font-jakarta)' }}>6</p>
                <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: 'var(--font-jakarta)' }}>This Month</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'var(--font-jakarta)' }}>48</p>
                <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: 'var(--font-jakarta)' }}>Total Sets</p>
              </div>
            </div>
            <Link href="/studio">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden w-full text-white font-bold py-3 rounded-xl text-sm text-center cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #DC2626 0%, #EA580C 55%, #F59E0B 100%)', boxShadow: '0 4px 16px rgba(220,38,38,0.3)', fontFamily: 'var(--font-jakarta)' }}>
                <span className="relative z-10">Go to Workout Studio</span>
                <div className="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Active Goals */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'var(--font-jakarta)' }}>Active Goals</h2>
            <Target size={20} className="text-[#FFD60A]" />
          </div>
          <div className="flex flex-col gap-4">
            {goals.map(goal => (
              <div key={goal.label}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-jakarta)' }}>{goal.label}</span>
                  <span className="text-sm text-gray-400" style={{ fontFamily: 'var(--font-jakarta)' }}>{goal.current}/{goal.target}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <motion.div initial={{ width: 0 }}
                    animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="h-2 rounded-full"
                    style={{ background: 'linear-gradient(to right, #FFD60A, #FF4500)' }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* This Week */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'var(--font-jakarta)' }}>This Week</h2>
            <Link href="/stats-main" className="text-sm text-gray-400 hover:text-gray-600 transition-colors" style={{ fontFamily: 'var(--font-jakarta)' }}>
              Full Stats
            </Link>
          </div>
          <div className="flex items-end justify-between gap-2 h-28">
            {weekDays.map((day, i) => (
              <div key={day} className="flex flex-col items-center gap-1.5 flex-1">
                <div className="w-full rounded-xl transition-all"
                  style={{
                    height: weekData[i] > 0 ? `${weekData[i] * 0.88}%` : '8%',
                    background: i === todayIdx ? 'linear-gradient(to top, #FFD60A, #F59E0B)' :
                      weekData[i] > 0 ? '#FFD60A60' : '#F3F4F6',
                    boxShadow: i === todayIdx ? '0 4px 12px rgba(255,214,10,0.4)' : 'none',
                    minHeight: '8px'
                  }} />
                <span className="text-[10px] text-gray-400 uppercase" style={{ fontFamily: 'var(--font-jakarta)', fontWeight: 900 }}>{day}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}
