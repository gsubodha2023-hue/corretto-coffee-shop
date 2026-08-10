<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { X, LogOut, PackageCheck, UserRound } from 'lucide-vue-next'
import { useAuth } from '../composables/useAuth.ts'
import { useOrders } from '../composables/useOrders.ts'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: 'close'): void; (e: 'loggedOut'): void }>()

const { currentUser, logout, updateProfile } = useAuth()
const { orders } = useOrders()

const name = ref('')
const contact = ref('')
const address = ref('')
const message = ref('')

watch([() => props.open, currentUser], () => {
  if (props.open && currentUser.value) {
    name.value = currentUser.value.name
    contact.value = currentUser.value.contact
    address.value = currentUser.value.address
    message.value = ''
  }
}, { immediate: true })

const myOrders = computed(() => {
  if (!currentUser.value) return []
  return orders.value.filter(order => order.userId === currentUser.value?.id)
})

function saveProfile(): void {
  const result = updateProfile({ name: name.value, contact: contact.value, address: address.value })
  message.value = result.message
}

function doLogout(): void {
  logout()
  emit('loggedOut')
  emit('close')
}

function serviceLabel(service: string): string {
  if (service === 'dine-in') return 'Dine-in'
  if (service === 'takeaway') return 'Takeaway'
  return 'Delivery'
}

function formatDate(value: string): string {
  return new Date(value).toLocaleString()
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open && currentUser" class="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" @click.self="$emit('close')">
        <div class="w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-700">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center"><UserRound :size="20" class="text-amber-700 dark:text-amber-400" /></div>
              <div>
                <p class="text-[10px] tracking-[0.2em] font-bold text-amber-700 dark:text-amber-400">MY ACCOUNT</p>
                <h2 class="font-bold text-gray-900 dark:text-white">{{ currentUser.name }}</h2>
              </div>
            </div>
            <button @click="$emit('close')" class="text-gray-400 hover:text-amber-600"><X :size="22" /></button>
          </div>

          <div class="grid md:grid-cols-2 gap-6 p-6">
            <div class="space-y-4">
              <h3 class="font-bold text-sm tracking-[0.18em] text-gray-800 dark:text-white">PROFILE DETAILS</h3>
              <div>
                <label class="block text-[10px] font-bold tracking-wider text-gray-500 mb-1">NAME</label>
                <input v-model="name" class="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm dark:text-white" />
              </div>
              <div>
                <label class="block text-[10px] font-bold tracking-wider text-gray-500 mb-1">EMAIL</label>
                <input :value="currentUser.email" disabled class="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-sm text-gray-500" />
              </div>
              <div>
                <label class="block text-[10px] font-bold tracking-wider text-gray-500 mb-1">CONTACT</label>
                <input v-model="contact" class="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm dark:text-white" />
              </div>
              <div>
                <label class="block text-[10px] font-bold tracking-wider text-gray-500 mb-1">ADDRESS</label>
                <textarea v-model="address" rows="3" class="w-full resize-none px-3 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm dark:text-white"></textarea>
              </div>
              <p v-if="message" class="text-xs text-green-600 dark:text-green-400">{{ message }}</p>
              <button @click="saveProfile" class="w-full py-2.5 text-xs font-bold tracking-[0.2em] text-white bg-coffee-dark dark:bg-amber-600 hover:bg-amber-700">SAVE PROFILE</button>
              <button @click="doLogout" class="w-full py-2.5 flex justify-center items-center gap-2 text-xs font-bold tracking-[0.2em] border border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"><LogOut :size="15" /> LOGOUT</button>
            </div>

            <div>
              <div class="flex items-center gap-2 mb-4"><PackageCheck :size="18" class="text-amber-700 dark:text-amber-400" /><h3 class="font-bold text-sm tracking-[0.18em] text-gray-800 dark:text-white">MY ORDERS</h3></div>
              <div v-if="myOrders.length === 0" class="border border-dashed border-gray-300 dark:border-gray-700 p-8 text-center text-sm text-gray-400">No orders placed yet.</div>
              <div v-else class="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                <div v-for="order in myOrders" :key="order.id" class="border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/60">
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <p class="text-xs font-bold text-gray-900 dark:text-white">{{ order.id }}</p>
                      <p class="text-[10px] text-gray-400 mt-1">{{ formatDate(order.createdAt) }}</p>
                    </div>
                    <span class="text-[9px] font-bold tracking-wider px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">{{ order.status.toUpperCase() }}</span>
                  </div>
                  <div class="mt-3 text-xs text-gray-600 dark:text-gray-300 space-y-1">
                    <p><strong>Service:</strong> {{ serviceLabel(order.service) }}</p>
                    <p v-if="order.scheduledFor"><strong>Booked time:</strong> {{ formatDate(order.scheduledFor) }}</p>
                    <p><strong>Items:</strong> {{ order.items.reduce((sum, item) => sum + item.quantity, 0) }}</p>
                    <p class="font-bold text-amber-700 dark:text-amber-400">LKR {{ order.totalLkr.toLocaleString() }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
