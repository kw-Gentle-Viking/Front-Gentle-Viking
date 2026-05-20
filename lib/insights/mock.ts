export type ReportPick = {
  rank: number;
  name: string;
  code: string;
  price: number;
  changePct: number;
  reason: string;
  highlights: string[];
  risks: string[];
  guide: {
    investKRW: number;
    buyQty: number;
    strategy: '매수' | '관망' | '분할매수';
  };
};

export type StockReport = {
  profileTitle: string;
  totalInvestKRW: number;
  cashKRW: number;
  cashRate: number;
  picks: ReportPick[];
};

export type NewsItem = {
  id: string;
  title: string;
  source: string;
  time: string;
  sentiment: '긍정' | '중립' | '부정';
  summary: string;
  related: string[];
};

export const mockReport: StockReport = {
  profileTitle:
    '실적 기반의 정석 투자자(Performance-based Orthodox Investor) 맞춤형 포트폴리오',
  totalInvestKRW: 8569200,
  cashKRW: 1430800,
  cashRate: 14.31,
  picks: [
    {
      rank: 1,
      name: '한미약품',
      code: '128940',
      price: 541000,
      changePct: 0.19,
      reason:
        '견조한 실적 흐름과 신약 파이프라인 기대가 결합된 구간으로 판단됩니다. 변동성이 있더라도 장기 성장 모멘텀이 유효합니다.',
      highlights: [
        'PER 57.13 / PBR 6.32',
        '실적 기반 성장 기대',
        '현금흐름/안정성 고려',
      ],
      risks: ['바이오 섹터 변동성', '임상/규제 이슈 발생 가능'],
      guide: { investKRW: 2164000, buyQty: 4, strategy: '매수' },
    },
    {
      rank: 2,
      name: '엘앤에프',
      code: '066970',
      price: 117600,
      changePct: -2.57,
      reason:
        '실적 바닥 확인 및 업황 개선 시그널이 누적되는 구간으로 해석됩니다. 중장기 회복 사이클에 베팅 가능한 후보입니다.',
      highlights: [
        'PER -11.29 / PBR 5.53',
        '업황 턴어라운드 기대',
        '기술 경쟁력 보유',
      ],
      risks: ['2차전지 업황/수요 변동', '변동성 확대 가능'],
      guide: { investKRW: 1999200, buyQty: 17, strategy: '분할매수' },
    },
    {
      rank: 3,
      name: '현대건설',
      code: '000720',
      price: 110000,
      changePct: -2.65,
      reason:
        '실적 정상화와 수주 회복 기대가 동시에 작동할 가능성이 있습니다. 방어와 성장의 균형을 맞추는 용도로 적합합니다.',
      highlights: [
        'PER 73.33 / PBR 1.54',
        '인프라/원전 모멘텀',
        '안정적 업황 기대',
      ],
      risks: ['원자재/공사비 변수', '프로젝트 리스크'],
      guide: { investKRW: 1980000, buyQty: 18, strategy: '매수' },
    },
    {
      rank: 4,
      name: 'HD현대',
      code: '267250',
      price: 241500,
      changePct: 1.26,
      reason:
        '자회사 실적 개선과 산업 사이클의 수혜가 기대됩니다. 밸류에이션 부담이 과도하지 않은 구간으로 평가합니다.',
      highlights: [
        'PER 37.48 / PBR 1.97',
        '그룹 전반 실적 모멘텀',
        '에너지 전환/친환경',
      ],
      risks: ['자회사 실적 의존도', '업황 변동성'],
      guide: { investKRW: 1449000, buyQty: 6, strategy: '매수' },
    },
    {
      rank: 5,
      name: '현대차',
      code: '005380',
      price: 488500,
      changePct: -3.08,
      reason:
        '브랜드 경쟁력과 장기 전환(모빌리티/소프트웨어) 기대를 동시에 반영할 수 있는 후보입니다.',
      highlights: [
        'PER 10.61 / PBR 1.18',
        '저평가 구간 가능성',
        '미래 모빌리티 확장',
      ],
      risks: ['글로벌 경기 둔화', '경쟁 심화'],
      guide: { investKRW: 977000, buyQty: 2, strategy: '관망' },
    },
  ],
};

export const mockNews: NewsItem[] = [
  {
    id: 'n1',
    title: '미국 금리 동결 시사… 성장주 변동성 완화 기대',
    source: '경제데일리',
    time: '10:12',
    sentiment: '긍정',
    summary:
      '연준의 스탠스 변화 가능성이 부각되며 위험자산 선호가 일부 회복되는 모습입니다.',
    related: ['나스닥', '2차전지', 'AI'],
  },
  {
    id: 'n2',
    title: '2차전지 수요 회복 신호… 업황 저점 통과 관측',
    source: '마켓리포트',
    time: '11:03',
    sentiment: '중립',
    summary:
      '재고 조정이 마무리 국면이라는 분석이 있으나, 분기별 수요는 확인이 필요합니다.',
    related: ['2차전지', '소재', '수출'],
  },
  {
    id: 'n3',
    title: '바이오 규제 이슈 확대… 임상 일정 변동 가능성',
    source: '뉴스와이',
    time: '13:27',
    sentiment: '부정',
    summary:
      '일부 기업의 임상 일정 변화 리스크가 거론되며 섹터 전반의 변동성이 커질 수 있습니다.',
    related: ['바이오', '제약', '임상'],
  },
];
