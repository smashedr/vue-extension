<script setup lang="ts">
import { openExtPanel, openOptions, openSidePanel } from '@/utils/extension.ts'
import { showToast } from '@/utils/useToast.ts'

import HeaderPanel from '@/components/HeaderPanel.vue'
import PermsCheck from '@/components/PermsCheck.vue'
import ToastAlerts from '@/components/ToastAlerts.vue'
import OptionsControls from '@/components/OptionsControls.vue'
import { isMobile } from '@/utils/system.ts'

console.debug('%c popup/App.vue', 'color: Lime')
</script>

<template>
  <HeaderPanel :close-window="true" />

  <div class="container p-3">
    <div class="d-grid g-2 gap-2 mb-2">
      <!--<div id="hostname" class="text-center border border-2 rounded text-ellipsis p-1">No Access to the Current Tab.</div>-->

      <a class="btn btn-primary d-flex align-items-center hvr-grow-sm" @click="showToast('ti ekorb flar')">
        <i class="fa-regular fa-window-maximize me-1"></i>
        <span class="flex-fill text-center me-4">Show Factual Toast</span>
      </a>
      <a v-if="!isMobile" class="btn btn-primary d-flex align-items-center hvr-grow-sm" @click="openExtPanel(true)">
        <i class="fa-regular fa-window-restore me-1"></i>
        <span class="flex-fill text-center me-4">Open Extension Panel</span>
      </a>
      <a v-if="!isMobile" class="btn btn-primary d-flex align-items-center hvr-grow-sm" @click="openSidePanel(true)">
        <i class="fa-solid fa-table-columns me-1"></i>
        <span class="flex-fill text-center me-4">Open Side Panel</span>
      </a>
    </div>

    <hr />

    <OptionsControls :compact="true" class="mb-2" />

    <a class="btn btn-outline-info d-flex align-items-center hvr-grow-sm" @click="openOptions(true)">
      <i class="fa-solid fa-sliders me-1"></i>
      <span class="flex-fill text-center me-4">More Options</span>
    </a>

    <PermsCheck :close-window="true" />
  </div>

  <ToastAlerts />
</template>

<!--<style scoped></style>-->
