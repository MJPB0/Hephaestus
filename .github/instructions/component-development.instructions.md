---
applyTo: "components/**/*.{tsx,ts}"
---

# Component Development Instructions

## Component Architecture

### Shared Components
Located in `components/shared/` - reusable across the app:
- `ThemedText` - Typography with theme variants
- `ThemedImage` - Images with consistent sizing
- `ThemedButton` - Buttons with theme integration
- `PopupMenu` - Context menus with consistent styling

### Icon Components
Located in `components/icons/` - wrapper pattern around `ThemedImage`:
```typescript
// Icon component pattern
import ThemedImage, { ThemedImageProps } from "../shared/ThemedImage";

export default function IconName(props: ThemedImageProps) {
  return (
    <ThemedImage source={require(`../../assets/images/icon.png`)} {...props} />
  );
}
```

### Feature Components
Organized by feature domains:
- `components/dashboard/` - Dashboard-specific components
- `components/headers/` - Header components

### Component Props Patterns
```typescript
// Extend base props with theme-aware additions
export type ThemedComponentProps = BaseProps & {
  size?: keyof Theme["sizes"];
  variant?: "primary" | "secondary";
  isPressable?: boolean;
};

// Use generic styling interface
interface ComponentProps {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
}
```

### Component Structure
```typescript
// Standard component file structure
import React from 'react';
import { View } from 'react-native';
import { useStyles } from '../../hooks/useStyles';
import { Styles, stylesheet } from './component.styles';
import logger from '../../utils/logger';

export default function ComponentName({ ...props }: ComponentProps) {
  const { theme, styles } = useStyles<Styles>(stylesheet);
  
  // Component logic
  
  return (
    <View style={styles.container}>
      {/* Component JSX */}
    </View>
  );
}
```

### State Management in Components
```typescript
// Local state with proper typing
const [isActive, setIsActive] = useState<boolean>(false);

// Effect cleanup and logging
useEffect(() => {
  logger.ui.componentMount('ComponentName');
  
  return () => {
    logger.ui.componentUnmount('ComponentName');
  };
}, []);

// State change logging
useEffect(() => {
  logger.ui.stateChange('ComponentName', 'isActive', isActive);
}, [isActive]);
```

### Image Handling
```typescript
// Use expo-image for performance
import { Image } from "expo-image";

// Consistent image props
<Image
  style={[{ width: theme.sizes[size], height: theme.sizes[size] }, style]}
  contentFit="contain"
  source={source}
/>
```

### Pressable Components
```typescript
// Consistent pressable pattern
import { PressableOpacity } from "react-native-pressable-opacity";

<PressableOpacity
  onPress={onPress}
  activeOpacity={0.5}
  style={styles.pressable}
>
  {children}
</PressableOpacity>
```

## Best Practices
1. **Use TypeScript interfaces** for all props and state
2. **Co-locate styles** with component files
3. **Implement proper logging** for user interactions
4. **Follow consistent naming** - PascalCase for components
5. **Use theme-aware props** for customization
6. **Implement proper cleanup** in useEffect hooks
7. **Export component and props types** for reusability
8. **Use consistent file structure** across all components