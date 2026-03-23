'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, Flame, X, Check } from 'lucide-react'

const CATEGORIES = ['Health', 'Mind', 'Personal', 'Fitness']
const FREQUENCIES = ['Daily', 'Weekdays', 'Weekends']
const COLORS = ['#FFD60A', '#FF4500', '#3B82F6', '#10B981', '#8B5CF6', '#F43F5E']

interface Habit { id: number; name: string; category: string; frequency: string; streak: number; color: string }

export default function HabitsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: 'Drink 8 glasses of water', category: 'Health', frequency: 'Daily', streak: 12, color: '#3B82F6' },
    { id: 2, name: 'Read 20 minutes', category: 'Mind', frequency: 'Daily', streak: 5, color: '#8B5CF6' },
    { id: 3, name: 'No social media before 9am', category: 'Personal', frequency: 'Daily', streak: 3, color: '#10B981' },
    { id: 4, name: 'Workout', category: 'Fitness', frequency: 'Daily', streak: 7, color: '#FF4500' },
  ])
  const [selectedCat, setSelectedCat] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Habit | null>(null)
  const [form, setForm] = useState({ name: '', category: 'Health', frequency: 'Daily', color: '#FFD60A' })

  useEffect(() => { if (!loading && !user) router.push('/login') }, [user, loading])

  const filtered = selectedCat === 'All' ? habits : habits.filter(h => h.category === selectedCat)

  const openModal = (habit?: Habit) => {
    if (habit) { setEditing(habit); setForm({ name: habit.name, category: habit.category, frequency: habit.frequency, color: habit.color }) }
    else { setEditing(null); setForm({ name: '', category: 'Health', frequency: 'Daily', color: '#FFD60A' }) }
    setModalOpen(true)
  }

  const save = () => {
    if (!form.name.trim()) return
    if (editing) setHabits(h => h.map(x => x.id === editing.id ? { ...x, ...form } : x))
    else setHabits(h => [...h, { id: Date.now(), ...form, streak: 0 }])
    setModalOpen(false)
  }

  if (loading || !user) return null

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800" style={{ fontFamily: 'var(--font-jakarta)' }}>My Habits</h1>
          <p className="text-gray-400 text-sm mt-1" style={{ fontFamily: 'var(--font-jakarta)' }}>Manage your daily habits</p>
        </div>
        <button onClick={() => openModal()}
          className="flex items-center gap-2 text-gray-800 font-semibold px-4 py-2.5 rounded-xl text-sm active:scale-95 transition-all shadow-sm"
          style={{ background: '#FFD60A', fontFamily: 'var(--font-jakarta)' }}>
          <Plus size={18} /> Add Habit
        </button>
      </motion.div>

      {/* Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {['All', ...CATEGORIES].map(cat => (
          <button key={cat} onClick={() => setSelectedCat(cat)}
            className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              fontFamily: 'var(--font-jakarta)',
              background: selectedCat === cat ? '#FFD60A' : 'white',
              color: selectedCat === cat ? '#1f2937' : '#9CA3AF',
              border: selectedCat === cat ? 'none' : '1px solid #F3F4F6'
            }}>
            {cat}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {filtered.map((habit, i) => (
            <motion.div key={habit.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }} exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all">
              <div className="w-1 h-12 rounded-full flex-shrink-0" style={{ backgroundColor: habit.color }} />
              <div className="flex-1">
                <p className="font-semibold text-gray-800" style={{ fontFamily: 'var(--font-jakarta)' }}>{habit.name}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full" style={{ fontFamily: 'var(--font-jakarta)' }}>{habit.category}</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1" style={{ fontFamily: 'var(--font-jakarta)' }}>
                    <Flame size={11} className="text-orange-400" />{habit.streak} day streak
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-400" style={{ fontFamily: 'var(--font-jakarta)' }}>{habit.frequency}</p>
              <div className="flex items-center gap-1">
                <button onClick={() => openModal(habit)} className="p-2 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-all">
                  <Pencil size={15} />
                </button>
                <button onClick={() => setHabits(h => h.filter(x => x.id !== habit.id))}
                  className="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all">
                  <Trash2 size={15} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-2">📋</p>
            <p className="text-gray-400 font-medium" style={{ fontFamily: 'var(--font-jakarta)' }}>No habits yet</p>
            <p className="text-gray-300 text-sm mt-1" style={{ fontFamily: 'var(--font-jakarta)' }}>Tap "Add Habit" to get started</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-white w-full md:max-w-md rounded-t-3xl md:rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'var(--font-jakarta)' }}>
                  {editing ? 'Edit Habit' : 'New Habit'}
                </h2>
                <button onClick={() => setModalOpen(false)} className="p-2 rounded-xl hover:bg-gray-50 text-gray-400">
                  <X size={18} />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1.5 block" style={{ fontFamily: 'var(--font-jakarta)' }}>Habit Name</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Drink 8 glasses of water"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none transition-colors"
                    style={{ fontFamily: 'var(--font-jakarta)' }}
                    onFocus={e => e.target.style.borderColor = '#FFD60A'}
                    onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1.5 block" style={{ fontFamily: 'var(--font-jakarta)' }}>Category</label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(cat => (
                      <button key={cat} onClick={() => setForm({ ...form, category: cat })}
                        className="px-3 py-1.5 rounded-xl text-sm font-medium transition-all"
                        style={{ fontFamily: 'var(--font-jakarta)', background: form.category === cat ? '#FFD60A' : '#F9FAFB', color: form.category === cat ? '#1f2937' : '#9CA3AF' }}>
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1.5 block" style={{ fontFamily: 'var(--font-jakarta)' }}>Frequency</label>
                  <div className="flex gap-2">
                    {FREQUENCIES.map(freq => (
                      <button key={freq} onClick={() => setForm({ ...form, frequency: freq })}
                        className="flex-1 py-2 rounded-xl text-sm font-medium transition-all"
                        style={{ fontFamily: 'var(--font-jakarta)', background: form.frequency === freq ? '#FFD60A' : '#F9FAFB', color: form.frequency === freq ? '#1f2937' : '#9CA3AF' }}>
                        {freq}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1.5 block" style={{ fontFamily: 'var(--font-jakarta)' }}>Color</label>
                  <div className="flex gap-2">
                    {COLORS.map(color => (
                      <button key={color} onClick={() => setForm({ ...form, color })}
                        className="w-8 h-8 rounded-full transition-all"
                        style={{ backgroundColor: color, outline: form.color === color ? `3px solid ${color}` : 'none', outlineOffset: '2px', transform: form.color === color ? 'scale(1.15)' : 'scale(1)' }} />
                    ))}
                  </div>
                </div>

                <button onClick={save} disabled={!form.name.trim()}
                  className="w-full font-semibold py-3 rounded-xl mt-2 text-gray-800 disabled:opacity-40 transition-all active:scale-95"
                  style={{ background: '#FFD60A', fontFamily: 'var(--font-jakarta)' }}>
                  {editing ? 'Save Changes' : 'Add Habit'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
