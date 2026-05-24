<script setup lang="ts">
import type { Product } from '../types'
import { useCart } from '../composables/useCart'

const props = defineProps<{
  product: Product
  index: number
}>()

const emit = defineEmits<{
  (e: 'viewDetail', product: Product): void
}>()

const { addToCart } = useCart()

// Coffee names to display
const coffeeNames: string[] = [
  'Cappuccino Milk Coffee',
  'Flat White Milk Coffee',
  'Latte Macchiato Coffee',
  'Black Sri Lankan Coffee',
  'Black England Coffee',
  'White Choco Coffee',
  'Latte Brown Coffee',
  'Ice Latte Coffee',
  'Espresso Classic',
  'Mocha Delight',
  'Cold Brew Special',
  'Americano Rich'
]

// Coffee prices in LKR
const coffeePrices: number[] = [720, 680, 750, 650, 730, 780, 680, 550, 600, 800, 850, 620]

// ✅ Real coffee cup images from Unsplash
const coffeeImages: string[] = [
  'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80', // cappuccino
  'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=400&q=80', // flat white
  'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80', // latte macchiato
  'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=80', // black coffee
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80', // black hot coffee
  'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&q=80', // white choco
  'https://images.unsplash.com/photo-1587080266227-677cc2a4e76e?w=400&q=80', // latte brown
  'https://images.unsplash.com/photo-1517959105821-eaf2591984ca?w=400&q=80', // ice latte
  'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&q=80', // espresso
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', // mocha
  'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80', // cold brew
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80', // americano
]

const displayName  = coffeeNames[props.index % coffeeNames.length]
const displayPrice = coffeePrices[props.index % coffeePrices.length]
const displayImage = coffeeImages[props.index % coffeeImages.length]
</script>

<template>
  <div class="border border-gray-200 bg-white group hover:shadow-md transition-shadow duration-300">

    <!-- Image -->
    <div class="overflow-hidden cursor-pointer" @click="$emit('viewDetail', product)">
      <img
        :src="displayImage"
        :alt="displayName"
        class="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    <!-- Info -->
    <div class="p-3 text-center">
      <h3
        class="font-bold text-[11px] tracking-[0.15em] mb-2 text-coffee-dark uppercase cursor-pointer hover:text-amber-700 transition-colors"
        @click="$emit('viewDetail', product)"
      >
        {{ displayName }}
      </h3>
      <div class="flex items-center justify-center gap-3">
        <span class="text-gray-700 text-sm font-semibold">LKR {{ displayPrice }}</span>
        <button
          @click="addToCart(product)"
          class="text-gray-500 hover:text-amber-600 transition-colors text-lg"
          title="Add to cart"
        >
          🛒
        </button>
      </div>
    </div>

  </div>
</template>