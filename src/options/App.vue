<script setup lang="ts">
import { onMounted } from 'vue'
import { copySupport, setShortcuts } from '../utils/options.ts'

import BackToTop from '@/components/BackToTop.vue'
import PermissionCheck from '@/components/PermissionCheck.vue'
import ToastAlerts from '@/components/ToastAlerts.vue'
import OptionsControls from '@/components/OptionsControls.vue'

console.debug('%c options/App.vue', 'color: Lime')

onMounted(() => {
  setShortcuts()
})

const manifest = chrome.runtime.getManifest()
console.debug('manifest:', manifest)

const isFirefox = typeof browser !== 'undefined' && typeof browser?.runtime?.getBrowserInfo === 'function'
console.debug('isFirefox:', isFirefox)

function openChromeShortcuts() {
  chrome.tabs.update({ url: 'chrome://extensions/shortcuts' })
}
</script>

<template>
  <!-- NOTE: Below is ported from VanillaJS -->

  <div class="d-flex align-items-center justify-content-center p-1 p-sm-3 h-100 w-100">
    <div class="m-auto pb-4 w-100">
      <div
        id="options-wrapper"
        class="border border-1 rounded rounded-3 p-2 p-sm-3 m-auto w-100"
        style="max-width: 767px"
      >
        <div class="d-flex flex-row justify-content-center align-items-center">
          <img
            src="/images/logo48.png"
            class="me-1"
            height="48"
            width="48"
            :alt="manifest.name"
            :title="manifest.name"
          />
          <div>
            <a
              class="link-body-emphasis text-decoration-none fs-1"
              title="Home Page"
              :href="manifest.homepage_url"
              target="_blank"
              rel="nofollow"
            >
              {{ manifest.name }}</a
            >
            <a
              class="link-body-emphasis text-decoration-none small"
              title="Release Notes"
              :href="`${manifest.homepage_url}/releases/tag/${manifest.version}`"
              target="_blank"
              rel="nofollow"
            >
              v<span class="version">{{ manifest.version }}</span></a
            >
          </div>
        </div>
        <!-- header -->

        <div data-mobile-add="d-none">
          <div class="d-flex flex-row align-items-center justify-content-center">
            <hr class="w-100 my-0" />
            <span class="text-nowrap mx-2">Keyboard Shortcuts</span>
            <hr class="w-100 my-0" />
          </div>

          <table id="keyboard-shortcuts" class="table table-sm table-borderless table-hover d-none">
            <caption class="visually-hidden">
              Keyboard Shortcuts
            </caption>
            <thead class="visually-hidden">
              <tr>
                <th>Description</th>
                <th>Shortcut</th>
              </tr>
            </thead>
            <tbody></tbody>
            <tfoot class="d-none">
              <tr>
                <td class="bg-transparent">
                  <i class="fa-regular fa-keyboard me-1"></i>
                  <span class="description"></span>
                </td>
                <td class="bg-transparent text-end" title="Keyboard Shortcut">
                  <kbd>Unknown</kbd>
                </td>
              </tr>
            </tfoot>
          </table>
          <!-- keyboard-shortcuts -->

          <div class="mb-2">
            Manage Keyboard Shortcuts:
            <a
              v-if="isFirefox"
              class="text-decoration-none d-inline-block firefox"
              href="https://support.mozilla.org/en-US/kb/manage-extension-shortcuts-firefox"
              target="_blank"
              rel="noopener"
            >
              https://mzl.la/3Qwp5QQ
              <i class="fa-solid fa-arrow-up-right-from-square fa-xs"></i
            ></a>
            <a
              v-if="!isFirefox"
              id="chrome-shortcuts"
              class="d-inline-block chrome"
              role="button"
              @click="openChromeShortcuts"
              >chrome://extensions/shortcuts</a
            >
          </div>
        </div>
        <!-- data-mobile-add -->

        <div class="d-flex flex-row align-items-center justify-content-center">
          <hr class="w-100 my-0" />
          <span class="text-nowrap mx-2">Extension Options</span>
          <hr class="w-100 my-0" />
        </div>

        <OptionsControls />

        <PermissionCheck :show-remove="true" />

        <p class="fst-italic small mt-3">
          <a id="copy-support" href="#0" @click="copySupport">Copy Support Information</a> for issue reporting.
        </p>

        <hr class="mt-0" />

        <div class="text-center">
          <a
            class="link-body-emphasis text-decoration-none d-inline-block"
            target="_blank"
            rel="noopener"
            :href="manifest.homepage_url"
            >Home Page</a
          >
          <span class="mx-1">&bull;</span>
          <a
            class="link-body-emphasis text-decoration-none d-inline-block"
            target="_blank"
            rel="noopener"
            href="https://github.com/smashedr/vue-extension/issues/new?template=1-feature.yaml"
            >Request Feature</a
          >
          <span class="mx-1">&bull;</span>
          <a
            class="link-body-emphasis text-decoration-none d-inline-block"
            target="_blank"
            rel="noopener"
            href="https://github.com/smashedr/vue-extension/issues"
            >Open Issue</a
          >
        </div>
        <!-- footer -->
      </div>
      <!-- options-wrapper -->
    </div>
    <!-- m-auto -->
  </div>
  <!-- d-flex -->

  <ToastAlerts />

  <BackToTop />
</template>

<!--<style scoped>-->
<!--body {-->
<!--  min-width: 340px;-->
<!--  width: 100%;-->
<!--  max-width: 100vw;-->
<!--}-->
<!--</style>-->
