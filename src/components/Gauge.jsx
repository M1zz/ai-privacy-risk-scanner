import { useState, useEffect } from 'react';
import { RISK_COLORS, getRiskLevel, getRiskLabel } from '../data/riskColors';

export default function Gauge({ score }) {
  const r = 80, sw = 10, circ = Math.PI * r;
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(score), 100);
    return () => clearTimeout(t);
  }, [score]);

  const level = getRiskLevel(score);
  const color = RISK_COLORS[level];
  const label = getRiskLabel(score);

  return (
    <svg width={r * 2 + sw} height={r + sw + 24} viewBox={`0 0 ${r * 2 + sw} ${r + sw + 24}`}>
      <path
        d={`M ${sw / 2} ${r + sw / 2} A ${r} ${r} 0 0 1 ${r * 2 + sw / 2} ${r + sw / 2}`}
        fill="none" stroke="#0a0d1a" strokeWidth={sw} strokeLinecap="round"
      />
      <path
        d={`M ${sw / 2} ${r + sw / 2} A ${r} ${r} 0 0 1 ${r * 2 + sw / 2} ${r + sw / 2}`}
        fill="none" stroke={color.border} strokeWidth={sw} strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ - (animated / 100) * circ}
        style={{
          transition: "stroke-dashoffset 1.5s cubic-bezier(.16,1,.3,1)",
          filter: `drop-shadow(0 0 14px ${color.glow})`,
        }}
      />
      <text x={r + sw / 2} y={r - 6} textAnchor="middle" fill={color.text}
        style={{ fontSize: "2.6rem", fontWeight: 800, fontFamily: "'JetBrains Mono', monospace" }}>
        {score}
      </text>
      <text x={r + sw / 2} y={r + 20} textAnchor="middle" fill={color.text}
        style={{ fontSize: ".78rem", fontWeight: 600 }}>
        {label}
      </text>
    </svg>
  );
}
