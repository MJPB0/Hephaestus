# Hephaestus - Tech Stack Overview

## Core Technologies

### React Native 0.74
- **Purpose**: Cross-platform mobile app framework
- **Version**: 0.74 with Hermes engine
- **Benefits**: 
  - Native performance with JavaScript
  - Shared codebase across iOS and Android
  - Hot reloading for fast development
  - Rich ecosystem of native modules

### Expo SDK 51
- **Purpose**: Development platform and toolkit for React Native
- **Key Features**:
  - Managed workflow with automatic native dependencies
  - Over-the-air updates capability
  - Simplified build and deployment process
  - Rich set of APIs (Camera, Location, Notifications, etc.)
- **Build System**: EAS Build for native compilation

### TypeScript 5.9+
- **Purpose**: Type-safe JavaScript development
- **Configuration**: Strict mode enabled with path aliases
- **Benefits**:
  - Compile-time error catching
  - Enhanced IDE support and IntelliSense
  - Better code maintainability
  - Self-documenting interfaces

## Navigation & Routing

### Expo Router v6 (File-based)
- **Architecture**: File-system based routing similar to Next.js
- **Route Structure**:
  ```
  app/
    _layout.tsx         # Root layout with providers
    index.tsx           # Landing/redirect page
    (auth)/             # Authentication group
      login.tsx         # Login screen
      logout.tsx        # Logout screen
    (tabs)/             # Main app tab group
      dashboard.tsx     # Home dashboard
      statistics.tsx    # Statistics view
      timer.tsx         # Timer functionality
  ```
- **Features**:
  - Automatic route generation
  - Type-safe navigation
  - Deep linking support
  - Route groups with parentheses syntax

### Navigation State Management
- **Tab Navigation**: Custom tab bar with dynamic positioning
- **Header Management**: Context-aware headers based on active tab
- **Route Params**: Type-safe parameter passing between screens

## Styling & Theming

### Custom Theme System
- **Implementation**: Centralized theme with `useStyles()` hook
- **Architecture**:
  ```typescript
  // Theme structure
  interface Theme {
    colors: { text, background, button, etc. }
    font: { sizes, weights, family }
    sizes: { sm, md, lg, xl }
    margins: { xs, sm, md, lg, xl }
    paddings: { xs, sm, md, lg, xl }
  }
  ```

### Responsive Design
- **Tool**: `react-native-media-query` for responsive StyleSheets
- **Pattern**: Mobile-first approach with breakpoint-based styling
- **Theme Integration**: All components use theme-aware styling

### Component Architecture
- **Themed Components**: `ThemedText`, `ThemedButton`, `ThemedImage`
- **Icon System**: Consistent icon components with size props
- **Style Co-location**: Component-specific stylesheets next to components

## State Management

### Current Implementation
- **Local State**: React hooks (`useState`, `useEffect`) for component state
- **Theme State**: Global theme switching with system preference detection
- **Navigation State**: Tab and route state managed by Expo Router

### Future Architecture (Planned)
- **Redux Toolkit**: For complex application state
- **RTK Query**: For server state and data fetching
- **Persist**: State persistence for user preferences

## Development Tools

### Testing Framework
- **Jest**: JavaScript testing framework with expo preset
- **Testing Library**: React Native Testing Library for component tests
- **Coverage**: Built-in Jest coverage reporting
- **Mocking**: Comprehensive mocks for React Native ecosystem

### Code Quality
- **ESLint**: Expo configuration with custom Jest rules
- **TypeScript**: Strict type checking with path aliases
- **Prettier**: (Planned) Code formatting consistency

### Build & Development
- **Metro**: React Native bundler with custom configuration
- **EAS Build**: Cloud-based native builds for iOS/Android
- **Hot Reload**: Fast development iteration with instant updates

## Native Integrations

### Expo Modules
- **expo-image**: Optimized image handling with caching
- **expo-secure-store**: Encrypted storage for sensitive data
- **expo-router**: File-based navigation system
- **expo-constants**: App configuration and environment variables

### Third-party Libraries
- **react-native-safe-area-context**: Safe area handling
- **react-native-popup-menu**: Context menus and dropdowns
- **react-native-reanimated**: High-performance animations
- **react-native-gesture-handler**: Advanced gesture recognition

## Performance Considerations

### Optimization Strategies
- **Image Optimization**: `expo-image` with content fitting
- **Bundle Splitting**: Route-based code splitting with Expo Router
- **Memory Management**: Proper cleanup in useEffect hooks
- **Rendering**: Optimized re-renders with React.memo where needed

### Monitoring
- **Development**: Metro bundler performance metrics
- **Production**: Expo Analytics for crash reporting and performance

## Security

### Data Protection
- **Secure Storage**: `expo-secure-store` for sensitive data
- **Authentication**: Token-based auth with secure storage
- **API Security**: HTTPS endpoints with proper error handling

### Best Practices
- **No Hardcoded Secrets**: Environment variables for configuration
- **Input Validation**: TypeScript interfaces for type safety
- **Secure Defaults**: Conservative security settings

## Deployment

### Build Process
- **Development**: `expo start` for local development
- **Testing**: `eas build --profile development` for testing builds
- **Production**: `eas build --profile production` for app stores

### Distribution
- **iOS**: App Store Connect via EAS Submit
- **Android**: Google Play Console via EAS Submit
- **OTA Updates**: Expo Updates for non-native changes

### Environment Management
- **Development**: Local environment with hot reload
- **Staging**: EAS development builds for testing
- **Production**: App store builds with optimizations

## Architecture Benefits

### Developer Experience
- **Type Safety**: Full TypeScript coverage reduces runtime errors
- **Hot Reload**: Instant feedback during development
- **File-based Routing**: Intuitive navigation structure
- **Unified Styling**: Consistent theming across all components

### Performance
- **Native Performance**: React Native bridge for platform features
- **Optimized Images**: Expo Image with caching and optimization
- **Efficient Bundling**: Metro bundler with tree shaking
- **Smooth Animations**: Reanimated for 60fps animations

### Maintainability
- **Modular Architecture**: Clear separation of concerns
- **Consistent Patterns**: Standardized component and styling patterns
- **Comprehensive Testing**: Test coverage for critical functionality
- **Documentation**: Inline comments and external documentation

### Scalability
- **Component Reusability**: Shared themed components
- **Route Organization**: File-based routing scales with app growth
- **State Management**: Prepared for Redux integration
- **Build System**: EAS scales from development to enterprise