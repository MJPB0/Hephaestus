import { renderHook, act } from '@testing-library/react-native';
import { Appearance } from 'react-native';
import { useStyles } from './useStyles';
import { lightTheme } from '../styles/light.theme';
import { darkTheme } from '../styles/dark.theme';

// Mock react-native Appearance
const mockGetColorScheme = jest.mocked(Appearance.getColorScheme);
const mockSetColorScheme = jest.mocked(Appearance.setColorScheme);

describe('useStyles Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetColorScheme.mockReturnValue('light');
  });

  describe('Theme Selection', () => {
    it('defaults to light theme when system returns light', () => {
      mockGetColorScheme.mockReturnValue('light');
      
      const { result } = renderHook(() => useStyles());
      
      expect(result.current.currentTheme).toBe('light');
      expect(result.current.theme).toEqual(lightTheme);
    });

    it('defaults to dark theme when system returns dark', () => {
      mockGetColorScheme.mockReturnValue('dark');
      
      const { result } = renderHook(() => useStyles());
      
      expect(result.current.currentTheme).toBe('dark');
      expect(result.current.theme).toEqual(darkTheme);
    });

    it('defaults to dark theme when system returns null', () => {
      mockGetColorScheme.mockReturnValue(null);
      
      const { result } = renderHook(() => useStyles());
      
      expect(result.current.currentTheme).toBe('dark');
      expect(result.current.theme).toEqual(darkTheme);
    });
  });

  describe('Theme Switching', () => {
    it('allows manual theme switching', () => {
      const { result } = renderHook(() => useStyles());
      
      expect(result.current.currentTheme).toBe('light');
      
      act(() => {
        result.current.setCurrentTheme('dark');
      });
      
      expect(result.current.currentTheme).toBe('dark');
      expect(result.current.theme).toEqual(darkTheme);
    });

    it('calls Appearance.setColorScheme when theme changes', () => {
      const { result } = renderHook(() => useStyles());
      
      act(() => {
        result.current.setCurrentTheme('dark');
      });
      
      expect(mockSetColorScheme).toHaveBeenCalledWith('dark');
    });
  });

  describe('Stylesheet Integration', () => {
    it('returns empty styles when no stylesheet provided', () => {
      const { result } = renderHook(() => useStyles());
      
      expect(result.current.styles).toEqual({});
    });

    it('applies stylesheet function with theme', () => {
      const mockStylesheet = jest.fn((theme) => ({
        container: { 
          backgroundColor: theme.colors.background,
          padding: theme.paddings.md 
        }
      }));

      const { result } = renderHook(() => useStyles(mockStylesheet));
      
      expect(mockStylesheet).toHaveBeenCalledWith(lightTheme);
      expect(result.current.styles).toEqual({
        container: {
          backgroundColor: lightTheme.colors.background,
          padding: lightTheme.paddings.md
        }
      });
    });

    it('updates styles when theme changes', () => {
      const mockStylesheet = jest.fn((theme) => ({
        container: { backgroundColor: theme.colors.background }
      }));

      const { result } = renderHook(() => useStyles(mockStylesheet));
      
      // Initial call with light theme
      expect(mockStylesheet).toHaveBeenCalledWith(lightTheme);
      expect(result.current.styles).toBeDefined();
      
      // Switch to dark theme
      act(() => {
        result.current.setCurrentTheme('dark');
      });
      
      // Should be called again with dark theme
      expect(mockStylesheet).toHaveBeenCalledWith(darkTheme);
      expect(result.current.styles).toBeDefined();
    });
  });

  describe('Hook Return Values', () => {
    it('returns all expected properties', () => {
      const { result } = renderHook(() => useStyles());
      
      expect(result.current).toHaveProperty('currentTheme');
      expect(result.current).toHaveProperty('setCurrentTheme');
      expect(result.current).toHaveProperty('theme');
      expect(result.current).toHaveProperty('styles');
    });

    it('setCurrentTheme is a stable function reference', () => {
      const { result } = renderHook(() => useStyles());
      
      const firstSetCurrentTheme = result.current.setCurrentTheme;
      
      act(() => {
        result.current.setCurrentTheme('dark');
      });
      
      const secondSetCurrentTheme = result.current.setCurrentTheme;
      
      expect(firstSetCurrentTheme).toBe(secondSetCurrentTheme);
    });
  });

  describe('Complex Stylesheet Usage', () => {
    it('handles nested theme values correctly', () => {
      const complexStylesheet = (theme: any) => ({
        header: {
          backgroundColor: theme.colors.tabBar.background,
          height: theme.sizes.xl,
          padding: theme.paddings.lg,
        },
        text: {
          fontSize: theme.font.sizes.lg,
          fontWeight: theme.font.weight.bold,
          color: theme.colors.text.light,
        },
        button: {
          backgroundColor: theme.colors.button.background,
          borderRadius: theme.sizes.sm / 2,
          margin: theme.margins.md,
        }
      });

      const { result } = renderHook(() => useStyles(complexStylesheet));
      
      expect(result.current.styles.header).toEqual({
        backgroundColor: lightTheme.colors.tabBar.background,
        height: lightTheme.sizes.xl,
        padding: lightTheme.paddings.lg,
      });
      
      expect(result.current.styles.text).toEqual({
        fontSize: lightTheme.font.sizes.lg,
        fontWeight: lightTheme.font.weight.bold,
        color: lightTheme.colors.text.light,
      });
      
      expect(result.current.styles.button).toEqual({
        backgroundColor: lightTheme.colors.button.background,
        borderRadius: lightTheme.sizes.sm / 2,
        margin: lightTheme.margins.md,
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined stylesheet gracefully', () => {
      const { result } = renderHook(() => useStyles(undefined));
      
      expect(result.current.styles).toEqual({});
    });

    it('handles stylesheet that returns undefined', () => {
      const badStylesheet = () => undefined as any;
      
      const { result } = renderHook(() => useStyles(badStylesheet));
      
      expect(result.current.styles).toBeUndefined();
    });

    it('handles rapid theme switching', () => {
      const { result } = renderHook(() => useStyles());
      
      act(() => {
        result.current.setCurrentTheme('dark');
      });
      
      act(() => {
        result.current.setCurrentTheme('light');
      });
      
      act(() => {
        result.current.setCurrentTheme('dark');
      });
      
      expect(result.current.currentTheme).toBe('dark');
      expect(result.current.theme).toEqual(darkTheme);
      // Note: setColorScheme may be optimized or batched, so we check it was called at least twice
      expect(mockSetColorScheme).toHaveBeenCalledWith('dark');
      expect(mockSetColorScheme).toHaveBeenCalledWith('light');
    });
  });
});