/**
 * Input Sanitization Module for FindIt
 * Uses Zod for validation and DOMPurify patterns for HTML sanitization
 */

import { z } from 'zod';

/**
 * Sanitize string to prevent XSS
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Sanitize URL to prevent javascript: and data: attacks
 */
export function sanitizeUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return null;
    }
    return parsed.href;
  } catch {
    return null;
  }
}

/**
 * Domain validation schema
 */
export const domainSchema = z.string()
  .min(1, 'Domain is required')
  .max(253, 'Domain too long')
  .regex(
    /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
    'Invalid domain format'
  );

/**
 * Scan configuration validation schema
 */
export const scanConfigSchema = z.object({
  target: domainSchema,
  modules: z.array(z.enum([
    'subdomain_enum',
    'port_scan',
    'dns_records',
    'tech_detect',
    'whois',
    'certificate',
    'vulnerability_scan',
    'directory_bruteforce',
  ])).min(1, 'Select at least one module'),
  depth: z.enum(['quick', 'standard', 'deep']).optional().default('standard'),
  timeout: z.number().min(30).max(3600).optional().default(300),
});

/**
 * User input validation schema
 */
export const userInputSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
});

/**
 * Sanitize object by escaping all string values
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(item =>
        typeof item === 'string' ? sanitizeString(item) : item
      );
    } else if (value && typeof value === 'object') {
      sanitized[key] = sanitizeObject(value as Record<string, unknown>);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized as T;
}

export type ScanConfig = z.infer<typeof scanConfigSchema>;
export type UserInput = z.infer<typeof userInputSchema>;
