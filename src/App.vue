<script setup lang="ts">
import { ref } from 'vue'
import NavBar         from './components/NavBar.vue'
import HeroSection    from './components/HeroSection.vue'
import DeliciousOffer from './components/DeliciousOffer.vue'
import CoffeeHerald   from './components/CoffeeHerald.vue'
import StatsSection   from './components/StatsSection.vue'
import OnlineCoffeeShop from './components/OnlineCoffeeShop.vue'
import PastrySection  from './components/PastrySection.vue'
import AvailableInShop from './components/AvailableInShop.vue'
import CartSidebar    from './components/CartSidebar.vue'
import FooterSection  from './components/FooterSection.vue'

const cartOpen   = ref<boolean>(false)
const searchQuery = ref<string>('')

function handleSearch(query: string): void {
  searchQuery.value = query
  setTimeout(() => {
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Navbar: fixed at top, emits openCart and search -->
    <NavBar
      @openCart="cartOpen = true"
      @search="handleSearch"
    />

    <!-- All page sections in order -->
    <main>
      <HeroSection />
      <DeliciousOffer />
      <CoffeeHerald />
      <StatsSection />
      <OnlineCoffeeShop />
      <PastrySection />
      <AvailableInShop :search-query="searchQuery" />
    </main>

    <FooterSection />

    <!-- Cart Sidebar (slides in from right) -->
    <CartSidebar :open="cartOpen" @close="cartOpen = false" />
  </div>
</template>