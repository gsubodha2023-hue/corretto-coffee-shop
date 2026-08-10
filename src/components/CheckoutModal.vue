<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { X, Clock3, MapPin, CheckCircle2, Coffee, ShoppingBag, Truck } from 'lucide-vue-next'
import { useAuth } from '../composables/useAuth.ts'
import { useCart } from '../composables/useCart'
import { useOrders } from '../composables/useOrders.ts'
import type { CartItem, CustomerOrder, OrderService } from '../types'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: 'close'): void; (e: 'orderPlaced'): void }>()

const { currentUser } = useAuth()
const { cartItems, totalPrice, clearCart } = useCart()
const { placeOrder } = useOrders()

const service = ref<OrderService>('takeaway')
const scheduledFor = ref('')
const contact = ref('')
const address = ref('')
const notes = ref('')
const error = ref('')
const placedOrder = ref<CustomerOrder | null>(null)

const serviceOptions: { key: OrderService; label: string; icon: unknown; description: string }[] = [
  { key: 'dine-in', label: 'Dine-in', icon: Coffee, description: 'Pre-order and enjoy it at the café.' },
  { key: 'takeaway', label: 'Takeaway', icon: ShoppingBag, description: 'Book a pickup time and skip the wait.' },
  { key: 'delivery', label: 'Delivery', icon: Truck, description: 'Send suitable products to your address.' }
]

function allowedServicesForItem(item: CartItem): OrderService[] {
  if (item.product.allowedServices?.length) return item.product.allowedServices
  if (item.product.category === 'coffee-bag') return ['takeaway', 'delivery']
  if (item.product.category === 'shop-coffee' && item.product.id >= 301 && item.product.id <= 308) return ['dine-in', 'takeaway']
  if (item.product.category === 'pastry') return ['dine-in', 'takeaway', 'delivery']
  return ['dine-in', 'takeaway', 'delivery']
}

const availableServices = computed<OrderService[]>(() => {
  if (cartItems.value.length === 0) return []
  return cartItems.value.reduce<OrderService[]>((common, item, index) => {
    const allowed = allowedServicesForItem(item)
    return index === 0 ? [...allowed] : common.filter(option => allowed.includes(option))
  }, [])
})

const containsHotCoffee = computed(() => cartItems.value.some(item =>
  item.product.isHotCoffee || (item.product.category === 'shop-coffee' && item.product.id >= 301 && item.product.id <= 308)
))
const needsBookingTime = computed(() => service.value === 'dine-in' || service.value === 'takeaway')
const formattedTotal = computed(() => `LKR ${Math.round(totalPrice.value).toLocaleString()}`)

function toLocalDateTimeValue(date: Date): string {
  const pad = (value: number) => value.toString().padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

const minimumBookingTime = computed(() => {
  const minimum = new Date(Date.now() + 20 * 60 * 1000)
  minimum.setSeconds(0, 0)
  return toLocalDateTimeValue(minimum)
})

watch(() => props.open, open => {
  if (!open) return
  placedOrder.value = null
  error.value = ''
  contact.value = currentUser.value?.contact ?? ''
  address.value = currentUser.value?.address ?? ''
  notes.value = ''
  scheduledFor.value = minimumBookingTime.value
  if (!availableServices.value.includes(service.value)) {
    service.value = availableServices.value[0] ?? 'takeaway'
  }
})

watch(availableServices, options => {
  if (options.length && !options.includes(service.value)) service.value = options[0]
})

function submitOrder(): void {
  error.value = ''
  if (!currentUser.value) {
    error.value = 'Please login before placing an order.'
    return
  }
  if (!cartItems.value.length) {
    error.value = 'Your cart is empty.'
    return
  }
  if (!availableServices.value.includes(service.value)) {
    error.value = 'This service is not available for all products in your cart.'
    return
  }
  if (!contact.value.trim()) {
    error.value = 'Please enter a contact number.'
    return
  }
  if (service.value === 'delivery' && !address.value.trim()) {
    error.value = 'Please enter a delivery address.'
    return
  }
  if (needsBookingTime.value) {
    if (!scheduledFor.value) {
      error.value = 'Please choose your booking time.'
      return
    }
    if (new Date(scheduledFor.value).getTime() < Date.now() + 19 * 60 * 1000) {
      error.value = 'Please book at least 20 minutes before your pickup or dine-in time.'
      return
    }
  }

  placedOrder.value = placeOrder({
    user: currentUser.value,
    cartItems: [...cartItems.value],
    service: service.value,
    scheduledFor: needsBookingTime.value ? new Date(scheduledFor.value).toISOString() : undefined,
    contact: contact.value,
    address: service.value === 'delivery' ? address.value : undefined,
    notes: notes.value
  })
  clearCart()
  emit('orderPlaced')
}

function closeModal(): void {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="fixed inset-0 z-[75] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm" @click.self="closeModal">
        <div class="w-full max-w-2xl max-h-[94vh] overflow-y-auto bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-700">
            <div>
              <p class="text-[10px] tracking-[0.26em] font-bold text-amber-700 dark:text-amber-400">SECURE CUSTOMER CHECKOUT</p>
              <h2 class="text-xl font-bold mt-1 text-gray-900 dark:text-white">{{ placedOrder ? 'Order Confirmed' : 'Choose how you want your order' }}</h2>
            </div>
            <button @click="closeModal" class="text-gray-400 hover:text-amber-600"><X :size="22" /></button>
          </div>

          <div v-if="placedOrder" class="p-8 text-center">
            <CheckCircle2 :size="58" class="mx-auto text-green-500 mb-4" />
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Thank you, {{ currentUser?.name }}!</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Your order has been confirmed.</p>
            <div class="mt-6 max-w-md mx-auto bg-gray-50 dark:bg-gray-800 p-5 text-left text-sm space-y-2">
              <p><strong>Order:</strong> {{ placedOrder.id }}</p>
              <p><strong>Service:</strong> {{ placedOrder.service === 'dine-in' ? 'Dine-in' : placedOrder.service === 'takeaway' ? 'Takeaway' : 'Delivery' }}</p>
              <p v-if="placedOrder.scheduledFor"><strong>Booked time:</strong> {{ new Date(placedOrder.scheduledFor).toLocaleString() }}</p>
              <p><strong>Total:</strong> LKR {{ placedOrder.totalLkr.toLocaleString() }}</p>
              <p><strong>Status:</strong> {{ placedOrder.status }}</p>
            </div>
            <button @click="closeModal" class="mt-6 px-8 py-3 text-xs font-bold tracking-[0.2em] text-white bg-coffee-dark dark:bg-amber-600 hover:bg-amber-700">DONE</button>
          </div>

          <form v-else class="p-6 space-y-6" @submit.prevent="submitOrder">
            <div v-if="containsHotCoffee" class="border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/15 p-4">
              <p class="font-bold text-sm text-amber-900 dark:text-amber-300">☕ Hot coffee is not available for delivery.</p>
              <p class="text-xs text-amber-800/80 dark:text-amber-300/80 mt-1">Choose dine-in or takeaway and book your time early. We prepare it close to your arrival so you can save waiting time and enjoy it fresh.</p>
            </div>

            <div>
              <h3 class="text-xs font-bold tracking-[0.18em] text-gray-700 dark:text-gray-300 mb-3">ORDER TYPE</h3>
              <div class="grid sm:grid-cols-3 gap-3">
                <button v-for="option in serviceOptions" :key="option.key" type="button" :disabled="!availableServices.includes(option.key)" @click="service = option.key"
                        class="p-4 text-left border transition-all disabled:opacity-35 disabled:cursor-not-allowed"
                        :class="service === option.key && availableServices.includes(option.key) ? 'border-amber-500 ring-2 ring-amber-200 dark:ring-amber-900 bg-amber-50 dark:bg-amber-900/10' : 'border-gray-200 dark:border-gray-700'">
                  <component :is="option.icon" :size="20" class="mb-2 text-amber-700 dark:text-amber-400" />
                  <p class="text-xs font-bold text-gray-900 dark:text-white">{{ option.label }}</p>
                  <p class="text-[10px] leading-relaxed text-gray-400 mt-1">{{ option.description }}</p>
                  <p v-if="!availableServices.includes(option.key)" class="text-[9px] font-bold text-red-500 mt-2">NOT AVAILABLE FOR THIS CART</p>
                </button>
              </div>
            </div>

            <div v-if="needsBookingTime" class="bg-gray-50 dark:bg-gray-800 p-4">
              <div class="flex items-center gap-2 mb-3"><Clock3 :size="18" class="text-amber-700 dark:text-amber-400" /><h3 class="text-xs font-bold tracking-[0.16em] text-gray-700 dark:text-gray-300">PRE-BOOK YOUR TIME</h3></div>
              <input v-model="scheduledFor" :min="minimumBookingTime" required type="datetime-local"
                     class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm" />
              <p class="text-[10px] text-gray-400 mt-2">Please select a time at least 20 minutes from now. This helps us prepare your order close to your arrival.</p>
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-[10px] font-bold tracking-wider text-gray-500 mb-2">CONTACT NUMBER</label>
                <input v-model="contact" required type="tel" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm dark:text-white" />
              </div>
              <div class="flex flex-col justify-end">
                <div class="bg-gray-50 dark:bg-gray-800 p-3 text-sm flex justify-between"><span class="text-gray-500">Order total</span><strong class="text-gray-900 dark:text-white">{{ formattedTotal }}</strong></div>
              </div>
            </div>

            <div v-if="service === 'delivery'">
              <label class="flex items-center gap-2 text-[10px] font-bold tracking-wider text-gray-500 mb-2"><MapPin :size="14" /> DELIVERY ADDRESS</label>
              <textarea v-model="address" required rows="3" class="w-full resize-none px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm dark:text-white"></textarea>
            </div>

            <div>
              <label class="block text-[10px] font-bold tracking-wider text-gray-500 mb-2">ORDER NOTES (OPTIONAL)</label>
              <textarea v-model="notes" rows="2" placeholder="Example: less sugar, no ice, call when ready..." class="w-full resize-none px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm dark:text-white"></textarea>
            </div>

            <p v-if="error" class="text-xs p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">{{ error }}</p>

            <button type="submit" class="w-full py-3.5 text-xs font-bold tracking-[0.24em] text-white bg-coffee-dark dark:bg-amber-600 hover:bg-amber-700">CONFIRM ORDER</button>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
