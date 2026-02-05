// FAQ 페이지 하단 푸터
const FaqFooter = () => (
  <footer className="rounded-[28px] border border-stone-200 bg-white/85 px-8 py-5 text-xs text-stone-600 shadow-soft-lg">
    <div className="flex flex-wrap gap-4 pb-2 text-sm font-medium text-stone-700">
      <a href="#" className="hover:text-stone-900">
        이용약관
      </a>
      <a href="#" className="hover:text-stone-900">
        개인정보처리방침
      </a>
      <a href="#" className="hover:text-stone-900">
        고객센터
      </a>
    </div>
    <p>
      본 서비스는 입력된 정보를 기반으로 금융상품을 추천하는 가이드이며,
      추천 결과는 금융기관의 실제 심사 결과와 다를 수 있습니다.
    </p>
  </footer>
);

export default FaqFooter;
