# Web Manifest Configuration

This document explains how to configure and maintain the Progressive Web App (PWA) manifest for Ponderless.

## Overview

The web manifest (`site.webmanifest`) makes Ponderless installable as a Progressive Web App, providing native app-like experiences on mobile and desktop devices.

## File Structure

```
├── public/
│   └── site.webmanifest          # The actual manifest file served to browsers
├── src/config/
│   └── manifest.ts              # Modular TypeScript configuration
└── scripts/
    └── generate-manifest.ts     # Script to regenerate manifest from config
```

## Configuration

### Main Configuration File: `src/config/manifest.ts`

This file contains the complete manifest configuration with TypeScript types for safety:

```typescript
import { siteConfig, metaThemeColors } from "@/config/site";

export const manifestConfig: WebManifest = {
  name: siteConfig.name,
  short_name: siteConfig.shortName,
  description: siteConfig.description,
  theme_color: metaThemeColors.light,
  background_color: metaThemeColors.light,
  display: "standalone",
  orientation: "portrait",
  scope: "/",
  start_url: "/",
  id: "ponderless-app",
  // ... icons, shortcuts, screenshots, etc.
};
```

### Key Features

1. **Automatic Sync**: The manifest configuration automatically syncs with your existing site configuration (`src/config/site.ts`)

2. **Type Safety**: Full TypeScript support with interfaces for all manifest properties

3. **Modular**: Easy to extend and modify without touching the actual manifest file

## Icons

The manifest includes a comprehensive set of icons for different platforms:

- **Standard Icons**: 72x72 to 512x512 pixels for various devices
- **Maskable Icons**: Special icons that work with adaptive icon systems
- **Purpose-specific Icons**: Icons optimized for different use cases

### Icon Structure
```
public/icons/
├── icon-72x72.png
├── icon-96x96.png
├── icon-128x128.png
├── icon-144x144.png
├── icon-152x152.png
├── icon-192x192.png
├── icon-384x384.png
├── icon-512x512.png
├── icon-192x192-maskable.png
├── icon-512x512-maskable.png
├── workout-96x96.png            # Shortcut icon
└── dashboard-96x96.png          # Shortcut icon
```

## App Shortcuts

Shortcuts provide quick access to key features from the app icon:

1. **Daily Mental Workout** (`/workout`) - Direct access to training sessions
2. **Progress Dashboard** (`/dashboard`) - View progress and analytics

## Screenshots

Screenshots help users understand the app before installation:

- **Desktop screenshots**: 1920x1080 (wide form factor)
- **Mobile screenshots**: 1080x1920 (narrow form factor)

### Screenshot Structure
```
public/screenshots/
├── desktop-home.png
├── desktop-dashboard.png
└── mobile-workout.png
```

## Usage

### Making Changes

1. **Edit the configuration** in `src/config/manifest.ts`
2. **Regenerate the manifest** by running:
   ```bash
   npx tsx scripts/generate-manifest.ts
   ```
3. **Verify the changes** in `public/site.webmanifest`

### Adding New Shortcuts

```typescript
shortcuts: [
  {
    name: "New Feature",
    short_name: "Feature",
    description: "Access the new feature",
    url: "/new-feature",
    icons: [
      {
        src: "/icons/feature-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
    ],
  },
  // ... existing shortcuts
],
```

### Updating Categories

```typescript
categories: ["education", "productivity", "health", "lifestyle"],
```

### Modifying Display Mode

```typescript
display: "standalone" | "fullscreen" | "minimal-ui" | "browser"
```

## Best Practices

1. **Keep manifest in sync**: Always regenerate after config changes
2. **Test on devices**: Verify PWA installation on different platforms
3. **Optimize icons**: Use proper sizes and formats for all icons
4. **Update screenshots**: Keep screenshots current with app changes
5. **Monitor performance**: Check PWA lighthouse scores regularly

## Troubleshooting

### Common Issues

1. **Icons not displaying**: Ensure all icon files exist in `public/icons/`
2. **Manifest not updating**: Run the generation script after config changes
3. **Installation not working**: Check that all required fields are present

### Validation

The manifest includes a validation function:

```typescript
import { isValidManifest } from "@/config/manifest";

if (!isValidManifest(manifestData)) {
  console.error("Invalid manifest configuration");
}
```

## Links

- [Web App Manifest Specification](https://www.w3.org/TR/appmanifest/)
- [PWA Manifest Generator](https://app-manifest.firebaseapp.com/)
- [Lighthouse PWA Audit](https://developers.google.com/web/tools/lighthouse/audits/manifest)