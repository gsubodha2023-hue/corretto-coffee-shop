// DummyJSON API Types
export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  thumbnail: string
  images: string[]
  rating: number
  stock: number
  brand?: string
  discountPercentage?: number
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

// Cart
export interface CartItem {
  product: Product
  quantity: number
}

// Static data types
export interface StaticCoffeeProduct {
  id: number
  name: string
  price: number
  image: string
  origin: string
  labelColor: string
}

export interface PastryItem {
  id: number
  name: string
  price: number
  image: string
}

export interface HeroSlide {
  id: number
  title: string
  description: string
  image: string
}