<template>
    <div class="px-4 pt-6">

        <!-- ===== HOME SECTION ===== -->
        <section>
            <!-- Greeting -->
            <div class="mb-6">
                <p class="text-gray-400 text-sm">{{ greeting }},</p>
                <h1 class="text-2xl font-bold text-gray-800">Fadil</h1>
                <p class="text-gray-400 text-xs mt-1">{{ todayLabel }}</p>
            </div>

            <!-- Progress Ring + Summary -->
            <div class="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-5 mb-4">
                <!-- Ring -->
                <div class="relative w-20 h-20">
                    <svg class="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="32" fill="none" stroke="#F3F4F6" stroke-width="8" />
                        <circle cx="40" cy="40" r="32" fill="none" stroke="#FFD60A" stroke-width="8"
                            stroke-linecap="round" :stroke-dasharray="`${progressCircle} 201`" />
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <span class="text-lg font-bold text-gray-800">{{ completedCount }}/{{ habits.length }}</span>
                    </div>
                </div>

                <!-- Summary -->
                <div>
                    <p class="text-gray-800 font-semibold text-base">
                        {{ completedCount === habits.length ? 'All done! 🎉' : `${habits.length - completedCount} habits
                        left` }}
                    </p>
                    <p class="text-gray-400 text-sm mt-1">{{ completionPercent }}% completed today</p>
                    <div class="flex gap-1 mt-2">
                        <span v-for="habit in habits" :key="habit.id" class="w-2 h-2 rounded-full"
                            :class="habit.completedToday ? 'bg-[#FFD60A]' : 'bg-gray-200'" />
                    </div>
                </div>
            </div>

            <!-- Workout Studio Button -->
            <button @click="goToStudio"
                class="w-full bg-gradient-to-r from-[#FF4500] to-[#FF6B00] text-white rounded-2xl p-4 flex items-center justify-between shadow-md active:scale-95 transition-transform mb-8">
                <div class="flex items-center gap-3">
                    <div class="bg-white/20 rounded-xl p-2">
                        <Dumbbell :size="22" />
                    </div>
                    <div class="text-left">
                        <p class="font-bold text-base">Workout Studio</p>
                        <p class="text-white/70 text-xs">Log your training session</p>
                    </div>
                </div>
                <ChevronRight :size="20" class="text-white/70" />
            </button>
        </section>

        <!-- ===== TODAY SECTION ===== -->
        <section>
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-bold text-gray-800">Today's Habits</h2>
                <span class="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                    {{ completedCount }} done
                </span>
            </div>

            <!-- Habit List -->
            <div class="flex flex-col gap-3 pb-4">
                <div v-for="habit in habits" :key="habit.id" @click="toggleHabit(habit.id)"
                    class="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm active:scale-95 transition-transform cursor-pointer">
                    <!-- Checkbox -->
                    <div class="w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0"
                        :class="habit.completedToday
                            ? 'bg-[#FFD60A] border-[#FFD60A]'
                            : 'border-gray-200'">
                        <Check v-if="habit.completedToday" :size="14" stroke-width="3" class="text-gray-800" />
                    </div>

                    <!-- Info -->
                    <div class="flex-1">
                        <p class="font-semibold text-sm transition-all"
                            :class="habit.completedToday ? 'text-gray-400 line-through' : 'text-gray-800'">
                            {{ habit.name }}
                        </p>
                        <p class="text-xs text-gray-400 mt-0.5">{{ habit.category }}</p>
                    </div>

                    <!-- Streak -->
                    <div class="flex items-center gap-1 text-orange-400">
                        <Flame :size="14" />
                        <span class="text-xs font-semibold">{{ habit.streak }}</span>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-if="habits.length === 0" class="text-center py-10 text-gray-300">
                    <p class="text-4xl mb-2">📋</p>
                    <p class="text-sm">No habits yet. Add one!</p>
                </div>
            </div>
        </section>

    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Dumbbell, ChevronRight, Check, Flame } from 'lucide-vue-next'

const router = useRouter()

// ===== GREETING =====
const hour = new Date().getHours()
const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

const todayLabel = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
})

// ===== DUMMY DATA (nanti diganti API) =====
const habits = ref([
    { id: 1, name: 'Drink 8 glasses of water', category: 'Health', streak: 12, completedToday: false },
    { id: 2, name: 'Read 20 minutes', category: 'Mind', streak: 5, completedToday: false },
    { id: 3, name: 'No social media before 9am', category: 'Personal', streak: 3, completedToday: false },
    { id: 4, name: 'Workout', category: 'Fitness', streak: 7, completedToday: false },
])

// ===== COMPUTED =====
const completedCount = computed(() => habits.value.filter(h => h.completedToday).length)
const completionPercent = computed(() => Math.round((completedCount.value / habits.value.length) * 100) || 0)
const progressCircle = computed(() => (completionPercent.value / 100) * 201)

// ===== METHODS =====
const toggleHabit = (id: number) => {
    const habit = habits.value.find(h => h.id === id)
    if (habit) habit.completedToday = !habit.completedToday
}

const goToStudio = () => {
    router.push('/studio')
}
</script>