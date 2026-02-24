import { createVuetify, ThemeDefinition } from 'vuetify'
import './normalize.scss'
import { defaults } from './defaults'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { md2 } from 'vuetify/blueprints'

export function createIdiotikonVuetify(themeConfig: {
  defaultTheme: string
  themes: { [key: string]: ThemeDefinition }
  layers?: boolean
}) {
  return createVuetify({
    theme: {
      ...themeConfig,
      layers: themeConfig.layers ?? false,
    },
    // blueprint: md2,
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
