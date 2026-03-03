<script setup lang="ts">
import { openExtPanel, openOptions, openSidePanel } from '@/utils/extension.ts'
import PanelHeader from '@/components/PanelHeader.vue'
import PermissionCheck from '@/components/PermissionCheck.vue'
import ToastAlerts from '@/components/ToastAlerts.vue'
import { showToast } from '@/utils/useToast.ts'

console.debug('%c popup/App.vue', 'color: Lime')
</script>

<template>
  <PanelHeader :close-window="true" />

  <div class="container p-3">
    <div class="d-grid g-2 gap-2 mb-2">
      <!--<div id="hostname" class="text-center border border-2 rounded text-ellipsis p-1">No Access to the Current Tab.</div>-->

      <a class="btn btn-primary d-flex align-items-center hvr-grow-sm" @click="showToast('ti ekorb flar')">
        <i class="fa-regular fa-window-maximize me-1"></i>
        <span class="flex-fill text-center me-4">Show Factual Toast</span>
      </a>
      <a
        class="btn btn-primary d-flex align-items-center hvr-grow-sm"
        data-mobile-add="d-none"
        @click="openExtPanel(true)"
      >
        <i class="fa-regular fa-window-restore me-1"></i>
        <span class="flex-fill text-center me-4">Open Extension Panel</span>
      </a>
      <a
        class="btn btn-primary d-flex align-items-center hvr-grow-sm"
        data-mobile-add="d-none"
        @click="openSidePanel(true)"
      >
        <i class="fa-solid fa-table-columns me-1"></i>
        <span class="flex-fill text-center me-4">Open Side Panel</span>
      </a>
      <a class="btn btn-primary d-flex align-items-center hvr-grow-sm" data-mobile-add="d-none" @click="openOptions()">
        <i class="fa-solid fa-cog me-1"></i>
        <span class="flex-fill text-center me-4">Open Options</span>
      </a>
    </div>

    <div class="alert alert-info text-center p-2 mb-0" role="alert">
      Options have not yet been ported to a Vue Component but work on the Options page.
    </div>
    <!-- d-grid -->

    <PermissionCheck :close-window="true" />
  </div>

  <ToastAlerts />
</template>

<!--<style scoped></style>-->
