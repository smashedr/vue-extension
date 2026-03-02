// NOTE: Below is ported from VanillaJS

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
  } else {
    console.log('Side Panel Not Supported')
  }
}

export function openOptions() {
  console.debug('openOptions')
  chrome.runtime.openOptionsPage().catch((e) => console.warn(e))
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

export async function openExtPanel(
  url = 'src/sidepanel/index.html',
  width = 0,
  height = 0,
  type: chrome.windows.CreateType = chrome.windows.CreateType.PANEL,
): Promise<chrome.windows.Window | undefined> {
  console.debug('openExtPanel')
  if (!chrome.windows) {
    console.log('Browser does not support: chrome.windows')
    // showToast('Browser does not support windows', 'danger')
    return
  }

  const local = await chrome.storage.local.get(['lastPanelID'])
  console.debug('local:', local)

  const lastPanelID = local.lastPanelID as number
  console.debug('lastPanelID:', lastPanelID)

  try {
    const window = await chrome.windows.get(lastPanelID)
    // console.debug('window', window)
    if (window) {
      console.debug(`%c Window found: ${window.id}`, 'color: Lime')
      return await chrome.windows.update(lastPanelID, {
        focused: true,
      })
    }
  } catch (e) {
    console.log(e)
  }

  const panelWidth = local.panelWidth as number
  console.debug('panelWidth:', panelWidth)
  const panelHeight = local.panelHeight as number
  console.debug('panelHeight:', panelHeight)
  width = width || panelWidth || 340
  height = height || panelHeight || 600
  console.debug(`openExtPanel: ${url}`, width, height)

  url = chrome.runtime.getURL(url)
  console.debug('url:', url)
  const window = await chrome.windows.create({ type, url, width, height })
  console.debug('window:', window)
  if (window) {
    console.debug(`%c Created new window: ${window.id}`, 'color: Magenta')
    chrome.storage.local.set({ lastPanelID: window.id }).catch((e) => console.warn(e))
    return window
  }
}
