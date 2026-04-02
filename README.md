# `@idiotikon/ui`

A unified UI package providing Vuetify styling, configuration, and reusable components for Idiotikon applications.

## Philosophy

This package follows a **"bare Vuetify first"** approach:

1. **Start Pure**: Components use gold-standard Vuetify structure with zero custom styling
2. **Build Up Incrementally**: Only add styling when there's a clear, cross-app need
3. **No Framework Lock-in**: Components are Vue 3 + Vuetify 4 only - no Nuxt, no CMS dependencies
4. **Proper Vuetify Patterns**: Use Vuetify's intended component structure, props, and utilities instead of fighting the framework

### Anti-Patterns We Avoid

- ❌ Inline styles (`style="..."`) → Use Vuetify utility classes or props
- ❌ Hardcoded defaults that should be consumer-controlled
- ❌ Custom CSS classes when Vuetify utilities exist
- ❌ `!important` in stylesheets
- ❌ Framework-specific imports (Nuxt, CMS) in UI components  
- ❌ Destructive global resets that break Vuetify defaults

## Package Contents

### Vuetify Configuration

```typescript
import { createIdiotikonVuetify } from '@idiotikon/ui'

const vuetify = createIdiotikonVuetify({
  defaultTheme: 'light',
  themes: { /* your themes */ }
}, ssr)
```

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

All components are generic, framework-agnostic Vue 3 + Vuetify components:

- `<CurtainTile>` - Hover-activated image tile with sliding content
- `<SearchField>` - Search input with icon and submit
- `<Announcement>` - News/announcement card with detail and teaser modes
- `<NavDrawer>` - Navigation drawer with nested menu support
- `<NavItems>` - Recursive navigation list items

## Development Workflow

When lifting components from app-specific code:

1. **Identify**: Find Vuetify anti-patterns and custom styling
2. **Strip**: Remove all custom styling and framework dependencies
3. **Abstract**: Replace app-specific logic with props and events
4. **Pure Vuetify**: Use only Vuetify components, props, and utility classes
5. **Test**: Verify it works with Vuetify defaults
6. **Style**: Only then, add back minimal, cross-app styling if needed

## Styling

### Card Variants

#### `.focus`
* text left flush with title (achieved with reset & manual restyling)
* font sizes: h3 for title, h5 for nested focus cards