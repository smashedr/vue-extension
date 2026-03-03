// NOTE: Below is ported from VanillaJS

import { showToast } from '@/utils/useToast.ts'

export function openSidePanel(close?: boolean) {
  console.debug('openSidePanel:', close)
  if (chrome.sidePanel) {
    console.debug('chrome.sidePanel')
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.sidePanel
        .open({ windowId: tab.windowId })
        .then(() => {
          if (close) window.close()
        })
        .catch((e) => console.warn(e))
    })
  } else if (chrome.sidebarAction) {
    console.debug('chrome.sidebarAction')
    chrome.sidebarAction.open()
    if (close) window.close()
  } else {
    console.log('Side Panel Not Supported')
  }
}

export function openOptions(close = false) {
  console.debug('openOptions')
  chrome.runtime
    .openOptionsPage()
    .then(() => {
      if (close) window.close()
    })
    .catch((e) => console.warn(e))
}

export async function openPopup(event: Event | null) {
  console.debug('openPopup:', event)
  event?.preventDefault()
  // Note: This fails if popup is already open (ex. double clicks)
  try {
    await chrome.action.openPopup()
  } catch (e) {
    console.debug(e)
  }
}

/**
 * Note: The panel needs the windowResize / window resize event listener...
 * Note: Firefox needs the onMounted function to set lastPanelID...
 */
export async function openExtPanel(close = false) {
  console.debug('openExtPanel:', close)

  // async function windowResize() {
  //   // console.debug('windowResize:', event)
  //   const size = { panelWidth: window.outerWidth, panelHeight: window.outerHeight }
  //   console.debug('windowResize:', size)
  //   await chrome.storage.local.set(size).catch((e) => console.warn(e))
  // }

  // chrome.windows.getCurrent().then((window) => {
  //   chrome.storage.local.set({ lastPanelID: window.id }).then(() => {
  //     console.debug(`%c Set lastPanelID: ${window.id}`, 'color: Aqua')
  //   })
  // })

  const panelPath = 'src/sidepanel/index.html'
  const [defaultWidth, defaultHeight] = [390, 600]
  const type = chrome.windows.CreateType.POPUP

  if (!chrome.windows) {
    console.log('Browser does not support: chrome.windows')
    showToast('Browser does not support windows', 'danger')
    return
  }

  const local = await chrome.storage.local.get(['lastPanelID'])
  console.debug('local:', local)

  const lastPanelID = local.lastPanelID as number
  console.debug('lastPanelID:', lastPanelID)

  try {
    const panel = await chrome.windows.get(lastPanelID)
    // console.debug('window', window)
    if (panel) {
      console.debug(`%c Window found: ${panel.id}`, 'color: Lime')
      await chrome.windows.update(lastPanelID, { focused: true })
      if (close) window.close()
      return
    }
  } catch (e) {
    console.log(e)
  }

  const panelWidth = local.panelWidth as number
  console.debug('panelWidth:', panelWidth)
  const panelHeight = local.panelHeight as number
  console.debug('panelHeight:', panelHeight)
  const width = panelWidth || defaultWidth
  const height = panelHeight || defaultHeight
  console.debug(`width, height:`, width, height)
  const url = chrome.runtime.getURL(panelPath)
  console.debug('url:', url)
  const panel = await chrome.windows.create({ type, url, width, height })
  console.debug('panel:', panel)
  if (panel) {
    console.debug(`%c Created new window: ${panel.id}`, 'color: Magenta')
    chrome.storage.local.set({ lastPanelID: panel.id }).catch((e) => console.warn(e))
  }
  if (close) window.close()
}
