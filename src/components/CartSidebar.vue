<script setup lang="ts">
import { computed } from 'vue'
import { X, ShoppingCart, Trash2 } from 'lucide-vue-next'
import { useCart } from '../composables/useCart'
import type { CartItem } from '../types'

defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const { cartItems, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart()

const formattedTotal = computed<string>(() => `LKR ${totalPrice.value.toLocaleString()}`)

// Check if item is a coffee bag product from OnlineCoffeeShop
function isCoffeeBag(item: CartItem): boolean {
  return item.product.category === 'coffee-bag'
}

// Get label color stored in brand field
function getBagColor(item: CartItem): string {
  return item.product.brand || '#8a6030'
}

// Get origin name from description
function getBagOrigin(item: CartItem): string {
  return item.product.description?.split(' Roasted')[0] || item.product.title
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

          <!-- Cart items -->
          <div v-for="item in cartItems" :key="item.product.id"
               class="flex gap-4 pb-4 border-b transition-colors duration-300
                      border-gray-100 dark:border-gray-700">

            <!-- ===== COFFEE BAG MINI SVG (for OnlineCoffeeShop products) ===== -->
            <div v-if="isCoffeeBag(item)" class="flex-shrink-0 w-16 h-16 flex items-center justify-center">
              <svg width="48" height="64" viewBox="0 0 136 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient :id="`cart_bg_${item.product.id}`" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="#7a5230"/>
                    <stop offset="30%" stop-color="#bf8e55"/>
                    <stop offset="60%" stop-color="#d4a96a"/>
                    <stop offset="100%" stop-color="#7a5230"/>
                  </linearGradient>
                  <linearGradient :id="`cart_tp_${item.product.id}`" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="#5a3a18"/>
                    <stop offset="50%" stop-color="#a87840"/>
                    <stop offset="100%" stop-color="#5a3a18"/>
                  </linearGradient>
                </defs>
                <!-- Bag top fold -->
                <path d="M14 16 Q68 6 122 16 L124 52 Q68 42 12 52 Z" :fill="`url(#cart_tp_${item.product.id})`"/>
                <!-- Bag body -->
                <path d="M12 52 Q68 42 124 52 L128 248 Q68 258 8 248 Z" :fill="`url(#cart_bg_${item.product.id})`"/>
                <!-- Side shadows -->
                <path d="M12 52 L8 248" stroke="#5a3010" stroke-width="6" fill="none" opacity="0.25"/>
                <path d="M124 52 L128 248" stroke="#5a3010" stroke-width="6" fill="none" opacity="0.25"/>
                <!-- Bottom -->
                <path d="M8 248 Q68 260 128 248 L126 258 Q68 268 10 258 Z" fill="#8a6030" opacity="0.7"/>
                <!-- Colored label -->
                <path d="M20 59 Q68 50 116 59 L113 90 Q68 98 23 90 Z" :fill="getBagColor(item)"/>
                <!-- Origin text on label -->
                <text x="68" y="78" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="14" fill="white" opacity="0.95">
                  {{ getBagOrigin(item) }}
                </text>
                <!-- CORRETTO badge -->
                <rect x="44" y="100" width="48" height="14" rx="1" fill="none" stroke="#8a5a20" stroke-width="1" opacity="0.6"/>
                <text x="68" y="111" text-anchor="middle" font-family="Georgia,serif" font-size="6" fill="#4a2a00" letter-spacing="1.5" opacity="0.85">CORRETTO</text>
                <!-- ROASTED COFFEE text -->
                <text x="68" y="135" text-anchor="middle" font-family="Georgia,serif" font-size="14" font-weight="bold" fill="#3a1a00" opacity="0.85">ROASTED</text>
                <text x="68" y="152" text-anchor="middle" font-family="Georgia,serif" font-size="14" font-weight="bold" fill="#3a1a00" opacity="0.85">COFFEE</text>
                <!-- Subtitle -->
                <text x="68" y="165" text-anchor="middle" font-family="Georgia,serif" font-size="6" fill="#5a3010" letter-spacing="1" opacity="0.65">CHOCOLATE · CARAMEL · SPICE</text>
              </svg>
            </div>

            <!-- ===== REGULAR PRODUCT IMAGE (for other products) ===== -->
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
                LKR {{ (item.product.price * 320).toLocaleString() }}
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
          <button class="w-full py-3 text-xs font-bold tracking-[0.3em] text-white transition-colors
                         bg-coffee-dark dark:bg-amber-600 hover:bg-amber-700 dark:hover:bg-amber-500">
            CHECKOUT
          </button>
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