/**
 * Demo Data - Scans
 * Contract-valid fake scan data for demo mode
 */

import type {
	ScanState,
	WorkerState,
	ScanLogPayload,
	ScanProgressPayload,
} from "@/types";
import type {
	SubdomainResultWithAI,
	PortResultWithAI,
	TechResultWithAI,
	HeaderResultWithAI,
	TLSResultWithAI,
	NucleiResultWithAI,
	DirectoryResultWithAI,
} from "@/types/ai-context";
import type { CloudResultWithAI } from "@/types/cloud";

export const DEMO_SCAN_STATE: ScanState = {
	id: "scan-demo-001",
	target: "api.acme-corp.com",
	status: "RUNNING",
	type: "FULL",
	progress: 67,
	startedAt: "2026-01-27T10:00:00Z",
	findingCount: 8,
	createdAt: "2026-01-27T10:00:00Z",
	workers: [
		{
			workerId: "subdomain-worker",
			type: "SUBDOMAIN",
			status: "COMPLETED",
			progress: 100,
		},
		{
			workerId: "port-worker",
			type: "PORT",
			status: "COMPLETED",
			progress: 100,
		},
		{
			workerId: "tech-worker",
			type: "TECH",
			status: "RUNNING",
			progress: 75,
		},
		{
			workerId: "headers-worker",
			type: "HEADERS",
			status: "COMPLETED",
			progress: 100,
		},
		{
			workerId: "tls-worker",
			type: "TLS",
			status: "COMPLETED",
			progress: 100,
		},
		{
			workerId: "directory-worker",
			type: "DIRECTORY",
			status: "COMPLETED",
			progress: 100,
		},
		{
			workerId: "nuclei-worker",
			type: "NUCLEI",
			status: "RUNNING",
			progress: 42,
		},
		{
			workerId: "cloud-worker",
			type: "CLOUD",
			status: "COMPLETED",
			progress: 100,
		},
	],
};

export const DEMO_SCAN_PROGRESS: ScanProgressPayload = {
	scanId: "scan-demo-001",
	progress: 67,
	status: "RUNNING",
	workersCompleted: 4,
	workersTotal: 6,
};

export const DEMO_SUBDOMAINS: SubdomainResultWithAI[] = [
	{
		subdomain: "api.acme-corp.com",
		ip: "52.12.34.56",
		alive: true,
		ai: {
			attacker: {
				exposureValue: "Public API endpoint",
				attackSurface: "REST API with authentication",
			},
			defender: { monitoringGap: "No rate limiting detected" },
		},
	},
	{
		subdomain: "app.acme-corp.com",
		ip: "52.12.34.57",
		alive: true,
		ai: {
			attacker: { exposureValue: "Main application" },
			defender: { hardeningRecommendation: "Enable WAF" },
		},
	},
	{
		subdomain: "staging.acme-corp.com",
		ip: "52.12.34.58",
		alive: true,
		ai: {
			attacker: {
				exposureValue: "Staging environment exposed",
				attackSurface: "Non-production data",
			},
			defender: { monitoringGap: "Should be internal only" },
		},
	},
	{
		subdomain: "admin.acme-corp.com",
		ip: "52.12.34.59",
		alive: true,
		ai: {
			attacker: {
				exposureValue: "Admin panel",
				attackSurface: "High-value target",
			},
			defender: { hardeningRecommendation: "Restrict to VPN" },
		},
	},
	{ subdomain: "mail.acme-corp.com", ip: "52.12.34.60", alive: true },
	{ subdomain: "vpn.acme-corp.com", ip: "52.12.34.61", alive: true },
	{ subdomain: "dev.acme-corp.com", ip: undefined, alive: false },
	{ subdomain: "test.acme-corp.com", ip: undefined, alive: false },
];

export const DEMO_PORTS: PortResultWithAI[] = [
	{
		port: 22,
		protocol: "tcp",
		service: "SSH",
		version: "OpenSSH 8.9",
		state: "open",
		ai: {
			attacker: { exposureValue: "Remote access" },
			defender: { hardeningRecommendation: "Key-only auth" },
		},
	},
	{
		port: 80,
		protocol: "tcp",
		service: "HTTP",
		state: "open",
		ai: {
			attacker: { exposureValue: "Unencrypted traffic" },
			defender: {
				remediationPriority: "medium",
				hardeningRecommendation: "Redirect to HTTPS",
			},
		},
	},
	{
		port: 443,
		protocol: "tcp",
		service: "HTTPS",
		version: "nginx/1.24",
		state: "open",
	},
	{
		port: 3306,
		protocol: "tcp",
		service: "MySQL",
		version: "8.0.32",
		state: "open",
		ai: {
			attacker: {
				exposureValue: "Database exposed",
				exploitability: "Credential brute force",
			},
			defender: {
				remediationPriority: "critical",
				hardeningRecommendation: "Restrict to internal network",
			},
		},
	},
	{
		port: 6379,
		protocol: "tcp",
		service: "Redis",
		version: "7.0.8",
		state: "open",
		ai: {
			attacker: {
				exposureValue: "Cache server",
				exploitability: "No auth required",
			},
			defender: { remediationPriority: "high" },
		},
	},
	{ port: 8080, protocol: "tcp", service: "HTTP-Alt", state: "open" },
];

export const DEMO_TECHNOLOGIES: TechResultWithAI[] = [
	{
		technology: "nginx",
		category: "Web Server",
		version: "1.24",
		ai: {
			attacker: { attackSurface: "Well-known CVEs" },
			defender: { patchingRelevance: "Keep updated" },
		},
	},
	{ technology: "React", category: "JavaScript Framework", version: "18.2" },
	{ technology: "Node.js", category: "Runtime", version: "20.10" },
	{
		technology: "PostgreSQL",
		category: "Database",
		version: "15.4",
		ai: { defender: { patchingRelevance: "Critical component" } },
	},
	{ technology: "Redis", category: "Cache", version: "7.0.8" },
	{ technology: "Docker", category: "Container", version: "24.0" },
	{ technology: "Kubernetes", category: "Orchestration", version: "1.28" },
	{ technology: "AWS", category: "Cloud Provider" },
];

export const DEMO_HEADERS: HeaderResultWithAI[] = [
	{ name: "Strict-Transport-Security", present: true, secure: true },
	{ name: "X-Content-Type-Options", present: true, secure: true },
	{ name: "X-Frame-Options", present: true, secure: true },
	{
		name: "Content-Security-Policy",
		present: false,
		ai: {
			attacker: { exposureValue: "XSS possible" },
			defender: { hardeningRecommendation: "Implement CSP header" },
		},
	},
	{
		name: "X-XSS-Protection",
		present: false,
		ai: {
			defender: {
				hardeningRecommendation: "Add X-XSS-Protection: 1; mode=block",
			},
		},
	},
	{ name: "Referrer-Policy", present: false },
	{ name: "Permissions-Policy", present: false },
];

export const DEMO_TLS: TLSResultWithAI[] = [
	{
		version: "TLS 1.3",
		issuer: "Let's Encrypt Authority X3",
		subject: "*.acme-corp.com",
		expiry: "2026-04-15T00:00:00Z",
		valid: true,
		daysUntilExpiry: 78,
	},
];

export const DEMO_NUCLEI: NucleiResultWithAI[] = [
	{
		templateId: "CVE-2023-44487",
		severity: "HIGH",
		matchedUrl: "https://api.acme-corp.com/",
		evidence: "HTTP/2 Rapid Reset vulnerability detected",
		tags: ["cve", "http2", "dos"],
		ai: {
			attacker: {
				attackNarrative: "Denial of service via HTTP/2 stream reset",
				exploitability: "Low skill required",
				chainOpportunities: [
					"Service disruption",
					"Resource exhaustion",
				],
			},
			defender: {
				hardeningRecommendation:
					"Update web server and enable rate limiting",
				remediationPriority: "high",
				detectionStrategy: "Monitor for rapid stream resets",
			},
		},
	},
	{
		templateId: "exposed-docker-api",
		severity: "CRITICAL",
		matchedUrl: "https://api.acme-corp.com:2375/",
		evidence: "Docker API accessible without authentication",
		tags: ["docker", "misconfig", "rce"],
		ai: {
			attacker: {
				attackNarrative:
					"Full container escape and host takeover possible",
				exploitability: "Trivial",
				chainOpportunities: [
					"Container escape",
					"Lateral movement",
					"Data exfiltration",
				],
			},
			defender: {
				hardeningRecommendation:
					"Disable Docker API or require TLS client auth",
				remediationPriority: "critical",
				detectionStrategy: "Alert on external Docker API access",
			},
		},
	},
	{
		templateId: "missing-csp-header",
		severity: "MEDIUM",
		matchedUrl: "https://app.acme-corp.com/",
		evidence: "Content-Security-Policy header not set",
		tags: ["header", "xss"],
		ai: {
			defender: {
				hardeningRecommendation: "Implement strict CSP policy",
				remediationPriority: "medium",
			},
		},
	},
];

export const DEMO_LOGS: ScanLogPayload[] = [
	// === SCAN INITIALIZATION ===
	{
		scanId: "scan-demo-001",
		source: "scan-orchestrator",
		level: "INFO",
		message: "Initializing scan for api.acme-corp.com",
		timestamp: "2026-01-27T10:00:00Z",
	},
	{
		scanId: "scan-demo-001",
		source: "scan-orchestrator",
		level: "INFO",
		message: "Validating target domain...",
		timestamp: "2026-01-27T10:00:01Z",
	},
	{
		scanId: "scan-demo-001",
		source: "scan-orchestrator",
		level: "INFO",
		message: "Target validation successful. Resolves to 203.0.113.42",
		timestamp: "2026-01-27T10:00:02Z",
	},
	{
		scanId: "scan-demo-001",
		source: "scan-orchestrator",
		level: "INFO",
		message: "Loading scan configuration (template: FULL)",
		timestamp: "2026-01-27T10:00:03Z",
	},

	// === WORKER STARTUP ===
	{
		scanId: "scan-demo-001",
		source: "scan-orchestrator",
		level: "INFO",
		message: "Starting 8 workers...",
		timestamp: "2026-01-27T10:00:05Z",
	},
	{
		scanId: "scan-demo-001",
		source: "subdomain-worker",
		level: "INFO",
		message: "subdomain-worker started",
		timestamp: "2026-01-27T10:00:06Z",
	},
	{
		scanId: "scan-demo-001",
		source: "port-worker",
		level: "INFO",
		message: "port-worker started",
		timestamp: "2026-01-27T10:00:07Z",
	},
	{
		scanId: "scan-demo-001",
		source: "headers-worker",
		level: "INFO",
		message: "headers-worker started",
		timestamp: "2026-01-27T10:00:08Z",
	},
	{
		scanId: "scan-demo-001",
		source: "tls-worker",
		level: "INFO",
		message: "tls-worker started",
		timestamp: "2026-01-27T10:00:09Z",
	},
	{
		scanId: "scan-demo-001",
		source: "directory-worker",
		level: "INFO",
		message: "directory-worker started",
		timestamp: "2026-01-27T10:00:10Z",
	},
	{
		scanId: "scan-demo-001",
		source: "cloud-worker",
		level: "INFO",
		message: "cloud-worker started",
		timestamp: "2026-01-27T10:00:11Z",
	},
	{
		scanId: "scan-demo-001",
		source: "nuclei-worker",
		level: "INFO",
		message: "nuclei-worker started",
		timestamp: "2026-01-27T10:00:12Z",
	},
	{
		scanId: "scan-demo-001",
		source: "tech-worker",
		level: "INFO",
		message: "tech-worker started",
		timestamp: "2026-01-27T10:00:13Z",
	},

	// === SUBDOMAIN WORKER PROGRESS ===
	{
		scanId: "scan-demo-001",
		source: "subdomain-worker",
		level: "INFO",
		message: "Enumerating subdomains via DNS brute-force...",
		timestamp: "2026-01-27T10:00:20Z",
	},
	{
		scanId: "scan-demo-001",
		source: "subdomain-worker",
		level: "INFO",
		message: "Querying certificate transparency logs...",
		timestamp: "2026-01-27T10:00:45Z",
	},
	{
		scanId: "scan-demo-001",
		source: "subdomain-worker",
		level: "INFO",
		message: "Found subdomain: api.acme-corp.com",
		timestamp: "2026-01-27T10:01:00Z",
	},
	{
		scanId: "scan-demo-001",
		source: "subdomain-worker",
		level: "INFO",
		message: "Found subdomain: staging.acme-corp.com",
		timestamp: "2026-01-27T10:01:15Z",
	},
	{
		scanId: "scan-demo-001",
		source: "subdomain-worker",
		level: "INFO",
		message: "Found subdomain: admin.acme-corp.com",
		timestamp: "2026-01-27T10:01:30Z",
	},
	{
		scanId: "scan-demo-001",
		source: "subdomain-worker",
		level: "INFO",
		message: "subdomain-worker finished. 8 subdomains found.",
		timestamp: "2026-01-27T10:02:30Z",
	},

	// === PORT WORKER PROGRESS ===
	{
		scanId: "scan-demo-001",
		source: "port-worker",
		level: "INFO",
		message: "Scanning ports on 8 discovered hosts...",
		timestamp: "2026-01-27T10:02:35Z",
	},
	{
		scanId: "scan-demo-001",
		source: "port-worker",
		level: "INFO",
		message: "Detected open port 443 (HTTPS) on api.acme-corp.com",
		timestamp: "2026-01-27T10:03:00Z",
	},
	{
		scanId: "scan-demo-001",
		source: "port-worker",
		level: "INFO",
		message: "Detected open port 80 (HTTP) on api.acme-corp.com",
		timestamp: "2026-01-27T10:03:30Z",
	},
	{
		scanId: "scan-demo-001",
		source: "port-worker",
		level: "WARN",
		message: "Port 3306 (MySQL) exposed to internet on db.acme-corp.com",
		timestamp: "2026-01-27T10:04:00Z",
	},
	{
		scanId: "scan-demo-001",
		source: "port-worker",
		level: "WARN",
		message: "Port 22 (SSH) exposed to internet on admin.acme-corp.com",
		timestamp: "2026-01-27T10:04:30Z",
	},
	{
		scanId: "scan-demo-001",
		source: "port-worker",
		level: "INFO",
		message: "port-worker finished. 6 open ports found.",
		timestamp: "2026-01-27T10:05:00Z",
	},

	// === HEADERS WORKER PROGRESS ===
	{
		scanId: "scan-demo-001",
		source: "headers-worker",
		level: "INFO",
		message: "Analyzing HTTP security headers...",
		timestamp: "2026-01-27T10:05:05Z",
	},
	{
		scanId: "scan-demo-001",
		source: "headers-worker",
		level: "WARN",
		message: "Missing X-Frame-Options header on api.acme-corp.com",
		timestamp: "2026-01-27T10:05:20Z",
	},
	{
		scanId: "scan-demo-001",
		source: "headers-worker",
		level: "WARN",
		message: "Missing Content-Security-Policy header on api.acme-corp.com",
		timestamp: "2026-01-27T10:05:35Z",
	},
	{
		scanId: "scan-demo-001",
		source: "headers-worker",
		level: "INFO",
		message: "headers-worker finished. 4 issues found.",
		timestamp: "2026-01-27T10:06:00Z",
	},

	// === TLS WORKER PROGRESS ===
	{
		scanId: "scan-demo-001",
		source: "tls-worker",
		level: "INFO",
		message: "Checking TLS/SSL configurations...",
		timestamp: "2026-01-27T10:06:05Z",
	},
	{
		scanId: "scan-demo-001",
		source: "tls-worker",
		level: "INFO",
		message: "TLS certificate valid for 78 days (expires 2026-04-15)",
		timestamp: "2026-01-27T10:06:30Z",
	},
	{
		scanId: "scan-demo-001",
		source: "tls-worker",
		level: "WARN",
		message: "TLS 1.0 still enabled on staging.acme-corp.com",
		timestamp: "2026-01-27T10:06:45Z",
	},
	{
		scanId: "scan-demo-001",
		source: "tls-worker",
		level: "INFO",
		message: "tls-worker finished. 1 issue found.",
		timestamp: "2026-01-27T10:07:00Z",
	},

	// === DIRECTORY WORKER PROGRESS ===
	{
		scanId: "scan-demo-001",
		source: "directory-worker",
		level: "INFO",
		message: "Bruteforcing directories using wordlist (10000 entries)...",
		timestamp: "2026-01-27T10:07:05Z",
	},
	{
		scanId: "scan-demo-001",
		source: "directory-worker",
		level: "INFO",
		message: "Found /admin (200 OK) - 4521 bytes",
		timestamp: "2026-01-27T10:08:00Z",
	},
	{
		scanId: "scan-demo-001",
		source: "directory-worker",
		level: "INFO",
		message: "Found /api/internal/debug (200 OK) - 892 bytes",
		timestamp: "2026-01-27T10:08:30Z",
	},
	{
		scanId: "scan-demo-001",
		source: "directory-worker",
		level: "INFO",
		message: "Found /.git/config (200 OK) - 256 bytes",
		timestamp: "2026-01-27T10:09:00Z",
	},
	{
		scanId: "scan-demo-001",
		source: "directory-worker",
		level: "INFO",
		message: "directory-worker finished. 5 directories found.",
		timestamp: "2026-01-27T10:10:00Z",
	},

	// === CLOUD WORKER PROGRESS ===
	{
		scanId: "scan-demo-001",
		source: "cloud-worker",
		level: "INFO",
		message: "Enumerating cloud assets (AWS, GCP, Azure)...",
		timestamp: "2026-01-27T10:10:05Z",
	},
	{
		scanId: "scan-demo-001",
		source: "cloud-worker",
		level: "INFO",
		message: "Found S3 bucket: acme-corp-backups.s3.amazonaws.com",
		timestamp: "2026-01-27T10:10:30Z",
	},
	{
		scanId: "scan-demo-001",
		source: "cloud-worker",
		level: "WARN",
		message: "S3 bucket acme-corp-logs has public read access",
		timestamp: "2026-01-27T10:11:00Z",
	},
	{
		scanId: "scan-demo-001",
		source: "cloud-worker",
		level: "INFO",
		message: "cloud-worker finished. 3 cloud assets found.",
		timestamp: "2026-01-27T10:11:30Z",
	},

	// === TECH WORKER PROGRESS ===
	{
		scanId: "scan-demo-001",
		source: "tech-worker",
		level: "INFO",
		message: "Fingerprinting web technologies...",
		timestamp: "2026-01-27T10:11:35Z",
	},
	{
		scanId: "scan-demo-001",
		source: "tech-worker",
		level: "INFO",
		message: "Detected: nginx/1.21.6, Node.js, React, PostgreSQL",
		timestamp: "2026-01-27T10:12:00Z",
	},
	{
		scanId: "scan-demo-001",
		source: "tech-worker",
		level: "INFO",
		message: "tech-worker finished. 8 technologies detected.",
		timestamp: "2026-01-27T10:12:30Z",
	},

	// === NUCLEI WORKER PROGRESS ===
	{
		scanId: "scan-demo-001",
		source: "nuclei-worker",
		level: "INFO",
		message: "Running 2,847 vulnerability templates...",
		timestamp: "2026-01-27T10:12:35Z",
	},
	{
		scanId: "scan-demo-001",
		source: "nuclei-worker",
		level: "INFO",
		message: "Templates loaded: CVEs, misconfigurations, exposures",
		timestamp: "2026-01-27T10:12:40Z",
	},
	{
		scanId: "scan-demo-001",
		source: "nuclei-worker",
		level: "INFO",
		message: "Scanning endpoint: api.acme-corp.com...",
		timestamp: "2026-01-27T10:13:00Z",
	},
	{
		scanId: "scan-demo-001",
		source: "nuclei-worker",
		level: "WARN",
		message: "Detected: exposed-git-config on api.acme-corp.com",
		timestamp: "2026-01-27T10:14:00Z",
	},
	{
		scanId: "scan-demo-001",
		source: "nuclei-worker",
		level: "ERROR",
		message: "CRITICAL: docker-api-exposed on staging.acme-corp.com:2375",
		timestamp: "2026-01-27T10:15:00Z",
	},
	{
		scanId: "scan-demo-001",
		source: "nuclei-worker",
		level: "WARN",
		message: "Detected: wordpress-debug-log on blog.acme-corp.com",
		timestamp: "2026-01-27T10:15:30Z",
	},
	{
		scanId: "scan-demo-001",
		source: "nuclei-worker",
		level: "INFO",
		message: "nuclei-worker finished. 8 vulnerabilities found.",
		timestamp: "2026-01-27T10:16:00Z",
	},

	// === SCAN COMPLETION ===
	{
		scanId: "scan-demo-001",
		source: "scan-orchestrator",
		level: "INFO",
		message: "All workers completed. Aggregating results...",
		timestamp: "2026-01-27T10:16:05Z",
	},
	{
		scanId: "scan-demo-001",
		source: "scan-orchestrator",
		level: "INFO",
		message: "Generating AI-powered analysis...",
		timestamp: "2026-01-27T10:16:10Z",
	},
	{
		scanId: "scan-demo-001",
		source: "scan-orchestrator",
		level: "INFO",
		message: "Scan completed successfully. Duration: 16m 15s",
		timestamp: "2026-01-27T10:16:15Z",
	},
	{
		scanId: "scan-demo-001",
		source: "scan-orchestrator",
		level: "INFO",
		message: "Summary: 8 subdomains, 6 ports, 8 findings discovered",
		timestamp: "2026-01-27T10:16:20Z",
	},
];

export const DEMO_DIRECTORIES: DirectoryResultWithAI[] = [
	{
		path: "/admin",
		statusCode: 200,
		contentLength: 4521,
		contentType: "text/html",
		ai: {
			attacker: {
				exposureValue: "Admin panel exposed",
				attackSurface: "High-value target",
			},
			defender: {
				hardeningRecommendation: "Restrict to internal network or VPN",
			},
		},
	},
	{
		path: "/api/internal/debug",
		statusCode: 200,
		contentLength: 892,
		contentType: "application/json",
		ai: {
			attacker: {
				exposureValue: "Debug endpoint",
				exploitability: "Information disclosure",
			},
			defender: {
				hardeningRecommendation: "Remove or disable in production",
				monitoringGap: "No authentication",
			},
		},
	},
	{
		path: "/.git/config",
		statusCode: 200,
		contentLength: 327,
		contentType: "text/plain",
		ai: {
			attacker: {
				exposureValue: "Git config exposed",
				attackSurface: "Source code disclosure risk",
			},
			defender: {
				hardeningRecommendation: "Block .git directory access",
				remediationPriority: "critical",
			},
		},
	},
	{
		path: "/backup",
		statusCode: 403,
		contentLength: 0,
	},
	{
		path: "/api/v1/users",
		statusCode: 401,
		contentLength: 52,
		contentType: "application/json",
	},
	{
		path: "/swagger",
		statusCode: 200,
		contentLength: 12843,
		contentType: "text/html",
		ai: {
			attacker: {
				exposureValue: "API documentation exposed",
				attackSurface: "Endpoint enumeration",
			},
			defender: {
				hardeningRecommendation:
					"Restrict access to authenticated users",
			},
		},
	},
	{
		path: "/robots.txt",
		statusCode: 200,
		contentLength: 134,
		contentType: "text/plain",
	},
	{
		path: "/health",
		statusCode: 200,
		contentLength: 18,
		contentType: "application/json",
	},
	{
		path: "/config.json",
		statusCode: 404,
	},
	{
		path: "/wp-admin",
		statusCode: 404,
	},
];

export const DEMO_CLOUD_ASSETS: CloudResultWithAI[] = [
	{
		provider: "AWS",
		service: "S3",
		resource_name: "acme-corp-staging-backup",
		region: "us-east-1",
		public_access: true,
		endpoint: "https://acme-corp-staging-backup.s3.amazonaws.com",
		ai: {
			attacker: {
				exposureValue: "Public backup bucket",
				attackSurface: "Potential sensitive data exposure",
			},
			defender: {
				hardeningRecommendation:
					"Disable public access and enable bucket policies",
				remediationPriority: "critical",
			},
		},
	},
	{
		provider: "AWS",
		service: "CloudFront",
		resource_name: "d1234567890.cloudfront.net",
		region: "global",
		endpoint: "https://d1234567890.cloudfront.net",
		ai: {
			defender: {
				hardeningRecommendation: "Verify origin access identity",
			},
		},
	},
	{
		provider: "GCP",
		service: "GCS",
		resource_name: "acme-logs-archive",
		region: "us-central1",
		public_access: false,
		endpoint: "https://storage.googleapis.com/acme-logs-archive",
	},
	{
		provider: "GCP",
		service: "Cloud Run",
		resource_name: "acme-api-prod",
		region: "us-central1",
		public_access: true,
		endpoint: "https://acme-api-prod-xyz.run.app",
		ai: {
			attacker: {
				exposureValue: "Production API service",
				attackSurface: "Public cloud function",
			},
			defender: {
				hardeningRecommendation: "Verify IAM bindings",
			},
		},
	},
	{
		provider: "Azure",
		service: "Blob Storage",
		resource_name: "acmecorpdata",
		region: "eastus",
		public_access: true,
		endpoint: "https://acmecorpdata.blob.core.windows.net",
		ai: {
			attacker: {
				exposureValue: "Publicly accessible blob container",
				attackSurface: "Container enumeration possible",
			},
			defender: {
				hardeningRecommendation: "Disable anonymous access",
				remediationPriority: "high",
			},
		},
	},
	{
		provider: "Azure",
		service: "App Service",
		resource_name: "acme-web-prod",
		region: "westeurope",
		public_access: true,
		endpoint: "https://acme-web-prod.azurewebsites.net",
	},
];
