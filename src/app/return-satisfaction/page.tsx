import type { Metadata } from 'next';
import ReturnSatisfactionClient from './ReturnSatisfactionClient';

export const metadata: Metadata = {
  title: '반납 완료 | 쏘카',
};

interface ReturnSatisfactionPageProps {
  searchParams: Promise<{
    reservationId?: string;
    vehicleName?: string;
    usagePeriod?: string;
  }>;
}

/**
 * 반납 후 서비스 만족도 조사 페이지 (Server Component)
 *
 * Query params:
 * - reservationId: 반납 완료된 예약 ID (필수)
 * - vehicleName: 차량명 (예: "아반떼 CN7 · 가나1234")
 * - usagePeriod: 이용 기간 문자열 (예: "06.01(일) 09:00 ~ 06.02(월) 18:00")
 *
 * 실서비스 연동 시 searchParams 대신 route params 또는 서버 측 예약 조회로 대체
 */
export default async function ReturnSatisfactionPage({
  searchParams,
}: ReturnSatisfactionPageProps) {
  const params = await searchParams;

  const reservationId = params.reservationId ?? 'unknown';
  const vehicleName = params.vehicleName ?? '';
  const usagePeriod = params.usagePeriod ?? '';

  return (
    <ReturnSatisfactionClient
      reservationId={reservationId}
      vehicleName={vehicleName}
      usagePeriod={usagePeriod}
    />
  );
}
