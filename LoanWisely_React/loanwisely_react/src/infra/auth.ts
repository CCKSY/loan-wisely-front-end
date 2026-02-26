export const getAccessToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("accessToken");
};

export const getAccessTokenExpiry = (): number | null => {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem("accessTokenExpiresAt");
  if (!raw) return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
};

export const setAccessToken = (token: string, expiresInSeconds?: number): void => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("accessToken", token);
  if (typeof expiresInSeconds === "number") {
    const expiresAt = Date.now() + expiresInSeconds * 1000;
    window.localStorage.setItem("accessTokenExpiresAt", String(expiresAt));
  }
};

export const clearAccessToken = (): void => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("accessTokenExpiresAt");
};
