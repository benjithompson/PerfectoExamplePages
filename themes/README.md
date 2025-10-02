# Themes Directory

This directory contains global theme styling for the PerfectoExamplePages project.

## Structure

- `default.css` - The default theme with light and dark mode support

## Usage

To apply the default theme to an HTML page, include this link in the `<head>` section:

```html
<link rel="stylesheet" href="themes/default.css">
```

Or for pages in subdirectories (like `examples/`):

```html
<link rel="stylesheet" href="../themes/default.css">
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

1. Create a new CSS file in this directory (e.g., `custom.css`)
2. Define the same CSS custom properties with different values
3. Include your theme file instead of `default.css` in your HTML pages
4. Optionally override specific variables for page-specific customization

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
