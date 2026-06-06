<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCart } from '../composables/useCart'
import type { Product } from '../types'
import seafoodImg         from '../assets/seafoodPastry.png'
import chickenImg         from '../assets/chickenPastry.png'
import lavacakeImg        from '../assets/Lava_cake.jpg'
import chocolateCroissant from '../assets/Chocolate_Croissant.jpg'
import blueberryMuffinImg from '../assets/Blueberry_muffin.jpg'
import cinnamonRoll       from '../assets/Cinnamon_Roll.jpg'
import appleTurnover      from '../assets/Apple_Turnover.jpg'
import butterCroissant    from '../assets/Butter_Croissant.jpg'
import tiramisuImg        from '../assets/Tiramisu.jpg'
import cheeseCakeImg      from '../assets/Cheese_cake.jpeg'
import chocolateCakeImg   from '../assets/Chocolate_cake.jpg'
import bananaBreadImg     from '../assets/Banana_bred.jpg'
import eclairImg          from '../assets/Eclair.jpg'
import macaronImg         from '../assets/Macaron.jpg'
import strawberryTartImg from '../assets/Strawberry_tart.jpg'
import margheritaImg      from '../assets/Margherita_Pizza.png'
import chickenBurgerImg   from '../assets/Double_Chicken_Burger.png'
import fireGrillImg       from '../assets/Fire_Grill_Burger.png'
import cheeseHotDogImg    from '../assets/Cheese_HotDog.png'
import smokyHotDogImg     from '../assets/Smoky_Sausage_HotDog.png'

const { addToCart } = useCart()

const PASTRY_SERVICE_TAG = 'DINE-IN, TAKEAWAY & DELIVERY'
const PASTRY_SERVICE_TAG_COLOR = 'bg-rose-700'

interface PastryItem {
  id: number
  name: string
  price: number
  image: string
  category: 'pastry' | 'cake' | 'food'
}

const allPastries: PastryItem[] = [
  { id: 201, name: 'SEAFOOD PASTRY',        price: 220, image: seafoodImg,         category: 'pastry' },
  { id: 202, name: 'CHICKEN PASTRY',        price: 180, image: chickenImg,         category: 'pastry' },
  { id: 203, name: 'LAVA CAKE',             price: 200, image: lavacakeImg,        category: 'cake' },
  { id: 204, name: 'CHOCOLATE CROISSANT',   price: 160, image: chocolateCroissant, category: 'pastry' },
  { id: 205, name: 'BLUEBERRY MUFFIN',      price: 140, image: blueberryMuffinImg, category: 'pastry' },
  { id: 206, name: 'CINNAMON ROLL',         price: 170, image: cinnamonRoll,       category: 'pastry' },
  { id: 207, name: 'APPLE TURNOVER',        price: 175, image: appleTurnover,      category: 'pastry' },
  { id: 208, name: 'BANANA BREAD',          price: 165, image: bananaBreadImg,     category: 'pastry' },
  { id: 209, name: 'ÉCLAIR',                price: 195, image: eclairImg,          category: 'pastry' },
  { id: 210, name: 'MACARON',               price: 150, image: macaronImg,           category: 'pastry' },
  { id: 211, name: 'TIRAMISU',              price: 250, image: tiramisuImg,        category: 'cake' },
  { id: 212, name: 'BUTTER CROISSANT',      price: 155, image: butterCroissant,    category: 'pastry' },
  { id: 213, name: 'STRAWBERRY TART',       price: 210, image: strawberryTartImg,  category: 'pastry' },
  { id: 214, name: 'CHEESE CAKE',           price: 230, image: cheeseCakeImg,      category: 'cake' },
  { id: 215, name: 'CHOCOLATE CAKE',        price: 280, image: chocolateCakeImg,   category: 'cake' },
  { id: 216, name: 'MARGHERITA PIZZA',      price: 350, image: margheritaImg,      category: 'food' },
  { id: 217, name: 'DOUBLE CHICKEN BURGER', price: 420, image: chickenBurgerImg,   category: 'food' },
  { id: 218, name: 'FIRE GRILL BURGER',     price: 390, image: fireGrillImg,       category: 'food' },
  { id: 219, name: 'CHEESE HOT DOG',        price: 280, image: cheeseHotDogImg,    category: 'food' },
  { id: 220, name: 'SMOKY SAUSAGE HOT DOG', price: 260, image: smokyHotDogImg,     category: 'food' },
]

const pastryCount = allPastries.filter(i => i.category === 'pastry').length
const cakeCount   = allPastries.filter(i => i.category === 'cake').length

const activeFilter = ref<string>('all')
const filters = [
  { key: 'all',    label: `ALL (${allPastries.length})` },
  { key: 'pastry', label: `🥐 PASTRY (${pastryCount})` },
  { key: 'cake',   label: `🎂 CAKE (${cakeCount})` },
]

// Track added animation per item
const addedId = ref<number | null>(null)

function handleAddToCart(pastry: PastryItem): void {
  const cartProduct: Product = {
    id: pastry.id,
    title: pastry.name,
    price: pastry.price / 320,       // convert LKR to USD for cart consistency
    description: `${PASTRY_SERVICE_TAG} — ${pastry.name}`,
    category: 'pastry',              // ← category flag for CartSidebar
    thumbnail: pastry.image,         // ← real photo shown in cart
    images: [pastry.image],
    rating: 4.7,
    stock: 30,
    brand: pastry.image,             // ← store image again for cart display
    discountPercentage: 0
  }
  addToCart(cartProduct)

  // Show green ✓ animation
  addedId.value = pastry.id
  setTimeout(() => { addedId.value = null }, 1500)
}

const showAll = ref<boolean>(false)
const INITIAL = 3

const filteredPastries = computed<PastryItem[]>(() =>
  activeFilter.value === 'all'
    ? allPastries
    : allPastries.filter(i => i.category === activeFilter.value)
)

const displayedPastries = computed<PastryItem[]>(() =>
  showAll.value ? filteredPastries.value : filteredPastries.value.slice(0, INITIAL)
)

function setFilter(key: string): void {
  activeFilter.value = key
  showAll.value = false
}

function toggleShowMore(): void {
  showAll.value = !showAll.value
  if (!showAll.value) {
    document.getElementById('pastry-section')?.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <section id="pastry-section" class="py-24 relative overflow-hidden transition-colors duration-300
                  bg-coffee-beige dark:bg-gray-800">

    <!-- Left decoration -->
    <div class="absolute top-4 left-4 opacity-10 pointer-events-none">
      <svg viewBox="0 0 160 160" fill="none" class="w-36">
        <circle cx="12" cy="12" r="5" stroke="#c8a27a" stroke-width="1" fill="none"/>
        <circle cx="22" cy="10" r="4" stroke="#c8a27a" stroke-width="1" fill="none"/>
        <path d="M10 30 Q40 10 80 20 Q120 30 140 80 Q100 60 60 70 Q30 78 10 110 Q5 70 10 30Z"
              stroke="#c8a27a" stroke-width="1.2" fill="none"/>
        <path d="M10 30 Q60 50 140 80" stroke="#c8a27a" stroke-width="0.8" fill="none" opacity="0.6"/>
      </svg>
    </div>

    <!-- Right decoration -->
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

    <div class="max-w-7xl mx-auto px-6 relative z-10">

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
        <div class="flex flex-wrap justify-center gap-3 mt-6">
          <span
            class="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-white px-3 py-1 rounded-full"
            :class="PASTRY_SERVICE_TAG_COLOR"
          >
            🥐 PASTRY & CAKE — {{ PASTRY_SERVICE_TAG }}
          </span>
        </div>
      </div>

      <!-- Filter Tabs -->
      <div class="flex flex-wrap justify-center gap-2 mb-8">
        <button
          v-for="f in filters"
          :key="f.key"
          @click="setFilter(f.key)"
          class="px-4 py-2 text-xs font-bold tracking-wider rounded-full border transition-all duration-200"
          :class="activeFilter === f.key
            ? 'bg-coffee-dark dark:bg-amber-600 text-white border-coffee-dark dark:border-amber-600 scale-105'
            : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400'"
        >
          {{ f.label }}
        </button>
      </div>

      <!-- Grid -->
      <div
        class="grid gap-5 mb-10 transition-all duration-500"
        :class="showAll
          ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
          : 'grid-cols-1 md:grid-cols-3'"
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
                :class="showAll ? 'h-36' : 'h-60'"
                loading="lazy"
              />
              <span
                class="absolute top-2 left-2 text-white text-[9px] font-bold tracking-wide px-2 py-0.5 rounded-sm leading-tight"
                :class="PASTRY_SERVICE_TAG_COLOR"
              >
                {{ PASTRY_SERVICE_TAG }}
              </span>
              <div class="absolute inset-0 bg-amber-900/0 group-hover:bg-amber-900/10 transition-all duration-300"/>
            </div>

            <!-- Info -->
            <div class="p-3 text-center transition-colors duration-300 bg-white/30 dark:bg-gray-700/30">
              <h3
                class="font-bold tracking-[0.12em] mb-2 transition-colors duration-300
                       text-coffee-dark dark:text-amber-400"
                :class="showAll ? 'text-[9px]' : 'text-xs'"
              >
                {{ pastry.name }}
              </h3>

              <div class="flex items-center justify-center gap-3">
                <!-- Price -->
                <span
                  class="font-semibold transition-colors duration-300
                         text-gray-700 dark:text-gray-300"
                  :class="showAll ? 'text-xs' : 'text-sm'"
                >
                  LKR {{ pastry.price }}
                </span>

                <!-- ✅ WORKING CART BUTTON -->
                <button
                  @click="handleAddToCart(pastry)"
                  :title="`Add ${pastry.name} to cart`"
                  class="rounded-full flex items-center justify-center transition-all duration-300 shadow-sm flex-shrink-0"
                  :class="[
                    showAll ? 'w-7 h-7' : 'w-9 h-9',
                    addedId === pastry.id
                      ? 'bg-green-500 scale-110'
                      : 'bg-coffee-dark dark:bg-amber-600 hover:bg-amber-600 dark:hover:bg-amber-500 hover:scale-110'
                  ]"
                >
                  <!-- Cart icon -->
                  <svg
                    v-if="addedId !== pastry.id"
                    xmlns="http://www.w3.org/2000/svg"
                    :width="showAll ? '13' : '16'"
                    :height="showAll ? '13' : '16'"
                    viewBox="0 0 24 24"
                    fill="none" stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="9"  cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  <!-- Checkmark when added -->
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    :width="showAll ? '13' : '16'"
                    :height="showAll ? '13' : '16'"
                    viewBox="0 0 24 24"
                    fill="none" stroke="white"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </button>
              </div>

              <!-- Added confirmation text -->
              <Transition name="pop">
                <p
                  v-if="addedId === pastry.id"
                  class="text-green-500 font-bold mt-1 tracking-wider"
                  :class="showAll ? 'text-[9px]' : 'text-xs'"
                >
                  ✓ Added!
                </p>
              </Transition>
            </div>
          </div>
        </Transition>
      </div>

      <!-- SEE MORE / SEE LESS -->
      <div class="text-center">
        <button
          v-if="filteredPastries.length > INITIAL"
          @click="toggleShowMore"
          class="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em]
                 transition-all duration-300 group
                 text-gray-800 dark:text-gray-300
                 hover:text-amber-700 dark:hover:text-amber-400"
        >
          {{ showAll ? 'SEE LESS' : 'SEE MORE' }}
          <span
            class="inline-flex items-center justify-center w-6 h-6 rounded-full border border-current
                   text-xs transition-all
                   group-hover:bg-amber-700 group-hover:border-amber-700 group-hover:text-white"
            :style="showAll ? 'transform:rotate(180deg)' : 'transform:rotate(0deg)'"
          >→</span>
        </button>
        <p class="text-xs text-gray-400 dark:text-gray-600 mt-3 tracking-wider">
          Showing {{ displayedPastries.length }} of {{ filteredPastries.length }} items
        </p>
      </div>

    </div>
  </section>
</template>

<style scoped>
.card-fade-enter-active { transition: all 0.4s ease; }
.card-fade-enter-from   { opacity: 0; transform: translateY(20px); }
.pop-enter-active { transition: all 0.3s ease; }
.pop-leave-active { transition: all 0.3s ease; }
.pop-enter-from, .pop-leave-to { transform: translateY(-5px); opacity: 0; }
</style>