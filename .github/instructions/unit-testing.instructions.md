---
applyTo: "**/*.{test,spec}.{ts,tsx}"
---

# Unit Testing Instructions

## Testing Setup

### Jest Configuration
```json
{
  "jest": {
    "preset": "jest-expo",
    "collectCoverage": true,
    "coverageDirectory": "coverage",
    "coverageReporters": ["text", "lcov", "html"],
    "testMatch": [
      "**/__tests__/**/*.(ts|tsx|js)",
      "**/*.(test|spec).(ts|tsx|js)"
    ]
  }
}
```

### Testing Libraries
```bash
npm install --save-dev \
  @testing-library/react-native \
  @testing-library/jest-native \
  react-test-renderer
```

### Test File Organization
```
components/
├── shared/
│   ├── ThemedButton.tsx
│   ├── ThemedButton.test.tsx
│   ├── ThemedText.tsx
│   └── ThemedText.test.tsx
└── dashboard/
    ├── ActivityCard.tsx
    └── ActivityCard.test.tsx

__tests__/
├── utils/
│   └── logger.test.ts
├── hooks/
│   └── useStyles.test.ts
└── integration/
    └── navigation.test.ts
```

## Component Testing Patterns

### Basic Component Test
```typescript
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ThemedButton from '../ThemedButton';

// Mock the useStyles hook
jest.mock('../../hooks/useStyles', () => ({
  useStyles: () => ({
    theme: {
      colors: { button: { background: '#FFFFFF' } },
      font: { sizes: { md: 16 } },
      paddings: { md: 10 }
    },
    styles: { button: { backgroundColor: '#FFFFFF' } }
  })
}));

describe('ThemedButton', () => {
  it('renders with correct title', () => {
    render(<ThemedButton title="Test Button" />);
    expect(screen.getByText('Test Button')).toBeOnTheScreen();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    render(<ThemedButton title="Test Button" onPress={mockOnPress} />);
    
    fireEvent.press(screen.getByText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
```

### Theme Testing
```typescript
import { renderHook } from '@testing-library/react-native';
import { useStyles } from '../useStyles';

// Mock Appearance
jest.mock('react-native', () => ({
  Appearance: {
    getColorScheme: jest.fn(() => 'light'),
    setColorScheme: jest.fn(),
  },
}));

describe('useStyles', () => {
  it('returns light theme by default', () => {
    const { result } = renderHook(() => useStyles());
    expect(result.current.currentTheme).toBe('light');
  });

  it('applies stylesheet correctly', () => {
    const mockStylesheet = (theme) => ({
      container: { backgroundColor: theme.colors.background }
    });
    
    const { result } = renderHook(() => useStyles(mockStylesheet));
    expect(result.current.styles.container).toHaveProperty('backgroundColor');
  });
});
```

### Navigation Testing
```typescript
import { router } from 'expo-router';
import { render, fireEvent, screen } from '@testing-library/react-native';
import Login from '../login';

// Mock expo-router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

// Mock logger
jest.mock('../../utils/logger', () => ({
  default: {
    user: { buttonPress: jest.fn() },
    auth: { login: jest.fn() },
    navigation: { replace: jest.fn() },
  },
}));

describe('Login Screen', () => {
  it('navigates to dashboard on login', () => {
    render(<Login />);
    
    fireEvent.press(screen.getByText('LOGIN'));
    
    expect(router.replace).toHaveBeenCalledWith('/dashboard');
  });
});
```

### Logger Testing
```typescript
import logger from '../logger';

// Mock console methods
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();

describe('Logger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
    mockConsoleError.mockRestore();
  });

  it('logs navigation events', () => {
    logger.navigation.navigate('/dashboard');
    
    expect(mockConsoleLog).toHaveBeenCalledWith(
      expect.stringContaining('[NAVIGATION] Navigating to: /dashboard')
    );
  });

  it('logs user actions with context', () => {
    logger.user.buttonPress('Login', 'Login Page');
    
    expect(mockConsoleLog).toHaveBeenCalledWith(
      expect.stringContaining('[USER_ACTION] Button pressed: Login')
    );
  });

  it('formats error messages correctly', () => {
    logger.error('Test error', { code: 500 });
    
    expect(mockConsoleError).toHaveBeenCalledWith(
      expect.stringContaining('[ERROR]')
    );
  });
});
```

### Icon Component Testing
```typescript
import React from 'react';
import { render } from '@testing-library/react-native';
import Home from '../Home';

// Mock ThemedImage
jest.mock('../shared/ThemedImage', () => {
  const { View } = require('react-native');
  return function MockThemedImage(props) {
    return <View testID="themed-image" {...props} />;
  };
});

describe('Home Icon', () => {
  it('renders with correct props', () => {
    const { getByTestId } = render(<Home size="lg" />);
    const image = getByTestId('themed-image');
    
    expect(image.props.size).toBe('lg');
  });
});
```

## Integration Testing

### Navigation Flow Testing
```typescript
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import App from '../App';

describe('Navigation Flow', () => {
  it('completes login to dashboard flow', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <App />
      </NavigationContainer>
    );

    // Start at landing page
    fireEvent.press(getByText('CONTINUE'));
    
    // Should navigate to login
    await waitFor(() => {
      expect(getByText('LOGIN')).toBeOnTheScreen();
    });
    
    // Complete login
    fireEvent.press(getByText('LOGIN'));
    
    // Should reach dashboard
    await waitFor(() => {
      expect(getByText('DASHBOARD')).toBeOnTheScreen();
    });
  });
});
```

### State Management Testing
```typescript
import { renderHook, act } from '@testing-library/react-native';
import { useState } from 'react';

describe('Component State', () => {
  it('manages view state correctly', () => {
    const { result } = renderHook(() => {
      const [view, setView] = useState<'day' | 'month'>('day');
      return { view, setView };
    });

    expect(result.current.view).toBe('day');
    
    act(() => {
      result.current.setView('month');
    });
    
    expect(result.current.view).toBe('month');
  });
});
```

## Test Utilities

### Custom Render Function
```typescript
import React from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MenuProvider } from 'react-native-popup-menu';

interface CustomRenderOptions extends RenderOptions {
  initialTheme?: 'light' | 'dark';
}

function customRender(
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) {
  const { initialTheme = 'light', ...renderOptions } = options;

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <SafeAreaProvider>
        <MenuProvider>
          {children}
        </MenuProvider>
      </SafeAreaProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export { customRender as render };
export * from '@testing-library/react-native';
```

### Mock Factories
```typescript
// Mock data factories
export const createMockActivity = (overrides = {}) => ({
  id: '1',
  title: 'Test Activity',
  category: 'personal',
  priority: 'medium',
  createdAt: new Date(),
  ...overrides,
});

export const createMockTheme = (overrides = {}) => ({
  colors: {
    background: '#252A34',
    text: { light: '#ffffff', dark: '#000000' },
    ...overrides.colors,
  },
  sizes: { md: 36, lg: 48, ...overrides.sizes },
  margins: { sm: 5, md: 10, ...overrides.margins },
  ...overrides,
});
```

## Testing Best Practices

### Test Structure
```typescript
describe('ComponentName', () => {
  // Setup and teardown
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test groups
  describe('rendering', () => {
    it('renders correctly with default props', () => {});
    it('renders correctly with custom props', () => {});
  });

  describe('interactions', () => {
    it('handles press events', () => {});
    it('updates state on user input', () => {});
  });

  describe('edge cases', () => {
    it('handles empty data gracefully', () => {});
    it('displays error states correctly', () => {});
  });
});
```

### Test Naming
- **Descriptive**: `it('displays error message when login fails')`
- **Behavior-focused**: `it('calls onPress when button is tapped')`
- **Clear expectations**: `it('shows loading spinner during API call')`

### Coverage Goals
- **Components**: 80%+ coverage
- **Utilities**: 90%+ coverage
- **Critical paths**: 100% coverage
- **Error handling**: Full coverage

## CI/CD Integration

### Test Scripts
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --watchAll=false"
  }
}
```

### GitHub Actions
```yaml
- name: Run tests
  run: npm run test:ci
  
- name: Upload coverage
  uses: codecov/codecov-action@v3
  with:
    file: ./coverage/lcov.info
```

## Best Practices
1. **Test behavior, not implementation** - focus on what the user sees
2. **Use descriptive test names** - clear expectations and scenarios
3. **Mock external dependencies** - isolate units under test
4. **Test edge cases** - error states, empty data, boundary conditions
5. **Maintain test data** - use factories for consistent test data
6. **Keep tests fast** - avoid unnecessary async operations
7. **Review test coverage** - aim for meaningful coverage, not just numbers
8. **Update tests with code changes** - maintain test accuracy and relevance