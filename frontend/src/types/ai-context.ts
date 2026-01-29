/**
 * AI Context types for perspective-aware rendering
 * These fields are ONLY present when backend provides them
 */

/** Attacker perspective context */
export interface AttackerContext {
	exposureValue?: string;
	attackSurface?: string;
	exploitability?: string;
	chainOpportunities?: string[];
	targetValue?: "high" | "medium" | "low";
	attackNarrative?: string;
}

/** Defender perspective context */
export interface DefenderContext {
	remediationPriority?: "critical" | "high" | "medium" | "low";
	hardeningRecommendation?: string;
	monitoringGap?: string;
	complianceImpact?: string;
	detectionStrategy?: string;
	patchingRelevance?: string;
}

/** AI context wrapper - optional on all results */
export interface AIContext {
	attacker?: AttackerContext;
	defender?: DefenderContext;
}

/** Extended subdomain result with optional AI context */
export interface SubdomainResultWithAI {
	subdomain: string;
	ip?: string;
	alive: boolean;
	resolvedAt?: string;
	ai?: AIContext;
}

/** Extended port result with optional AI context */
export interface PortResultWithAI {
	port: number;
	protocol: string;
	service?: string;
	version?: string;
	state: "open" | "closed" | "filtered";
	ai?: AIContext;
}

/** Extended tech result with optional AI context */
export interface TechResultWithAI {
	technology: string;
	category: string;
	version?: string;
	confidence?: number;
	ai?: AIContext;
}

/** Extended header result with optional AI context */
export interface HeaderResultWithAI {
	name: string;
	value?: string;
	present: boolean;
	secure?: boolean;
	ai?: AIContext;
}

/** Extended TLS result with optional AI context */
export interface TLSResultWithAI {
	version: string;
	issuer: string;
	subject: string;
	expiry: string;
	valid: boolean;
	daysUntilExpiry?: number;
	ai?: AIContext;
}

/** Extended nuclei result with optional AI context */
export interface NucleiResultWithAI {
	templateId: string;
	severity: string;
	matchedUrl: string;
	evidence?: string;
	tags?: string[];
	ai?: AIContext;
}

/** Extended directory result with optional AI context */
export interface DirectoryResultWithAI {
	path: string;
	statusCode: number;
	contentLength?: number;
	contentType?: string;
	redirectUrl?: string;
	ai?: AIContext;
}
