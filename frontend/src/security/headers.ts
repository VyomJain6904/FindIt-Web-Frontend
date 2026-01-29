/**
 * Security Headers Configuration for FindIt
 */

import { getCSP } from './csp';

export interface SecurityHeaders {
  'Content-Security-Policy': string;
  'X-Content-Type-Options': string;
  'X-Frame-Options': string;
  'X-XSS-Protection': string;
  'Referrer-Policy': string;
  'Permissions-Policy': string;
  'Strict-Transport-Security'?: string;
}

/**
 * Get security headers for response
 */
export function getSecurityHeaders(): SecurityHeaders {
  const headers: SecurityHeaders = {
    'Content-Security-Policy': getCSP(),
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  };

  // Add HSTS in production
  if (process.env.NODE_ENV === 'production') {
    headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload';
  }

  return headers;
}

/**
 * Apply security headers to Next.js response
 */
export function applySecurityHeaders(headers: Headers): void {
  const securityHeaders = getSecurityHeaders();

  for (const [key, value] of Object.entries(securityHeaders)) {
    if (value) {
      headers.set(key, value);
    }
  }
}

/**
 * Security headers as array format for next.config
 */
export function getSecurityHeadersArray(): Array<{ key: string; value: string }> {
  const headers = getSecurityHeaders();

  return Object.entries(headers)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => ({ key, value: value as string }));
}
