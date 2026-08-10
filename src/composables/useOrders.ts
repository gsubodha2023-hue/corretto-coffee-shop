import { computed, ref } from 'vue'
import type { CartItem, CustomerOrder, OrderService, PublicCustomer } from '../types'

const ORDERS_KEY = 'corretto-customer-orders'

function readOrders(): CustomerOrder[] {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]') as CustomerOrder[]
  } catch {
    return []
  }
}

const orders = ref<CustomerOrder[]>(readOrders())

function saveOrders(): void {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders.value))
}

export function useOrders() {
  function placeOrder(input: {
    user: PublicCustomer
    cartItems: CartItem[]
    service: OrderService
    scheduledFor?: string
    contact: string
    address?: string
    notes?: string
  }): CustomerOrder {
    const items = input.cartItems.map(item => ({
      productId: item.product.id,
      title: item.product.title,
      quantity: item.quantity,
      unitPriceLkr: Math.round(item.product.price * 320)
    }))

    const order: CustomerOrder = {
      id: `COR-${Date.now().toString().slice(-8)}`,
      userId: input.user.id,
      createdAt: new Date().toISOString(),
      service: input.service,
      scheduledFor: input.scheduledFor,
      contact: input.contact,
      address: input.address,
      notes: input.notes?.trim() || undefined,
      items,
      totalLkr: items.reduce((sum, item) => sum + item.unitPriceLkr * item.quantity, 0),
      status: 'Confirmed'
    }

    orders.value = [order, ...orders.value]
    saveOrders()
    return order
  }

  function ordersForUser(userId: string) {
    return computed(() => orders.value.filter(order => order.userId === userId))
  }

  return { orders, placeOrder, ordersForUser }
}
