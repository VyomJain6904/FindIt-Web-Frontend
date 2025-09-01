"use client";

import React from "react";

import SpotlightCard from "@/components/custom/Components/SpotlightCard/SpotlightCard";
import {
	IconLock,
	IconNetwork,
	IconShield,
	IconSearch,
	IconServer,
	IconWorld,
	IconCloud,
	IconBug,
} from "@tabler/icons-react";

export default function CustomSpotlightCard() {
	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mt-50">
				<SpotlightCard
					className="Custom SpotlightCard"
					spotlightColor = "rgba(255, 200, 0, 0.5)"
				>
					<IconSearch className="text-4xl text-blue-400 mb-4" />
					<h1 className="text-xl font-semibold text-white mb-2">
						Domain Resolution
					</h1>
					<p className="text-sm text-gray-300">
						Resolves target domains to IP addresses with
						comprehensive
						<span className="text-blue-400"> DNS lookup</span>{" "}
						capabilities.
					</p>
				</SpotlightCard>

				<SpotlightCard
					className="Custom SpotlightCard"
					spotlightColor = "rgba(255, 200, 0, 0.5)"
				>
					<IconNetwork className="text-4xl text-green-400 mb-4" />
					<h1 className="text-xl font-semibold text-white mb-2">
						Subdomain Enumeration
					</h1>
					<p className="text-sm text-gray-300">
						Discovers subdomains using
						<span className="text-green-400">
							{" "}
							wordlist brute-forcing
						</span>{" "}
						and certificate transparency logs.
					</p>
				</SpotlightCard>

				<SpotlightCard
					className="Custom SpotlightCard"
					spotlightColor = "rgba(255, 200, 0, 0.5)"
				>
					<IconServer className="text-4xl text-purple-400 mb-4" />
					<h1 className="text-xl font-semibold text-white mb-2">
						Port Scanning
					</h1>
					<p className="text-sm text-gray-300">
						Performs comprehensive
						<span className="text-purple-400">
							{" "}
							TCP/UDP port scanning
						</span>{" "}
						with service and version detection.
					</p>
				</SpotlightCard>

				<SpotlightCard
					className="Custom SpotlightCard"
					spotlightColor = "rgba(255, 200, 0, 0.5)"
				>
					<IconShield className="text-4xl text-red-400 mb-4" />
					<h1 className="text-xl font-semibold text-white mb-2">
						OS Detection
					</h1>
					<p className="text-sm text-gray-300">
						Advanced
						<span className="text-red-400">
							{" "}
							operating system fingerprinting
						</span>{" "}
						using nmap scanning techniques.
					</p>
				</SpotlightCard>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
				<SpotlightCard
					className="Custom SpotlightCard"
					spotlightColor = "rgba(255, 200, 0, 0.5)"
				>
					<IconWorld className="text-4xl text-yellow-400 mb-4" />
					<h1 className="text-xl font-semibold text-white mb-2">
						Web Technology Detection
					</h1>
					<p className="text-sm text-gray-300">
						Identifies
						<span className="text-yellow-400">
							{" "}
							CMS, frameworks, libraries
						</span>{" "}
						and analytics tools used by targets.
					</p>
				</SpotlightCard>

				<SpotlightCard
					className="Custom SpotlightCard"
					spotlightColor = "rgba(255, 200, 0, 0.5)"
				>
					<IconBug className="text-4xl text-orange-400 mb-4" />
					<h1 className="text-xl font-semibold text-white mb-2">
						Directory Brute-Force
					</h1>
					<p className="text-sm text-gray-300">
						Searches for hidden
						<span className="text-orange-400">
							{" "}
							web directories
						</span>{" "}
						using comprehensive wordlists and filtering.
					</p>
				</SpotlightCard>

				<SpotlightCard
					className="Custom SpotlightCard"
					spotlightColor = "rgba(255, 200, 0, 0.5)"
				>
					<IconCloud className="text-4xl text-cyan-400 mb-4" />
					<h1 className="text-xl font-semibold text-white mb-2">
						Cloud Storage Check
					</h1>
					<p className="text-sm text-gray-300">
						Detects publicly accessible
						<span className="text-cyan-400">
							{" "}
							AWS S3 and GCS buckets
						</span>{" "}
						based on naming conventions.
					</p>
				</SpotlightCard>

				<SpotlightCard
					className="Custom SpotlightCard"
					spotlightColor = "rgba(255, 200, 0, 0.5)"
				>
					<IconLock className="text-4xl text-indigo-400 mb-4" />
					<h1 className="text-xl font-semibold text-white mb-2">
						Security Analysis
					</h1>
					<p className="text-sm text-gray-300">
						Comprehensive
						<span className="text-indigo-400">
							{" "}
							SSL/TLS analysis
						</span>
						, HTTP headers and WAF detection capabilities.
					</p>
				</SpotlightCard>
			</div>
		</>
	);
}
