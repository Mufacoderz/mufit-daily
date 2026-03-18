<template>
    <div class="p-6 max-w-7xl mx-auto">

        <!-- Header -->
        <div v-motion :initial="{ opacity: 0, y: -20 }" :enter="{ opacity: 1, y: 0 }" class="mb-8">
            <h1 class="text-4xl font-extrabold text-gray-800 mb-1">
                Welcome Back! <span class="text-[#FFD60A]">&#9889;</span>
            </h1>
            <p class="text-gray-400">{{ today }}</p>
        </div>

        <!-- Stat Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div v-for="(stat, index) in stats" :key="stat.label" v-motion :initial="{ opacity: 0, y: 20 }"
                :enter="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
                class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-400 mb-1">{{ stat.label }}</p>
                        <p class="text-3xl font-bold text-gray-800">{{ stat.value }}</p>
                    </div>
                    <component :is="stat.icon" :size="32" :class="stat.color" />
                </div>
            </div>
        </div>

        <!-- Main Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

            <!-- Today's Habits -->
            <div v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0, transition: { delay: 400 } }"
                class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-lg font-bold text-gray-800">Today's Habits</h2>
                    <button class="text-sm text-gray-400 hover:text-gray-600 transition-colors">View All</button>
                </div>
                <div class="flex flex-col gap-3">
                    <div v-for="habit in habits" :key="habit.id" @click="toggleHabit(habit.id)"
                        class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                        <div class="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all"
                            :class="habit.done ? 'bg-[#FFD60A] border-[#FFD60A]' : 'border-gray-300'">
                            <Check v-if="habit.done" :size="12" stroke-width="3" class="text-gray-800" />
                        </div>
                        <span class="flex-1 text-sm font-medium transition-all"
                            :class="habit.done ? 'line-through text-gray-400' : 'text-gray-700'">
                            {{ habit.name }}
                        </span>
                        <span class="text-xs text-gray-400 flex items-center gap-1">
                            <Flame :size="12" class="text-orange-400" />
                            {{ habit.streak }} days
                        </span>
                    </div>
                </div>
            </div>

            <!-- Workout Studio CTA -->
            <div v-motion :initial="{ opacity: 0, x: 20 }" :enter="{ opacity: 1, x: 0, transition: { delay: 500 } }"
                class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-lg font-bold text-gray-800">Workout Studio</h2>
                    <Dumbbell :size="20" class="text-gray-300" />
                </div>

                <div class="flex flex-col gap-3">
                    <div class="bg-gray-50 rounded-xl p-4">
                        <p class="text-sm text-gray-500 mb-1">Last Session</p>
                        <p class="font-bold text-gray-800">Push Day</p>
                        <p class="text-xs text-gray-400 mt-0.5">3 days ago · 5 exercises · 20 sets</p>
                    </div>

                    <div class="grid grid-cols-2 gap-2">
                        <div class="bg-gray-50 rounded-xl p-3 text-center">
                            <p class="text-2xl font-bold text-gray-800">6</p>
                            <p class="text-xs text-gray-400 mt-0.5">This Month</p>
                        </div>
                        <div class="bg-gray-50 rounded-xl p-3 text-center">
                            <p class="text-2xl font-bold text-gray-800">48</p>
                            <p class="text-xs text-gray-400 mt-0.5">Total Sets</p>
                        </div>
                    </div>

                    <button @click="goToStudio" data-studio-btn
                        class="relative overflow-hidden w-full bg-[#FF4500] text-white font-semibold py-3 rounded-xl active:scale-95 transition-all shadow-[0_4px_16px_rgba(255,69,0,0.3)]">
                        <span class="relative z-10">Go to Workout Studio</span>
                        <div
                            class="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </button>
                </div>
            </div>

            <!-- Active Goals -->
            <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 600 } }"
                class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-lg font-bold text-gray-800">Active Goals</h2>
                    <Target :size="20" class="text-[#FFD60A]" />
                </div>
                <div class="flex flex-col gap-4">
                    <div v-for="goal in goals" :key="goal.label">
                        <div class="flex justify-between mb-1.5">
                            <span class="text-sm text-gray-700">{{ goal.label }}</span>
                            <span class="text-sm text-gray-400">{{ goal.current }}/{{ goal.target }}</span>
                        </div>
                        <div class="w-full bg-gray-100 rounded-full h-2">
                            <div class="h-2 rounded-full bg-gradient-to-r from-[#FFD60A] to-[#FF4500] transition-all"
                                :style="{ width: `${(goal.current / goal.target) * 100}%` }" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Weekly Stats -->
            <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 700 } }"
                class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-lg font-bold text-gray-800">This Week</h2>
                    <button class="text-sm text-gray-400 hover:text-gray-600 transition-colors">Full Stats</button>
                </div>
                <div class="flex items-end justify-between gap-2 h-28">
                    <div v-for="day in weekDays" :key="day.label" class="flex flex-col items-center gap-1.5 flex-1">
                        <div class="w-full rounded-lg transition-all" :class="day.done ? 'bg-[#FFD60A]' : 'bg-gray-100'"
                            :style="{ height: day.done ? `${day.height}%` : '15%' }" />
                        <span class="text-[10px] text-gray-400 uppercase">{{ day.label }}</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Check, Flame, Dumbbell, Target } from 'lucide-vue-next'
import { CheckCircle2, Zap, Timer, TrendingUp } from 'lucide-vue-next'

const router = useRouter()

const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
})

const stats = ref([
    { label: 'Habits Today', value: '0/4', icon: CheckCircle2, color: 'text-[#FFD60A]' },
    { label: 'Day Streak', value: '0', icon: Zap, color: 'text-orange-400' },
    { label: 'This Week', value: '0', icon: Timer, color: 'text-blue-400' },
    { label: 'Completion', value: '0%', icon: TrendingUp, color: 'text-green-400' },
])

const habits = ref([
    { id: 1, name: 'Drink 8 glasses of water', streak: 12, done: false },
    { id: 2, name: 'Read 20 minutes', streak: 5, done: false },
    { id: 3, name: 'No social media before 9am', streak: 3, done: false },
])

const goals = ref([
    { label: 'Complete 30 habits', current: 12, target: 30 },
    { label: '10-day streak', current: 4, target: 10 },
])

const weekDays = ref([
    { label: 'Mon', done: true, height: 80 },
    { label: 'Tue', done: false, height: 0 },
    { label: 'Wed', done: true, height: 60 },
    { label: 'Thu', done: false, height: 0 },
    { label: 'Fri', done: true, height: 90 },
    { label: 'Sat', done: false, height: 0 },
    { label: 'Sun', done: false, height: 0 },
])

const toggleHabit = (id: number) => {
    const habit = habits.value.find(h => h.id === id)
    if (habit) habit.done = !habit.done
}

const goToStudio = () => {
    const btn = document.querySelector('[data-studio-btn]') as HTMLElement
    const rect = btn?.getBoundingClientRect()
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight - 100

    // Dispatch custom event bawa koordinat tombol
    window.dispatchEvent(new CustomEvent('studio-enter', { detail: { x, y } }))

    // Tunda navigasi 500ms — tunggu circle full layar dulu
    setTimeout(() => {
        router.push('/studio')
    }, 500)
}
</script>