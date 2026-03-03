<script setup lang="ts">
const isFirefox = typeof browser !== 'undefined' && typeof browser?.runtime?.getBrowserInfo === 'function'
console.debug('isFirefox:', isFirefox)

function openChromeShortcuts() {
  chrome.tabs.update({ url: 'chrome://extensions/shortcuts' })
}
</script>

<template>
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
    <a v-if="!isFirefox" id="chrome-shortcuts" class="d-inline-block chrome" role="button" @click="openChromeShortcuts"
      >chrome://extensions/shortcuts</a
    >
  </div>
</template>

<!--<style scoped></style>-->
