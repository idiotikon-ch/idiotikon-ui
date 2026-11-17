/**
 * Built-in translations for the library components and helpers to combine them
 * with Vuetify's own locale tables and per-site overrides.
 */
import { useLocale, type LocaleMessages } from 'vuetify'
import {
  de as vuetifyDe,
  en as vuetifyEn,
  fr as vuetifyFr,
  it as vuetifyIt,
} from 'vuetify/locale'
import { de } from './de'
import { en } from './en'
import { fr } from './fr'
import type { IdiMessageKey, IdiMessages, IdiotikonLocaleOptions } from './types'

export type {
  DeepPartial,
  IdiLocaleOverride,
  IdiMessageKey,
  IdiMessages,
  IdiotikonLocaleOptions,
} from './types'

/** Languages with built-in library strings. */
export type IdiLanguage = 'de' | 'fr' | 'en'

/** Library string tables per language (content of the `idi` namespace). */
export const idiotikonUiMessages: Record<IdiLanguage, IdiMessages> = { de, fr, en }

type Plain = { [key: string]: unknown }

function isPlainObject(value: unknown): value is Plain {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Merge objects key by key into a new object without mutating the inputs.
 * Nested plain objects are merged recursively; other values replace earlier
 * ones; `undefined` values are skipped.
 *
 * @param sources Objects to merge, later ones win.
 * @returns The merged object.
 */
export function deepMerge<T extends Plain = Plain>(...sources: (Plain | undefined)[]): T {
  const result: Plain = {}
  for (const source of sources) {
    if (!source) continue
    for (const [key, value] of Object.entries(source)) {
      if (value === undefined) continue
      result[key] = isPlainObject(value) && isPlainObject(result[key])
        ? deepMerge(result[key] as Plain, value)
        : isPlainObject(value) ? deepMerge(value) : value
    }
  }
  return result as T
}

/** Replace `ß` with `ss` in all strings of a message table (Swiss orthography). */
function toSwissOrthography(messages: Plain): Plain {
  const result: Plain = {}
  for (const [key, value] of Object.entries(messages)) {
    result[key] = typeof value === 'string'
      ? value.replace(/ß/g, 'ss')
      : isPlainObject(value) ? toSwissOrthography(value) : value
  }
  return result
}

const vuetifyTables: Record<string, Plain> = {
  de: toSwissOrthography(vuetifyDe as Plain),
  fr: vuetifyFr as Plain,
  en: vuetifyEn as Plain,
  it: vuetifyIt as Plain,
}

/**
 * Build Vuetify locale messages: Vuetify's own table, the library's `idi`
 * table, and site overrides, merged key by key in that order.
 *
 * Languages without built-in library strings (e.g. only named in overrides)
 * start from the fallback language's messages, so missing keys resolve to it.
 * Vuetify tables are bundled for de, fr, en and it; for other languages pass
 * Vuetify's table (from `vuetify/locale`) as part of the override.
 *
 * @param options Locale options; `fallback` defaults to `'de'`.
 * @returns Messages keyed by language, for Vuetify's `locale.messages`.
 */
export function createIdiotikonLocaleMessages(
  options: IdiotikonLocaleOptions = {}
): Record<string, LocaleMessages> {
  const fallback = options.fallback ?? 'de'
  const overrides = options.messages ?? {}
  const builtIn = Object.keys(idiotikonUiMessages) as IdiLanguage[]
  const messages: Record<string, Plain> = {}

  for (const lang of builtIn) {
    messages[lang] = deepMerge(vuetifyTables[lang], { idi: idiotikonUiMessages[lang] }, overrides[lang])
  }

  const fallbackBase = messages[fallback] ?? messages.de
  const extra = new Set([...Object.keys(overrides), options.locale ?? 'de', fallback])
  for (const lang of extra) {
    if (lang in messages) continue
    messages[lang] = deepMerge(fallbackBase, vuetifyTables[lang], overrides[lang])
  }

  return messages as Record<string, LocaleMessages>
}

function getByPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((o, k) => (isPlainObject(o) ? o[k] : undefined), obj)
}

/**
 * Translate library strings via Vuetify's locale. Falls back to the German
 * library string if the key is missing from Vuetify's messages, e.g. when the
 * app replaced them.
 *
 * @returns A function mapping an `IdiMessageKey` to the current translation.
 */
export function useIdiTranslate(): (key: IdiMessageKey) => string {
  const { t } = useLocale()
  return (key) => {
    const fullKey = `$vuetify.idi.${key}`
    const value = t(fullKey)
    return value === fullKey ? (getByPath(de, key) as string) : value
  }
}
