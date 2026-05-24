import { ref } from 'vue'
import type { Product, ProductsResponse } from '../types'

export function useProducts() {
  const products = ref<Product[]>([])
  const loading  = ref<boolean>(false)
  const error    = ref<string | null>(null)
  const total    = ref<number>(0)

  const fetchProducts = async (
    limit    : number = 8,
    skip     : number = 0,
    search   : string = ''
  ): Promise<void> => {
    loading.value = true
    error.value   = null
    try {
      const url = search
        ? `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`
        : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`

      const res          = await fetch(url)
      const data: ProductsResponse = await res.json()
      products.value = data.products
      total.value    = data.total
    } catch {
      error.value = 'Failed to load products. Please try again.'
    } finally {
      loading.value = false
    }
  }

  const fetchProductById = async (id: number): Promise<Product | null> => {
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`)
      return await res.json() as Product
    } catch {
      return null
    }
  }

  return { products, loading, error, total, fetchProducts, fetchProductById }
}