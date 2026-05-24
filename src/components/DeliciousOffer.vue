<script setup lang="ts">
interface Offer {
  icon: string
  title: string
  description: string
}

const offers: Offer[] = [
  {
    icon: '☕',
    title: 'TYPES OF COFFEE',
    description: 'Coffee drinks are generally based on espresso or brewed methods, ranging from strong, black coffee to milk-heavy lattes.'
  },
  {
    icon: '🫘',
    title: 'BEAN VARIETIES',
    description: 'Over 100 coffee species exist, but commercial production mainly uses four beans: Arabica, Robusta, Liberica, and Excelsa worldwide.'
  },
  {
    icon: '🥐',
    title: 'COFFEE & PASTRY',
    description: 'Coffee and pastry are popular worldwide, combining rich coffee flavors with sweet baked treats, creating a delightful experience for any time.'
  },
  {
    icon: '🍵',
    title: 'COFFEE',
    description: 'Coffee is a popular beverage made from roasted beans, enjoyed worldwide for its rich flavor, aroma, and stimulating effects.'
  }
]
</script>

<template>
  <section class="py-24 bg-white border-t-4 border-coffee-mid/20">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold tracking-[0.2em] mb-6" style="font-family: 'Playfair Display', Georgia, serif;">
          OUR DELICIOUS OFFER
        </h2>
        <p class="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
          Our delicious coffee offering includes a variety of handcrafted beverages designed to satisfy any craving.
          We specialize in locally roasted, sustainably sourced coffee beans, featuring options such as dark, blonde, and Jamaican roasts.
        </p>
      </div>

      <!-- 4 Columns -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div
          v-for="offer in offers"
          :key="offer.title"
          class="text-center group hover:-translate-y-1 transition-transform duration-300"
        >
          <div class="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300 inline-block">
            {{ offer.icon }}
          </div>
          <h3 class="font-bold text-xs tracking-[0.2em] mb-3 text-coffee-dark">
            {{ offer.title }}
          </h3>
          <p class="text-gray-500 text-sm leading-relaxed">
            {{ offer.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>