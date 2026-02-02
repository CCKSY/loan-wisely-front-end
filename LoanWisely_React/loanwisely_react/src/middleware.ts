import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const middleware = (_request: NextRequest) => NextResponse.next();
