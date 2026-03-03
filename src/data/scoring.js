/**
 * AI Privacy Risk Score Calculator
 *
 * 근거 프레임워크:
 * - NIST SP 800-122: PII 민감도 분류 및 데이터 결합 위험 가중
 * - 개인정보보호법(PIPA) 제23조(민감정보), 제24조(고유식별정보)
 * - OWASP Top 10 Privacy Risks: 영향도 × 가능성 모델
 * - ISO 27701:2025: 외부 전송 시 위험도 평가
 * - GDPR Article 9: 특별 범주 개인정보 분류
 */

// 1. 항목별 민감도 가중치 (NIST SP 800-122 + PIPA 분류 기반)
//    - critical: 고유식별정보(주민번호·계좌) 또는 민감정보(건강·사상) → PIPA 제23·24조
//    - high: 복합 식별 가능 정보(이름+주소, 연봉 등) → NIST "contextual high"
//    - medium: 단독 개인정보(이메일, 구매이력) → NIST "low-moderate"
//    - low: 공개 정보(직급, 회사명) → NIST "low"
const SENSITIVITY_WEIGHTS = {
  critical: 15,
  high: 10,
  medium: 6,
  low: 3,
};

// 2. 외부 AI 전송 기본 위험도 (ISO 27701, GDPR)
//    프롬프트를 외부 API로 보내는 행위 자체의 기저 위험
//    - 서버 로그 보관 (최대 30일)
//    - 학습 데이터 활용 가능성
//    - 관할권 외 데이터 이전
const TRANSMISSION_BASELINE = 25;

// 3. 데이터 주체 수량 가중 (NIST SP 800-122 "quantity of PII")
//    한 번의 프롬프트에 포함된 개인의 수가 많을수록 위험 증가
function getVolumeBonus(individuals) {
  return Math.min(12, (individuals - 1) * 3);
}

// 4. 데이터 결합 가중 (NIST SP 800-122 linkage escalation)
//    치명적 민감 항목이 복수 존재 시 재식별·악용 위험 급증
function getComboBonus(items) {
  const criticals = items.filter(i => i.level === 'critical').length;
  if (criticals >= 3) return 8;
  if (criticals >= 2) return 4;
  return 0;
}

/**
 * 종합 위험도 점수 산출
 * @param {Array} detected_items - 감지된 개인정보 항목 배열
 * @param {number} individuals - 프롬프트에 포함된 데이터 주체(사람) 수
 * @returns {number} 0-99 위험도 점수
 */
export function calcRiskScore(detected_items, individuals = 1) {
  const sensitivity = detected_items.reduce(
    (sum, item) => sum + (SENSITIVITY_WEIGHTS[item.level] || 0), 0
  );
  const volume = getVolumeBonus(individuals);
  const combo = getComboBonus(detected_items);

  const raw = TRANSMISSION_BASELINE + sensitivity + volume + combo;
  return Math.min(99, Math.round(raw));
}

// 점수 산출 근거 텍스트 생성
export function getScoreBreakdown(detected_items, individuals = 1) {
  const sensitivity = detected_items.reduce(
    (sum, item) => sum + (SENSITIVITY_WEIGHTS[item.level] || 0), 0
  );
  const volume = getVolumeBonus(individuals);
  const combo = getComboBonus(detected_items);

  return {
    transmission: TRANSMISSION_BASELINE,
    sensitivity,
    volume,
    combo,
    total: Math.min(99, TRANSMISSION_BASELINE + sensitivity + volume + combo),
    items: detected_items.map(item => ({
      type: item.type,
      level: item.level,
      weight: SENSITIVITY_WEIGHTS[item.level] || 0,
    })),
  };
}

export const FRAMEWORK_REFS = [
  "NIST SP 800-122 — PII 민감도 분류 및 결합 위험",
  "개인정보보호법 제23조(민감정보), 제24조(고유식별정보)",
  "OWASP Top 10 Privacy Risks",
  "ISO 27701 — 외부 전송 위험 평가",
];
