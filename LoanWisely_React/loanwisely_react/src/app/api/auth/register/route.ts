// User register proxy.
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
  if (contentType) {
    headers.set("content-type", contentType);
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

export const POST = async (request: Request): Promise<NextResponse> => {
  if (env.backendUrl === "") {
    return respond(
      {
        code: "BFF_BACKEND_NOT_CONFIGURED",
        message: "백엔드 연결이 설정되지 않아 회원가입을 진행할 수 없습니다.",
      },
      503,
    );
  }

  const targetUrl = buildTargetUrl(request.url);
  const headers = forwardHeaders(request);
  const body = await request.text();

  try {
    const data = await fetcher<unknown>(targetUrl, {
      method: "POST",
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
