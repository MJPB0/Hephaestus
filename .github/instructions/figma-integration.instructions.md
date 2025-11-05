---
applyTo: "utils/figma*.{js,ts}"
---

# Figma Integration Instructions

## Figma MCP Server Architecture

### Purpose
The Figma MCP (Model Context Protocol) server provides automated design-to-code synchronization, enabling real-time updates of design tokens and component specifications from Figma to React Native styles.

### Core Files
- `figma-mcp-server.js` - MCP server for AI assistant integration
- `utils/figmaSync.js` - Design token synchronization utility
- `utils/figmaClient.ts` - TypeScript Figma API client
- `.env` - Figma API credentials configuration

## Environment Setup

### Required Environment Variables
```bash
# .env file
FIGMA_TOKEN=your_figma_personal_access_token
FIGMA_FILE_KEY=your_figma_file_key_from_url
FIGMA_FILE_URL=https://www.figma.com/design/FILE_KEY/...
```

### Getting Figma Credentials
1. **Personal Access Token**: 
   - Go to Figma → Settings → Account → Personal Access Tokens
   - Generate new token with file access permissions

2. **File Key**: 
   - Extract from Figma URL: `https://www.figma.com/design/FILE_KEY/...`
   - The FILE_KEY is the string between `/design/` and the next `/`

## Design Token Synchronization

### Manual Sync Command
```bash
npm run figma:sync
```

### Sync Process
1. **Connect to Figma API** using personal access token
2. **Traverse design file** looking for components matching search terms
3. **Extract design specifications** (colors, dimensions, spacing, shadows)
4. **Generate React Native styles** with proper formatting
5. **Output recommendations** for manual application to codebase

### Component Detection
The system searches for components with names containing:
- "tab", "navigation", "bottom", "bar", "nav"
- Case-insensitive matching
- Supports nested component structures

### Style Extraction
```javascript
// Extracted properties include:
{
  backgroundColor: "#252A34",     // Fill colors
  borderRadius: 32,              // Corner radius
  width: 64,                     // Bounding box width
  height: 64,                    // Bounding box height
  spacing: 20,                   // Calculated spacing
  shadow: {                      // Drop shadow effects
    color: "#000000",
    offset: { x: 0, y: 4 },
    blur: 8
  },
  activeColor: "#A04B49",        // State-based colors
  inactiveColor: "#F5F5F5"
}
```

## MCP Server Integration

### Server Capabilities
The MCP server provides these tools for AI assistants:

#### get_figma_file
```javascript
// Get basic file information
{
  name: "Design File Name",
  lastModified: "2025-10-03T10:30:00Z",
  pages: [...]
}
```

#### get_figma_components
```javascript
// Find specific components by name
{
  id: "component-id",
  name: "Tab Bar",
  type: "FRAME",
  bounds: { width: 64, height: 64 },
  styles: { backgroundColor: "#252A34" }
}
```

#### get_design_tokens
```javascript
// Extract all design tokens
{
  colors: ["#252A34", "#A04B49", "#F5F5F5"],
  spacing: [8, 16, 20, 32],
  borderRadius: [8, 16, 32]
}
```

#### get_tab_design
```javascript
// Specialized tab component analysis
{
  tabCount: 3,
  tabs: [...],
  recommendations: {
    tabBar: { height: 64, backgroundColor: "#252A34" },
    tabBarItem: { width: 64, height: 64, borderRadius: 32 }
  }
}
```

## Code Generation Patterns

### React Native Style Output
```javascript
// Generated style recommendations
const reactNativeStyles = {
  tabBar: {
    position: 'absolute',
    bottom: 35,
    backgroundColor: '#252A34',
    height: 64,
    paddingHorizontal: 20,
    borderTopWidth: 0,
    elevation: 0,
  },
  tabBarItem: {
    borderRadius: 32,
    width: 64,
    height: 64,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
};
```

### Theme Integration
```typescript
// Apply to theme files
export const lightTheme: Theme = {
  colors: {
    tabBar: {
      background: "#252A34",        // From Figma
      iconBackground: "#F5F5F5",    // From Figma
      highlight: "#A04B49",         // From Figma
    }
  }
};
```

## Design System Workflow

### Design-to-Code Process
1. **Designer updates Figma** with new specifications
2. **Run sync command** to fetch latest design tokens
3. **Review generated styles** in terminal output
4. **Apply changes manually** to appropriate style files
5. **Test visual changes** in development environment
6. **Commit updates** with design sync attribution

### Supported Design Properties
- **Colors**: Solid fills, gradients (converted to solid)
- **Dimensions**: Width, height, absolute positioning
- **Spacing**: Margins, padding (calculated from layout)
- **Border Radius**: Corner radius values
- **Shadows**: Drop shadows with color, offset, and blur
- **Typography**: Font sizes, weights (limited support)

### Style Application Strategy
```typescript
// Manual application to existing styles
export const stylesheet = (theme: Theme) =>
  StyleSheet.create<Styles>({
    tabBar: {
      // Apply Figma-generated values
      height: 77,                    // From Figma sync
      backgroundColor: "#252A34",    // From Figma sync
      paddingHorizontal: 20,         // From Figma sync
      // Keep existing responsive logic
      position: "absolute",
      bottom: 35,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    }
  }).styles;
```

## Error Handling

### Common Issues
1. **Invalid Figma Token**
   ```
   Error: Figma API error: 403 Forbidden
   ```
   - Verify token validity in Figma settings
   - Check token permissions for file access

2. **File Not Found**
   ```
   Error: Figma API error: 404 Not Found
   ```
   - Verify FILE_KEY extraction from URL
   - Ensure file is accessible with current token

3. **No Components Found**
   ```
   Warning: No tab components found in Figma file
   ```
   - Check component naming conventions
   - Verify search terms match component names

### Debugging
```javascript
// Enable detailed logging
console.log('🔑 Using file key:', figmaFileKey);
console.log('📋 Tab specifications found:', JSON.stringify(tabSpecs, null, 2));
console.log('⚛️ Generated React Native styles:', JSON.stringify(styles, null, 2));
```

## Integration with Development Workflow

### Automated Updates
```json
// package.json script
{
  "scripts": {
    "figma:sync": "node utils/figmaSync.js",
    "dev:sync": "npm run figma:sync && npm start"
  }
}
```

### Git Integration
```bash
# Typical workflow
git checkout -b design/update-tab-styling
npm run figma:sync
# Apply generated styles manually
git add .
git commit -m "feat(design): sync tab styling from Figma

- Update tab bar height to 77px
- Apply new background colors
- Sync border radius values

Figma sync: [file_key]"
```

### CI/CD Considerations
- **Don't automate style application** - requires human review
- **Include sync in design review process** - validate changes
- **Version control design tokens** - track design evolution
- **Document breaking changes** - major design system updates

## Best Practices

### Design System Maintenance
1. **Regular syncs** - Weekly or after major design updates
2. **Review before applying** - Validate generated styles
3. **Test across themes** - Ensure light/dark mode compatibility
4. **Maintain fallbacks** - Keep default values for missing tokens
5. **Document changes** - Record design system evolution

### Component Organization
1. **Consistent naming** - Use predictable component names in Figma
2. **Atomic design** - Break down complex components
3. **State representation** - Include active/inactive states
4. **Documentation** - Add descriptions to Figma components

### Code Integration
1. **Gradual adoption** - Apply changes incrementally
2. **Theme abstraction** - Use theme system, not hardcoded values
3. **Responsive design** - Combine Figma specs with responsive logic
4. **Performance testing** - Verify style changes don't impact performance

### Team Collaboration
1. **Designer-developer handoff** - Clear communication on updates
2. **Design system governance** - Establish approval processes
3. **Tool training** - Ensure team understands sync workflow
4. **Feedback loops** - Iterate on design-to-code process