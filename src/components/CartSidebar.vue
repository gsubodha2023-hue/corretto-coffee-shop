<script setup lang="ts">
import { computed } from 'vue'
import { X, ShoppingCart, Trash2 } from 'lucide-vue-next'
import { useCart } from '../composables/useCart'

defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const { cartItems, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart()

const formattedTotal = computed<string>(() => `LKR ${totalPrice.value.toLocaleString()}`)
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
            <h2 class="font-bold tracking-widest text-sm transition-colors duration-300
                       text-gray-800 dark:text-white">
              CART ({{ totalItems }})
            </h2>
          </div>
          <button @click="$emit('close')"
                  class="transition-colors text-gray-600 dark:text-gray-400 hover:text-amber-700 dark:hover:text-amber-400">
            <X :size="20" />
          </button>
        </div>

        <!-- Items -->
        <div class="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <div v-if="cartItems.length === 0" class="text-center py-20 text-gray-400 dark:text-gray-600">
            <div class="text-5xl mb-4">🛒</div>
            <p class="text-sm tracking-wider">Your cart is empty</p>
          </div>

          <div v-for="item in cartItems" :key="item.product.id"
               class="flex gap-4 pb-4 border-b transition-colors duration-300
                      border-gray-100 dark:border-gray-700">
            <img :src="item.product.thumbnail" :alt="item.product.title"
                 class="w-16 h-16 object-cover rounded flex-shrink-0" />
            <div class="flex-1 min-w-0">
              <div class="font-bold text-xs tracking-wider truncate transition-colors duration-300
                          text-coffee-dark dark:text-white">
                {{ item.product.title }}
              </div>
              <div class="text-xs mt-1 transition-colors duration-300 text-gray-500 dark:text-gray-400">
                LKR {{ (item.product.price * 320).toLocaleString() }}
              </div>
              <div class="flex items-center gap-2 mt-2">
                <button @click="updateQuantity(item.product.id, item.quantity - 1)"
                        class="w-6 h-6 border flex items-center justify-center text-sm transition-colors
                               border-gray-300 dark:border-gray-600
                               text-gray-700 dark:text-gray-300
                               hover:border-amber-500">−</button>
                <span class="text-sm font-bold w-4 text-center transition-colors duration-300
                             text-gray-800 dark:text-white">{{ item.quantity }}</span>
                <button @click="updateQuantity(item.product.id, item.quantity + 1)"
                        class="w-6 h-6 border flex items-center justify-center text-sm transition-colors
                               border-gray-300 dark:border-gray-600
                               text-gray-700 dark:text-gray-300
                               hover:border-amber-500">+</button>
              </div>
            </div>
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
                         bg-coffee-dark dark:bg-amber-600 hover:bg-amber-700">
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
.slide-right-enter-from,  .slide-right-leave-to      { transform: translateX(100%); }
</style>