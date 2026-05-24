<script setup lang="ts">
interface Stat {
  value: string
  label: string
}

const stats: Stat[] = [
  { value: '50', label: 'VARIETIES OF COFFEE' },
  { value: '30', label: 'VARIETIES OF PASTRY' },
  { value: '29', label: 'YEAR EXPERIENCE' }
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
      <div class="absolute inset-0 bg-black/75"></div>

      <!-- Centered Badge -->
      <div class="absolute inset-0 flex items-center justify-center text-white text-center">
        <div>
          <div class="border border-white/60 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-3 text-2xl">
            ☕
          </div>
          <div class="font-bold text-2xl tracking-[0.4em]">COFFEE</div>
          <div class="text-xs tracking-[0.3em] text-gray-400 mt-1">ESTD 1997 — FOR EVERYONE</div>
        </div>
      </div>
    </div>

    <!-- Stats Bar -->
    <div class="bg-white py-14">
      <div class="max-w-4xl mx-auto px-6">
        <div class="grid grid-cols-3 divide-x divide-gray-200">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="text-center px-6"
          >
            <div
              class="text-5xl md:text-6xl font-bold text-coffee-dark mb-2"
              style="font-family: 'Playfair Display', Georgia, serif;"
            >
              {{ stat.value }}
            </div>
            <div class="text-[10px] tracking-[0.2em] text-gray-500 font-bold">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>