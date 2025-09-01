"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { SearchButton } from "@/components/searchPageUI/searchButton";
import ColourfulText from "@/components/ui/colourful-text";
import { SearchDomainBox } from "@/components/searchPageUI/searchBox";
import { cn } from "@/lib/utils";
import { CustomFileUpload } from "@/components/searchPageUI/custom-file-upload";
import { CustomCheckboxList } from "@/components/searchPageUI/checkBoxList";

import {
	IconArrowLeft,
	IconBrandTabler,
	IconHistory,
	IconFolderSearch,
} from "@tabler/icons-react";

type SidebarLinkType = {
	label: string;
	href: string;
	icon: React.ReactNode;
};

export function SearchSideBar() {
	const [open, setOpen] = useState(false);

	const links: SidebarLinkType[] = [
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
									<Image
										src="/me.jpg"
										className="h-7 w-7 shrink-0 rounded-full"
										width={28}
										height={28}
										alt="Vyom Jain"
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
		<div className="items-center justify-center h-full w-full bg-black">
			<div className="flex flex-row items-center justify-center py-10 h-screen md:h-auto bg-black relative w-full">
				<div className="max-w-7xl mx-auto w-full relative overflow-hidden h-full px-4 bg-black">
					<h2 className="text-center text-3xl md:text-5xl font-bold text-white">
						<ColourfulText text="FindIt" />
					</h2>
					<p className="text-center text-base md:text-lg font-normal text-neutral-200 max-w-md mt-2 mx-auto">
						Domain reconnaissance tool designed to gather extensive
						information about a target domain.
					</p>
					<div className="mt-5 h-full w-full bg-black">
						<SearchDomainBox />
						<SearchButton />
						<div className="mt-20 flex flex-col md:flex-row gap-6 items-center justify-center pl-40">
							<div className="flex-1">
								<CustomCheckboxList />
							</div>
							<div className="flex-1">
								<CustomFileUpload />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
