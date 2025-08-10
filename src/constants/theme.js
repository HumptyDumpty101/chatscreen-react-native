export const LIGHT_COLORS = {
  primary: '#87b9a1ff',
  primaryDark: '#00A855',
  primaryLight: '#E8F8F2',
  secondary: '#667085',
  accent: '#6366F1',
  background: '#FAFAFA',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  text: '#1D2939',
  textSecondary: '#667085',
  textLight: '#FFFFFF',
  textMuted: '#98A2B3',
  border: '#E4E7EC',
  borderLight: '#F2F4F7',
  error: '#F04438',
  success: '#00BF63',
  warning: '#F79009',
  info: '#1570EF',
  
  // Message specific colors
  messageUser: '#00BF63',
  messageUserText: '#FFFFFF',
  messageOther: '#F2F4F7',
  messageOtherText: '#1D2939',
  messageBorder: '#E4E7EC',
  
  // Button colors
  buttonPrimary: '#00BF63',
  buttonPrimaryText: '#FFFFFF',
  buttonSecondary: '#F2F4F7',
  buttonSecondaryText: '#344054',
  buttonDisabled: '#E4E7EC',
  buttonDisabledText: '#98A2B3',
  
  // Status colors
  online: '#00BF63',
  offline: '#98A2B3',
  typing: '#F79009',
  
  // Input colors
  inputBackground: '#FFFFFF',
  inputBorder: '#D0D5DD',
  inputBorderFocus: '#00BF63',
  inputText: '#1D2939',
  inputPlaceholder: '#667085',
};

export const DARK_COLORS = {
  primary: '#87b9a1ff',
  primaryDark: '#00A855',
  primaryLight: '#0F3426',
  secondary: '#98A2B3',
  accent: '#7C3AED',
  background: '#0C111D',
  surface: '#1D2939',
  surfaceElevated: '#344054',
  text: '#FCFCFD',
  textSecondary: '#EAECF0',
  textLight: '#FFFFFF',
  textMuted: '#98A2B3',
  border: '#344054',
  borderLight: '#475467',
  error: '#F97066',
  success: '#32D583',
  warning: '#FDB022',
  info: '#2E90FA',
  
  // Message specific colors
  messageUser: '#00BF63',
  messageUserText: '#FFFFFF',
  messageOther: '#344054',
  messageOtherText: '#EAECF0',
  messageBorder: '#475467',
  
  // Button colors
  buttonPrimary: '#00BF63',
  buttonPrimaryText: '#FFFFFF',
  buttonSecondary: '#344054',
  buttonSecondaryText: '#EAECF0',
  buttonDisabled: '#475467',
  buttonDisabledText: '#98A2B3',
  
  // Status colors
  online: '#32D583',
  offline: '#667085',
  typing: '#FDB022',
  
  // Input colors
  inputBackground: '#1D2939',
  inputBorder: '#344054',
  inputBorderFocus: '#00BF63',
  inputText: '#FCFCFD',
  inputPlaceholder: '#98A2B3',
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