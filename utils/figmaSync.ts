/**
 * Figma Design Sync Utility
 * Fetches tab design specifications from Figma and updates the app styles
 */

import FigmaClient from './figmaClient.js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface FigmaConfig {
  token: string;
  fileKey: string;
}

class FigmaSync {
  private client: FigmaClient;
  private config: FigmaConfig;

  constructor(config: FigmaConfig) {
    this.config = config;
    this.client = new FigmaClient(config.token);
  }

  async syncTabDesign(): Promise<void> {
    try {
      console.log('🎨 Fetching tab design from Figma...');
      
      const tabSpecs = await this.client.getTabDesignSpecs(this.config.fileKey);
      console.log('📋 Tab specifications:', JSON.stringify(tabSpecs, null, 2));

      const reactNativeStyles = this.client.generateReactNativeStyles(tabSpecs);
      console.log('⚛️ Generated React Native styles:', JSON.stringify(reactNativeStyles, null, 2));

      await this.updateTabStyles(reactNativeStyles);
      await this.updateThemeColors(tabSpecs);

      console.log('✅ Tab design synchronized successfully!');
    } catch (error) {
      console.error('❌ Error syncing tab design:', error);
      throw error;
    }
  }

  private async updateTabStyles(styles: any): Promise<void> {
    const stylesPath = path.join(process.cwd(), 'styles', 'screens', 'tabs', 'layout.styles.ts');
    
    const newStylesContent = `import { ViewStyle } from "react-native";
import StyleSheet from "react-native-media-query";
import { Style } from "../../style";
import { Theme } from "../../theme.types";

export interface Styles extends Style {
  tabBar: ViewStyle;
  tabBarItem: ViewStyle;
}

export const stylesheet = (theme: Theme) =>
  StyleSheet.create<Styles>({
    tabBar: {
      position: "absolute",
      bottom: 35,
      left: 0,
      right: 0,
      backgroundColor: "${styles.tabBar.backgroundColor}",
      height: ${styles.tabBar.height},
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: ${styles.tabBar.paddingHorizontal},
      borderTopWidth: 0,
      elevation: 0,
    },
    tabBarItem: {
      borderRadius: ${styles.tabBarItem.borderRadius},
      width: ${styles.tabBarItem.width},
      height: ${styles.tabBarItem.height},
      marginHorizontal: ${styles.tabBarItem.marginHorizontal},
      alignItems: "center",
      justifyContent: "center",${styles.tabBarItem.shadowColor ? `
      shadowColor: "${styles.tabBarItem.shadowColor}",
      shadowOffset: { width: ${styles.tabBarItem.shadowOffset.x}, height: ${styles.tabBarItem.shadowOffset.y} },
      shadowOpacity: ${styles.tabBarItem.shadowOpacity},
      shadowRadius: ${styles.tabBarItem.shadowRadius},
      elevation: ${styles.tabBarItem.elevation},` : ''}
    },
  }).styles;
`;

    fs.writeFileSync(stylesPath, newStylesContent);
    console.log('📝 Updated tab layout styles');
  }

  private async updateThemeColors(specs: any): Promise<void> {
    const lightThemePath = path.join(process.cwd(), 'styles', 'light.theme.ts');
    const darkThemePath = path.join(process.cwd(), 'styles', 'dark.theme.ts');
    
    // Update both theme files with new tab colors
    const updateTheme = (themePath: string) => {
      let content = fs.readFileSync(themePath, 'utf8');
      
      // Update tabBar colors
      if (specs.backgroundColor) {
        content = content.replace(
          /background: ".*?"/,
          `background: "${specs.backgroundColor}"`
        );
      }
      
      if (specs.activeColor) {
        content = content.replace(
          /highlight: ".*?"/,
          `highlight: "${specs.activeColor}"`
        );
      }
      
      if (specs.inactiveColor) {
        content = content.replace(
          /iconBackground: ".*?"/,
          `iconBackground: "${specs.inactiveColor}"`
        );
      }
      
      fs.writeFileSync(themePath, content);
    };
    
    updateTheme(lightThemePath);
    updateTheme(darkThemePath);
    console.log('🎨 Updated theme colors');
  }
}

// Usage example
async function syncFromFigma() {
  try {
    // Load config from environment or config file
    const figmaToken = process.env.FIGMA_TOKEN;
    const figmaFileKey = process.env.FIGMA_FILE_KEY;
    
    if (!figmaToken || !figmaFileKey) {
      console.error('❌ Please set FIGMA_TOKEN and FIGMA_FILE_KEY environment variables');
      console.log('📝 You can set them in .env.figma file:');
      console.log('   FIGMA_TOKEN=your_token_here');
      console.log('   FIGMA_FILE_KEY=your_file_key_here');
      return;
    }
    
    const sync = new FigmaSync({
      token: figmaToken,
      fileKey: figmaFileKey,
    });
    
    await sync.syncTabDesign();
  } catch (error) {
    console.error('Failed to sync from Figma:', error);
  }
}

// Export for use in other files
export { FigmaSync, syncFromFigma };

// Run if called directly
if (require.main === module) {
  syncFromFigma();
}