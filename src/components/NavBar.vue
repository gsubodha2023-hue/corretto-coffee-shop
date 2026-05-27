<script setup lang="ts">
import { ref } from 'vue'
import { ShoppingCart, Search, Menu, X, Sun, Moon } from 'lucide-vue-next'
import { useCart } from '../composables/useCart'

const { totalItems } = useCart()

const mobileOpen  = ref<boolean>(false)
const searchOpen  = ref<boolean>(false)
const searchInput = ref<string>('')

defineProps<{ isDark: boolean }>()

const emit = defineEmits<{
  (e: 'openCart'): void
  (e: 'search', query: string): void
  (e: 'toggleDark'): void
}>()

const navLinks: string[] = ['HOME', 'ABOUT US', 'SHOP', 'SERVICES', 'BLOG', 'CONTACT US']

function handleSearch(): void {
  emit('search', searchInput.value)
  searchOpen.value = false
}

function scrollToShop(): void {
  document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm text-white">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

      <!-- Logo -->
      <div class="flex items-center gap-2 shrink-0">
        <div class="text-2xl">☕</div>
        <div class="border-2 border-white px-4 py-1 font-bold text-base tracking-[0.3em]">
          CORRETTO
        </div>
      </div>

      <!-- Desktop Nav Links -->
      <ul class="hidden lg:flex gap-8 text-xs tracking-widest">
        <li v-for="link in navLinks" :key="link">
          <a
            href="#"
            @click.prevent="link === 'SHOP' ? scrollToShop() : undefined"
            class="hover:text-amber-400 transition-colors duration-200"
          >
            {{ link }}
          </a>
        </li>
      </ul>

      <!-- Right Icons -->
      <div class="flex items-center gap-4">

        <!-- ====== DARK / LIGHT TOGGLE ====== -->
        <button
          @click="$emit('toggleDark')"
          :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          class="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/30 hover:border-amber-400 transition-all duration-300"
          :class="isDark ? 'bg-gray-800' : 'bg-white/10'"
        >
          <!-- Sun icon (light mode active) -->
          <Sun
            :size="14"
            :class="!isDark ? 'text-amber-400' : 'text-gray-500'"
            class="transition-colors duration-300"
          />

          <!-- Sliding toggle pill -->
          <div class="relative w-10 h-5 rounded-full transition-all duration-300"
               :class="isDark ? 'bg-amber-500' : 'bg-gray-400'">
            <div
              class="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-300"
              :class="isDark ? 'left-5' : 'left-0.5'"
            />
          </div>

          <!-- Moon icon (dark mode active) -->
          <Moon
            :size="14"
            :class="isDark ? 'text-amber-400' : 'text-gray-500'"
            class="transition-colors duration-300"
          />
        </button>
        <!-- ====== END TOGGLE ====== -->

        <!-- Cart -->
        <button @click="$emit('openCart')" class="relative hover:text-amber-400 transition-colors">
          <ShoppingCart :size="20" />
          <span
            v-if="totalItems > 0"
            class="absolute -top-2 -right-2 bg-amber-500 text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
          >
            {{ totalItems }}
          </span>
        </button>

        <!-- Search -->
        <button @click="searchOpen = !searchOpen" class="hover:text-amber-400 transition-colors">
          <Search :size="20" />
        </button>

        <!-- Mobile Menu -->
        <button @click="mobileOpen = !mobileOpen" class="lg:hidden hover:text-amber-400 transition-colors">
          <X v-if="mobileOpen" :size="22" />
          <Menu v-else :size="22" />
        </button>
      </div>
    </div>

    <!-- Search Dropdown -->
    <transition name="slide-down">
      <div v-if="searchOpen" class="bg-black/95 border-t border-white/10 px-6 py-3">
        <div class="max-w-7xl mx-auto flex gap-3">
          <input
            v-model="searchInput"
            @keyup.enter="handleSearch"
            type="text"
            placeholder="Search coffee, pastry, products..."
            class="flex-1 bg-white/10 text-white placeholder-white/40 px-4 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-amber-400"
          />
          <button
            @click="handleSearch"
            class="bg-amber-600 hover:bg-amber-500 px-6 py-2 rounded text-sm font-bold tracking-wider transition-colors"
          >
            SEARCH
          </button>
        </div>
      </div>
    </transition>

    <!-- Mobile Menu -->
    <transition name="slide-down">
      <div v-if="mobileOpen" class="lg:hidden bg-black/95 border-t border-white/10 px-6 py-4">
        <ul class="flex flex-col gap-5 text-xs tracking-widest mb-5">
          <li v-for="link in navLinks" :key="link">
            <a href="#" class="hover:text-amber-400 transition-colors">{{ link }}</a>
          </li>
        </ul>
        <!-- Mobile dark toggle label -->
        <div class="flex items-center gap-3 pt-4 border-t border-white/10">
          <span class="text-xs text-white/60 tracking-widest">
            {{ isDark ? '🌙 DARK MODE' : '☀️ LIGHT MODE' }}
          </span>
          <button
            @click="$emit('toggleDark')"
            class="relative w-10 h-5 rounded-full transition-all duration-300"
            :class="isDark ? 'bg-amber-500' : 'bg-gray-400'"
          >
            <div
              class="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-300"
              :class="isDark ? 'left-5' : 'left-0.5'"
            />
          </button>
        </div>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>