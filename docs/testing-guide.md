# Hephaestus - Testing Guide

## Testing Philosophy

Hephaestus follows a comprehensive testing strategy that emphasizes:
- **Quality Assurance**: Prevent regressions and ensure feature reliability
- **Developer Confidence**: Enable safe refactoring and feature development
- **User Experience**: Validate critical user flows and interactions
- **Maintainability**: Create tests that are easy to understand and maintain

## Testing Stack

### Core Testing Framework
- **Jest 29.7**: JavaScript testing framework with extensive React Native support
- **Jest-Expo**: Expo-specific Jest preset for React Native testing
- **React Native Testing Library**: Component testing with user-centric approach
- **@testing-library/jest-native**: Additional matchers for React Native

### Development Dependencies
```json
{
  "@testing-library/jest-native": "5.4.3",
  "@testing-library/react-native": "13.3.3",
  "@types/jest": "30.0.0",
  "jest": "^29.7.0",
  "jest-expo": "~54.0.12",
  "react-test-renderer": "19.2.0"
}
```

### Jest Configuration
```json
{
  "preset": "jest-expo",
  "setupFilesAfterEnv": ["<rootDir>/jest.setup.js"],
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/$1"
  },
  "transformIgnorePatterns": [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
  ]
}
```

## Test Organization

### File Structure
```
__tests__/                 # Global test utilities
  utils/
    testUtils.tsx          # Test helpers and mock factories
    
components/                # Component tests co-located
  shared/
    ThemedButton.tsx
    ThemedButton.test.tsx
    ThemedText.tsx
    ThemedText.test.tsx
    
  icons/
    icons.test.tsx         # Combined icon tests
    
hooks/                     # Hook tests
  useStyles.test.ts
  
utils/                     # Utility tests
  logger.test.ts
```

### Test Categories

#### 1. Unit Tests
Test individual components, hooks, and utilities in isolation.

```typescript
// Component unit test
describe('ThemedButton', () => {
  it('renders with correct title', () => {
    render(<ThemedButton title="Test Button" />);
    expect(screen.getByText('Test Button')).toBeOnTheScreen();
  });
});
```

#### 2. Integration Tests
Test component interactions and data flow between components.

```typescript
// Integration test
describe('Dashboard Integration', () => {
  it('switches between day and month views', () => {
    render(<Dashboard />);
    
    fireEvent.press(screen.getByText('Month'));
    expect(screen.getByTestId('month-view')).toBeOnTheScreen();
  });
});
```

#### 3. Navigation Tests
Test routing logic and screen transitions.

```typescript
// Navigation test
describe('Navigation Flow', () => {
  it('navigates from login to dashboard', () => {
    const mockPush = jest.fn();
    jest.mocked(useRouter).mockReturnValue({ push: mockPush });
    
    render(<LoginScreen />);
    fireEvent.press(screen.getByText('Login'));
    
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });
});
```

## Testing Patterns

### Component Testing Pattern
```typescript
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import Component from './Component';

// Mock dependencies
jest.mock('@/hooks/useStyles', () => ({
  useStyles: () => ({
    theme: mockTheme,
    styles: mockStyles,
  }),
}));

describe('Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders with required props', () => {
      render(<Component requiredProp="value" />);
      expect(screen.getByTestId('component')).toBeOnTheScreen();
    });
  });

  describe('Interactions', () => {
    it('handles user interactions', () => {
      const mockHandler = jest.fn();
      render(<Component onPress={mockHandler} />);
      
      fireEvent.press(screen.getByRole('button'));
      expect(mockHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe('Props Validation', () => {
    it('applies custom styles', () => {
      const customStyle = { margin: 10 };
      render(<Component style={customStyle} />);
      
      const component = screen.getByTestId('component');
      expect(component.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining(customStyle)])
      );
    });
  });
});
```

### Hook Testing Pattern
```typescript
import { renderHook, act } from '@testing-library/react-native';
import { useCustomHook } from './useCustomHook';

describe('useCustomHook', () => {
  it('returns initial state', () => {
    const { result } = renderHook(() => useCustomHook());
    
    expect(result.current.value).toBe(initialValue);
    expect(result.current.isLoading).toBe(false);
  });

  it('updates state correctly', () => {
    const { result } = renderHook(() => useCustomHook());
    
    act(() => {
      result.current.setValue('new value');
    });
    
    expect(result.current.value).toBe('new value');
  });
});
```

### Async Testing Pattern
```typescript
describe('Async Operations', () => {
  it('handles async data loading', async () => {
    const mockData = { id: 1, name: 'Test' };
    jest.mocked(apiCall).mockResolvedValue(mockData);
    
    render(<AsyncComponent />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText('Test')).toBeOnTheScreen();
    });
    
    expect(apiCall).toHaveBeenCalledWith(expectedParams);
  });

  it('handles async errors', async () => {
    jest.mocked(apiCall).mockRejectedValue(new Error('API Error'));
    
    render(<AsyncComponent />);
    
    await waitFor(() => {
      expect(screen.getByText('Error loading data')).toBeOnTheScreen();
    });
  });
});
```

## Mock Strategies

### Component Mocks
```typescript
// Mock themed components
jest.mock('@/components/shared/ThemedImage', () => ({ size, ...props }: any) => {
  const { View } = jest.requireActual('react-native');
  return <View testID="mocked-themed-image" data-size={size} {...props} />;
});

// Mock complex components
jest.mock('@/components/complex/ComplexComponent', () => {
  return function MockComplexComponent(props: any) {
    return <div data-testid="mock-complex-component" {...props} />;
  };
});
```

### Hook Mocks
```typescript
// Mock custom hooks
jest.mock('@/hooks/useStyles', () => ({
  useStyles: jest.fn(() => ({
    theme: {
      colors: { text: { light: '#808080' } },
      font: { sizes: { md: 16 } },
    },
    styles: {
      container: { backgroundColor: '#ffffff' },
    },
  })),
}));

// Mock React hooks
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useEffect: jest.fn(),
}));
```

### Navigation Mocks
```typescript
// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({ view: 'day' }),
  useSegments: () => ['(tabs)', 'dashboard'],
}));
```

### API Mocks
```typescript
// Mock API calls
jest.mock('@/utils/api', () => ({
  fetchUserData: jest.fn(),
  updateUserProfile: jest.fn(),
}));

// Mock native modules
jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));
```

## Test Utilities

### Mock Factories
```typescript
// __tests__/utils/testUtils.tsx
export const createMockTheme = (overrides = {}) => ({
  colors: {
    background: '#ffffff',
    text: { light: '#808080', dark: '#000000', bright: '#ffffff' },
    button: { background: '#ffffff', highlight: '#a04b4980' },
  },
  font: {
    sizes: { sm: 12, md: 16, lg: 20, xl: 24, xxl: 32 },
    weight: { regular: '400', medium: '500', bold: '700' },
    family: 'Harmattan',
  },
  sizes: { sm: 24, md: 48, lg: 72, xl: 96 },
  margins: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  paddings: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  ...overrides,
});

export const createMockActivity = (overrides = {}) => ({
  id: '1',
  name: 'Test Activity',
  duration: 300,
  type: 'workout',
  date: new Date().toISOString(),
  ...overrides,
});

export const createMockLogger = () => ({
  navigation: {
    tabChange: jest.fn(),
    routeChange: jest.fn(),
  },
  user: {
    buttonPress: jest.fn(),
    login: jest.fn(),
  },
  ui: {
    componentMount: jest.fn(),
    componentError: jest.fn(),
  },
});
```

### Custom Render Function
```typescript
// Custom render with providers
export function renderWithProviders(ui: React.ReactElement, options = {}) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <SafeAreaProvider>
        <ThemeProvider theme={createMockTheme()}>
          {children}
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...options });
}
```

## Testing Best Practices

### Test Naming
```typescript
// Good: Descriptive test names
it('displays error message when login fails', () => {});
it('navigates to dashboard after successful login', () => {});
it('disables submit button when form is invalid', () => {});

// Avoid: Vague test names
it('works correctly', () => {});
it('test login', () => {});
```

### Test Structure
```typescript
describe('Component/Feature Name', () => {
  beforeEach(() => {
    // Setup common to all tests
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    // Tests for component rendering
  });

  describe('User Interactions', () => {
    // Tests for user events and interactions
  });

  describe('State Management', () => {
    // Tests for state changes
  });

  describe('Error Handling', () => {
    // Tests for error scenarios
  });

  describe('Accessibility', () => {
    // Tests for accessibility features
  });
});
```

### Accessibility Testing
```typescript
describe('Accessibility', () => {
  it('has correct accessibility properties', () => {
    render(<Button title="Submit" />);
    
    const button = screen.getByRole('button');
    expect(button).toBeOnTheScreen();
    expect(button).toHaveAccessibilityState({ disabled: false });
  });

  it('provides meaningful labels', () => {
    render(<Icon accessibilityLabel="Home navigation" />);
    
    const icon = screen.getByLabelText('Home navigation');
    expect(icon).toBeOnTheScreen();
  });
});
```

### Performance Testing
```typescript
describe('Performance', () => {
  it('renders large lists efficiently', () => {
    const largeDataSet = Array.from({ length: 1000 }, (_, i) => ({ id: i }));
    
    const startTime = performance.now();
    render(<LargeList data={largeDataSet} />);
    const endTime = performance.now();
    
    expect(endTime - startTime).toBeLessThan(100); // 100ms threshold
  });

  it('handles rapid state changes', () => {
    const { rerender } = render(<Component state="initial" />);
    
    for (let i = 0; i < 100; i++) {
      rerender(<Component state={`state-${i}`} />);
    }
    
    expect(screen.getByTestId('component')).toBeOnTheScreen();
  });
});
```

## Test Coverage

### Coverage Targets
- **Statements**: 80% minimum
- **Branches**: 75% minimum
- **Functions**: 85% minimum
- **Lines**: 80% minimum

### Running Coverage
```bash
# Generate coverage report
npm run test:coverage

# View detailed coverage
npm run test:coverage -- --verbose

# Coverage for specific files
npm test -- --coverage --testPathPattern=ThemedButton
```

### Coverage Analysis
```bash
# Open coverage report in browser
open coverage/lcov-report/index.html

# Check coverage thresholds
npm test -- --coverage --passWithNoTests
```

## Continuous Integration

### CI Test Pipeline
```bash
# Install dependencies
npm ci

# Run linting
npm run lint

# Run type checking
npx tsc --noEmit

# Run tests with coverage
npm run test:ci

# Build check
npm run prebuild
```

### Test Automation
```yaml
# GitHub Actions example
- name: Run Tests
  run: |
    npm ci
    npm run test:ci
    npm run lint
    npx tsc --noEmit
```

## Debugging Tests

### Debug Commands
```bash
# Run specific test with debug info
npm test -- --testNamePattern="specific test" --verbose

# Run tests in watch mode
npm run test:watch

# Debug with Node inspector
node --inspect-brk node_modules/.bin/jest --runInBand
```

### Common Issues
1. **Mock not working**: Check mock path and timing
2. **Async test failing**: Use `waitFor` or `findBy` queries
3. **Component not found**: Verify testID or accessible name
4. **Theme not applied**: Ensure theme mock is properly set up

## Testing Checklist

### Before Writing Tests
- [ ] Understand component/feature requirements
- [ ] Identify critical user paths
- [ ] Plan test structure and organization
- [ ] Set up necessary mocks and utilities

### While Writing Tests
- [ ] Follow naming conventions
- [ ] Test user behavior, not implementation
- [ ] Include positive and negative test cases
- [ ] Test accessibility features
- [ ] Mock external dependencies properly

### After Writing Tests
- [ ] Verify all tests pass
- [ ] Check test coverage meets targets
- [ ] Review test readability and maintainability
- [ ] Update documentation if needed

This comprehensive testing guide ensures that Hephaestus maintains high code quality, reliability, and user experience through thorough automated testing practices.