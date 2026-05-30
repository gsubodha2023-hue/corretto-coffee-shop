<script setup lang="ts">
import { ref } from 'vue'
import { ShoppingCart, Search, Menu, X, Sun, Moon, Phone, Mail, MapPin, MessageCircle } from 'lucide-vue-next'
import { useCart } from '../composables/useCart'

const { totalItems } = useCart()

const mobileOpen   = ref<boolean>(false)
const searchOpen   = ref<boolean>(false)
const searchInput  = ref<string>('')

// Modal states
const contactOpen  = ref<boolean>(false)
const aboutOpen    = ref<boolean>(false)
const servicesOpen = ref<boolean>(false)
const blogOpen     = ref<boolean>(false)

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

function handleNavClick(link: string): void {
  mobileOpen.value = false
  if (link === 'HOME') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else if (link === 'SHOP') {
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
  } else if (link === 'CONTACT US') {
    contactOpen.value = true
  } else if (link === 'ABOUT US') {
    aboutOpen.value = true
  } else if (link === 'SERVICES') {
    servicesOpen.value = true
  } else if (link === 'BLOG') {
    blogOpen.value = true
  }
}

// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'The Art of Perfect Espresso',
    date: 'May 15, 2025',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=80',
    excerpt: 'Discover the secrets behind pulling the perfect espresso shot. From grind size to water temperature, every detail matters in creating that rich, balanced cup.',
    content: 'A perfect espresso requires freshly ground beans, precise water temperature of 90-96°C, and 25-30 seconds of extraction time. Our baristas train daily to master this craft for every single cup we serve.'
  },
  {
    id: 2,
    title: 'Coffee Origins: From Farm to Cup',
    date: 'April 28, 2025',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80',
    excerpt: 'Journey through the world of coffee origins. Learn how geography, climate, and cultivation methods shape the unique flavors in your favorite brew.',
    content: 'Our beans are sourced directly from farms in Ethiopia, Colombia, India, and beyond. Each origin brings unique tasting notes — fruity, floral, nutty, or chocolatey — that make every cup a new experience.'
  },
  {
    id: 3,
    title: 'Pairing Coffee with Pastries',
    date: 'April 10, 2025',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    excerpt: 'Unlock the perfect pairing of coffee and pastries. Our expert baristas guide you through the best combinations for the ultimate café experience.',
    content: 'A dark roast pairs beautifully with chocolate lava cake, while a light Ethiopian brew complements a flaky croissant. Explore our pastry menu designed specifically to match our coffee offerings.'
  }
]

// Services data
const services = [
  {
    id: 1,
    icon: '☕',
    title: 'DINE-IN SERVICE',
    description: 'Enjoy your coffee in our cozy, welcoming café atmosphere. Comfortable seating, relaxing ambiance, and top-quality coffee await you every day from 8:00 AM to 10:00 PM.'
  },
  {
    id: 2,
    icon: '🛍️',
    title: 'TAKEAWAY SERVICE',
    description: 'In a hurry? Our speedy takeaway service ensures your coffee and pastries are prepared fresh, hygienically, and quickly so you can enjoy quality on the go.'
  },
  {
    id: 3,
    icon: '🚚',
    title: 'HOME DELIVERY',
    description: 'Order our premium roasted coffee beans and specialty products online. We deliver fresh coffee packs directly to your doorstep across Sri Lanka.'
  },
  {
    id: 4,
    icon: '🎂',
    title: 'CATERING & EVENTS',
    description: 'Planning a special event? We offer professional coffee catering for corporate meetings, parties, and celebrations with our skilled baristas and premium equipment.'
  },
  {
    id: 5,
    icon: '🫘',
    title: 'COFFEE BEAN SALES',
    description: 'Purchase our premium roasted coffee beans — America, England, Australia, and India blends — to brew at home. Available in different grind sizes for all brewing methods.'
  },
  {
    id: 6,
    icon: '🎓',
    title: 'BARISTA TRAINING',
    description: 'Learn the art of coffee making with our experienced baristas. We offer beginner and advanced training sessions for coffee enthusiasts and aspiring professionals.'
  }
]

const selectedBlog = ref<typeof blogPosts[0] | null>(null)
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm text-white">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

      <!-- Logo -->
      <div class="flex items-center gap-2 shrink-0 cursor-pointer" @click="handleNavClick('HOME')">
        <div class="text-2xl">☕</div>
        <div class="border-2 border-white px-4 py-1 font-bold text-base tracking-[0.3em]">CORRETTO</div>
      </div>

      <!-- Desktop Nav -->
      <ul class="hidden lg:flex gap-8 text-xs tracking-widest">
        <li v-for="link in navLinks" :key="link">
          <a href="#" @click.prevent="handleNavClick(link)"
             class="transition-colors duration-200 hover:text-amber-400"
             :class="link === 'CONTACT US' ? 'text-amber-400' : ''">
            {{ link }}
          </a>
        </li>
      </ul>

      <!-- Right Icons -->
      <div class="flex items-center gap-4">
        <!-- Dark/Light Toggle -->
        <button @click="$emit('toggleDark')"
                class="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/30 hover:border-amber-400 transition-all duration-300"
                :class="isDark ? 'bg-gray-800' : 'bg-white/10'">
          <Sun  :size="14" :class="!isDark ? 'text-amber-400' : 'text-gray-500'" class="transition-colors"/>
          <div class="relative w-10 h-5 rounded-full transition-all duration-300" :class="isDark ? 'bg-amber-500' : 'bg-gray-400'">
            <div class="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-300" :class="isDark ? 'left-5' : 'left-0.5'"/>
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
          <X v-if="mobileOpen" :size="22" /><Menu v-else :size="22" />
        </button>
      </div>
    </div>

    <!-- Search Bar -->
    <transition name="slide-down">
      <div v-if="searchOpen" class="bg-black/95 border-t border-white/10 px-6 py-3">
        <div class="max-w-7xl mx-auto flex gap-3">
          <input v-model="searchInput" @keyup.enter="handleSearch" type="text"
                 placeholder="Search coffee, pastry, products..."
                 class="flex-1 bg-white/10 text-white placeholder-white/40 px-4 py-2 rounded text-sm outline-none focus:ring-1 focus:ring-amber-400"/>
          <button @click="handleSearch" class="bg-amber-600 hover:bg-amber-500 px-6 py-2 rounded text-sm font-bold tracking-wider transition-colors">SEARCH</button>
        </div>
      </div>
    </transition>

    <!-- Mobile Menu -->
    <transition name="slide-down">
      <div v-if="mobileOpen" class="lg:hidden bg-black/95 border-t border-white/10 px-6 py-4">
        <ul class="flex flex-col gap-5 text-xs tracking-widest mb-5">
          <li v-for="link in navLinks" :key="link">
            <a href="#" @click.prevent="handleNavClick(link)" class="hover:text-amber-400 transition-colors"
               :class="link === 'CONTACT US' ? 'text-amber-400' : ''">{{ link }}</a>
          </li>
        </ul>
        <div class="flex items-center gap-3 pt-4 border-t border-white/10">
          <span class="text-xs text-white/60 tracking-widest">{{ isDark ? '🌙 DARK' : '☀️ LIGHT' }}</span>
          <button @click="$emit('toggleDark')"
                  class="relative w-10 h-5 rounded-full transition-all duration-300"
                  :class="isDark ? 'bg-amber-500' : 'bg-gray-400'">
            <div class="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-300" :class="isDark ? 'left-5' : 'left-0.5'"/>
          </button>
        </div>
      </div>
    </transition>
  </nav>

  <!-- ============================== -->
  <!-- ABOUT US MODAL                 -->
  <!-- ============================== -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="aboutOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
           @click.self="aboutOpen = false">
        <div class="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl bg-white dark:bg-gray-900">
          <!-- Header image -->
          <div class="relative h-48 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80" alt="About Corretto" class="w-full h-full object-cover"/>
            <div class="absolute inset-0 bg-black/60"></div>
            <div class="absolute inset-0 flex items-center justify-center flex-col text-white text-center">
              <div class="text-3xl mb-2">☕</div>
              <h2 class="text-2xl font-bold tracking-[0.2em]" style="font-family:'Playfair Display',Georgia,serif;">ABOUT US</h2>
              <p class="text-xs text-white/70 tracking-widest mt-1">OUR STORY SINCE 1997</p>
            </div>
            <button @click="aboutOpen = false" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white transition-colors"><X :size="16"/></button>
          </div>
          <!-- Content -->
          <div class="p-8 space-y-6">
            <div class="w-12 h-1 bg-amber-500 rounded-full"></div>
            <div class="space-y-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              <p>Welcome to <strong class="text-coffee-dark dark:text-amber-400">Corretto Coffee Shop</strong>, your home for premium quality coffee and freshly baked pastries in Galle, Sri Lanka. Established in 1997, we have been serving our community with passion, dedication, and the finest coffee for over 29 years.</p>
              <p>Our journey began with a simple dream — to create a warm, welcoming space where people could enjoy truly exceptional coffee. Today, we are proud to offer over <strong class="text-coffee-dark dark:text-amber-400">50 varieties of coffee</strong> and <strong class="text-coffee-dark dark:text-amber-400">30 varieties of pastries</strong>, all crafted with the highest quality ingredients sourced from around the world.</p>
              <p>At Corretto, we believe that great coffee is more than just a beverage — it is an experience. From our modern espresso machines to our friendly and skilled baristas, every element of our shop is designed to give you the best possible coffee moment.</p>
              <p>We source our premium coffee beans from America, England, Australia, and India, ensuring a diverse range of flavor profiles for every palate. Whether you prefer a bold, dark roast or a smooth, light blend, we have the perfect cup waiting for you.</p>
            </div>
            <!-- Stats -->
            <div class="grid grid-cols-3 gap-4 py-4 border-t border-b border-gray-100 dark:border-gray-700">
              <div class="text-center">
                <div class="text-3xl font-bold text-amber-600" style="font-family:'Playfair Display',Georgia,serif;">29+</div>
                <div class="text-[10px] tracking-[0.2em] text-gray-500 dark:text-gray-400 mt-1">YEARS EXPERIENCE</div>
              </div>
              <div class="text-center border-x border-gray-100 dark:border-gray-700">
                <div class="text-3xl font-bold text-amber-600" style="font-family:'Playfair Display',Georgia,serif;">50+</div>
                <div class="text-[10px] tracking-[0.2em] text-gray-500 dark:text-gray-400 mt-1">COFFEE VARIETIES</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-amber-600" style="font-family:'Playfair Display',Georgia,serif;">30+</div>
                <div class="text-[10px] tracking-[0.2em] text-gray-500 dark:text-gray-400 mt-1">PASTRY VARIETIES</div>
              </div>
            </div>
            <!-- Location -->
            <div class="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-sm">
              <MapPin :size="18" class="text-amber-600 mt-0.5 flex-shrink-0"/>
              <div>
                <p class="text-xs font-bold tracking-widest text-amber-700 dark:text-amber-400 mb-1">FIND US</p>
                <p class="text-sm text-gray-600 dark:text-gray-300">No.45, Wakwella Road, Galle, Southern Province, Sri Lanka.</p>
                <p class="text-xs text-gray-400 mt-1">Open: Monday–Sunday, 8:00 AM – 10:00 PM</p>
              </div>
            </div>
            <button @click="aboutOpen = false"
                    class="w-full py-3 text-xs font-bold tracking-[0.3em] text-white transition-colors bg-coffee-dark hover:bg-amber-700">
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>

  <!-- ============================== -->
  <!-- SERVICES MODAL                 -->
  <!-- ============================== -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="servicesOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
           @click.self="servicesOpen = false">
        <div class="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl bg-white dark:bg-gray-900">
          <!-- Header -->
          <div class="relative h-48 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80" alt="Services" class="w-full h-full object-cover"/>
            <div class="absolute inset-0 bg-black/60"></div>
            <div class="absolute inset-0 flex items-center justify-center flex-col text-white text-center">
              <div class="text-3xl mb-2">🛎️</div>
              <h2 class="text-2xl font-bold tracking-[0.2em]" style="font-family:'Playfair Display',Georgia,serif;">OUR SERVICES</h2>
              <p class="text-xs text-white/70 tracking-widest mt-1">EVERYTHING WE OFFER</p>
            </div>
            <button @click="servicesOpen = false" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white transition-colors"><X :size="16"/></button>
          </div>
          <!-- Services Grid -->
          <div class="p-8">
            <div class="w-12 h-1 bg-amber-500 rounded-full mb-6"></div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div v-for="service in services" :key="service.id"
                   class="flex gap-4 p-4 rounded-sm border transition-colors border-gray-100 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/10">
                <div class="text-3xl flex-shrink-0">{{ service.icon }}</div>
                <div>
                  <h3 class="font-bold text-xs tracking-[0.2em] mb-2 text-coffee-dark dark:text-amber-400">{{ service.title }}</h3>
                  <p class="text-xs leading-relaxed text-gray-500 dark:text-gray-400">{{ service.description }}</p>
                </div>
              </div>
            </div>
            <!-- Contact CTA -->
            <div class="mt-6 bg-coffee-dark dark:bg-gray-800 p-5 rounded-sm text-center">
              <p class="text-white text-sm font-bold tracking-wider mb-1">📞 CALL US FOR MORE DETAILS</p>
              <p class="text-amber-400 text-sm font-bold">0414 166 900 / 0712 289 561</p>
            </div>
            <button @click="servicesOpen = false"
                    class="w-full mt-5 py-3 text-xs font-bold tracking-[0.3em] text-white transition-colors bg-coffee-dark hover:bg-amber-700">
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>

  <!-- ============================== -->
  <!-- BLOG MODAL                     -->
  <!-- ============================== -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="blogOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
           @click.self="blogOpen = false; selectedBlog = null">
        <div class="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl bg-white dark:bg-gray-900">

          <!-- Blog list view -->
          <div v-if="!selectedBlog">
            <div class="relative h-48 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80" alt="Blog" class="w-full h-full object-cover"/>
              <div class="absolute inset-0 bg-black/60"></div>
              <div class="absolute inset-0 flex items-center justify-center flex-col text-white text-center">
                <div class="text-3xl mb-2">📝</div>
                <h2 class="text-2xl font-bold tracking-[0.2em]" style="font-family:'Playfair Display',Georgia,serif;">COFFEE BLOG</h2>
                <p class="text-xs text-white/70 tracking-widest mt-1">STORIES FROM OUR BARISTAS</p>
              </div>
              <button @click="blogOpen = false" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white transition-colors"><X :size="16"/></button>
            </div>
            <div class="p-8">
              <div class="w-12 h-1 bg-amber-500 rounded-full mb-6"></div>
              <div class="space-y-5">
                <div v-for="post in blogPosts" :key="post.id"
                     class="flex gap-4 cursor-pointer group p-3 rounded-sm border transition-all border-transparent hover:border-amber-300 dark:hover:border-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/10"
                     @click="selectedBlog = post">
                  <img :src="post.image" :alt="post.title" class="w-24 h-20 object-cover rounded-sm flex-shrink-0 group-hover:scale-105 transition-transform"/>
                  <div class="flex-1 min-w-0">
                    <p class="text-[10px] tracking-[0.2em] text-amber-600 mb-1">{{ post.date }}</p>
                    <h3 class="font-bold text-sm text-coffee-dark dark:text-white mb-2 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">{{ post.title }}</h3>
                    <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">{{ post.excerpt }}</p>
                    <span class="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider text-amber-600 mt-2">READ MORE →</span>
                  </div>
                </div>
              </div>
              <button @click="blogOpen = false"
                      class="w-full mt-6 py-3 text-xs font-bold tracking-[0.3em] text-white transition-colors bg-coffee-dark hover:bg-amber-700">
                CLOSE
              </button>
            </div>
          </div>

          <!-- Single blog post view -->
          <div v-else>
            <div class="relative h-48 overflow-hidden">
              <img :src="selectedBlog.image" :alt="selectedBlog.title" class="w-full h-full object-cover"/>
              <div class="absolute inset-0 bg-black/60"></div>
              <div class="absolute inset-0 flex items-end p-6">
                <div class="text-white">
                  <p class="text-[10px] tracking-[0.2em] text-amber-400 mb-2">{{ selectedBlog.date }}</p>
                  <h2 class="text-xl font-bold" style="font-family:'Playfair Display',Georgia,serif;">{{ selectedBlog.title }}</h2>
                </div>
              </div>
              <button @click="selectedBlog = null" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white transition-colors"><X :size="16"/></button>
            </div>
            <div class="p-8">
              <div class="w-12 h-1 bg-amber-500 rounded-full mb-6"></div>
              <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-300 mb-4">{{ selectedBlog.excerpt }}</p>
              <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{{ selectedBlog.content }}</p>
              <div class="flex gap-3 mt-8">
                <button @click="selectedBlog = null"
                        class="flex-1 py-3 text-xs font-bold tracking-[0.3em] transition-colors border border-coffee-dark text-coffee-dark dark:border-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                  ← BACK
                </button>
                <button @click="blogOpen = false; selectedBlog = null"
                        class="flex-1 py-3 text-xs font-bold tracking-[0.3em] text-white transition-colors bg-coffee-dark hover:bg-amber-700">
                  CLOSE
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>

  <!-- ============================== -->
  <!-- CONTACT US MODAL               -->
  <!-- ============================== -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="contactOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
           @click.self="contactOpen = false">
        <div class="relative w-full max-w-lg rounded-sm shadow-2xl overflow-hidden bg-white dark:bg-gray-900">
          <div class="relative h-40 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80" alt="Contact" class="w-full h-full object-cover"/>
            <div class="absolute inset-0 bg-black/60"></div>
            <div class="absolute inset-0 flex items-center justify-center flex-col text-white text-center px-4">
              <div class="text-3xl mb-2">☕</div>
              <h2 class="text-2xl font-bold tracking-[0.2em]" style="font-family:'Playfair Display',Georgia,serif;">CONTACT US</h2>
              <p class="text-xs text-white/70 tracking-widest mt-1">WE ARE HAPPY TO HELP YOU</p>
            </div>
            <button @click="contactOpen = false" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white transition-colors"><X :size="16"/></button>
          </div>
          <div class="p-8 space-y-5">
            <div class="flex items-start gap-4 group">
              <div class="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                <Phone :size="18" class="text-amber-600" />
              </div>
              <div>
                <p class="text-[10px] tracking-[0.25em] font-bold mb-1 text-gray-400 dark:text-gray-500">PHONE</p>
                <a href="tel:0414166900" class="block text-sm font-semibold text-gray-800 dark:text-white hover:text-amber-600 transition-colors">0414 166 900</a>
                <a href="tel:0712289561" class="block text-sm font-semibold text-gray-800 dark:text-white hover:text-amber-600 transition-colors">0712 289 561</a>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle :size="18" class="text-green-600" />
              </div>
              <div>
                <p class="text-[10px] tracking-[0.25em] font-bold mb-1 text-gray-400 dark:text-gray-500">WHATSAPP</p>
                <a :href="`https://wa.me/94712289561`" target="_blank"
                   class="text-sm font-semibold text-gray-800 dark:text-white hover:text-green-600 transition-colors flex items-center gap-2">
                  0712 289 561
                  <span class="text-[10px] bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">Chat Now</span>
                </a>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                <Mail :size="18" class="text-blue-600" />
              </div>
              <div>
                <p class="text-[10px] tracking-[0.25em] font-bold mb-1 text-gray-400 dark:text-gray-500">EMAIL</p>
                <a href="mailto:correttocoffee@gmail.com" class="text-sm font-semibold text-gray-800 dark:text-white hover:text-blue-600 transition-colors">correttocoffee@gmail.com</a>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center flex-shrink-0">
                <MapPin :size="18" class="text-rose-600" />
              </div>
              <div>
                <p class="text-[10px] tracking-[0.25em] font-bold mb-1 text-gray-400 dark:text-gray-500">ADDRESS</p>
                <p class="text-sm font-semibold text-gray-800 dark:text-white leading-relaxed">
                  No.45, Wakwella Road,<br/>Galle, Southern Province, Sri Lanka.
                </p>
              </div>
            </div>
            <div class="border-t border-gray-100 dark:border-gray-700 pt-5">
              <p class="text-[10px] tracking-[0.2em] text-center text-gray-400 dark:text-gray-500 mb-4">
                WORKING HOURS — MONDAY TO SUNDAY — 8:00AM TO 10:00PM
              </p>
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
      </div>
    </Transition>
  </Teleport>

</template>

<style scoped>
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.3s ease; }
.slide-down-enter-from, .slide-down-leave-to { transform: translateY(-10px); opacity: 0; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>