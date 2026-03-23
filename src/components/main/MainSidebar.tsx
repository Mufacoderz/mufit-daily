'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Home, Dumbbell, BarChart2, User, Zap, LogOut, Flame } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/habits', icon: Dumbbell, label: 'Habits' },
  { href: '/stats-main', icon: BarChart2, label: 'Stats' },
  { href: '/profile', icon: User, label: 'Profile' },
]

export default function MainSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = () => { logout(); router.push('/login') }

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[240px] bg-white flex-col z-40 border-r border-gray-100 shadow-sm">
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="bg-[#FFD60A] rounded-xl p-2">
            <Zap size={18} className="text-gray-800" fill="#1a1a1a" />
          </div>
          <div>
            <p className="font-bold text-gray-800 text-base leading-tight font-jakarta">Mufit Daily</p>
            <p className="text-gray-400 text-xs font-jakarta">Your Habit Hub</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link key={href} href={href}>
              <motion.div whileHover={{ x: 3 }} whileTap={{ scale: 0.97 }}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer font-jakarta',
                  active ? 'bg-[#FFD60A] text-gray-800' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                )}>
                <Icon size={17} />
                {label}
                {active && <motion.div layoutId="main-active" className="ml-auto w-1.5 h-1.5 rounded-full bg-gray-800" />}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Workout Studio CTA */}
      <div className="px-3 py-3">
        <Link href="/studio">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #DC2626 0%, #EA580C 55%, #F59E0B 100%)' }}>
            <div className="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <Flame size={16} className="text-white relative z-10" />
            <span className="text-white text-sm font-bold relative z-10">Workout Studio</span>
          </motion.div>
        </Link>
      </div>

      <div className="px-3 py-4 border-t border-gray-100 space-y-2">
        <div className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-[#FFD60A] flex items-center justify-center text-gray-800 font-bold text-sm flex-shrink-0">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-gray-800 truncate font-jakarta">{user?.name}</div>
            <div className="text-[10px] text-gray-400 truncate font-jakarta">{user?.email}</div>
          </div>
        </div>
        <motion.button whileTap={{ scale: 0.97 }} onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-400 border border-red-100 bg-red-50 hover:bg-red-100 transition-all font-jakarta">
          <LogOut size={13} /> Sign Out
        </motion.button>
      </div>
    </aside>
  )
}
