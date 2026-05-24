<script setup lang="ts">
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
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&q=90'
  },
  {
    id: 202,
    name: 'CHICKEN PASTRY',
    price: 180,
    image: 'https://images.unsplash.com/photo-1604908177453-7462950a6a3b?w=600&q=90'
  },
  {
    id: 203,
    name: 'LAVA CAKE',
    price: 200,
    image: 'https://images.unsplash.com/photo-1617305855058-336d24456869?w=600&q=90'
  }
]

const fallbacks: Record<number, string> = {
  201: 'https://images.unsplash.com/photo-1509515837298-2c67a3933321?w=600&q=90',
  202: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?w=600&q=90',
  203: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=90'
}

function onImgError(e: Event, id: number): void {
  const img = e.target as HTMLImageElement
  if (fallbacks[id]) img.src = fallbacks[id]
}
</script>

<template>
  <section class="py-24 bg-coffee-beige relative overflow-hidden">

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
        <h2 class="text-4xl font-bold tracking-[0.15em] mb-4"
            style="font-family: 'Playfair Display', Georgia, serif;">
          ONLINE PASTRY AND COFFEE
        </h2>
        <p class="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
          A gallery showcasing fresh pastries, rich coffee, cozy ambiance, and customer moments
          to inspire visitors and highlight our café offerings.
        </p>
      </div>

      <!-- 3 Product Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div
          v-for="pastry in pastries"
          :key="pastry.id"
          class="border-2 border-coffee-mid/20 bg-white/40 group hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
          <!-- Image -->
          <div class="overflow-hidden relative">
            <img
              :src="pastry.image"
              :alt="pastry.name"
              class="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              @error="(e) => onImgError(e, pastry.id)"
            />
            <div class="absolute inset-0 bg-amber-900/0 group-hover:bg-amber-900/10 transition-all duration-300"></div>
          </div>

          <!-- Info -->
          <div class="p-5 text-center bg-white/30">
            <h3 class="font-bold text-xs tracking-[0.25em] mb-3 text-coffee-dark">
              {{ pastry.name }}
            </h3>
            <div class="flex items-center justify-center gap-4">
              <span class="text-gray-700 text-sm font-semibold">LKR {{ pastry.price }}</span>
              <button
                class="text-gray-400 hover:text-amber-600 transition-colors text-xl hover:scale-125 transform"
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
        <a
          href="#"
          class="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] hover:text-amber-700 transition-colors group"
        >
          SEE MORE
          <span class="inline-flex items-center justify-center w-6 h-6 rounded-full border border-current group-hover:bg-amber-700 group-hover:border-amber-700 group-hover:text-white transition-all text-xs">
            →
          </span>
        </a>
      </div>

    </div>
  </section>
</template>