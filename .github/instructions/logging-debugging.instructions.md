---
applyTo: "**/*.{tsx,ts}"
exclude: "node_modules/**"
---

# Logging & Debugging Instructions

## Structured Logging System

### Import and Usage
```typescript
import logger from '../utils/logger';
// OR for specific utilities
import logger from '../../utils/logger';
```

### Logging Categories

#### Navigation Logging
```typescript
// Route navigation
logger.navigation.navigate('/dashboard');
logger.navigation.replace('/login');
logger.navigation.goBack();

// Tab changes
logger.navigation.tabChange('dashboard');
logger.navigation.tabChange('statistics');
```

#### User Action Logging
```typescript
// Button interactions
logger.user.buttonPress('Login', 'Login Page');
logger.user.buttonPress('Save', 'Edit Profile');

// Menu actions
logger.user.menuAction('Settings', 'Burger Menu');
logger.user.menuAction('Profile', 'Avatar Menu');

// Form interactions
logger.user.formSubmit('LoginForm', { username: 'user@example.com' });
logger.user.input('email', 'user@example.com');
```

#### Authentication Logging
```typescript
// Auth events
logger.auth.login('manual');
logger.auth.login('biometric');
logger.auth.logout();
logger.auth.authCheck(isAuthenticated);
```

#### UI Component Logging
```typescript
// Component lifecycle
logger.ui.componentMount('Dashboard');
logger.ui.componentUnmount('Dashboard');

// State changes
logger.ui.stateChange('Dashboard', 'view', newView);
logger.ui.stateChange('TabLayout', 'isDashboard', isDashboard);
```

#### API Logging
```typescript
// API requests
logger.api.request('/api/activities', 'GET');
logger.api.request('/api/activities', 'POST', { title: 'New Activity' });

// API responses
logger.api.response('/api/activities', 200, responseData);
logger.api.response('/api/activities', 404);

// API errors
logger.api.error('/api/activities', error);
```

### Log Levels
```typescript
// Generic logging methods
logger.info('Information message', data);
logger.warn('Warning message', data);
logger.error('Error message', data);
logger.debug('Debug message', data);
```

### Debugging Navigation Flow
Check logger output for navigation flow:
```
[2025-10-03T10:30:00.000Z] [INFO] [NAVIGATION] Navigating to: /dashboard
[2025-10-03T10:30:01.000Z] [INFO] [NAVIGATION] Tab changed to: statistics
[2025-10-03T10:30:02.000Z] [INFO] [USER_ACTION] Button pressed: Settings | Data: {"context":"Burger Menu"}
```

### Component Logging Patterns
```typescript
// Component mount/unmount tracking
export default function ComponentName() {
  useEffect(() => {
    logger.ui.componentMount('ComponentName');
    
    return () => {
      logger.ui.componentUnmount('ComponentName');
    };
  }, []);
  
  // State change tracking
  useEffect(() => {
    logger.ui.stateChange('ComponentName', 'stateName', stateValue);
  }, [stateValue]);
}
```

### Event Handler Logging
```typescript
// Button press handlers
const handleButtonPress = () => {
  logger.user.buttonPress('ButtonName', 'Screen Context');
  // Button logic
};

// Navigation handlers
const handleNavigation = (route: string) => {
  logger.navigation.navigate(route);
  router.push(route);
};

// Menu action handlers
const handleMenuAction = (action: string) => {
  logger.user.menuAction(action, 'Menu Type');
  // Menu logic
};
```

## Development Mode Only
The logger automatically detects development mode (`__DEV__`) and only logs in development. Production builds will not output logs.

## Best Practices
1. **Always log user interactions** - buttons, menus, form submissions
2. **Track navigation changes** - route changes, tab switches
3. **Log component lifecycle** - mount, unmount, key state changes
4. **Include context** - provide meaningful context in log messages
5. **Use appropriate categories** - navigation, user, auth, ui, api
6. **Consistent naming** - use clear, descriptive names for actions
7. **Log errors properly** - use logger.error() for error conditions
8. **Review logs regularly** - use logs for debugging and user flow analysis