import Link from "next/link";

const ActionSection = () => (
  <div className="flex flex-wrap gap-3">
    <Link
      href="/user"
      className="rounded-full border border-stone-300 px-6 py-2 text-sm text-stone-700"
    >
      조건 조정
    </Link>
    <Link
      href="/"
      className="rounded-full bg-amber-200 px-6 py-2 text-sm font-semibold text-stone-900"
    >
      홈으로
    </Link>
  </div>
);

export default ActionSection;
