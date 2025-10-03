#!/usr/bin/env node

/**
 * Figma MCP Server
 * Provides access to Figma design tokens and component specifications
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  CallToolRequestSchema, 
  ListToolsRequestSchema,
  Tool
} from '@modelcontextprotocol/sdk/types.js';

const FIGMA_API_BASE = 'https://api.figma.com/v1';

class FigmaServer {
  private server: Server;
  private figmaToken: string | undefined;

  constructor() {
    this.server = new Server(
      {
        name: 'figma-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.figmaToken = process.env.FIGMA_TOKEN;
    this.setupToolHandlers();
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'get_figma_file',
            description: 'Get Figma file information and components',
            inputSchema: {
              type: 'object',
              properties: {
                fileKey: {
                  type: 'string',
                  description: 'Figma file key from the URL',
                },
              },
              required: ['fileKey'],
            },
          },
          {
            name: 'get_figma_components',
            description: 'Get specific components from a Figma file',
            inputSchema: {
              type: 'object',
              properties: {
                fileKey: {
                  type: 'string',
                  description: 'Figma file key from the URL',
                },
                componentName: {
                  type: 'string',
                  description: 'Name of the component to search for',
                },
              },
              required: ['fileKey'],
            },
          },
          {
            name: 'get_design_tokens',
            description: 'Extract design tokens (colors, spacing, typography) from Figma file',
            inputSchema: {
              type: 'object',
              properties: {
                fileKey: {
                  type: 'string',
                  description: 'Figma file key from the URL',
                },
              },
              required: ['fileKey'],
            },
          },
          {
            name: 'get_tab_design',
            description: 'Get tab bar design specifications from Figma',
            inputSchema: {
              type: 'object',
              properties: {
                fileKey: {
                  type: 'string',
                  description: 'Figma file key from the URL',
                },
              },
              required: ['fileKey'],
            },
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      if (!this.figmaToken) {
        throw new Error('FIGMA_TOKEN environment variable is required');
      }

      try {
        switch (request.params.name) {
          case 'get_figma_file':
            return await this.getFigmaFile(request.params.arguments?.fileKey as string);
          
          case 'get_figma_components':
            return await this.getFigmaComponents(
              request.params.arguments?.fileKey as string,
              request.params.arguments?.componentName as string
            );
          
          case 'get_design_tokens':
            return await this.getDesignTokens(request.params.arguments?.fileKey as string);
          
          case 'get_tab_design':
            return await this.getTabDesign(request.params.arguments?.fileKey as string);
          
          default:
            throw new Error(`Unknown tool: ${request.params.name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
            },
          ],
        };
      }
    });
  }

  private async fetchFigmaAPI(endpoint: string) {
    const response = await fetch(`${FIGMA_API_BASE}${endpoint}`, {
      headers: {
        'X-Figma-Token': this.figmaToken!,
      },
    });

    if (!response.ok) {
      throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  private async getFigmaFile(fileKey: string) {
    const data = await this.fetchFigmaAPI(`/files/${fileKey}`);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            name: data.name,
            lastModified: data.lastModified,
            pages: data.document.children.map((page: any) => ({
              name: page.name,
              id: page.id,
              children: page.children?.length || 0,
            })),
          }, null, 2),
        },
      ],
    };
  }

  private async getFigmaComponents(fileKey: string, componentName?: string) {
    const data = await this.fetchFigmaAPI(`/files/${fileKey}`);
    const components = this.findComponentsByName(data.document, componentName || 'tab');
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(components, null, 2),
        },
      ],
    };
  }

  private async getDesignTokens(fileKey: string) {
    const data = await this.fetchFigmaAPI(`/files/${fileKey}`);
    const tokens = this.extractDesignTokens(data.document);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(tokens, null, 2),
        },
      ],
    };
  }

  private async getTabDesign(fileKey: string) {
    const data = await this.fetchFigmaAPI(`/files/${fileKey}`);
    const tabComponents = this.findComponentsByName(data.document, 'tab');
    const tabDesign = this.extractTabDesignSpecs(tabComponents);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(tabDesign, null, 2),
        },
      ],
    };
  }

  private findComponentsByName(node: any, searchName: string): any[] {
    const components: any[] = [];
    
    const traverse = (currentNode: any) => {
      if (currentNode.name && currentNode.name.toLowerCase().includes(searchName.toLowerCase())) {
        components.push({
          id: currentNode.id,
          name: currentNode.name,
          type: currentNode.type,
          bounds: currentNode.absoluteBoundingBox,
          styles: this.extractNodeStyles(currentNode),
        });
      }
      
      if (currentNode.children) {
        currentNode.children.forEach(traverse);
      }
    };
    
    traverse(node);
    return components;
  }

  private extractNodeStyles(node: any) {
    const styles: any = {};
    
    if (node.fills && node.fills.length > 0) {
      const fill = node.fills[0];
      if (fill.type === 'SOLID') {
        styles.backgroundColor = this.rgbToHex(fill.color);
      }
    }
    
    if (node.strokes && node.strokes.length > 0) {
      const stroke = node.strokes[0];
      if (stroke.type === 'SOLID') {
        styles.borderColor = this.rgbToHex(stroke.color);
        styles.borderWidth = node.strokeWeight || 1;
      }
    }
    
    if (node.cornerRadius !== undefined) {
      styles.borderRadius = node.cornerRadius;
    }
    
    if (node.effects && node.effects.length > 0) {
      const shadow = node.effects.find((effect: any) => effect.type === 'DROP_SHADOW');
      if (shadow) {
        styles.shadow = {
          color: this.rgbToHex(shadow.color),
          offset: { x: shadow.offset.x, y: shadow.offset.y },
          blur: shadow.radius,
        };
      }
    }
    
    return styles;
  }

  private extractDesignTokens(document: any) {
    const tokens = {
      colors: new Set<string>(),
      spacing: new Set<number>(),
      borderRadius: new Set<number>(),
      shadows: [],
    };
    
    const traverse = (node: any) => {
      if (node.fills) {
        node.fills.forEach((fill: any) => {
          if (fill.type === 'SOLID') {
            tokens.colors.add(this.rgbToHex(fill.color));
          }
        });
      }
      
      if (node.cornerRadius !== undefined) {
        tokens.borderRadius.add(node.cornerRadius);
      }
      
      if (node.children) {
        node.children.forEach(traverse);
      }
    };
    
    traverse(document);
    
    return {
      colors: Array.from(tokens.colors),
      spacing: Array.from(tokens.spacing),
      borderRadius: Array.from(tokens.borderRadius),
    };
  }

  private extractTabDesignSpecs(tabComponents: any[]) {
    if (tabComponents.length === 0) {
      return { error: 'No tab components found' };
    }
    
    const tabSpecs = tabComponents.map(component => ({
      name: component.name,
      styles: component.styles,
      dimensions: {
        width: component.bounds?.width,
        height: component.bounds?.height,
      },
    }));
    
    return {
      tabCount: tabComponents.length,
      tabs: tabSpecs,
      recommendations: this.generateReactNativeStyles(tabSpecs),
    };
  }

  private generateReactNativeStyles(tabSpecs: any[]) {
    const styles: any = {};
    
    if (tabSpecs.length > 0) {
      const firstTab = tabSpecs[0];
      
      styles.tabBar = {
        backgroundColor: firstTab.styles.backgroundColor || '#FFFFFF',
        height: firstTab.dimensions?.height || 64,
      };
      
      styles.tabBarItem = {
        width: firstTab.dimensions?.width || 64,
        height: firstTab.dimensions?.height || 64,
        borderRadius: firstTab.styles.borderRadius || 32,
        backgroundColor: firstTab.styles.backgroundColor || '#F5F5F5',
      };
      
      if (firstTab.styles.shadow) {
        styles.tabBarItem.shadowColor = firstTab.styles.shadow.color;
        styles.tabBarItem.shadowOffset = firstTab.styles.shadow.offset;
        styles.tabBarItem.shadowOpacity = 0.3;
        styles.tabBarItem.shadowRadius = firstTab.styles.shadow.blur;
        styles.tabBarItem.elevation = 5;
      }
    }
    
    return styles;
  }

  private rgbToHex(rgb: { r: number; g: number; b: number; a?: number }): string {
    const toHex = (value: number) => {
      const hex = Math.round(value * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    const hex = `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
    
    if (rgb.a !== undefined && rgb.a < 1) {
      return hex + toHex(rgb.a);
    }
    
    return hex;
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}

// Start the server
const server = new FigmaServer();
server.run().catch(console.error);