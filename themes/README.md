# Themes Directory

This directory contains global theme styling for the PerfectoExamplePages project.

## Structure

- `default.css` - The default theme with light and dark mode support
- `nord.css` - Nord theme based on the popular Nord color palette (https://www.nordtheme.com/)

## Usage

### Static Theme Loading

To apply a specific theme to an HTML page, include this link in the `<head>` section:

```html
<link rel="stylesheet" href="themes/default.css">
```

Or for pages in subdirectories (like `examples/`):

```html
<link rel="stylesheet" href="../themes/default.css">
```

### Dynamic Theme Switching

The project supports dynamic theme switching through the `theme.js` utility. When included in a page, users can switch between available themes using a theme picker dropdown.

**For the index page:**
1. Include `theme.js` in your HTML: `<script src="./theme.js" defer></script>`
2. Add a theme picker select element with id `themePicker`:
```html
<select id="themePicker" aria-label="Select theme">
  <option value="default">Default</option>
  <option value="nord">Nord</option>
</select>
```
3. The theme.js utility will automatically:
   - Load the selected theme CSS file
   - Remember the user's theme preference in localStorage
   - Sync theme selection across multiple tabs
   - Support both light and dark modes for each theme

**For example pages:**
Include `theme.js` from the parent directory:
```html
<script src="../theme.js" defer></script>
```

## Theme Variables

The default theme provides the following CSS custom properties (variables):

### Typography
- `--font-sans` - Sans-serif font stack

### Colors (Light Mode)
- `--color-bg` - Main background color
- `--color-bg-alt` - Alternative background color
- `--color-surface` - Surface/card background
- `--color-surface-alt` - Alternative surface color
- `--color-border` - Border color
- `--color-border-strong` - Stronger border color
- `--color-text` - Primary text color
- `--color-text-dim` - Dimmed/secondary text color
- `--color-text-light` - Light text color
- `--color-accent` - Accent/brand color
- `--color-accent-hover` - Accent hover state
- `--color-accent-subtle` - Subtle accent background
- `--color-warn` - Warning color
- `--color-danger` - Danger/error color
- `--color-danger-bg` - Danger background
- `--color-success` - Success color

### Shadows
- `--shadow-xs` - Extra small shadow
- `--shadow-sm` - Small shadow
- `--shadow-md` - Medium shadow

### Border Radius
- `--radius-xs` - Extra small radius (4px)
- `--radius-sm` - Small radius (6px)
- `--radius` - Default radius (12px)
- `--radius-md` - Medium radius (10px)
- `--radius-lg` - Large radius (18px)
- `--radius-pill` - Pill/rounded radius (999px)

### Transitions
- `--transition` - Default transition timing
- `--focus-ring` - Focus ring shadow

## Dark Mode

Dark mode is automatically applied when the `data-theme="dark"` attribute is set on the `<html>` element. The theme toggle functionality is handled by `theme.js` in the root directory.

## Creating New Themes

To create a new theme:

1. **Create a new CSS file** in this directory (e.g., `custom.css`)
2. **Define the same CSS custom properties** with different values for both `:root` (light mode) and `[data-theme="dark"]` (dark mode)
3. **Update theme.js** to include your theme in the `AVAILABLE_THEMES` array:
   ```javascript
   const AVAILABLE_THEMES = ['default', 'nord', 'custom'];
   ```
4. **Add the option** to the theme picker in `index.html`:
   ```html
   <select id="themePicker" aria-label="Select theme">
     <option value="default">Default</option>
     <option value="nord">Nord</option>
     <option value="custom">Custom</option>
   </select>
   ```

### Theme Best Practices

- **Use CSS custom properties (variables)** for all color values to enable easy theming
- **Support both light and dark modes** in your theme file
- **Keep the same variable names** as defined in `default.css` for consistency
- **Test your theme** with all example pages to ensure compatibility
- **Document your color palette** in comments at the top of your theme file

Example page-specific override:

```html
<link rel="stylesheet" href="../themes/default.css">
<style>
  /* Page-specific theme overrides */
  :root {
    --color-accent: #6366f1;
  }
</style>
```
