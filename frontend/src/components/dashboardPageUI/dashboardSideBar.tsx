"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { SearchButtonDashboard } from "@/components/dashboardPageUI/searchButtonDashboard";
import { MovingGlobe } from "@/components/movingGlobe";
import CustomSpotlightCard from "@/components/spotLightCard";
import { Tooltip } from "@/components/toolTip";
import { cn } from "@/lib/utils";
import {
	IconArrowLeft,
	IconBrandTabler,
	IconHistory,
	IconFolderSearch,
} from "@tabler/icons-react";

export function DashboardSideBar() {
	const links = [
		{
			label: "Dashboard",
			href: "/dashboard",
			icon: (
				<IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-200" />
			),
		},
		{
			label: "Search",
			href: "/dashboard/search",
			icon: (
				<IconFolderSearch className="h-5 w-5 shrink-0 text-neutral-200" />
			),
		},
		{
			label: "Scan History",
			href: "/dashboard/history",
			icon: <IconHistory className="h-5 w-5 shrink-0 text-neutral-200" />,
		},
		{
			label: "Logout",
			href: "/logout",
			icon: (
				<IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-200" />
			),
		},
	];
	const [open, setOpen] = useState(false);
	return (
		<div
			className={cn(
				"mx-auto flex w-full overflow-hidden rounded-md md:flex-row bg-black",
				"h-full",
			)}
		>
			<Sidebar open={open} setOpen={setOpen}>
				<SidebarBody className="justify-between gap-10">
					<div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
						{open ? <Logo /> : <LogoIcon />}
						<div className="mt-8 flex flex-col gap-2">
							{links.map((link, idx) => (
								<SidebarLink key={idx} link={link} />
							))}
						</div>
					</div>
					<div>
						<SidebarLink
							link={{
								label: "Vyom Jain",
								href: "#",
								icon: (
									<img
										// TODO: This is a placeholder image, replace with your own avatar
										src="me.jpg"
										className="h-7 w-7 shrink-0 rounded-full"
										width={50}
										height={50}
										alt="Avatar"
									/>
								),
							}}
						/>
					</div>
				</SidebarBody>
			</Sidebar>
			<Dashboard />
		</div>
	);
}

export const Logo = () => {
	return (
		<a
			href="/"
			className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
		>
			<div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-white" />
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="font-medium whitespace-pre text-white"
			>
				FindIt
			</motion.span>
		</a>
	);
};

export const LogoIcon = () => {
	return (
		<a
			href="/"
			className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
		>
			<div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-white" />
		</a>
	);
};

const Dashboard = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-full w-full space-y-8 px-4 ">
			<MovingGlobe />
			<SearchButtonDashboard />
			<CustomSpotlightCard />
			<Tooltip />
		</div>
	);
};
