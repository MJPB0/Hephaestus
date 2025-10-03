---
applyTo: "**/*.{tsx,ts}"
exclude: "node_modules/**"
---

# Theme & Styling Instructions

## Theme System Architecture

### useStyles Hook Pattern
```typescript
// ALWAYS use this pattern for styling
import { useStyles } from "../../hooks/useStyles";
import { Styles, stylesheet } from "./component.styles";

const { theme, styles } = useStyles<Styles>(stylesheet);
```

### Stylesheet Structure
```typescript
// File: component.styles.ts
import { ViewStyle, TextStyle } from "react-native";
import StyleSheet from "react-native-media-query";
import { Style } from "../../styles/style";
import { Theme } from "../../styles/theme.types";

export interface Styles extends Style {
  container: ViewStyle;
  text: TextStyle;
}

export const stylesheet = (theme: Theme) =>
  StyleSheet.create<Styles>({
    container: {
      backgroundColor: theme.colors.background,
      padding: theme.paddings.md,
      margin: theme.margins.lg,
    },
  }).styles;
```

### Style File Organization
- **Components**: Co-locate styles with components as `component.styles.ts`
- **Screens**: Use `styles/screens/` directory structure
- **Shared**: Global styles in `styles/` root
- **Theme**: `light.theme.ts` and `dark.theme.ts` for theme definitions

### Theme Access Patterns
```typescript
// Access theme values
theme.colors.background
theme.colors.tabBar.highlight
theme.font.sizes.md
theme.sizes.xl
theme.margins.lg
theme.paddings.sm
```

### Responsive Design
```typescript
// Use react-native-media-query for responsive styles
import StyleSheet from "react-native-media-query";

// Use Dimensions for dynamic calculations
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
```

### Component Theming
```typescript
// Themed components pattern
export type ThemedTextProps = TextProps & {
  variant?: "bright" | "dark";
  type?: "title" | "subTitle" | "caption" | "headline" | "body";
};

// Apply theme in component
const props = {
  fontSize: theme.font.sizes.md,
  fontWeight: theme.font.weight.regular,
  color: variant === "bright" ? theme.colors.text.light : theme.colors.text.dark,
};
```

## Best Practices
1. **Never import themes directly** - always use `useStyles()` hook
2. **Co-locate styles** with components for maintainability
3. **Use theme tokens** instead of hardcoded values
4. **Export typed interfaces** for all style objects
5. **Leverage responsive utilities** for cross-device compatibility
6. **Follow naming conventions**: `component-name.styles.ts`