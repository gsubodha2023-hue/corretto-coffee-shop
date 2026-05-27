<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Product } from '../types'
import { useCart } from '../composables/useCart'
import { X, ShoppingCart, Star } from 'lucide-vue-next'

const props = defineProps<{ product: Product }>()
const emit  = defineEmits<{ (e: 'close'): void }>()

const { addToCart } = useCart()
const added = ref<boolean>(false)

const lkrPrice = computed<number>(() => Math.round(props.product.price * 320))

function handleAddToCart(): void {
  addToCart(props.product)
  added.value = true
  setTimeout(() => { added.value = false }, 2000)
}

function handleBackdropClick(event: MouseEvent): void {
  if ((event.target as HTMLElement).id === 'modal-backdrop') emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div
      id="modal-backdrop"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/70"
      @click="handleBackdropClick"
    >
      <div class="max-w-2xl w-full rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row transition-colors duration-300
                  bg-white dark:bg-gray-800">

        <!-- Image side -->
        <div class="md:w-1/2 relative bg-gray-100 dark:bg-gray-700">
          <img
            :src="product.images?.[0] || product.thumbnail"
            :alt="product.title"
            class="w-full h-64 md:h-full object-cover"
          />
          <button @click="$emit('close')"
                  class="absolute top-3 right-3 rounded-full p-1 transition-colors
                         bg-black/50 hover:bg-black text-white">
            <X :size="16" />
          </button>
        </div>

        <!-- Content side -->
        <div class="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <div class="text-[10px] tracking-[0.3em] font-bold uppercase mb-2 text-amber-600">
              {{ product.category }}
            </div>
            <h3 class="font-bold text-xl mb-2 leading-tight transition-colors duration-300
                       text-coffee-dark dark:text-white"
                style="font-family:'Playfair Display',Georgia,serif;">
              {{ product.title }}
            </h3>
            <div class="flex items-center gap-1 mb-4">
              <Star :size="14" class="fill-amber-400 text-amber-400" />
              <span class="text-sm transition-colors duration-300 text-gray-600 dark:text-gray-400">
                {{ product.rating.toFixed(1) }}
              </span>
              <span class="text-xs ml-1 transition-colors duration-300 text-gray-400 dark:text-gray-500">
                ({{ product.stock }} in stock)
              </span>
            </div>
            <p class="text-sm leading-relaxed mb-6 transition-colors duration-300
                      text-gray-500 dark:text-gray-400">
              {{ product.description }}
            </p>
            <div class="text-2xl font-bold mb-6 transition-colors duration-300
                        text-coffee-dark dark:text-white">
              LKR {{ lkrPrice.toLocaleString() }}
            </div>
          </div>
          <button
            @click="handleAddToCart"
            class="w-full flex items-center justify-center gap-3 py-3 font-bold text-sm tracking-[0.2em] transition-all duration-300"
            :class="added ? 'bg-green-600 text-white' : 'bg-coffee-dark dark:bg-amber-600 text-white hover:bg-amber-700'"
          >
            <ShoppingCart :size="16" />
            {{ added ? '✓ ADDED TO CART' : 'ADD TO CART' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>