<script setup lang="ts">
import { ref } from 'vue'

interface HeraldItem {
  id: number
  title: string
  shortDesc: string
  fullDesc: string
  image: string
  fallback: string
}

const heralds: HeraldItem[] = [
  {
    id: 1,
    title: 'NEW TECHNOLOGY',
    shortDesc: 'Smart coffee machines use AI and automation for precise brewing control..',
    fullDesc: `Smart coffee machines use AI and automation for precise brewing control, helping our coffee shop deliver fresh, rich, and perfectly balanced coffee in every cup. We use modern espresso machines, advanced grinders, and temperature-controlled brewing systems to maintain high quality and consistent taste for both takeaway and dine-in customers.

Our skilled baristas combine technology with expert coffee-making techniques, including proper bean grinding, milk steaming, and brewing timing, to create smooth and flavorful beverages. Customers can enjoy a comfortable dining experience in our shop or quickly order takeaway drinks prepared with speed, hygiene, and care.

By using modern coffee technology and premium ingredients, we provide delicious coffee, excellent service, and a relaxing atmosphere for every customer.`,
    image: '/src/assets/coffee-machine.jpg',
    fallback: 'https://images.unsplash.com/photo-1516743619420-154b70a65fea?w=600&q=90'
  },
  {
    id: 2,
    title: 'FRIENDLY STAFF',
    shortDesc: 'Friendly staff warmly greet customers and provide excellent service every visit.',
    fullDesc: `Friendly staff warmly greet customers and provide excellent service during every visit, creating a welcoming and comfortable atmosphere in our coffee shop. Our team is always ready to help customers choose the perfect coffee, pastries, and beverages based on their preferences.

With positive attitudes, quick service, and professional communication, we ensure both dine-in and takeaway customers enjoy a pleasant experience. Our staff maintain cleanliness, respect customer needs, and work together to provide fast, reliable, and high-quality service.

Every customer feels valued and satisfied through our dedication to hospitality and care.`,
    image: '/src/assets/friendly-staff.avif',
    fallback: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&q=90'
  },
 {
 
    id: 3,
    title: 'FRESH COFFEE',
    shortDesc: 'Fresh hot and cold coffee is prepared daily with rich aroma and delicious taste.',
    fullDesc: `Fresh coffee is prepared daily using high-quality coffee beans to give every customer a rich aroma, smooth flavor, and enjoyable coffee experience.

Our customers can choose from a variety of freshly prepared hot and cold coffee drinks, including espresso, cappuccino, latte, iced coffee, iced latte, and other refreshing coffee beverages.

Hot coffee is available for dine-in and takeaway with advance booking, helping customers save valuable time. Cold coffee and suitable beverages are available for dine-in, takeaway, and delivery.

Along with our coffee, customers can enjoy freshly prepared pastries, cakes, snacks, and other products in a comfortable café environment.`,
    image: '/src/assets/Fresh_coffee.png',
    fallback: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=90'
  },
  {
    id: 4,
    title: 'HOME DELIVERY',
    shortDesc: 'Enjoy selected Corretto favorites delivered conveniently to your doorstep.',
    fullDesc: `Corretto Coffee Shop makes ordering easier with a convenient home delivery service for selected products. Customers can browse our available delivery items online, place an order, and receive coffee products, iced beverages, pastries, cakes, snacks, and other suitable favorites at their doorstep.

Our delivery service is designed to save customers valuable time while keeping orders fresh, carefully packed, and ready to enjoy. Delivery details, contact information, and the customer address are confirmed during checkout for a smooth ordering experience.

Fresh hot coffee is not offered for delivery so that its quality and serving temperature are protected. Hot coffee customers can instead choose dine-in or takeaway and pre-book a preferred time.`,
    image: '/src/assets/Home_delivery.png',
    fallback: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600&q=90'
  }
]

// Modal state
const showModal    = ref<boolean>(false)
const activeItem   = ref<HeraldItem | null>(null)

function openModal(item: HeraldItem): void {
  activeItem.value = item
  showModal.value  = true
  document.body.style.overflow = 'hidden'
}

function closeModal(): void {
  showModal.value  = false
  activeItem.value = null
  document.body.style.overflow = ''
}

function onImgError(e: Event, item: HeraldItem): void {
  const img = e.target as HTMLImageElement
  if (img.src !== item.fallback) img.src = item.fallback
}
</script>

<template>
  <section class="py-24 relative overflow-hidden transition-colors duration-300
                  bg-coffee-beige dark:bg-gray-800">

    <!-- Left decorative plant -->
    <div class="absolute top-0 left-0 w-40 h-full opacity-10 pointer-events-none">
      <svg viewBox="0 0 200 700" fill="none" class="w-full h-full">
        <path d="M40 700 Q60 500 80 380 Q100 260 60 120" stroke="#c8a27a" stroke-width="2" fill="none"/>
        <ellipse cx="95" cy="210" rx="45" ry="22" transform="rotate(-30 95 210)" stroke="#c8a27a" stroke-width="1.5" fill="none"/>
        <ellipse cx="72" cy="310" rx="40" ry="20" transform="rotate(20 72 310)" stroke="#c8a27a" stroke-width="1.5" fill="none"/>
        <ellipse cx="98" cy="400" rx="42" ry="21" transform="rotate(-15 98 400)" stroke="#c8a27a" stroke-width="1.5" fill="none"/>
        <circle cx="88" cy="200" r="5" stroke="#c8a27a" stroke-width="1" fill="none"/>
        <circle cx="78" cy="295" r="5" stroke="#c8a27a" stroke-width="1" fill="none"/>
      </svg>
    </div>

    <!-- Right decorative beans -->
    <div class="absolute bottom-10 right-6 opacity-10 pointer-events-none">
      <svg viewBox="0 0 130 100" fill="none" class="w-32">
        <ellipse cx="35" cy="45" rx="28" ry="17" transform="rotate(-20 35 45)" stroke="#c8a27a" stroke-width="1.5" fill="none"/>
        <path d="M12 38 Q35 48 58 38" stroke="#c8a27a" stroke-width="1" fill="none"/>
        <ellipse cx="90" cy="32" rx="25" ry="15" transform="rotate(15 90 32)" stroke="#c8a27a" stroke-width="1.5" fill="none"/>
        <path d="M68 28 Q90 38 112 28" stroke="#c8a27a" stroke-width="1" fill="none"/>
      </svg>
    </div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">

      <!-- Header -->
      <div class="text-center mb-14">
        <h2 class="text-4xl font-bold tracking-[0.2em] mb-4 transition-colors duration-300
                   text-gray-900 dark:text-white"
            style="font-family:'Playfair Display',Georgia,serif;">
          THE COFFEE HERALD
        </h2>
        <p class="text-sm max-w-xl mx-auto transition-colors duration-300
                  text-gray-600 dark:text-gray-400">
          Coffee herald means something that signals or announces coffee — like its aroma, culture,
          or importance in daily life.
        </p>
      </div>

      <!-- 4 Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
        <div
          v-for="item in heralds"
          :key="item.id"
          class="text-center group"
        >
          <!-- Image frame -->
          <div class="border-2 p-2 mb-5 max-w-[300px] mx-auto overflow-hidden transition-colors duration-300
                      border-coffee-mid/30 dark:border-gray-600">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              @error="(e) => onImgError(e, item)"
            />
          </div>

          <!-- Title -->
          <h3 class="font-bold text-sm tracking-[0.2em] mb-3 transition-colors duration-300
                     text-coffee-dark dark:text-amber-400">
            {{ item.title }}
          </h3>

          <!-- Short Description -->
          <p class="text-sm leading-relaxed mb-5 max-w-xs mx-auto transition-colors duration-300
                    text-gray-500 dark:text-gray-400">
            {{ item.shortDesc }}
          </p>

          <!-- READ MORE button — opens modal -->
          <button
            @click="openModal(item)"
            class="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] transition-colors group/btn
                   text-gray-800 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-400"
          >
            READ MORE
            <span class="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs
                         border border-current transition-all
                         bg-coffee-dark dark:bg-amber-600 text-white
                         group-hover/btn:bg-amber-700 dark:group-hover/btn:bg-amber-500">
              →
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- ===== MODAL POPUP ===== -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showModal && activeItem"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          @click.self="closeModal"
        >
          <Transition name="slide-up">
            <div
              v-if="showModal"
              class="relative w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden transition-colors duration-300
                     bg-white dark:bg-gray-900"
            >
              <!-- Modal Image -->
              <div class="relative h-56 overflow-hidden">
                <img
                  :src="activeItem.image"
                  :alt="activeItem.title"
                  class="w-full h-full object-cover"
                  @error="(e) => onImgError(e, activeItem!)"
                />
                <!-- Dark overlay on image -->
                <div class="absolute inset-0 bg-black/40"></div>
                <!-- Title on image -->
                <div class="absolute bottom-0 left-0 right-0 p-6">
                  <h3 class="text-2xl font-bold tracking-[0.2em] text-white"
                      style="font-family:'Playfair Display',Georgia,serif;">
                    {{ activeItem.title }}
                  </h3>
                </div>
                <!-- Close button -->
                <button
                  @click="closeModal"
                  class="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-lg transition-colors
                         bg-black/40 hover:bg-black/70"
                >
                  ✕
                </button>
              </div>

              <!-- Modal Content -->
              <div class="p-8">
                <!-- Decorative line -->
                <div class="w-12 h-1 bg-amber-500 mb-6 rounded-full"></div>

                <!-- Full description — split by newlines into paragraphs -->
                <div class="space-y-4">
                  <p
                    v-for="(para, idx) in activeItem.fullDesc.split('\n\n')"
                    :key="idx"
                    class="text-sm leading-relaxed transition-colors duration-300
                           text-gray-600 dark:text-gray-300"
                  >
                    {{ para }}
                  </p>
                </div>

                <!-- Close button at bottom -->
                <div class="mt-8 flex justify-end">
                  <button
                    @click="closeModal"
                    class="px-8 py-3 text-xs font-bold tracking-[0.3em] text-white transition-colors rounded-sm
                           bg-coffee-dark dark:bg-amber-600 hover:bg-amber-700 dark:hover:bg-amber-500"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
    <!-- ===== END MODAL ===== -->

  </section>
</template>

<style scoped>
/* Backdrop fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Modal slide up */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.35s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
</style>