import { useState, useEffect } from 'react';
import CASES from './data/cases';
import { RISK_COLORS, getRiskLevel, getRiskLabel } from './data/riskColors';
import { THEMES, ThemeContext } from './data/theme';
import { getScoreBreakdown, FRAMEWORK_REFS } from './data/scoring';
import Prompt from './components/Prompt';
import Gauge from './components/Gauge';
import Typing from './components/Typing';
import DetectedItem from './components/DetectedItem';
import SponsorSection from './components/SponsorSection';
import GiscusComments from './components/GiscusComments';

function ThemeToggle({ dark, onToggle }) {
  const t = dark ? THEMES.dark : THEMES.light;
  return (
    <button
      onClick={onToggle}
      style={{
        position: "fixed", top: 18, right: 18, zIndex: 100,
        width: 40, height: 40, borderRadius: 12,
        background: t.surface, border: `1px solid ${t.border}`,
        cursor: "pointer", fontSize: "1.1rem",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all .2s ease",
        boxShadow: dark ? "none" : "0 1px 4px rgba(0,0,0,.06)",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.borderHover; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = t.border; }}
      aria-label={dark ? "라이트 모드로 전환" : "다크 모드로 전환"}
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}

function ListPageInner({ onPick, theme: t }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: t.bg,
      color: t.text,
      fontFamily: "'Noto Sans KR', -apple-system, sans-serif",
    }}>
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "56px 20px 100px" }}>

        {/* Title */}
        <div style={{ marginBottom: 44 }}>
          <h1 style={{
            fontSize: "clamp(1.3rem, 5vw, 1.8rem)",
            fontWeight: 900,
            lineHeight: 1.45,
            letterSpacing: "-.02em",
          }}>
            이런 프롬프트,<br />
            <span style={{
              background: "linear-gradient(135deg, #ff2d55, #ff6b35)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              혹시 보낸 적 있나요?
            </span>
          </h1>
        </div>

        {/* Prompt Card List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {CASES.map((c, i) => {
            const promptLine = c.prompt.split("\n")[0];
            return (
              <div
                key={i}
                onClick={() => onPick(i)}
                style={{
                  padding: "16px 20px",
                  border: `1px solid ${t.border}`,
                  borderRadius: 12,
                  cursor: "pointer",
                  transition: "all .2s ease",
                  animation: `slideUp .4s ease ${i * 0.04}s both`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = t.borderHover;
                  e.currentTarget.style.background = t.surface;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = t.border;
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <span style={{
                  fontSize: "clamp(.84rem, 2.5vw, .95rem)",
                  fontWeight: 500,
                  color: t.textSecondary,
                  lineHeight: 1.7,
                }}>
                  {promptLine}
                </span>
              </div>
            );
          })}
        </div>

        {/* Sponsor */}
        <div style={{ marginTop: 32 }}>
          <SponsorSection compact />
        </div>

      </div>
    </div>
  );
}

function DetailPageInner({ caseIndex, onBack, theme: t, dark }) {
  const [showResult, setShowResult] = useState(false);
  const [scanning, setScanning] = useState(true);

  const currentCase = CASES[caseIndex];
  const result = currentCase.result;
  const riskLevel = getRiskLevel(result.overall_score);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScanning(false);
      setShowResult(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: t.bg,
      color: t.text,
      fontFamily: "'Noto Sans KR', -apple-system, sans-serif",
    }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "24px 16px 100px" }}>

        {/* Back Button */}
        <button
          onClick={onBack}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "none", border: "none", cursor: "pointer",
            color: t.textMuted, fontSize: ".85rem", fontWeight: 600,
            padding: "8px 0", marginBottom: 24,
            transition: "color .2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = t.text; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = t.textMuted; }}
        >
          ‹ 목록으로
        </button>

        {/* Case Header */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          marginBottom: 24, padding: "16px 20px",
          background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14,
        }}>
          <span style={{ fontSize: "1.3rem" }}>{currentCase.emoji}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: ".92rem", lineHeight: 1.35 }}>
              {currentCase.label}
            </div>
            <div style={{ fontSize: ".68rem", color: t.textMuted, marginTop: 2 }}>
              {currentCase.category}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 3, flexShrink: 0 }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "1.5rem", fontWeight: 800,
              color: RISK_COLORS[riskLevel].text,
              textShadow: `0 0 20px ${RISK_COLORS[riskLevel].glow}`,
            }}>
              {result.overall_score}
            </span>
            <span style={{ fontSize: ".6rem", color: RISK_COLORS[riskLevel].text, fontWeight: 600 }}>점</span>
          </div>
        </div>

        {/* Full Prompt */}
        {!scanning && (
          <div style={{ marginBottom: 24, animation: "fadeIn .4s ease" }}>
            <div style={{
              fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em",
              color: "#ff6b35", textTransform: "uppercase", marginBottom: 10,
            }}>
              ● 전체 프롬프트 원문
              <span style={{
                marginLeft: 12, color: t.textMuted,
                fontWeight: 400, letterSpacing: 0, textTransform: "none",
              }}>
                빨간줄 = 치명적 · 주황줄 = 위험
              </span>
            </div>
            <Prompt text={currentCase.prompt} fade={false} big={true} />
          </div>
        )}

        {/* Scanning Animation */}
        {scanning && (
          <div style={{
            background: t.scanBg, border: `1px solid ${t.scanBorder}`, borderRadius: 18,
            padding: "56px 24px", textAlign: "center",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", left: 0, right: 0, height: "8%",
              background: "linear-gradient(180deg, transparent, rgba(255,45,85,.06), transparent)",
              animation: "scanLine 1.2s linear infinite",
            }} />
            <div style={{
              width: 52, height: 52, borderRadius: 14, margin: "0 auto 18px",
              background: "rgba(255,45,85,.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 26, animation: "pulse 1.2s infinite",
            }}>🔍</div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>개인정보 스캔 중...</div>
            <div style={{ fontSize: ".78rem", color: t.scanText }}>위험 패턴을 탐지하고 있습니다</div>
          </div>
        )}

        {/* Results */}
        {showResult && (
          <div style={{ display: "flex", flexDirection: "column", gap: 22, animation: "slideUp .5s ease" }}>

            {/* Score */}
            <div style={{
              background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 20,
              padding: "36px 24px 28px", textAlign: "center",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${RISK_COLORS[riskLevel].border}, transparent)`,
              }} />
              <div style={{
                fontSize: ".68rem", fontWeight: 600, letterSpacing: ".12em",
                color: t.textMuted, textTransform: "uppercase", marginBottom: 16,
              }}>
                종합 위험도
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Gauge score={result.overall_score} />
              </div>
              <div style={{
                marginTop: 22, padding: "14px 20px", borderRadius: 12,
                background: RISK_COLORS[riskLevel].glow,
                border: `1px solid ${RISK_COLORS[riskLevel].border}22`,
                fontSize: ".9rem", color: RISK_COLORS[riskLevel].text,
                fontWeight: 600, lineHeight: 1.6,
              }}>
                <Typing text={result.summary} speed={18} />
              </div>
            </div>

            {/* Score Breakdown */}
            {(() => {
              const bd = getScoreBreakdown(result.detected_items, currentCase.individuals);
              return (
                <div style={{
                  background: t.surfaceAlt, border: `1px solid ${t.border}`,
                  borderRadius: 14, padding: "18px 20px",
                  fontSize: ".75rem", color: t.textSecondary, lineHeight: 1.9,
                }}>
                  <div style={{
                    fontSize: ".65rem", fontWeight: 700, letterSpacing: ".08em",
                    color: t.textMuted, textTransform: "uppercase", marginBottom: 12,
                  }}>
                    점수 산출 근거
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>외부 AI 전송 기본 위험도 <span style={{ color: t.textMuted }}>(ISO 27701)</span></span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>+{bd.transmission}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>항목별 민감도 합산 <span style={{ color: t.textMuted }}>(NIST SP 800-122 · PIPA)</span></span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>+{bd.sensitivity}</span>
                    </div>
                    {bd.volume > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>데이터 주체 {currentCase.individuals}명 <span style={{ color: t.textMuted }}>(NIST 수량 가중)</span></span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>+{bd.volume}</span>
                      </div>
                    )}
                    {bd.combo > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>치명적 항목 결합 가중 <span style={{ color: t.textMuted }}>(NIST 결합 위험)</span></span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>+{bd.combo}</span>
                      </div>
                    )}
                    <div style={{
                      display: "flex", justifyContent: "space-between",
                      borderTop: `1px solid ${t.border}`, paddingTop: 6, marginTop: 4,
                      fontWeight: 700, color: t.text,
                    }}>
                      <span>종합 점수</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{bd.total}</span>
                    </div>
                  </div>
                  <div style={{ marginTop: 12, fontSize: ".62rem", color: t.textMuted, lineHeight: 1.7 }}>
                    {FRAMEWORK_REFS.join(" · ")}
                  </div>
                </div>
              );
            })()}

            {/* Detected Items */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <span style={{
                  fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em",
                  color: "#ff2d55", textTransform: "uppercase",
                }}>● 감지된 개인정보</span>
                <span style={{
                  fontSize: ".62rem", padding: "2px 8px", borderRadius: 50,
                  background: "rgba(255,45,85,.1)", color: "#ff2d55", fontWeight: 700,
                }}>
                  {result.detected_items.length}건
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {result.detected_items.map((item, i) => (
                  <DetectedItem key={i} item={item} index={i} />
                ))}
              </div>
            </div>

            {/* Data Flow Risks */}
            <div style={{
              background: t.surfaceAlt, border: `1px solid ${t.border}`,
              borderRadius: 16, padding: 24,
            }}>
              <div style={{
                fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em",
                color: "#ff9500", textTransform: "uppercase", marginBottom: 16,
              }}>● 전송 경로 위험</div>
              {result.data_flow_risks.map((risk, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12,
                  animation: `slideUp .4s ease ${i * .1}s both`,
                }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 2,
                    background: "rgba(255,149,0,.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: ".65rem", color: "#ff9500", fontWeight: 700,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontSize: ".84rem", color: t.textSecondary, lineHeight: 1.8 }}>{risk}</span>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            <div style={{
              background: "linear-gradient(135deg, rgba(48,209,88,.03), rgba(100,210,255,.03))",
              border: "1px solid rgba(48,209,88,.1)", borderRadius: 16, padding: 24,
            }}>
              <div style={{
                fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em",
                color: "#30d158", textTransform: "uppercase", marginBottom: 16,
              }}>✓ 개선 조치</div>
              {result.recommendations.map((rec, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12,
                  animation: `slideUp .4s ease ${i * .08}s both`,
                }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: "50%", flexShrink: 0, marginTop: 2,
                    background: "rgba(48,209,88,.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: ".65rem", color: "#30d158", fontWeight: 700,
                  }}>✓</span>
                  <span style={{ fontSize: ".84rem", color: t.textSecondary, lineHeight: 1.8 }}>{rec}</span>
                </div>
              ))}
            </div>

            {/* Comments */}
            <GiscusComments term={currentCase.slug} dark={dark} />

            {/* Back to List */}
            <button
              onClick={onBack}
              style={{
                width: "100%", padding: "16px",
                background: t.surface, border: `1px solid ${t.border}`,
                borderRadius: 14, cursor: "pointer",
                color: t.textMuted, fontSize: ".88rem", fontWeight: 600,
                transition: "all .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = t.borderHover;
                e.currentTarget.style.color = t.text;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = t.border;
                e.currentTarget.style.color = t.textMuted;
              }}
            >
              ‹ 다른 케이스 보기
            </button>

            <div style={{
              textAlign: "center", padding: "8px 16px",
              fontSize: ".68rem", color: t.textMuted, lineHeight: 1.7,
            }}>
              ※ 모든 이름·번호·주소는 가상 데이터입니다. 개인정보 보호 인식 제고를 위한 시뮬레이션.
            </div>
          </div>
        )}
      </div>
      <SponsorSection floating />
    </div>
  );
}

export default function App() {
  const [selected, setSelected] = useState(null);
  const [dark, setDark] = useState(false);

  const theme = dark ? THEMES.dark : THEMES.light;

  const handlePick = (index) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setSelected(index);
  };

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setSelected(null);
  };

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeToggle dark={dark} onToggle={() => setDark(!dark)} />
      {selected !== null
        ? <DetailPageInner key={selected} caseIndex={selected} onBack={handleBack} theme={theme} dark={dark} />
        : <ListPageInner onPick={handlePick} theme={theme} />
      }
    </ThemeContext.Provider>
  );
}
