import type { InvestmentTendency, StockReport } from "./types";

export const mockUserName = "User1";
export const mockTendency: InvestmentTendency = "공격투자형";
export const mockGeneratedAt = "09:00";

export const mockReports: StockReport[] = [
  {
    id: 1,
    stockName: "삼성전자",
    stockCode: "005930",
    priceKRW: 276500,
    changePercent: -1.6,
    isUp: false,
    score: 68,
    shortSummary:
      "반도체 업황 반등과 HBM 수요 증가로 중장기 성장 기대. 적극적인 주주환원 정책으로 배당 매력도 부각.",
    fullSummary:
      "글로벌 AI 인프라 투자 확대에 따른 HBM(고대역폭메모리) 수요 급증이 최대 수혜주로 부각되고 있습니다. 파운드리 부문의 수율 개선과 주요 고객사 물량 확보가 긍정적으로 작용하며, 연간 배당 성향 강화 정책이 장기 투자자에게 매력적인 조건을 제시합니다. 다만 레거시 반도체 부문의 마진 압박과 환율 변동성은 단기 리스크로 점검이 필요합니다.",
    news: [
      {
        sentiment: "긍정",
        summary:
          "HBM3E 양산 확대 및 엔비디아 공급 비중 증가 소식으로 2분기 실적 개선 기대감이 높아지고 있습니다. PBR 1.2배 수준으로 여전히 저평가 구간이라는 분석이 다수입니다.",
        source: "한국경제",
        date: "26.05.12",
      },
      {
        sentiment: "긍정",
        summary:
          "연간 주당 배당금 1,444원 확정. 자사주 소각 계획과 함께 주주환원 정책 지속 강화.",
        source: "매일경제",
        date: "26.04.28",
      },
      {
        sentiment: "부정",
        summary:
          "파운드리 부문 수율 이슈로 TSMC와의 점유율 격차가 일시적으로 확대될 수 있다는 우려가 있습니다.",
      },
    ],
  },
  {
    id: 2,
    stockName: "SK하이닉스",
    stockCode: "000660",
    priceKRW: 1797000,
    changePercent: -2.33,
    isUp: false,
    score: 82,
    shortSummary:
      "HBM 글로벌 1위 공급사로 엔비디아 독점 공급 계약 확보. AI 반도체 수혜 최대 종목으로 강력 추천.",
    fullSummary:
      "HBM3E 시장에서 독보적 1위 지위를 유지하며 엔비디아 GPU 전량 공급을 통해 AI 인프라 확장의 최대 수혜주로 자리매김하고 있습니다. 2026년 HBM 생산 Capa의 80% 이상을 사전 확보해 공급 부족 상황에서도 안정적 매출이 기대됩니다. 차세대 HBM4 개발도 경쟁사 대비 6개월 이상 앞서 있어 기술 리더십이 지속될 전망입니다.",
    news: [
      {
        sentiment: "긍정",
        summary:
          "엔비디아 블랙웰 GPU용 HBM3E 독점 공급 계약 연장 확인. 2026년 연간 매출 25조 원 돌파 전망.",
        source: "조선비즈",
        date: "26.05.15",
      },
      {
        sentiment: "긍정",
        summary:
          "HBM4 샘플 출하 시작. 경쟁사 대비 6~9개월 앞선 일정으로 차세대 시장 선점 가능성 높음.",
        source: "전자신문",
        date: "26.05.08",
      },
      {
        sentiment: "부정",
        summary:
          "미·중 반도체 수출 규제 강화 시 중국향 매출(전체의 약 15%) 감소 리스크가 존재합니다.",
      },
    ],
  },
  {
    id: 3,
    stockName: "현대차",
    stockCode: "005380",
    priceKRW: 608000,
    changePercent: -8.29,
    isUp: false,
    score: 55,
    shortSummary:
      "EV 전환 부담에도 견조한 내수·수출 실적 유지. 배당 확대 정책으로 배당주 매력 부각. 단기 과매도 구간.",
    fullSummary:
      "전동화 전환 가속화로 R&D 비용 증가와 EV 마진 압박이 지속되고 있으나, 프리미엄 SUV 라인업 강화와 미국 현지 생산 확대로 관세 리스크를 선제적으로 헷지하고 있습니다. 주주환원 정책 강화(배당성향 35% → 40% 상향)와 자사주 소각 계획이 밸류에이션 지지 요인으로 작용합니다. 단기 주가 급락은 과매도 구간 진입 가능성을 시사합니다.",
    news: [
      {
        sentiment: "긍정",
        summary:
          "미국 조지아 전기차 공장(HMGMA) 본격 가동으로 관세 부담 최소화. 현지 생산 비중 2027년까지 60% 목표.",
        source: "한국경제TV",
        date: "26.05.10",
      },
      {
        sentiment: "부정",
        summary:
          "글로벌 EV 시장 성장세 둔화로 아이오닉 라인업 판매량이 2분기 예상치를 8% 하회할 것으로 분석됩니다.",
        source: "이데일리",
        date: "26.05.14",
      },
      {
        sentiment: "부정",
        summary:
          "원/달러 환율 변동성 확대 시 수출 환차손 리스크가 실적에 부정적 영향을 줄 수 있습니다.",
      },
    ],
  },
  {
    id: 4,
    stockName: "LG전자",
    stockCode: "066570",
    priceKRW: 191700,
    changePercent: -11.65,
    isUp: false,
    score: 71,
    shortSummary:
      "B2B 사업 확대(HVAC·전장)로 안정적 성장 기반 확보. 전장 수주잔고 100조 돌파로 장기 모멘텀 탄탄.",
    fullSummary:
      "가전(H&A) 부문의 OLED TV·UP가전 프리미엄 전략이 수익성 개선으로 이어지고 있으며, B2B 사업인 냉난방공조(HVAC)와 전장 부품(VS) 부문이 연 20% 이상 성장하며 외형 확대를 견인하고 있습니다. VS 사업부의 전기차 부품 수주잔고가 100조 원을 돌파해 장기 성장 모멘텀이 탄탄합니다. 최근 주가 급락은 단기 과매도로 분석됩니다.",
    news: [
      {
        sentiment: "긍정",
        summary:
          "VS(전장) 사업부 수주잔고 100조 원 돌파. GM·BMW·현대차 납품 확대로 2027년 흑자전환 기대.",
        source: "머니투데이",
        date: "26.05.07",
      },
      {
        sentiment: "긍정",
        summary:
          "HVAC(냉난방공조) 부문 유럽 히트펌프 수요 급증. 1분기 수주 전년 대비 35% 증가.",
        source: "파이낸셜뉴스",
        date: "26.04.22",
      },
      {
        sentiment: "부정",
        summary:
          "스마트폰 사업 철수 이후 모바일 생태계 연동 부재로 가전 플랫폼 경쟁에서 열위 우려가 있습니다.",
      },
    ],
  },
  {
    id: 5,
    stockName: "두산에너빌리티",
    stockCode: "034020",
    priceKRW: 106500,
    changePercent: -4.99,
    isUp: false,
    score: 74,
    shortSummary:
      "SMR 원전 사업 수주 본격화. 체코 원전 우선협상자 선정으로 글로벌 원전 르네상스 최대 수혜주.",
    fullSummary:
      "AI 데이터센터의 전력 수요 급증으로 탄소 배출 없는 원전이 재조명 받는 가운데, 두산에너빌리티는 SMR(소형모듈원전) 주기기 제조 역량과 체코·폴란드 APR1400 수출 프로젝트로 글로벌 원전 부흥의 핵심 플레이어로 자리잡았습니다. 정부의 원전 생태계 복원 정책과 맞물려 국내 신규 원전 수주 기대감도 높습니다. 단기 주가 하락은 분할 매수 기회로 분석됩니다.",
    news: [
      {
        sentiment: "긍정",
        summary:
          "체코 두코바니 원전 4기 우선협상대상자 선정. 수주 예상 금액 24조 원. 계약 체결 시 대규모 실적 개선 기대.",
        source: "연합뉴스",
        date: "26.05.16",
      },
      {
        sentiment: "긍정",
        summary:
          "빌 게이츠 TerraPower SMR 프로젝트 주기기 공급 MOU 체결. 글로벌 SMR 시장 진출 교두보 확보.",
        source: "한국경제",
        date: "26.04.30",
      },
      {
        sentiment: "부정",
        summary:
          "원전 프로젝트 특성상 초기 수주~매출 인식까지 2~3년의 시간 차가 있어 단기 실적 개선 효과는 제한적입니다.",
      },
    ],
  },
];
