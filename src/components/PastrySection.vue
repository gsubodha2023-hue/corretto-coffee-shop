<script setup lang="ts">
import { ref, computed } from 'vue'
import seafoodImg  from '../assets/seafoodPastry.png'
import chickenImg  from '../assets/chickenPastry.png'

interface PastryItem {
  id: number
  name: string
  price: number
  image: string
}

// All 15 pastry items
const allPastries: PastryItem[] = [
  { id: 1,  name: 'SEAFOOD PASTRY',      price: 220, image: seafoodImg },
  { id: 2,  name: 'CHICKEN PASTRY',      price: 180, image: chickenImg },
  { id: 3,  name: 'LAVA CAKE',           price: 200, image: 'https://images.unsplash.com/photo-1617305855058-336d24456869?w=600&q=90' },
  { id: 4,  name: 'CHOCOLATE CROISSANT', price: 160, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=90' },
  { id: 5,  name: 'BLUEBERRY MUFFIN',    price: 140, image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&q=90' },
  { id: 6,  name: 'CINNAMON ROLL',       price: 170, image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600&q=90' },
  { id: 7,  name: 'CHEESE DANISH',       price: 190, image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&q=90' },
  { id: 8,  name: 'APPLE TURNOVER',      price: 175, image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&q=90' },
  { id: 9,  name: 'ÉCLAIR',              price: 195, image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=90' },
  { id: 10, name: 'MACARON',             price: 150, image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=600&q=90' },
  { id: 11, name: 'TIRAMISU',            price: 250, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=90' },
  { id: 12, name: 'BUTTER CROISSANT',    price: 155, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=90' },
  { id: 13, name: 'STRAWBERRY TART',     price: 210, image: 'https://images.unsplash.com/photo-1587248720327-8eb72564be1e?w=600&q=90' },
  { id: 14, name: 'BANANA BREAD',        price: 165, image: 'https://images.unsplash.com/photo-1553830591-2f39e38a013c?w=600&q=90' },
  { id: 15, name: 'CHOCOLATE CAKE',      price: 280, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=90' },
]

// Start showing only 3
const showAll = ref<boolean>(false)

// Computed — show 3 or all 15
const displayedPastries = computed<PastryItem[]>(() =>
  showAll.value ? allPastries : allPastries.slice(0, 3)
)

function toggleShowMore(): void {
  showAll.value = !showAll.value
  // Scroll back to section top when collapsing
  if (!showAll.value) {
    document.getElementById('pastry-section')?.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <section id="pastry-section" class="py-24 relative overflow-hidden transition-colors duration-300
                  bg-coffee-beige dark:bg-gray-800">

    <!-- Left top leaf decoration -->
    <div class="absolute top-4 left-4 opacity-10 pointer-events-none">
      <svg viewBox="0 0 160 160" fill="none" class="w-36">
        <circle cx="12" cy="12" r="5" stroke="#c8a27a" stroke-width="1" fill="none"/>
        <circle cx="22" cy="10" r="4" stroke="#c8a27a" stroke-width="1" fill="none"/>
        <path d="M10 30 Q40 10 80 20 Q120 30 140 80 Q100 60 60 70 Q30 78 10 110 Q5 70 10 30Z"
              stroke="#c8a27a" stroke-width="1.2" fill="none"/>
        <path d="M10 30 Q60 50 140 80" stroke="#c8a27a" stroke-width="0.8" fill="none" opacity="0.6"/>
      </svg>
    </div>

    <!-- Right bottom bean decoration -->
    <div class="absolute bottom-10 right-6 opacity-10 pointer-events-none">
      <svg viewBox="0 0 100 80" fill="none" class="w-28">
        <ellipse cx="30" cy="35" rx="25" ry="15" transform="rotate(-20 30 35)"
                 stroke="#c8a27a" stroke-width="1.5" fill="none"/>
        <path d="M8 28 Q30 38 52 28" stroke="#c8a27a" stroke-width="1" fill="none"/>
        <ellipse cx="72" cy="25" rx="22" ry="13" transform="rotate(15 72 25)"
                 stroke="#c8a27a" stroke-width="1.5" fill="none"/>
        <path d="M52 22 Q72 30 92 22" stroke="#c8a27a" stroke-width="1" fill="none"/>
      </svg>
    </div>

    <div class="max-w-6xl mx-auto px-6 relative z-10">

      <!-- Header -->
      <div class="text-center mb-14">
        <h2 class="text-4xl font-bold tracking-[0.15em] mb-4 transition-colors duration-300
                   text-gray-900 dark:text-white"
            style="font-family:'Playfair Display',Georgia,serif;">
          ONLINE PASTRY AND COFFEE
        </h2>
        <p class="text-sm max-w-2xl mx-auto leading-relaxed transition-colors duration-300
                  text-gray-500 dark:text-gray-400">
          A gallery showcasing fresh pastries, rich coffee, cozy ambiance, and customer moments
          to inspire visitors and highlight our café offerings.
        </p>
      </div>

      <!-- Product Cards Grid -->
      <!-- Shows 3 columns when collapsed, 3 columns when expanded (4 rows = 12 new + 3 original = 15) -->
      <div
        class="grid gap-6 mb-10 transition-all duration-500"
        :class="showAll ? 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5' : 'grid-cols-1 md:grid-cols-3'"
      >
        <Transition
          v-for="pastry in displayedPastries"
          :key="pastry.id"
          name="card-fade"
          appear
        >
          <div
            class="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2
                   border-coffee-mid/20 dark:border-gray-600
                   bg-white/40 dark:bg-gray-700/50"
          >
            <!-- Image -->
            <div class="overflow-hidden relative">
              <img
                :src="pastry.image"
                :alt="pastry.name"
                class="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                :class="showAll ? 'h-40' : 'h-60'"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-amber-900/0 group-hover:bg-amber-900/10 transition-all duration-300"></div>
            </div>

            <!-- Info -->
            <div class="p-4 text-center transition-colors duration-300
                        bg-white/30 dark:bg-gray-700/30">
              <h3 class="font-bold tracking-[0.2em] mb-2 transition-colors duration-300
                         text-coffee-dark dark:text-amber-400"
                  :class="showAll ? 'text-[9px]' : 'text-xs'">
                {{ pastry.name }}
              </h3>
              <div class="flex items-center justify-center gap-3">
                <span class="font-semibold transition-colors duration-300
                             text-gray-700 dark:text-gray-300"
                      :class="showAll ? 'text-xs' : 'text-sm'">
                  LKR {{ pastry.price }}
                </span>
                <button
                  class="hover:scale-125 transition-all text-gray-400 hover:text-amber-600"
                  :class="showAll ? 'text-base' : 'text-xl'"
                  title="Add to cart"
                >🛒</button>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- SEE MORE / SEE LESS Button -->
      <div class="text-center">
        <button
          @click="toggleShowMore"
          class="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] transition-all duration-300 group
                 text-gray-800 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-400"
        >
          {{ showAll ? 'SEE LESS' : 'SEE MORE' }}
          <span
            class="inline-flex items-center justify-center w-6 h-6 rounded-full border border-current text-xs transition-all
                   group-hover:bg-amber-700 group-hover:border-amber-700 group-hover:text-white"
            :class="showAll ? 'rotate-180' : 'rotate-0'"
            style="transition: transform 0.3s ease, background 0.3s ease, border 0.3s ease;"
          >
            →
          </span>
        </button>

        <!-- Item count indicator -->
        <p class="text-xs text-gray-400 dark:text-gray-600 mt-3 tracking-wider">
          Showing {{ displayedPastries.length }} of {{ allPastries.length }} items
        </p>
      </div>

    </div>
  </section>
</template>

<style scoped>
.card-fade-enter-active {
  transition: all 0.4s ease;
}
.card-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
</style>