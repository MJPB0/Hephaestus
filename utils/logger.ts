/**
 * Simple structured logger for debugging navigation and user actions
 */

type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
type LogCategory = 'NAVIGATION' | 'USER_ACTION' | 'AUTH' | 'API' | 'UI';

interface LogEntry {
  level: LogLevel;
  category: LogCategory;
  message: string;
  data?: any;
  timestamp?: string;
}

class Logger {
  private isDevelopment = __DEV__;

  private formatMessage(entry: LogEntry): string {
    const timestamp = entry.timestamp || new Date().toISOString();
    const dataStr = entry.data ? ` | Data: ${JSON.stringify(entry.data)}` : '';
    return `[${timestamp}] [${entry.level}] [${entry.category}] ${entry.message}${dataStr}`;
  }

  private log(entry: LogEntry) {
    if (!this.isDevelopment) return;

    const formattedMessage = this.formatMessage(entry);
    
    switch (entry.level) {
      case 'ERROR':
        console.error(formattedMessage);
        break;
      case 'WARN':
        console.warn(formattedMessage);
        break;
      case 'DEBUG':
        console.debug(formattedMessage);
        break;
      default:
        console.log(formattedMessage);
    }
  }

  // Navigation logging
  navigation = {
    navigate: (route: string, params?: any) => {
      this.log({
        level: 'INFO',
        category: 'NAVIGATION',
        message: `Navigating to: ${route}`,
        data: params
      });
    },
    
    replace: (route: string, params?: any) => {
      this.log({
        level: 'INFO',
        category: 'NAVIGATION',
        message: `Replacing route with: ${route}`,
        data: params
      });
    },

    goBack: () => {
      this.log({
        level: 'INFO',
        category: 'NAVIGATION',
        message: 'Navigating back'
      });
    },

    tabChange: (tabName: string) => {
      this.log({
        level: 'INFO',
        category: 'NAVIGATION',
        message: `Tab changed to: ${tabName}`
      });
    }
  };

  // User action logging
  user = {
    buttonPress: (buttonName: string, context?: string) => {
      this.log({
        level: 'INFO',
        category: 'USER_ACTION',
        message: `Button pressed: ${buttonName}`,
        data: { context }
      });
    },

    menuAction: (action: string, menuType?: string) => {
      this.log({
        level: 'INFO',
        category: 'USER_ACTION',
        message: `Menu action: ${action}`,
        data: { menuType }
      });
    },

    formSubmit: (formName: string, data?: any) => {
      this.log({
        level: 'INFO',
        category: 'USER_ACTION',
        message: `Form submitted: ${formName}`,
        data
      });
    },

    input: (fieldName: string, value?: any) => {
      this.log({
        level: 'DEBUG',
        category: 'USER_ACTION',
        message: `Input changed: ${fieldName}`,
        data: { value }
      });
    }
  };

  // Authentication logging
  auth = {
    login: (method?: string) => {
      this.log({
        level: 'INFO',
        category: 'AUTH',
        message: 'User login attempt',
        data: { method }
      });
    },

    logout: () => {
      this.log({
        level: 'INFO',
        category: 'AUTH',
        message: 'User logout'
      });
    },

    authCheck: (isAuthenticated: boolean) => {
      this.log({
        level: 'DEBUG',
        category: 'AUTH',
        message: `Authentication check: ${isAuthenticated ? 'authenticated' : 'not authenticated'}`
      });
    }
  };

  // UI component logging
  ui = {
    componentMount: (componentName: string) => {
      this.log({
        level: 'DEBUG',
        category: 'UI',
        message: `Component mounted: ${componentName}`
      });
    },

    componentUnmount: (componentName: string) => {
      this.log({
        level: 'DEBUG',
        category: 'UI',
        message: `Component unmounted: ${componentName}`
      });
    },

    stateChange: (componentName: string, stateName: string, newValue: any) => {
      this.log({
        level: 'DEBUG',
        category: 'UI',
        message: `State changed in ${componentName}: ${stateName}`,
        data: { newValue }
      });
    }
  };

  // API logging
  api = {
    request: (endpoint: string, method: string, data?: any) => {
      this.log({
        level: 'INFO',
        category: 'API',
        message: `API ${method} request to: ${endpoint}`,
        data
      });
    },

    response: (endpoint: string, status: number, data?: any) => {
      this.log({
        level: status >= 400 ? 'ERROR' : 'INFO',
        category: 'API',
        message: `API response from ${endpoint}: ${status}`,
        data
      });
    },

    error: (endpoint: string, error: any) => {
      this.log({
        level: 'ERROR',
        category: 'API',
        message: `API error at ${endpoint}`,
        data: { error: error.message || error }
      });
    }
  };

  // Generic logging methods
  info = (message: string, data?: any) => {
    this.log({ level: 'INFO', category: 'USER_ACTION', message, data });
  };

  warn = (message: string, data?: any) => {
    this.log({ level: 'WARN', category: 'USER_ACTION', message, data });
  };

  error = (message: string, data?: any) => {
    this.log({ level: 'ERROR', category: 'USER_ACTION', message, data });
  };

  debug = (message: string, data?: any) => {
    this.log({ level: 'DEBUG', category: 'USER_ACTION', message, data });
  };
}

export const logger = new Logger();
export default logger;