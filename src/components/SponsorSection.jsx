import { useState, useContext } from 'react';
import { ThemeContext } from '../data/theme';

/** compact: 리스트 페이지 인라인 카드 / floating: 상세 페이지 플로팅 버튼 */
export default function SponsorSection({ compact, floating }) {
  const t = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  if (floating) {
    return (
      <>
        {/* Floating trigger button */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            position: "fixed", bottom: 20, right: 20, zIndex: 100,
            width: 48, height: 48, borderRadius: 50,
            background: "#fee500", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.3rem",
            boxShadow: "0 4px 16px rgba(0,0,0,.15)",
            transition: "transform .2s ease",
            transform: open ? "rotate(45deg)" : "none",
          }}
          aria-label="후원하기"
        >
          {open ? "+" : "☕"}
        </button>

        {/* Popup card */}
        {open && (
          <>
            {/* Backdrop */}
            <div
              onClick={() => setOpen(false)}
              style={{
                position: "fixed", inset: 0, zIndex: 99,
                background: "rgba(0,0,0,.3)",
                animation: "fadeIn .2s ease",
              }}
            />
            <div style={{
              position: "fixed", bottom: 80, right: 20, zIndex: 101,
              width: 240,
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: 16,
              padding: 16,
              boxShadow: "0 8px 32px rgba(0,0,0,.18)",
              animation: "slideUp .25s ease",
              textAlign: "center",
            }}>
              <div style={{
                width: 140, height: 140, margin: "0 auto 12px",
                borderRadius: 12, overflow: "hidden",
                background: "#fff", padding: 6,
              }}>
                <img
                  src={`${import.meta.env.BASE_URL}kakaopay-qr.jpg`}
                  alt="KakaoPay 후원 QR"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
              <div style={{ fontWeight: 700, fontSize: ".82rem", color: t.text, marginBottom: 4 }}>
                커피 한 잔 후원하기
              </div>
              <div style={{ fontSize: ".68rem", color: t.textMuted, lineHeight: 1.5 }}>
                KakaoPay QR을 스캔해주세요
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  /* compact: 리스트 페이지 인라인 */
  return (
    <div style={{
      background: t.surfaceAlt,
      border: `1px solid ${t.border}`,
      borderRadius: 16,
      padding: "20px 24px",
      display: "flex",
      alignItems: "center",
      gap: 16,
    }}>
      <div style={{
        width: 100, height: 100, flexShrink: 0,
        borderRadius: 12, overflow: "hidden",
        background: "#fff", padding: 6,
      }}>
        <img
          src={`${import.meta.env.BASE_URL}kakaopay-qr.jpg`}
          alt="KakaoPay 후원 QR"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: ".82rem", marginBottom: 4, color: t.text }}>
          도움이 되셨다면 커피 한 잔 후원해주세요
        </div>
        <div style={{ fontSize: ".72rem", color: t.textMuted, lineHeight: 1.6 }}>
          KakaoPay QR을 스캔하면 후원할 수 있습니다.
        </div>
      </div>
    </div>
  );
}
