<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { HeroSlide } from '../types'

const slides: HeroSlide[] = [
  {
    id: 1,
    title: 'COFFEE HEAVEN',
    description: 'Americano, caramelization saucer roast at seasonal acerbic. Single shot, eu sit galão decaffeinated id barista coffee. Est milk, cream body sit roast as café au lait. Lungo, crema latte, flavour cortado cultivar percolator white americano.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1600&q=90'
  },
  {
    id: 2,
    title: 'BREW PERFECTION',
    description: 'Discover the art of coffee brewing. From bean to cup, we craft every sip with passion and precision. Experience the finest blends sourced from the most renowned coffee farms worldwide.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=90'
  },
  {
    id: 3,
    title: 'PURE ESSENCE',
    description: 'Savor the rich aroma of freshly roasted beans. Our expert baristas bring you the finest coffee experience, crafted with love, expertise, and the highest quality ingredients from around the world.',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600&q=90'
  }
]

const current = ref<number>(0)
let timer: ReturnType<typeof setInterval>

onMounted(() => {
  timer = setInterval(() => {
    current.value = (current.value + 1) % slides.length
  }, 6000)
})

onUnmounted(() => clearInterval(timer))

function goTo(index: number): void {
  current.value = index
}

// ✅ Working SHOP HERE button
function scrollToShop(): void {
  const shopSection = document.getElementById('shop')
  if (shopSection) {
    shopSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <section class="relative h-screen overflow-hidden">

    <!-- Slide Images -->
    <div
      v-for="(slide, idx) in slides"
      :key="slide.id"
      class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
      :class="idx === current ? 'opacity-100' : 'opacity-0'"
    >
      <img
        :src="slide.image"
        :alt="slide.title"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/70"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 h-full flex items-center">
      <div class="max-w-7xl mx-auto px-6 w-full">
        <div class="ml-auto max-w-lg text-white text-center">

          <!-- Retro Badge -->
          <div class="flex justify-center mb-8">
            <div class="border border-white/60 rounded-full w-28 h-28 flex items-center justify-center p-4 text-center">
              <div>
                <div class="text-[9px] tracking-[0.2em] mb-1">RETROBRAND</div>
                <div class="text-xl">☕</div>
                <div class="text-[9px] tracking-[0.15em] mt-1">PREMIUM PRODUCT</div>
              </div>
            </div>
          </div>

          <!-- Headline -->
          <h1
            class="text-5xl md:text-6xl lg:text-7xl font-bold tracking-widest mb-6 leading-tight transition-all duration-700"
            style="font-family: 'Playfair Display', Georgia, serif;"
          >
            {{ slides[current].title }}
          </h1>

          <!-- Description -->
          <p class="text-sm text-gray-300 leading-relaxed mb-10 px-4">
            {{ slides[current].description }}
          </p>

          <!-- ✅ WORKING SHOP HERE BUTTON -->
          <button
            @click="scrollToShop"
            class="relative inline-flex items-center gap-3 border border-white px-12 py-4 text-xs tracking-[0.4em] font-bold
                   overflow-hidden group transition-all duration-300
                   hover:text-black"
          >
            <!-- Hover fill background -->
            <span class="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></span>
            <!-- Button text -->
            <span class="relative z-10 flex items-center gap-3">
              SHOP HERE
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" stroke-width="2"
                   stroke-linecap="round" stroke-linejoin="round"
                   class="group-hover:translate-x-1 transition-transform duration-300">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </button>

        </div>
      </div>
    </div>

    <!-- Dot Indicators -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-10">
      <button
        v-for="(_, idx) in slides"
        :key="idx"
        @click="goTo(idx)"
        class="w-3 h-3 rounded-full border border-white/70 transition-all duration-300"
        :class="idx === current ? 'bg-white scale-110' : 'bg-transparent hover:bg-white/40'"
      />
    </div>

  </section>
</template>