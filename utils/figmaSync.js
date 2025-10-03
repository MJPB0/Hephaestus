const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

class FigmaClient {
  constructor(token) {
    this.apiToken = token;
    this.baseUrl = 'https://api.figma.com/v1';
  }

  async getFile(fileKey) {
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

  async getTabDesignSpecs(fileKey) {
    const fileData = await this.getFile(fileKey);
    const tabComponents = this.findTabComponents(fileData.document);
    
    if (tabComponents.length === 0) {
      console.warn('No tab components found in Figma file');
      return this.getDefaultTabSpecs();
    }

    console.log(`Found ${tabComponents.length} tab-related components`);
    return this.extractTabSpecs(tabComponents[0]);
  }

  findTabComponents(document) {
    const components = [];
    const searchTerms = ['tab', 'navigation', 'bottom', 'bar', 'nav'];

    const traverse = (node) => {
      if (node.name && searchTerms.some(term => 
        node.name.toLowerCase().includes(term)
      )) {
        components.push({
          name: node.name,
          type: node.type,
          ...node
        });
      }

      if (node.children) {
        node.children.forEach(traverse);
      }
    };

    traverse(document);
    return components;
  }

  extractTabSpecs(component) {
    const specs = {};

    // Extract background color
    if (component.fills && component.fills.length > 0) {
      const fill = component.fills[0];
      if (fill.type === 'SOLID') {
        specs.backgroundColor = this.rgbaToHex(fill.color);
      }
    }

    // Extract dimensions
    if (component.absoluteBoundingBox) {
      specs.width = Math.round(component.absoluteBoundingBox.width);
      specs.height = Math.round(component.absoluteBoundingBox.height);
    }

    // Extract border radius
    if (component.cornerRadius !== undefined) {
      specs.borderRadius = component.cornerRadius;
    }

    // Extract shadow
    if (component.effects && component.effects.length > 0) {
      const shadow = component.effects.find(effect => effect.type === 'DROP_SHADOW');
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

  extractTabStates(children) {
    const states = {};

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

  rgbaToHex(rgba) {
    const toHex = (value) => {
      const hex = Math.round(value * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    const hex = `#${toHex(rgba.r)}${toHex(rgba.g)}${toHex(rgba.b)}`;
    
    if (rgba.a !== undefined && rgba.a < 1) {
      return hex + toHex(rgba.a);
    }

    return hex;
  }

  getDefaultTabSpecs() {
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

  generateReactNativeStyles(specs) {
    return {
      tabBar: {
        backgroundColor: specs.backgroundColor || '#252A34',
        height: specs.height || 64,
        paddingHorizontal: specs.spacing || 20,
      },
      tabBarItem: {
        borderRadius: specs.borderRadius || 32,
        width: specs.width || 64,
        height: specs.height || 64,
        marginHorizontal: (specs.spacing || 20) / 2,
        shadow: specs.shadow,
      },
      activeBackground: specs.activeColor || '#A04B49',
      inactiveBackground: specs.inactiveColor || '#F5F5F5',
    };
  }
}

async function syncFromFigma() {
  try {
    console.log('🎨 Starting Figma sync...');
    
    const figmaToken = process.env.FIGMA_TOKEN;
    const figmaFileKey = process.env.FIGMA_FILE_KEY;
    
    if (!figmaToken || !figmaFileKey) {
      console.error('❌ Missing Figma credentials in .env file');
      console.log('📝 Required variables:');
      console.log('   FIGMA_TOKEN=your_token_here');
      console.log('   FIGMA_FILE_KEY=your_file_key_here');
      return;
    }
    
    console.log(`🔑 Using file key: ${figmaFileKey}`);
    
    const client = new FigmaClient(figmaToken);
    const tabSpecs = await client.getTabDesignSpecs(figmaFileKey);
    
    console.log('📋 Tab specifications found:');
    console.log(JSON.stringify(tabSpecs, null, 2));

    const reactNativeStyles = client.generateReactNativeStyles(tabSpecs);
    console.log('\n⚛️ Generated React Native styles:');
    console.log(JSON.stringify(reactNativeStyles, null, 2));

    console.log('\n✅ Figma sync completed successfully!');
    console.log('💡 You can now update your tab styles with these values.');
    
  } catch (error) {
    console.error('❌ Error syncing from Figma:', error.message);
  }
}

if (require.main === module) {
  syncFromFigma();
}