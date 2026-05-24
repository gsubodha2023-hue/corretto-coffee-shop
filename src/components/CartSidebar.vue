<script setup lang="ts">
import { computed } from 'vue'
import { X, ShoppingCart, Trash2 } from 'lucide-vue-next'
import { useCart } from '../composables/useCart'

defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const { cartItems, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart()

const formattedTotal = computed<string>(() =>
  `LKR ${totalPrice.value.toLocaleString()}`
)
</script>

<template>
  <Teleport to="body">

    <div
      v-if="open"
      class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
      @click="$emit('close')"
    />

    <transition name="slide-right">
      <div
        v-if="open"
        class="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-white shadow-2xl flex flex-col"
      >
        <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div class="flex items-center gap-3">
            <ShoppingCart :size="20" />
            <h2 class="font-bold tracking-widest text-sm">CART ({{ totalItems }})</h2>
          </div>
          <button @click="$emit('close')" class="hover:text-amber-700 transition-colors">
            <X :size="20" />
          </button>
        </div>

        <div class="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <div v-if="cartItems.length === 0" class="text-center py-20 text-gray-400">
            <div class="text-5xl mb-4">🛒</div>
            <p class="text-sm tracking-wider">Your cart is empty</p>
          </div>

          <div
            v-for="item in cartItems"
            :key="item.product.id"
            class="flex gap-4 border-b border-gray-100 pb-4"
          >
            <img
              :src="item.product.thumbnail"
              :alt="item.product.title"
              class="w-16 h-16 object-cover rounded flex-shrink-0"
            />
            <div class="flex-1 min-w-0">
              <div class="font-bold text-xs tracking-wider text-coffee-dark truncate">
                {{ item.product.title }}
              </div>
              <div class="text-xs text-gray-500 mt-1">
                LKR {{ (item.product.price * 320).toLocaleString() }}
              </div>
              <div class="flex items-center gap-2 mt-2">
                <button
                  @click="updateQuantity(item.product.id, item.quantity - 1)"
                  class="w-6 h-6 border border-gray-300 flex items-center justify-center text-sm hover:border-amber-500 transition-colors"
                >−</button>
                <span class="text-sm font-bold w-4 text-center">{{ item.quantity }}</span>
                <button
                  @click="updateQuantity(item.product.id, item.quantity + 1)"
                  class="w-6 h-6 border border-gray-300 flex items-center justify-center text-sm hover:border-amber-500 transition-colors"
                >+</button>
              </div>
            </div>
            <button
              @click="removeFromCart(item.product.id)"
              class="text-gray-300 hover:text-red-500 transition-colors self-start"
            >
              <Trash2 :size="14" />
            </button>
          </div>
        </div>

        <div v-if="cartItems.length > 0" class="px-6 py-5 border-t border-gray-100 space-y-3">
          <div class="flex justify-between font-bold text-sm">
            <span>TOTAL</span>
            <span>{{ formattedTotal }}</span>
          </div>
          <button class="w-full bg-coffee-dark text-white py-3 text-xs font-bold tracking-[0.3em] hover:bg-amber-700 transition-colors">
            CHECKOUT
          </button>
          <button
            @click="clearCart"
            class="w-full flex items-center justify-center gap-2 text-xs text-gray-400 hover:text-red-500 transition-colors py-1"
          >
            <Trash2 :size="12" /> Clear cart
          </button>
        </div>

      </div>
    </transition>

  </Teleport>
</template>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease;
}
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>