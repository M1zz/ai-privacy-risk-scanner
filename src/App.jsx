import { useState, useEffect } from 'react';
import CASES from './data/cases';
import { RISK_COLORS, getRiskLevel, getRiskLabel } from './data/riskColors';
import Prompt from './components/Prompt';
import Gauge from './components/Gauge';
import Typing from './components/Typing';
import DetectedItem from './components/DetectedItem';

function ListPage({ onPick }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#04050a",
      color: "#e8eaf0",
      fontFamily: "'Noto Sans KR', -apple-system, sans-serif",
    }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 16px 100px" }}>

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
          <p style={{ marginTop: 14, fontSize: ".85rem", color: "#3a4868", lineHeight: 1.7 }}>
            케이스를 선택해서 개인정보 위험을 진단해보세요
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {CASES.map((c, i) => {
            const riskLevel = getRiskLevel(c.result.overall_score);
            const colors = RISK_COLORS[riskLevel];
            return (
              <div
                key={i}
                onClick={() => onPick(i)}
                style={{
                  cursor: "pointer",
                  background: "#080a14",
                  border: "1px solid #0c1020",
                  borderRadius: 16,
                  padding: "18px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  transition: "all .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#0a0d1c";
                  e.currentTarget.style.borderColor = colors.border + "44";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#080a14";
                  e.currentTarget.style.borderColor = "#0c1020";
                  e.currentTarget.style.transform = "none";
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                  background: colors.glow,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.5rem",
                }}>
                  {c.emoji}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: ".92rem", lineHeight: 1.35 }}>
                    {c.label}
                  </div>
                  <div style={{ fontSize: ".72rem", color: "#3a4868", marginTop: 3 }}>
                    {c.category}
                  </div>
                </div>

                <div style={{ flexShrink: 0, textAlign: "right" }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "1.3rem", fontWeight: 800,
                    color: colors.text,
                    textShadow: `0 0 16px ${colors.glow}`,
                    lineHeight: 1,
                  }}>
                    {c.result.overall_score}
                  </div>
                  <div style={{
                    fontSize: ".58rem", fontWeight: 700, marginTop: 4,
                    color: colors.text, opacity: 0.7,
                  }}>
                    {getRiskLabel(c.result.overall_score)}
                  </div>
                </div>

                <div style={{ color: "#2a3558", fontSize: ".9rem", flexShrink: 0 }}>›</div>
              </div>
            );
          })}
        </div>

        <div style={{
          textAlign: "center", marginTop: 40,
          fontSize: ".68rem", color: "#181c34", lineHeight: 1.7,
        }}>
          ※ 모든 이름·번호·주소는 가상 데이터입니다. 개인정보 보호 인식 제고를 위한 시뮬레이션.
        </div>
      </div>
    </div>
  );
}

function DetailPage({ caseIndex, onBack }) {
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
      background: "#04050a",
      color: "#e8eaf0",
      fontFamily: "'Noto Sans KR', -apple-system, sans-serif",
    }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "24px 16px 100px" }}>

        {/* Back Button */}
        <button
          onClick={onBack}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "none", border: "none", cursor: "pointer",
            color: "#4a5580", fontSize: ".85rem", fontWeight: 600,
            padding: "8px 0", marginBottom: 24,
            transition: "color .2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#e8eaf0"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#4a5580"; }}
        >
          ‹ 목록으로
        </button>

        {/* Case Header */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          marginBottom: 24, padding: "16px 20px",
          background: "#080a14", border: "1px solid #0c1020", borderRadius: 14,
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
        {showResult && (
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

            {/* Back to List */}
            <button
              onClick={onBack}
              style={{
                width: "100%", padding: "16px",
                background: "#080a14", border: "1px solid #0c1020",
                borderRadius: 14, cursor: "pointer",
                color: "#4a5580", fontSize: ".88rem", fontWeight: 600,
                transition: "all .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#1a2040";
                e.currentTarget.style.color = "#e8eaf0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#0c1020";
                e.currentTarget.style.color = "#4a5580";
              }}
            >
              ‹ 다른 케이스 보기
            </button>

            <div style={{
              textAlign: "center", padding: "8px 16px",
              fontSize: ".68rem", color: "#181c34", lineHeight: 1.7,
            }}>
              ※ 모든 이름·번호·주소는 가상 데이터입니다. 개인정보 보호 인식 제고를 위한 시뮬레이션.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [selected, setSelected] = useState(null);

  const handlePick = (index) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setSelected(index);
  };

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setSelected(null);
  };

  if (selected !== null) {
    return <DetailPage key={selected} caseIndex={selected} onBack={handleBack} />;
  }

  return <ListPage onPick={handlePick} />;
}
