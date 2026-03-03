import { createContext, useContext } from 'react';

export const THEMES = {
  light: {
    bg: "#f7f8fb",
    surface: "#ffffff",
    surfaceAlt: "#f3f4f8",
    border: "#e2e5ed",
    borderHover: "#c8ccd8",
    text: "#1a1d2e",
    textSecondary: "#5a6070",
    textMuted: "#8b92a8",
    promptBg: "#fafbfe",
    promptHeader: "#f0f1f5",
    promptHeaderBorder: "#e8eaef",
    promptBorder: "#e2e5ed",
    promptNormalText: "#6a7088",
    fadeTo: "#fafbfe",
    gaugeTrack: "#e8eaef",
    scanBg: "#f3f4f8",
    scanBorder: "#e2e5ed",
    scanText: "#8b92a8",
    riskBg: {
      critical: "#fef2f4",
      high: "#fff8f0",
      medium: "#fefce8",
      low: "#f0fdf4",
    },
    riskBorderAlpha: "22",
    toggleBg: "#e8eaef",
    toggleIcon: "☀️",
  },
  dark: {
    bg: "#04050a",
    surface: "#080a14",
    surfaceAlt: "#060810",
    border: "#0c1020",
    borderHover: "#1a2040",
    text: "#e8eaf0",
    textSecondary: "#7a82a8",
    textMuted: "#3a4868",
    promptBg: "#02030a",
    promptHeader: "#050810",
    promptHeaderBorder: "#080c18",
    promptBorder: "#0c0f1e",
    promptNormalText: "#3a4878",
    fadeTo: "#02030a",
    gaugeTrack: "#0a0d1a",
    scanBg: "#060810",
    scanBorder: "#0a0d1a",
    scanText: "#2a3558",
    riskBg: {
      critical: "#1a0a0e",
      high: "#1a110a",
      medium: "#1a170a",
      low: "#0a1a10",
    },
    riskBorderAlpha: "22",
    toggleBg: "#0c1020",
    toggleIcon: "🌙",
  },
};

export const ThemeContext = createContext(THEMES.light);

export function useTheme() {
  return useContext(ThemeContext);
}
