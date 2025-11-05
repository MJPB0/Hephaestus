// Jest setup file for Hephaestus app
import '@testing-library/jest-native/extend-expect';

// Mock global for Expo
global.__DEV__ = true;

// Mock TurboModuleRegistry early
const mockTurboModuleRegistry = {
  getEnforcing: jest.fn(() => ({})),
  get: jest.fn(() => ({})),
};

// Override global turboModuleProxy function
global.turboModuleProxy = jest.fn(() => mockTurboModuleRegistry);

// Mock Expo modules early to prevent TurboModule issues
jest.mock('expo', () => ({
  registerRootComponent: jest.fn(),
}));

// Mock expo constants
jest.mock('expo-constants', () => ({
  default: {
    manifest: {},
    platform: { ios: {} },
  },
}));

// Mock react-native modules that cause TurboModule issues
jest.mock('react-native', () => {
  const MockReactNative = {
    // Core components
    View: 'View',
    Text: 'Text',
    Image: 'Image',
    ScrollView: 'ScrollView',
    TouchableOpacity: 'TouchableOpacity',
    Pressable: 'Pressable',
    SafeAreaView: 'SafeAreaView',
    
    // StyleSheet
    StyleSheet: {
      create: (styles) => styles,
      flatten: (style) => style,
    },
    
    // Platform
    Platform: {
      OS: 'ios',
      select: jest.fn((config) => config.ios || config.default),
    },
    
    // Dimensions
    Dimensions: {
      get: jest.fn(() => ({ width: 375, height: 667 })),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    },
    
    // Appearance
    Appearance: {
      getColorScheme: jest.fn(() => 'light'),
      setColorScheme: jest.fn(),
      addChangeListener: jest.fn(),
      removeChangeListener: jest.fn(),
    },
    
    // TurboModuleRegistry mock
    TurboModuleRegistry: mockTurboModuleRegistry,
    
    // NativeModules with safe defaults
    NativeModules: {
      SourceCode: {
        scriptURL: 'http://localhost:8081/index.bundle',
      },
    },
  };
  
  return MockReactNative;
});
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  SafeAreaView: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

// Mock expo-router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    setParams: jest.fn(),
  },
  useLocalSearchParams: jest.fn(() => ({ view: 'day' })),
  useRootNavigationState: jest.fn(() => ({ key: 'test' })),
  Stack: {
    Screen: ({ children }) => children,
  },
  Tabs: {
    Screen: ({ children }) => children,
  },
}));

// Mock expo-image
jest.mock('expo-image', () => ({
  Image: 'Image',
}));

// Mock react-native-popup-menu
jest.mock('react-native-popup-menu', () => ({
  MenuProvider: ({ children }) => children,
  Menu: ({ children }) => children,
  MenuTrigger: ({ children }) => children,
  MenuOptions: ({ children }) => children,
  MenuOption: ({ children }) => children,
}));

// Mock react-native-media-query
jest.mock('react-native-media-query', () => {
  const StyleSheet = jest.requireActual('react-native').StyleSheet;
  return {
    __esModule: true,
    default: {
      create: (styles) => ({
        styles: StyleSheet.create(styles),
      }),
    },
  };
});

// Mock react-native-pressable-opacity
jest.mock('react-native-pressable-opacity', () => ({
  PressableOpacity: 'PressableOpacity',
}));

// Global test setup
global.__DEV__ = true;

// Silence console warnings during tests
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  console.warn = originalConsoleWarn;
  console.error = originalConsoleError;
});