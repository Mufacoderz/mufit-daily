<template>
    <div class="py-6">

        <!-- Greeting -->
        <div class="mb-8">
            <p class="text-white/40 text-sm tracking-widest uppercase">{{ greeting }}</p>
            <h1 class="font-studio text-3xl md:text-6xl text-[#FF4500] tracking-wide leading-tight mt-1">MUHAMMAD FADIL
            </h1>
            <p class="text-white/30 text-sm mt-2">Here's your workout overview for today</p>
        </div>

        <!-- Stat Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div v-for="stat in stats" :key="stat.label"
                class="bg-[#161616] border border-white/10 rounded-2xl p-4 relative overflow-hidden">
                <div class="absolute top-3 right-3 text-white/10">
                    <component :is="stat.icon" :size="28" />
                </div>
                <p class="font-studio text-4xl text-white">{{ stat.value }}</p>
                <p class="text-white/40 text-xs tracking-widest uppercase mt-1">{{ stat.label }}</p>
                <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF4500] to-transparent" />
            </div>
        </div>

        <!-- Main Grid -->
        <div class="grid md:grid-cols-2 gap-4 mb-6">

            <!-- Last Workout -->
            <div class="bg-[#161616] border border-white/10 rounded-2xl p-5">
                <div class="flex items-center justify-between mb-4">
                    <p class="font-studio text-xl tracking-wide text-white">LAST WORKOUT</p>
                    <button @click="goToHistory"
                        class="text-[#FF4500] text-xs tracking-wide flex items-center gap-1 hover:opacity-70 transition-opacity">
                        View All
                        <ChevronRight :size="14" />
                    </button>
                </div>

                <div v-if="lastWorkout">
                    <p class="font-studio text-3xl text-[#FF4500] tracking-wide">{{ lastWorkout.name }}</p>
                    <p class="text-white/30 text-xs mt-1 mb-4">{{ lastWorkout.date }}</p>
                    <div class="flex gap-4">
                        <div class="flex items-center gap-2 text-white/50 text-sm">
                            <Dumbbell :size="14" class="text-[#FF4500]" />
                            <span>{{ lastWorkout.exercises }} exercises</span>
                        </div>
                        <div class="flex items-center gap-2 text-white/50 text-sm">
                            <Layers :size="14" class="text-[#FF4500]" />
                            <span>{{ lastWorkout.sets }} sets</span>
                        </div>
                    </div>
                </div>
                <div v-else class="flex flex-col items-center py-6 gap-2">
                    <ClipboardList :size="32" class="text-white/10" />
                    <p class="text-white/30 text-sm uppercase tracking-widest">No workout yet</p>
                    <p class="text-white/20 text-xs">Start your first session!</p>
                </div>
            </div>

            <!-- Weekly Progress -->
            <div class="bg-[#161616] border border-white/10 rounded-2xl p-5">
                <div class="flex items-center justify-between mb-4">
                    <p class="font-studio text-xl tracking-wide text-white">WEEKLY PROGRESS</p>
                    <button @click="goToStats"
                        class="text-[#FF4500] text-xs tracking-wide flex items-center gap-1 hover:opacity-70 transition-opacity">
                        Full Stats
                        <ChevronRight :size="14" />
                    </button>
                </div>

                <!-- Day Bars -->
                <div class="flex items-end justify-between gap-2 h-24">
                    <div v-for="day in weekDays" :key="day.label" class="flex flex-col items-center gap-1 flex-1">
                        <div class="w-full rounded-md transition-all" :class="day.done ? 'bg-[#FF4500]' : 'bg-white/10'"
                            :style="{ height: day.done ? `${day.height}%` : '20%' }" />
                        <span class="text-white/30 text-[10px] uppercase">{{ day.label }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="mb-6">
            <p class="text-white/40 text-xs tracking-widest uppercase mb-3">Quick Actions</p>
            <div class="flex flex-wrap gap-2">
                <button @click="goToWorkout"
                    class="relative overflow-hidden bg-[#FF4500] text-white text-sm font-semibold px-5 py-2.5 rounded-xl active:scale-95 transition-all shadow-[0_0_20px_rgba(255,69,0,0.4)]">
                    <span class="relative z-10">Start Workout</span>
                    <div
                        class="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </button>
                <button @click="router.push('/studio/plans')"
                    class="bg-[#1A1A1A] border border-white/10 text-white/70 text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-white/10 active:scale-95 transition-all">
                    New Plan
                </button>
                <button @click="router.push('/studio/library')"
                    class="bg-[#1A1A1A] border border-white/10 text-white/70 text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-white/10 active:scale-95 transition-all">
                    + Exercise
                </button>
                <button @click="goToStats"
                    class="bg-[#1A1A1A] border border-white/10 text-white/70 text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-white/10 active:scale-95 transition-all">
                    View Stats
                </button>
            </div>
        </div>

        <!-- Recent Sessions -->
        <div>
            <p class="text-white/40 text-xs tracking-widest uppercase mb-3">Recent Sessions</p>
            <div class="flex flex-col gap-2">
                <div v-for="session in recentSessions" :key="session.id"
                    class="bg-[#161616] border border-white/10 rounded-xl px-5 py-4 flex items-center justify-between hover:border-[#FF4500]/30 transition-all cursor-pointer">
                    <div>
                        <p class="font-studio text-lg text-white tracking-wide">{{ session.name }}</p>
                        <p class="text-white/30 text-xs mt-0.5">{{ session.exercises }} exercises · {{ session.sets }}
                            sets</p>
                    </div>
                    <span class="text-white/20 text-xs">{{ session.date }}</span>
                </div>

                <div v-if="recentSessions.length === 0" class="text-center py-8">
                    <p class="text-white/20 text-sm">No sessions yet</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Flame, Dumbbell, CalendarDays, TrendingUp, ChevronRight, Layers, ClipboardList } from 'lucide-vue-next'

const router = useRouter()

const hour = new Date().getHours()
const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

const stats = ref([
    { label: 'Day Streak', value: '0', icon: Flame },
    { label: 'Exercises', value: '0', icon: Dumbbell },
    { label: 'Workout Days', value: '0', icon: CalendarDays },
    { label: 'Completion', value: '0%', icon: TrendingUp },
])

const lastWorkout = ref({
    name: 'PUSH DAY',
    date: '3 days ago',
    exercises: 5,
    sets: 20,
})

const weekDays = ref([
    { label: 'Mon', done: true, height: 80 },
    { label: 'Tue', done: false, height: 0 },
    { label: 'Wed', done: true, height: 60 },
    { label: 'Thu', done: false, height: 0 },
    { label: 'Fri', done: true, height: 90 },
    { label: 'Sat', done: false, height: 0 },
    { label: 'Sun', done: false, height: 0 },
])

const recentSessions = ref([
    { id: 1, name: 'PUSH DAY', date: '3 days ago', exercises: 5, sets: 20 },
    { id: 2, name: 'LEG DAY', date: '5 days ago', exercises: 4, sets: 16 },
    { id: 3, name: 'PULL DAY', date: '1 week ago', exercises: 5, sets: 18 },
])

const goToWorkout = () => router.push('/studio/workout')
const goToStats = () => router.push('/studio/stats')
const goToHistory = () => router.push('/studio/stats')
</script>