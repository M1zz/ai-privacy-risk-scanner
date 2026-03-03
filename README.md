# AI Privacy Risk Scanner

> **이런 프롬프트, 보내고 있지 않나요?**

AI 자동화 업무에서 발생하는 개인정보 유출 위험을 실제 프롬프트 예시로 진단하는 시뮬레이터입니다.

## 7가지 업무 자동화 케이스

| 점수 | 케이스 | 핵심 위험 |
|------|--------|-----------|
| 97점 | 진료 기록 소견서 | 주민번호 + 암 진단 + 항암제 처방 |
| 93점 | 임대차 계약서 | 양쪽 주민번호 + 보증금 + 연봉 |
| 91점 | 학생 성적 피드백 | 미성년자 ADHD + 부모 별거 |
| 85점 | 이력서 AI 스크리닝 | 생년월일 + 자택 동호수 |
| 82점 | Slack 일일 요약 봇 | 직원 건강 + NDA 기밀 |
| 78점 | 고객 자동 응답 챗봇 | 카드번호 + 배송지 주소 |
| 72점 | 마케팅 문구 자동 생성 | 고객 이름 + 전화 + 이메일 |

## 로컬 실행

npm install
npm run dev

## 빌드

npm run build

## GitHub Pages 배포

### gh-pages 패키지 사용

1. vite.config.js 에서 base 를 본인 레포 이름으로 변경
2. npm run build
3. npm run deploy

### GitHub Actions 자동 배포

.github/workflows/deploy.yml 을 만들고 repo Settings > Pages > Source 를 GitHub Actions 로 설정하세요. deploy.yml 예시는 아래와 같습니다.

name: Deploy
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci && npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
      - uses: actions/deploy-pages@v4

## 프로젝트 구조

src/
  main.jsx              엔트리 포인트
  index.css             글로벌 스타일
  App.jsx               메인 앱 컴포넌트
  components/
    Prompt.jsx          프롬프트 코드블록 (하이라이팅)
    Gauge.jsx           위험도 반원 게이지
    Typing.jsx          타이핑 애니메이션
    DetectedItem.jsx    감지 항목 카드
  data/
    cases.js            7개 케이스 데이터
    riskColors.js       위험 등급별 색상
    highlight.js        프롬프트 줄 하이라이팅 로직

## 안내

모든 이름, 전화번호, 주소, 주민번호는 가상 데이터입니다.
실존 인물과 무관하며, 개인정보 보호 인식 제고를 위한 교육용 시뮬레이션입니다.

## 라이선스

MIT
