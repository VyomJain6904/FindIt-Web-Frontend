/**
 * Content Security Policy Configuration for FindIt
 */

export interface CSPDirectives {
  'default-src': string[];
  'script-src': string[];
  'style-src': string[];
  'img-src': string[];
  'font-src': string[];
  'connect-src': string[];
  'frame-src': string[];
  'object-src': string[];
  'base-uri': string[];
  'form-action': string[];
  'frame-ancestors': string[];
  'upgrade-insecure-requests'?: boolean;
}

/**
 * Build CSP header string from directives
 */
export function buildCSPHeader(directives: CSPDirectives): string {
  const parts: string[] = [];

  for (const [directive, values] of Object.entries(directives)) {
    if (directive === 'upgrade-insecure-requests') {
      if (values) {
        parts.push('upgrade-insecure-requests');
      }
      continue;
    }

    if (Array.isArray(values) && values.length > 0) {
      parts.push(`${directive} ${values.join(' ')}`);
    }
  }

  return parts.join('; ');
}

/**
 * Default CSP directives for FindIt
 */
export const defaultCSPDirectives: CSPDirectives = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Required for Next.js
  'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  'img-src': ["'self'", 'data:', 'blob:', 'https:'],
  'font-src': ["'self'", 'https://fonts.gstatic.com'],
  'connect-src': [
    "'self'",
    'wss://*.findit.io',
    'ws://localhost:*',
    'https://*.findit.io',
  ],
  'frame-src': ["'none'"],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"],
  'upgrade-insecure-requests': true,
};

/**
 * Get CSP header for production
 */
export function getProductionCSP(): string {
  return buildCSPHeader(defaultCSPDirectives);
}

/**
 * Get CSP header for development (more permissive)
 */
export function getDevelopmentCSP(): string {
  return buildCSPHeader({
    ...defaultCSPDirectives,
    'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
    'connect-src': [
      "'self'",
      'ws://localhost:*',
      'wss://localhost:*',
      'http://localhost:*',
      'https://localhost:*',
    ],
  });
}

/**
 * Get appropriate CSP based on environment
 */
export function getCSP(): string {
  return process.env.NODE_ENV === 'production'
    ? getProductionCSP()
    : getDevelopmentCSP();
}
