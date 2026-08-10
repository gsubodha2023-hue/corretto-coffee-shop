<script setup lang="ts">
import { computed } from 'vue'
import { X, ShoppingCart, Trash2 } from 'lucide-vue-next'
import { useCart } from '../composables/useCart'
import type { CartItem } from '../types'

defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: 'close'): void; (e: 'checkout'): void }>()

const { cartItems, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart()

const formattedTotal = computed<string>(() => `LKR ${totalPrice.value.toLocaleString()}`)

// Check if item is a coffee bag (OnlineCoffeeShop)
function isCoffeeBag(item: CartItem): boolean {
  return item.product.category === 'coffee-bag'
}

// Check if item is a pastry (PastrySection) — has real thumbnail
function isPastry(item: CartItem): boolean {
  return item.product.category === 'pastry'
}

// Get label color for coffee bags
function getBagColor(item: CartItem): string {
  return item.product.brand || '#8a6030'
}

// Get origin name for coffee bags
function getBagOrigin(item: CartItem): string {
  return item.product.description?.split(' Roasted')[0] || item.product.title
}

// Format LKR price correctly
function getLKRPrice(item: CartItem): string {
  const lkr = item.product.price * 320
  return `LKR ${Math.round(lkr).toLocaleString()}`
}

function getOriginalLKRPrice(item: CartItem): string | null {
  const original = item.product.originalPrice
  if (!original || original <= item.product.price) return null
  return `LKR ${Math.round(original * 320).toLocaleString()}`
}
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <div v-if="open" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" @click="$emit('close')" />

    <!-- Sidebar -->
    <transition name="slide-right">
      <div v-if="open"
           class="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm shadow-2xl flex flex-col transition-colors duration-300
                  bg-white dark:bg-gray-900">

        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-5 border-b transition-colors duration-300
                    border-gray-100 dark:border-gray-700">
          <div class="flex items-center gap-3">
            <ShoppingCart :size="20" class="text-gray-800 dark:text-white" />
            <h2 class="font-bold tracking-widest text-sm text-gray-800 dark:text-white">
              CART ({{ totalItems }})
            </h2>
          </div>
          <button @click="$emit('close')"
                  class="transition-colors text-gray-600 dark:text-gray-400 hover:text-amber-700">
            <X :size="20" />
          </button>
        </div>

        <!-- Cart Items -->
        <div class="flex-1 overflow-y-auto px-6 py-4 space-y-4">

          <!-- Empty state -->
          <div v-if="cartItems.length === 0" class="text-center py-20 text-gray-400 dark:text-gray-600">
            <div class="text-5xl mb-4">🛒</div>
            <p class="text-sm tracking-wider">Your cart is empty</p>
          </div>

          <!-- Cart items loop -->
          <div v-for="item in cartItems" :key="item.product.id"
               class="flex gap-4 pb-4 border-b transition-colors duration-300
                      border-gray-100 dark:border-gray-700">

            <!-- ===== COFFEE BAG SVG (OnlineCoffeeShop) ===== -->
            <div v-if="isCoffeeBag(item)" class="flex-shrink-0 w-16 h-16 flex items-center justify-center">
              <svg width="48" height="64" viewBox="0 0 136 260" fill="none">
                <defs>
                  <linearGradient :id="`cb_${item.product.id}`" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="#7a5230"/>
                    <stop offset="50%" stop-color="#d4a96a"/>
                    <stop offset="100%" stop-color="#7a5230"/>
                  </linearGradient>
                  <linearGradient :id="`ct_${item.product.id}`" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="#5a3a18"/>
                    <stop offset="50%" stop-color="#a87840"/>
                    <stop offset="100%" stop-color="#5a3a18"/>
                  </linearGradient>
                </defs>
                <path d="M14 16 Q68 6 122 16 L124 52 Q68 42 12 52 Z" :fill="`url(#ct_${item.product.id})`"/>
                <path d="M12 52 Q68 42 124 52 L128 248 Q68 258 8 248 Z" :fill="`url(#cb_${item.product.id})`"/>
                <path d="M12 52 L8 248" stroke="#5a3010" stroke-width="6" fill="none" opacity="0.25"/>
                <path d="M124 52 L128 248" stroke="#5a3010" stroke-width="6" fill="none" opacity="0.25"/>
                <path d="M8 248 Q68 260 128 248 L126 258 Q68 268 10 258 Z" fill="#8a6030" opacity="0.7"/>
                <path d="M20 59 Q68 50 116 59 L113 90 Q68 98 23 90 Z" :fill="getBagColor(item)"/>
                <text x="68" y="78" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="14" fill="white" opacity="0.95">{{ getBagOrigin(item) }}</text>
                <text x="68" y="135" text-anchor="middle" font-family="Georgia,serif" font-size="14" font-weight="bold" fill="#3a1a00" opacity="0.85">ROASTED</text>
                <text x="68" y="152" text-anchor="middle" font-family="Georgia,serif" font-size="14" font-weight="bold" fill="#3a1a00" opacity="0.85">COFFEE</text>
              </svg>
            </div>

            <!-- ===== PASTRY / FOOD REAL PHOTO ===== -->
            <div v-else-if="isPastry(item)" class="flex-shrink-0 w-16 h-16 overflow-hidden rounded-sm border border-coffee-mid/20">
              <img
                :src="item.product.thumbnail"
                :alt="item.product.title"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- ===== REGULAR PRODUCT IMAGE (API products) ===== -->
            <img
              v-else
              :src="item.product.thumbnail"
              :alt="item.product.title"
              class="w-16 h-16 object-cover rounded flex-shrink-0"
            />

            <!-- Item details -->
            <div class="flex-1 min-w-0">
              <div class="font-bold text-xs tracking-wider truncate transition-colors duration-300
                          text-coffee-dark dark:text-white">
                {{ item.product.title }}
              </div>
              <div class="text-xs mt-1 transition-colors duration-300 text-gray-500 dark:text-gray-400">
                <span v-if="getOriginalLKRPrice(item)" class="line-through mr-2 text-gray-400">{{ getOriginalLKRPrice(item) }}</span>
                <span :class="getOriginalLKRPrice(item) ? 'font-bold text-red-600 dark:text-red-400' : ''">{{ getLKRPrice(item) }}</span>
              </div>
              <div v-if="item.product.allowedServices" class="text-[9px] mt-1 font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                {{ item.product.allowedServices.join(' · ') }}
              </div>
              <!-- Quantity controls -->
              <div class="flex items-center gap-2 mt-2">
                <button @click="updateQuantity(item.product.id, item.quantity - 1)"
                        class="w-6 h-6 border flex items-center justify-center text-sm transition-colors
                               border-gray-300 dark:border-gray-600
                               text-gray-700 dark:text-gray-300
                               hover:border-amber-500 hover:text-amber-600">−</button>
                <span class="text-sm font-bold w-4 text-center transition-colors
                             text-gray-800 dark:text-white">{{ item.quantity }}</span>
                <button @click="updateQuantity(item.product.id, item.quantity + 1)"
                        class="w-6 h-6 border flex items-center justify-center text-sm transition-colors
                               border-gray-300 dark:border-gray-600
                               text-gray-700 dark:text-gray-300
                               hover:border-amber-500 hover:text-amber-600">+</button>
                <!-- Subtotal for this item -->
                <span class="text-xs text-amber-600 dark:text-amber-400 ml-1 font-semibold">
                  × {{ item.quantity }}
                </span>
              </div>
            </div>

            <!-- Remove button -->
            <button @click="removeFromCart(item.product.id)"
                    class="self-start transition-colors text-gray-300 dark:text-gray-600 hover:text-red-500">
              <Trash2 :size="14" />
            </button>
          </div>
        </div>

        <!-- Footer -->
        <div v-if="cartItems.length > 0"
             class="px-6 py-5 border-t space-y-3 transition-colors duration-300
                    border-gray-100 dark:border-gray-700">
          <div class="flex justify-between font-bold text-sm transition-colors duration-300
                      text-gray-800 dark:text-white">
            <span>TOTAL</span>
            <span>{{ formattedTotal }}</span>
          </div>
          <button @click="$emit('checkout')" class="w-full py-3 text-xs font-bold tracking-[0.3em] text-white transition-colors
                         bg-coffee-dark dark:bg-amber-600 hover:bg-amber-700 dark:hover:bg-amber-500">
            CHECKOUT
          </button>
          <p class="text-[10px] text-center leading-relaxed text-gray-400 dark:text-gray-500">
            You can browse and add products without logging in. Login is required only when you place the order.
          </p>
          <button @click="clearCart"
                  class="w-full flex items-center justify-center gap-2 text-xs py-1 transition-colors
                         text-gray-400 dark:text-gray-500 hover:text-red-500">
            <Trash2 :size="12" /> Clear cart
          </button>
        </div>

      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.slide-right-enter-active, .slide-right-leave-active { transition: transform 0.3s ease; }
.slide-right-enter-from, .slide-right-leave-to { transform: translateX(100%); }
</style>