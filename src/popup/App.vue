<script setup lang="ts">
import { computed } from 'vue'
import { isFirefox, isMobile } from '@/utils/system.ts'

import ButtonsList from '@/components/ButtonsList.vue'
import ToastAlerts from '@/components/ToastAlerts.vue'
import BackToTop from '@/components/BackToTop.vue'
import PanelHeader from '@/components/PanelHeader.vue'
import SearchBox from '@/components/SearchBox.vue'
import PermsCheck from '@/components/PermsCheck.vue'
import OptionsForm from '@/components/OptionsForm.vue'

let isBrowser = isFirefox ? '390px' : null
const width = computed(() => (isMobile ? '100%' : isBrowser))
console.log('width:', width.value)
</script>

<template>
  <div id="popupContainer">
    <PanelHeader :close-window="true" :popup-button="false" />

    <div class="d-grid gap-2 p-1">
      <PermsCheck />
      <SearchBox :close-window="true" />
      <ButtonsList :close-window="true" :popup-button="false" />
    </div>

    <hr class="my-0" />
    <OptionsForm :close-window="true" :compact="true" class="p-2" />

    <ToastAlerts />
    <BackToTop />
  </div>
</template>

<style scoped>
#popupContainer {
  width: v-bind(width);
}
</style>
