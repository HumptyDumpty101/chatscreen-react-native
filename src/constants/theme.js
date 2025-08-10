export const LIGHT_COLORS = {
  primary: '#2196F3',
  primaryDark: '#1976D2',
  secondary: '#FFC107',
  background: '#f5f5f5',
  surface: '#ffffff',
  text: '#212121',
  textSecondary: '#757575',
  textLight: '#ffffff',
  border: '#e0e0e0',
  error: '#f44336',
  success: '#4caf50',
  warning: '#ff9800',
  
  // Message specific colors
  messageUser: '#DCF8C6',
  messageOther: '#ffffff',
  messageBorder: '#e0e0e0',
  
  // Status colors
  online: '#4caf50',
  offline: '#757575',
  typing: '#ff9800',
};

export const DARK_COLORS = {
  primary: '#64B5F6',
  primaryDark: '#42A5F5',
  secondary: '#FFD54F',
  background: '#121212',
  surface: '#1E1E1E',
  text: '#ffffff',
  textSecondary: '#B0B0B0',
  textLight: '#000000',
  border: '#333333',
  error: '#EF5350',
  success: '#66BB6A',
  warning: '#FFA726',
  
  // Message specific colors
  messageUser: '#2E7D32',
  messageOther: '#2C2C2C',
  messageBorder: '#404040',
  
  // Status colors
  online: '#66BB6A',
  offline: '#B0B0B0',
  typing: '#FFA726',
};

// Legacy export for backward compatibility
export const COLORS = LIGHT_COLORS;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
};

export const FONT_WEIGHTS = {
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 50,
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
};