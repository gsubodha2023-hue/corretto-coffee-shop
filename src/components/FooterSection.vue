<script setup lang="ts">
import footerLogoUrl from '../assets/footer-logo.png'

interface BrandLogo {
  name: string
  image: string
}

const brandLogos: BrandLogo[] = [
  { name: 'Café 1965',       image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=200&q=80' },
  { name: 'Coffee+',        image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=200&q=80' },
  { name: 'Coffee Town',    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=200&q=80' },
  { name: 'Coffee Estd',    image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=200&q=80' },
  { name: 'Coffee Masters', image: 'https://images.unsplash.com/photo-1521302200778-33500795e128?w=200&q=80' }
]

const socialLinks = [
  {
    id: 1,
    label: 'Facebook',
    href: 'https://facebook.com',
    color: 'hover:bg-blue-600',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>`
  },
  {
    id: 2,
    label: 'Email',
    href: 'mailto:correttocoffee@gmail.com',
    color: 'hover:bg-red-500',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>`
  },
  {
    id: 3,
    label: 'WhatsApp',
    href: 'https://wa.me/94712289561',
    color: 'hover:bg-green-500',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>`
  },
  {
    id: 4,
    label: 'Call',
    href: 'tel:0414166900',
    color: 'hover:bg-amber-500',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.95a16 16 0 0 0 6 6l.9-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/>
    </svg>`
  },
  {
    id: 5,
    label: 'Instagram',
    href: 'https://instagram.com',
    color: 'hover:bg-pink-600',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>`
  }
]
</script>

<template>
  <footer>

    <!-- Brand Logos Bar -->
    <div class="bg-white border-t border-b border-gray-100 py-10">
      <div class="max-w-6xl mx-auto px-6">
        <div class="flex flex-wrap items-center justify-around gap-8">
          <div v-for="brand in brandLogos" :key="brand.name"
               class="flex flex-col items-center gap-2 group cursor-pointer">
            <div class="w-20 h-20 rounded-full overflow-hidden border-2 border-coffee-mid/20 group-hover:border-coffee-mid transition-all duration-300 shadow-sm group-hover:shadow-md">
              <img :src="brand.image" :alt="brand.name"
                   class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"/>
            </div>
            <span class="text-coffee-mid/60 group-hover:text-coffee-mid transition-colors text-[10px] font-bold tracking-[0.2em] uppercase">
              {{ brand.name }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Footer (dark) -->
    <div class="relative py-16 text-white text-center"
         style="background: linear-gradient(rgba(0,0,0,0.88), rgba(0,0,0,0.92)),
                url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80') center/cover no-repeat;">

      <!-- Logo from assets -->
      <div class="flex items-center justify-center mb-6">
        <img :src="footerLogoUrl" alt="Corretto Coffee" class="h-16 w-auto object-contain"/>
      </div>

      <!-- Tagline -->
      <p class="text-gray-400 text-sm max-w-lg mx-auto mb-10 leading-relaxed">
        Thank you for visiting our online coffee shop. We're dedicated to bringing you fresh,
        high-quality coffee with every order. Stay connected for updates, special offers, and
        new flavors. Brew happiness, one cup at a time.
      </p>

      <!-- Info Blocks -->
      <div class="space-y-6 mb-10">
        <div>
          <h4 class="font-bold text-xs tracking-[0.3em] mb-2">WORKING HOURS</h4>
          <p class="text-gray-400 text-sm">Monday – Sunday &nbsp; 8:00AM to 10:00PM</p>
        </div>
        <div>
          <h4 class="font-bold text-xs tracking-[0.3em] mb-2">ADDRESS</h4>
          <p class="text-gray-400 text-sm">No.45, Wakwella Road, Galle, Southern Province, Sri Lanka.</p>
        </div>
        <div>
          <h4 class="font-bold text-xs tracking-[0.3em] mb-2">CALL US TODAY</h4>
          <p class="text-gray-400 text-sm">0414166900 / 0712289561</p>
        </div>
      </div>

      <!-- ✅ Social Icons — FB, Email, WhatsApp, Call, Instagram -->
      <div class="flex items-center justify-center gap-4 mb-10">
        <a
          v-for="social in socialLinks"
          :key="social.id"
          :href="social.href"
          :title="social.label"
          :target="social.href.startsWith('http') ? '_blank' : '_self'"
          class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 transition-all duration-300 hover:text-white hover:border-transparent hover:scale-110"
          :class="social.color"
          v-html="social.icon"
        />
      </div>

      <!-- Copyright -->
      <div class="border-t border-white/10 pt-6 text-xs text-gray-600 tracking-wider">
        ALL RIGHTS RESERVED &nbsp;©&nbsp; CORRETTO COFFEE 2024
      </div>
    </div>

  </footer>
</template>