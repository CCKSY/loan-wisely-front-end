// Shared fetcher with timeout and error handling.
 import { env } from "./env";

 export class FetchError extends Error {
   status: number;
   body: unknown;

   constructor(status: number, body: unknown) {
     super(`Request failed with status ${status}`);
     this.status = status;
     this.body = body;
   }
 }

 type FetcherOptions = Omit<RequestInit, "signal"> & {
   timeoutMs?: number;
 };

 const parseBody = async (response: Response): Promise<unknown> => {
   const contentType = response.headers.get("content-type") ?? "";
   if (contentType.includes("application/json")) {
     return response.json();
   }
   return response.text();
 };

 export const fetcher = async <T>(
   input: RequestInfo | URL,
   options: FetcherOptions = {},
 ): Promise<T> => {
   const controller = new AbortController();
   const timeoutMs = options.timeoutMs ?? env.requestTimeoutMs;
   const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

   try {
     const response = await fetch(input, {
       ...options,
       signal: controller.signal,
     });
     const body = await parseBody(response);

     if (!response.ok) {
       throw new FetchError(response.status, body);
     }

     return body as T;
   } finally {
     clearTimeout(timeoutId);
   }
 };


