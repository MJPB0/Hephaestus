# Hephaestus - Architecture Patterns

## Core Architectural Principles

### Theme-First Design System
The application is built around a centralized theme system that ensures visual consistency and maintainable styling across all components.

#### Theme Structure
```typescript
interface Theme {
  colors: {
    background: string;
    text: { light: string; dark: string; bright: string };
    button: { background: string; highlight: string; text: { default: string; highlight: string } };
  };
  font: {
    sizes: { sm: number; md: number; lg: number; xl: number; xxl: number };
    weight: { regular: string; medium: string; bold: string };
    family: string;
  };
  sizes: { sm: number; md: number; lg: number; xl: number };
  margins: { xs: number; sm: number; md: number; lg: number; xl: number };
  paddings: { xs: number; sm: number; md: number; lg: number; xl: number };
}
```

#### Theme Implementation Pattern
```typescript
// 1. Theme Hook Usage
const { theme, styles } = useStyles(stylesheet);

// 2. Stylesheet Factory
const stylesheet = (theme: Theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    padding: theme.paddings.md,
  },
  text: {
    color: theme.colors.text.dark,
    fontSize: theme.font.sizes.md,
  },
});

// 3. Component Implementation
export default function Component() {
  const { theme, styles } = useStyles(stylesheet);
  return <View style={styles.container} />;
}
```

### File-Based Routing Architecture
Expo Router provides automatic route generation based on file structure, creating a scalable navigation system.

#### Route Organization
```
app/
  _layout.tsx           # Root layout with global providers
  index.tsx             # Entry point (typically redirects)
  
  (auth)/               # Authentication flow group
    _layout.tsx         # Auth-specific layout
    login.tsx           # Login screen
    logout.tsx          # Logout screen
    
  (tabs)/               # Main application group
    _layout.tsx         # Tab navigation layout
    dashboard.tsx       # Home/dashboard screen
    statistics.tsx      # Statistics view
    timer.tsx           # Timer functionality
```

#### Navigation State Management
```typescript
// Tab state managed at layout level
const [isDashboard, setIsDashboard] = useState(true);

// Header adapts to current tab
{isDashboard ? <DashboardHeader /> : <TabsHeader />}

// Route parameters for view switching
const { view } = useLocalSearchParams<{ view: 'day' | 'month' }>();
```

### Component Architecture Patterns

#### Themed Component Pattern
All UI components follow a consistent theming pattern:

```typescript
// 1. Props Interface
interface ThemedComponentProps extends BaseProps {
  variant?: 'light' | 'dark' | 'bright';
  size?: 'sm' | 'md' | 'lg';
}

// 2. Component Implementation
export default function ThemedComponent({ 
  variant = 'light', 
  size = 'md',
  style,
  ...props 
}: ThemedComponentProps) {
  const { theme, styles } = useStyles(stylesheet);
  
  return (
    <BaseComponent 
      style={[
        styles.base,
        styles[variant],
        styles[size],
        style
      ]}
      {...props}
    />
  );
}

// 3. Style Factory
const stylesheet = (theme: Theme) => StyleSheet.create({
  base: {
    fontFamily: theme.font.family,
  },
  light: {
    color: theme.colors.text.light,
  },
  dark: {
    color: theme.colors.text.dark,
  },
  sm: {
    fontSize: theme.font.sizes.sm,
  },
  md: {
    fontSize: theme.font.sizes.md,
  },
});
```

#### Icon Component Pattern
Icon components wrap `ThemedImage` with consistent sizing:

```typescript
interface IconProps extends ThemedImageProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function Icon({ size = 'md', ...props }: IconProps) {
  return (
    <ThemedImage
      source={require('@/assets/images/icon.png')}
      size={size}
      contentFit="contain"
      {...props}
    />
  );
}
```

### State Management Architecture

#### Current Implementation (Hook-based)
```typescript
// Local component state
const [isActive, setIsActive] = useState(false);
const [selectedTab, setSelectedTab] = useState<TabType>('dashboard');

// Global theme state
const { theme } = useStyles();

// Navigation state
const router = useRouter();
const segments = useSegments();
```

#### Planned Redux Architecture
```typescript
// Store structure (planned)
interface RootState {
  auth: AuthState;
  ui: UIState;
  data: DataState;
  timer: TimerState;
}

// Slice pattern
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => { /* ... */ },
    logout: (state) => { /* ... */ },
  },
});
```

### Styling Architecture

#### Responsive Design Pattern
```typescript
import MediaQuery from 'react-native-media-query';

const { styles } = MediaQuery.create({
  container: {
    padding: 16,
    '@media (max-width: 600px)': {
      padding: 8,
    },
  },
});
```

#### Style Co-location Pattern
```
components/
  shared/
    ThemedButton.tsx              # Component implementation
    themed-button.styles.ts       # Component-specific styles
    ThemedButton.test.tsx         # Component tests
```

### Data Flow Patterns

#### Props Down, Events Up
```typescript
// Parent manages state
const [items, setItems] = useState<Item[]>([]);

// Child receives props and emits events
<ItemList 
  items={items}
  onItemSelect={handleItemSelect}
  onItemDelete={handleItemDelete}
/>

// Child implementation
interface ItemListProps {
  items: Item[];
  onItemSelect: (item: Item) => void;
  onItemDelete: (id: string) => void;
}
```

#### Custom Hook Pattern
```typescript
// Encapsulate complex logic in custom hooks
export function useTimerState(initialDuration: number) {
  const [duration, setDuration] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  
  const start = useCallback(() => {
    setIsRunning(true);
    setStartTime(new Date());
  }, []);
  
  const stop = useCallback(() => {
    setIsRunning(false);
    setStartTime(null);
  }, []);
  
  return { duration, isRunning, start, stop };
}
```

### Error Handling Architecture

#### Error Boundary Pattern
```typescript
// Component-level error boundaries
export function ComponentErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={<ErrorFallback />}
      onError={(error, errorInfo) => {
        logger.ui.error('Component error', { error, errorInfo });
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

// Screen-level error handling
export function ScreenErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={<ScreenErrorFallback />}
      onError={(error, errorInfo) => {
        logger.navigation.error('Screen error', { error, errorInfo });
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
```

#### Async Error Handling
```typescript
// Standardized error handling for async operations
export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  context: string
): Promise<T | null> {
  try {
    return await operation();
  } catch (error) {
    logger.api.error(`${context} failed`, { error });
    // Show user-friendly error message
    return null;
  }
}
```

### Performance Optimization Patterns

#### Memoization Strategy
```typescript
// Component memoization
export default React.memo(ExpensiveComponent, (prevProps, nextProps) => {
  return prevProps.data.id === nextProps.data.id;
});

// Value memoization
const expensiveCalculation = useMemo(() => {
  return calculateComplexValue(data);
}, [data]);

// Callback memoization
const stableCallback = useCallback((id: string) => {
  handleAction(id);
}, [handleAction]);
```

#### Lazy Loading Pattern
```typescript
// Component lazy loading
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// Route-based code splitting
export default function Screen() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LazyComponent />
    </Suspense>
  );
}
```

### Testing Architecture

#### Test Structure Pattern
```typescript
// Arrange-Act-Assert pattern
describe('Component', () => {
  it('should handle user interaction', () => {
    // Arrange
    const mockHandler = jest.fn();
    const props = { onPress: mockHandler };
    
    // Act
    render(<Component {...props} />);
    fireEvent.press(screen.getByRole('button'));
    
    // Assert
    expect(mockHandler).toHaveBeenCalledWith(expectedArgs);
  });
});
```

#### Mock Strategy Pattern
```typescript
// Centralized mock factories
export const createMockTheme = (overrides = {}) => ({
  colors: { text: { light: '#808080' } },
  font: { sizes: { md: 16 } },
  ...overrides,
});

// Component-specific mocks
jest.mock('@/hooks/useStyles', () => ({
  useStyles: () => ({
    theme: createMockTheme(),
    styles: mockStyles,
  }),
}));
```

### Security Architecture

#### Data Protection Pattern
```typescript
// Secure storage wrapper
class SecureStorage {
  static async setItem(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      logger.auth.error('Secure storage write failed', { key, error });
      throw new StorageError('Failed to store data securely');
    }
  }
  
  static async getItem(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      logger.auth.error('Secure storage read failed', { key, error });
      return null;
    }
  }
}
```

#### Input Validation Pattern
```typescript
// Runtime type validation
export function validateUserInput<T>(
  input: unknown,
  validator: (input: unknown) => input is T
): T {
  if (!validator(input)) {
    throw new ValidationError('Invalid input data');
  }
  return input;
}

// Usage
const validatedData = validateUserInput(userInput, isValidUserData);
```

### Logging Architecture

#### Structured Logging Pattern
```typescript
// Categorized logging system
export const logger = {
  navigation: {
    tabChange: (tab: string) => log('info', 'NAVIGATION', 'Tab changed', { tab }),
    routeChange: (route: string) => log('info', 'NAVIGATION', 'Route changed', { route }),
  },
  user: {
    buttonPress: (button: string, screen: string) => 
      log('info', 'USER', 'Button pressed', { button, screen }),
  },
  ui: {
    componentMount: (component: string) => 
      log('debug', 'UI', 'Component mounted', { component }),
    componentError: (component: string, error: Error) => 
      log('error', 'UI', 'Component error', { component, error }),
  },
};
```

### Development Workflow Patterns

#### Feature Development Cycle
1. **Route Creation**: Add new route file in appropriate group
2. **Component Development**: Build themed components with co-located styles
3. **State Integration**: Add local state or prepare for Redux integration
4. **Testing**: Write comprehensive tests with proper mocking
5. **Documentation**: Update relevant documentation files

#### Code Quality Gates
1. **TypeScript Compilation**: No type errors allowed
2. **ESLint Validation**: All linting rules must pass
3. **Test Coverage**: Maintain minimum coverage thresholds
4. **Performance Check**: Monitor bundle size and render performance

These architectural patterns provide a solid foundation for scalable, maintainable, and performant React Native development while ensuring consistency across the entire application.