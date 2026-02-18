import { createVuetify, ThemeDefinition } from 'vuetify'
import './normalize.scss'
import { defaults } from './defaults'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { md2 } from 'vuetify/blueprints'

export function createIdiotikonVuetify(theme: ThemeDefinition) {
  return createVuetify({
    theme: { themes: { default: theme } },
    blueprint: md2,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    ssr: false,
    defaults
  })
}
