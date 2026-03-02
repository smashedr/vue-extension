import { createApp } from 'vue'
import App from './views/App.vue'

console.log('%c vue-extension: content/main.ts', 'color: Khaki')

/**
 * Mount the Vue app to the DOM.
 */
function mountApp() {
  const container = document.createElement('div')
  container.id = 'content-app'
  document.body.appendChild(container)
  const app = createApp(App)
  app.mount(container)
}

mountApp()
