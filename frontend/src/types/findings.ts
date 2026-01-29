/**
 * Finding types for FindIt API contract
 * JSON-compatible only - string unions for enums
 * Mirrors libs/events
 */

import { ISODateString, BaseEntity } from "./common";

/** Severity levels for findings - string union */
export type FindingSeverity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFO";

/** Categories for findings - string union */
export type FindingCategory =
	| "NETWORK"
	| "WEB"
	| "CLOUD"
	| "CODE"
	| "CONFIGURATION"
	| "CRYPTO"
	| "INJECTION"
	| "XSS"
	| "AUTHENTICATION"
	| "AUTHORIZATION";

/** Finding source - which worker produced it */
export type FindingSource =
	| "SUBDOMAIN"
	| "PORT"
	| "TECH"
	| "HEADERS"
	| "TLS"
	| "NUCLEI"
	| "AI";

/** Red team analysis from AI engine */
export interface RedTeamAnalysis {
	exploitability: string;
	poc?: string;
	attackVector: string;
	stepsToReproduce: string[];
	estimatedImpact: string;
	skillLevel: "LOW" | "MEDIUM" | "HIGH" | "EXPERT";
}

/** Blue team analysis from AI engine */
export interface BlueTeamAnalysis {
	mitigation: string;
	cvssScore?: number;
	cvssVector?: string;
	cveId?: string;
	cweId?: string;
	defenseStrategy: string;
	priority: "IMMEDIATE" | "SHORT_TERM" | "LONG_TERM";
	references?: string[];
}

/** Base finding structure */
export interface Finding extends BaseEntity {
	scanId: string;
	title: string;
	description: string;
	severity: FindingSeverity;
	category: FindingCategory;
	source: FindingSource;
	asset: string;
	port?: number;
	protocol?: string;
	evidence?: string;
	raw?: Record<string, unknown>;
}

/** AI-enhanced finding with analysis */
export interface AIFinding extends Finding {
	aiAnalysis: string;
	confidenceScore: number;
	falsePositiveLikelihood: number;
	redTeamAnalysis: RedTeamAnalysis;
	blueTeamAnalysis: BlueTeamAnalysis;
	relatedFindings?: string[];
	tags?: string[];
}

/** Finding list item - subset for listings */
export interface FindingListItem {
	id: string;
	scanId: string;
	title: string;
	severity: FindingSeverity;
	category: FindingCategory;
	source: FindingSource;
	asset: string;
	createdAt: ISODateString;
	hasAIAnalysis: boolean;
}

/** Finding statistics by severity and category */
export interface FindingStats {
	total: number;
	bySeverity: {
		CRITICAL: number;
		HIGH: number;
		MEDIUM: number;
		LOW: number;
		INFO: number;
	};
	byCategory: {
		WEB: number;
		NETWORK: number;
		CLOUD: number;
		CONFIGURATION: number;
		AUTHENTICATION: number;
	};
}
