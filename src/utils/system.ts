export const isFirefox =
  typeof browser !== 'undefined' && typeof browser?.runtime?.getBrowserInfo === 'function'

// export const isMobile = !!chrome.contextMenus
export const isMobile = typeof chrome.contextMenus !== 'object'

// const platform = await chrome.runtime.getPlatformInfo()
// export const isMobile = platform.os === 'android'

// export async function checkIsMobile(): Promise<boolean> {
//   if (typeof chrome === 'undefined' || !chrome.runtime?.getPlatformInfo) {
//     return false
//   }
//
//   const platform = await chrome.runtime.getPlatformInfo()
//   return platform.os === 'android'
// }

// let isMobileValue = false
//
// export async function initSystem() {
//   const platform = await chrome.runtime.getPlatformInfo()
//   isMobileValue = platform.os === 'android'
// }
//
// export function isMobile() {
//   return isMobileValue
// }

// let isMobilePromise: Promise<boolean> | null = null
//
// export function isMobile(): Promise<boolean> {
//   if (isMobilePromise) return isMobilePromise
//
//   isMobilePromise = new Promise((resolve) => {
//     if (!chrome?.runtime?.getPlatformInfo) {
//       resolve(false)
//       return
//     }
//
//     chrome.runtime.getPlatformInfo((platform) => {
//       resolve(platform.os === 'android')
//     })
//   })
//
//   return isMobilePromise
// }
