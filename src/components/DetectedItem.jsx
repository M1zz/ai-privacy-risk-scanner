import { RISK_COLORS } from '../data/riskColors';

export default function DetectedItem({ item, index }) {
  const color = RISK_COLORS[item.level] || RISK_COLORS.medium;

  return (
    <div style={{
      background: color.bg,
      border: `1px solid ${color.border}22`,
      borderRadius: 14,
      padding: "16px 18px",
      display: "flex",
      alignItems: "flex-start",
      gap: 14,
      animation: `slideUp .5s ease ${index * .06}s both`,
    }}>
      <span style={{ fontSize: "1.35rem", flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, flexWrap: "wrap" }}>
          <span style={{ fontWeight: 700, fontSize: ".88rem" }}>{item.type}</span>
          <span style={{
            fontSize: ".58rem", fontWeight: 700, padding: "2px 8px",
            borderRadius: 50, background: color.glow, color: color.text,
          }}>
            {color.label}
          </span>
        </div>
        <p style={{ fontSize: ".82rem", color: "#7a82a8", lineHeight: 1.8, margin: 0 }}>
          {item.description}
        </p>
      </div>
    </div>
  );
}
