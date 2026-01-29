/**
 * Subscription Types for FindIt
 * Defines plan tiers and feature permissions
 */

export type SubscriptionPlan = 'free' | 'pro' | 'enterprise';

export interface SubscriptionFeatures {
  maxScansPerMonth: number;
  modules: ScanModule[];
  exportFormats: ExportFormat[];
  apiAccess: boolean;
  continuousMonitoring: boolean;
  customIntegrations: boolean;
  prioritySupport: boolean;
  teamMembers: number;
}

export type ScanModule =
  | 'subdomain_enum'
  | 'port_scan'
  | 'dns_records'
  | 'tech_detect'
  | 'whois'
  | 'certificate'
  | 'vulnerability_scan'
  | 'directory_bruteforce';

export type ExportFormat = 'json' | 'csv' | 'pdf' | 'html';

export interface UserSubscription {
  plan: SubscriptionPlan;
  features: SubscriptionFeatures;
  expiresAt: Date | null;
  scansUsedThisMonth: number;
  isActive: boolean;
}

export const PLAN_FEATURES: Record<SubscriptionPlan, SubscriptionFeatures> = {
  free: {
    maxScansPerMonth: 5,
    modules: ['subdomain_enum', 'dns_records', 'whois'],
    exportFormats: ['json'],
    apiAccess: false,
    continuousMonitoring: false,
    customIntegrations: false,
    prioritySupport: false,
    teamMembers: 1,
  },
  pro: {
    maxScansPerMonth: -1, // Unlimited
    modules: ['subdomain_enum', 'port_scan', 'dns_records', 'tech_detect', 'whois', 'certificate'],
    exportFormats: ['json', 'csv', 'pdf'],
    apiAccess: false,
    continuousMonitoring: false,
    customIntegrations: false,
    prioritySupport: true,
    teamMembers: 5,
  },
  enterprise: {
    maxScansPerMonth: -1, // Unlimited
    modules: ['subdomain_enum', 'port_scan', 'dns_records', 'tech_detect', 'whois', 'certificate', 'vulnerability_scan', 'directory_bruteforce'],
    exportFormats: ['json', 'csv', 'pdf', 'html'],
    apiAccess: true,
    continuousMonitoring: true,
    customIntegrations: true,
    prioritySupport: true,
    teamMembers: -1, // Unlimited
  },
};

export const PLAN_PRICING: Record<SubscriptionPlan, { monthly: number; yearly: number }> = {
  free: { monthly: 0, yearly: 0 },
  pro: { monthly: 49, yearly: 470 },
  enterprise: { monthly: 199, yearly: 1990 },
};
