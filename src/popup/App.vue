<script setup lang="ts">
import { openOptions, openSidePanel } from '@/utils/extension.ts'
import PanelHeader from '@/components/PanelHeader.vue'

console.debug('%c popup/App.vue', 'color: Lime')
</script>

<template>
  <PanelHeader />

  <ul>
    <li>
      <!--<a href="#" @click="(e) => openSidePanel(e, true)"> Side Panel </a>-->
      <a href="#" @click="openSidePanel(true)"> Side Panel </a>
    </li>
    <li>
      <a href="#" @click="openOptions"> Options </a>
    </li>
  </ul>

  <button class="btn btn-primary">Click me <i class="fa-solid fa-house"></i></button>
</template>

<!--<style scoped></style>-->
