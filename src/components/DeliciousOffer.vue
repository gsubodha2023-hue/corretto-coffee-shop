<script setup lang="ts">
import hotCoffeeIcon  from '../assets/type1.png'
import beanIcon       from '../assets/type-2.png'
import pastryIcon     from '../assets/type-3.png'
import iceCoffeeIcon  from '../assets/type-4.png'

interface Offer {
  id: number
  image: string
  title: string
  description: string
}

const offers: Offer[] = [
  {
    id: 1,
    image: hotCoffeeIcon,
    title: 'TYPES OF HOT COFFEE',
    description: 'Coffee drinks are generally based on espresso or brewed methods, ranging from strong, black coffee to milk-heavy lattes.'
  },
  {
    id: 2,
    image: beanIcon,
    title: 'BEAN VARIETIES',
    description: 'Over 100 coffee species exist, but commercial production mainly uses four beans: Arabica, Robusta, Liberica, and Excelsa worldwide.'
  },
  {
    id: 3,
    image: pastryIcon,
    title: 'PASTRY & CAKES',
    description: 'Coffee and pastry are popular worldwide, combining rich coffee flavors with sweet baked treats, creating a delightful experience for any time.'
  },
  {
    id: 4,
    image: iceCoffeeIcon,
    title: 'TYPES OF ICE COFFEE',
    description: 'Iced coffee drinks are refreshing cold beverages made from chilled espresso or brewed coffee, served over ice with milk, cream, or sweet syrups.'
  }
]
</script>

<template>
  <section class="py-24 border-t-4 border-coffee-mid/20 transition-colors duration-300
                  bg-white dark:bg-gray-900">
    <div class="max-w-6xl mx-auto px-6">

      <!-- Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold tracking-[0.2em] mb-6 transition-colors duration-300
                   text-gray-900 dark:text-white"
            style="font-family:'Playfair Display',Georgia,serif;">
          OUR DELICIOUS OFFER
        </h2>
        <p class="max-w-xl mx-auto text-sm leading-relaxed transition-colors duration-300
                  text-gray-500 dark:text-gray-400">
          Our delicious coffee offering includes a variety of handcrafted beverages designed to
          satisfy any craving. We specialize in locally roasted, sustainably sourced coffee beans.
        </p>
      </div>

      <!-- 4 Columns -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div
          v-for="offer in offers"
          :key="offer.id"
          class="text-center group hover:-translate-y-2 transition-all duration-300"
        >
          <!-- Custom image icon -->
          <div class="mb-5 flex justify-center h-20 items-center">
            <img
              :src="offer.image"
              :alt="offer.title"
              class="w-20 h-20 object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          <!-- Divider line -->
          <div class="w-8 h-0.5 bg-coffee-mid/40 mx-auto mb-4"></div>

          <!-- Title -->
          <h3 class="font-bold text-xs tracking-[0.2em] mb-3 transition-colors duration-300
                     text-coffee-dark dark:text-amber-400">
            {{ offer.title }}
          </h3>

          <!-- Description -->
          <p class="text-sm leading-relaxed transition-colors duration-300
                    text-gray-500 dark:text-gray-400">
            {{ offer.description }}
          </p>
        </div>
      </div>

    </div>
  </section>
</template>