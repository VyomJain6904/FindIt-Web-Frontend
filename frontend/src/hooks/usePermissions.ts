"use client";

import { useMemo } from 'react';
import type { SubscriptionPlan, ScanModule, ExportFormat, PLAN_FEATURES } from '@/types/subscription';

// Mock subscription state - replace with actual auth context
const mockSubscription = {
  plan: 'free' as SubscriptionPlan,
  scansUsedThisMonth: 2,
};

interface UsePermissionsReturn {
  plan: SubscriptionPlan;
  canScan: boolean;
  canUseModule: (module: ScanModule) => boolean;
  canExport: (format: ExportFormat) => boolean;
  hasApiAccess: boolean;
  hasContinuousMonitoring: boolean;
  remainingScans: number;
  isFeatureLocked: (feature: string) => boolean;
  getUpgradeMessage: (feature: string) => string;
}

const PLAN_FEATURES_MAP: Record<SubscriptionPlan, {
  maxScansPerMonth: number;
  modules: ScanModule[];
  exportFormats: ExportFormat[];
  apiAccess: boolean;
  continuousMonitoring: boolean;
}> = {
  free: {
    maxScansPerMonth: 5,
    modules: ['subdomain_enum', 'dns_records', 'whois'],
    exportFormats: ['json'],
    apiAccess: false,
    continuousMonitoring: false,
  },
  pro: {
    maxScansPerMonth: -1,
    modules: ['subdomain_enum', 'port_scan', 'dns_records', 'tech_detect', 'whois', 'certificate'],
    exportFormats: ['json', 'csv', 'pdf'],
    apiAccess: false,
    continuousMonitoring: false,
  },
  enterprise: {
    maxScansPerMonth: -1,
    modules: ['subdomain_enum', 'port_scan', 'dns_records', 'tech_detect', 'whois', 'certificate', 'vulnerability_scan', 'directory_bruteforce'],
    exportFormats: ['json', 'csv', 'pdf', 'html'],
    apiAccess: true,
    continuousMonitoring: true,
  },
};

export function usePermissions(): UsePermissionsReturn {
  // TODO: Replace with actual subscription context
  const { plan, scansUsedThisMonth } = mockSubscription;

  const features = PLAN_FEATURES_MAP[plan];

  const permissions = useMemo(() => {
    const maxScans = features.maxScansPerMonth;
    const remainingScans = maxScans === -1 ? Infinity : Math.max(0, maxScans - scansUsedThisMonth);

    return {
      plan,
      canScan: remainingScans > 0,
      canUseModule: (module: ScanModule): boolean => {
        return features.modules.includes(module);
      },
      canExport: (format: ExportFormat): boolean => {
        return features.exportFormats.includes(format);
      },
      hasApiAccess: features.apiAccess,
      hasContinuousMonitoring: features.continuousMonitoring,
      remainingScans: remainingScans === Infinity ? -1 : remainingScans,
      isFeatureLocked: (feature: string): boolean => {
        switch (feature) {
          case 'api':
            return !features.apiAccess;
          case 'continuous_monitoring':
            return !features.continuousMonitoring;
          case 'pdf_export':
            return !features.exportFormats.includes('pdf');
          case 'vulnerability_scan':
            return !features.modules.includes('vulnerability_scan');
          default:
            return false;
        }
      },
      getUpgradeMessage: (feature: string): string => {
        switch (feature) {
          case 'api':
            return 'API access is available on Enterprise plan';
          case 'continuous_monitoring':
            return 'Continuous monitoring is available on Enterprise plan';
          case 'pdf_export':
            return 'PDF export is available on Pro and Enterprise plans';
          case 'vulnerability_scan':
            return 'Vulnerability scanning is available on Enterprise plan';
          case 'scans':
            return 'Upgrade to Pro for unlimited scans';
          default:
            return 'Upgrade your plan to access this feature';
        }
      },
    };
  }, [plan, features, scansUsedThisMonth]);

  return permissions;
}
