// 헬스 체크 요청을 백엔드로 전달하는 BFF 라우트
import { NextResponse } from "next/server";

import { env } from "@/infra/env";
import { FetchError, fetcher } from "@/infra/fetcher";

const buildTargetUrl = (): string => {
  const base = env.backendUrl.replace(/\/+$/, "");
  return `${base}/actuator/health`;
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

export const GET = async (): Promise<NextResponse> => {
  if (env.backendUrl === "") {
    return NextResponse.json({ status: "ok" });
  }

  const targetUrl = buildTargetUrl();

  try {
    const data = await fetcher<unknown>(targetUrl, { method: "GET" });
    return respond(data, 200);
  } catch (error) {
    if (error instanceof FetchError) {
      return respond(error.body, error.status);
    }
    return respond({ message: "Proxy request failed." }, 502);
  }
};
