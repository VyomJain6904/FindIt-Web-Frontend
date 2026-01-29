import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: "FindIt - Attack Surface Management",
	description:
		"Enterprise-grade domain reconnaissance and attack surface management platform",
	keywords: [
		"attack surface",
		"reconnaissance",
		"security",
		"domain scanning",
		"subdomain enumeration",
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} antialiased bg-black text-[#F8F8F2]`}
			>
				{children}
			</body>
		</html>
	);
}
