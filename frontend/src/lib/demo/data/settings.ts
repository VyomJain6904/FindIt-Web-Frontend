/**
 * Demo Data - Settings
 * Mock user profile and preferences for demo mode
 */

import type {
	UserProfile,
	UserPreferences,
	FeatureFlag,
} from "@/types/settings";

export const DEMO_USER_PROFILE: UserProfile = {
	id: "demo-user-001",
	name: "Demo User",
	email: "demo@findit.security",
	createdAt: "2026-01-01T00:00:00Z",
	lastLoginAt: "2026-02-03T12:00:00Z",
};

export const DEMO_USER_PREFERENCES: UserPreferences = {
	defaultScanTemplate: "quick",
	resultsViewMode: "table",
	theme: "dark",
	emailNotificationsEnabled: true,
};

export const DEMO_SETTINGS_FEATURES: FeatureFlag[] = [
	{
		id: "subdomain_enum",
		name: "Subdomain Enumeration",
		description: "Discover subdomains via DNS and OSINT",
		enabled: true,
		tier: "free",
	},
	{
		id: "dns_records",
		name: "Headers Analysis",
		description: "Analyze HTTP security headers",
		enabled: true,
		tier: "free",
	},
	{
		id: "port_scan",
		name: "Port Scanning",
		description: "Identify open ports and services",
		enabled: true,
		tier: "pro",
	},
	{
		id: "tech_detect",
		name: "Technology Detection",
		description: "Identify web technologies in use",
		enabled: true,
		tier: "pro",
	},
	{
		id: "certificate",
		name: "TLS Analysis",
		description: "Validate SSL/TLS configuration",
		enabled: true,
		tier: "pro",
	},
	{
		id: "vulnerability_scan",
		name: "Vulnerability Scan",
		description: "AI-powered vulnerability detection",
		enabled: true,
		tier: "enterprise",
	},
	{
		id: "directory_bruteforce",
		name: "Directory Bruteforce",
		description: "Discover hidden paths and files",
		enabled: true,
		tier: "enterprise",
	},
	{
		id: "cloud_enum",
		name: "Cloud Enumeration",
		description: "Find exposed cloud assets",
		enabled: true,
		tier: "enterprise",
	},
	{
		id: "api_access",
		name: "API Access",
		description: "Programmatic access via REST API",
		enabled: true,
		tier: "enterprise",
	},
	{
		id: "continuous_monitoring",
		name: "Continuous Monitoring",
		description: "Scheduled recurring scans",
		enabled: true,
		tier: "enterprise",
	},
];
