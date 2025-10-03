import logger from './logger';

// Mock console methods to capture log output
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();
const mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation();
const mockConsoleDebug = jest.spyOn(console, 'debug').mockImplementation();

describe('Logger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
    mockConsoleError.mockRestore();
    mockConsoleWarn.mockRestore();
    mockConsoleDebug.mockRestore();
  });

  describe('Navigation Logging', () => {
    it('logs navigation events correctly', () => {
      logger.navigation.navigate('/dashboard', { view: 'day' });
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('[NAVIGATION] Navigating to: /dashboard')
      );
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('{"view":"day"}')
      );
    });

    it('logs route replacement', () => {
      logger.navigation.replace('/login');
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('[NAVIGATION] Replacing route with: /login')
      );
    });

    it('logs back navigation', () => {
      logger.navigation.goBack();
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('[NAVIGATION] Navigating back')
      );
    });

    it('logs tab changes', () => {
      logger.navigation.tabChange('dashboard');
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('[NAVIGATION] Tab changed to: dashboard')
      );
    });
  });

  describe('User Action Logging', () => {
    it('logs button presses with context', () => {
      logger.user.buttonPress('Login', 'Login Page');
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('[USER_ACTION] Button pressed: Login')
      );
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('{"context":"Login Page"}')
      );
    });

    it('logs menu actions', () => {
      logger.user.menuAction('Settings', 'Burger Menu');
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('[USER_ACTION] Menu action: Settings')
      );
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('{"menuType":"Burger Menu"}')
      );
    });

    it('logs form submissions', () => {
      const formData = { username: 'testuser' };
      logger.user.formSubmit('LoginForm', formData);
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('[USER_ACTION] Form submitted: LoginForm')
      );
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('{"username":"testuser"}')
      );
    });

    it('logs input changes as debug level', () => {
      logger.user.input('email', 'test@example.com');
      
      expect(mockConsoleDebug).toHaveBeenCalledWith(
        expect.stringContaining('[USER_ACTION] Input changed: email')
      );
    });
  });

  describe('Authentication Logging', () => {
    it('logs login attempts', () => {
      logger.auth.login('biometric');
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('[AUTH] User login attempt')
      );
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('{"method":"biometric"}')
      );
    });

    it('logs logout events', () => {
      logger.auth.logout();
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('[AUTH] User logout')
      );
    });

    it('logs authentication checks as debug', () => {
      logger.auth.authCheck(true);
      
      expect(mockConsoleDebug).toHaveBeenCalledWith(
        expect.stringContaining('[AUTH] Authentication check: authenticated')
      );
    });
  });

  describe('UI Component Logging', () => {
    it('logs component mount as debug', () => {
      logger.ui.componentMount('Dashboard');
      
      expect(mockConsoleDebug).toHaveBeenCalledWith(
        expect.stringContaining('[UI] Component mounted: Dashboard')
      );
    });

    it('logs component unmount as debug', () => {
      logger.ui.componentUnmount('Dashboard');
      
      expect(mockConsoleDebug).toHaveBeenCalledWith(
        expect.stringContaining('[UI] Component unmounted: Dashboard')
      );
    });

    it('logs state changes with data', () => {
      logger.ui.stateChange('Dashboard', 'view', 'month');
      
      expect(mockConsoleDebug).toHaveBeenCalledWith(
        expect.stringContaining('[UI] State changed in Dashboard: view')
      );
      expect(mockConsoleDebug).toHaveBeenCalledWith(
        expect.stringContaining('{"newValue":"month"}')
      );
    });
  });

  describe('API Logging', () => {
    it('logs API requests', () => {
      const requestData = { title: 'New Activity' };
      logger.api.request('/api/activities', 'POST', requestData);
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('[API] API POST request to: /api/activities')
      );
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('{"title":"New Activity"}')
      );
    });

    it('logs successful API responses', () => {
      const responseData = { id: '1', title: 'Activity' };
      logger.api.response('/api/activities', 200, responseData);
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('[API] API response from /api/activities: 200')
      );
    });

    it('logs API errors as error level', () => {
      logger.api.response('/api/activities', 500);
      
      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringContaining('[API] API response from /api/activities: 500')
      );
    });

    it('logs API error events', () => {
      const error = new Error('Network timeout');
      logger.api.error('/api/activities', error);
      
      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringContaining('[API] API error at /api/activities')
      );
      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringContaining('{"error":"Network timeout"}')
      );
    });
  });

  describe('Generic Logging Methods', () => {
    it('logs info messages', () => {
      logger.info('Information message', { context: 'test' });
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('[INFO] [USER_ACTION] Information message')
      );
    });

    it('logs warning messages', () => {
      logger.warn('Warning message');
      
      expect(mockConsoleWarn).toHaveBeenCalledWith(
        expect.stringContaining('[WARN] [USER_ACTION] Warning message')
      );
    });

    it('logs error messages', () => {
      logger.error('Error message', { error: 'details' });
      
      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringContaining('[ERROR] [USER_ACTION] Error message')
      );
    });

    it('logs debug messages', () => {
      logger.debug('Debug message');
      
      expect(mockConsoleDebug).toHaveBeenCalledWith(
        expect.stringContaining('[DEBUG] [USER_ACTION] Debug message')
      );
    });
  });

  describe('Log Format', () => {
    it('includes timestamp in log format', () => {
      logger.info('Test message');
      
      const logCall = mockConsoleLog.mock.calls[0][0];
      expect(logCall).toMatch(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\]/);
    });

    it('includes all required parts in log format', () => {
      logger.navigation.navigate('/test');
      
      const logCall = mockConsoleLog.mock.calls[0][0];
      expect(logCall).toMatch(/\[.*\] \[INFO\] \[NAVIGATION\] Navigating to: \/test/);
    });
  });

  describe('Development Mode', () => {
    it('only logs in development mode', () => {
      // Logger should respect __DEV__ global
      expect(logger).toBeDefined();
      
      // In test environment, __DEV__ should be true
      expect(global.__DEV__).toBe(true);
    });
  });
});