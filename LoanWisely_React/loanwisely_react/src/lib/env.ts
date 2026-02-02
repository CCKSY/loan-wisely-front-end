 type NodeEnv = "development" | "production" | "test";

 const normalizeNodeEnv = (value?: string): NodeEnv => {
   if (value === "production" || value === "test") {
     return value;
   }
   return "development";
 };

const required = (key: string): string => {
  const value = process.env[key];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

const optional = (key: string): string => {
  const value = process.env[key];
  if (typeof value !== "string") {
    return "";
  }
  return value.trim();
};

const numberFromEnv = (key: string, fallback: number): number => {
  const raw = process.env[key];
  if (typeof raw !== "string" || raw.trim() === "") {
    return fallback;
  }
   const parsed = Number(raw);
   if (!Number.isFinite(parsed) || parsed <= 0) {
     return fallback;
   }
   return parsed;
 };

export const env = {
  nodeEnv: normalizeNodeEnv(process.env.NODE_ENV),
  recommendApiBaseUrl: optional("RECOMMEND_API_BASE_URL"),
  userApiUrl: optional("USER_API_URL"),
  consentApiBaseUrl: optional("CONSENT_API_BASE_URL"),
  requestTimeoutMs: numberFromEnv("REQUEST_TIMEOUT_MS", 10000),
};
