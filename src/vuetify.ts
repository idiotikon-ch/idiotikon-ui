import { createVuetify, ThemeDefinition } from 'vuetify'
import { defaults } from './defaults'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import * as directives from "vuetify/directives";
import { createIdiotikonLocaleMessages, type IdiotikonLocaleOptions } from './locale'
// import { md1, md2, md3 } from 'vuetify/blueprints'

/**
 * Create a Vuetify instance with the Idiotikon defaults, icons and translations.
 *
 * @param themeConfig Theme definitions and default theme.
 * @param ssr Enable Vuetify's SSR mode.
 * @param options Locale settings: initial `locale` and `fallback` (both default
 *   `'de'`) and per-language `messages` overrides, e.g.
 *   `{ fr: { idi: { footer: { donate: 'Faire un don' } } } }`.
 * @returns The Vuetify plugin.
 */
export function createIdiotikonVuetify(
  themeConfig: {
    defaultTheme: string
    themes: { [key: string]: ThemeDefinition }
    layers?: boolean
  },
  ssr = false,
  options: IdiotikonLocaleOptions = {}
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
    locale: {
      locale: options.locale ?? 'de',
      fallback: options.fallback ?? 'de',
      messages: createIdiotikonLocaleMessages(options),
    },
    ssr,
    defaults,
    directives,
  })
}
