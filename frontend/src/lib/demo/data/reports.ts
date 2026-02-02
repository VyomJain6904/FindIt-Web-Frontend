/**
 * Demo Data - Reports
 * Contract-valid fake reports for demo mode
 */

import type { ReportSummary, ReportDetail } from "@/types";

export const DEMO_REPORTS_LIST: ReportSummary[] = [
	{
		id: "report-001",
		scanId: "scan-demo-001",
		title: "Q1 2026 Security Assessment - ACME Corp",
		format: "PDF",
		status: "READY",
		target: "api.acme-corp.com",
		scanType: "FULL",
		findingStats: {
			total: 24,
			bySeverity: {
				CRITICAL: 2,
				HIGH: 4,
				MEDIUM: 10,
				LOW: 8,
				INFO: 0,
			},
			byCategory: {
				WEB: 10,
				NETWORK: 5,
				CLOUD: 5,
				CONFIGURATION: 3,
				AUTHENTICATION: 1,
			},
		},
		createdAt: "2026-01-27T09:15:00Z",
		generatedAt: "2026-01-27T09:15:00Z",
		downloadUrl: "/demo/report-001.pdf",
		fileSize: 1024 * 1024 * 2.5, // 2.5MB
	},
	{
		id: "report-002",
		scanId: "scan-demo-002",
		title: "Executive Summary - January 2026",
		format: "PDF",
		status: "READY",
		target: "app.acme-corp.com",
		scanType: "DEEP",
		findingStats: {
			total: 12,
			bySeverity: {
				CRITICAL: 0,
				HIGH: 2,
				MEDIUM: 5,
				LOW: 5,
				INFO: 0,
			},
			byCategory: {
				WEB: 5,
				NETWORK: 2,
				CLOUD: 0,
				CONFIGURATION: 5,
				AUTHENTICATION: 0,
			},
		},
		createdAt: "2026-01-26T14:00:00Z",
		generatedAt: "2026-01-26T14:00:00Z",
		downloadUrl: "/demo/report-002.pdf",
		fileSize: 1024 * 1024 * 1.2,
	},
	{
		id: "report-003",
		scanId: "scan-demo-003",
		title: "SOC Technical Report - API Infrastructure",
		format: "HTML",
		status: "READY",
		target: "api-internal.acme-corp.com",
		scanType: "QUICK",
		findingStats: {
			total: 5,
			bySeverity: {
				CRITICAL: 0,
				HIGH: 0,
				MEDIUM: 2,
				LOW: 3,
				INFO: 0,
			},
			byCategory: {
				WEB: 2,
				NETWORK: 3,
				CLOUD: 0,
				CONFIGURATION: 0,
				AUTHENTICATION: 0,
			},
		},
		createdAt: "2026-01-25T16:30:00Z",
		generatedAt: "2026-01-25T16:30:00Z",
		downloadUrl: "/demo/report-003.html",
	},
	{
		id: "report-004",
		scanId: "scan-demo-004",
		title: "Compliance Audit - PCI DSS",
		format: "CSV",
		status: "GENERATING",
		target: "payments.acme-corp.com",
		scanType: "FULL",
		findingStats: {
			total: 0,
			bySeverity: {
				CRITICAL: 0,
				HIGH: 0,
				MEDIUM: 0,
				LOW: 0,
				INFO: 0,
			},
			byCategory: {
				WEB: 0,
				NETWORK: 0,
				CLOUD: 0,
				CONFIGURATION: 0,
				AUTHENTICATION: 0,
			},
		},
		createdAt: "2026-01-24T11:00:00Z",
		generatedAt: "2026-01-24T11:00:00Z",
	},
];

export const DEMO_REPORT_DETAIL: ReportDetail = {
	...DEMO_REPORTS_LIST[0],
	executiveSummary:
		"The security assessment of ACME Corp's external infrastructure identified 2 Critical and 4 High severity vulnerabilities. The primary areas of concern involve exposed API endpoints with insufficient authentication and outdated server configurations. Immediate remediation is recommended for the Critical findings to prevent potential data breaches.",
	technicalDetails:
		"Detailed analysis revealed SQL injection vulnerabilities in the legacy payment gateway (CVE-2023-XXXX) and an exposed administrative interface on port 8080. Network scanning confirmed open ports 22, 80, 443, and 8080. TLS configuration analysis shows support for deprecated TLS 1.0/1.1 protocols.",
	sections: [
		{
			title: "Critical Vulnerabilities",
			content:
				"1. SQL Injection in /api/v1/payment\n2. Remote Code Execution in Image Processor",
			order: 1,
			type: "text",
		},
		{
			title: "Network Security",
			content: "Open ports and service versions detected during scan.",
			order: 2,
			type: "table",
		},
	],
	methodology:
		"Black-box penetration testing using automated scanners (Nuclei, Naabu) and manual verification.",
	scope: "api.acme-corp.com, app.acme-corp.com",
	recommendations:
		"1. Patch the SQL injection vulnerability immediately.\n2. Restrict access to administrative ports.\n3. Update TLS configuration to support only TLS 1.2+.",
};
