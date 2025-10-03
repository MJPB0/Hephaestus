# Copilot Instructions for Hephaestus (RecordProgress)# Hephaestus - AI Coding Guidelines



## Project Overview## Project Overview

This is a React Native progress tracking app built with **Expo Router** (file-based routing), **TypeScript**, and a custom theme system. The architecture emphasizes structured logging, design system integration, and clean component organization.Hephaestus is a React Native digital notepad app for activities and tasks, built with Expo Router for cross-platform deployment. It features timer functionality for workouts, activity logging, and other personal organization tools. The app includes a tab-based navigation system with authentication flow and comprehensive theming support.



## Core Architecture Patterns## Architecture Patterns



### File-Based Routing (Expo Router)### Routing & Navigation

- `app/` directory defines routes automatically- **Expo Router file-based routing**: Use `app/` directory structure with parentheses for groups

- `(tabs)/` and `(auth)/` use **route groups** (parentheses don't create routes)- **Route Groups**: `(auth)/` for authentication, `(tabs)/` for main app navigation

- **Critical**: Style files MUST be outside `app/` directory (use `styles/screens/` instead)- **Root Navigation**: `app/_layout.tsx` wraps entire app with providers, tabs/auth are Stack screens

- Layout files (`_layout.tsx`) configure nested navigation- **Tab Navigation**: Tab switching affects header view state (dashboard vs others) via `setIsDashboard`

- **Navigation Pattern**: Use `router.push("/login")` for programmatic navigation

### Theme System

All styling uses a centralized theme accessed via `useStyles<T>()` hook:### Component Architecture

```typescript- **Themed Components**: All UI components use `useStyles()` hook for consistent theming

const { theme, styles } = useStyles<Styles>(stylesheet);- **Shared Components**: Located in `components/shared/` - `ThemedText`, `ThemedButton`, `ThemedImage`

// theme.colors.background, theme.sizes.xl, theme.margins.lg, etc.- **Component Organization**: Group by feature (`dashboard/`, `headers/`, `icons/`) with co-located stylesheets

```- **Icon Components**: Custom SVG icons in `components/icons/` with size props (`"sm" | "md" | "lg"`)



### Component Architecture### Styling System

- **Shared components**: `ThemedText`, `ThemedImage`, `ThemedButton` - use theme-aware props- **Theme-First Approach**: Always use `useStyles<T>(stylesheet)` hook, never direct styling

- **Icon components**: Wrapper around `ThemedImage` for consistent sizing (`size="md"`)- **Stylesheet Pattern**: Co-locate `.styles.ts` files with components using this structure:

- **Style interfaces**: Each screen/component exports `Styles` interface extending base `Style` type  ```typescript

  export interface Styles extends Style {

## Development Workflows    container: ViewStyle;

    // other styles

### Essential Commands  }

```bash  

npm start                    # Start Expo dev server  export const stylesheet = (theme: Theme) =>

npm run figma:sync          # Sync design tokens from Figma API    StyleSheet.create<Styles>({

npm run deps:install-legacy # Install with React Native compatibility      // styles using theme values

npx expo doctor            # Check project health    }).styles;

eas build --platform all   # Production builds  ```

```- **Theme Access**: Use `theme.colors.*, theme.font.*, theme.sizes.*` for all values

- **Media Queries**: Use `react-native-media-query` StyleSheet for responsive design

### Logging System- **Path Alias**: Use `@/*` imports configured in tsconfig for relative path resolution

Use structured logger instead of console.log:

```typescript### State Management

import logger from '../utils/logger';- **Local State**: Use `useState` for component-specific state (tab view, active states)

- **Global State**: Redux planned for future implementation - prepare components for Redux integration

logger.navigation.tabChange('dashboard');- **Theme State**: Global theme switching via `useStyles` hook with `Appearance.getColorScheme()`

logger.user.buttonPress('Login', 'Login Page');- **Navigation State**: Tab navigation manages view state for header components

logger.auth.login('manual');- **Authentication**: Future auth flow will use secure token storage and automatic route protection

logger.ui.componentMount('Dashboard');

```## Development Workflows



## Project-Specific Conventions### Getting Started

```bash

### Figma Integrationnpm install           # Install dependencies

- `utils/figmaSync.js` - Syncs design tokens to React Native stylesnpx expo start        # Start development server

- `figma-mcp-server.js` - Model Context Protocol server for AI-driven design syncnpx expo start -c     # Start with cleared cache

- Environment variables: `FIGMA_TOKEN`, `FIGMA_FILE_KEY` in `.env````



### Style Organization### Build & Deploy

- `styles/screens/` - Screen-specific styles (outside app/ for Expo Router)```bash

- `styles/theme.types.ts` - Central theme interfacenpm run prebuild              # Clean prebuild

- `styles/light.theme.ts` & `styles/dark.theme.ts` - Theme implementationsnpm run build-ios            # iOS development build via EAS

- Use `react-native-media-query` for responsive styleseas build -p ios --profile development

```

### Tab Navigation Specifics

- Custom circular tabs with calculated positioning using `Dimensions.get("window").width`### Essential Scripts

- Tab state managed in `_layout.tsx` with `isDashboard` boolean- `npm run doctor` - Diagnose Expo setup issues

- Icons use `size="md"` prop for consistency- `npm run lint` - ESLint validation

- `npm test` - Jest testing with watch mode

## Integration Points

### Testing Patterns

### Navigation Flow- **Component Testing**: Use Jest with `react-test-renderer` for component snapshots

```- **Theme Testing**: Test components with both light/dark themes using `useStyles` mock

/ (index) → /login → /dashboard (tabs) ← /logout- **Navigation Testing**: Mock `expo-router` for route testing

```- **Test Files**: Co-locate test files as `ComponentName.test.tsx` next to components



### State Management## Key Dependencies & Integration Points

- Local component state with useState

- Route params for view switching (`day`/`month`)### Core Stack

- Logger tracks all navigation changes- **Expo SDK 51** with Router v3 for navigation

- **TypeScript** with strict mode and path aliases

### External Dependencies- **React Native 0.74** with Reanimated v3

- **expo-router** - File-based routing- **EAS Build** for native builds (iOS simulator support)

- **react-native-popup-menu** - Context menus

- **react-native-media-query** - Responsive styles### UI & Styling

- **@modelcontextprotocol/sdk** - Figma MCP integration- **react-native-media-query**: Responsive StyleSheet creation

- **react-native-safe-area-context**: SafeAreaProvider wrapper

## Critical Development Notes- **react-native-popup-menu**: MenuProvider for popups

- **expo-secure-store**: Secure storage with Face ID permission

### Common Issues

1. **Style files in app/**: Expo Router treats them as routes - move to `styles/screens/`### Navigation Features

2. **Theme access**: Always use `useStyles()` hook, never import themes directly- Header switching based on tab state (`isDashboard` boolean)

3. **Legacy peer deps**: Required for React Native ecosystem compatibility- Custom tab bar styling with absolute positioning and calculated widths

- Router params for view state (`day` | `month` view switching)

### Performance Patterns

- Icons use `expo-image` with `contentFit="contain"`## Project-Specific Conventions

- Pressable components use `activeOpacity={0.5}` consistently

- Tab calculations use `Dimensions.get()` for responsive positioning### File Naming

- Route files: `_layout.tsx` for layouts, lowercase for pages

### Testing Approach- Components: PascalCase (e.g., `ThemedButton.tsx`)

- `jest-expo` preset configured- Styles: `component-name.styles.ts` pattern

- Logger provides structured debugging output- Icons: PascalCase matching their usage (e.g., `Home.tsx`)

- Component lifecycle tracked via `logger.ui.*` methods

### Component Props Pattern

## Quick Reference```typescript

export type ThemedTextProps = TextProps & {

### Adding New Screen  variant?: "bright" | "dark";

1. Create in `app/` directory  type?: "title" | "subTitle" | "caption" | "headline" | "body";

2. Create styles in `styles/screens/`};

3. Add structured logging for user actions```

4. Use `ThemedText` and theme-aware components

### Theme Usage Pattern

### Design Token Updates- Always destructure `{ theme, styles }` from `useStyles()`

1. Update Figma designs- Use theme constants: `theme.colors.text.light`, `theme.sizes.md`

2. Run `npm run figma:sync`- Component-specific styles via typed stylesheet functions

3. Review generated styles in terminal

4. Apply manually to style files (sync shows recommendations)### Common Gotchas

- **Project Purpose**: Hephaestus is a digital notepad for activities with timer functionality, not specifically a progress tracking app

### Debugging Navigation- **Themes**: Light/dark themes currently identical (WIP - will be differentiated)

Check logger output for navigation flow:- **Authentication**: Auth layer WIP - expect secure token-based flow with route guards

```- **State Management**: Redux integration planned - design components for future Redux connection

[INFO] [NAVIGATION] Navigating to: /dashboard- **Tab Bar**: Requires manual width calculations for centering

[INFO] [NAVIGATION] Tab changed to: statistics- **Local Development**: Focus on local development - deployment workflows WIP

```- Always use SafeAreaProvider wrapper at root level

This architecture prioritizes maintainability through structured logging, consistent theming, and clear separation between routing and styling concerns.