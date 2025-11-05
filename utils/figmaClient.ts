/**
 * Simple Figma MCP Client
 * Provides basic access to Figma design data
 */

interface FigmaFileData {
  document: {
    children: any[];
  };
  name: string;
  lastModified: string;
}

interface TabDesignSpec {
  backgroundColor?: string;
  activeColor?: string;
  inactiveColor?: string;
  borderRadius?: number;
  width?: number;
  height?: number;
  spacing?: number;
  shadow?: {
    color: string;
    offset: { x: number; y: number };
    blur: number;
  };
}

class FigmaClient {
  private apiToken: string;
  private baseUrl = 'https://api.figma.com/v1';

  constructor(token: string) {
    this.apiToken = token;
  }

  async getFile(fileKey: string): Promise<FigmaFileData> {
    const response = await fetch(`${this.baseUrl}/files/${fileKey}`, {
      headers: {
        'X-Figma-Token': this.apiToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getTabDesignSpecs(fileKey: string): Promise<TabDesignSpec> {
    const fileData = await this.getFile(fileKey);
    const tabComponents = this.findTabComponents(fileData.document);
    
    if (tabComponents.length === 0) {
      console.warn('No tab components found in Figma file');
      return this.getDefaultTabSpecs();
    }

    return this.extractTabSpecs(tabComponents[0]);
  }

  private findTabComponents(document: any): any[] {
    const components: any[] = [];
    const searchTerms = ['tab', 'navigation', 'bottom', 'bar'];

    const traverse = (node: any) => {
      if (node.name && searchTerms.some(term => 
        node.name.toLowerCase().includes(term)
      )) {
        components.push(node);
      }

      if (node.children) {
        node.children.forEach(traverse);
      }
    };

    traverse(document);
    return components;
  }

  private extractTabSpecs(component: any): TabDesignSpec {
    const specs: TabDesignSpec = {};

    // Extract background color
    if (component.fills && component.fills.length > 0) {
      const fill = component.fills[0];
      if (fill.type === 'SOLID') {
        specs.backgroundColor = this.rgbaToHex(fill.color);
      }
    }

    // Extract dimensions
    if (component.absoluteBoundingBox) {
      specs.width = component.absoluteBoundingBox.width;
      specs.height = component.absoluteBoundingBox.height;
    }

    // Extract border radius
    if (component.cornerRadius !== undefined) {
      specs.borderRadius = component.cornerRadius;
    }

    // Extract shadow
    if (component.effects && component.effects.length > 0) {
      const shadow = component.effects.find((effect: any) => effect.type === 'DROP_SHADOW');
      if (shadow) {
        specs.shadow = {
          color: this.rgbaToHex(shadow.color),
          offset: { x: shadow.offset.x, y: shadow.offset.y },
          blur: shadow.radius,
        };
      }
    }

    // Look for active/inactive states in children
    if (component.children) {
      const states = this.extractTabStates(component.children);
      if (states.active) specs.activeColor = states.active;
      if (states.inactive) specs.inactiveColor = states.inactive;
    }

    return specs;
  }

  private extractTabStates(children: any[]): { active?: string; inactive?: string } {
    const states: { active?: string; inactive?: string } = {};

    children.forEach(child => {
      if (child.name && child.fills && child.fills.length > 0) {
        const fill = child.fills[0];
        if (fill.type === 'SOLID') {
          const color = this.rgbaToHex(fill.color);
          
          if (child.name.toLowerCase().includes('active')) {
            states.active = color;
          } else if (child.name.toLowerCase().includes('inactive')) {
            states.inactive = color;
          }
        }
      }
    });

    return states;
  }

  private rgbaToHex(rgba: { r: number; g: number; b: number; a?: number }): string {
    const toHex = (value: number) => {
      const hex = Math.round(value * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    const hex = `#${toHex(rgba.r)}${toHex(rgba.g)}${toHex(rgba.b)}`;
    
    if (rgba.a !== undefined && rgba.a < 1) {
      return hex + toHex(rgba.a);
    }

    return hex;
  }

  private getDefaultTabSpecs(): TabDesignSpec {
    return {
      backgroundColor: '#252A34',
      activeColor: '#A04B49',
      inactiveColor: '#F5F5F5',
      borderRadius: 32,
      width: 64,
      height: 64,
      spacing: 20,
    };
  }

  generateReactNativeStyles(specs: TabDesignSpec) {
    return {
      tabBar: {
        position: 'absolute',
        bottom: 35,
        left: 0,
        right: 0,
        backgroundColor: specs.backgroundColor || '#252A34',
        height: specs.height || 64,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: specs.spacing || 20,
        borderTopWidth: 0,
        elevation: 0,
      },
      tabBarItem: {
        borderRadius: specs.borderRadius || 32,
        width: specs.width || 64,
        height: specs.height || 64,
        marginHorizontal: (specs.spacing || 20) / 2,
        alignItems: 'center',
        justifyContent: 'center',
        ...(specs.shadow && {
          shadowColor: specs.shadow.color,
          shadowOffset: specs.shadow.offset,
          shadowOpacity: 0.3,
          shadowRadius: specs.shadow.blur / 2,
          elevation: 5,
        }),
      },
      activeBackground: specs.activeColor || '#A04B49',
      inactiveBackground: specs.inactiveColor || '#F5F5F5',
    };
  }
}

export default FigmaClient;