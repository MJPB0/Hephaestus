# Hephaestus - Development Conventions

## Project Structure

### File Organization
```
app/                    # Expo Router routes
  _layout.tsx           # Root layout with providers
  (auth)/               # Authentication routes group
  (tabs)/               # Main application routes group
components/             # Reusable UI components
  shared/               # Core themed components
  icons/                # Icon components
  headers/              # Header components
  dashboard/            # Dashboard-specific components
styles/                 # Theme and styling files
hooks/                  # Custom React hooks
utils/                  # Utility functions
assets/                 # Static assets (images, fonts)
__tests__/              # Test utilities and setup
```

### File Naming Conventions

#### Components
- **React Components**: PascalCase (e.g., `ThemedButton.tsx`)
- **Stylesheets**: kebab-case with `.styles.ts` suffix (e.g., `themed-button.styles.ts`)
- **Test Files**: Component name + `.test.tsx` (e.g., `ThemedButton.test.tsx`)
- **Index Files**: `index.tsx` for barrel exports

#### Routes
- **Layout Files**: `_layout.tsx` for navigation configuration
- **Route Files**: lowercase (e.g., `dashboard.tsx`, `login.tsx`)
- **Route Groups**: parentheses syntax `(auth)/`, `(tabs)/`

#### Utilities & Hooks
- **Hooks**: camelCase with `use` prefix (e.g., `useStyles.ts`)
- **Utils**: camelCase (e.g., `logger.ts`, `figmaSync.js`)
- **Constants**: UPPER_SNAKE_CASE in separate files

## Coding Standards

### TypeScript Conventions

#### Interface Definitions
```typescript
// Use interfaces for component props
interface ThemedButtonProps extends PressableProps {
  title: string;
  titleSize?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
}

// Use type for style definitions
type ButtonStyles = {
  container: ViewStyle;
  text: TextStyle;
}

// Use const assertions for literal types
const BUTTON_SIZES = ['sm', 'md', 'lg'] as const;
type ButtonSize = typeof BUTTON_SIZES[number];
```

#### Import/Export Patterns
```typescript
// Prefer named exports for utilities
export const logger = { /* ... */ };
export const createMockTheme = () => { /* ... */ };

// Use default exports for React components
export default function ThemedButton() { /* ... */ }

// Use path aliases for clean imports
import { useStyles } from '@/hooks/useStyles';
import { logger } from '@/utils/logger';
```

### Component Conventions

#### Themed Component Pattern
```typescript
import { useStyles } from '@/hooks/useStyles';

interface Props extends BaseProps {
  variant?: 'light' | 'dark' | 'bright';
}

export default function ThemedComponent({ variant = 'light', ...props }: Props) {
  const { theme, styles } = useStyles(stylesheet);
  
  return (
    <View style={styles.container}>
      {/* Component content */}
    </View>
  );
}

const stylesheet = (theme: Theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    padding: theme.paddings.md,
  },
});
```

#### Icon Component Pattern
```typescript
import ThemedImage, { ThemedImageProps } from '@/components/shared/ThemedImage';

interface IconProps extends ThemedImageProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function IconComponent({ size = 'md', ...props }: IconProps) {
  return (
    <ThemedImage
      source={require('@/assets/images/icon.png')}
      size={size}
      {...props}
    />
  );
}
```

### Styling Conventions

#### Theme Usage
```typescript
// Always use theme values, never hardcoded values
const styles = StyleSheet.create({
  correct: {
    fontSize: theme.font.sizes.md,
    color: theme.colors.text.dark,
    margin: theme.margins.lg,
  },
  incorrect: {
    fontSize: 16,           // ❌ Hardcoded
    color: '#000000',       // ❌ Hardcoded
    margin: 20,             // ❌ Hardcoded
  },
});
```

#### Style Co-location
```typescript
// Component file: ThemedButton.tsx
export default function ThemedButton() { /* ... */ }

// Style file: themed-button.styles.ts
export interface Styles extends Style {
  container: ViewStyle;
  text: TextStyle;
}

export const stylesheet = (theme: Theme) => 
  StyleSheet.create<Styles>({
    container: { /* styles */ },
    text: { /* styles */ },
  });
```

### State Management Patterns

#### Local State
```typescript
// Use descriptive state variable names
const [isLoading, setIsLoading] = useState(false);
const [activeTab, setActiveTab] = useState<TabType>('dashboard');
const [userInput, setUserInput] = useState('');

// Group related state
const [formState, setFormState] = useState({
  email: '',
  password: '',
  isValid: false,
});
```

#### Navigation State
```typescript
// Use typed router from expo-router
import { router } from 'expo-router';

// Navigate with type safety
router.push('/dashboard');
router.replace('/login');

// Pass parameters with types
router.push({
  pathname: '/timer',
  params: { duration: '300', type: 'workout' }
});
```

## Testing Conventions

### Test File Organization
```typescript
// Component tests co-located with components
components/
  shared/
    ThemedButton.tsx
    ThemedButton.test.tsx
    
// Utility tests in separate test directory
__tests__/
  utils/
    testUtils.tsx
    mockFactories.ts
```

### Test Structure
```typescript
describe('ComponentName', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders with default props', () => {
      // Test basic rendering
    });
  });

  describe('Interactions', () => {
    it('handles user interactions', () => {
      // Test user events
    });
  });

  describe('Props Validation', () => {
    it('validates prop combinations', () => {
      // Test prop edge cases
    });
  });
});
```

### Mock Patterns
```typescript
// Mock external dependencies
jest.mock('@/hooks/useStyles', () => ({
  useStyles: () => ({
    theme: mockTheme,
    styles: mockStyles,
  }),
}));

// Create reusable mock factories
export const createMockTheme = (overrides = {}) => ({
  colors: { text: { light: '#808080' } },
  ...overrides,
});
```

## Documentation Standards

### Code Comments
```typescript
/**
 * Custom hook for theme-aware styling
 * @param stylesheet Function that creates styles from theme
 * @returns Object with theme and computed styles
 */
export function useStyles<T>(stylesheet: (theme: Theme) => T) {
  // Implementation
}

// Inline comments for complex logic
const tabWidth = screenWidth / TAB_COUNT; // Calculate equal tab widths
```

### Component Documentation
```typescript
/**
 * ThemedButton - A pressable button component with theme integration
 * 
 * Features:
 * - Theme-aware styling
 * - Multiple size variants
 * - Accessibility support
 * - Press state animations
 * 
 * @example
 * <ThemedButton 
 *   title="Click me" 
 *   titleSize="lg"
 *   onPress={handlePress} 
 * />
 */
export default function ThemedButton(props: ThemedButtonProps) {
  // Component implementation
}
```

### README Patterns
- **Purpose**: Clear description of component/utility purpose
- **Usage**: Code examples with common use cases
- **Props**: Interface documentation with types and defaults
- **Styling**: Theme integration and customization options

## Error Handling

### Error Boundaries
```typescript
// Use React Error Boundaries for component error isolation
class ErrorBoundary extends React.Component {
  // Implementation with fallback UI
}

// Wrap components that might fail
<ErrorBoundary>
  <ComponentThatMightFail />
</ErrorBoundary>
```

### Async Error Handling
```typescript
// Use try-catch with proper error logging
try {
  const result = await apiCall();
  return result;
} catch (error) {
  logger.api.error('API call failed', { error, context });
  throw new AppError('User-friendly message', error);
}
```

### Validation Patterns
```typescript
// Use TypeScript for compile-time validation
interface ValidatedProps {
  email: string;
  age: number;
}

// Runtime validation for external data
const validateUserInput = (input: unknown): input is ValidatedProps => {
  return typeof input === 'object' && 
         input !== null && 
         'email' in input && 
         'age' in input;
};
```

## Performance Guidelines

### Optimization Patterns
```typescript
// Use React.memo for expensive components
export default React.memo(ExpensiveComponent);

// Use useCallback for stable function references
const handlePress = useCallback(() => {
  // Handler logic
}, [dependency]);

// Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(data);
}, [data]);
```

### Bundle Optimization
- **Lazy Loading**: Use dynamic imports for large components
- **Tree Shaking**: Prefer named imports over default imports
- **Asset Optimization**: Use WebP images and appropriate sizes

## Security Guidelines

### Data Handling
```typescript
// Use secure storage for sensitive data
import * as SecureStore from 'expo-secure-store';

await SecureStore.setItemAsync('authToken', token);
const token = await SecureStore.getItemAsync('authToken');
```

### Input Sanitization
```typescript
// Validate and sanitize user inputs
const sanitizeUserInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};
```

### API Security
```typescript
// Use environment variables for configuration
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
```

## Git Workflow

### Commit Messages
```
feat: add user authentication flow
fix: resolve theme switching bug in dashboard
docs: update component usage examples
style: format code with prettier
refactor: extract common button logic
test: add comprehensive useStyles hook tests
```

### Branch Naming
- **Features**: `feature/user-authentication`
- **Bug Fixes**: `fix/theme-switching-bug`
- **Documentation**: `docs/component-guidelines`
- **Refactoring**: `refactor/button-components`

### Pull Request Guidelines
- **Title**: Clear, descriptive summary
- **Description**: What changed and why
- **Testing**: How the changes were tested
- **Screenshots**: For UI changes
- **Breaking Changes**: Clearly documented

## Accessibility Guidelines

### Semantic Elements
```typescript
// Use proper accessibility properties
<Pressable
  accessible={true}
  accessibilityRole="button"
  accessibilityLabel="Submit form"
  accessibilityHint="Submits the form and navigates to next screen"
>
  <Text>Submit</Text>
</Pressable>
```

### Focus Management
```typescript
// Manage focus for screen readers
import { AccessibilityInfo } from 'react-native';

useEffect(() => {
  AccessibilityInfo.announceForAccessibility('Page loaded');
}, []);
```

### Color Contrast
- Use theme colors that meet WCAG AA standards
- Test with high contrast mode enabled
- Provide alternative visual indicators beyond color

These conventions ensure consistency, maintainability, and quality across the Hephaestus codebase while supporting both current development and future scaling needs.