import { NextResponse } from "next/server";

import { env } from "@/infra/env";
import { FetchError, fetcher } from "@/infra/fetcher";

const buildTargetUrl = (requestUrl: string): string => {
  const incoming = new URL(requestUrl);
  const base = env.backendUrl.replace(/\/+$/, "");
  return `${base}${incoming.pathname}${incoming.search}`;
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
    return NextResponse.json(
      { message: "백엔드 API 주소가 설정되지 않아 로그인 요청을 처리할 수 없습니다." },
      { status: 503 },
    );
  }

  const targetUrl = buildTargetUrl(request.url);
  const body = await request.text();

  try {
    const data = await fetcher<unknown>(targetUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
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
