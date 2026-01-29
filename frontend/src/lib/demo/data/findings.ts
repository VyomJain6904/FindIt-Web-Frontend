/**
 * Demo Data - Findings
 * Contract-valid fake findings for demo mode
 */

import type { Finding, FindingListItem, AIFinding } from "@/types";

export const DEMO_FINDINGS_LIST: FindingListItem[] = [
	{
		id: "finding-001",
		scanId: "scan-demo-001",
		title: "Docker API Exposed Without Authentication",
		severity: "CRITICAL",
		category: "CONFIGURATION",
		source: "NUCLEI",
		asset: "api.acme-corp.com:2375",
		hasAIAnalysis: true,
		createdAt: "2026-01-27T10:15:30Z",
	},
	{
		id: "finding-002",
		scanId: "scan-demo-001",
		title: "MySQL Database Exposed to Internet",
		severity: "CRITICAL",
		category: "NETWORK",
		source: "PORT",
		asset: "api.acme-corp.com:3306",
		hasAIAnalysis: true,
		createdAt: "2026-01-27T10:05:12Z",
	},
	{
		id: "finding-003",
		scanId: "scan-demo-001",
		title: "HTTP/2 Rapid Reset Vulnerability (CVE-2023-44487)",
		severity: "HIGH",
		category: "WEB",
		source: "NUCLEI",
		asset: "api.acme-corp.com",
		hasAIAnalysis: true,
		createdAt: "2026-01-27T10:14:00Z",
	},
	{
		id: "finding-004",
		scanId: "scan-demo-001",
		title: "Redis Server Without Authentication",
		severity: "HIGH",
		category: "CONFIGURATION",
		source: "PORT",
		asset: "api.acme-corp.com:6379",
		hasAIAnalysis: true,
		createdAt: "2026-01-27T10:06:45Z",
	},
	{
		id: "finding-005",
		scanId: "scan-demo-001",
		title: "Missing Content-Security-Policy Header",
		severity: "MEDIUM",
		category: "WEB",
		source: "HEADERS",
		asset: "app.acme-corp.com",
		hasAIAnalysis: true,
		createdAt: "2026-01-27T10:08:30Z",
	},
	{
		id: "finding-006",
		scanId: "scan-demo-001",
		title: "Staging Environment Publicly Accessible",
		severity: "MEDIUM",
		category: "CONFIGURATION",
		source: "SUBDOMAIN",
		asset: "staging.acme-corp.com",
		hasAIAnalysis: true,
		createdAt: "2026-01-27T10:02:30Z",
	},
	{
		id: "finding-007",
		scanId: "scan-demo-002",
		title: "Missing X-XSS-Protection Header",
		severity: "LOW",
		category: "WEB",
		source: "HEADERS",
		asset: "app.acme-corp.com",
		hasAIAnalysis: false,
		createdAt: "2026-01-26T15:30:00Z",
	},
	{
		id: "finding-008",
		scanId: "scan-demo-002",
		title: "HTTP to HTTPS Redirect Missing",
		severity: "MEDIUM",
		category: "WEB",
		source: "HEADERS",
		asset: "app.acme-corp.com",
		hasAIAnalysis: false,
		createdAt: "2026-01-26T15:25:00Z",
	},
];

export const DEMO_FINDING_DETAIL: AIFinding = {
	id: "finding-001",
	scanId: "scan-demo-001",
	title: "Docker API Exposed Without Authentication",
	description:
		"The Docker API is accessible on port 2375 without any authentication mechanism. This allows any remote attacker to manage containers, execute commands, and potentially escape to the host system.",
	severity: "CRITICAL",
	category: "CONFIGURATION",
	source: "NUCLEI",
	asset: "api.acme-corp.com:2375",
	port: 2375,
	protocol: "tcp",
	evidence:
		'{"version":"24.0.7","containers":3,"images":12,"storage":"overlay2"}',
	createdAt: "2026-01-27T10:15:30Z",
	raw: {
		templateId: "exposed-docker-api",
		matcher: "json-body",
		extractedData: { version: "24.0.7" },
	},
	aiAnalysis:
		"This is a critical misconfiguration that exposes the Docker daemon to the internet. An attacker with network access can pull/push images, create containers, execute arbitrary commands, and potentially escape to the host operating system. This finding requires immediate remediation.",
	confidenceScore: 0.98,
	falsePositiveLikelihood: 0.02,
	redTeamAnalysis: {
		attackVector: "Remote network access to exposed Docker API",
		exploitability:
			"Trivial - No authentication required, standard Docker CLI tools work",
		skillLevel: "LOW",
		stepsToReproduce: [
			"Connect to target:2375 with Docker CLI",
			"List running containers: docker -H target:2375 ps",
			"Create privileged container mounting host filesystem",
			"Execute commands with host root privileges",
		],
		estimatedImpact:
			"Complete system compromise, data exfiltration, lateral movement",
	},
	blueTeamAnalysis: {
		priority: "IMMEDIATE",
		mitigation:
			"1. Disable Docker API or bind to localhost only\n2. Enable TLS with client certificate authentication\n3. Use Docker socket proxies with access control\n4. Deploy network segmentation",
		defenseStrategy:
			"Block port 2375/2376 at firewall, require VPN for container management",
		cvssScore: 9.8,
		cweId: "CWE-306",
		references: [
			"https://docs.docker.com/engine/security/https/",
			"https://cwe.mitre.org/data/definitions/306.html",
		],
	},
};
