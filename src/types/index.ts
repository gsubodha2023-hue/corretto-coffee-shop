export type OrderService = 'dine-in' | 'takeaway' | 'delivery'

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
  originalPrice?: number
  allowedServices?: OrderService[]
  isHotCoffee?: boolean
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface CartItem {
  product: Product
  quantity: number
}

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

export interface CustomerAccount {
  id: string
  name: string
  email: string
  passwordHash: string
  contact: string
  address: string
  createdAt: string
}

export interface PublicCustomer {
  id: string
  name: string
  email: string
  contact: string
  address: string
  createdAt: string
}

export interface CustomerOrderItem {
  productId: number
  title: string
  quantity: number
  unitPriceLkr: number
}

export interface CustomerOrder {
  id: string
  userId: string
  createdAt: string
  service: OrderService
  scheduledFor?: string
  contact: string
  address?: string
  notes?: string
  items: CustomerOrderItem[]
  totalLkr: number
  status: 'Confirmed' | 'Preparing' | 'Ready' | 'Completed'
}
