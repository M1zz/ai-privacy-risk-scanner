import { useState, useRef } from 'react';
import CASES from './data/cases';
import { RISK_COLORS, getRiskLevel } from './data/riskColors';
import Prompt from './components/Prompt';
import Gauge from './components/Gauge';
import Typing from './components/Typing';
import DetectedItem from './components/DetectedItem';

export default function App() {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [scanning, setScanning] = useState(false);
  const resultRef = useRef(null);

  const handlePick = (index) => {
    setSelected(index);
    setShowResult(false);
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setShowResult(true);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }, 1800);
  };

  const currentCase = selected !== null ? CASES[selected] : null;
  const result = currentCase?.result;
  const riskLevel = result ? getRiskLevel(result.overall_score) : null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#04050a",
      color: "#e8eaf0",
      fontFamily: "'Noto Sans KR', -apple-system, sans-serif",
    }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 16px 100px" }}>

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <h1 style={{
            fontSize: "clamp(1.5rem, 5vw, 2.2rem)",
            fontWeight: 900,
            lineHeight: 1.3,
            letterSpacing: "-.03em",
          }}>
            이런 프롬프트,<br />
            <span style={{
              background: "linear-gradient(135deg, #ff2d55, #ff6b35)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              보내고 있지 않나요?
            </span>
          </h1>
        </div>

        {/* Prompt List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {CASES.map((c, i) => (
            <div
              key={i}
              onClick={() => handlePick(i)}
              style={{
                cursor: "pointer",
                transition: "all .3s",
                opacity: selected !== null && selected !== i ? 0.3 : 1,
                transform: selected === i ? "scale(1.01)" : "none",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = selected === i ? "scale(1.01)" : "none"; }}
            >
              <Prompt text={c.preview} fade={true} big={true} />
            </div>
          ))}
        </div>

        {/* Analysis Panel */}
        {selected !== null && (
          <div style={{ marginTop: 40 }} ref={resultRef}>

            {/* Case Label */}
            <div style={{
              display: "flex", alignItems: "center", gap: 12,
              marginBottom: 20, padding: "16px 20px",
              background: "#080a14", border: "1px solid #0c1020", borderRadius: 14,
              animation: "fadeIn .4s ease",
            }}>
              <span style={{ fontSize: "1.3rem" }}>{currentCase.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: ".92rem", lineHeight: 1.35 }}>
                  {currentCase.label}
                </div>
                <div style={{ fontSize: ".68rem", color: "#3a4868", marginTop: 2 }}>
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
                    marginLeft: 12, color: "#3a4060",
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
                background: "#060810", border: "1px solid #0a0d1a", borderRadius: 18,
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
                <div style={{ fontSize: ".78rem", color: "#2a3558" }}>위험 패턴을 탐지하고 있습니다</div>
              </div>
            )}

            {/* Results */}
            {showResult && result && (
              <div style={{ display: "flex", flexDirection: "column", gap: 22, animation: "slideUp .5s ease" }}>

                {/* Score */}
                <div style={{
                  background: "#060810", border: "1px solid #0a0d1a", borderRadius: 20,
                  padding: "36px 24px 28px", textAlign: "center",
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 3,
                    background: `linear-gradient(90deg, ${RISK_COLORS[riskLevel].border}, transparent)`,
                  }} />
                  <div style={{
                    fontSize: ".68rem", fontWeight: 600, letterSpacing: ".12em",
                    color: "#2a3558", textTransform: "uppercase", marginBottom: 16,
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
                  background: "#060810", border: "1px solid #0a0d1a",
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
                      <span style={{ fontSize: ".84rem", color: "#7a82a8", lineHeight: 1.8 }}>{risk}</span>
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
                      <span style={{ fontSize: ".84rem", color: "#a8b0d0", lineHeight: 1.8 }}>{rec}</span>
                    </div>
                  ))}
                </div>

                {/* Disclaimer */}
                <div style={{
                  textAlign: "center", padding: "20px 16px",
                  fontSize: ".68rem", color: "#181c34", lineHeight: 1.7,
                }}>
                  ※ 모든 이름·번호·주소는 가상 데이터입니다. 개인정보 보호 인식 제고를 위한 시뮬레이션.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
