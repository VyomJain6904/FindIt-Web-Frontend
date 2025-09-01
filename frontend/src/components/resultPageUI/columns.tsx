"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
	DomainResult,
	DnsResult,
	HttpResult,
	ScanResult,
	CloudResult,
	MapResult,
} from "@/lib/data";
import { SimpleButton } from "@/components/ui/simpleButton";

import { ArrowUpDown } from "lucide-react";

export const Domaincol: ColumnDef<DomainResult>[] = [
	{
		accessorKey: "domainName",
		header: () => <span className="pl-2 text-lg font-semibold">Domain</span>,
	},
	{
		accessorKey: "ipAddress",
		header: ({ column }) => (
			<SimpleButton
				className="text-lg font-semibold cursor-pointer"
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				IP Address
				<ArrowUpDown className="ml-2 h-10 w-10" />
			</SimpleButton>
		),
	},
	{
		accessorKey: "isp",
		header: () => <span className="pl-2 text-lg font-semibold">ISP Provider</span>,
	},
];

export const Dnscol: ColumnDef<DnsResult>[] = [
	{
		accessorKey: "dnsZone",
		header: () => <span className="pl-2 text-lg font-semibold">DNS Zone Transfer</span>,
	},
	{
		accessorKey: "reverseIP",
		header: () => <span className="text-lg font-semibold">Reverse DNS Lookup</span>,
	},
	{
		accessorKey: "dnsRecord",
		header: () => <span className="text-lg font-semibold">DNS Record Type</span>,
	},
];

export const Httpcol: ColumnDef<HttpResult>[] = [
	{
		accessorKey: "httpHeader",
		header: () => <span className="pl-2 text-lg font-semibold">HTTP Headers</span>,
	},
	{
		accessorKey: "sslCert",
		header: () => <span className="text-lg font-semibold">SSL / TLS Cert</span>,
	},
	{
		accessorKey: "parsing",
		header: () => <span className="text-lg font-semibold">Default Parsing</span>,
	},
	{
		accessorKey: "wafDetect",
		header: () => <span className="text-lg font-semibold">WAF Detection</span>,
	},
];

export const Scancol: ColumnDef<ScanResult>[] = [
	{
		accessorKey: "subEnum",
		header: () => <span className="pl-2 text-lg font-semibold">Sub-Domain Enum</span>,
	},
	{
		accessorKey: "dirBF",
		header: () => <span className="text-lg font-semibold">Directorys</span>,
	},
	{
		accessorKey: "port",
		header: ({ column }) => (
			<SimpleButton
				className="text-lg font-semibold cursor-pointer"
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Ports
				<ArrowUpDown className="ml-2 h-10 w-10" />
			</SimpleButton>
		),
	},
	{
		accessorKey: "services",
		header: () => <span className="text-lg font-semibold">Services / Versions</span>,
	},
	{
		accessorKey: "techStack",
		header: () => <span className="text-lg font-semibold">Tech-Stack</span>,
	},
];

export const Cloudcol: ColumnDef<CloudResult>[] = [
	{
		accessorKey: "cloudScan",
		header: () => <span className="pl-2 text-lg font-semibold">Cloud Scanning</span>,
	},
	{
		accessorKey: "tftpScan",
		header: () => <span className="text-lg font-semibold">TFTP Scanning</span>,
	},
];

export const Mapcol: ColumnDef<MapResult>[] = [
	{
		accessorKey: "ipAddress",
		header: () => <span className="pl-2 text-lg font-semibold">IP Address</span>,
	},
	{
		accessorKey: "cordinates",
		header: () => <span className="text-lg font-semibold">Co-ordinates</span>,
	},
];
