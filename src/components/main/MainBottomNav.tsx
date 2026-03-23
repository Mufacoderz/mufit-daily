'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Dumbbell, BarChart2, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/habits', icon: Dumbbell, label: 'Habits' },
  { href: '/stats-main', icon: BarChart2, label: 'Stats' },
  { href: '/profile', icon: User, label: 'Profile' },
]

export default function MainBottomNav() {
  const pathname = usePathname()
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4 px-4 pointer-events-none">
      <nav className="pointer-events-auto flex items-center bg-white rounded-[28px] p-1.5 gap-1 shadow-xl border border-gray-100 w-full max-w-sm">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link key={href} href={href} className="flex-1">
              <motion.div whileTap={{ scale: 0.9 }}
                className={cn('flex flex-col items-center justify-center gap-1 py-2.5 rounded-[20px] transition-all',
                  active ? 'bg-[#FFD60A]' : 'hover:bg-gray-50')}>
                <Icon size={19} className={active ? 'text-gray-800' : 'text-gray-400'} />
                <span className={cn('text-[9px] font-black tracking-wider uppercase font-jakarta', active ? 'text-gray-800' : 'text-gray-400')}>
                  {label}
                </span>
              </motion.div>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
