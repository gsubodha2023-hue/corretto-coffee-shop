<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCart } from '../composables/useCart'
import type { Product } from '../types'

import guatemalaImg    from '../assets/Amber_Pyramid.jpg'
import ceylonCrestImg  from '../assets/Ceylon_Crest_Coffee.jpeg'
import kandyanImg      from '../assets/Kandyan_Coffee.jpeg'
import lionBrewImg     from '../assets/Lion_Brew.jpeg'
import serendibImg     from '../assets/Serendib_Coffee.jpeg'
import crimsonSavannaImg    from '../assets/Crimson_Savanna.jpg'
import desertMirageImg    from '../assets/Desert_Mirage.jpg'
import goldenLlamaImg    from '../assets/Golden_Llama.jpg'
import jadeHighlandsImg   from '../assets/Jade_Highlands.jpg'
import midnightBloomImg   from '../assets/Midnight_Bloom.jpg'
import obsidianRainforestImg from '../assets/Obsidian_Rainforest.jpg'
import scarletGorillaImg   from '../assets/Scarlet_Gorilla.jpg'
import velvetAndesImg   from '../assets/Velvet_Andes.jpg'
import mistAndArchImg   from '../assets/Mist_&_Arch_Coffee.jpg'

const { addToCart } = useCart()

interface CoffeeProduct {
  id: number
  name: string
  price: number
  origin: string
  country: string
  weight: string
  roast: string
  image: string
  labelColor: string
  delivery: boolean
  tag?: string
}

const coffeeProducts: CoffeeProduct[] = [
  
  // ── 4 Sri Lanka Products (1000g · DELIVERY AVAILABLE) ───────────────────
  {
    id: 110, name: 'CEYLON CREST COFFEE',   price: 8900,
    origin: 'CEYLON',  country: 'SRI LANKA',       weight: '1000g', roast: 'Medium-Dark',
    image: ceylonCrestImg,
    labelColor: '#6B3A2A', delivery: true, tag: 'DELIVERY AVAILABLE'
  },
  {
    id: 111, name: 'KANDY HIGHLAND COFFEE', price: 8500,
    origin: 'CEYLON',     country: 'SRI LANKA',       weight: '1000g', roast: 'Dark',
    image: kandyanImg,
    labelColor: '#4E342E', delivery: true, tag: 'DELIVERY AVAILABLE'
  },
  {
    id: 112, name: 'LION BREW COFFEE',   price: 8200,
    origin: 'CEYLON', country: 'SRI LANKA',    weight: '1000g', roast: 'Light',
    image: lionBrewImg,
    labelColor: '#2E7D32', delivery: true, tag: 'DELIVERY AVAILABLE'
  },
  {
    id: 113, name: 'SERENDIB COFFEE',  price: 8300,
    origin: 'CEYLON',     country: 'SRI LANKA',       weight: '1000g', roast: 'Medium',
    image: serendibImg,
    labelColor: '#1565C0', delivery: true, tag: 'DELIVERY AVAILABLE'
  },
  {
    id: 114, name: 'MIST & ARCH COFFEE',  price: 8300,
    origin: 'CEYLON',     country: 'SRI LANKA',       weight: '1000g', roast: 'Medium',
    image: mistAndArchImg,
    labelColor: '#1565C0', delivery: true, tag: 'DELIVERY AVAILABLE'
  },
  // ── Original 9 products (250g) ──────────────────────────────────────────
  {
    id: 101, name: 'AMBER PYRAMID',   price: 5800,
    origin: 'IMPORTED',   country: 'NORTH AMERICA',  weight: '1000g', roast: 'Medium',
    image: crimsonSavannaImg,
    labelColor: '#4a8a88', delivery: false
  },
  {
    id: 102, name: 'DESERT MIRAGE',   price: 5200,
    origin: 'IMPORTED',   country: 'UNITED KINGDOM', weight: '1000g', roast: 'Dark',
    image: desertMirageImg,
    labelColor: '#3a6848', delivery: false
  },
  {
    id: 103, name: 'GOLDEN LLAMA', price: 6350,
    origin: 'IMPORTED', country: 'AUSTRALIA',       weight: '1000g', roast: 'Medium',
    image: goldenLlamaImg,
    labelColor: '#aa6030', delivery: false
  },
  {
    id: 104, name: 'JADE HIGHLANDS',     price: 6800,
    origin: 'IMPORTED',     country: 'INDIA',           weight: '1000g', roast: 'Dark',
    image: jadeHighlandsImg,
    labelColor: '#6a2040', delivery: false
  },
  {
    id: 105, name: 'AMBER PYRAMID', price: 7200,
    origin: 'IMPORTED', country: 'GUATEMALA',       weight: '1000g', roast: 'Medium-Dark',
    image: guatemalaImg,
    labelColor: '#8B4513', delivery: false
  },
  {
    id: 106, name: 'MIDNIGHT BLOOM',  price: 6950,
    origin: 'IMPORTED',  country: 'ETHIOPIA',        weight: '1000g', roast: 'Light',
    image: midnightBloomImg,
    labelColor: '#5C2A06', delivery: false
  },
  {
    id: 107, name: 'OBSIDIAN RAINFOREST',  price: 6500,
    origin: 'IMPORTED',  country: 'COLOMBIA',        weight: '1000g', roast: 'Medium',
    image: obsidianRainforestImg,
    labelColor: '#1B5E20', delivery: false
  },
  {
    id: 108, name: 'BRAZIL COFFEE',    price: 5600,
    origin: 'IMPORTED',    country: 'BRAZIL',          weight: '1000g', roast: 'Dark',
    image: scarletGorillaImg,
    labelColor: '#F57F17', delivery: false
  },
  {
    id: 109, name: 'VELVET ANDES',     price: 6100,
    origin: 'IMPORTED',     country: 'KENYA',           weight: '1000g', roast: 'Medium',
    image: velvetAndesImg,
    labelColor: '#7F0000', delivery: false
  },

]

// Search
const searchQuery = ref<string>('')

// Filter: all | 250g | 1000g
const activeFilter = ref<string>('all')
const filters = [
  { key: 'all',   label: 'ALL (14)' },
  //{ key: '250g',  label: '☕ 250g' },
  { key: '1000g', label: '🇱🇰 1000g Standard Pack' },
]

// SEE MORE — show 4 first
const INITIAL = 4
const showAll = ref<boolean>(false)

const filteredProducts = computed<CoffeeProduct[]>(() => {
  let list = coffeeProducts
  if (activeFilter.value !== 'all') {
    list = list.filter(p => p.weight === activeFilter.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.origin.toLowerCase().includes(q) ||
      p.country.toLowerCase().includes(q)
    )
  }
  return list
})

const displayedProducts = computed<CoffeeProduct[]>(() =>
  showAll.value ? filteredProducts.value : filteredProducts.value.slice(0, INITIAL)
)

function setFilter(key: string): void {
  activeFilter.value = key
  showAll.value = false
}

function handleSearch(): void {
  showAll.value = false
}

function toggleShowMore(): void {
  showAll.value = !showAll.value
  if (!showAll.value) {
    document.getElementById('online-shop')?.scrollIntoView({ behavior: 'smooth' })
  }
}

// Cart
const addedId = ref<number | null>(null)

function handleAddToCart(product: CoffeeProduct): void {
  const cartProduct: Product = {
    id: product.id,
    title: product.name,
    price: product.price / 320,
    description: `${product.roast} Roast · ${product.weight} · ${product.country}`,
    category: 'coffee-bag',
    thumbnail: product.image,
    images: [product.image],
    rating: 4.8,
    stock: 50,
    brand: product.labelColor,
    discountPercentage: 0
  }
  addToCart(cartProduct)
  addedId.value = product.id
  setTimeout(() => { addedId.value = null }, 1500)
}
</script>

<template>
  <section id="online-shop" class="py-24 relative overflow-hidden transition-colors duration-300
                  bg-coffee-beige dark:bg-gray-800">

    <!-- Left plant decoration -->
    <div class="absolute top-0 left-0 w-44 h-full opacity-10 pointer-events-none">
      <svg viewBox="0 0 200 700" fill="none" class="w-full h-full">
        <path d="M40 700 Q60 500 80 380 Q100 260 60 120" stroke="#c8a27a" stroke-width="2" fill="none"/>
        <ellipse cx="95" cy="210" rx="45" ry="22" transform="rotate(-30 95 210)" stroke="#c8a27a" stroke-width="1.5" fill="none"/>
        <ellipse cx="72" cy="310" rx="40" ry="20" transform="rotate(20 72 310)" stroke="#c8a27a" stroke-width="1.5" fill="none"/>
        <ellipse cx="98" cy="400" rx="42" ry="21" transform="rotate(-15 98 400)" stroke="#c8a27a" stroke-width="1.5" fill="none"/>
        <circle cx="88" cy="200" r="5" stroke="#c8a27a" stroke-width="1" fill="none"/>
        <circle cx="78" cy="295" r="5" stroke="#c8a27a" stroke-width="1" fill="none"/>
      </svg>
    </div>

    <!-- Right beans decoration -->
    <div class="absolute bottom-16 right-6 opacity-10 pointer-events-none">
      <svg viewBox="0 0 130 100" fill="none" class="w-36">
        <ellipse cx="35" cy="45" rx="28" ry="17" transform="rotate(-20 35 45)" stroke="#c8a27a" stroke-width="1.5" fill="none"/>
        <path d="M12 38 Q35 48 58 38" stroke="#c8a27a" stroke-width="1" fill="none"/>
        <ellipse cx="90" cy="32" rx="25" ry="15" transform="rotate(15 90 32)" stroke="#c8a27a" stroke-width="1.5" fill="none"/>
        <path d="M68 28 Q90 38 112 28" stroke="#c8a27a" stroke-width="1" fill="none"/>
      </svg>
    </div>

    <div class="max-w-6xl mx-auto px-6 relative z-10">

      <!-- Header -->
      <div class="text-center mb-10">
        <h2 class="text-4xl font-bold tracking-[0.2em] mb-4 transition-colors duration-300
                   text-gray-900 dark:text-white"
            style="font-family:'Playfair Display',Georgia,serif;">
          ONLINE COFFEE SHOP
        </h2>
        <p class="text-sm max-w-lg mx-auto mb-8 transition-colors duration-300
                  text-gray-500 dark:text-gray-400">
          Welcome to our online coffee shop, your home for fresh, flavorful coffee delivered right to your door.
        </p>

        <!-- 🔍 Search Bar -->
        <div class="flex items-center justify-center gap-3 max-w-md mx-auto mb-6">
          <div class="flex-1 relative">
            <input
              v-model="searchQuery"
              @input="handleSearch"
              type="text"
              placeholder="Search by origin or country..."
              class="w-full pl-10 pr-4 py-2.5 text-sm rounded-full border outline-none transition-all duration-300
                     border-coffee-mid/30 dark:border-gray-600
                     bg-white dark:bg-gray-700
                     text-gray-800 dark:text-white
                     placeholder-gray-400 dark:placeholder-gray-500
                     focus:ring-2 focus:ring-amber-400"
            />
            <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                 width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <button
            v-if="searchQuery"
            @click="searchQuery = ''; showAll = false"
            class="text-xs font-bold tracking-wider px-4 py-2.5 rounded-full border transition-colors
                   border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400
                   hover:border-red-400 hover:text-red-500"
          >
            CLEAR
          </button>
        </div>

        <!-- Filter Tabs -->
        <div class="flex flex-wrap justify-center gap-2 mb-4">
          <button
            v-for="f in filters" :key="f.key"
            @click="setFilter(f.key)"
            class="px-4 py-2 text-xs font-bold tracking-wider rounded-full border transition-all duration-200"
            :class="activeFilter === f.key
              ? 'bg-coffee-dark dark:bg-amber-600 text-white border-coffee-dark scale-105'
              : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-amber-500 hover:text-amber-600'"
          >{{ f.label }}</button>
        </div>

        <!-- Sri Lanka info badge -->
        <div class="flex justify-center gap-2 flex-wrap">
          <span class="text-[9px] font-bold tracking-wider text-white bg-amber-700 px-3 py-1 rounded-full">
            STANDARD QUOALITY COFFEE
          </span>
          <span class="text-[9px] font-bold tracking-wider text-white bg-green-700 px-3 py-1 rounded-full">
            🇱🇰 1000g STANDARD PACK — DELIVERY AVAILABLE
          </span>
        </div>

        <!-- No results -->
        <p v-if="filteredProducts.length === 0"
           class="text-sm text-gray-400 dark:text-gray-600 mt-4 tracking-wider">
          No coffee found for "{{ searchQuery }}"
        </p>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <Transition
          v-for="product in displayedProducts"
          :key="product.id"
          name="card-fade"
          appear
        >
          <div class="text-center group cursor-pointer">

            <!-- Coffee Bag Photo Card -->
            <div
              class="relative mb-4 overflow-hidden rounded-sm border-2 transition-all duration-300
                     border-coffee-mid/20 dark:border-gray-600
                     bg-white dark:bg-gray-700
                     group-hover:shadow-xl group-hover:-translate-y-1"
            >
              <!-- Colored label at top -->
              <div
                class="absolute top-0 left-0 right-0 h-8 flex items-center justify-center z-10"
                :style="`background-color:${product.labelColor}`"
              >
                <span class="text-white text-[10px] font-bold tracking-[0.2em] italic">
                  {{ product.origin }}
                </span>
              </div>

              <!-- Coffee bag photo -->
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500 pt-8"
                loading="lazy"
              />

              <!-- DELIVERY badge for Sri Lanka products -->
              <div v-if="product.delivery"
                   class="absolute top-9 right-2 bg-green-600 text-white text-[8px] font-bold tracking-wider px-2 py-0.5 rounded-sm z-10">
                🚚 DELIVERY
              </div>

              <!-- Roast badge -->
              <div class="absolute bottom-2 right-2 bg-black/50 text-white text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-sm">
                {{ product.roast }}
              </div>

              <!-- Weight badge -->
              <div
                class="absolute bottom-2 left-2 text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-sm"
                :class="product.weight === '1000g'
                  ? 'bg-green-600 text-white'
                  : 'bg-white/80 dark:bg-gray-900/80 text-coffee-dark dark:text-amber-400'"
              >
                {{ product.weight }}
              </div>
            </div>

            <!-- Name -->
            <h3 class="font-bold text-xs tracking-[0.12em] mb-1 transition-colors duration-300
                       text-coffee-dark dark:text-amber-400 leading-tight"
                style="font-family:'Playfair Display',Georgia,serif;">
              {{ product.name }}
            </h3>

            <!-- Country + weight -->
            <p class="text-[10px] tracking-wider mb-2 transition-colors duration-300
                      text-gray-400 dark:text-gray-500">
              {{ product.country }} · {{ product.weight }}
            </p>

            <!-- Price + Cart Button -->
            <div class="flex items-center justify-center gap-3">
              <span class="text-sm font-bold transition-colors duration-300
                           text-gray-700 dark:text-gray-300">
                LKR {{ product.price.toLocaleString() }}
              </span>

              <button
                @click="handleAddToCart(product)"
                :title="`Add ${product.name} to cart`"
                class="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm"
                :class="addedId === product.id
                  ? 'bg-green-500 scale-110'
                  : 'bg-coffee-dark dark:bg-amber-600 hover:bg-amber-600 dark:hover:bg-amber-500 hover:scale-110'"
              >
                <svg v-if="addedId !== product.id"
                     xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                     viewBox="0 0 24 24" fill="none" stroke="white"
                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="9"  cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <svg v-else
                     xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                     viewBox="0 0 24 24" fill="none" stroke="white"
                     stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </button>
            </div>

            <!-- Added confirmation -->
            <Transition name="pop">
              <p v-if="addedId === product.id"
                 class="text-green-500 text-xs font-bold mt-1 tracking-wider">
                ✓ Added to Cart!
              </p>
            </Transition>

          </div>
        </Transition>
      </div>

      <!-- SEE MORE / SEE LESS -->
      <div v-if="filteredProducts.length > INITIAL" class="text-center mt-12">
        <button
          @click="toggleShowMore"
          class="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em]
                 transition-all duration-300 group
                 text-gray-800 dark:text-gray-300
                 hover:text-amber-700 dark:hover:text-amber-400"
        >
          {{ showAll ? 'SEE LESS' : `SEE MORE (${filteredProducts.length - INITIAL} more)` }}
          <span
            class="inline-flex items-center justify-center w-6 h-6 rounded-full border border-current
                   text-xs transition-all
                   group-hover:bg-amber-700 group-hover:border-amber-700 group-hover:text-white"
            :style="showAll ? 'transform:rotate(180deg)' : 'transform:rotate(0deg)'"
          >→</span>
        </button>
        <p class="text-xs text-gray-400 dark:text-gray-600 mt-3 tracking-wider">
          Showing {{ displayedProducts.length }} of {{ filteredProducts.length }} coffees
        </p>
      </div>

    </div>
  </section>
</template>

<style scoped>
.card-fade-enter-active { transition: all 0.4s ease; }
.card-fade-enter-from   { opacity: 0; transform: translateY(20px); }
.pop-enter-active, .pop-leave-active { transition: all 0.3s ease; }
.pop-enter-from, .pop-leave-to { transform: translateY(-5px); opacity: 0; }
</style>