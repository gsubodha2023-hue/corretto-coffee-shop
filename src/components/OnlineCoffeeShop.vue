<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCart } from '../composables/useCart'
import type { Product } from '../types'

// ✅ Your uploaded Guatemala photo — save as Amber_Pyramid.jpg in src/assets/
import guatemalaImg from '../assets/Amber_Pyramid.jpg'

// ✅ Replace these with your own photos when ready:
import americaImg   from '../assets/Crimson_Savanna.jpg'
import englandImg   from '../assets/Desert_Mirage.jpg'
import australiaImg from '../assets/Golden_Llama.jpg'
import indiaImg     from '../assets/Jade_Highlands.jpg'
import ethiopiaImg  from '../assets/Midnight_Bloom.jpg'
import colombiaImg  from '../assets/Obsidian_Rainforest.jpg'
import brazilImg    from '../assets/Scarlet_Gorilla.jpg'
import kenyaImg     from '../assets/Velvet_Andes.jpg'

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
}

const coffeeProducts: CoffeeProduct[] = [
  {
    id: 101, name: 'AMERICA COFFEE',
    price: 5800, origin: 'America', country: 'NORTH AMERICA',
    weight: '250g', roast: 'Medium',
    // Replace with: image: americaImg
    image: americaImg,
    labelColor: '#4a8a88'
  },
  {
    id: 102, name: 'ENGLAND COFFEE',
    price: 5200, origin: 'England', country: 'UNITED KINGDOM',
    weight: '250g', roast: 'Dark',
    image: englandImg,
    labelColor: '#3a6848'
  },
  {
    id: 103, name: 'AUSTRALIA COFFEE',
    price: 5350, origin: 'Australia', country: 'AUSTRALIA',
    weight: '250g', roast: 'Medium',
    // Replace with: image: australiaImg
    image: australiaImg,
    labelColor: '#aa6030'
  },
  {
    id: 104, name: 'INDIA COFFEE',
    price: 4800, origin: 'India', country: 'INDIA',
    weight: '250g', roast: 'Dark',
    // Replace with: image: indiaImg
    image: indiaImg,
    labelColor: '#6a2040'
  },
  {
    id: 105, name: 'GUATEMALA COFFEE',
    price: 6200, origin: 'Guatemala', country: 'GUATEMALA',
    weight: '250g', roast: 'Medium-Dark',
    image: guatemalaImg,             // ✅ Your real photo
    labelColor: '#8B4513'
  },
  {
    id: 106, name: 'ETHIOPIA COFFEE',
    price: 5950, origin: 'Ethiopia', country: 'ETHIOPIA',
    weight: '250g', roast: 'Light',
    // Replace with: image: ethiopiaImg
    image: ethiopiaImg,
    labelColor: '#5C2A06'
  },
  {
    id: 107, name: 'COLOMBIA COFFEE',
    price: 5500, origin: 'Colombia', country: 'COLOMBIA',
    weight: '250g', roast: 'Medium',
    // Replace with: image: colombiaImg
    image: colombiaImg,
    labelColor: '#1B5E20'
  },
  {
    id: 108, name: 'BRAZIL COFFEE',
    price: 4600, origin: 'Brazil', country: 'BRAZIL',
    weight: '250g', roast: 'Dark',
    // Replace with: image: brazilImg
    image: brazilImg,
    labelColor: '#F57F17'
  },
  {
    id: 109, name: 'KENYA COFFEE',
    price: 5100, origin: 'Kenya', country: 'KENYA',
    weight: '250g', roast: 'Medium',
    // Replace with: image: kenyaImg
    image: kenyaImg,
    labelColor: '#7F0000'
  },
]

// 🔍 Search
const searchQuery = ref<string>('')

const filteredProducts = computed<CoffeeProduct[]>(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return coffeeProducts
  return coffeeProducts.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.origin.toLowerCase().includes(q) ||
    p.country.toLowerCase().includes(q) ||
    p.roast.toLowerCase().includes(q)
  )
})

// SEE MORE — show 4 first
const INITIAL = 4
const showAll = ref<boolean>(false)

const displayedProducts = computed<CoffeeProduct[]>(() =>
  showAll.value ? filteredProducts.value : filteredProducts.value.slice(0, INITIAL)
)

function toggleShowMore(): void {
  showAll.value = !showAll.value
  if (!showAll.value) {
    document.getElementById('online-shop')?.scrollIntoView({ behavior: 'smooth' })
  }
}

function clearSearch(): void {
  searchQuery.value = ''
  showAll.value = false
}

// Cart
const addedId = ref<number | null>(null)

function handleAddToCart(product: CoffeeProduct): void {
  const cartProduct: Product = {
    id: product.id,
    title: product.name,
    price: product.price / 320,
    description: `${product.origin} Roasted Coffee – ${product.roast} Roast`,
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
        <div class="flex items-center justify-center gap-3 max-w-md mx-auto">
          <div class="flex-1 relative">
            <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                 width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by origin or country..."
              class="w-full pl-10 pr-4 py-2.5 text-sm rounded-full border outline-none transition-all duration-300
                     border-coffee-mid/30 dark:border-gray-600
                     bg-white dark:bg-gray-700
                     text-gray-800 dark:text-white
                     placeholder-gray-400 dark:placeholder-gray-500
                     focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <button
            v-if="searchQuery"
            @click="clearSearch"
            class="text-xs font-bold tracking-wider px-4 py-2.5 rounded-full border transition-colors
                   border-gray-300 dark:border-gray-600
                   text-gray-500 dark:text-gray-400
                   hover:border-red-400 hover:text-red-500"
          >
            CLEAR
          </button>
        </div>

        <!-- No results -->
        <p v-if="filteredProducts.length === 0"
           class="text-sm text-gray-400 dark:text-gray-600 mt-6 tracking-wider">
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

            <!-- Photo Card -->
            <div
              class="relative mb-4 overflow-hidden transition-all duration-300
                     border-2 border-coffee-mid/20 dark:border-gray-600 rounded-sm
                     bg-white dark:bg-gray-700
                     group-hover:shadow-2xl group-hover:-translate-y-1"
            >
              <!-- Colored label at top -->
              <div
                class="absolute top-0 left-0 right-0 h-8 z-10 flex items-center justify-center"
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
                class="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                style="padding-top: 2rem;"
                loading="lazy"
              />

              <!-- Roast badge -->
              <div class="absolute bottom-2 right-2 bg-black/50 text-white text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-sm">
                {{ product.roast }}
              </div>

              <!-- Weight badge -->
              <div class="absolute bottom-2 left-2 bg-white/80 dark:bg-gray-900/80 text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-sm
                          text-coffee-dark dark:text-amber-400">
                {{ product.weight }}
              </div>
            </div>

            <!-- Name -->
            <h3 class="font-bold text-xs tracking-[0.15em] mb-1 transition-colors duration-300
                       text-coffee-dark dark:text-amber-400"
                style="font-family:'Playfair Display',Georgia,serif;">
              {{ product.name }}
            </h3>

            <!-- Country -->
            <p class="text-[10px] tracking-wider mb-2 transition-colors duration-300
                      text-gray-400 dark:text-gray-500">
              {{ product.country }}
            </p>

            <!-- Price + Cart -->
            <div class="flex items-center justify-center gap-3">
              <span class="text-sm font-bold transition-colors duration-300
                           text-gray-700 dark:text-gray-300">
                LKR {{ product.price.toLocaleString() }}
              </span>

              <!-- Cart Button -->
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
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
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
          {{ showAll ? 'SEE LESS' : `SEE MORE (${filteredProducts.length - displayedProducts.length} more)` }}
          <span
            class="inline-flex items-center justify-center w-6 h-6 rounded-full border border-current text-xs transition-all
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