import { getLineRiskLevel } from '../data/highlight';
import { useTheme } from '../data/theme';

export default function Prompt({ text, fade = true, big = false }) {
  const t = useTheme();
  const fs = big ? ".88rem" : ".82rem";
  const lh = big ? 2.1 : 1.9;
  const mh = fade ? (big ? 260 : 240) : 520;

  return (
    <div style={{ background: t.promptBg, borderRadius: big ? 16 : 12, overflow: "hidden", border: `1px solid ${t.promptBorder}` }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: big ? "9px 16px" : "7px 14px",
        background: t.promptHeader, borderBottom: `1px solid ${t.promptHeaderBorder}`,
      }}>
        <span style={{ width: big ? 10 : 8, height: big ? 10 : 8, borderRadius: "50%", background: "#ff5f57" }} />
        <span style={{ width: big ? 10 : 8, height: big ? 10 : 8, borderRadius: "50%", background: "#febc2e" }} />
        <span style={{ width: big ? 10 : 8, height: big ? 10 : 8, borderRadius: "50%", background: "#28c840" }} />
      </div>
      <div style={{
        padding: big ? "18px 22px" : "14px 16px",
        maxHeight: mh,
        overflow: fade ? "hidden" : "auto",
        position: "relative",
      }}>
        {text.split("\n").map((line, i) => {
          const level = getLineRiskLevel(line);
          const isDanger = level === 2;
          const isWarn = level === 1;

          return (
            <div key={i} style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: fs,
              lineHeight: lh,
              padding: big ? "3px 14px" : "2px 10px",
              margin: big ? "0 -14px" : "0 -10px",
              borderRadius: 3,
              borderLeft: isDanger ? "3px solid #ff2d55" : isWarn ? "3px solid rgba(255,149,0,0.55)" : "3px solid transparent",
              background: isDanger ? "rgba(255,45,85,0.13)" : isWarn ? "rgba(255,149,0,0.06)" : "transparent",
              color: isDanger ? "#ff2d55" : isWarn ? "#c49460" : t.promptNormalText,
              fontWeight: isDanger ? 700 : isWarn ? 500 : 400,
              textShadow: isDanger ? "0 0 24px rgba(255,45,85,0.3)" : "none",
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
            }}>
              {line || "\u00A0"}
            </div>
          );
        })}
        {fade && (
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: 64, background: `linear-gradient(transparent,${t.fadeTo})`,
            pointerEvents: "none",
          }} />
        )}
      </div>
    </div>
  );
}
