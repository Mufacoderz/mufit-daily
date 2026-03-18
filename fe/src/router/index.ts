import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import StudioLayout from '@/layouts/StudioLayout.vue'

import HomePage from '@/pages/main/HomePage.vue'
import HabitsPage from '@/pages/main/HabitsPage.vue'
import StatsPage from '@/pages/main/StatsPage.vue'
import ProfilePage from '@/pages/main/ProfilePage.vue'

import StudioHome from '@/pages/studio/StudioHome.vue'
import LibraryPage from '@/pages/studio/LibraryPage.vue'
import PlanPage from '@/pages/studio/PlanPage.vue'
import WorkoutPage from '@/pages/studio/WorkoutPage.vue'
import StatsStudioPage from '@/pages/studio/StatsStudioPage.vue'

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            { path: '', component: HomePage },
            { path: 'habits', component: HabitsPage },
            { path: 'stats', component: StatsPage },
            { path: 'profile', component: ProfilePage },
        ],
    },
    {
        path: '/studio',
        component: StudioLayout,
        children: [
            { path: '', component: StudioHome },
            { path: 'library', component: LibraryPage },
            { path: 'plans', component: PlanPage },
            { path: 'workout', component: WorkoutPage },
            { path: 'stats', component: StatsStudioPage },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router