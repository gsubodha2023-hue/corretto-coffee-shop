<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import NavBar           from './components/NavBar.vue'
import HeroSection      from './components/HeroSection.vue'
import DeliciousOffer   from './components/DeliciousOffer.vue'
import CoffeeHerald     from './components/CoffeeHerald.vue'
import StatsSection     from './components/StatsSection.vue'
import OnlineCoffeeShop from './components/OnlineCoffeeShop.vue'
import PastrySection    from './components/PastrySection.vue'
import AvailableInShop  from './components/AvailableInShop.vue'
import ReviewSection    from './components/ReviewSection.vue'
import CartSidebar      from './components/CartSidebar.vue'
import FooterSection    from './components/FooterSection.vue'

const cartOpen    = ref<boolean>(false)
const searchQuery = ref<string>('')
const isDark      = ref<boolean>(false)

// Apply dark class to <html> element
function applyTheme(dark: boolean): void {
  const html = document.documentElement
  if (dark) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
  localStorage.setItem('corretto-theme', dark ? 'dark' : 'light')
}

// Load saved theme when page opens
onMounted(() => {
  const saved = localStorage.getItem('corretto-theme')
  if (saved === 'dark') {
    isDark.value = true
    applyTheme(true)
  }
})

// Watch for changes
watch(isDark, (val) => {
  applyTheme(val)
})

function toggleDark(): void {
  isDark.value = !isDark.value
}

function handleSearch(query: string): void {
  searchQuery.value = query
  setTimeout(() => {
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}
</script>

<template>
  <!-- This wrapper gets dark class applied to <html> by JS above -->
  <div class="min-h-screen transition-colors duration-300
              bg-white text-gray-900
              dark:bg-gray-950 dark:text-white">

    <NavBar
      :is-dark="isDark"
      @openCart="cartOpen = true"
      @search="handleSearch"
      @toggleDark="toggleDark"
    />

    <main>
      <HeroSection />
      <DeliciousOffer />
      <CoffeeHerald />
      <StatsSection />
      <OnlineCoffeeShop />
      <PastrySection />
      <AvailableInShop :search-query="searchQuery" />
      <ReviewSection />
    </main>

    <FooterSection />
    <CartSidebar :open="cartOpen" @close="cartOpen = false" />
  </div>
</template>