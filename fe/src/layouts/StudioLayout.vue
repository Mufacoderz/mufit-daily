<template>
    <div class="min-h-screen bg-[#0A0A0A] text-white flex">

        <!-- Sidebar — desktop only -->
        <aside
            class="hidden md:flex flex-col w-56 fixed top-0 left-0 h-full bg-[#111111] border-r border-white/10 z-50">
            <!-- Logo -->
            <div class="px-6 py-6 border-b border-white/10">
                <div class="flex items-center gap-2">
                    <div class="bg-[#FF4500] rounded-lg p-1.5">
                        <Zap :size="18" fill="white" class="text-white" />
                    </div>
                    <span class="font-studio text-md tracking-widest text-white">Workout Studio</span>
                </div>
            </div>

            <!-- Nav Items -->
            <nav class="flex flex-col gap-1 px-3 py-4 flex-1">
                <RouterLink v-for="item in studioNav" :key="item.path" :to="item.path"
                    class="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium" :class="isActive(item.path)
                        ? 'bg-[#FF4500]/20 text-[#FF4500]'
                        : 'text-white/40 hover:text-white/70 hover:bg-white/5'">
                    <component :is="item.icon" :size="18" />
                    <span>{{ item.label }}</span>
                    <span v-if="isActive(item.path)" class="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF4500]" />
                </RouterLink>
            </nav>

            <!-- Back to Main App -->
            <div class="px-3 py-4 border-t border-white/10">
                <button @click="goBack"
                    class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/5 transition-all w-full text-sm font-medium">
                    <ArrowLeft :size="18" />
                    <span>Main App</span>
                </button>
            </div>
        </aside>

        <!-- Main Content -->
        <div class="flex-1 md:ml-56">

            <!-- Mobile Header -->
            <header class="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A] border-b border-white/10">
                <div class="flex items-center justify-between px-4 py-4">
                    <button @click="goBack" class="flex items-center gap-2 text-white/60">
                        <ArrowLeft :size="20" />
                        <span class="text-sm">Main App</span>
                    </button>
                    <span class="font-studio text-[#FF4500] text-lg tracking-widest">WORKOUT STUDIO</span>
                    <div class="w-20" />
                </div>
            </header>

            <!-- Page Content -->
            <main class="md:pt-6 pt-16 pb-28 md:pb-8 px-4 md:px-8 max-w-5xl mx-auto">
                <RouterView />
            </main>
        </div>

        <!-- Floating Bottom Nav — mobile only -->
        <div class="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
            <nav class="flex items-center gap-1 bg-[#1A1A1A] border border-white/10 rounded-2xl px-3 py-2 shadow-2xl">
                <RouterLink v-for="item in studioNav" :key="item.path" :to="item.path"
                    class="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all" :class="isActive(item.path)
                        ? 'bg-[#FF4500]/20 text-[#FF4500]'
                        : 'text-white/40 hover:text-white/70'">
                    <component :is="item.icon" :size="20" :stroke-width="isActive(item.path) ? 2.5 : 1.8" />
                    <span class="text-[10px] font-medium tracking-wide">{{ item.label }}</span>
                </RouterLink>
            </nav>
        </div>

    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter, RouterView, RouterLink } from 'vue-router'
import { ArrowLeft, Home, Dumbbell, ClipboardList, Zap, BarChart2 } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const studioNav = [
    { path: '/studio', label: 'Home', icon: Home },
    { path: '/studio/library', label: 'Exercises', icon: Dumbbell },
    { path: '/studio/plans', label: 'Plans', icon: ClipboardList },
    { path: '/studio/workout', label: 'Workout', icon: Zap },
    { path: '/studio/stats', label: 'Stats', icon: BarChart2 },
]

const isActive = (path: string) => {
    if (path === '/studio') return route.path === '/studio'
    return route.path.startsWith(path)
}

const goBack = () => router.push('/')
</script>