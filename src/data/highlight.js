/**
 * Determines the risk level of a prompt line based on pattern matching.
 * Returns 2 for critical (red), 1 for warning (orange), 0 for normal.
 */
export function getLineRiskLevel(line) {
  const criticalPatterns = /주민등록번호|주민번호|주민:|781015-1234567|680423-1892347|950817-2345678|\d{6}-\d{7}/;
  const warningPatterns = /010-|카드|9411-|@|gmail|naver|kakao|hanmail|생년월일|연봉|ADHD|별거|디스크|MRI|NDA|이직|Series B|Grade IV|Temozolomide|Glioblastoma|약물 치료|출산/;

  if (criticalPatterns.test(line)) return 2;
  if (warningPatterns.test(line)) return 1;
  return 0;
}
