// src/background/index.ts

import { defaultOptions, getOptions } from '../utils/options.ts'
import { createContextMenus, onClicked } from '@/background/menus.ts'
import { openExtPanel, openSidePanel } from '@/utils/extension.ts'

chrome.contextMenus?.onClicked.addListener(onClicked)
chrome.commands?.onCommand.addListener(onCommand)

chrome.runtime.onInstalled.addListener(async (details) => {
  console.log('onInstalled:', details)

  const options = await setDefaultOptions(defaultOptions)
  console.debug('options:', options)
  createContextMenus()
})

chrome.runtime.onStartup.addListener(() => {
  console.log('onStartup')
})

// NOTE: Below is ported from VanillaJS

async function setDefaultOptions(defaultOptions: object) {
  console.log('setDefaultOptions', defaultOptions)
  const options = await getOptions()
  let changed = false
  for (const [key, value] of Object.entries(defaultOptions)) {
    // console.log(`${key}: default: ${value} current: ${options[key]}`)
    if (options[key] === undefined) {
      changed = true
      options[key] = value
      console.log(`Set %c${key}:`, 'color: Khaki', value)
    }
  }
  if (changed) {
    await chrome.storage.sync.set({ options })
    console.log('changed options:', options)
  }
  return options
}

async function onCommand(command: string, tab?: chrome.tabs.Tab) {
  console.debug('onCommand:', command, tab)
  if (command === 'openOptions') {
    await chrome.runtime.openOptionsPage()
  } else if (command === 'openExtPanel') {
    await openExtPanel()
  } else if (command === 'openSidePanel') {
    openSidePanel()
  } else {
    console.warn(`Unknown Command: ${command}`)
  }
}
