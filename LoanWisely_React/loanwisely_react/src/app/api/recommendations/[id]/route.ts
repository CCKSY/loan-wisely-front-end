// 추천 세부 사항을 위한 BFF 프록시.
import { NextResponse } from "next/server";

import { env } from "@/infra/env";
import { FetchError, fetcher } from "@/infra/fetcher";

const buildTargetUrl = (requestUrl: string): string => {
  const incoming = new URL(requestUrl);
  const base = env.backendUrl.replace(/\/+$/, "");
  return `${base}${incoming.pathname}${incoming.search}`;
};

const mockResponse = (): NextResponse =>
  NextResponse.json({
    explain: {
      summary: "입력 정보가 없어서 데모 결과를 표시합니다.",
      levelUsed: "LV1",
      levelStatus: "empty",
    },
    products: [],
    detail: {
      description: "상품 상세 정보가 표시됩니다.",
      monthlyPaymentExample: "월 상환액 예시가 표시됩니다.",
      riskWarning: "고위험 조건 경고 및 승인 보장 아님 고지가 표시됩니다.",
    },
  });

const forwardHeaders = (request: Request): HeadersInit => {
  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  const authorization = request.headers.get("authorization");

  if (contentType) {
    headers.set("content-type", contentType);
  }
  if (authorization) {
    headers.set("authorization", authorization);
  }

  return headers;
};

const respond = (body: unknown, status: number): NextResponse => {
  if (body === null || body === undefined) {
    return new NextResponse(null, { status });
  }
  if (typeof body === "string") {
    return new NextResponse(body, { status });
  }
  return NextResponse.json(body, { status });
};

export const GET = async (request: Request): Promise<NextResponse> => {
  if (env.backendUrl === "") {
    return mockResponse();
  }

  const targetUrl = buildTargetUrl(request.url);
  const headers = forwardHeaders(request);

  try {
    const data = await fetcher<unknown>(targetUrl, {
      method: "GET",
      headers,
    });
    return respond(data, 200);
  } catch (error) {
    if (error instanceof FetchError) {
      return respond(error.body, error.status);
    }
    return respond({ message: "Proxy request failed." }, 502);
  }
};


