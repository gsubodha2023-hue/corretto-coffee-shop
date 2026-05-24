<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useProducts } from '../composables/useProducts'
import ProductCard from './ProductCard.vue'
import ProductModal from './ProductModal.vue'
import type { Product } from '../types'

const props = defineProps<{
  searchQuery?: string
}>()

const { products, loading, error, fetchProducts } = useProducts()

const selectedProduct = ref<Product | null>(null)
const showModal       = ref<boolean>(false)
const skip            = ref<number>(0)
const LIMIT           = 8

// Local search
const localSearch = ref<string>(props.searchQuery || '')

async function load(): Promise<void> {
  await fetchProducts(LIMIT, skip.value, localSearch.value)
}

async function loadMore(): Promise<void> {
  skip.value += LIMIT
  await fetchProducts(LIMIT, skip.value, localSearch.value)
}

function openModal(product: Product): void {
  selectedProduct.value = product
  showModal.value = true
}

function closeModal(): void {
  showModal.value = false
  selectedProduct.value = null
}

// Watch for external search query changes
watch(() => props.searchQuery, (newQ) => {
  if (newQ !== undefined) {
    localSearch.value = newQ
    skip.value = 0
    load()
  }
})

onMounted(() => load())
</script>

<template>
  <section id="shop" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-4">
        <h2 class="text-4xl font-bold tracking-[0.2em] mb-3" style="font-family: 'Playfair Display', Georgia, serif;">
          AVAILABLE IN SHOP
        </h2>
        <p class="text-gray-400 text-sm mb-8">Best product · Fresh vibe · Relax time · Enjoy life with Coffee.</p>
      </div>

      <!-- Search Bar -->
      <div class="flex justify-center mb-10">
        <div class="flex gap-3 w-full max-w-md">
          <input
            v-model="localSearch"
            @keyup.enter="() => { skip = 0; load() }"
            type="text"
            placeholder="Search products..."
            class="flex-1 border border-gray-200 px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-amber-400 rounded"
          />
          <button
            @click="() => { skip = 0; load() }"
            class="bg-coffee-dark text-white px-5 py-2 text-xs tracking-widest hover:bg-amber-700 transition-colors rounded"
          >
            SEARCH
          </button>
          <button
            v-if="localSearch"
            @click="() => { localSearch = ''; skip = 0; load() }"
            class="border border-gray-300 px-3 py-2 text-xs hover:bg-gray-50 rounded transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-20">
        <div class="text-4xl animate-spin inline-block">☕</div>
        <p class="text-gray-400 text-sm mt-4 tracking-wider">Brewing your results...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-20 text-red-500 text-sm">
        {{ error }}
        <button @click="load" class="ml-3 underline">Retry</button>
      </div>

      <!-- Products Grid -->
      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <ProductCard
          v-for="(product, idx) in products"
          :key="product.id"
          :product="product"
          :index="idx"
          @viewDetail="openModal"
        />
      </div>

      <!-- Empty State -->
      <div v-if="!loading && products.length === 0" class="text-center py-20 text-gray-400">
        No products found for "{{ localSearch }}"
      </div>

      <!-- SEE MORE / LOAD MORE -->
      <div v-if="!loading && products.length > 0" class="text-center mt-12">
        <button
          @click="loadMore"
          class="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] hover:text-amber-700 transition-colors"
        >
          SEE MORE <span>→</span>
        </button>
      </div>
    </div>

    <!-- Modal -->
    <ProductModal
      v-if="showModal && selectedProduct"
      :product="selectedProduct"
      @close="closeModal"
    />
  </section>
</template>