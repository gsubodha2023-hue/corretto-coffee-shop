import { ref, computed } from 'vue'
import type { CartItem, Product } from '../types'

// Reactive state outside component — persists across navigation
const cartItems = ref<CartItem[]>(
  JSON.parse(localStorage.getItem('corretto-cart') || '[]')
)

function saveToStorage(): void {
  localStorage.setItem('corretto-cart', JSON.stringify(cartItems.value))
}

export function useCart() {
  const addToCart = (product: Product): void => {
    const existing = cartItems.value.find(item => item.product.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      cartItems.value.push({ product, quantity: 1 })
    }
    saveToStorage()
  }

  const removeFromCart = (productId: number): void => {
    cartItems.value = cartItems.value.filter(item => item.product.id !== productId)
    saveToStorage()
  }

  const updateQuantity = (productId: number, quantity: number): void => {
    const item = cartItems.value.find(i => i.product.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
        saveToStorage()
      }
    }
  }

  const clearCart = (): void => {
    cartItems.value = []
    saveToStorage()
  }

  const totalItems = computed<number>(() =>
    cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalPrice = computed<number>(() =>
    cartItems.value.reduce((sum, item) => sum + (item.product.price * 320 * item.quantity), 0)
  )

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  }
}