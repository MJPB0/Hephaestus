import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ThemedText from './ThemedText';

// Mock the useStyles hook
jest.mock('../../hooks/useStyles', () => ({
  useStyles: () => ({
    theme: {
      colors: {
        text: {
          dark: '#000000',
          light: '#808080',
        },
      },
      font: {
        sizes: {
          sm: 12,
          md: 16,
          lg: 20,
          xl: 24,
          xxl: 32,
        },
        weight: {
          regular: '400',
          semiBold: '500',
          bold: '700',
        },
        family: 'Harmattan',
      },
    },
  }),
}));

describe('ThemedText', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders children text correctly', () => {
      render(<ThemedText>Hello World</ThemedText>);
      
      expect(screen.getByText('Hello World')).toBeOnTheScreen();
    });

    it('renders with default theme values', () => {
      render(<ThemedText>Test Text</ThemedText>);
      
      const text = screen.getByText('Test Text');
      expect(text.props.style).toEqual([
        {
          color: '#808080', // default light variant
          fontSize: 16, // default md type
          fontWeight: '400', // default regular weight
          fontFamily: 'Harmattan',
        },
        undefined
      ]);
    });
  });

  describe('Variant Prop', () => {
    it('applies dark variant correctly', () => {
      render(<ThemedText variant="dark">Dark Text</ThemedText>);
      
      const text = screen.getByText('Dark Text');
      expect(text.props.style).toEqual([
        {
          color: '#000000', // theme.colors.text.dark
          fontSize: 16,
          fontWeight: '400',
          fontFamily: 'Harmattan',
        },
        undefined
      ]);
    });

    it('applies bright variant correctly', () => {
      render(<ThemedText variant="bright">Bright Text</ThemedText>);
      
      const text = screen.getByText('Bright Text');
      expect(text.props.style).toEqual([
        {
          color: '#808080', // theme.colors.text.light (bright maps to light)
          fontSize: 16,
          fontWeight: '400',
          fontFamily: 'Harmattan',
        },
        undefined
      ]);
    });

    it('defaults to light variant when no variant specified', () => {
      render(<ThemedText>Default Text</ThemedText>);
      
      const text = screen.getByText('Default Text');
      expect(text.props.style).toEqual([
        {
          color: '#808080', // theme.colors.text.light (default)
          fontSize: 16,
          fontWeight: '400',
          fontFamily: 'Harmattan',
        },
        undefined
      ]);
    });
  });

  describe('Type Prop', () => {
    it('applies title type correctly', () => {
      render(<ThemedText type="title">Title Text</ThemedText>);
      
      const text = screen.getByText('Title Text');
      expect(text.props.style).toEqual([
        {
          color: '#808080',
          fontSize: 32, // theme.font.sizes.xxl
          fontWeight: '700', // theme.font.weight.bold
          fontFamily: 'Harmattan',
        },
        undefined
      ]);
    });

    it('applies subTitle type correctly', () => {
      render(<ThemedText type="subTitle">Subtitle Text</ThemedText>);
      
      const text = screen.getByText('Subtitle Text');
      expect(text.props.style).toEqual([
        {
          color: '#808080',
          fontSize: 24, // theme.font.sizes.xl
          fontWeight: '500', // theme.font.weight.semiBold
          fontFamily: 'Harmattan',
        },
        undefined
      ]);
    });

    it('applies headline type correctly', () => {
      render(<ThemedText type="headline">Headline Text</ThemedText>);
      
      const text = screen.getByText('Headline Text');
      expect(text.props.style).toEqual([
        {
          color: '#808080',
          fontSize: 20, // theme.font.sizes.lg
          fontWeight: '500', // theme.font.weight.semiBold
          fontFamily: 'Harmattan',
        },
        undefined
      ]);
    });

    it('applies body type correctly', () => {
      render(<ThemedText type="body">Body Text</ThemedText>);
      
      const text = screen.getByText('Body Text');
      expect(text.props.style).toEqual([
        {
          color: '#808080',
          fontSize: 16, // theme.font.sizes.md
          fontWeight: '400', // theme.font.weight.regular
          fontFamily: 'Harmattan',
        },
        undefined
      ]);
    });

    it('applies caption type correctly', () => {
      render(<ThemedText type="caption">Caption Text</ThemedText>);
      
      const text = screen.getByText('Caption Text');
      expect(text.props.style).toEqual([
        {
          color: '#808080',
          fontSize: 12, // theme.font.sizes.sm
          fontWeight: '400', // theme.font.weight.regular
          fontFamily: 'Harmattan',
        },
        undefined
      ]);
    });

    it('defaults to body type when no type specified', () => {
      render(<ThemedText>Default Text</ThemedText>);
      
      const text = screen.getByText('Default Text');
      expect(text.props.style).toEqual([
        {
          color: '#808080',
          fontSize: 16, // theme.font.sizes.md (body default)
          fontWeight: '400', // theme.font.weight.regular (body default)
          fontFamily: 'Harmattan',
        },
        undefined
      ]);
    });
  });

  describe('Combined Props', () => {
    it('combines variant and type correctly', () => {
      render(
        <ThemedText variant="bright" type="title">
          Bright Title
        </ThemedText>
      );
      
      const text = screen.getByText('Bright Title');
      expect(text.props.style).toEqual([
        {
          color: '#808080', // bright variant maps to light
          fontSize: 32, // title type
          fontWeight: '700', // title type
          fontFamily: 'Harmattan',
        },
        undefined
      ]);
    });

    it('applies custom styles in addition to theme styles', () => {
      const customStyle = { 
        textAlign: 'center' as const,
        lineHeight: 24,
      };
      
      render(
        <ThemedText style={customStyle} variant="dark" type="headline">
          Custom Styled Text
        </ThemedText>
      );
      
      const text = screen.getByText('Custom Styled Text');
      expect(text.props.style).toEqual([
        {
          color: '#000000', // dark variant
          fontSize: 20, // headline type
          fontWeight: '500', // headline type
          fontFamily: 'Harmattan',
        },
        customStyle,
      ]);
    });
  });

  describe('Text Props Inheritance', () => {
    it('passes through standard Text props', () => {
      render(
        <ThemedText 
          numberOfLines={2}
          ellipsizeMode="tail"
          testID="themed-text"
        >
          Text with props
        </ThemedText>
      );
      
      const text = screen.getByTestId('themed-text');
      expect(text.props.numberOfLines).toBe(2);
      expect(text.props.ellipsizeMode).toBe('tail');
    });

    it('handles onPress events', () => {
      const mockOnPress = jest.fn();
      render(
        <ThemedText onPress={mockOnPress}>
          Pressable Text
        </ThemedText>
      );
      
      const text = screen.getByText('Pressable Text');
      expect(text.props.onPress).toBe(mockOnPress);
    });
  });

  describe('Complex Content', () => {
    it('renders multiple children correctly', () => {
      render(
        <ThemedText testID="parent-text">
          Hello{' '}
          <ThemedText variant="bright" type="caption">
            World
          </ThemedText>
        </ThemedText>
      );
      
      expect(screen.getByTestId('parent-text')).toBeOnTheScreen();
      expect(screen.getByText('World')).toBeOnTheScreen();
    });

    it('handles empty content', () => {
      render(<ThemedText></ThemedText>);
      
      // Should render without crashing
      const text = screen.getByText('');
      expect(text).toBeOnTheScreen();
    });

    it('handles numeric content', () => {
      render(<ThemedText>{42}</ThemedText>);
      
      expect(screen.getByText('42')).toBeOnTheScreen();
    });
  });

  describe('Accessibility', () => {
    it('maintains accessibility properties', () => {
      render(
        <ThemedText 
          accessibilityLabel="Screen reader text"
          accessibilityHint="Additional info"
        >
          Accessible Text
        </ThemedText>
      );
      
      const text = screen.getByLabelText('Screen reader text');
      expect(text).toBeOnTheScreen();
      expect(text.props.accessibilityHint).toBe('Additional info');
    });

    it('preserves accessibility role', () => {
      render(
        <ThemedText accessibilityRole="header">
          Header Text
        </ThemedText>
      );
      
      const text = screen.getByRole('header');
      expect(text).toBeOnTheScreen();
    });
  });

  describe('Style Composition', () => {
    it('merges multiple style objects correctly', () => {
      const style1 = { marginTop: 10 };
      const style2 = { marginBottom: 20 };
      
      render(
        <ThemedText style={[style1, style2]}>
          Multi-style Text
        </ThemedText>
      );
      
      const text = screen.getByText('Multi-style Text');
      expect(text.props.style).toEqual([
        {
          color: '#808080',
          fontSize: 16,
          fontWeight: '400',
          fontFamily: 'Harmattan',
        },
        [style1, style2],
      ]);
    });

    it('allows style override of theme properties', () => {
      const overrideStyle = { 
        color: '#FF0000',
        fontSize: 18,
      };
      
      render(
        <ThemedText style={overrideStyle}>
          Override Text
        </ThemedText>
      );
      
      const text = screen.getByText('Override Text');
      expect(text.props.style).toEqual([
        {
          color: '#808080',
          fontSize: 16,
          fontWeight: '400',
          fontFamily: 'Harmattan',
        },
        overrideStyle,
      ]);
    });
  });
});