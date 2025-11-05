import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Home from './Home';
import Timer from './Timer';
import Statistics from './Statistics';
import Avatar from './Avatar';
import Arrow from './Arrow';
import Burger from './Burger';
import Switch from './Switch';
import WorkInProgress from './WorkInProgress';

// Mock ThemedImage component
jest.mock('../shared/ThemedImage', () => {
  const MockThemedImage = ({ size = 'md', ...props }: any) => {
    const { View } = jest.requireActual('react-native');
    return <View testID="mocked-themed-image" data-size={size} {...props} />;
  };
  MockThemedImage.displayName = 'MockThemedImage';
  return MockThemedImage;
});

describe('Icon Components', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Home Icon', () => {
    it('renders with correct default props', () => {
      render(<Home />);
      
      const icon = screen.getByTestId('mocked-themed-image');
      expect(icon).toBeOnTheScreen();
      expect(icon.props['data-size']).toBe('md'); // default size
    });

    it('applies custom size prop', () => {
      render(<Home size="lg" />);
      
      const icon = screen.getByTestId('mocked-themed-image');
      expect(icon.props['data-size']).toBe('lg');
    });

    it('uses correct image source', () => {
      render(<Home />);
      
      const icon = screen.getByTestId('mocked-themed-image');
      expect(icon.props.source).toBeDefined();
    });

    it('handles all size variants', () => {
      const sizes = ['sm', 'md', 'lg'] as const;
      
      sizes.forEach(size => {
        const { unmount } = render(<Home size={size} />);
        
        const icon = screen.getByTestId('mocked-themed-image');
        expect(icon.props['data-size']).toBe(size);
        
        unmount();
      });
    });
  });

  describe('Timer Icon', () => {
    it('renders with correct default props', () => {
      render(<Timer />);
      
      const icon = screen.getByTestId('mocked-themed-image');
      expect(icon).toBeOnTheScreen();
      expect(icon.props['data-size']).toBe('md');
    });

    it('applies custom size prop', () => {
      render(<Timer size="sm" />);
      
      const icon = screen.getByTestId('mocked-themed-image');
      expect(icon.props['data-size']).toBe('sm');
    });

    it('uses correct image source', () => {
      render(<Timer />);
      
      const icon = screen.getByTestId('mocked-themed-image');
      expect(icon.props.source).toBeDefined();
    });
  });

  describe('Statistics Icon', () => {
    it('renders with correct default props', () => {
      render(<Statistics />);
      
      const icon = screen.getByTestId('mocked-themed-image');
      expect(icon).toBeOnTheScreen();
      expect(icon.props['data-size']).toBe('md');
    });

    it('applies custom size prop', () => {
      render(<Statistics size="lg" />);
      
      const icon = screen.getByTestId('mocked-themed-image');
      expect(icon.props['data-size']).toBe('lg');
    });

    it('uses correct image source', () => {
      render(<Statistics />);
      
      const icon = screen.getByTestId('mocked-themed-image');
      expect(icon.props.source).toBeDefined();
    });
  });

  describe('Avatar Icon', () => {
    it('renders with correct default props', () => {
      render(<Avatar />);
      
      const icon = screen.getByTestId('mocked-themed-image');
      expect(icon).toBeOnTheScreen();
      expect(icon.props['data-size']).toBe('md');
    });

    it('applies custom size prop', () => {
      render(<Avatar size="xl" />);
      
      const icon = screen.getByTestId('mocked-themed-image');
      expect(icon.props['data-size']).toBe('xl');
    });
  });

  describe('Arrow Icon', () => {
    it('renders with correct default props', () => {
      render(<Arrow direction="right" />);
      
      const icon = screen.getByTestId('mocked-themed-image');
      expect(icon).toBeOnTheScreen();
      expect(icon.props['data-size']).toBe('md');
    });

    it('applies custom size prop', () => {
      render(<Arrow direction="left" size="sm" />);
      
      const icon = screen.getByTestId('mocked-themed-image');
      expect(icon.props['data-size']).toBe('sm');
    });

    it('handles direction prop correctly', () => {
      render(<Arrow direction="left" />);
      
      const icon = screen.getByTestId('mocked-themed-image');
      expect(icon.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            transform: [{ rotateY: "180deg" }]
          })
        ])
      );
    });

    it('applies right direction correctly', () => {
      render(<Arrow direction="right" />);
      
      const icon = screen.getByTestId('mocked-themed-image');
      expect(icon.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            transform: [{ rotateY: "0deg" }]
          })
        ])
      );
    });
  });

  describe('Burger Icon', () => {
    it('renders with correct default props', () => {
      render(<Burger />);
      
      const icon = screen.getByTestId('mocked-themed-image');
      expect(icon).toBeOnTheScreen();
      expect(icon.props['data-size']).toBe('md');
    });

    it('applies custom size prop', () => {
      render(<Burger size="lg" />);
      
      const icon = screen.getByTestId('mocked-themed-image');
      expect(icon.props['data-size']).toBe('lg');
    });
  });

  describe('Switch Icon', () => {
    it('renders with correct default props', () => {
      render(<Switch state="default" />);
      
      const icon = screen.getByTestId('mocked-themed-image');
      expect(icon).toBeOnTheScreen();
      expect(icon.props['data-size']).toBe('md');
    });

    it('applies custom size prop', () => {
      render(<Switch state="clicked" size="sm" />);
      
      const icon = screen.getByTestId('mocked-themed-image');
      expect(icon.props['data-size']).toBe('sm');
    });

    it('handles state prop correctly', () => {
      render(<Switch state="default" />);
      
      const icon = screen.getByTestId('mocked-themed-image');
      expect(icon.props.source).toBeDefined();
    });

    it('changes source based on state', () => {
      const { rerender } = render(<Switch state="default" />);
      
      let icon = screen.getByTestId('mocked-themed-image');
      const defaultSource = icon.props.source;
      
      rerender(<Switch state="clicked" />);
      
      icon = screen.getByTestId('mocked-themed-image');
      const clickedSource = icon.props.source;
      
      // Sources should be different for different states
      expect(defaultSource).not.toEqual(clickedSource);
    });
  });

  describe('WorkInProgress Icon', () => {
    it('renders with correct default props', () => {
      render(<WorkInProgress />);
      
      const icon = screen.getByTestId('mocked-themed-image');
      expect(icon).toBeOnTheScreen();
      expect(icon.props['data-size']).toBe('md');
    });

    it('applies custom size prop', () => {
      render(<WorkInProgress size="lg" />);
      
      const icon = screen.getByTestId('mocked-themed-image');
      expect(icon.props['data-size']).toBe('lg');
    });
  });

  describe('Icon Consistency', () => {
    const simpleIconComponents = [
      { name: 'Home', Component: Home },
      { name: 'Timer', Component: Timer },
      { name: 'Statistics', Component: Statistics },
      { name: 'Avatar', Component: Avatar },
      { name: 'Burger', Component: Burger },
      { name: 'WorkInProgress', Component: WorkInProgress },
    ];

    it('simple icons accept size prop consistently', () => {
      simpleIconComponents.forEach(({ name, Component }) => {
        const { unmount } = render(<Component size="lg" />);
        
        const icon = screen.getByTestId('mocked-themed-image');
        expect(icon.props['data-size']).toBe('lg');
        
        unmount();
      });
    });

    it('complex icons accept size prop consistently', () => {
      // Test Arrow component
      const { unmount: unmountArrow } = render(<Arrow direction="right" size="lg" />);
      let icon = screen.getByTestId('mocked-themed-image');
      expect(icon.props['data-size']).toBe('lg');
      unmountArrow();

      // Test Switch component
      const { unmount: unmountSwitch } = render(<Switch state="default" size="lg" />);
      icon = screen.getByTestId('mocked-themed-image');
      expect(icon.props['data-size']).toBe('lg');
      unmountSwitch();
    });

    it('simple icons have default medium size', () => {
      simpleIconComponents.forEach(({ name, Component }) => {
        const { unmount } = render(<Component />);
        
        const icon = screen.getByTestId('mocked-themed-image');
        expect(icon.props['data-size']).toBe('md');
        
        unmount();
      });
    });

    it('complex icons have default medium size', () => {
      // Test Arrow component
      const { unmount: unmountArrow } = render(<Arrow direction="right" />);
      let icon = screen.getByTestId('mocked-themed-image');
      expect(icon.props['data-size']).toBe('md');
      unmountArrow();

      // Test Switch component
      const { unmount: unmountSwitch } = render(<Switch state="default" />);
      icon = screen.getByTestId('mocked-themed-image');
      expect(icon.props['data-size']).toBe('md');
      unmountSwitch();
    });

    it('all simple icons render without errors', () => {
      simpleIconComponents.forEach(({ name, Component }) => {
        expect(() => {
          const { unmount } = render(<Component />);
          unmount();
        }).not.toThrow();
      });
    });

    it('all complex icons render without errors', () => {
      expect(() => {
        const { unmount: unmountArrow } = render(<Arrow direction="left" />);
        unmountArrow();
      }).not.toThrow();

      expect(() => {
        const { unmount: unmountSwitch } = render(<Switch state="clicked" />);
        unmountSwitch();
      }).not.toThrow();
    });

    it('all simple icons pass through ThemedImage props', () => {
      simpleIconComponents.forEach(({ name, Component }) => {
        const { unmount } = render(<Component testID={`${name.toLowerCase()}-icon`} />);
        
        const icon = screen.getByTestId(`${name.toLowerCase()}-icon`);
        expect(icon).toBeOnTheScreen();
        
        unmount();
      });
    });

    it('all complex icons pass through ThemedImage props', () => {
      // Test Arrow component
      const { unmount: unmountArrow } = render(
        <Arrow direction="right" testID="arrow-icon" />
      );
      let icon = screen.getByTestId('arrow-icon');
      expect(icon).toBeOnTheScreen();
      unmountArrow();

      // Test Switch component  
      const { unmount: unmountSwitch } = render(
        <Switch state="default" testID="switch-icon" />
      );
      icon = screen.getByTestId('switch-icon');
      expect(icon).toBeOnTheScreen();
      unmountSwitch();
    });
  });

  describe('Performance', () => {
    it('renders multiple icons without interference', () => {
      render(
        <>
          <Home testID="home-icon" />
          <Timer testID="timer-icon" />
          <Statistics testID="stats-icon" />
          <Avatar testID="avatar-icon" />
          <Arrow direction="right" testID="arrow-icon" />
          <Switch state="default" testID="switch-icon" />
        </>
      );
      
      expect(screen.getByTestId('home-icon')).toBeOnTheScreen();
      expect(screen.getByTestId('timer-icon')).toBeOnTheScreen();
      expect(screen.getByTestId('stats-icon')).toBeOnTheScreen();
      expect(screen.getByTestId('avatar-icon')).toBeOnTheScreen();
      expect(screen.getByTestId('arrow-icon')).toBeOnTheScreen();
      expect(screen.getByTestId('switch-icon')).toBeOnTheScreen();
    });

    it('handles rapid size changes without errors', () => {
      const { rerender } = render(<Home size="sm" />);
      
      expect(() => {
        rerender(<Home size="md" />);
        rerender(<Home size="lg" />);
        rerender(<Home size="sm" />);
      }).not.toThrow();
    });

    it('handles rapid prop changes in complex icons', () => {
      const { rerender } = render(<Arrow direction="left" size="sm" />);
      
      expect(() => {
        rerender(<Arrow direction="right" size="md" />);
        rerender(<Arrow direction="left" size="lg" />);
        rerender(<Arrow direction="right" size="sm" />);
      }).not.toThrow();
    });
  });

  describe('Props Interface', () => {
    it('accepts all valid size values', () => {
      const validSizes = ['sm', 'md', 'lg'] as const;
      
      validSizes.forEach(size => {
        expect(() => {
          const { unmount } = render(<Home size={size} />);
          unmount();
        }).not.toThrow();
      });
    });

    it('maintains ThemedImage interface compatibility', () => {
      // Testing that icon components properly extend ThemedImage props
      expect(() => {
        render(
          <Home 
            size="md" 
            style={{ opacity: 0.5 }}
            accessibilityLabel="Home navigation"
          />
        );
      }).not.toThrow();
      
      const icon = screen.getByTestId('mocked-themed-image');
      expect(icon.props.style).toEqual({ opacity: 0.5 });
      expect(icon.props.accessibilityLabel).toBe('Home navigation');
    });

    it('complex icons maintain ThemedImage interface compatibility', () => {
      expect(() => {
        render(
          <Arrow 
            direction="left"
            size="md" 
            style={{ opacity: 0.8 }}
            accessibilityLabel="Back arrow"
          />
        );
      }).not.toThrow();
      
      const icon = screen.getByTestId('mocked-themed-image');
      expect(icon.props.accessibilityLabel).toBe('Back arrow');
    });
  });
});