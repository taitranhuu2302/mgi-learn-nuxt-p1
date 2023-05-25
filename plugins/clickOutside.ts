export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click-outside', {
    beforeMount: (el, binding) => {
      el.clickOutside = (event: MouseEvent) => {
        if (event.target !== el && !el.contains(event.target) && binding.value instanceof Function) {
          binding.value()
        }
      }

      document.addEventListener('click', el.clickOutside)
    },
    unmounted: (el) => {
      document.removeEventListener('click', el.clickOutside)
    }
  })
})