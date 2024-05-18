import type { Alpine } from 'alpinejs'
import persistPlugin from '@alpinejs/persist'

export default (Alpine: Alpine) => {
  Alpine.plugin(persistPlugin)
}
