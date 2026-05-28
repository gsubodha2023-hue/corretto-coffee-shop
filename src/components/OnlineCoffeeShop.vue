<script setup lang="ts">
import { ref } from 'vue'
import { useCart } from '../composables/useCart'
import type { CartItem } from '../types'

// Use the global cart
const { cartItems, totalItems } = useCart()

interface CoffeeProduct {
  id: number
  name: string
  price: number
  origin: string
  country: string
  labelGrad: string[]
}

const coffeeProducts: CoffeeProduct[] = [
  { id: 101, name: 'AMERICA COFFEE',   price: 5800, origin: 'America',   country: 'NORTH AMERICA',  labelGrad: ['#7ab8b4','#4a8a88'] },
  { id: 102, name: 'ENGLAND COFFEE',   price: 5200, origin: 'England',   country: 'UNITED KINGDOM', labelGrad: ['#5a9068','#3a6848'] },
  { id: 103, name: 'AUSTRALIA COFFEE', price: 5350, origin: 'Australia', country: 'AUSTRALIA',      labelGrad: ['#d4884a','#aa6030'] },
  { id: 104, name: 'INDIA COFFEE',     price: 4800, origin: 'India',     country: 'INDIA',          labelGrad: ['#9a4060','#6a2040'] }
]

// Track which items just got added (for animation)
const justAdded = ref<Record<number, boolean>>({})

// Local cart for static coffee products (separate from DummyJSON cart)
const localCart = ref<{ product: CoffeeProduct; quantity: number }[]>(
  JSON.parse(localStorage.getItem('corretto-local-cart') || '[]')
)

function saveLocalCart(): void {
  localStorage.setItem('corretto-local-cart', JSON.stringify(localCart.value))
}

function addToLocalCart(product: CoffeeProduct): void {
  const existing = localCart.value.find(item => item.product.id === product.id)
  if (existing) {
    existing.quantity++
  } else {
    localCart.value.push({ product, quantity: 1 })
  }
  saveLocalCart()

  // Show added animation
  justAdded.value[product.id] = true
  setTimeout(() => {
    justAdded.value[product.id] = false
  }, 1500)
}

function getQuantity(id: number): number {
  return localCart.value.find(i => i.product.id === id)?.quantity || 0
}

// Cart modal
const showCartModal = ref<boolean>(false)

function removeFromLocalCart(id: number): void {
  localCart.value = localCart.value.filter(i => i.product.id !== id)
  saveLocalCart()
}

function updateQty(id: number, qty: number): void {
  const item = localCart.value.find(i => i.product.id === id)
  if (item) {
    if (qty <= 0) removeFromLocalCart(id)
    else { item.quantity = qty; saveLocalCart() }
  }
}

const localTotal = (): number =>
  localCart.value.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
</script>

<template>
  <section class="py-24 relative overflow-hidden transition-colors duration-300
                  bg-coffee-beige dark:bg-gray-800">

    <!-- Left plant -->
    <div class="absolute top-0 left-0 w-44 h-full opacity-10 pointer-events-none">
      <svg viewBox="0 0 200 700" fill="none" class="w-full h-full">
        <path d="M40 700 Q60 500 80 380 Q100 260 60 120" stroke="#c8a27a" stroke-width="2" fill="none"/>
        <ellipse cx="95" cy="210" rx="45" ry="22" transform="rotate(-30 95 210)" stroke="#c8a27a" stroke-width="1.5" fill="none"/>
        <ellipse cx="72" cy="310" rx="40" ry="20" transform="rotate(20 72 310)" stroke="#c8a27a" stroke-width="1.5" fill="none"/>
        <ellipse cx="98" cy="400" rx="42" ry="21" transform="rotate(-15 98 400)" stroke="#c8a27a" stroke-width="1.5" fill="none"/>
      </svg>
    </div>

    <!-- Right beans -->
    <div class="absolute bottom-16 right-6 opacity-10 pointer-events-none">
      <svg viewBox="0 0 130 100" fill="none" class="w-36">
        <ellipse cx="35" cy="45" rx="28" ry="17" transform="rotate(-20 35 45)" stroke="#c8a27a" stroke-width="1.5" fill="none"/>
        <path d="M12 38 Q35 48 58 38" stroke="#c8a27a" stroke-width="1" fill="none"/>
        <ellipse cx="90" cy="32" rx="25" ry="15" transform="rotate(15 90 32)" stroke="#c8a27a" stroke-width="1.5" fill="none"/>
      </svg>
    </div>

    <div class="max-w-6xl mx-auto px-6 relative z-10">

      <!-- Header with cart badge -->
      <div class="text-center mb-16 relative">
        <h2 class="text-4xl font-bold tracking-[0.2em] mb-4 transition-colors duration-300
                   text-gray-900 dark:text-white"
            style="font-family: 'Playfair Display', Georgia, serif;">
          ONLINE COFFEE SHOP
        </h2>
        <p class="text-sm max-w-lg mx-auto transition-colors duration-300
                  text-gray-500 dark:text-gray-400">
          Welcome to our online coffee shop, your home for fresh, flavorful coffee delivered right to your door.
        </p>

        <!-- View Cart Button -->
        <button
          v-if="localCart.length > 0"
          @click="showCartModal = true"
          class="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-wider text-white transition-all
                 bg-amber-600 hover:bg-amber-700 shadow-md hover:shadow-lg"
        >
          🛒 View Cart
          <span class="bg-white text-amber-600 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">
            {{ localCart.reduce((s, i) => s + i.quantity, 0) }}
          </span>
        </button>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="product in coffeeProducts"
          :key="product.id"
          class="text-center group cursor-pointer"
        >
          <!-- SVG Coffee Bag -->
          <div class="flex justify-center mb-5">
            <svg
              width="155" height="235"
              viewBox="0 0 136 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-500 drop-shadow-xl"
            >
              <defs>
                <linearGradient :id="`bg_${product.id}`" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stop-color="#7a5230"/>
                  <stop offset="18%"  stop-color="#bf8e55"/>
                  <stop offset="50%"  stop-color="#d4a96a"/>
                  <stop offset="82%"  stop-color="#bf8e55"/>
                  <stop offset="100%" stop-color="#7a5230"/>
                </linearGradient>
                <linearGradient :id="`tp_${product.id}`" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stop-color="#5a3a18"/>
                  <stop offset="50%"  stop-color="#a87840"/>
                  <stop offset="100%" stop-color="#5a3a18"/>
                </linearGradient>
                <linearGradient :id="`lb_${product.id}`" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   :stop-color="product.labelGrad[0]"/>
                  <stop offset="100%" :stop-color="product.labelGrad[1]"/>
                </linearGradient>
              </defs>
              <path d="M14 16 Q68 6 122 16 L124 52 Q68 42 12 52 Z" :fill="`url(#tp_${product.id})`"/>
              <path d="M26 12 Q68 4 110 12" stroke="#4a2a08" stroke-width="1" fill="none" stroke-dasharray="3,3" opacity="0.55"/>
              <path d="M14 16 Q8 34 12 52" stroke="#5a3a10" stroke-width="2" fill="none" opacity="0.4"/>
              <path d="M122 16 Q128 34 124 52" stroke="#5a3a10" stroke-width="2" fill="none" opacity="0.4"/>
              <path d="M12 52 Q68 42 124 52 L128 248 Q68 258 8 248 Z" :fill="`url(#bg_${product.id})`"/>
              <path d="M12 52 L8 248" stroke="#5a3010" stroke-width="4" fill="none" opacity="0.3"/>
              <path d="M124 52 L128 248" stroke="#5a3010" stroke-width="4" fill="none" opacity="0.3"/>
              <path d="M8 248 Q68 260 128 248 L126 258 Q68 268 10 258 Z" fill="#8a6030" opacity="0.7"/>
              <ellipse cx="68" cy="258" rx="54" ry="5.5" fill="#6a4018" opacity="0.4"/>
              <path d="M20 59 Q68 50 116 59 L113 90 Q68 98 23 90 Z" :fill="`url(#lb_${product.id})`"/>
              <path d="M22 61 Q68 52 114 61" stroke="white" stroke-width="0.5" fill="none" opacity="0.35"/>
              <text x="68" y="78" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="12" fill="white" opacity="0.96">{{ product.origin }}</text>
              <path d="M57 100 L61 94 L68 98 L75 94 L79 100" stroke="#8a5a20" stroke-width="0.9" fill="none" opacity="0.65"/>
              <rect x="44" y="100" width="48" height="14" rx="1" fill="none" stroke="#8a5a20" stroke-width="0.8" opacity="0.65"/>
              <text x="68" y="111" text-anchor="middle" font-family="Georgia,serif" font-size="5.5" fill="#4a2a00" letter-spacing="1.5" opacity="0.9">CORRETTO</text>
              <text x="68" y="129" text-anchor="middle" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#3a1a00" letter-spacing="1.5" opacity="0.92">ROASTED</text>
              <text x="68" y="144" text-anchor="middle" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#3a1a00" letter-spacing="1.5" opacity="0.92">COFFEE</text>
              <line x1="24" y1="149" x2="112" y2="149" stroke="#6a3a10" stroke-width="0.6" opacity="0.35"/>
              <text x="68" y="158" text-anchor="middle" font-family="Georgia,serif" font-size="5.5" fill="#5a3010" letter-spacing="1.5" opacity="0.72">CHOCOLATE · CARAMEL · SPICE</text>
              <g opacity="0.18" transform="translate(50,162)">
                <path d="M18 30 Q18 18 18 6" stroke="#3a1a00" stroke-width="1.2" fill="none"/>
                <path d="M18 22 Q9 16 4 8" stroke="#3a1a00" stroke-width="1" fill="none"/>
                <path d="M18 22 Q27 16 32 8" stroke="#3a1a00" stroke-width="1" fill="none"/>
                <ellipse cx="3" cy="7" rx="6" ry="3" transform="rotate(-25 3 7)" stroke="#3a1a00" stroke-width="0.7" fill="none"/>
                <ellipse cx="33" cy="7" rx="6" ry="3" transform="rotate(25 33 7)" stroke="#3a1a00" stroke-width="0.7" fill="none"/>
              </g>
              <line x1="24" y1="193" x2="112" y2="193" stroke="#6a3a10" stroke-width="0.5" opacity="0.28"/>
              <text x="68" y="202" text-anchor="middle" font-family="Georgia,serif" font-size="5.5" fill="#3a1a00" letter-spacing="1" opacity="0.55">ORIGIN: {{ product.country }}</text>
              <text x="18" y="214" font-family="Georgia,serif" font-size="6" fill="#3a1a00" opacity="0.45">ROAST</text>
              <circle cx="52" cy="211" r="2.8" fill="#3a1a00" opacity="0.5"/>
              <circle cx="59" cy="211" r="2.8" fill="#3a1a00" opacity="0.5"/>
              <circle cx="66" cy="211" r="2.8" fill="#3a1a00" opacity="0.5"/>
              <circle cx="73" cy="211" r="2.8" fill="#3a1a00" opacity="0.5"/>
              <circle cx="80" cy="211" r="2.5" fill="none" stroke="#3a1a00" stroke-width="0.9" opacity="0.4"/>
              <text x="18" y="226" font-family="Georgia,serif" font-size="6" fill="#3a1a00" opacity="0.45">GRIND</text>
              <circle cx="52" cy="223" r="2.8" fill="#3a1a00" opacity="0.5"/>
              <circle cx="59" cy="223" r="2.8" fill="#3a1a00" opacity="0.5"/>
              <circle cx="66" cy="223" r="2.8" fill="#3a1a00" opacity="0.5"/>
              <circle cx="73" cy="223" r="2.5" fill="none" stroke="#3a1a00" stroke-width="0.9" opacity="0.4"/>
              <circle cx="80" cy="223" r="2.5" fill="none" stroke="#3a1a00" stroke-width="0.9" opacity="0.4"/>
              <line x1="14" y1="236" x2="122" y2="236" stroke="#5a3010" stroke-width="0.4" opacity="0.28"/>
              <text x="68" y="244" text-anchor="middle" font-family="Georgia,serif" font-size="5" fill="#3a1a00" opacity="0.35">www.correttocoffee.com</text>
            </svg>
          </div>

          <!-- Product Name -->
          <h3 class="font-bold text-sm tracking-[0.15em] mb-2 transition-colors duration-300
                     text-coffee-dark dark:text-amber-400"
              style="font-family: 'Playfair Display', Georgia, serif;">
            {{ product.name }}
          </h3>

          <!-- Price + Cart Button -->
          <div class="flex items-center justify-center gap-3">
            <span class="text-sm font-semibold transition-colors duration-300
                         text-gray-700 dark:text-gray-300">
              LKR {{ product.price.toLocaleString() }}
            </span>

            <!-- ✅ WORKING CART BUTTON -->
            <button
              @click="addToLocalCart(product)"
              class="relative w-9 h-9 rounded-full flex items-center justify-center text-base transition-all duration-300 shadow-sm hover:shadow-md hover:scale-110"
              :class="justAdded[product.id]
                ? 'bg-green-500 text-white scale-110'
                : 'bg-amber-600 hover:bg-amber-700 text-white'"
              :title="justAdded[product.id] ? 'Added!' : 'Add to cart'"
            >
              <span v-if="justAdded[product.id]">✓</span>
              <span v-else>🛒</span>

              <!-- Quantity badge -->
              <span
                v-if="getQuantity(product.id) > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
              >
                {{ getQuantity(product.id) }}
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>

    <!-- ===== CART MODAL ===== -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showCartModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          @click.self="showCartModal = false"
        >
          <div class="w-full max-w-lg rounded-sm shadow-2xl overflow-hidden transition-colors duration-300
                      bg-white dark:bg-gray-900">

            <!-- Modal Header -->
            <div class="flex items-center justify-between px-6 py-4 border-b transition-colors duration-300
                        border-gray-100 dark:border-gray-700">
              <h3 class="font-bold tracking-widest text-sm transition-colors duration-300
                         text-gray-800 dark:text-white">
                🛒 COFFEE CART ({{ localCart.reduce((s,i) => s + i.quantity, 0) }} items)
              </h3>
              <button
                @click="showCartModal = false"
                class="text-gray-400 hover:text-red-500 transition-colors text-xl font-bold"
              >✕</button>
            </div>

            <!-- Cart Items -->
            <div class="max-h-80 overflow-y-auto px-6 py-4 space-y-4">
              <div v-if="localCart.length === 0" class="text-center py-10 text-gray-400">
                <div class="text-4xl mb-3">🛒</div>
                <p class="text-sm">Your cart is empty</p>
              </div>

              <div
                v-for="item in localCart"
                :key="item.product.id"
                class="flex items-center gap-4 pb-4 border-b transition-colors duration-300
                       border-gray-100 dark:border-gray-700"
              >
                <!-- Coffee bag mini SVG icon -->
                <div class="w-12 h-14 flex-shrink-0 flex items-center justify-center rounded
                            bg-amber-50 dark:bg-gray-800 border border-amber-200 dark:border-gray-600">
                  <span class="text-2xl">☕</span>
                </div>

                <!-- Info -->
                <div class="flex-1 min-w-0">
                  <div class="font-bold text-xs tracking-wider truncate transition-colors duration-300
                              text-coffee-dark dark:text-white">
                    {{ item.product.name }}
                  </div>
                  <div class="text-xs mt-0.5 transition-colors duration-300
                              text-gray-500 dark:text-gray-400">
                    LKR {{ item.product.price.toLocaleString() }} each
                  </div>
                  <!-- Qty controls -->
                  <div class="flex items-center gap-2 mt-2">
                    <button
                      @click="updateQty(item.product.id, item.quantity - 1)"
                      class="w-6 h-6 border flex items-center justify-center text-sm rounded transition-colors
                             border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300
                             hover:border-amber-500 hover:text-amber-600"
                    >−</button>
                    <span class="text-sm font-bold w-5 text-center transition-colors duration-300
                                 text-gray-800 dark:text-white">
                      {{ item.quantity }}
                    </span>
                    <button
                      @click="updateQty(item.product.id, item.quantity + 1)"
                      class="w-6 h-6 border flex items-center justify-center text-sm rounded transition-colors
                             border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300
                             hover:border-amber-500 hover:text-amber-600"
                    >+</button>
                  </div>
                </div>

                <!-- Item total + remove -->
                <div class="text-right">
                  <div class="font-bold text-sm transition-colors duration-300
                              text-gray-800 dark:text-white">
                    LKR {{ (item.product.price * item.quantity).toLocaleString() }}
                  </div>
                  <button
                    @click="removeFromLocalCart(item.product.id)"
                    class="text-xs text-red-400 hover:text-red-600 mt-1 transition-colors"
                  >Remove</button>
                </div>
              </div>
            </div>

            <!-- Cart Footer -->
            <div v-if="localCart.length > 0"
                 class="px-6 py-4 border-t space-y-3 transition-colors duration-300
                        border-gray-100 dark:border-gray-700">
              <div class="flex justify-between font-bold text-sm transition-colors duration-300
                          text-gray-800 dark:text-white">
                <span>TOTAL</span>
                <span>LKR {{ localTotal().toLocaleString() }}</span>
              </div>
              <button
                class="w-full py-3 text-xs font-bold tracking-[0.3em] text-white rounded-sm transition-colors
                       bg-amber-600 hover:bg-amber-700"
              >
                CHECKOUT
              </button>
              <button
                @click="() => { localCart.value = []; saveLocalCart() }"
                class="w-full text-xs text-gray-400 hover:text-red-500 transition-colors py-1"
              >
                Clear Cart
              </button>
            </div>

          </div>
        </div>
      </Transition>
    </Teleport>
    <!-- ===== END CART MODAL ===== -->

  </section>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from,  .fade-leave-to      { opacity: 0; }
</style>