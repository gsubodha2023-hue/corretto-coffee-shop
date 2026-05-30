<script setup lang="ts">
import seafoodImg  from '../assets/seafoodPastry.png'
import chickenImg  from '../assets/chickenPastry.png'

interface PastryItem {
  id: number
  name: string
  price: number
  image: string
}

const pastries: PastryItem[] = [
  {
    id: 201,
    name: 'SEAFOOD PASTRY',
    price: 220,
    image: seafoodImg
  },
  {
    id: 202,
    name: 'CHICKEN PASTRY',
    price: 180,
    image: chickenImg
  },
  {
    id: 203,
    name: 'LAVA CAKE',
    price: 200,
    image: 'https://images.unsplash.com/photo-1617305855058-336d24456869?w=600&q=90'
  }
]
</script>

<template>
  <section class="py-24 relative overflow-hidden transition-colors duration-300
                  bg-coffee-beige dark:bg-gray-800">

    <!-- Left top leaf decoration -->
    <div class="absolute top-4 left-4 opacity-10 pointer-events-none">
      <svg viewBox="0 0 160 160" fill="none" class="w-36">
        <circle cx="12" cy="12" r="5" stroke="#c8a27a" stroke-width="1" fill="none"/>
        <circle cx="22" cy="10" r="4" stroke="#c8a27a" stroke-width="1" fill="none"/>
        <path d="M10 30 Q40 10 80 20 Q120 30 140 80 Q100 60 60 70 Q30 78 10 110 Q5 70 10 30Z"
              stroke="#c8a27a" stroke-width="1.2" fill="none"/>
        <path d="M10 30 Q60 50 140 80" stroke="#c8a27a" stroke-width="0.8" fill="none" opacity="0.6"/>
        <path d="M30 65 Q70 58 120 55" stroke="#c8a27a" stroke-width="0.6" fill="none" opacity="0.5"/>
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

      <!-- 3 Product Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div
          v-for="pastry in pastries"
          :key="pastry.id"
          class="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2
                 border-coffee-mid/20 dark:border-gray-600
                 bg-white/40 dark:bg-gray-700/50"
        >
          <!-- Image -->
          <div class="overflow-hidden relative">
            <img
              :src="pastry.image"
              :alt="pastry.name"
              class="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-amber-900/0 group-hover:bg-amber-900/10 transition-all duration-300"></div>
          </div>

          <!-- Info -->
          <div class="p-5 text-center transition-colors duration-300
                      bg-white/30 dark:bg-gray-700/30">
            <h3 class="font-bold text-xs tracking-[0.25em] mb-3 transition-colors duration-300
                       text-coffee-dark dark:text-amber-400">
              {{ pastry.name }}
            </h3>
            <div class="flex items-center justify-center gap-4">
              <span class="text-sm font-semibold transition-colors duration-300
                           text-gray-700 dark:text-gray-300">
                LKR {{ pastry.price }}
              </span>
              <button
                class="text-xl hover:scale-125 transition-all
                       text-gray-400 dark:text-gray-500 hover:text-amber-600 dark:hover:text-amber-400"
                title="Add to cart"
              >
                🛒
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- SEE MORE -->
      <div class="text-center">
        <a href="#"
           class="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] transition-colors group
                  text-gray-800 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-400">
          SEE MORE
          <span class="inline-flex items-center justify-center w-6 h-6 rounded-full border border-current text-xs
                       group-hover:bg-amber-700 group-hover:border-amber-700 group-hover:text-white transition-all">→</span>
        </a>
      </div>

    </div>
  </section>
</template>