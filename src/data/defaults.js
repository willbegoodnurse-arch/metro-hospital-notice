export const DEFAULT_CATEGORIES = [
  '전체',
  '원무과',
  '간호부',
  '의료기술부',
  '진료부',
  '행정부',
  '시설관리',
];

export const DEFAULT_NOTICES = [
  {
    id: '1',
    content: '전 직원 대상 정기 건강검진이 시행됩니다. 일정에 맞게 검진 예약 바랍니다.\n\n- 일시: 2024년 4월 15일~19일\n- 장소: 건강검진센터 3층\n- 문의: 원무과 내선 1001',
    category: '원무과',
    createdAt: '2024-04-01T09:00:00.000Z',
    important: true,
  },
  {
    id: '2',
    content: '2024년 2분기 간호사 역량강화 교육 프로그램을 안내드립니다.\n\n- 심폐소생술 재교육: 4월 20일\n- 감염관리 교육: 4월 27일\n- 장소: 교육관 2층 강의실',
    category: '간호부',
    createdAt: '2024-04-02T10:30:00.000Z',
    important: false,
  },
  {
    id: '3',
    content: '1층 원무과 및 외래 접수 구역 리모델링 공사가 진행됩니다.\n\n- 공사 기간: 2024년 4월 10일 ~ 5월 10일\n- 공사 시간: 18:00 ~ 06:00 (야간)\n- 임시 접수처: 2층 연결 통로 이용',
    category: '시설관리',
    createdAt: '2024-04-03T08:00:00.000Z',
    important: true,
  },
];
