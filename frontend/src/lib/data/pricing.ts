export type BillingPeriod = "monthly" | "yearly";

export interface PricingPlan {
	name: string;
	description: string;
	monthlyPrice: number | null;
	yearlyPrice: number | null;
	features: string[];
	cta: string;
	highlighted: boolean;
}

export const plans: PricingPlan[] = [
	{
		name: "Hobby",
		description: "Best for occasional users",
		monthlyPrice: 4,
		yearlyPrice: 40,
		features: [
			"5 scans per month",
			"Subdomain enumeration",
			"DNS records lookup",
			"WHOIS information",
			"JSON export only",
		],
		cta: "Get Started",
		highlighted: false,
	},
	{
		name: "Professional",
		description: "Best for security professionals",
		monthlyPrice: 8,
		yearlyPrice: 80,
		features: [
			"Unlimited scans",
			"Port scanning",
			"Technology detection",
			"Certificate analysis",
			"PDF/CSV exports",
			"Priority support",
			"Download reports for offline viewing",
			"Access to exclusive features and early releases",
		],
		cta: "Get Started",
		highlighted: true,
	},
	{
		name: "Enterprise",
		description: "Best for big teams",
		monthlyPrice: null,
		yearlyPrice: null,
		features: [
			"Everything in Professional",
			"Vulnerability scanning",
			"Full API access",
			"Continuous monitoring",
			"Custom integrations",
			"Unlimited team members",
			"SSO/SAML",
			"Dedicated support",
			"Priority customer support",
		],
		cta: "Contact Us",
		highlighted: false,
	},
];
