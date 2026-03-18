<template>
    <div class="min-h-screen bg-[#FAFAFA] flex">

        <!-- Sidebar — desktop only -->
        <aside
            class="hidden md:flex flex-col w-60 fixed top-0 left-0 h-full bg-white border-r border-gray-100 z-50 shadow-sm">
            <!-- Logo -->
            <div class="px-6 py-5 border-b border-gray-100">
                <div class="flex items-center gap-2.5">
                    <div class="bg-[#FFD60A] rounded-xl p-2">
                        <Zap :size="18" class="text-gray-800" fill="#1a1a1a" />
                    </div>
                    <div>
                        <p class="font-bold text-gray-800 text-base leading-tight">Mufit Daily</p>
                        <p class="text-gray-400 text-xs">Your Habit Hub</p>
                    </div>
                </div>
            </div>

            <!-- Nav Items -->
            <nav class="flex flex-col gap-1 px-3 py-4 flex-1">
                <RouterLink v-for="item in navItems" :key="item.path" :to="item.path"
                    class="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium" :class="isActive(item.path)
                        ? 'bg-[#FFD60A] text-gray-800 font-semibold'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'">
                    <component :is="item.icon" :size="18" />
                    <span>{{ item.label }}</span>
                    <span v-if="isActive(item.path)" class="ml-auto w-1.5 h-1.5 rounded-full bg-gray-800" />
                </RouterLink>
            </nav>

            <!-- User Info -->
            <div class="px-4 py-4 border-t border-gray-100">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-[#FFD60A] flex items-center justify-center">
                        <span class="text-xs font-bold text-gray-800">MF</span>
                    </div>
                    <div>
                        <p class="text-sm font-semibold text-gray-800">Muhammad Fadil</p>
                        <p class="text-xs text-gray-400">mf@email.com</p>
                    </div>
                </div>
            </div>
        </aside>

        <!-- Main Content -->
        <div class="flex-1 md:ml-60">
            <main class="pb-24 md:pb-8 min-h-screen">
                <RouterView />
            </main>
        </div>

        <!-- Floating Bottom Nav — mobile only -->
        <div class="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
            <nav class="flex items-center gap-1 bg-white border border-gray-100 rounded-2xl px-3 py-2 shadow-xl">
                <RouterLink v-for="item in navItems" :key="item.path" :to="item.path"
                    class="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all" :class="isActive(item.path)
                        ? 'text-[#FFD60A]'
                        : 'text-gray-400'">
                    <component :is="item.icon" :size="20" :stroke-width="isActive(item.path) ? 2.5 : 1.8" />
                    <span class="text-[10px] font-medium">{{ item.label }}</span>
                </RouterLink>
            </nav>
        </div>

    </div>
</template>

<script setup lang="ts">
import { useRoute, RouterView, RouterLink } from 'vue-router'
import { Home, Dumbbell, BarChart2, User, Zap } from 'lucide-vue-next'

const route = useRoute()

const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/habits', label: 'Habits', icon: Dumbbell },
    { path: '/stats', label: 'Stats', icon: BarChart2 },
    { path: '/profile', label: 'Profile', icon: User },
]

const isActive = (path: string) => {
    if (path === '/') return route.path === '/'
    return route.path.startsWith(path)
}
</script>