<template>
  <div class="flex flex-col bg-slate-50">
    <div class="home-bg">
      <aside
        class="flex flex-col items-start px-10 py-15 w-[45vw] float-right gap-2"
      >
        <h1 class="text-xl notHomeBg font-semibold text-orange-100">
          Wilkommen beim Barbershop
        </h1>
        <h2 class="text-5xl text-white font-bold notHomeBg">
          Wir machen Ihren Stil zu Ihren Träumen
        </h2>
        <h5 class="text-orange-100 notHomeBg w-[35vw] mt-10">
          Ein kleiner Fluss namens Duden fließt an ihrem Ort vorbei und versorgt
          ihn mit Wasser die notwendigen Regelialien. Es ist ein paradiesisches
          Land, in dem Geröstete Satzteile fliegen einem in den Mund.
        </h5>

        <button class="z-10 my-5 btn btn-outline-light">
          <a href="/about"> Mehr über uns </a>
        </button>
      </aside>
    </div>

    <div class="h-[40vh] mb-20">
      <About />
    </div>

    <div class="">
      <TerminVue />
      <hr class="my-6" />
    </div>

    <div class="">
      <Team />
      <hr class="" />
    </div>

    <div class="">
      <Gallery />
    </div>

    <div class="">
      <Kontakt />
    </div>
  </div>
</template>

<script setup lang="ts">
import About from './About.vue';
import Kontakt from './Contact.vue';
import Gallery from './Gallery.vue';
import Team from './Team.vue';
import TerminVue from './Termin.vue';
</script>
