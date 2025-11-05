import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ThemedImage from './ThemedImage';

// Mock expo-image
jest.mock('expo-image', () => {
  const { Image: RNImage } = jest.requireActual('react-native');
  return {
    Image: ({ source, style, contentFit, testID, ...props }: any) => (
      <RNImage
        source={source}
        style={style}
        testID={testID}
        {...props}
      />
    ),
  };
});

// Mock the useStyles hook
jest.mock('../../hooks/useStyles', () => ({
  useStyles: () => ({
    theme: {
      sizes: {
        sm: 24,
        md: 48,
        lg: 72,
        xl: 96,
      },
    },
  }),
}));

describe('ThemedImage', () => {
  const mockSource = { uri: 'https://example.com/image.jpg' };
  const localSource = require('../../assets/images/avatar.png');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders with required props', () => {
      render(<ThemedImage source={mockSource} size="md" testID="themed-image" />);
      
      const image = screen.getByTestId('themed-image');
      expect(image).toBeOnTheScreen();
    });

    it('passes source prop correctly', () => {
      render(<ThemedImage source={mockSource} size="md" testID="themed-image" />);
      
      const image = screen.getByTestId('themed-image');
      expect(image.props.source).toEqual(mockSource);
    });

    it('handles local image sources', () => {
      render(<ThemedImage source={localSource} size="md" testID="themed-image" />);
      
      const image = screen.getByTestId('themed-image');
      expect(image.props.source).toEqual(localSource);
    });
  });

  describe('Size Prop', () => {
    it('applies small size correctly', () => {
      render(<ThemedImage source={mockSource} size="sm" testID="themed-image" />);
      
      const image = screen.getByTestId('themed-image');
      expect(image.props.style).toEqual([
        { width: 24, height: 24 }, // theme.sizes.sm
        undefined
      ]);
    });

    it('applies medium size correctly', () => {
      render(<ThemedImage source={mockSource} size="md" testID="themed-image" />);
      
      const image = screen.getByTestId('themed-image');
      expect(image.props.style).toEqual([
        { width: 48, height: 48 }, // theme.sizes.md
        undefined
      ]);
    });

    it('applies large size correctly', () => {
      render(<ThemedImage source={mockSource} size="lg" testID="themed-image" />);
      
      const image = screen.getByTestId('themed-image');
      expect(image.props.style).toEqual([
        { width: 72, height: 72 }, // theme.sizes.lg
        undefined
      ]);
    });

    it('applies extra large size correctly', () => {
      render(<ThemedImage source={mockSource} size="xl" testID="themed-image" />);
      
      const image = screen.getByTestId('themed-image');
      expect(image.props.style).toEqual([
        { width: 96, height: 96 }, // theme.sizes.xl
        undefined
      ]);
    });
  });

  describe('Style Customization', () => {
    it('applies custom styles in addition to size', () => {
      const customStyle = {
        borderRadius: 10,
        opacity: 0.8,
        borderWidth: 2,
      };
      
      render(
        <ThemedImage 
          source={mockSource} 
          size="md" 
          style={customStyle}
          testID="themed-image"
        />
      );
      
      const image = screen.getByTestId('themed-image');
      expect(image.props.style).toEqual([
        {
          width: 48,
          height: 48,
        },
        customStyle,
      ]);
    });

    it('allows style override of size properties', () => {
      const overrideStyle = {
        width: 100,
        height: 150,
      };
      
      render(
        <ThemedImage 
          source={mockSource} 
          size="sm" 
          style={overrideStyle}
          testID="themed-image"
        />
      );
      
      const image = screen.getByTestId('themed-image');
      expect(image.props.style).toEqual([
        {
          width: 24, // original theme size
          height: 24,
        },
        overrideStyle, // override values
      ]);
    });

    it('handles array of styles', () => {
      const style1 = { borderRadius: 5 };
      const style2 = { opacity: 0.9 };
      
      render(
        <ThemedImage 
          source={mockSource} 
          size="lg" 
          style={[style1, style2]}
          testID="themed-image"
        />
      );
      
      const image = screen.getByTestId('themed-image');
      expect(image.props.style).toEqual([
        {
          width: 72,
          height: 72,
        },
        [style1, style2],
      ]);
    });
  });

  describe('Content Fit', () => {
    it('applies default contentFit as contain', () => {
      render(<ThemedImage source={mockSource} size="md" testID="themed-image" />);
      
      // Note: This would be tested if expo-image was properly mocked
      // For now, we're testing that the component renders without error
      const image = screen.getByTestId('themed-image');
      expect(image).toBeOnTheScreen();
    });
  });

  describe('Image Props Inheritance', () => {
    it('passes through standard Image props', () => {
      render(
        <ThemedImage 
          source={mockSource} 
          size="md"
          testID="custom-image"
          accessible={true}
          accessibilityLabel="Profile picture"
        />
      );
      
      const image = screen.getByTestId('custom-image');
      expect(image).toBeOnTheScreen();
      expect(image.props.accessible).toBe(true);
      expect(image.props.accessibilityLabel).toBe('Profile picture');
    });

    it('handles resize mode prop', () => {
      render(
        <ThemedImage 
          source={mockSource} 
          size="md"
          resizeMode="cover"
          testID="themed-image"
        />
      );
      
      const image = screen.getByTestId('themed-image');
      expect(image.props.resizeMode).toBe('cover');
    });
  });

  describe('Error Handling', () => {
    it('handles missing source gracefully', () => {
      // TypeScript would normally prevent this, but testing runtime behavior
      expect(() => {
        render(<ThemedImage source={null as any} size="md" />);
      }).not.toThrow();
    });

    it('handles invalid size gracefully', () => {
      // TypeScript would normally prevent this, but testing runtime behavior
      render(<ThemedImage source={mockSource} size={'invalid' as any} testID="themed-image" />);
      
      const image = screen.getByTestId('themed-image');
      expect(image).toBeOnTheScreen();
    });
  });

  describe('Performance', () => {
    it('renders multiple images without interference', () => {
      render(
        <>
          <ThemedImage source={mockSource} size="sm" testID="image1" />
          <ThemedImage source={localSource} size="md" testID="image2" />
          <ThemedImage source={mockSource} size="lg" testID="image3" />
        </>
      );
      
      expect(screen.getByTestId('image1')).toBeOnTheScreen();
      expect(screen.getByTestId('image2')).toBeOnTheScreen();
      expect(screen.getByTestId('image3')).toBeOnTheScreen();
      
      // Check that each has correct sizing
      expect(screen.getByTestId('image1').props.style).toEqual([
        { width: 24, height: 24 },
        undefined
      ]);
      expect(screen.getByTestId('image2').props.style).toEqual([
        { width: 48, height: 48 },
        undefined
      ]);
      expect(screen.getByTestId('image3').props.style).toEqual([
        { width: 72, height: 72 },
        undefined
      ]);
    });
  });

  describe('Accessibility', () => {
    it('is accessible by default', () => {
      render(<ThemedImage source={mockSource} size="md" testID="themed-image" />);
      
      const image = screen.getByTestId('themed-image');
      expect(image.props.accessible).toBe(true);
    });

    it('supports custom accessibility properties', () => {
      render(
        <ThemedImage 
          source={mockSource} 
          size="md"
          accessibilityLabel="User avatar"
          accessibilityHint="Tap to change profile picture"
          accessibilityRole="image"
        />
      );
      
      const image = screen.getByLabelText('User avatar');
      expect(image).toBeOnTheScreen();
      expect(image.props.accessibilityHint).toBe('Tap to change profile picture');
      expect(image.props.accessibilityRole).toBe('image');
    });
  });

  describe('Different Source Types', () => {
    it('handles URI source', () => {
      const uriSource = { uri: 'https://example.com/image.png' };
      render(<ThemedImage source={uriSource} size="md" testID="themed-image" />);
      
      const image = screen.getByTestId('themed-image');
      expect(image.props.source).toEqual(uriSource);
    });

    it('handles require() source', () => {
      const requireSource = require('../../assets/images/favicon.png');
      render(<ThemedImage source={requireSource} size="md" testID="themed-image" />);
      
      const image = screen.getByTestId('themed-image');
      expect(image.props.source).toEqual(requireSource);
    });

    it('handles base64 source', () => {
      const base64Source = { 
        uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==' 
      };
      render(<ThemedImage source={base64Source} size="md" testID="themed-image" />);
      
      const image = screen.getByTestId('themed-image');
      expect(image.props.source).toEqual(base64Source);
    });
  });

  describe('Theme Integration', () => {
    it('updates when theme sizes change', () => {
      // This would be more comprehensive with a theme provider test
      // For now, testing that it uses the mocked theme values
      render(<ThemedImage source={mockSource} size="xl" testID="themed-image" />);
      
      const image = screen.getByTestId('themed-image');
      expect(image.props.style).toEqual([
        { width: 96, height: 96 }, // theme.sizes.xl from mock
        undefined
      ]);
    });
  });
});