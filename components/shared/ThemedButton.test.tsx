import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import ThemedButton from './ThemedButton';

// Mock the useStyles hook
jest.mock('../../hooks/useStyles', () => ({
  useStyles: () => ({
    theme: {
      colors: {
        button: {
          background: '#FFFFFF',
          highlight: '#A04B4980',
          text: {
            default: '#000000',
            highlight: '#FFFFFF',
          },
        },
      },
      font: {
        sizes: { md: 16, lg: 20 },
        weight: { regular: '400' },
        family: 'Harmattan',
      },
      paddings: { md: 10 },
      sizes: { sm: 24 },
    },
  }),
}));

describe('ThemedButton', () => {
  const defaultProps = {
    title: 'Test Button',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders with correct title', () => {
      render(<ThemedButton {...defaultProps} />);
      
      expect(screen.getByText('Test Button')).toBeOnTheScreen();
    });

    it('renders with custom title size', () => {
      render(<ThemedButton {...defaultProps} titleSize="lg" />);
      
      const buttonText = screen.getByText('Test Button');
      expect(buttonText.props.style).toMatchObject({
        fontSize: 20, // theme.font.sizes.lg
      });
    });

    it('applies custom styles', () => {
      const customStyle = { marginTop: 20 };
      render(<ThemedButton {...defaultProps} style={customStyle} />);
      
      const button = screen.getByText('Test Button').parent;
      expect(button?.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining(customStyle)
        ])
      );
    });
  });

  describe('Styling', () => {
    it('applies default theme styles', () => {
      render(<ThemedButton {...defaultProps} />);
      
      const buttonText = screen.getByText('Test Button');
      expect(buttonText.props.style).toMatchObject({
        color: '#000000', // theme.colors.button.text.default
        fontSize: 16, // theme.font.sizes.md
        fontWeight: '400', // theme.font.weight.regular
        fontFamily: 'Harmattan', // theme.font.family
      });
    });

    it('uses correct background color when inactive', () => {
      render(<ThemedButton {...defaultProps} />);
      
      const button = screen.getByText('Test Button').parent;
      expect(button?.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            backgroundColor: '#FFFFFF' // theme.colors.button.background
          })
        ])
      );
    });

    it('applies correct padding and border radius', () => {
      render(<ThemedButton {...defaultProps} />);
      
      const button = screen.getByText('Test Button').parent;
      expect(button?.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            padding: 10, // theme.paddings.md
            borderRadius: 12, // theme.sizes.sm / 2
          })
        ])
      );
    });
  });

  describe('Interactions', () => {
    it('calls onPress when pressed', () => {
      const mockOnPress = jest.fn();
      render(<ThemedButton {...defaultProps} onPress={mockOnPress} />);
      
      fireEvent.press(screen.getByText('Test Button'));
      
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    it('changes style when pressed (onPressIn)', () => {
      render(<ThemedButton {...defaultProps} />);
      
      const button = screen.getByText('Test Button').parent;
      
      // Simulate press in
      fireEvent(button, 'pressIn');
      
      // Check if highlight background is applied
      expect(button?.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            backgroundColor: '#A04B4980' // theme.colors.button.highlight
          })
        ])
      );
    });

    it('reverts style when press is released (onPressOut)', () => {
      render(<ThemedButton {...defaultProps} />);
      
      const button = screen.getByText('Test Button').parent;
      
      // Simulate press in then out
      fireEvent(button, 'pressIn');
      fireEvent(button, 'pressOut');
      
      // Should revert to original background
      expect(button?.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            backgroundColor: '#FFFFFF' // theme.colors.button.background
          })
        ])
      );
    });

    it('changes text color when active', () => {
      render(<ThemedButton {...defaultProps} />);
      
      const button = screen.getByText('Test Button').parent;
      const buttonText = screen.getByText('Test Button');
      
      // Simulate press in
      fireEvent(button, 'pressIn');
      
      expect(buttonText.props.style).toMatchObject({
        color: '#FFFFFF' // theme.colors.button.text.highlight
      });
    });
  });

  describe('Props Validation', () => {
    it('works without onPress prop', () => {
      expect(() => {
        render(<ThemedButton {...defaultProps} />);
      }).not.toThrow();
      
      // Should not crash when pressed without onPress
      expect(() => {
        fireEvent.press(screen.getByText('Test Button'));
      }).not.toThrow();
    });

    it('defaults to medium title size', () => {
      render(<ThemedButton {...defaultProps} />);
      
      const buttonText = screen.getByText('Test Button');
      expect(buttonText.props.style).toMatchObject({
        fontSize: 16 // theme.font.sizes.md (default)
      });
    });

    it('handles empty title', () => {
      render(<ThemedButton title="" />);
      
      expect(screen.getByText('')).toBeOnTheScreen();
    });
  });

  describe('Accessibility', () => {
    it('is accessible by default', () => {
      render(<ThemedButton {...defaultProps} />);
      
      const button = screen.getByText('Test Button').parent;
      expect(button?.props.accessible).toBe(true);
    });

    it('has correct accessibility role', () => {
      render(<ThemedButton {...defaultProps} />);
      
      const button = screen.getByRole('button');
      expect(button).toBeOnTheScreen();
    });

    it('includes title as accessible text', () => {
      render(<ThemedButton {...defaultProps} />);
      
      const button = screen.getByLabelText('Test Button');
      expect(button).toBeOnTheScreen();
    });
  });

  describe('State Management', () => {
    it('manages active state independently for multiple buttons', () => {
      render(
        <>
          <ThemedButton title="Button 1" />
          <ThemedButton title="Button 2" />
        </>
      );
      
      const button1 = screen.getByText('Button 1').parent;
      const button2 = screen.getByText('Button 2').parent;
      
      // Press button 1
      fireEvent(button1, 'pressIn');
      
      // Only button 1 should be highlighted
      expect(button1?.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            backgroundColor: '#A04B4980'
          })
        ])
      );
      
      expect(button2?.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            backgroundColor: '#FFFFFF'
          })
        ])
      );
    });
  });
});