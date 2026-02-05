// FAQ 검색 입력
import type { ChangeEvent } from "react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <div className="flex h-12 w-full items-center gap-3 rounded-full border border-stone-200 bg-white px-4 text-sm leading-none text-stone-600">
    <span className="text-xs uppercase tracking-wide text-stone-400">Search</span>
    <input
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
      placeholder="검색어를 입력하세요"
      className="flex-1 border-0 bg-transparent text-sm text-stone-700 outline-none"
    />
  </div>
);

export default SearchBar;
