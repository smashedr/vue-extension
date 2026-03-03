// Chrome Permissions

// export async function checkPerms() {
//   const hasPerms = await chrome.permissions.contains({
//     origins: ['*://*/*'],
//   })
//   console.debug('checkPerms:', hasPerms)
//   return hasPerms
// }

// export async function grantPerms(event: Event, close = false) {
//   console.debug('grantPerms:', event)
//   // noinspection ES6MissingAwait
//   requestPerms()
//   if (close) {
//     window.close()
//   }
// }

// export async function requestPerms() {
//   return await chrome.permissions.request({
//     origins: ['*://*/*'],
//   })
// }

// export async function revokePerms(event: Event) {
//   console.debug('revokePerms:', event)
//   const permissions = await chrome.permissions.getAll()
//   console.debug('permissions:', permissions)
//   try {
//     await chrome.permissions.remove({
//       origins: permissions.origins,
//     })
//     await checkPerms()
//   } catch (e) {
//     console.log(e)
//     // showToast(e.toString(), 'danger')
//   }
// }

// /**
//  * Permissions On Added Callback
//  * @param {chrome.permissions} permissions
//  */
// export async function onAdded(permissions: chrome.permissions.Permissions) {
//   console.debug('onAdded', permissions)
//   await checkPerms()
// }

// /**
//  * Permissions On Removed Callback
//  * @param {chrome.permissions} permissions
//  */
// export async function onRemoved(permissions: chrome.permissions.Permissions) {
//   console.debug('onRemoved', permissions)
//   await checkPerms()
// }
