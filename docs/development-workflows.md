# Hephaestus - Development Workflows

## Getting Started

### Prerequisites
- **Node.js**: v18 or higher
- **npm**: v8 or higher  
- **Expo CLI**: Latest version (`npm install -g @expo/cli`)
- **EAS CLI**: For builds (`npm install -g eas-cli`)
- **Git**: For version control

### Initial Setup
```bash
# Clone the repository
git clone <repository-url>
cd Hephaestus

# Install dependencies
npm install

# Install legacy peer dependencies for React Native compatibility
npm run deps:install-legacy

# Start development server
npm start
```

### Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Required environment variables
FIGMA_TOKEN=your_figma_token
FIGMA_FILE_KEY=your_figma_file_key
EXPO_PUBLIC_API_URL=your_api_url
```

## Development Workflows

### Daily Development Cycle

#### 1. Start Development Server
```bash
# Standard development
npm start

# Clear cache and restart
npm start -c

# Start with specific platform
npm start --ios
npm start --android
```

#### 2. Code Development
```bash
# Create new feature branch
git checkout -b feature/new-feature

# Make changes following conventions
# - Update components in components/
# - Add routes in app/
# - Create styles in styles/
# - Write tests co-located with components

# Run linting
npm run lint

# Run tests
npm test
```

#### 3. Testing Workflow
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests for CI
npm run test:ci
```

#### 4. Code Quality Checks
```bash
# Check TypeScript compilation
npx tsc --noEmit

# Run ESLint
npm run lint

# Check Expo project health
npx expo doctor
```

### Feature Development Workflow

#### 1. Planning Phase
- Review project conventions and architecture patterns
- Plan component structure and routing needs
- Identify shared components that can be reused
- Design theme integration approach

#### 2. Implementation Phase
```bash
# Create feature branch
git checkout -b feature/user-authentication

# Create necessary files
touch app/(auth)/register.tsx
touch components/auth/RegisterForm.tsx
touch components/auth/register-form.styles.ts

# Implement following patterns:
# - Use themed components
# - Co-locate styles with components
# - Add comprehensive tests
# - Follow TypeScript strict mode
```

#### 3. Testing Phase
```bash
# Write component tests
touch components/auth/RegisterForm.test.tsx

# Test structure:
describe('RegisterForm', () => {
  describe('Rendering', () => {
    it('renders form fields correctly', () => {});
  });
  
  describe('Validation', () => {
    it('validates email format', () => {});
  });
  
  describe('Submission', () => {
    it('submits valid form data', () => {});
  });
});

# Run tests
npm test RegisterForm
```

#### 4. Integration Phase
```bash
# Test feature integration
npm start

# Verify:
# - Navigation works correctly
# - Theme integration is consistent
# - Performance is acceptable
# - Accessibility is maintained
```

### Component Development Workflow

#### 1. Shared Component Creation
```bash
# Create component files
components/shared/
  NewComponent.tsx
  new-component.styles.ts
  NewComponent.test.tsx
```

#### 2. Component Implementation
```typescript
// NewComponent.tsx
import { useStyles } from '@/hooks/useStyles';
import { stylesheet } from './new-component.styles';

interface NewComponentProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export default function NewComponent({ 
  variant = 'primary', 
  size = 'md',
  ...props 
}: NewComponentProps) {
  const { theme, styles } = useStyles(stylesheet);
  
  return (
    <View style={[styles.container, styles[variant], styles[size]]}>
      {/* Component content */}
    </View>
  );
}
```

#### 3. Style Implementation
```typescript
// new-component.styles.ts
import { StyleSheet, ViewStyle } from 'react-native';
import { Theme } from '@/styles/theme.types';

export interface Styles {
  container: ViewStyle;
  primary: ViewStyle;
  secondary: ViewStyle;
  sm: ViewStyle;
  md: ViewStyle;
  lg: ViewStyle;
}

export const stylesheet = (theme: Theme): StyleSheet.NamedStyles<Styles> =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.sizes.sm / 2,
    },
    primary: {
      backgroundColor: theme.colors.button.background,
    },
    secondary: {
      backgroundColor: theme.colors.button.highlight,
    },
    sm: {
      padding: theme.paddings.sm,
    },
    md: {
      padding: theme.paddings.md,
    },
    lg: {
      padding: theme.paddings.lg,
    },
  });
```

### Routing Development Workflow

#### 1. Adding New Routes
```bash
# Create route group (if needed)
mkdir app/(feature)

# Add layout for group
touch app/(feature)/_layout.tsx

# Add route screens
touch app/(feature)/screen1.tsx
touch app/(feature)/screen2.tsx
```

#### 2. Layout Configuration
```typescript
// app/(feature)/_layout.tsx
import { Stack } from 'expo-router';

export default function FeatureLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Custom headers
      }}
    >
      <Stack.Screen name="screen1" />
      <Stack.Screen name="screen2" />
    </Stack>
  );
}
```

#### 3. Screen Implementation
```typescript
// app/(feature)/screen1.tsx
import { useRouter } from 'expo-router';

export default function Screen1() {
  const router = useRouter();
  
  const navigateToScreen2 = () => {
    router.push('/screen2');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Screen content */}
    </SafeAreaView>
  );
}
```

### Theme Development Workflow

#### 1. Theme Updates
```bash
# Update theme files
styles/
  light.theme.ts    # Light theme values
  dark.theme.ts     # Dark theme values
  theme.types.ts    # Theme interface
```

#### 2. Design Token Sync
```bash
# Sync from Figma (if configured)
npm run figma:sync

# Review generated recommendations
# Apply changes manually to theme files
```

#### 3. Component Updates
```bash
# Update components to use new theme values
# Test theme switching functionality
# Verify accessibility with both themes
```

### Testing Workflows

#### 1. Unit Testing
```bash
# Test individual components
npm test ComponentName

# Test with coverage
npm test ComponentName -- --coverage

# Test in watch mode
npm test ComponentName -- --watch
```

#### 2. Integration Testing
```bash
# Test component interactions
npm test -- --testPathPattern=integration

# Test navigation flows
npm test -- --testPathPattern=navigation
```

#### 3. End-to-End Testing (Planned)
```bash
# Run E2E tests (when implemented)
npm run test:e2e

# Run E2E tests on device
npm run test:e2e:device
```

### Build Workflows

#### 1. Development Builds
```bash
# Local development build
npm run prebuild

# Development build for device testing
eas build --profile development --platform ios
eas build --profile development --platform android
```

#### 2. Preview Builds
```bash
# Build for internal testing
eas build --profile preview --platform all

# Install on device
eas build:run --platform ios --latest
```

#### 3. Production Builds
```bash
# Production builds for app stores
eas build --profile production --platform all

# Submit to app stores
eas submit --platform ios
eas submit --platform android
```

### Deployment Workflows

#### 1. Development Deployment
```bash
# Deploy development version
npx expo publish --release-channel dev

# Deploy to specific environment
npx expo publish --release-channel staging
```

#### 2. Production Deployment
```bash
# Deploy production update
npx expo publish --release-channel production

# Deploy with specific version
npx expo publish --release-channel production-v1.2.0
```

### Debugging Workflows

#### 1. React Native Debugging
```bash
# Enable remote debugging
# Press 'd' in Expo CLI
# Select "Debug in Chrome"

# Use React DevTools
npm install -g react-devtools
react-devtools
```

#### 2. Network Debugging
```bash
# Enable network inspector
# Press 'd' in Expo CLI
# Select "Debug with Flipper"

# Or use React Native Debugger
npm install -g react-native-debugger
```

#### 3. Performance Debugging
```bash
# Use Flipper for performance monitoring
# Enable Hermes for better performance
# Use React DevTools Profiler
```

### Code Review Workflow

#### 1. Pre-Review Checklist
- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] ESLint passes
- [ ] Code follows conventions
- [ ] Documentation updated
- [ ] Performance impact considered

#### 2. Review Process
```bash
# Create pull request
git push origin feature/branch-name

# Review checklist:
# - Code quality and conventions
# - Test coverage
# - Performance impact
# - Security considerations
# - Accessibility compliance
```

#### 3. Post-Review
```bash
# Address feedback
git add .
git commit -m "fix: address review feedback"
git push origin feature/branch-name

# Merge after approval
git checkout main
git pull origin main
git merge feature/branch-name
git push origin main
```

### Maintenance Workflows

#### 1. Dependency Updates
```bash
# Check for outdated packages
npm outdated

# Update Expo SDK
npx expo install --fix

# Update other dependencies
npm update

# Test after updates
npm test
npm start
```

#### 2. Security Updates
```bash
# Audit dependencies
npm audit

# Fix vulnerabilities
npm audit fix

# Manual review for high-severity issues
npm audit --audit-level high
```

#### 3. Performance Monitoring
```bash
# Bundle size analysis
npx expo export --dump-assetmap

# Performance testing
npm run test:performance

# Memory leak detection
# Use React DevTools Profiler
```

### Documentation Workflows

#### 1. Code Documentation
```typescript
// Add JSDoc comments for complex functions
/**
 * Calculates theme-aware button styles
 * @param theme - The current theme object
 * @param variant - Button variant type
 * @returns Computed style object
 */
```

#### 2. Component Documentation
```markdown
# ComponentName

## Purpose
Brief description of component purpose

## Usage
```typescript
<ComponentName 
  prop1="value1"
  prop2="value2"
/>
```

## Props
- `prop1` (string): Description
- `prop2` (boolean, optional): Description
```

#### 3. Architecture Documentation
```bash
# Update architecture docs when patterns change
docs/
  architecture-patterns.md
  development-conventions.md
  tech-stack.md
```

### Emergency Procedures

#### 1. Rollback Procedure
```bash
# Revert to previous version
eas channel:rollback production --version previous

# Emergency hotfix
git checkout -b hotfix/emergency-fix
# Make minimal changes
git commit -m "hotfix: emergency fix"
eas build --profile production --platform all
```

#### 2. Critical Bug Response
```bash
# Immediate investigation
npm test -- --bail
npx expo doctor

# Disable problematic features
# Use feature flags if available

# Deploy hotfix
eas submit --platform all
```

These workflows ensure consistent, efficient, and reliable development practices while maintaining code quality and project stability throughout the development lifecycle.