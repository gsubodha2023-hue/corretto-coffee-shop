<script setup lang="ts">
import { ref } from 'vue'
import { ShoppingCart, Search, Menu, X, Sun, Moon, Phone, Mail, MapPin, MessageCircle } from 'lucide-vue-next'
import { useCart } from '../composables/useCart'

const { totalItems } = useCart()

const mobileOpen   = ref<boolean>(false)
const searchOpen   = ref<boolean>(false)
const contactOpen  = ref<boolean>(false)
const searchInput  = ref<string>('')

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

function handleNavClick(link: string): void {
  if (link === 'SHOP') {
    scrollToShop()
  } else if (link === 'CONTACT US') {
    contactOpen.value = true
    mobileOpen.value  = false
  }
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
            @click.prevent="handleNavClick(link)"
            class="transition-colors duration-200"
            :class="link === 'CONTACT US'
              ? 'text-amber-400 hover:text-amber-300'
              : 'hover:text-amber-400'"
          >
            {{ link }}
          </a>
        </li>
      </ul>

      <!-- Right Icons -->
      <div class="flex items-center gap-4">

        <!-- Dark/Light Toggle -->
        <button
          @click="$emit('toggleDark')"
          :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          class="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/30 hover:border-amber-400 transition-all duration-300"
          :class="isDark ? 'bg-gray-800' : 'bg-white/10'"
        >
          <Sun  :size="14" :class="!isDark ? 'text-amber-400' : 'text-gray-500'" class="transition-colors"/>
          <div class="relative w-10 h-5 rounded-full transition-all duration-300"
               :class="isDark ? 'bg-amber-500' : 'bg-gray-400'">
            <div class="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-300"
                 :class="isDark ? 'left-5' : 'left-0.5'"/>
          </div>
          <Moon :size="14" :class="isDark ? 'text-amber-400' : 'text-gray-500'" class="transition-colors"/>
        </button>

        <!-- Cart -->
        <button @click="$emit('openCart')" class="relative hover:text-amber-400 transition-colors">
          <ShoppingCart :size="20" />
          <span v-if="totalItems > 0"
                class="absolute -top-2 -right-2 bg-amber-500 text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
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
          <button @click="handleSearch"
                  class="bg-amber-600 hover:bg-amber-500 px-6 py-2 rounded text-sm font-bold tracking-wider transition-colors">
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
            <a href="#" @click.prevent="handleNavClick(link)"
               class="transition-colors"
               :class="link === 'CONTACT US' ? 'text-amber-400' : 'hover:text-amber-400'">
              {{ link }}
            </a>
          </li>
        </ul>
        <!-- Mobile dark toggle -->
        <div class="flex items-center gap-3 pt-4 border-t border-white/10">
          <span class="text-xs text-white/60 tracking-widest">{{ isDark ? '🌙 DARK MODE' : '☀️ LIGHT MODE' }}</span>
          <button @click="$emit('toggleDark')"
                  class="relative w-10 h-5 rounded-full transition-all duration-300"
                  :class="isDark ? 'bg-amber-500' : 'bg-gray-400'">
            <div class="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-300"
                 :class="isDark ? 'left-5' : 'left-0.5'"/>
          </button>
        </div>
      </div>
    </transition>
  </nav>

  <!-- ===== CONTACT US MODAL ===== -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="contactOpen"
           class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
           @click.self="contactOpen = false">

        <Transition name="slide-up">
          <div v-if="contactOpen"
               class="relative w-full max-w-lg rounded-sm shadow-2xl overflow-hidden bg-white dark:bg-gray-900">

            <!-- Modal Header Image Banner -->
            <div class="relative h-40 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80"
                alt="Corretto Coffee"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-black/60"></div>
              <div class="absolute inset-0 flex items-center justify-center flex-col text-white text-center px-4">
                <div class="text-3xl mb-2">☕</div>
                <h2 class="text-2xl font-bold tracking-[0.2em]"
                    style="font-family:'Playfair Display',Georgia,serif;">
                  CONTACT US
                </h2>
                <p class="text-xs text-white/70 tracking-widest mt-1">WE ARE HAPPY TO HELP YOU</p>
              </div>
              <!-- Close X button -->
              <button
                @click="contactOpen = false"
                class="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
              >
                <X :size="16" />
              </button>
            </div>

            <!-- Contact Details -->
            <div class="p-8 space-y-5">

              <!-- Phone -->
              <div class="flex items-start gap-4 group">
                <div class="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors">
                  <Phone :size="18" class="text-amber-600" />
                </div>
                <div>
                  <p class="text-[10px] tracking-[0.25em] font-bold mb-1 text-gray-400 dark:text-gray-500">PHONE</p>
                  <a href="tel:0414166900"
                     class="block text-sm font-semibold text-gray-800 dark:text-white hover:text-amber-600 transition-colors">
                    0414 166 900
                  </a>
                  <a href="tel:0712289561"
                     class="block text-sm font-semibold text-gray-800 dark:text-white hover:text-amber-600 transition-colors">
                    0712 289 561
                  </a>
                </div>
              </div>

              <!-- WhatsApp -->
              <div class="flex items-start gap-4 group">
                <div class="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                  <MessageCircle :size="18" class="text-green-600" />
                </div>
                <div>
                  <p class="text-[10px] tracking-[0.25em] font-bold mb-1 text-gray-400 dark:text-gray-500">WHATSAPP</p>
                  <a :href="`https://wa.me/94712289561`" target="_blank"
                     class="text-sm font-semibold text-gray-800 dark:text-white hover:text-green-600 transition-colors flex items-center gap-2">
                    0712 289 561
                    <span class="text-[10px] bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full tracking-wide">
                      Chat Now
                    </span>
                  </a>
                </div>
              </div>

              <!-- Email -->
              <div class="flex items-start gap-4 group">
                <div class="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                  <Mail :size="18" class="text-blue-600" />
                </div>
                <div>
                  <p class="text-[10px] tracking-[0.25em] font-bold mb-1 text-gray-400 dark:text-gray-500">EMAIL</p>
                  <a href="mailto:correttocoffee@gmail.com"
                     class="text-sm font-semibold text-gray-800 dark:text-white hover:text-blue-600 transition-colors">
                    correttocoffee@gmail.com
                  </a>
                </div>
              </div>

              <!-- Address -->
              <div class="flex items-start gap-4 group">
                <div class="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-100 transition-colors">
                  <MapPin :size="18" class="text-rose-600" />
                </div>
                <div>
                  <p class="text-[10px] tracking-[0.25em] font-bold mb-1 text-gray-400 dark:text-gray-500">ADDRESS</p>
                  <p class="text-sm font-semibold text-gray-800 dark:text-white leading-relaxed">
                    No.45, Wakwella Road,<br/>
                    Galle, Southern Province,<br/>
                    Sri Lanka.
                  </p>
                </div>
              </div>

              <!-- Divider -->
              <div class="border-t border-gray-100 dark:border-gray-700 pt-5">
                <p class="text-[10px] tracking-[0.2em] text-center text-gray-400 dark:text-gray-500 mb-4">
                  WORKING HOURS — MONDAY TO SUNDAY — 8:00AM TO 10:00PM
                </p>

                <!-- Action buttons -->
                <div class="grid grid-cols-2 gap-3">
                  <a href="tel:0414166900"
                     class="flex items-center justify-center gap-2 py-3 text-xs font-bold tracking-wider text-white rounded-sm transition-colors bg-coffee-dark hover:bg-amber-700">
                    <Phone :size="14" /> CALL NOW
                  </a>
                  <a :href="`https://wa.me/94712289561`" target="_blank"
                     class="flex items-center justify-center gap-2 py-3 text-xs font-bold tracking-wider text-white rounded-sm transition-colors bg-green-600 hover:bg-green-500">
                    <MessageCircle :size="14" /> WHATSAPP
                  </a>
                </div>
              </div>
            </div>

          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
  <!-- ===== END CONTACT MODAL ===== -->

</template>

<style scoped>
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.3s ease; }
.slide-down-enter-from, .slide-down-leave-to { transform: translateY(-10px); opacity: 0; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-up-enter-active, .slide-up-leave-active { transition: all 0.35s ease; }
.slide-up-enter-from, .slide-up-leave-to { transform: translateY(30px); opacity: 0; }
</style>