// Test utilities for Hephaestus app
import React from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MenuProvider } from 'react-native-popup-menu';

// Mock theme data
export const createMockTheme = (overrides: any = {}) => ({
  colors: {
    background: '#252A34',
    tabBar: {
      background: '#252A34',
      iconBackground: '#F5F5F5',
      highlight: '#A04B49',
    },
    button: {
      background: '#FFFFFF',
      separator: '#252A34',
      text: {
        default: '#000000',
        highlight: '#FFFFFF',
      },
      highlight: '#A04B4980',
    },
    text: {
      light: '#ffffff',
      dark: '#000000',
    },
    ...overrides.colors,
  },
  font: {
    sizes: {
      sm: 12,
      md: 16,
      lg: 20,
      xl: 24,
      xxl: 36,
      xxxl: 64,
    },
    family: 'Harmattan',
    weight: {
      regular: '400',
      semiBold: '600',
      bold: '700',
    },
    ...overrides.font,
  },
  sizes: {
    xs: 16,
    sm: 24,
    md: 36,
    lg: 48,
    xl: 64,
    xxl: 96,
    xxxl: 128,
    ...overrides.sizes,
  },
  margins: {
    sm: 5,
    md: 10,
    lg: 20,
    xl: 50,
    xxl: 65,
    ...overrides.margins,
  },
  paddings: {
    sm: 5,
    md: 10,
    lg: 15,
    xl: 20,
    ...overrides.paddings,
  },
  ...overrides,
});

// Mock activity data
export const createMockActivity = (overrides = {}) => ({
  id: '1',
  title: 'Test Activity',
  category: 'personal',
  priority: 'medium',
  createdAt: new Date('2025-10-03T10:00:00Z'),
  ...overrides,
});

// Mock logger
export const createMockLogger = () => ({
  navigation: {
    navigate: jest.fn(),
    replace: jest.fn(),
    goBack: jest.fn(),
    tabChange: jest.fn(),
  },
  user: {
    buttonPress: jest.fn(),
    menuAction: jest.fn(),
    formSubmit: jest.fn(),
    input: jest.fn(),
  },
  auth: {
    login: jest.fn(),
    logout: jest.fn(),
    authCheck: jest.fn(),
  },
  ui: {
    componentMount: jest.fn(),
    componentUnmount: jest.fn(),
    stateChange: jest.fn(),
  },
  api: {
    request: jest.fn(),
    response: jest.fn(),
    error: jest.fn(),
  },
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
});

// Custom render function with providers
function customRender(
  ui: React.ReactElement,
  options: RenderOptions = {}
) {
  const { ...renderOptions } = options;

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

// Export everything
export { customRender as render };
export * from '@testing-library/react-native';