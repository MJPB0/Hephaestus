---
applyTo: ".github/instructions/*.instructions.md"
---

# Hephaestus AI Instructions Index

This directory contains specialized AI agent instructions for different aspects of the Hephaestus React Native app development. Each file targets specific file patterns and development scenarios.

## Instruction Files Overview

### 🏗️ [Architecture & Routing](./architecture-routing.instructions.md)
**Apply To**: `app/**/*.{tsx,ts}`

Core application architecture patterns:
- Expo Router file-based routing system
- Navigation flow and state management
- Route groups and layout configurations
- Tab navigation specifics

### 🎨 [Theme & Styling](./theme-styling.instructions.md)
**Apply To**: `**/*.{tsx,ts}` (exclude node_modules)

Theme system and styling patterns:
- useStyles hook implementation
- Stylesheet organization and structure
- Responsive design with react-native-media-query
- Theme token usage and component theming

### 🧩 [Component Development](./component-development.instructions.md)
**Apply To**: `components/**/*.{tsx,ts}`

Component architecture and development:
- Shared component patterns (ThemedText, ThemedImage, ThemedButton)
- Icon component system
- Feature-based component organization
- State management and lifecycle patterns

### 📝 [Logging & Debugging](./logging-debugging.instructions.md)
**Apply To**: `**/*.{tsx,ts}` (exclude node_modules)

Structured logging system:
- Logger categories (navigation, user actions, auth, UI, API)
- Debugging patterns and best practices
- Event tracking and component lifecycle logging
- Development-only logging configuration

### 🎯 [Domain Organization](./domain-organization.instructions.md)
**Apply To**: `**/*.{tsx,ts,js}` (exclude node_modules)

Domain-driven design principles:
- Core domain concepts (Activities, Timers, Progress)
- Domain boundaries and file organization
- Cross-domain communication patterns
- Data flow architecture

### 📚 [Documentation Management](./documentation-management.instructions.md)
**Apply To**: `**/*.md`

Documentation standards and maintenance:
- File structure and documentation types
- Code documentation patterns (JSDoc, TypeScript)
- Change documentation (CHANGELOG, commit messages)
- Documentation maintenance workflows

### 🧪 [Unit Testing](./unit-testing.instructions.md)
**Apply To**: `**/*.{test,spec}.{ts,tsx}`

Testing strategies and patterns:
- Jest configuration and setup
- Component testing with React Native Testing Library
- Mock patterns for navigation, themes, and logging
- Test organization and best practices

### 🎨 [Figma Integration](./figma-integration.instructions.md)
**Apply To**: `utils/figma*.{js,ts}`

Design system integration:
- Figma MCP server architecture
- Design token synchronization workflow
- Code generation from design specifications
- Design-to-code process and best practices

## Quick Reference

### Essential Commands
```bash
npm start                    # Start Expo dev server
npm run figma:sync          # Sync design tokens from Figma
npm run deps:install-legacy # Install with React Native compatibility
npx expo doctor            # Check project health
npm test                    # Run unit tests
npm run lint               # ESLint validation
```

### Key Patterns

#### Theme Usage
```typescript
const { theme, styles } = useStyles<Styles>(stylesheet);
```

#### Logging
```typescript
import logger from '../utils/logger';
logger.navigation.tabChange('dashboard');
logger.user.buttonPress('Login', 'Login Page');
```

#### Navigation
```typescript
import { router } from "expo-router";
router.push("/dashboard");
```

#### Component Structure
```typescript
export default function Component() {
  const { theme, styles } = useStyles<Styles>(stylesheet);
  
  useEffect(() => {
    logger.ui.componentMount('Component');
    return () => logger.ui.componentUnmount('Component');
  }, []);
  
  return <View style={styles.container}>...</View>;
}
```

## Development Workflow

1. **Architecture**: Follow Expo Router patterns for new screens
2. **Styling**: Use theme system and co-locate styles
3. **Components**: Implement logging and proper TypeScript types
4. **Testing**: Write tests for new components and features
5. **Documentation**: Update docs with code changes
6. **Design**: Sync with Figma for design system updates

## File Organization Strategy

```
.github/instructions/
├── architecture-routing.instructions.md    # Navigation & routing
├── theme-styling.instructions.md           # Styling & theming
├── component-development.instructions.md   # Component patterns
├── logging-debugging.instructions.md       # Logging system
├── domain-organization.instructions.md     # Domain design
├── documentation-management.instructions.md # Docs maintenance
├── unit-testing.instructions.md           # Testing patterns
├── figma-integration.instructions.md      # Design integration
└── README.md                              # This index file
```

Each instruction file contains:
- **applyTo patterns** - Specific file targeting
- **Detailed guidance** - Implementation patterns and examples
- **Best practices** - Established conventions
- **Code examples** - Working implementation samples
- **Common pitfalls** - What to avoid

## Contributing to Instructions

When adding new instruction files:

1. **Use descriptive filenames** ending in `.instructions.md`
2. **Include applyTo patterns** in frontmatter
3. **Provide working code examples** from the actual codebase
4. **Document best practices** specific to this project
5. **Update this index file** with the new instruction summary

These instructions are designed to help AI coding agents understand the Hephaestus codebase patterns and contribute effectively to the project.