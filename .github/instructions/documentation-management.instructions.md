---
applyTo: "**/*.md"
---

# Documentation Management Instructions

## Documentation Standards

### File Structure
```
.github/
├── instructions/           # AI agent instructions
├── workflows/             # CI/CD workflows
└── copilot-instructions.md # Legacy (now split)
docs/
├── architecture/          # System design documents
├── api/                   # API documentation
├── deployment/            # Deployment guides
└── user-guides/           # End-user documentation
README.md                  # Project overview
CHANGELOG.md              # Version history
CONTRIBUTING.md           # Contribution guidelines
```

### Documentation Types

#### Code Documentation
```typescript
/**
 * Component for displaying activity cards with timer integration
 * 
 * @param activity - The activity object to display
 * @param onStart - Callback when timer is started
 * @param variant - Display variant ('compact' | 'full')
 * 
 * @example
 * <ActivityCard 
 *   activity={activity} 
 *   onStart={handleTimerStart}
 *   variant="compact" 
 * />
 */
export function ActivityCard({ activity, onStart, variant = 'full' }: ActivityCardProps) {
  // Implementation
}
```

#### README Structure
```markdown
# Project Title

## Overview
Brief description of the project and its purpose.

## Quick Start
```bash
npm install
npm start
```

## Architecture
High-level system overview.

## Development
### Prerequisites
### Setup
### Available Scripts

## Deployment
Production deployment instructions.

## Contributing
Links to contribution guidelines.
```

#### API Documentation
```typescript
/**
 * @api {GET} /api/activities Get user activities
 * @apiName GetActivities
 * @apiGroup Activities
 * 
 * @apiParam {String} [category] Filter by category
 * @apiParam {String} [status] Filter by status
 * 
 * @apiSuccess {Object[]} activities List of activities
 * @apiSuccess {String} activities.id Activity ID
 * @apiSuccess {String} activities.title Activity title
 * 
 * @apiExample {curl} Example usage:
 * curl -H "Authorization: Bearer token" /api/activities
 */
```

### Change Documentation

#### CHANGELOG.md Format
```markdown
# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]
### Added
- New feature descriptions

### Changed
- Modified feature descriptions

### Fixed
- Bug fix descriptions

## [1.0.0] - 2025-10-03
### Added
- Initial release with activity tracking
- Timer functionality
- Theme system
```

#### Commit Message Format
```
type(scope): description

feat(auth): add biometric authentication
fix(timer): resolve background timer issue
docs(readme): update installation instructions
style(theme): improve dark mode colors
refactor(logging): simplify logger structure
test(components): add ActivityCard tests
```

### Code Comments

#### Component Documentation
```typescript
/**
 * Activity dashboard component with day/month view switching
 * 
 * Features:
 * - View toggle between day and month
 * - Activity filtering and sorting
 * - Real-time progress updates
 * 
 * State Management:
 * - Local view state (day/month)
 * - Route parameters for persistence
 * - Logging for user interactions
 */
export default function Dashboard() {
  // Implementation
}
```

#### Complex Logic Comments
```typescript
// Calculate tab bar positioning for responsive design
// Formula: (screen width - total tab width) / 2 for centering
const tabBarWidth = 3 * theme.sizes.xl + 6 * theme.margins.lg;
const marginLeft = (Dimensions.get("window").width - tabBarWidth) / 2;

// Theme switching with system preference detection
// Falls back to dark mode if system preference unavailable
const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(
  Appearance.getColorScheme() ?? "dark"
);
```

### Documentation Maintenance

#### Regular Updates
1. **Weekly Reviews**: Check for outdated information
2. **Feature Releases**: Update docs with new features
3. **API Changes**: Maintain API documentation accuracy
4. **Architecture Changes**: Update system design docs

#### Documentation Checklist
- [ ] Code changes include updated comments
- [ ] README reflects current functionality
- [ ] API docs match implementation
- [ ] Architecture docs are current
- [ ] Examples work with current codebase
- [ ] Links are valid and functional

#### Automated Documentation
```typescript
// Use TypeScript for self-documenting code
interface ActivityCardProps {
  /** The activity object to display */
  activity: Activity;
  /** Callback when timer is started */
  onStart: (activityId: string) => void;
  /** Display variant */
  variant?: 'compact' | 'full';
}

// JSDoc for component props
/**
 * @param props - Component props
 * @param props.activity - Activity data
 * @param props.onStart - Timer start callback
 * @param props.variant - Display style
 */
```

### Style Guide

#### Markdown Standards
- Use consistent heading hierarchy
- Include code syntax highlighting
- Add table of contents for long documents
- Use relative links for internal references
- Include alt text for images

#### Code Example Standards
```typescript
// ✅ Good: Clear, commented example
/**
 * Example of proper theme usage
 */
const { theme, styles } = useStyles<Styles>(stylesheet);

// ❌ Bad: Uncommented, unclear example
const x = useStyles(stylesheet);
```

## Best Practices
1. **Keep documentation current** - update with code changes
2. **Write for your audience** - consider skill level and context
3. **Use clear examples** - provide working code samples
4. **Maintain consistency** - follow established patterns
5. **Review regularly** - schedule documentation reviews
6. **Link related content** - create navigation between docs
7. **Include troubleshooting** - document common issues
8. **Version documentation** - track changes over time