/**
 * WebSocket Event Types for FindIt
 */

export type ScanEventType =
  | 'scan_started'
  | 'scan_progress'
  | 'scan_result'
  | 'scan_completed'
  | 'scan_error'
  | 'scan_cancelled';

export type ResultEventCategory =
  | 'dns'
  | 'subdomain'
  | 'port'
  | 'tech'
  | 'whois'
  | 'certificate'
  | 'vulnerability'
  | 'directory'
  | 'error'
  | 'info'
  | 'success'
  | 'warning';

export interface ScanEvent {
  type: ScanEventType;
  scanId: string;
  timestamp: Date;
  data: ScanEventData;
}

export interface ScanEventData {
  category?: ResultEventCategory;
  message: string;
  progress?: number;
  result?: ScanResultEvent;
  error?: string;
}

export interface ScanResultEvent {
  module: string;
  type: string;
  value: string;
  metadata?: Record<string, unknown>;
  severity?: 'info' | 'low' | 'medium' | 'high' | 'critical';
}

/**
 * Terminal Line representation for UI
 */
export interface TerminalLine {
  id: string;
  timestamp: Date;
  category: ResultEventCategory;
  message: string;
  metadata?: Record<string, unknown>;
}

/**
 * Map event category to terminal color class
 */
export const CATEGORY_COLOR_MAP: Record<ResultEventCategory, string> = {
  dns: 'terminal-line-dns',
  subdomain: 'terminal-line-subdomain',
  port: 'terminal-line-port',
  tech: 'terminal-line-tech',
  whois: 'terminal-line-info',
  certificate: 'terminal-line-info',
  vulnerability: 'terminal-line-warning',
  directory: 'terminal-line-success',
  error: 'terminal-line-error',
  info: 'terminal-line-info',
  success: 'terminal-line-success',
  warning: 'terminal-line-warning',
};
