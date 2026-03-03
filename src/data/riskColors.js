export const RISK_COLORS = {
  critical: { bg: "#1a0a0e", border: "#ff2d55", text: "#ff2d55", glow: "rgba(255,45,85,0.15)", label: "치명적" },
  high:     { bg: "#1a110a", border: "#ff9500", text: "#ff9500", glow: "rgba(255,149,0,0.15)", label: "위험" },
  medium:   { bg: "#1a170a", border: "#ffd60a", text: "#ffd60a", glow: "rgba(255,214,10,0.15)", label: "주의" },
  low:      { bg: "#0a1a10", border: "#30d158", text: "#30d158", glow: "rgba(48,209,88,0.15)", label: "낮음" },
};

export function getRiskLevel(score) {
  if (score >= 80) return "critical";
  if (score >= 60) return "high";
  if (score >= 40) return "medium";
  return "low";
}

export function getRiskLabel(score) {
  if (score >= 90) return "극도 위험";
  if (score >= 80) return "매우 위험";
  if (score >= 60) return "위험";
  return "주의";
}
