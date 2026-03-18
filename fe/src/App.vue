<template>
  <div class="relative overflow-hidden">
    <div
      v-if="showOverlay"
      class="fixed z-[999] rounded-full pointer-events-none"
      :style="overlayStyle"
    />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'

const showOverlay = ref(false)
const overlayStyle = ref<Record<string, string>>({})

onMounted(() => {
  window.addEventListener('studio-enter', (e: Event) => {
    const { x, y } = (e as CustomEvent).detail

    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    ) * 2

    showOverlay.value = true

    // Start kecil dari posisi tombol
    overlayStyle.value = {
      left: `${x}px`,
      top: `${y}px`,
      width: '0px',
      height: '0px',
      transform: 'translate(-50%, -50%)',
      transition: 'none',
      opacity: '1',
      background: 'radial-gradient(circle, #FF4500 0%, #FF4500 30%, #000000 100%)',
    }

    // Expand ke full layar dalam 500ms
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlayStyle.value = {
          left: `${x}px`,
          top: `${y}px`,
          width: `${maxRadius}px`,
          height: `${maxRadius}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.5s ease-in-out, height 0.5s ease-in-out',
          opacity: '1',
          background: 'radial-gradient(circle, #FF4500 0%, #000000 70%)',
        }
      })
    })

    // Setelah router pindah, fade out overlay
    setTimeout(() => {
      overlayStyle.value = {
        ...overlayStyle.value,
        transition: 'opacity 0.4s ease',
        opacity: '0',
      }
      setTimeout(() => {
        showOverlay.value = false
      }, 400)
    }, 600)
  })
})
</script>