"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
	LayoutDashboard,
	Search,
	FileText,
	Settings,
	Shield,
	BarChart3,
	ChevronLeft,
	ChevronRight,
	LogOut,
	User,
	Crown,
	Menu,
	X,
} from "lucide-react";
import { usePermissions } from "@/hooks/usePermissions";
import { GlobalErrorBoundary } from "@/components/error";

const navigation = [
	{ name: "dashboard", href: "/dashboard", icon: LayoutDashboard },
	{ name: "New Scan", href: "/scan", icon: Search },
	{ name: "Assets", href: "/assets", icon: Shield },
	{ name: "Findings", href: "/findings", icon: BarChart3 },
	{ name: "Reports", href: "/reports", icon: FileText },
	{ name: "Settings", href: "/settings", icon: Settings },
];

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [collapsed, setCollapsed] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const pathname = usePathname();
	const { plan, remainingScans } = usePermissions();

	// Close mobile menu on route change
	useEffect(() => {
		setMobileOpen(false);
	}, [pathname]);

	// Handle screen resize
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 1024);
			if (window.innerWidth >= 1024) {
				setMobileOpen(false);
			}
		};

		// Initial check
		checkMobile();

		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	return (
		<div className="flex min-h-screen bg-black">
			{/* Mobile Header */}
			<div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4 z-40">
				<Link href="/" className="flex items-center gap-2">
					<div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center border border-zinc-700">
						<Shield className="w-5 h-5 text-zinc-100" />
					</div>
					<span className="text-lg font-bold text-zinc-100">
						FindIt
					</span>
				</Link>
				<button
					onClick={() => setMobileOpen(true)}
					className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400"
				>
					<Menu className="w-6 h-6" />
				</button>
			</div>

			{/* Mobile Backdrop */}
			<AnimatePresence>
				{mobileOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setMobileOpen(false)}
						className="fixed inset-0 bg-black/50 z-40 lg:hidden"
					/>
				)}
			</AnimatePresence>

			{/* Sidebar */}
			<motion.aside
				animate={{
					width: collapsed ? 80 : 256,
					x: isMobile ? (mobileOpen ? 0 : -256) : 0,
				}}
				className={`fixed left-0 top-0 h-screen bg-zinc-900 border-r border-zinc-800 flex flex-col z-50 transition-transform duration-300`}
			>
				{/* Logo (Desktop) / Close (Mobile) */}
				<div className="h-16 flex items-center justify-between px-4 border-b border-zinc-800">
					{!collapsed && (
						<Link
							href="/"
							className="flex items-center gap-2 lg:flex hidden"
						>
							<div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center border border-zinc-700">
								<Shield className="w-5 h-5 text-zinc-100" />
							</div>
							<span className="text-lg font-bold text-zinc-100">
								FindIt
							</span>
						</Link>
					)}
					{/* Mobile Close Button */}
					<div className="lg:hidden flex w-full items-center justify-between">
						<span className="text-lg font-bold text-zinc-100">
							Menu
						</span>
						<button
							onClick={() => setMobileOpen(false)}
							className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400"
						>
							<X className="w-5 h-5" />
						</button>
					</div>

					{/* Desktop Collapse Button */}
					<button
						onClick={() => setCollapsed(!collapsed)}
						className="p-2 rounded-lg hover:bg-zinc-800 transition-colors hidden lg:block"
					>
						{collapsed ? (
							<ChevronRight className="w-5 h-5 text-zinc-400" />
						) : (
							<ChevronLeft className="w-5 h-5 text-zinc-400" />
						)}
					</button>
				</div>

				{/* Navigation */}
				<nav className="flex-1 p-4 space-y-2 overflow-y-auto">
					{navigation.map((item) => {
						const Icon = item.icon;
						const isActive = pathname === item.href;

						return (
							<Link
								key={item.name}
								href={item.href}
								className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
									isActive
										? "bg-zinc-800 text-zinc-100"
										: "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100"
								}`}
							>
								<Icon className="w-5 h-5 flex-shrink-0" />
								{(!collapsed || mobileOpen) && (
									<span className="text-sm font-medium">
										{item.name}
									</span>
								)}
							</Link>
						);
					})}
				</nav>

				{/* Plan Badge */}
				{(!collapsed || mobileOpen) && (
					<div className="p-4 border-t border-zinc-800">
						<div
							className={`p-3 rounded-lg ${
								plan === "enterprise"
									? "bg-orange-500/10 border border-orange-500/20"
									: plan === "pro"
										? "bg-violet-500/10 border border-violet-500/20"
										: "bg-zinc-800 border border-zinc-700"
							}`}
						>
							<div className="flex items-center gap-2 mb-2">
								<Crown
									className={`w-4 h-4 ${
										plan === "enterprise"
											? "text-orange-400"
											: plan === "pro"
												? "text-violet-400"
												: "text-zinc-400"
									}`}
								/>
								<span className="text-sm font-medium text-zinc-100 capitalize">
									{plan} Plan
								</span>
							</div>
							{plan === "free" && remainingScans >= 0 && (
								<p className="text-xs text-zinc-400">
									{remainingScans} scans remaining
								</p>
							)}
							{plan === "free" && (
								<Link
									href="/pricing"
									className="mt-2 block text-center text-xs text-violet-400 hover:text-violet-300"
								>
									Upgrade Plan →
								</Link>
							)}
						</div>
					</div>
				)}

				{/* User */}
				<div className="p-4 border-t border-zinc-800">
					<div
						className={`flex items-center ${collapsed && !mobileOpen ? "justify-center" : "gap-3"}`}
					>
						<div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
							<User className="w-5 h-5 text-zinc-400" />
						</div>
						{(!collapsed || mobileOpen) && (
							<div className="flex-1 min-w-0">
								<p className="text-sm font-medium text-zinc-100 truncate">
									User
								</p>
								<p className="text-xs text-zinc-500 truncate">
									user@example.com
								</p>
							</div>
						)}
						{(!collapsed || mobileOpen) && (
							<button className="p-2 rounded-lg hover:bg-zinc-800 transition-colors">
								<LogOut className="w-4 h-4 text-zinc-400" />
							</button>
						)}
					</div>
				</div>
			</motion.aside>

			{/* Main Content */}
			<main
				className="flex-1 transition-all duration-200 pt-16 lg:pt-0"
				style={{
					marginLeft: 0, // Default mobile
				}}
			>
				<div
					className={`transition-all duration-200 ${collapsed ? "lg:ml-[80px]" : "lg:ml-[256px]"}`}
				>
					<GlobalErrorBoundary>{children}</GlobalErrorBoundary>
				</div>
			</main>
		</div>
	);
}
