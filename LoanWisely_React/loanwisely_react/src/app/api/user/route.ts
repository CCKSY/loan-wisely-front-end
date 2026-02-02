 import { NextResponse } from "next/server";

 import { env } from "@/lib/env";
 import { FetchError, fetcher } from "@/lib/fetcher";

const buildTargetUrl = (requestUrl: string): string => {
  const incoming = new URL(requestUrl);
  return `${env.userApiUrl}${incoming.search}`;
};

const mockResponse = (method: "GET" | "POST"): NextResponse => {
  if (method === "GET") {
    return NextResponse.json({ profile: { id: "demo", name: "Demo", email: "" } });
  }
  return NextResponse.json({ ok: true });
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

 const proxyRequest = async (
   request: Request,
   method: "GET" | "POST",
 ): Promise<NextResponse> => {
  if (env.userApiUrl === "") {
    return mockResponse(method);
  }

  const targetUrl = buildTargetUrl(request.url);
   const headers = forwardHeaders(request);
   const body = method === "POST" ? await request.text() : undefined;

   try {
     const data = await fetcher<unknown>(targetUrl, {
       method,
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

 export const GET = async (request: Request): Promise<NextResponse> =>
   proxyRequest(request, "GET");

 export const POST = async (request: Request): Promise<NextResponse> =>
   proxyRequest(request, "POST");
