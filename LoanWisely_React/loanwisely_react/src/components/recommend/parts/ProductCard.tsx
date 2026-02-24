"use client";

import { useState } from "react";

export type ProductCardProps = {
  id: string;
  lenderName: string;
  productName: string;
  rate: string;
  limit: string;
  reason: string;
  suitabilityScore: number;
  tags: string[];
  providerUrl?: string;
  estimationDetails?: {
    factorCode: string;
    factorName: string;
    factorValue: string;
    contribution?: string | null;
  }[];
};

const formatNumber = (value: number | null | undefined): string => {
  if (value === null || value === undefined || Number.isNaN(value)) return "-";
  return value.toFixed(2);
};

const formatRateNumber = (value: number | null | undefined): string => {
  if (value === null || value === undefined || Number.isNaN(value)) return "-";
  if (value <= 0) return "";
  return value.toFixed(2);
};

const formatRateText = (value: string): string => {
  if (!value) return "-";
  const replaced = value.replace(/-?\d+(\.\d+)?/g, (match) => {
    const parsed = Number(match);
    if (Number.isNaN(parsed)) return match;
    return formatRateNumber(parsed);
  });
  return replaced.replace(/\s+/g, " ").trim();
};

const formatLimitValue = (raw: string): string => {
  if (!raw) return "-";
  const trimmed = raw.trim();
  if (!/^[\d,.\s]+$/.test(trimmed)) return raw;

  const numeric = Number(trimmed.replace(/[^\d.]/g, ""));
  if (Number.isNaN(numeric)) return raw;

  const man = Math.floor(numeric / 10000);
  if (man > 0) return `${man.toLocaleString()}만원`;
  return `${numeric.toLocaleString()}원`;
};

const translateFactorName = (name: string, code: string): string => {
  const normalized = name || code;
  const map: Record<string, string> = {
    "Estimated Limit": "추정 한도",
    "Maximum Rate": "최대 금리",
    "Minimum Rate": "최소 금리",
    "Matching Score": "적합도",
  };
  return map[normalized] ?? normalized;
};

const isRateDetail = (name: string, code: string): boolean => {
  const target = `${name} ${code}`.toLowerCase();
  return target.includes("rate") || target.includes("금리");
};

const normalizeLenderName = (value: string): string => {
  const match = value.match(/^Provider\s+(\d+)$/i);
  if (match?.[1]) return `금융사 ${match[1]}`;
  return value;
};

const ProductCard = ({
  id,
  lenderName,
  productName,
  rate,
  limit,
  suitabilityScore,
  tags,
  providerUrl,
  estimationDetails = [],
}: ProductCardProps) => {
  const [open, setOpen] = useState(false);
  const formattedRate = formatRateText(rate);
  const formattedLimit = /^[\d,.\s]+$/.test(limit.trim())
    ? `한도 ${formatLimitValue(limit)}`
    : limit;
  const lenderLabel = normalizeLenderName(lenderName);

  return (
    <article className="rounded-3xl border border-stone-200 bg-white px-6 py-5 shadow-sm">
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="text-xs text-stone-500">{lenderLabel}</div>
          <h2 className="text-lg font-semibold text-stone-900">{productName}</h2>
          <div className="mt-2 text-sm text-stone-600">{formattedRate}</div>
          <div className="text-sm text-stone-600">{formattedLimit}</div>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="h-10 min-w-[84px] whitespace-nowrap rounded-full border border-stone-400 px-4 text-sm font-semibold text-stone-700"
          >
            상세 보기
          </button>

          {open ? (
            <div
              className="absolute right-0 top-12 z-10 w-64 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-xs text-stone-700 shadow-lg"
              role="dialog"
            >
              <div className="absolute -top-2 right-6 h-4 w-4 rotate-45 border border-stone-200 bg-white" />
              <div className="space-y-2">
                <div className="text-[11px] text-stone-500">대출상품</div>
                <div className="text-sm font-semibold text-stone-900">{productName}</div>
                <div className="mt-1 text-[11px] text-stone-500">은행명</div>
                <div className="text-sm text-stone-800">{lenderLabel}</div>

                {providerUrl ? (
                  <a
                    href={providerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block break-all text-xs text-stone-700 underline underline-offset-2"
                  >
                    {providerUrl}
                  </a>
                ) : (
                  <div className="text-xs text-stone-400">등록된 URL이 없습니다.</div>
                )}

                <div className="flex items-center justify-end gap-2 pt-1">
                  {providerUrl ? (
                    <a
                      href={providerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-stone-300 px-3 py-1 text-[11px] text-stone-700"
                    >
                      사이트 열기
                    </a>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-full border border-stone-200 px-3 py-1 text-[11px] text-stone-500"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-4 text-sm text-stone-600">
        <span className="font-semibold text-stone-800">적합도:</span> {formatNumber(suitabilityScore)}점
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={`${id}-${tag}`}
            className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs text-amber-900"
          >
            {tag}
          </span>
        ))}
      </div>

      {estimationDetails.length > 0 && (
        <div className="mt-4 rounded-2xl bg-stone-50 px-4 py-3 text-xs text-stone-600">
          <div className="mb-2 text-xs font-semibold text-stone-700">추정 상세</div>
          <div className="grid gap-1">
            {estimationDetails
              .filter((detail) => detail.factorCode?.toUpperCase() !== "SCORE")
              .map((detail) => (
                <div
                  key={`${id}-${detail.factorCode}-${detail.factorValue}`}
                  className="flex justify-between gap-3"
                >
                  <span>{translateFactorName(detail.factorName, detail.factorCode)}</span>
                  <span className="font-semibold text-stone-700">
                    {detail.factorCode?.toUpperCase().includes("LIMIT")
                      ? formatLimitValue(detail.factorValue)
                      : isRateDetail(detail.factorName ?? "", detail.factorCode ?? "")
                        ? formatRateNumber(Number(detail.factorValue))
                        : formatNumber(Number(detail.factorValue))}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default ProductCard;
