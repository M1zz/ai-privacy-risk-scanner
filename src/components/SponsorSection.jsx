import { useContext } from 'react';
import { ThemeContext } from '../data/theme';

export default function SponsorSection({ compact }) {
  const t = useContext(ThemeContext);

  const qrSize = compact ? 100 : 140;

  return (
    <div style={{
      background: t.surfaceAlt,
      border: `1px solid ${t.border}`,
      borderRadius: 16,
      padding: compact ? "20px 24px" : "28px 24px",
      display: "flex",
      alignItems: compact ? "center" : "flex-start",
      gap: compact ? 16 : 20,
      flexDirection: compact ? "row" : "column",
      ...(compact ? {} : { alignItems: "center", textAlign: "center" }),
    }}>
      {/* QR - always on white bg for scanning */}
      <div style={{
        width: qrSize,
        height: qrSize,
        flexShrink: 0,
        borderRadius: 12,
        overflow: "hidden",
        background: "#fff",
        padding: 6,
      }}>
        <img
          src={`${import.meta.env.BASE_URL}kakaopay-qr.jpg`}
          alt="KakaoPay 후원 QR"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>

      <div>
        <div style={{
          fontWeight: 700,
          fontSize: compact ? ".82rem" : ".9rem",
          marginBottom: 4,
          color: t.text,
        }}>
          도움이 되셨다면 커피 한 잔 후원해주세요
        </div>
        <div style={{
          fontSize: ".72rem",
          color: t.textMuted,
          lineHeight: 1.6,
        }}>
          KakaoPay QR을 스캔하면 후원할 수 있습니다.
        </div>
      </div>
    </div>
  );
}
