// LV3 신용정보 저장 요청을 백엔드로 전달하는 BFF 라우트
import { NextResponse } from "next/server";

import { env } from "@/infra/env";
import { FetchError, fetcher } from "@/infra/fetcher";

const buildTargetUrl = (requestUrl: string): string => {
  const incoming = new URL(requestUrl);
  const base = env.backendUrl.replace(/\/+$/, "");
  return `${base}${incoming.pathname}${incoming.search}`;
};

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

export const PUT = async (request: Request): Promise<NextResponse> => {
  if (env.backendUrl === "") {
    return NextResponse.json(
      { message: "백엔드 API 주소가 설정되지 않아 Lv3 금융정보 저장을 처리할 수 없습니다." },
      { status: 503 },
    );
  }

  const targetUrl = buildTargetUrl(request.url);
  const headers = forwardHeaders(request);
  const body = await request.text();

  try {
    const data = await fetcher<unknown>(targetUrl, {
      method: "PUT",
      headers,
      body,
    });
    return respond(data, 200);
  } catch (error) {
    if (error instanceof FetchError) {
      return respond(error.body, error.status);
    }
    return respond({ message: "Proxy request failed." }, 502);
  }
};


