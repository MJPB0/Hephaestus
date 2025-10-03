---
applyTo: "app/**/*.{tsx,ts}"
---

# Architecture & Routing Instructions

## Expo Router File-Based Routing

### Route Structure
- `app/` directory defines routes automatically
- `(tabs)/` and `(auth)/` use **route groups** (parentheses don't create routes)
- Layout files (`_layout.tsx`) configure nested navigation
- **CRITICAL**: Never put style files in `app/` directory - they become routes

### Navigation Patterns
```typescript
// Use router for programmatic navigation
import { router } from "expo-router";
router.push("/dashboard");
router.replace("/login");

// Access route parameters
import { useLocalSearchParams } from "expo-router";
const { view } = useLocalSearchParams<{ view: "day" | "month" }>();
```

### Route Groups
- `(tabs)/` - Main app navigation with tab bar
- `(auth)/` - Authentication flow screens
- Root `app/` - Landing and global screens

### Stack Navigation Setup
```typescript
// Root layout pattern
<SafeAreaProvider>
  <MenuProvider>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  </MenuProvider>
</SafeAreaProvider>
```

### Tab Navigation Specifics
- Tab state managed via `isDashboard` boolean
- Route params control view state (`day`/`month`)
- Custom tab styling with calculated positioning
- Tab press listeners for state management and logging

### Navigation Flow
```
/ (index) → /login → /dashboard (tabs) ← /logout
```

## Best Practices
1. Always use `router` for navigation, not direct component navigation
2. Implement proper loading states for route transitions
3. Use route parameters for view state management
4. Add structured logging for all navigation events
5. Handle back navigation gracefully with proper state cleanup