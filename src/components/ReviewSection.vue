<script setup lang="ts">
import { computed, ref } from 'vue'
import { MessageSquare, Reply, ShieldCheck, Star, Trash2 } from 'lucide-vue-next'
import { useReviews, type ReviewType } from '../composables/useReviews'

const { reviews, averageRating, addReview, deleteReview, replyToReview } = useReviews()

const name = ref<string>('')
const reviewType = ref<ReviewType>('Product')
const subject = ref<string>('')
const rating = ref<number>(5)
const comment = ref<string>('')
const submitted = ref<boolean>(false)
const filter = ref<'All' | ReviewType>('All')

const adminMode = ref<boolean>(false)
const adminPassword = ref<string>('')
const adminError = ref<string>('')
const replyDrafts = ref<Record<string, string>>({})

const filteredReviews = computed(() =>
  filter.value === 'All'
    ? reviews.value
    : reviews.value.filter(review => review.type === filter.value)
)

function submitReview(): void {
  if (!name.value.trim() || !subject.value.trim() || !comment.value.trim()) return

  addReview({
    name: name.value.trim(),
    type: reviewType.value,
    subject: subject.value.trim(),
    rating: rating.value,
    comment: comment.value.trim()
  })

  name.value = ''
  subject.value = ''
  comment.value = ''
  rating.value = 5
  submitted.value = true
  setTimeout(() => { submitted.value = false }, 2500)
}

function loginAdmin(): void {
  if (adminPassword.value === 'coffeeadmin') {
    adminMode.value = true
    adminError.value = ''
    adminPassword.value = ''
  } else {
    adminError.value = 'Incorrect admin password.'
  }
}

function submitReply(id: string): void {
  const reply = replyDrafts.value[id]?.trim()
  if (!reply) return
  replyToReview(id, reply)
  replyDrafts.value[id] = ''
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-LK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date))
}
</script>

<template>
  <section id="reviews" class="py-24 transition-colors duration-300 bg-coffee-beige dark:bg-gray-800">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-amber-700 dark:text-amber-400 mb-4">
          <MessageSquare :size="16" /> CUSTOMER COMMENTS
        </div>
        <h2 class="text-4xl font-bold tracking-[0.16em] mb-4 text-gray-900 dark:text-white"
            style="font-family:'Playfair Display',Georgia,serif;">
          REVIEWS & RATINGS
        </h2>
        <p class="text-sm max-w-2xl mx-auto text-gray-500 dark:text-gray-400">
          Write a comment about our products or service and read the experiences shared by other customers.
        </p>
        <div class="mt-5 inline-flex items-center gap-2 rounded-full bg-white dark:bg-gray-900 px-5 py-2 shadow-sm">
          <Star :size="18" class="fill-amber-400 text-amber-400" />
          <span class="font-bold text-gray-800 dark:text-white">{{ averageRating.toFixed(1) }}</span>
          <span class="text-xs text-gray-400">from {{ reviews.length }} reviews</span>
        </div>
      </div>

      <div class="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
        <div id="write-review" class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 md:p-8 shadow-sm">
          <h3 class="font-bold tracking-[0.2em] text-sm mb-6 text-coffee-dark dark:text-amber-400">
            WRITE A REVIEW
          </h3>

          <form class="space-y-5" @submit.prevent="submitReview">
            <div>
              <label class="block text-[10px] font-bold tracking-[0.2em] mb-2 text-gray-500">YOUR NAME</label>
              <input v-model="name" required maxlength="50" type="text" placeholder="Enter your name"
                     class="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-400" />
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-[10px] font-bold tracking-[0.2em] mb-2 text-gray-500">REVIEW TYPE</label>
                <select v-model="reviewType"
                        class="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-400">
                  <option value="Product">Product</option>
                  <option value="Service">Service</option>
                </select>
              </div>
              <div>
                <label class="block text-[10px] font-bold tracking-[0.2em] mb-2 text-gray-500">
                  {{ reviewType === 'Product' ? 'PRODUCT NAME' : 'SERVICE NAME' }}
                </label>
                <input v-model="subject" required maxlength="80" type="text"
                       :placeholder="reviewType === 'Product' ? 'Example: Ceylon Crest Coffee' : 'Example: Delivery service'"
                       class="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-400" />
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-bold tracking-[0.2em] mb-2 text-gray-500">YOUR RATING</label>
              <div class="flex items-center gap-2">
                <button v-for="star in 5" :key="star" type="button" @click="rating = star"
                        class="transition-transform hover:scale-110" :aria-label="`Give ${star} stars`">
                  <Star :size="28" :class="star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600'" />
                </button>
                <span class="ml-2 text-sm font-bold text-gray-600 dark:text-gray-300">{{ rating }}/5</span>
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-bold tracking-[0.2em] mb-2 text-gray-500">COMMENT</label>
              <textarea v-model="comment" required maxlength="500" rows="5" placeholder="Write your experience..."
                        class="w-full resize-none border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-400"></textarea>
              <div class="text-right text-[10px] text-gray-400 mt-1">{{ comment.length }}/500</div>
            </div>

            <button type="submit"
                    class="w-full py-3 text-xs font-bold tracking-[0.28em] text-white bg-coffee-dark dark:bg-amber-600 hover:bg-amber-700 transition-colors">
              {{ submitted ? '✓ REVIEW PUBLISHED' : 'PUBLISH REVIEW' }}
            </button>
          </form>

          <div class="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
            <div v-if="!adminMode">
              <div class="flex items-center gap-2 mb-3 text-gray-700 dark:text-gray-300">
                <ShieldCheck :size="17" />
                <span class="text-xs font-bold tracking-[0.16em]">ADMIN REVIEW TOOLS</span>
              </div>
              <div class="flex gap-2">
                <input v-model="adminPassword" @keyup.enter="loginAdmin" type="password" placeholder="Admin password"
                       class="flex-1 min-w-0 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-amber-400" />
                <button type="button" @click="loginAdmin"
                        class="px-4 py-2 text-[10px] font-bold tracking-wider text-white bg-gray-800 dark:bg-gray-700 hover:bg-amber-700">
                  LOGIN
                </button>
              </div>
              <p v-if="adminError" class="text-xs text-red-500 mt-2">{{ adminError }}</p>
            </div>
            <div v-else class="flex items-center justify-between gap-3 rounded-sm bg-green-50 dark:bg-green-900/20 p-3">
              <span class="text-xs font-bold text-green-700 dark:text-green-400">✓ Admin mode active</span>
              <button type="button" @click="adminMode = false" class="text-[10px] font-bold tracking-wider text-gray-500 hover:text-red-500">LOG OUT</button>
            </div>
          </div>
        </div>

        <div>
          <div class="flex flex-wrap items-center justify-between gap-3 mb-5">
            <h3 class="font-bold tracking-[0.2em] text-sm text-coffee-dark dark:text-amber-400">
              CUSTOMER REVIEWS
            </h3>
            <div class="flex gap-2">
              <button v-for="option in ['All', 'Product', 'Service'] as const" :key="option" @click="filter = option"
                      class="px-3 py-1.5 rounded-full border text-[10px] font-bold tracking-wider transition-colors"
                      :class="filter === option
                        ? 'bg-coffee-dark dark:bg-amber-600 text-white border-coffee-dark dark:border-amber-600'
                        : 'border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'">
                {{ option.toUpperCase() }}
              </button>
            </div>
          </div>

          <div v-if="filteredReviews.length === 0" class="text-center py-16 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
            <MessageSquare :size="34" class="mx-auto mb-3 text-gray-300" />
            <p class="text-sm text-gray-400">No reviews yet.</p>
          </div>

          <div class="space-y-4">
            <article v-for="review in filteredReviews" :key="review.id"
                     class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5 md:p-6 shadow-sm">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <div class="flex flex-wrap items-center gap-2 mb-1">
                    <h4 class="font-bold text-sm text-gray-900 dark:text-white">{{ review.name }}</h4>
                    <span class="text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full"
                          :class="review.type === 'Product' ? 'bg-amber-100 text-amber-800' : 'bg-teal-100 text-teal-800'">
                      {{ review.type.toUpperCase() }}
                    </span>
                  </div>
                  <p class="text-xs font-semibold text-amber-700 dark:text-amber-400">{{ review.subject }}</p>
                </div>
                <div class="text-right flex-shrink-0">
                  <div class="flex justify-end gap-0.5">
                    <Star v-for="star in 5" :key="star" :size="14"
                          :class="star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600'" />
                  </div>
                  <p class="text-[10px] text-gray-400 mt-1">{{ formatDate(review.createdAt) }}</p>
                </div>
              </div>

              <p class="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{{ review.comment }}</p>

              <div v-if="review.adminReply" class="mt-4 ml-3 border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/15 p-4">
                <div class="flex items-center gap-2 mb-1 text-amber-800 dark:text-amber-400">
                  <Reply :size="14" />
                  <span class="text-[10px] font-bold tracking-[0.16em]">CORRETTO ADMIN REPLY</span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-300">{{ review.adminReply }}</p>
              </div>

              <div v-if="adminMode" class="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div class="flex flex-col sm:flex-row gap-2">
                  <input v-model="replyDrafts[review.id]" @keyup.enter="submitReply(review.id)" type="text"
                         :placeholder="review.adminReply ? 'Replace admin reply...' : 'Write an admin reply...'"
                         class="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-amber-400" />
                  <button type="button" @click="submitReply(review.id)"
                          class="inline-flex items-center justify-center gap-1 px-4 py-2 text-[10px] font-bold tracking-wider text-white bg-amber-700 hover:bg-amber-600">
                    <Reply :size="13" /> REPLY
                  </button>
                  <button type="button" @click="deleteReview(review.id)"
                          class="inline-flex items-center justify-center gap-1 px-4 py-2 text-[10px] font-bold tracking-wider text-white bg-red-600 hover:bg-red-500">
                    <Trash2 :size="13" /> DELETE
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
