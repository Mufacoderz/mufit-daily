'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'
import { Pencil, Calendar, Bell, Moon, Globe, LogOut, Trash2 } from 'lucide-react'

export default function ProfilePage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => { if (!loading && !user) router.push('/login') }, [user, loading])
  if (loading || !user) return null

  const [form, setForm] = useState({ name: user.name, email: user.email, goal: 4 })
  const [prefs, setPrefs] = useState([
    { label: 'Daily Reminders', desc: 'Get notified about your habits', icon: Bell, enabled: true },
    { label: 'Dark Mode', desc: 'Switch to dark theme', icon: Moon, enabled: false },
    { label: 'Language', desc: 'Bahasa Indonesia', icon: Globe, enabled: true },
  ])

  const togglePref = (i: number) => setPrefs(p => p.map((x, idx) => idx === i ? { ...x, enabled: !x.enabled } : x))

  const handleLogout = () => { logout(); router.push('/login') }

  const inputStyle = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none transition-colors"

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800" style={{ fontFamily: 'var(--font-jakarta)' }}>Profile</h1>
        <p className="text-gray-400 text-sm mt-1" style={{ fontFamily: 'var(--font-jakarta)' }}>Manage your account & preferences</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center" style={{ background: '#FFD60A' }}>
              <span className="text-3xl font-extrabold text-gray-800" style={{ fontFamily: 'var(--font-jakarta)' }}>
                {user.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <button className="absolute -bottom-2 -right-2 bg-white border border-gray-100 rounded-xl p-1.5 shadow-sm hover:bg-gray-50">
              <Pencil size={13} className="text-gray-500" />
            </button>
          </div>
          <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'var(--font-jakarta)' }}>{user.name}</h2>
          <p className="text-gray-400 text-sm mt-0.5" style={{ fontFamily: 'var(--font-jakarta)' }}>{user.email}</p>
          <div className="w-full border-t border-gray-100 my-4" />
          <div className="grid grid-cols-3 gap-3 w-full">
            {[['4', 'Habits'], ['12', 'Best Streak'], ['89', 'Total Done']].map(([v, l]) => (
              <div key={l} className={l !== 'Habits' ? 'border-x border-gray-100' : ''}>
                <p className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'var(--font-jakarta)' }}>{v}</p>
                <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: 'var(--font-jakarta)' }}>{l}</p>
              </div>
            ))}
          </div>
          <div className="w-full border-t border-gray-100 my-4" />
          <div className="flex items-center gap-2 text-gray-400 text-sm" style={{ fontFamily: 'var(--font-jakarta)' }}>
            <Calendar size={14} />
            <span>Member since March 2026</span>
          </div>
        </motion.div>

        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Edit Profile */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-gray-800 mb-4" style={{ fontFamily: 'var(--font-jakarta)' }}>Edit Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500 mb-1.5 block" style={{ fontFamily: 'var(--font-jakarta)' }}>Full Name</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputStyle}
                  style={{ fontFamily: 'var(--font-jakarta)' }}
                  onFocus={e => e.target.style.borderColor = '#FFD60A'} onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 mb-1.5 block" style={{ fontFamily: 'var(--font-jakarta)' }}>Email</label>
                <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputStyle}
                  style={{ fontFamily: 'var(--font-jakarta)' }}
                  onFocus={e => e.target.style.borderColor = '#FFD60A'} onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-500 mb-1.5 block" style={{ fontFamily: 'var(--font-jakarta)' }}>Daily Habit Goal</label>
                <div className="flex gap-2">
                  {[3, 4, 5, 6, 7, 8].map(n => (
                    <button key={n} onClick={() => setForm({ ...form, goal: n })}
                      className="flex-1 py-2 rounded-xl text-sm font-medium transition-all"
                      style={{ fontFamily: 'var(--font-jakarta)', background: form.goal === n ? '#FFD60A' : '#F9FAFB', color: form.goal === n ? '#1f2937' : '#9CA3AF' }}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button className="mt-4 font-semibold px-5 py-2.5 rounded-xl text-sm text-gray-800 active:scale-95 transition-all"
              style={{ background: '#FFD60A', fontFamily: 'var(--font-jakarta)' }}>
              Save Changes
            </button>
          </motion.div>

          {/* Preferences */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-gray-800 mb-4" style={{ fontFamily: 'var(--font-jakarta)' }}>Preferences</h3>
            <div className="flex flex-col gap-3">
              {prefs.map((pref, i) => (
                <div key={pref.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center">
                      <pref.icon size={15} className="text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700" style={{ fontFamily: 'var(--font-jakarta)' }}>{pref.label}</p>
                      <p className="text-xs text-gray-400" style={{ fontFamily: 'var(--font-jakarta)' }}>{pref.desc}</p>
                    </div>
                  </div>
                  <button onClick={() => togglePref(i)}
                    className="w-11 h-6 rounded-full transition-all relative"
                    style={{ background: pref.enabled ? '#FFD60A' : '#E5E7EB' }}>
                    <div className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all"
                      style={{ left: pref.enabled ? '22px' : '2px' }} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Account */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-gray-800 mb-4" style={{ fontFamily: 'var(--font-jakarta)' }}>Account</h3>
            <div className="flex flex-wrap gap-3">
              <button onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-all"
                style={{ fontFamily: 'var(--font-jakarta)' }}>
                <LogOut size={15} /> Sign Out
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-100 text-sm text-red-400 hover:bg-red-50 transition-all"
                style={{ fontFamily: 'var(--font-jakarta)' }}>
                <Trash2 size={15} /> Delete Account
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
