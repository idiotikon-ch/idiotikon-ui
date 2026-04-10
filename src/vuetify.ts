import { createVuetify, ThemeDefinition } from 'vuetify'
import { defaults } from './defaults'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
// import { md1, md2, md3 } from 'vuetify/blueprints'

export function createIdiotikonVuetify(
  themeConfig: {
    defaultTheme: string
    themes: { [key: string]: ThemeDefinition }
    layers?: boolean
  },
  ssr = false
) {
  return createVuetify({
    theme: {
      ...themeConfig,
      layers: themeConfig.layers ?? false,
    },
    // blueprint: md3,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    ssr,
    defaults
  })
}
