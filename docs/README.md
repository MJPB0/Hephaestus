# 📚 Hephaestus Documentation



Welcome to the comprehensive documentation for Hephaestus - a React Native digital notepad app for activities and tasks with timer functionality.



## 📖 Documentation OverviewWelcome to the Hephaestus documentation. This digital notepad application is built with React Native, Expo Router, and TypeScript, featuring a comprehensive theme system and modern development practices.Welcome to the comprehensive documentation for Hephaestus - a React Native digital notepad app for activities and tasks with timer functionality.



### 🏗️ **Core Documentation**

- **[Architecture Guide](./ARCHITECTURE.md)** - Complete technical overview of the modernized React Native app

- **[Developer Guide](./DEVELOPER_GUIDE.md)** - Practical development handbook with patterns and examples  ## 📋 What is Hephaestus?## 📖 Documentation Overview

- **[API Documentation](./API_DOCUMENTATION.md)** - Complete API integration reference with TanStack Query



### 🧩 **Component & Testing**

- **[Component Documentation](./COMPONENT_DOCUMENTATION.md)** - Comprehensive component library referenceHephaestus is a cross-platform digital notepad application designed for activities and tasks. It includes timer functionality for workouts, activity logging, and personal organization tools. The app features a tab-based navigation system with authentication flow and comprehensive theming support.### 🏗️ **Core Documentation**

- **[Testing Guide](./TESTING_GUIDE.md)** - Complete testing strategy and implementation guide

- **[Testing Summary](./TESTING_SUMMARY.md)** - Quick overview of testing framework and results- **[Architecture Guide](./ARCHITECTURE.md)** - Complete technical overview of the modernized React Native app



### 📋 **Project History**## 📚 Documentation Structure- **[Developer Guide](./DEVELOPER_GUIDE.md)** - Practical development handbook with patterns and examples  

- **[Modernization Guide](./MODERNIZATION.md)** - Complete modernization process and changes made

- **[API Documentation](./API_DOCUMENTATION.md)** - Complete API integration reference with TanStack Query

## 🚀 Quick Start

### Core Documentation

1. **New Developer Setup**: Start with [Developer Guide](./DEVELOPER_GUIDE.md)

2. **Architecture Understanding**: Read [Architecture Guide](./ARCHITECTURE.md)| Document | Purpose | Target Audience |### 🧩 **Component & Testing**

3. **Component Development**: Reference [Component Documentation](./COMPONENT_DOCUMENTATION.md)

4. **API Integration**: Use [API Documentation](./API_DOCUMENTATION.md)|----------|---------|-----------------|- **[Component Documentation](./COMPONENT_DOCUMENTATION.md)** - Comprehensive component library reference

5. **Testing Implementation**: Follow [Testing Guide](./TESTING_GUIDE.md)

| **[Tech Stack Overview](./tech-stack.md)** | Comprehensive overview of technologies, frameworks, and tools used in the project | Developers, Technical Leads, New Team Members |- **[Testing Guide](./TESTING_GUIDE.md)** - Complete testing strategy and implementation guide

## 🎯 Documentation Goals

| **[Architecture Patterns](./architecture-patterns.md)** | Design patterns, architectural decisions, and code organization principles | Senior Developers, Architects, Code Reviewers |- **[Testing Summary](./TESTING_SUMMARY.md)** - Quick overview of testing framework and results

This documentation suite provides:

- **Complete technical reference** for the modernized React Native app| **[Development Conventions](./development-conventions.md)** | Coding standards, naming conventions, and best practices | All Developers, Contributors |

- **Practical examples** and code patterns for development

- **Testing strategies** with comprehensive coverage| **[Development Workflows](./development-workflows.md)** | Step-by-step procedures for common development tasks | Developers, DevOps, Project Managers |### 📋 **Project History**

- **API integration** patterns using modern libraries

- **Component library** documentation for UI development| **[Testing Guide](./testing-guide.md)** | Comprehensive testing strategies, patterns, and best practices | QA Engineers, Developers, Test Automation |- **[Modernization Guide](./MODERNIZATION.md)** - Complete modernization process and changes made



## 📊 Project Stats



- **Tech Stack**: React Native 0.81.4, Expo SDK 54, TypeScript, NativeWind v4## 🚀 Quick Start## 🚀 Quick Start

- **State Management**: Zustand + TanStack Query

- **Form Handling**: React Hook Form + Zod validation

- **Testing**: Jest + React Native Testing Library (55 tests)

- **Documentation**: 6 comprehensive guides### For New Developers1. **New Developer Setup**: Start with [Developer Guide](./DEVELOPER_GUIDE.md)



## 🔗 Related Links1. Read **[Tech Stack Overview](./tech-stack.md)** to understand the technology foundation2. **Architecture Understanding**: Read [Architecture Guide](./ARCHITECTURE.md)



- **Main README**: [../README.md](../README.md)2. Study **[Development Conventions](./development-conventions.md)** for coding standards3. **Component Development**: Reference [Component Documentation](./COMPONENT_DOCUMENTATION.md)

- **Project Repository**: [github.com/MJPB0/Hephaestus](https://github.com/MJPB0/Hephaestus)

3. Follow **[Development Workflows](./development-workflows.md)** for setup and daily development4. **API Integration**: Use [API Documentation](./API_DOCUMENTATION.md)

---

4. Reference **[Architecture Patterns](./architecture-patterns.md)** for implementation guidance5. **Testing Implementation**: Follow [Testing Guide](./TESTING_GUIDE.md)

*Last updated: September 30, 2025*


### For Contributors## 🎯 Documentation Goals

1. Review **[Development Conventions](./development-conventions.md)** for contribution standards

2. Follow **[Testing Guide](./testing-guide.md)** for test requirementsThis documentation suite provides:

3. Use **[Development Workflows](./development-workflows.md)** for pull request process- **Complete technical reference** for the modernized React Native app

- **Practical examples** and code patterns for development

### For Technical Leads- **Testing strategies** with comprehensive coverage

1. **[Architecture Patterns](./architecture-patterns.md)** for design decisions- **API integration** patterns using modern libraries

2. **[Tech Stack Overview](./tech-stack.md)** for technology choices- **Component library** documentation for UI development

3. **[Development Workflows](./development-workflows.md)** for process optimization

## 📊 Project Stats

## 🏗️ Project Architecture Overview

- **Tech Stack**: React Native 0.81.4, Expo SDK 54, TypeScript, NativeWind v4

### Technology Stack- **State Management**: Zustand + TanStack Query

- **Frontend**: React Native 0.74 with TypeScript- **Form Handling**: React Hook Form + Zod validation

- **Navigation**: Expo Router v6 (file-based routing)- **Testing**: Jest + React Native Testing Library (55 tests)

- **Styling**: Custom theme system with responsive design- **Documentation**: 6 comprehensive guides

- **State Management**: React hooks (Redux planned)

- **Testing**: Jest with React Native Testing Library## 🔗 Related Links

- **Build System**: Expo SDK 51 with EAS Build

- **Main README**: [../README.md](../README.md)

### Key Features- **Project Repository**: [github.com/MJPB0/Hephaestus](https://github.com/MJPB0/Hephaestus)

- **Cross-platform**: iOS and Android support

- **Theme System**: Centralized theming with light/dark mode support---

- **File-based Routing**: Intuitive navigation structure

- **Type Safety**: Full TypeScript coverage*Last updated: September 30, 2025*
- **Testing**: Comprehensive test coverage
- **Performance**: Optimized for smooth user experience

## 📱 Application Structure

```
app/                    # Expo Router file-based routes
├── _layout.tsx         # Root layout with providers
├── index.tsx           # Entry point
├── (auth)/             # Authentication flow
│   ├── login.tsx
│   └── logout.tsx
└── (tabs)/             # Main application tabs
    ├── dashboard.tsx   # Home dashboard
    ├── statistics.tsx  # Statistics view
    └── timer.tsx       # Timer functionality

components/             # Reusable UI components
├── shared/             # Core themed components
├── icons/              # Icon components
├── headers/            # Header components
└── dashboard/          # Feature-specific components

styles/                 # Theme and styling system
├── light.theme.ts      # Light theme definition
├── dark.theme.ts       # Dark theme definition
└── theme.types.ts      # Theme interface

hooks/                  # Custom React hooks
utils/                  # Utility functions
assets/                 # Static assets (images, fonts)
```

## 🎨 Theme System

The application uses a centralized theme system that ensures visual consistency:

```typescript
interface Theme {
  colors: { background, text, button, etc. };
  font: { sizes, weights, family };
  sizes: { sm, md, lg, xl };
  margins: { xs, sm, md, lg, xl };
  paddings: { xs, sm, md, lg, xl };
}
```

All components use the `useStyles()` hook for theme-aware styling, enabling seamless light/dark mode switching and consistent design patterns.

## 🧪 Testing Strategy

The project follows a comprehensive testing approach:

- **Unit Tests**: Individual component and utility testing
- **Integration Tests**: Component interaction testing
- **Navigation Tests**: Route and navigation flow testing
- **Accessibility Tests**: Screen reader and accessibility compliance

Testing is built with Jest and React Native Testing Library, with comprehensive mocking strategies for the React Native ecosystem.

## 🔄 Development Process

### Daily Development
1. **Start**: `npm start` for development server
2. **Code**: Follow TypeScript strict mode and theme system
3. **Test**: Write tests co-located with components
4. **Quality**: ESLint validation and type checking

### Feature Development
1. **Plan**: Review architecture patterns and conventions
2. **Implement**: Create themed components with proper routing
3. **Test**: Comprehensive test coverage with proper mocking
4. **Review**: Code review following established guidelines

### Build & Deploy
1. **Development**: Local development with hot reload
2. **Testing**: EAS development builds for device testing
3. **Production**: EAS production builds for app stores

## 📖 Additional Resources

### External Documentation
- **[Expo Documentation](https://docs.expo.dev/)**: Expo SDK and tooling
- **[React Native Documentation](https://reactnative.dev/)**: React Native framework
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)**: TypeScript language features
- **[Testing Library](https://testing-library.com/docs/react-native-testing-library/intro/)**: Testing best practices

### Project-Specific Resources
- **Component Library**: Check `components/shared/` for reusable components
- **Theme Reference**: See `styles/` directory for theme definitions
- **Icon System**: Browse `components/icons/` for available icons
- **Test Examples**: Review existing test files for testing patterns

## 🤝 Contributing

### Getting Started
1. Read the **[Development Conventions](./development-conventions.md)**
2. Set up your development environment using **[Development Workflows](./development-workflows.md)**
3. Write tests following the **[Testing Guide](./testing-guide.md)**
4. Submit pull requests following the established code review process

### Code Quality Standards
- **TypeScript**: Strict mode with no type errors
- **ESLint**: All linting rules must pass
- **Testing**: Maintain test coverage thresholds
- **Performance**: Monitor bundle size and render performance

### Documentation Standards
- Update relevant documentation for any architectural changes
- Include code examples for new patterns or components
- Maintain clear and concise documentation style
- Keep documentation in sync with code changes

## 📞 Support & Contact

For questions about:
- **Architecture Decisions**: Refer to Architecture Patterns documentation
- **Development Setup**: Follow Development Workflows guide  
- **Coding Standards**: Check Development Conventions
- **Testing Issues**: Consult Testing Guide
- **Technical Problems**: Review Tech Stack Overview

## 🔄 Document Maintenance

This documentation is actively maintained and should be updated when:
- New architectural patterns are introduced
- Development processes change
- Technology stack is updated
- Testing strategies evolve
- New conventions are established

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Maintainers**: Development Team

---

*This documentation provides a complete guide to understanding, developing, and contributing to the Hephaestus project. For specific technical details, please refer to the individual documentation files linked above.*