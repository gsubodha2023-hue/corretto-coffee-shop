<script setup lang="ts">
interface HeraldItem {
  id: number
  title: string
  description: string
  image: string
  fallback: string
}

const heralds: HeraldItem[] = [
  {
    id: 1,
    title: 'NEW TECHNOLOGY',
    description: 'Smart coffee machines use AI and automation for precise brewing control..',
    image: 'https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?w=500&q=85',
    fallback: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=85'
  },
  {
    id: 2,
    title: 'FRIENDLY STAFF',
    description: 'Friendly staff warmly greet customers and provide excellent service every visit.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&q=85',
    fallback: 'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=500&q=85'
  },
  {
    id: 3,
    title: 'FRESH COFFEE',
    description: 'Fresh coffee is brewed daily, offering rich aroma and delicious taste.',
    image: 'https://images.unsplash.com/photo-1534687941688-651ccaafbff8?w=500&q=85',
    fallback: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=85'
  }
]

function onImgError(e: Event, item: HeraldItem): void {
  const img = e.target as HTMLImageElement
  if (img.src !== item.fallback) {
    img.src = item.fallback
  }
}
</script>

<template>
  <section class="py-24 bg-coffee-beige relative overflow-hidden">

    <!-- Left decorative coffee plant -->
    <div class="absolute top-0 left-0 w-40 h-full opacity-10 pointer-events-none">
      <svg viewBox="0 0 200 700" fill="none" class="w-full h-full">
        <path d="M40 700 Q60 500 80 380 Q100 260 60 120" stroke="#c8a27a" stroke-width="2" fill="none"/>
        <ellipse cx="95" cy="210" rx="45" ry="22" transform="rotate(-30 95 210)" stroke="#c8a27a" stroke-width="1.5" fill="none"/>
        <ellipse cx="72" cy="310" rx="40" ry="20" transform="rotate(20 72 310)" stroke="#c8a27a" stroke-width="1.5" fill="none"/>
        <ellipse cx="98" cy="400" rx="42" ry="21" transform="rotate(-15 98 400)" stroke="#c8a27a" stroke-width="1.5" fill="none"/>
        <circle cx="88" cy="200" r="5" stroke="#c8a27a" stroke-width="1" fill="none"/>
        <circle cx="78" cy="295" r="5" stroke="#c8a27a" stroke-width="1" fill="none"/>
      </svg>
    </div>

    <!-- Right decorative beans -->
    <div class="absolute bottom-10 right-6 opacity-10 pointer-events-none">
      <svg viewBox="0 0 130 100" fill="none" class="w-32">
        <ellipse cx="35" cy="45" rx="28" ry="17" transform="rotate(-20 35 45)" stroke="#c8a27a" stroke-width="1.5" fill="none"/>
        <path d="M12 38 Q35 48 58 38" stroke="#c8a27a" stroke-width="1" fill="none"/>
        <ellipse cx="90" cy="32" rx="25" ry="15" transform="rotate(15 90 32)" stroke="#c8a27a" stroke-width="1.5" fill="none"/>
        <path d="M68 28 Q90 38 112 28" stroke="#c8a27a" stroke-width="1" fill="none"/>
        <ellipse cx="72" cy="72" rx="22" ry="13" transform="rotate(-10 72 72)" stroke="#c8a27a" stroke-width="1.5" fill="none"/>
      </svg>
    </div>

    <div class="max-w-6xl mx-auto px-6 relative z-10">

      <!-- Header -->
      <div class="text-center mb-14">
        <h2 class="text-4xl font-bold tracking-[0.2em] mb-4"
            style="font-family: 'Playfair Display', Georgia, serif;">
          THE COFFEE HERALD
        </h2>
        <p class="text-gray-600 text-sm max-w-xl mx-auto">
          Coffee herald means something that signals or announces coffee — like its aroma, culture,
          or importance in daily life.
        </p>
      </div>

      <!-- 3 Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div
          v-for="item in heralds"
          :key="item.id"
          class="text-center group"
        >
          <!-- Image with border frame -->
          <div class="border-2 border-coffee-mid/30 p-2 mb-5 max-w-[300px] mx-auto overflow-hidden">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              @error="(e) => onImgError(e, item)"
            />
          </div>

          <!-- Title -->
          <h3 class="font-bold text-sm tracking-[0.2em] mb-3 text-coffee-dark">
            {{ item.title }}
          </h3>

          <!-- Description -->
          <p class="text-gray-500 text-sm leading-relaxed mb-5 max-w-xs mx-auto">
            {{ item.description }}
          </p>

          <!-- READ MORE -->
          <a
            href="#"
            class="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] hover:text-amber-700 transition-colors group/btn"
          >
            READ MORE
            <span class="inline-flex items-center justify-center w-6 h-6 rounded-full border border-current bg-coffee-dark text-white group-hover/btn:bg-amber-700 group-hover/btn:border-amber-700 transition-all text-xs">
              →
            </span>
          </a>
        </div>
      </div>

    </div>
  </section>
</template>