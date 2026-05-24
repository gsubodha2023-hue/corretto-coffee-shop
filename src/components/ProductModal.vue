<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Product } from '../types'
import { useCart } from '../composables/useCart'
import { X, ShoppingCart, Star } from 'lucide-vue-next'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { addToCart } = useCart()
const added = ref<boolean>(false)

const lkrPrice = computed<number>(() => Math.round(props.product.price * 320))

function handleAddToCart(): void {
  addToCart(props.product)
  added.value = true
  setTimeout(() => { added.value = false }, 2000)
}

function handleBackdropClick(event: MouseEvent): void {
  if ((event.target as HTMLElement).id === 'modal-backdrop') {
    emit('close')
  }
}
</script>

<template>
  <Teleport to="body">
    <div
      id="modal-backdrop"
      class="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm"
      @click="handleBackdropClick"
    >
      <div class="bg-white max-w-2xl w-full rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row">

        <!-- Image side -->
        <div class="md:w-1/2 bg-gray-100 relative">
          <img
            :src="product.images?.[0] || product.thumbnail"
            :alt="product.title"
            class="w-full h-64 md:h-full object-cover"
          />
          <button
            @click="$emit('close')"
            class="absolute top-3 right-3 bg-black/50 text-white rounded-full p-1 hover:bg-black transition-colors"
          >
            <X :size="16" />
          </button>
        </div>

        <!-- Content side -->
        <div class="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <!-- Category -->
            <div class="text-[10px] tracking-[0.3em] text-amber-600 font-bold uppercase mb-2">
              {{ product.category }}
            </div>

            <!-- Title -->
            <h3 class="font-bold text-xl mb-2 text-coffee-dark leading-tight" style="font-family: 'Playfair Display', Georgia, serif;">
              {{ product.title }}
            </h3>

            <!-- Rating -->
            <div class="flex items-center gap-1 mb-4">
              <Star :size="14" class="fill-amber-400 text-amber-400" />
              <span class="text-sm text-gray-600">{{ product.rating.toFixed(1) }}</span>
              <span class="text-xs text-gray-400 ml-1">({{ product.stock }} in stock)</span>
            </div>

            <!-- Description -->
            <p class="text-gray-500 text-sm leading-relaxed mb-6">
              {{ product.description }}
            </p>

            <!-- Price -->
            <div class="text-2xl font-bold text-coffee-dark mb-6">
              LKR {{ lkrPrice.toLocaleString() }}
            </div>
          </div>

          <!-- Add to Cart -->
          <button
            @click="handleAddToCart"
            class="w-full flex items-center justify-center gap-3 py-3 font-bold text-sm tracking-[0.2em] transition-all duration-300"
            :class="added
              ? 'bg-green-600 text-white'
              : 'bg-coffee-dark text-white hover:bg-amber-700'"
          >
            <ShoppingCart :size="16" />
            {{ added ? '✓ ADDED TO CART' : 'ADD TO CART' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>