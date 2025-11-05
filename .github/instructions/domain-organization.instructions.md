---
applyTo: "**/*.{tsx,ts,js}"
exclude: "node_modules/**"
---

# Domain Organization Instructions

## Project Domain: Digital Activity Notepad

Hephaestus is a React Native digital notepad app for tracking activities and tasks with timer functionality, designed for personal organization and productivity.

## Core Domain Concepts

### Primary Entities
1. **Activities** - Main trackable items (workouts, tasks, projects)
2. **Timers** - Time tracking for activities
3. **Progress** - Historical tracking and statistics
4. **User Preferences** - Settings and customization

### Domain Boundaries

#### Authentication Domain (`app/(auth)/`)
- User login/logout flow
- Secure token management
- Biometric authentication (Face ID)
- Session management

#### Activity Management Domain (`app/(tabs)/dashboard`)
- Activity creation and editing
- Day/Month view switching
- Activity categorization
- Progress visualization

#### Timer Domain (`app/(tabs)/timer`)
- Workout timing
- Activity duration tracking
- Timer controls (start, stop, pause)
- Background timer management

#### Analytics Domain (`app/(tabs)/statistics`)
- Progress visualization
- Historical data analysis
- Performance metrics
- Export capabilities

## File Organization Strategy

### Directory Structure
```
app/
├── (auth)/          # Authentication flow
├── (tabs)/          # Main app features
│   ├── dashboard/   # Activity management
│   ├── timer/       # Timer functionality
│   └── statistics/  # Analytics and reporting
components/
├── shared/          # Cross-domain components
├── dashboard/       # Activity-specific components
├── headers/         # Navigation components
└── icons/           # UI icons
styles/
├── screens/         # Screen-specific styles
│   ├── auth/
│   └── tabs/
├── theme.types.ts   # Theme definitions
└── *.theme.ts       # Theme implementations
utils/
├── logger.ts        # Structured logging
├── figmaSync.js     # Design synchronization
└── figmaClient.ts   # Design system integration
```

### Domain-Driven File Naming
- **Screens**: `domain-screen.tsx` (e.g., `activity-dashboard.tsx`)
- **Components**: `DomainComponent.tsx` (e.g., `ActivityCard.tsx`)
- **Styles**: `domain-screen.styles.ts`
- **Utils**: `domainUtility.ts`
- **Types**: `domain.types.ts`

### Cross-Domain Communication
```typescript
// Shared state management patterns
interface ActivityState {
  currentActivity: Activity | null;
  activities: Activity[];
  activeTimer: Timer | null;
}

// Domain event patterns
type DomainEvent = 
  | { type: 'ACTIVITY_CREATED'; payload: Activity }
  | { type: 'TIMER_STARTED'; payload: { activityId: string } }
  | { type: 'PROGRESS_UPDATED'; payload: ProgressData };
```

### Feature Organization
```typescript
// Feature-based component organization
components/
├── activity/
│   ├── ActivityCard.tsx
│   ├── ActivityForm.tsx
│   └── ActivityList.tsx
├── timer/
│   ├── TimerDisplay.tsx
│   ├── TimerControls.tsx
│   └── TimerSettings.tsx
└── statistics/
    ├── ProgressChart.tsx
    ├── StatsOverview.tsx
    └── ExportButton.tsx
```

## Data Flow Architecture

### State Management Strategy
```typescript
// Current: Local state with useState
// Future: Global state with Zustand/Redux

// Component state pattern
const [view, setView] = useState<"day" | "month">("day");
const [isDashboard, setIsDashboard] = useState(true);

// Route parameter state
const { view } = useLocalSearchParams<{ view: "day" | "month" }>();
```

### Navigation State
```typescript
// Tab-based navigation state
interface NavigationState {
  activeTab: 'dashboard' | 'statistics' | 'timer';
  dashboardView: 'day' | 'month';
  isDashboard: boolean;
}
```

### Theme State
```typescript
// Global theme switching
interface ThemeState {
  currentTheme: 'light' | 'dark';
  systemTheme: boolean;
}
```

## Domain-Specific Patterns

### Activity Management
```typescript
// Activity entity structure
interface Activity {
  id: string;
  title: string;
  category: 'work' | 'personal' | 'health';
  priority: 'low' | 'medium' | 'high';
  duration?: number;
  completedAt?: Date;
  createdAt: Date;
}
```

### Timer Integration
```typescript
// Timer state management
interface TimerState {
  isRunning: boolean;
  startTime?: Date;
  elapsed: number;
  activityId?: string;
}
```

### Progress Tracking
```typescript
// Progress data structure
interface ProgressData {
  period: 'day' | 'week' | 'month';
  completedActivities: number;
  totalTime: number;
  categories: Record<string, number>;
}
```

## Integration Points

### Design System Integration
- Figma MCP server for design token synchronization
- Automated style generation from design specifications
- Real-time design-to-code workflow

### External Services
- Secure storage for user data
- Biometric authentication
- Background task management
- Export/import capabilities

## Best Practices
1. **Maintain domain boundaries** - keep concerns separated
2. **Use consistent naming** - follow domain vocabulary
3. **Document domain rules** - business logic and constraints
4. **Plan for scalability** - consider future feature additions
5. **Keep state local when possible** - minimize global state complexity
6. **Design for offline use** - local storage and sync strategies
7. **Follow accessibility guidelines** - inclusive design principles
8. **Implement proper error handling** - graceful degradation