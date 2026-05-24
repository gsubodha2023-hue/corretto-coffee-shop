<script setup lang="ts">
interface HeraldItem {
  id: number
  title: string
  description: string
  image: string
}

const heralds: HeraldItem[] = [
  {
    id: 1,
    title: 'NEW TECHNOLOGY',
    description: 'Smart coffee machines use AI and automation for precise brewing control.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80'
  },
  {
    id: 2,
    title: 'FRIENDLY STAFF',
    description: 'Friendly staff warmly greet customers and provide excellent service every visit.',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=500&q=80'
  },
  {
    id: 3,
    title: 'FRESH COFFEE',
    description: 'Fresh coffee is brewed daily, offering rich aroma and delicious taste.',
    image: 'https://images.unsplash.com/photo-1534687941688-651ccaafbff8?w=500&q=80'
  }
]
</script>

<template>
  <section class="py-24 bg-coffee-beige relative overflow-hidden">
    <!-- Decorative corner elements -->
    <div class="absolute top-0 left-0 w-32 h-32 opacity-10 text-6xl leading-none">🌿</div>
    <div class="absolute bottom-0 right-0 w-32 h-32 opacity-10 text-6xl text-right leading-none">☕</div>

    <div class="max-w-6xl mx-auto px-6 relative z-10">
      <!-- Header -->
      <div class="text-center mb-14">
        <h2 class="text-4xl font-bold tracking-[0.2em] mb-4" style="font-family: 'Playfair Display', Georgia, serif;">
          THE COFFEE HERALD
        </h2>
        <p class="text-gray-600 text-sm max-w-xl mx-auto">
          Coffee herald means something that signals or announces coffee — like its aroma, culture, or importance in daily life.
        </p>
      </div>

      <!-- 3 Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div
          v-for="item in heralds"
          :key="item.id"
          class="text-center group"
        >
          <!-- Image box with border -->
          <div class="border-2 border-coffee-mid/30 p-2 mb-5 max-w-[280px] mx-auto overflow-hidden">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <h3 class="font-bold text-sm tracking-[0.2em] mb-3 text-coffee-dark">
            {{ item.title }}
          </h3>
          <p class="text-gray-500 text-sm leading-relaxed mb-4 max-w-xs mx-auto">
            {{ item.description }}
          </p>
          <a href="#" class="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] hover:text-amber-700 transition-colors">
            READ MORE <span>→</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>