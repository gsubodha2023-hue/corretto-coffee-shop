<script setup lang="ts">
import { ref, watch } from 'vue'
import { X, Eye, EyeOff, LogIn, UserPlus } from 'lucide-vue-next'
import { useAuth } from '../composables/useAuth'

const props = withDefaults(defineProps<{ open: boolean; initialMode?: 'login' | 'register' }>(), {
  initialMode: 'login'
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'authenticated'): void
}>()

const { login, register } = useAuth()

const mode = ref<'login' | 'register'>(props.initialMode)
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const contact = ref('')
const address = ref('')
const showPassword = ref(false)
const loading = ref(false)
const message = ref('')
const isError = ref(false)

watch(() => props.open, (open) => {
  if (open) {
    mode.value = props.initialMode
    message.value = ''
    isError.value = false
  }
})

watch(() => props.initialMode, value => {
  if (props.open) mode.value = value
})

function switchMode(next: 'login' | 'register'): void {
  mode.value = next
  message.value = ''
  isError.value = false
}

async function submit(): Promise<void> {
  loading.value = true
  message.value = ''
  isError.value = false

  try {
    if (mode.value === 'register') {
      if (password.value !== confirmPassword.value) {
        message.value = 'Passwords do not match.'
        isError.value = true
        return
      }

      const result = await register({
        name: name.value,
        email: email.value,
        password: password.value,
        contact: contact.value,
        address: address.value
      })
      message.value = result.message
      isError.value = !result.ok
      if (result.ok) {
        emit('authenticated')
        emit('close')
      }
    } else {
      const result = await login(email.value, password.value)
      message.value = result.message
      isError.value = !result.ok
      if (result.ok) {
        emit('authenticated')
        emit('close')
      }
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" @click.self="$emit('close')">
        <div class="w-full max-w-lg max-h-[92vh] overflow-y-auto bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-700">
            <div>
              <p class="text-[10px] tracking-[0.28em] font-bold text-amber-700 dark:text-amber-400">CORRETTO COFFEE</p>
              <h2 class="text-xl font-bold mt-1 text-gray-900 dark:text-white">{{ mode === 'login' ? 'Customer Login' : 'Create Account' }}</h2>
            </div>
            <button @click="$emit('close')" class="text-gray-400 hover:text-amber-600"><X :size="22" /></button>
          </div>

          <div class="grid grid-cols-2 border-b border-gray-100 dark:border-gray-700">
            <button @click="switchMode('login')" class="py-3 text-xs font-bold tracking-[0.18em] transition-colors"
                    :class="mode === 'login' ? 'bg-coffee-dark dark:bg-amber-600 text-white' : 'text-gray-500 dark:text-gray-400'">
              LOGIN
            </button>
            <button @click="switchMode('register')" class="py-3 text-xs font-bold tracking-[0.18em] transition-colors"
                    :class="mode === 'register' ? 'bg-coffee-dark dark:bg-amber-600 text-white' : 'text-gray-500 dark:text-gray-400'">
              CREATE ACCOUNT
            </button>
          </div>

          <form class="p-6 space-y-4" @submit.prevent="submit">
            <div v-if="mode === 'register'">
              <label class="block text-[10px] font-bold tracking-[0.18em] text-gray-500 mb-2">FULL NAME</label>
              <input v-model="name" required type="text" autocomplete="name" placeholder="Your full name"
                     class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-amber-400" />
            </div>

            <div>
              <label class="block text-[10px] font-bold tracking-[0.18em] text-gray-500 mb-2">EMAIL</label>
              <input v-model="email" required type="email" autocomplete="email" placeholder="you@example.com"
                     class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-amber-400" />
            </div>

            <div>
              <label class="block text-[10px] font-bold tracking-[0.18em] text-gray-500 mb-2">PASSWORD</label>
              <div class="relative">
                <input v-model="password" required :type="showPassword ? 'text' : 'password'" autocomplete="current-password"
                       placeholder="Minimum 6 characters"
                       class="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-amber-400" />
                <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-600">
                  <EyeOff v-if="showPassword" :size="18" /><Eye v-else :size="18" />
                </button>
              </div>
            </div>

            <template v-if="mode === 'register'">
              <div>
                <label class="block text-[10px] font-bold tracking-[0.18em] text-gray-500 mb-2">CONFIRM PASSWORD</label>
                <input v-model="confirmPassword" required :type="showPassword ? 'text' : 'password'" autocomplete="new-password" placeholder="Re-enter password"
                       class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-amber-400" />
              </div>

              <div>
                <label class="block text-[10px] font-bold tracking-[0.18em] text-gray-500 mb-2">CONTACT NUMBER</label>
                <input v-model="contact" required type="tel" autocomplete="tel" placeholder="07X XXX XXXX"
                       class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-amber-400" />
              </div>

              <div>
                <label class="block text-[10px] font-bold tracking-[0.18em] text-gray-500 mb-2">ADDRESS</label>
                <textarea v-model="address" required rows="3" autocomplete="street-address" placeholder="Your delivery address"
                          class="w-full resize-none px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-amber-400"></textarea>
              </div>
            </template>

            <p v-if="message" class="text-xs p-3" :class="isError ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'">
              {{ message }}
            </p>

            <button type="submit" :disabled="loading" class="w-full py-3.5 flex items-center justify-center gap-2 text-xs font-bold tracking-[0.24em] text-white bg-coffee-dark dark:bg-amber-600 hover:bg-amber-700 disabled:opacity-60">
              <UserPlus v-if="mode === 'register'" :size="16" /><LogIn v-else :size="16" />
              {{ loading ? 'PLEASE WAIT...' : (mode === 'register' ? 'CREATE ACCOUNT' : 'LOGIN') }}
            </button>

            <p class="text-[11px] text-center text-gray-400 leading-relaxed">
              You can view all products and shop information without logging in. Login is required only when you place an order.
            </p>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
