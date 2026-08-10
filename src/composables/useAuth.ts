import { computed, ref } from 'vue'
import type { CustomerAccount, PublicCustomer } from '../types'

const ACCOUNTS_KEY = 'corretto-customer-accounts'
const SESSION_KEY = 'corretto-customer-session'

function readAccounts(): CustomerAccount[] {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '[]') as CustomerAccount[]
  } catch {
    return []
  }
}

function saveAccounts(accounts: CustomerAccount[]): void {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
}

function toPublic(account: CustomerAccount | null): PublicCustomer | null {
  if (!account) return null
  const { passwordHash: _passwordHash, ...safe } = account
  return safe
}

async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest)).map(byte => byte.toString(16).padStart(2, '0')).join('')
}

const accounts = ref<CustomerAccount[]>(readAccounts())
const savedSession = localStorage.getItem(SESSION_KEY)
const currentAccount = ref<CustomerAccount | null>(
  savedSession ? accounts.value.find(account => account.id === savedSession) ?? null : null
)

export function useAuth() {
  const currentUser = computed<PublicCustomer | null>(() => toPublic(currentAccount.value))
  const isLoggedIn = computed<boolean>(() => currentAccount.value !== null)

  async function register(input: {
    name: string
    email: string
    password: string
    contact: string
    address: string
  }): Promise<{ ok: boolean; message: string }> {
    const name = input.name.trim()
    const email = input.email.trim().toLowerCase()
    const contact = input.contact.trim()
    const address = input.address.trim()

    if (!name || !email || !contact || !address) {
      return { ok: false, message: 'Please complete all account details.' }
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return { ok: false, message: 'Please enter a valid email address.' }
    }
    if (input.password.length < 6) {
      return { ok: false, message: 'Password must contain at least 6 characters.' }
    }
    if (accounts.value.some(account => account.email === email)) {
      return { ok: false, message: 'An account already exists with this email.' }
    }

    const account: CustomerAccount = {
      id: `USR-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
      name,
      email,
      passwordHash: await hashPassword(input.password),
      contact,
      address,
      createdAt: new Date().toISOString()
    }

    accounts.value = [...accounts.value, account]
    saveAccounts(accounts.value)
    currentAccount.value = account
    localStorage.setItem(SESSION_KEY, account.id)
    return { ok: true, message: 'Account created successfully.' }
  }

  async function login(emailInput: string, password: string): Promise<{ ok: boolean; message: string }> {
    const email = emailInput.trim().toLowerCase()
    const passwordHash = await hashPassword(password)
    const account = accounts.value.find(item => item.email === email && item.passwordHash === passwordHash)

    if (!account) {
      return { ok: false, message: 'Incorrect email or password.' }
    }

    currentAccount.value = account
    localStorage.setItem(SESSION_KEY, account.id)
    return { ok: true, message: 'Login successful.' }
  }

  function logout(): void {
    currentAccount.value = null
    localStorage.removeItem(SESSION_KEY)
  }

  function updateProfile(input: { name: string; contact: string; address: string }): { ok: boolean; message: string } {
    if (!currentAccount.value) return { ok: false, message: 'Please log in first.' }

    const name = input.name.trim()
    const contact = input.contact.trim()
    const address = input.address.trim()
    if (!name || !contact || !address) {
      return { ok: false, message: 'Name, contact and address are required.' }
    }

    const updated: CustomerAccount = { ...currentAccount.value, name, contact, address }
    accounts.value = accounts.value.map(account => account.id === updated.id ? updated : account)
    saveAccounts(accounts.value)
    currentAccount.value = updated
    return { ok: true, message: 'Profile updated.' }
  }

  return { currentUser, isLoggedIn, register, login, logout, updateProfile }
}
