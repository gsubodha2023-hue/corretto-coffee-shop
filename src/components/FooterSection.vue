<script setup lang="ts">
// No imports needed - using inline SVG logos
</script>

<template>
  <footer>

    <!-- Brand Logos Bar -->
    <div class="bg-white border-t border-b border-gray-100 py-12">
      <div class="max-w-6xl mx-auto px-6">
        <div class="flex flex-wrap items-center justify-around gap-10">

          <!-- Logo 1: Café 1965 (script style) -->
          <div class="group cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-300">
            <svg width="110" height="70" viewBox="0 0 110 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="10" y="35" font-family="Georgia, serif" font-size="26" font-style="italic" font-weight="bold" fill="#c8a27a">Café</text>
              <text x="22" y="52" font-family="Georgia, serif" font-size="11" fill="#c8a27a" letter-spacing="3">1965</text>
              <!-- spoon underline -->
              <line x1="8" y1="57" x2="75" y2="57" stroke="#c8a27a" stroke-width="1"/>
              <circle cx="6" cy="57" r="4" stroke="#c8a27a" stroke-width="1" fill="none"/>
              <line x1="75" y1="54" x2="85" y2="60" stroke="#c8a27a" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>

          <!-- Logo 2: COFFEE+ hexagon badge -->
          <div class="group cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-300">
            <svg width="100" height="90" viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Hexagon -->
              <polygon points="50,5 90,27 90,63 50,85 10,63 10,27" stroke="#c8a27a" stroke-width="1.2" fill="none"/>
              <!-- Inner hexagon -->
              <polygon points="50,12 83,30 83,60 50,78 17,60 17,30" stroke="#c8a27a" stroke-width="0.5" fill="none"/>
              <!-- Top small text -->
              <text x="50" y="27" font-family="Georgia, serif" font-size="6" fill="#c8a27a" text-anchor="middle" letter-spacing="1">EST. 1998</text>
              <!-- Main text -->
              <text x="50" y="51" font-family="Georgia, serif" font-size="14" font-weight="bold" fill="#c8a27a" text-anchor="middle" letter-spacing="2">COFFEE</text>
              <!-- Plus signs -->
              <text x="12" y="49" font-family="Arial" font-size="10" fill="#c8a27a">+</text>
              <text x="82" y="49" font-family="Arial" font-size="10" fill="#c8a27a">+</text>
              <!-- Bottom text -->
              <text x="50" y="65" font-family="Georgia, serif" font-size="5" fill="#c8a27a" text-anchor="middle" letter-spacing="1">CRAFT COFFEE CO.</text>
            </svg>
          </div>

          <!-- Logo 3: COFFEE TOWN (machine/grinder) -->
          <div class="group cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-300">
            <svg width="110" height="80" viewBox="0 0 110 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Grinder arm -->
              <line x1="55" y1="8" x2="55" y2="22" stroke="#c8a27a" stroke-width="1.5" stroke-linecap="round"/>
              <line x1="55" y1="8" x2="75" y2="8" stroke="#c8a27a" stroke-width="1.5" stroke-linecap="round"/>
              <circle cx="75" cy="8" r="3" stroke="#c8a27a" stroke-width="1.2" fill="none"/>
              <!-- Grinder body -->
              <rect x="30" y="22" width="50" height="35" rx="2" stroke="#c8a27a" stroke-width="1.2" fill="none"/>
              <!-- Inner box -->
              <rect x="38" y="30" width="34" height="20" rx="1" stroke="#c8a27a" stroke-width="0.8" fill="none"/>
              <!-- Drawer handle -->
              <rect x="42" y="58" width="26" height="8" rx="1" stroke="#c8a27a" stroke-width="1" fill="none"/>
              <line x1="52" y1="62" x2="58" y2="62" stroke="#c8a27a" stroke-width="1.5" stroke-linecap="round"/>
              <!-- Text -->
              <text x="55" y="76" font-family="Georgia, serif" font-size="8" fill="#c8a27a" text-anchor="middle" letter-spacing="3">COFFEE TOWN</text>
            </svg>
          </div>

          <!-- Logo 4: COFFEE Best in Town circular badge -->
          <div class="group cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-300">
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Outer circle -->
              <circle cx="45" cy="45" r="42" stroke="#c8a27a" stroke-width="1" fill="none"/>
              <!-- Inner circle -->
              <circle cx="45" cy="45" r="36" stroke="#c8a27a" stroke-width="0.5" fill="none"/>
              <!-- Top arc text: BEST IN TOWN -->
              <path id="topArc" d="M 12 45 A 33 33 0 0 1 78 45" fill="none"/>
              <text font-family="Georgia, serif" font-size="7" fill="#c8a27a" letter-spacing="3">
                <textPath href="#topArc" startOffset="8%">BEST IN TOWN</textPath>
              </text>
              <!-- Main COFFEE text -->
              <text x="45" y="48" font-family="Georgia, serif" font-size="16" font-weight="bold" fill="#c8a27a" text-anchor="middle" letter-spacing="1">COFFEE</text>
              <!-- ESTD line -->
              <line x1="25" y1="52" x2="38" y2="52" stroke="#c8a27a" stroke-width="0.5"/>
              <text x="45" y="56" font-family="Georgia, serif" font-size="5" fill="#c8a27a" text-anchor="middle" letter-spacing="2">ESTD 1997</text>
              <line x1="52" y1="52" x2="65" y2="52" stroke="#c8a27a" stroke-width="0.5"/>
              <!-- Bottom arc text: FOR EVERYONE -->
              <path id="botArc" d="M 12 45 A 33 33 0 0 0 78 45" fill="none"/>
              <text font-family="Georgia, serif" font-size="6" fill="#c8a27a" letter-spacing="3">
                <textPath href="#botArc" startOffset="10%">FOR EVERYONE</textPath>
              </text>
              <!-- Cup icon top -->
              <text x="45" y="32" font-family="Arial" font-size="10" fill="#c8a27a" text-anchor="middle">☕</text>
            </svg>
          </div>

          <!-- Logo 5: COFFEE MASTERS circular badge with machine -->
          <div class="group cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-300">
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Outer circle -->
              <circle cx="45" cy="45" r="42" stroke="#c8a27a" stroke-width="1" fill="none"/>
              <!-- Inner circle -->
              <circle cx="45" cy="45" r="34" stroke="#c8a27a" stroke-width="0.5" fill="none"/>
              <!-- Top arc: COFFEE MASTERS -->
              <path id="topArc2" d="M 14 45 A 31 31 0 0 1 76 45" fill="none"/>
              <text font-family="Georgia, serif" font-size="6.5" fill="#c8a27a" letter-spacing="2">
                <textPath href="#topArc2" startOffset="5%">COFFEE MASTERS</textPath>
              </text>
              <!-- Coffee machine icon -->
              <rect x="33" y="36" width="24" height="18" rx="2" stroke="#c8a27a" stroke-width="1" fill="none"/>
              <rect x="37" y="40" width="7" height="10" rx="1" stroke="#c8a27a" stroke-width="0.8" fill="none"/>
              <circle cx="53" cy="43" r="3" stroke="#c8a27a" stroke-width="0.8" fill="none"/>
              <line x1="53" y1="54" x2="53" y2="58" stroke="#c8a27a" stroke-width="1" stroke-linecap="round"/>
              <!-- Bottom arc: HIGH QUALITY -->
              <path id="botArc2" d="M 14 45 A 31 31 0 0 0 76 45" fill="none"/>
              <text font-family="Georgia, serif" font-size="6" fill="#c8a27a" letter-spacing="2">
                <textPath href="#botArc2" startOffset="12%">HIGH QUALITY</textPath>
              </text>
              <!-- dots decoration -->
              <circle cx="45" cy="18" r="1.5" fill="#c8a27a"/>
              <circle cx="45" cy="72" r="1.5" fill="#c8a27a"/>
            </svg>
          </div>

        </div>
      </div>
    </div>

    <!-- Main Footer (dark) -->
    <div
      class="relative py-16 text-white text-center"
      style="background: linear-gradient(rgba(0,0,0,0.88), rgba(0,0,0,0.92)),
             url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80') center/cover no-repeat;"
    >
      <!-- Logo -->
      <div class="flex items-center justify-center gap-3 mb-6">
        <div class="text-2xl">☕</div>
        <div class="border-2 border-white px-5 py-2 font-bold text-lg tracking-[0.3em]">CORRETTO</div>
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

      <!-- Social Icons -->
      <div class="flex items-center justify-center gap-6 mb-10">
        <a href="#" class="w-9 h-9 border border-white/20 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all text-sm">f</a>
        <a href="#" class="w-9 h-9 border border-white/20 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all text-sm">✉</a>
        <a href="#" class="w-9 h-9 border border-white/20 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all text-sm">📷</a>
        <a href="#" class="w-9 h-9 border border-white/20 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all text-sm">💬</a>
      </div>

      <!-- Copyright -->
      <div class="border-t border-white/10 pt-6 text-xs text-gray-600 tracking-wider">
        ALL RIGHTS RESERVED &nbsp;©&nbsp; CORRETTO COFFEE 2024
      </div>
    </div>

  </footer>
</template>