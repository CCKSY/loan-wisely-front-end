// Recommendation detail proxy.
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
  const authorization = request.headers.get("authorization");
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
    return respond(
      {
        explain: { summary: "", levelUsed: "", levelStatus: "" },
        products: [],
        detail: null,
        code: "BFF_BACKEND_NOT_CONFIGURED",
        message: "백엔드 연결이 설정되지 않아 추천 상세를 불러올 수 없습니다.",
      },
      503,
    );
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
