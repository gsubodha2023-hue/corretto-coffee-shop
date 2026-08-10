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
import AuthModal        from './components/AuthModal.vue'
import AccountModal     from './components/AccountModal.vue'
import CheckoutModal    from './components/CheckoutModal.vue'
import { useAuth }      from './composables/useAuth'

const cartOpen    = ref<boolean>(false)
const searchQuery = ref<string>('')
const isDark      = ref<boolean>(false)
const authOpen     = ref<boolean>(false)
const accountOpen  = ref<boolean>(false)
const checkoutOpen = ref<boolean>(false)
const pendingCheckout = ref<boolean>(false)

const { isLoggedIn } = useAuth()

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


function openAuth(): void {
  pendingCheckout.value = false
  authOpen.value = true
}

function handleCheckout(): void {
  cartOpen.value = false
  if (isLoggedIn.value) {
    checkoutOpen.value = true
  } else {
    pendingCheckout.value = true
    authOpen.value = true
  }
}

function handleAuthenticated(): void {
  if (pendingCheckout.value) {
    pendingCheckout.value = false
    checkoutOpen.value = true
  }
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
      @openAuth="openAuth"
      @openAccount="accountOpen = true"
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
    <CartSidebar :open="cartOpen" @close="cartOpen = false" @checkout="handleCheckout" />
    <AuthModal :open="authOpen" @close="authOpen = false" @authenticated="handleAuthenticated" />
    <AccountModal :open="accountOpen" @close="accountOpen = false" />
    <CheckoutModal :open="checkoutOpen" @close="checkoutOpen = false" />
  </div>
</template>