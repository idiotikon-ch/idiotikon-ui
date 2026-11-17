/** Strings used by the library components, resolved under `$vuetify.idi.*`. */
export interface IdiMessages {
  footer: {
    address: string
    socialMedia: string
    donate: string
    donationForm: string
  }
  announcement: {
    readMore: string
    back: string
  }
  scrollToTop: {
    tooltip: string
  }
  searchField: {
    placeholder: string
  }
  shareBtn: {
    title: string
  }
  contactInfo: {
    phone: string
    email: string
    website: string
  }
}

/** Recursively optional version of `T`. */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

type Leaves<T, P extends string = ''> = {
  [K in keyof T & string]: T[K] extends string ? `${P}${K}` : Leaves<T[K], `${P}${K}.`>
}[keyof T & string]

/** Dot path of a single string in `IdiMessages`, e.g. `'footer.donate'`. */
export type IdiMessageKey = Leaves<IdiMessages>

/**
 * Per-language override passed to `createIdiotikonVuetify`. Contains the `idi`
 * namespace and, optionally, any of Vuetify's own keys (e.g. `dataFooter`).
 */
export interface IdiLocaleOverride {
  idi?: DeepPartial<IdiMessages>
  [key: string]: unknown
}

/** Locale settings for `createIdiotikonVuetify`. */
export interface IdiotikonLocaleOptions {
  /** Initial locale. Default `'de'`. */
  locale?: string
  /** Locale used for keys missing in the current one. Default `'de'`. */
  fallback?: string
  /** Per-language overrides, merged key by key over the built-in tables. */
  messages?: { [lang: string]: IdiLocaleOverride }
}
