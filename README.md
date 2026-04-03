# Card UI Dashboard

A responsive status card dashboard built with React, TypeScript, and Vite. Displays project health metrics with resource usage gauges, stats, and segmented status bars.

## Screenshots

### Light Theme — Normal View (Desktop)
![Light theme - 3 column grid with segmented gauges](docs/screenshots/light-desktop.png)

### Dark Theme — Compact View (Desktop)
![Dark theme - 4 column compact grid](docs/screenshots/dark-desktop.png)

### Responsive — Compact View (Tablet 768px)
![Tablet view - 2 column compact grid](docs/screenshots/responsive-tablet.png)

### Responsive — Normal View (Mobile 375px)
![Mobile view - single column with icon toolbar](docs/screenshots/responsive-mobile.png)

## Features

- **9 Status Cards** in a responsive 3-column grid (3 cols > 2 cols > 1 col)
- **7 Resource Gauges** per card (CPU, MEM, DSK, NET, GPU, I/O, THR) with proportional fill bars and background tracks
- **Solid / Segmented gauge modes** — toggle between continuous fill and 8-segment blocks
- **100% gauges highlighted** in amber/orange to signal resource saturation
- **Percentage Labels** on gauges with a global toggle to show/hide
- **Priority Borders** — red for critical cards, gold for warning cards, with a legend and toggle to enable/disable
- **Compact View** — 4-column dense layout with title-only headers, mini gauges (3 states), thin status bars, and vertical stats
- **Dark Theme** with a one-click toggle (sun/moon icon)
- **Responsive Toolbar** — labels auto-hide on small screens, buttons wrap to fit
- **Segmented Status Bar** showing error/warning/info distribution
- **Expandable Cards** with additional detail panels
- **Tooltips** on gauges and segments for precise values

## Tech Stack

- **React 19** + **TypeScript 5.9**
- **Vite 8** for dev server and bundling
- **Ant Design 6** for icons, tooltips, and typography
- CSS custom properties for theming (no CSS-in-JS)

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens a local dev server at `http://localhost:5173` with hot module replacement.

### Build

```bash
npm run build
```

Outputs production files to `dist/`. TypeScript is type-checked before bundling.

### Preview Production Build

```bash
npm run preview
```

Serves the built `dist/` folder locally for testing.

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
  App.tsx              # Grid layout, 9 card data sets, theme + percent toggles
  App.css              # Grid, toolbar, responsive breakpoints
  index.css            # CSS custom properties (light/dark themes)
  components/
    StatusCard.tsx      # StatusCard, UsageGauge, SegmentedBar components
    StatusCard.css      # Card, gauge, stats, segment styles
```
