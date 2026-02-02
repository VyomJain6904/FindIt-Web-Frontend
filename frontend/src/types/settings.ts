/**
 * Settings Types
 * User profile and preferences definitions
 */

export interface UserProfile {
	id: string;
	name: string;
	email: string;
	createdAt: string;
	lastLoginAt?: string;
}

export interface UserPreferences {
	defaultScanTemplate: "quick" | "full" | "custom";
	resultsViewMode: "table" | "compact";
	theme: "dark";
	emailNotificationsEnabled: boolean;
}

export interface FeatureFlag {
	id: string;
	name: string;
	description: string;
	enabled: boolean;
	tier?: "free" | "pro" | "enterprise";
}
