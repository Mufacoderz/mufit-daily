<template>
    <div class="min-h-screen bg-[#FAFAFA]">
        <!-- Content -->
        <main class="pb-20">
            <RouterView />
        </main>

        <!-- Bottom Navigation -->
        <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
            <div class="flex items-center justify-around py-3">
                <RouterLink v-for="item in navItems" :key="item.path" :to="item.path"
                    class="flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all"
                    :class="isActive(item.path) ? 'text-[#FFD60A]' : 'text-gray-400'">
                    <component :is="item.icon" :size="22" :stroke-width="isActive(item.path) ? 2.5 : 1.8" />
                    <span class="text-[11px] font-medium">{{ item.label }}</span>
                </RouterLink>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { useRoute, RouterView, RouterLink } from 'vue-router'
import { Home, Dumbbell, BarChart2, User } from 'lucide-vue-next'

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