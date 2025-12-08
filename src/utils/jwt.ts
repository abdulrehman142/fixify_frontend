/**
 * JWT Token Utilities
 * Decode JWT tokens to extract user information
 */

export interface JWTPayload {
  id: number;
  username: string;
  email: string;
  role: "admin" | "service_provider" | "customer";
  token_version: number;
  exp: number;
}

/**
 * Decode JWT token without verification (client-side only)
 * Note: This doesn't verify the signature - backend always verifies
 */
export function decodeJWT(token: string): JWTPayload | null {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload) as JWTPayload;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}

/**
 * Get user role from JWT token
 */
export function getUserRoleFromToken(
  token: string | null
): "admin" | "service_provider" | "customer" | null {
  if (!token) return null;
  const payload = decodeJWT(token);
  return payload?.role || null;
}

/**
 * Check if token is expired
 */
export function isTokenExpired(token: string | null): boolean {
  if (!token) return true;
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) return true;

  // exp is in seconds, Date.now() is in milliseconds
  return payload.exp * 1000 < Date.now();
}
