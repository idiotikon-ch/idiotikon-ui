# `@idiotikon/ui`

A unified UI package providing Vuetify styling, configuration, and reusable components for Idiotikon applications.

**Note:** This package is intended for internal use by Idiotikon projects. See [.instructions.md](.instructions.md) for development philosophy.

## Package Contents

### Vuetify Configuration

```typescript
import { createIdiotikonVuetify } from '@idiotikon/ui'

const vuetify = createIdiotikonVuetify({
  defaultTheme: 'light',
  themes: { /* your themes */ }
}, ssr)
```

### Translations

Component strings (footer headings, "Weiterlesen", "Nach oben", …) are built in for `de`, `fr` and `en` and resolved through Vuetify's locale under `$vuetify.idi.*` (tables in `src/locale/`). Vuetify's own strings use the same locale; its German table is converted to Swiss orthography (ß → ss).

```typescript
const vuetify = createIdiotikonVuetify(themeConfig, ssr, {
  locale: 'fr',    // default 'de'
  fallback: 'de',  // default 'de'
  messages: {
    // replaces only this key; other French strings stay
    fr: { idi: { footer: { donate: 'Faire un don' } } },
  },
})
```

Switch at runtime with `useLocale().current.value = 'en'`. Precedence: component prop > `messages` override > built-in string for the current locale > German. Languages without built-in strings fall back to the `fallback` language; Vuetify's tables are bundled for de, fr, en and it only, so pass others (from `vuetify/locale`) in `messages`.

Apps using Vuetify's vue-i18n adapter can merge `idiotikonUiMessages[lang]` under `$vuetify.idi`, or use `createIdiotikonLocaleMessages(options)` to get the full per-language tables.

### Sass Variables & Styles

```scss
// In your app's main SCSS file
@use '@idiotikon/ui/settings' as idiotikon;

@use 'vuetify' with (
  $toolbar-height: idiotikon.$toolbar-height
);

@use '@idiotikon/ui/styles';
```

### Components

#### Layout
- **`<IdiContainer>`** — Vuetify container wrapper with consistent spacing and styling

#### Navigation
- **`<NavDrawer>`** — Navigation sidebar with collapsible menu items
- **`<NavItems>`** — Recursive navigation list; pass `items` array for nested menus
- **`<ScrollToTop>`** — Floating button that scrolls page to top on click

#### Content Cards
- **`<CurtainTile>`** — Image tile with sliding content overlay on hover/active state
  - Props: `imgUrl`, `title`, `content`, `actionText`, `gradient`, `active`
- **`<GeneralTile>`** — Generic content card for text/media
- **`<ImageTile>`** — Image card with optional caption
- **`<Announcement>`** — News/announcement card with expandable detail
- **`<FocusCard>`** — Highlighted card with optional tabs for multi-section content

#### Forms & Input
- **`<SearchField>`** — Search input with icon, debounce, and submit callback
  - Props: `modelValue`, `placeholder`, `clearable`, `autofocus`, `bgColor`, `variant`, `density`

#### Organization
- **`<Accordion>`** — Collapsible panel group for organizing content
  - Props: `items` (array of `{ title, subtitle, content, icon, customClass }`)
- **`<ContactInfo>`** — Display contact details (email, phone, address)
- **`<Footer>`** — Idiotikon org footer with links and branding
- **`<SocialLinks>`** — Social media icon links
- **`<ImageViewer>`** — Lightbox/modal for viewing images in detail

## Configuration

See [.instructions.md](.instructions.md) for development philosophy and coding guidelines.