import { computed, ref } from 'vue'

export type ReviewType = 'Product' | 'Service'

export interface CustomerReview {
  id: string
  name: string
  type: ReviewType
  subject: string
  rating: number
  comment: string
  createdAt: string
  adminReply?: string
}

const STORAGE_KEY = 'corretto-customer-reviews'

const starterReviews: CustomerReview[] = [
  {
    id: 'starter-1',
    name: 'Nimali',
    type: 'Product',
    subject: 'Ceylon Crest Coffee',
    rating: 5,
    comment: 'Fresh aroma, rich taste, and the pack arrived in very good condition.',
    createdAt: '2026-07-25T09:30:00.000Z',
    adminReply: 'Thank you for your kind review. We are happy you enjoyed our Ceylon coffee.'
  },
  {
    id: 'starter-2',
    name: 'Kasun',
    type: 'Service',
    subject: 'Takeaway service',
    rating: 4,
    comment: 'The order was prepared quickly and the staff were friendly.',
    createdAt: '2026-07-26T13:15:00.000Z'
  }
]

function loadReviews(): CustomerReview[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return starterReviews
    const parsed = JSON.parse(saved) as CustomerReview[]
    return Array.isArray(parsed) ? parsed : starterReviews
  } catch {
    return starterReviews
  }
}

const reviews = ref<CustomerReview[]>(loadReviews())

function saveReviews(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews.value))
}

export function useReviews() {
  const averageRating = computed<number>(() => {
    if (reviews.value.length === 0) return 0
    const total = reviews.value.reduce((sum, review) => sum + review.rating, 0)
    return Number((total / reviews.value.length).toFixed(1))
  })

  function addReview(input: Omit<CustomerReview, 'id' | 'createdAt'>): void {
    reviews.value.unshift({
      ...input,
      id: typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `review-${Date.now()}`,
      createdAt: new Date().toISOString()
    })
    saveReviews()
  }

  function deleteReview(id: string): void {
    reviews.value = reviews.value.filter(review => review.id !== id)
    saveReviews()
  }

  function replyToReview(id: string, reply: string): void {
    const review = reviews.value.find(item => item.id === id)
    if (!review) return
    review.adminReply = reply.trim()
    saveReviews()
  }

  return {
    reviews,
    averageRating,
    addReview,
    deleteReview,
    replyToReview
  }
}
