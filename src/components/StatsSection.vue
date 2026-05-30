<script setup lang="ts">
import coffeeLogoUrl from '../assets/coffee-logo.png'

interface Stat {
  value: string
  label: string
}

const stats: Stat[] = [
  { value: '50', label: 'VARIETIES OF COFFEE' },
  { value: '30', label: 'VARIETIES OF PASTRY'  },
  { value: '29', label: 'YEAR EXPERIENCE'      }
]
</script>

<template>
  <section>

    <!-- Full-width dark coffee image -->
    <div class="relative h-80 md:h-96 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600&q=80"
        alt="Coffee beans flat lay"
        class="w-full h-full object-cover"
      />
      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-black/75"></div>

      <!-- Coffee Logo Badge -->
      <div class="absolute inset-0 flex items-center justify-center text-white text-center">
        <div class="flex flex-col items-center">
          <img
            :src="coffeeLogoUrl"
            alt="Coffee Logo"
            class="w-44 md:w-52 h-auto object-contain"
          />
        </div>
      </div>
    </div>

    <!-- Stats Bar -->
    <div class="py-14 transition-colors duration-300 bg-white dark:bg-gray-900">
      <div class="max-w-4xl mx-auto px-6">
        <div class="grid grid-cols-3 divide-x transition-colors duration-300
                    divide-gray-200 dark:divide-gray-700">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="text-center px-6 group hover:-translate-y-1 transition-transform duration-300"
          >
            <div
              class="text-5xl md:text-6xl font-bold mb-2 transition-colors duration-300
                     text-coffee-dark dark:text-amber-400"
              style="font-family:'Playfair Display',Georgia,serif;"
            >
              {{ stat.value }}
            </div>
            <div class="text-[10px] tracking-[0.2em] font-bold transition-colors duration-300
                        text-gray-500 dark:text-gray-400">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>