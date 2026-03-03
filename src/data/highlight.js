/**
 * Determines the risk level of a prompt line based on pattern matching.
 * Returns 2 for critical (red), 1 for warning (orange), 0 for normal.
 */
export function getLineRiskLevel(line) {
  const criticalPatterns = /주민등록번호|주민번호|\d{6}-\d{7}|사업자등록번호|214-87-\d+|법인계좌|267-910045/;
  const warningPatterns = /010-|카드|5412-|9411-|4519-|@|gmail|naver|kakao|hanmail|daum|생년월일|연봉|성과급|ADHD|별거|디스크|MRI|NDA|이직|면접|Series B|위암|투병|병간호|출산|알레르기|미수금|감사|부정 사용|퇴사|소보원|신고/;

  if (criticalPatterns.test(line)) return 2;
  if (warningPatterns.test(line)) return 1;
  return 0;
}
