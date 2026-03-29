// 홈 하단 푸터
"use client";

import { useState } from "react";

const termsContent = `LOAN WISELY 이용약관
시행일자: 2026년 2월 19일
회사명: CCKSY
서비스명: LOAN WISELY

제1조 (목적) 본 약관은 CCKSY(이하 “회사”)가 운영하는 LOAN WISELY(이하
“서비스”)의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을
규정함을 목적으로 합니다.

제2조 (정의) 1. “서비스”란 회사가 제공하는 금융 대출 상품 안내 및 추천
솔루션 일체를 의미합니다. 2. “이용자”란 본 약관에 따라 회사가 제공하는
서비스를 이용하는 회원 및 비회원을 말합니다. 3. “회원”이란 회사와
이용계약을 체결하고 아이디를 부여받은 자를 말합니다.

제3조 (약관의 효력 및 변경) 1. 본 약관은 서비스 화면에 게시함으로써
효력이 발생합니다. 2. 회사는 관련 법령을 위반하지 않는 범위에서 약관을
변경할 수 있습니다. 3. 중요한 변경의 경우 적용일 7일 전(이용자에게
불리한 경우 30일 전) 공지합니다.

제4조 (이용계약의 성립) 1. 이용계약은 이용자가 약관에 동의하고
회원가입을 신청하며, 회사가 이를 승낙함으로써 성립합니다. 2. 회사는
다음에 해당하는 경우 승낙을 거절할 수 있습니다. - 허위 정보 기재 - 타인
명의 도용 - 서비스 운영에 중대한 지장을 초래할 우려가 있는 경우

제5조 (서비스의 내용) 1. 금융 상품 정보 제공 2. 사용자 입력 기반 맞춤형
대출 상품 추천 3. 기타 회사가 정하는 부가 서비스 ※ 본 서비스는
금융상품의 중개·알선이 아닌 정보 제공 및 분석 서비스입니다.

제6조 (서비스 이용시간) 서비스는 연중무휴 24시간 제공을 원칙으로 하나,
시스템 점검 등의 사유로 제한될 수 있습니다.

제7조 (회원의 의무) 이용자는 다음 행위를 해서는 안 됩니다. 1. 허위 정보
등록 2. 시스템 해킹 또는 서비스 방해 3. 타인의 개인정보 도용 4. 법령
또는 공서양속 위반 행위

제8조 (지적재산권) 서비스 내 모든 콘텐츠에 대한 저작권 및 지적재산권은
회사에 귀속됩니다.

제9조 (서비스 이용제한) 회사는 약관 위반 시 사전 통지 후 서비스 이용을
제한할 수 있습니다.

제10조 (면책조항) 1. 회사는 천재지변, 서버 장애 등 불가항력 사유에 대해
책임을 지지 않습니다. 2. 본 서비스의 추천 결과는 참고용 정보이며, 최종
금융계약 체결에 대한 책임은 이용자에게 있습니다.

제11조 (준거법 및 관할) 본 약관은 대한민국 법령을 준거법으로 하며, 분쟁
발생 시 서울중앙지방법원을 전속 관할법원으로 합니다.`;

const privacyContent = `LOAN WISELY 개인정보처리방침
시행일자: 2026년 2월 19일
회사명: CCKSY
서비스명: LOAN WISELY

제1조 (개인정보 처리 목적) 회사는 다음의 목적을 위해 개인정보를
처리합니다. 1. 회원 가입 및 관리 2. 대출 상품 추천 서비스 제공 3. 고객
문의 대응 4. 서비스 개선 및 통계 분석

제2조 (수집하는 개인정보 항목) 1. 회원가입 시 - 필수: 이름, 이메일,
비밀번호 - 선택: 휴대전화번호 2. 추천 서비스 이용 시 - 연령 - 성별 -
연소득 - 거주형태 - 신용점수(이용자가 직접 입력한 경우) - 대출 목적 및
금융 관련 입력 정보 3. 자동 수집 정보 - IP 주소 - 접속 로그 - 쿠키 정보

제3조 (개인정보의 보유 및 이용기간) 1. 회원 탈퇴 시 즉시 파기합니다. 2.
관계 법령에 따라 보존이 필요한 경우 아래 기간 동안 보관합니다. - 계약
또는 청약철회 기록: 5년 - 소비자 불만 또는 분쟁 처리 기록: 3년 - 접속
로그 기록: 3개월

제4조 (개인정보의 제3자 제공) 회사는 원칙적으로 이용자의 개인정보를
외부에 제공하지 않습니다. 단, 법령에 근거하거나 이용자의 동의가 있는
경우는 예외로 합니다.

제5조 (개인정보 처리 위탁) 서비스 운영을 위해 다음과 같이 개인정보 처리
업무를 위탁할 수 있습니다. - 클라우드 서버 운영 업체 - 이메일 발송
서비스 업체 위탁 시 관련 법령에 따라 안전하게 관리·감독합니다.

제6조 (정보주체의 권리) 이용자는 언제든지 개인정보 열람, 정정, 삭제,
처리정지를 요구할 수 있습니다.

제7조 (개인정보의 파기) 전자적 파일은 복구 불가능한 기술적 방법으로
삭제하며, 종이 문서는 분쇄 또는 소각합니다.

제8조 (안전성 확보 조치) 회사는 개인정보 보호를 위해 다음 조치를
시행합니다. 1. 개인정보 암호화 2. 접근 권한 관리 3. 정기적 보안 점검 4.
SSL 등 보안 프로토콜 적용

제9조 (개인정보 보호책임자) - 책임자: CCKSY 개인정보 보호책임자 -
이메일: privacy@ccksy.com - 연락처: xx-xxx-xxxx

제10조 (방침 변경) 개인정보처리방침은 법령 변경 또는 내부 정책 변경에
따라 수정될 수 있으며, 변경 시 홈페이지를 통해 공지합니다.`;

const HomeFooter = () => {
  const [open, setOpen] = useState<null | "terms" | "privacy">(null);
  const modalTitle = open === "privacy" ? "개인정보처리방침" : "이용약관";
  const modalContent = open === "privacy" ? privacyContent : termsContent;

  return (
    <footer className="rounded-[28px] border border-stone-200 bg-white/85 px-8 py-5 text-xs text-stone-600 shadow-soft-lg">
      <div className="flex flex-wrap gap-4 pb-2 text-sm font-medium text-stone-700">
        <button
          type="button"
          onClick={() => setOpen("terms")}
          className="hover:text-stone-900"
        >
          이용약관
        </button>
        <button
          type="button"
          onClick={() => setOpen("privacy")}
          className="hover:text-stone-900"
        >
          개인정보처리방침
        </button>
      </div>
      <p>
        본 서비스는 입력된 정보를 기반으로 금융상품을 추천하는 가이드이며,
        추천 결과는 금융기관의 실제 심사 결과와 다를 수 있습니다.
      </p>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-h-[80vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4">
              <div className="text-sm font-semibold text-stone-900">
                {modalTitle}
              </div>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="rounded-full border border-stone-200 px-3 py-1 text-xs text-stone-600 hover:border-stone-300"
              >
                닫기
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto px-6 py-5 text-xs leading-6 text-stone-600">
              <pre className="whitespace-pre-wrap font-sans">
                {modalContent}
              </pre>
            </div>
          </div>
        </div>
      ) : null}
    </footer>
  );
};

export default HomeFooter;
