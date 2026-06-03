<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCart } from '../composables/useCart'
import type { Product } from '../types'

// Hot coffees
import cappuccinoMilkImg   from '../assets/Cappuccino_milk..jpg'
import flatWhiteMilkImg    from '../assets/Flat_white_milk.jpg'
import latteMacchiatoImg   from '../assets/Latte_macchiato.jpg'
import blackSrilankanImg   from '../assets/Black_srilankan.jpg'
import blackEnglandImg     from '../assets/Black_england.jpg'
import whiteChocoImg       from '../assets/White_choco.jpg'
import latteBrownImg       from '../assets/Latte_brown.jpg'
import espressoClassicImg  from '../assets/Espresso_classic.jpg'

// Ice coffees
import iceLatteMilkImg     from '../assets/Ice_latte-milk.jpg'
import coldBrewSpecialImg  from '../assets/Cold_brew_special.jpg'
import icedAmericanoImg    from '../assets/Iced_americano.jpg'
import icedCappuccinoImg   from '../assets/Iced_cappuccino.webp'
import frappuccinoImg      from '../assets/Frappuccino.jpg'
import icedMochaImg        from '../assets/Iced_mocha.jpg'
import icedCaramelLatteImg from '../assets/Iced_caremel_latte.webp'
import icedMatchaLatteImg  from '../assets/Iced_matcha_latte.jpg'

// Pocket cups
import pocketAmericanoImg  from '../assets/Pocket_americano.jpg'
import pocketLatteImg      from '../assets/Pocket_latte.jpg'
import pocketCappuccinoImg from '../assets/Pocket_cappuccino.jpg'
import pocketMochaImg      from '../assets/Pocket_mocha.jpg'

// Milk bottles
import milkCoffeeBottleImg from '../assets/Milk_coffee_bottle.jpg'
import caramelMilkImg      from '../assets/Caramel_milk.jpg'
import vanilaMilkImg       from '../assets/Vanila_milk.jpg'
import chocoMilkImg        from '../assets/Choco_milk.jpg'

const { addToCart } = useCart()

interface ShopItem {
  id: number
  name: string
  price: number
  image: string
  category: string
  tag: string
  tagColor: string
}

const allItems: ShopItem[] = [
  // ☕ HOT COFFEES — Dine-in ONLY (8 items)
  {
    id: 301, name: 'CAPPUCCINO MILK COFFEE', price: 720,
    image: cappuccinoMilkImg,
    category: 'hot', tag: 'DINE-IN ONLY', tagColor: 'bg-amber-700'
  },
  {
    id: 302, name: 'FLAT WHITE MILK COFFEE', price: 680,
    image: flatWhiteMilkImg,
    category: 'hot', tag: 'DINE-IN ONLY', tagColor: 'bg-amber-700'
  },
  {
    id: 303, name: 'LATTE MACCHIATO', price: 750,
    image: latteMacchiatoImg,
    category: 'hot', tag: 'DINE-IN ONLY', tagColor: 'bg-amber-700'
  },
  {
    id: 304, name: 'BLACK SRI LANKAN COFFEE', price: 650,
    image: blackSrilankanImg,
    category: 'hot', tag: 'DINE-IN ONLY', tagColor: 'bg-amber-700'
  },
  {
    id: 305, name: 'BLACK ENGLAND COFFEE', price: 730,
    image: blackEnglandImg,
    category: 'hot', tag: 'DINE-IN ONLY', tagColor: 'bg-amber-700'
  },
  {
    id: 306, name: 'WHITE CHOCO COFFEE', price: 780,
    image: whiteChocoImg,
    category: 'hot', tag: 'DINE-IN ONLY', tagColor: 'bg-amber-700'
  },
  {
    id: 307, name: 'LATTE BROWN COFFEE', price: 680,
    image: latteBrownImg,
    category: 'hot', tag: 'DINE-IN ONLY', tagColor: 'bg-amber-700'
  },
  {
    id: 308, name: 'ESPRESSO CLASSIC', price: 600,
    image: espressoClassicImg,
    category: 'hot', tag: 'DINE-IN ONLY', tagColor: 'bg-amber-700'
  },
  // 🧊 ICE COFFEES — Dine-in, Takeaway & Delivery (8 items)
  {
    id: 309, name: 'ICE LATTE MILK COFFEE', price: 550,
    image: iceLatteMilkImg,
    category: 'ice', tag: 'DINE-IN & TAKEAWAY', tagColor: 'bg-blue-600'
  },
  {
    id: 310, name: 'COLD BREW SPECIAL', price: 850,
    image: coldBrewSpecialImg,
    category: 'ice', tag: 'DINE-IN & TAKEAWAY', tagColor: 'bg-blue-600'
  },
  {
    id: 311, name: 'ICED AMERICANO', price: 620,
    image: icedAmericanoImg,
    category: 'ice', tag: 'DINE-IN & TAKEAWAY', tagColor: 'bg-blue-600'
  },
  {
    id: 312, name: 'ICED CAPPUCCINO', price: 750,
    image: icedCappuccinoImg,
    category: 'ice', tag: 'DELIVERY AVAILABLE', tagColor: 'bg-teal-600'
  },
  {
    id: 313, name: 'FRAPPUCCINO', price: 900,
    image: frappuccinoImg,
    category: 'ice', tag: 'DELIVERY AVAILABLE', tagColor: 'bg-teal-600'
  },
  {
    id: 314, name: 'ICED MOCHA', price: 820,
    image: icedMochaImg,
    category: 'ice', tag: 'DELIVERY AVAILABLE', tagColor: 'bg-teal-600'
  },
  {
    id: 315, name: 'ICED CARAMEL LATTE', price: 880,
    image: icedCaramelLatteImg,
    category: 'ice', tag: 'DELIVERY AVAILABLE', tagColor: 'bg-teal-600'
  },
  {
    id: 316, name: 'ICED MATCHA LATTE', price: 950,
    image: icedMatchaLatteImg,
    category: 'ice', tag: 'DELIVERY AVAILABLE', tagColor: 'bg-teal-600'
  },
  // 🥤 POCKET CUPS — Takeaway & Delivery (4 items)
  {
    id: 317, name: 'POCKET AMERICANO', price: 480,
    image: pocketAmericanoImg,
    category: 'pocket', tag: 'TAKEAWAY & DELIVERY', tagColor: 'bg-orange-600'
  },
  {
    id: 318, name: 'POCKET LATTE', price: 520,
    image: pocketLatteImg,
    category: 'pocket', tag: 'TAKEAWAY & DELIVERY', tagColor: 'bg-orange-600'
  },
  {
    id: 319, name: 'POCKET CAPPUCCINO', price: 560,
    image: pocketCappuccinoImg,
    category: 'pocket', tag: 'TAKEAWAY & DELIVERY', tagColor: 'bg-orange-600'
  },
  {
    id: 320, name: 'POCKET MOCHA', price: 590,
    image: pocketMochaImg,
    category: 'pocket', tag: 'TAKEAWAY & DELIVERY', tagColor: 'bg-orange-600'
  },
  // 🍶 MILK BOTTLES — Takeaway & Delivery (4 items)
  {
    id: 321, name: 'MILK COFFEE BOTTLE', price: 650,
    image: milkCoffeeBottleImg,
    category: 'bottle', tag: 'TAKEAWAY & DELIVERY', tagColor: 'bg-purple-600'
  },
  {
    id: 322, name: 'CARAMEL MILK BOTTLE', price: 720,
    image: caramelMilkImg,
    category: 'bottle', tag: 'TAKEAWAY & DELIVERY', tagColor: 'bg-purple-600'
  },
  {
    id: 323, name: 'VANILLA MILK BOTTLE', price: 700,
    image: vanilaMilkImg,
    category: 'bottle', tag: 'DELIVERY AVAILABLE', tagColor: 'bg-purple-600'
  },
  {
    id: 324, name: 'CHOCO MILK BOTTLE', price: 750,
    image: chocoMilkImg,
    category: 'bottle', tag: 'DELIVERY AVAILABLE', tagColor: 'bg-purple-600'
  },
]

// Filter tabs
const activeFilter = ref<string>('all')
const filters = [
  { key: 'all',    label: 'ALL (24)' },
  { key: 'hot',    label: '☕ HOT' },
  { key: 'ice',    label: '🧊 ICE' },
  { key: 'pocket', label: '🥤 POCKET' },
  { key: 'bottle', label: '🍶 BOTTLE' },
]

// Show more state — start with 8
const showAll  = ref<boolean>(false)
const INITIAL  = 8

const filteredItems = computed<ShopItem[]>(() =>
  activeFilter.value === 'all'
    ? allItems
    : allItems.filter(i => i.category === activeFilter.value)
)

const displayedItems = computed<ShopItem[]>(() =>
  showAll.value ? filteredItems.value : filteredItems.value.slice(0, INITIAL)
)

function toggleShowMore(): void {
  showAll.value = !showAll.value
  if (!showAll.value) {
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
  }
}

// Reset showAll when filter changes
function setFilter(key: string): void {
  activeFilter.value = key
  showAll.value = false
}

// Cart
const addedId = ref<number | null>(null)

function handleAddToCart(item: ShopItem): void {
  const product: Product = {
    id: item.id,
    title: item.name,
    price: item.price / 320,
    description: `${item.tag} — ${item.name}`,
    category: 'shop-coffee',
    thumbnail: item.image,
    images: [item.image],
    rating: 4.8,
    stock: 50,
    brand: item.tag,
    discountPercentage: 0
  }
  addToCart(product)
  addedId.value = item.id
  setTimeout(() => { addedId.value = null }, 1500)
}
</script>

<template>
  <section id="shop" class="py-24 transition-colors duration-300 bg-white dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-6">

      <!-- Header -->
      <div class="text-center mb-6">
        <h2 class="text-4xl font-bold tracking-[0.2em] mb-3 transition-colors duration-300
                   text-gray-900 dark:text-white"
            style="font-family:'Playfair Display',Georgia,serif;">
          AVAILABLE IN SHOP
        </h2>
        <p class="text-sm mb-6 transition-colors duration-300 text-gray-400 dark:text-gray-500">
          Best product · Fresh vibe · Relax time · Enjoy life with Coffee.
        </p>

        <!-- Service legend -->
        <div class="flex flex-wrap justify-center gap-3 mb-6">
          <span class="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-white bg-amber-700 px-3 py-1 rounded-full">
            ☕ HOT — DINE-IN ONLY
          </span>
          <span class="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-white bg-blue-600 px-3 py-1 rounded-full">
            🧊 ICE — DINE-IN & TAKEAWAY
          </span>
          <span class="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-white bg-teal-600 px-3 py-1 rounded-full">
            🚚 ICE — DELIVERY AVAILABLE
          </span>
          <span class="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-white bg-orange-600 px-3 py-1 rounded-full">
            🥤 POCKET CUP — TAKEAWAY & DELIVERY
          </span>
          <span class="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-white bg-purple-600 px-3 py-1 rounded-full">
            🍶 MILK BOTTLE — TAKEAWAY & DELIVERY
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

      <!-- Items Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <Transition
          v-for="item in displayedItems"
          :key="item.id"
          name="card-fade"
          appear
        >
          <div
            class="group border transition-all duration-300 hover:shadow-md
                   border-gray-200 dark:border-gray-700
                   bg-white dark:bg-gray-800"
          >
            <!-- Image -->
            <div class="overflow-hidden relative">
              <img
                :src="item.image"
                :alt="item.name"
                class="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <!-- Tag badge -->
              <span
                class="absolute top-2 left-2 text-white text-[9px] font-bold tracking-wide px-2 py-0.5 rounded-sm leading-tight"
                :class="item.tagColor"
              >
                {{ item.tag }}
              </span>
            </div>

            <!-- Info -->
            <div class="p-3 text-center">
              <h3 class="font-bold text-[11px] tracking-[0.12em] mb-2 uppercase transition-colors duration-300
                         text-coffee-dark dark:text-amber-400 leading-tight">
                {{ item.name }}
              </h3>

              <div class="flex items-center justify-center gap-3">
                <span class="text-sm font-semibold transition-colors duration-300
                             text-gray-700 dark:text-gray-300">
                  LKR {{ item.price }}
                </span>

                <!-- Working Cart Button -->
                <button
                  @click="handleAddToCart(item)"
                  :title="`Add ${item.name} to cart`"
                  class="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm flex-shrink-0"
                  :class="addedId === item.id
                    ? 'bg-green-500 scale-110'
                    : 'bg-coffee-dark dark:bg-amber-600 hover:bg-amber-600 dark:hover:bg-amber-500 hover:scale-110'"
                >
                  <!-- Cart icon -->
                  <svg v-if="addedId !== item.id"
                       xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                       viewBox="0 0 24 24" fill="none" stroke="white"
                       stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="9"  cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  <!-- Checkmark when added -->
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
                <p v-if="addedId === item.id"
                   class="text-green-500 text-xs font-bold mt-1 tracking-wider">
                  ✓ Added to Cart!
                </p>
              </Transition>
            </div>
          </div>
        </Transition>
      </div>

      <!-- SEE MORE / SEE LESS Button -->
      <div class="text-center mt-10">
        <button
          v-if="filteredItems.length > INITIAL"
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

        <!-- Count -->
        <p class="text-xs text-gray-400 dark:text-gray-600 mt-3 tracking-wider">
          Showing {{ displayedItems.length }} of {{ filteredItems.length }} items
        </p>
      </div>

    </div>
  </section>
</template>

<style scoped>
.card-fade-enter-active { transition: all 0.4s ease; }
.card-fade-enter-from   { opacity: 0; transform: translateY(16px); }
.pop-enter-active, .pop-leave-active { transition: all 0.3s ease; }
.pop-enter-from, .pop-leave-to { transform: translateY(-5px); opacity: 0; }
</style>
