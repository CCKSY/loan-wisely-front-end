// 상품 목록 조회를 위한 BFF 프록시.
import { NextResponse } from "next/server";

import { env } from "@/infra/env";
import { FetchError, fetcher } from "@/infra/fetcher";

const buildTargetUrl = (requestUrl: string): string => {
  const incoming = new URL(requestUrl);
  const base = env.backendUrl.replace(/\/+$/, "");
  return `${base}/api/v1/products${incoming.search}`;
};

const mockResponse = (): NextResponse =>
  NextResponse.json({ data: [], message: "No backend configured." });

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
