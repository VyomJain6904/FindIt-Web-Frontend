"use client";

import React, { useMemo, useCallback } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Download, FileText } from "lucide-react";

import { Button } from "@/components/ui/moving-border";
import { CommonTable } from "@/components/resultPageUI/common-table";
import { Dnscol, Domaincol, Httpcol, Scancol } from "@/components/resultPageUI/columns";
import { ColumnDef, AccessorKeyColumnDef } from "@tanstack/react-table";
import { dnsData, domainData, httpData, scanData } from "@/data/data";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	title?: string;
	isLoading?: boolean;
}

interface TableDataSet<T> {
	title: string;
	columns: ColumnDef<T, any>[];
	data: T[];
	isLoading?: boolean;
}

// Type guard to check if column has accessorKey
const hasAccessorKey = (column: ColumnDef<any, any>): column is AccessorKeyColumnDef<any, any> => {
	return "accessorKey" in column && column.accessorKey !== undefined;
};

// Helper function to get column key safely
const getColumnKey = (column: ColumnDef<any, any>): string => {
	if (hasAccessorKey(column)) {
		return String(column.accessorKey);
	}
	if ("id" in column && column.id) {
		return column.id;
	}
	return "unknown";
};

// Helper function to get column header safely
const getColumnHeader = (column: ColumnDef<any, any>): string => {
	if (typeof column.header === "string") {
		return column.header;
	}
	if (hasAccessorKey(column)) {
		return String(column.accessorKey);
	}
	if ("id" in column && column.id) {
		return column.id;
	}
	return "Column";
};

export function DataTable<TData, TValue>({
	title = "FindIt Scan Results",
	isLoading = false,
}: DataTableProps<TData, TValue>) {
	// Memoized table datasets - replace with API data when available
	const tableDataSets: TableDataSet<any>[] = useMemo(
		() => [
			{
				title: "Domain Analysis Results",
				columns: Domaincol,
				data: domainData,
			},
			{
				title: "Security Scan Results",
				columns: Scancol,
				data: scanData,
			},
			{
				title: "HTTP Scan Results",
				columns: Httpcol,
				data: httpData,
			},
			{
				title: "DNS Scan Results",
				columns: Dnscol,
				data: dnsData,
			},
		],
		[isLoading],
	);

	// Optimized function to get table data for export with proper type safety
	const getAllTableData = useCallback(() => {
		return tableDataSets.map((tableSet) => ({
			...tableSet,
			exportData: tableSet.data.map((row) => {
				const processedRow: Record<string, any> = {};

				tableSet.columns.forEach((col) => {
					const columnKey = getColumnKey(col);
					const columnHeader = getColumnHeader(col);

					if (columnKey !== "unknown" && row[columnKey] !== undefined) {
						let value = row[columnKey];

						// Handle different data types
						if (value === null || value === undefined) {
							value = "";
						} else if (typeof value === "object") {
							value = JSON.stringify(value);
						} else if (typeof value === "string" && value.length > 50) {
							// Split long text for better readability in exports
							value = value.match(/.{1,50}/g)?.join("\n") || value;
						}

						processedRow[columnHeader] = value;
					}
				});

				return processedRow;
			}),
		}));
	}, [tableDataSets]);

	// Optimized JSON export with better error handling
	const exportToJSON = useCallback(async () => {
		try {
			const allTableData = getAllTableData();
			const timestamp = new Date().toISOString();

			const jsonData = {
				reportMetadata: {
					title,
					exportDate: timestamp,
					version: "1.0",
					totalTables: allTableData.length,
					totalRecords: allTableData.reduce((sum, table) => sum + table.data.length, 0),
				},
				tables: allTableData.map((tableSet) => ({
					tableName: tableSet.title,
					recordCount: tableSet.data.length,
					data: tableSet.exportData,
				})),
			};

			const blob = new Blob([JSON.stringify(jsonData, null, 4)], {
				type: "application/json",
			});

			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			const dateString = new Date().toISOString().split("T")[0];
			link.download = `${title.replace(/\s+/g, "_")}_Report_${dateString}.json`;

			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);
		} catch (error) {
			console.error("Export to JSON failed:", error);
		}
	}, [title, getAllTableData]);

	// Optimized PDF export with better memory management
	const exportToPDF = useCallback(async () => {
		try {
			const doc = new jsPDF();
			const allTableData = getAllTableData();

			let yPosition = 40;
			const pageHeight = doc.internal.pageSize.getHeight();
			const margins = { left: 15, right: 15, top: 20, bottom: 20 };
			const availableWidth = doc.internal.pageSize.getWidth() - margins.left - margins.right;

			// Helper function to add a new page if needed
			const checkPageBreak = (requiredHeight: number): boolean => {
				if (yPosition + requiredHeight > pageHeight - margins.bottom) {
					doc.addPage();
					yPosition = margins.top + 20;
					return true;
				}
				return false;
			};

			// Add main title and metadata
			doc.setFontSize(20);
			doc.setFont("helvetica", "bold");
			doc.setTextColor(17, 24, 39);
			doc.text(title, margins.left, 25);

			doc.setFontSize(10);
			doc.setFont("helvetica", "normal");
			doc.setTextColor(75, 85, 99);
			const timestamp = new Date().toLocaleString();
			doc.text(`Generated: ${timestamp}`, margins.left, 32);
			doc.text(`Total Tables: ${allTableData.length}`, margins.left, 37);

			yPosition = 50;

			// Process each table with better performance
			for (let tableIndex = 0; tableIndex < allTableData.length; tableIndex++) {
				const tableSet = allTableData[tableIndex];

				if (tableSet.data.length === 0) continue;

				checkPageBreak(30);

				// Add table title
				doc.setFontSize(14);
				doc.setFont("helvetica", "bold");
				doc.setTextColor(17, 24, 39);
				doc.text(`${tableIndex + 1}. ${tableSet.title}`, margins.left, yPosition);
				yPosition += 10;

				doc.setFontSize(9);
				doc.setFont("helvetica", "normal");
				doc.setTextColor(75, 85, 99);
				doc.text(`Records: ${tableSet.data.length}`, margins.left, yPosition);
				yPosition += 15;

				// Prepare table data with proper type safety
				const validColumns = tableSet.columns.filter(
					(col) => getColumnKey(col) !== "unknown",
				);
				const headers = validColumns.map((col) => getColumnHeader(col));

				const rows = tableSet.data.map((row) =>
					validColumns.map((col) => {
						const columnKey = getColumnKey(col);
						const value = row[columnKey];

						if (value === null || value === undefined) return "";
						if (typeof value === "object") return JSON.stringify(value);

						const stringValue = String(value);
						// Handle long text with better wrapping
						if (stringValue.length > 40) {
							return stringValue.match(/.{1,40}(?:\s|$)/g)?.join("\n") || stringValue;
						}
						return stringValue;
					}),
				);

				// Calculate optimal column widths
				const columnWidths = headers.map((header, index) => {
					const headerLength = header.length;
					const maxContentLength = Math.max(
						...rows.slice(0, 200).map(
							(
								row, // Sample first 100 rows for performance
							) => String(row[index] || "").replace(/\n/g, "").length,
						),
						headerLength,
					);
					return Math.min(
						Math.max(maxContentLength * 1.2, 30),
						availableWidth / headers.length,
					);
				});

				const totalCalculatedWidth = columnWidths.reduce((sum, width) => sum + width, 0);
				const normalizedWidths = columnWidths.map(
					(width) => (width / totalCalculatedWidth) * availableWidth,
				);

				// Add the table with optimized settings
				autoTable(doc, {
					head: [headers],
					body: rows,
					startY: yPosition,
					margin: margins,
					tableWidth: availableWidth,

					styles: {
						fontSize: 7,
						cellPadding: { top: 2, right: 1, bottom: 2, left: 1 },
						valign: "top",
						halign: "left",
						overflow: "linebreak",
						lineWidth: 0.3,
						lineColor: [200, 200, 200],
					},

					headStyles: {
						fillColor: [240, 240, 240],
						textColor: [17, 24, 39],
						fontStyle: "bold",
						halign: "center",
						valign: "middle",
						fontSize: 8,
					},

					bodyStyles: {
						fillColor: [255, 255, 255],
						textColor: [17, 24, 39],
						fontSize: 7,
					},

					alternateRowStyles: {
						fillColor: [249, 250, 251],
					},

					columnStyles: normalizedWidths.reduce((styles, width, index) => {
						styles[index] = {
							cellWidth: width,
							overflow: "linebreak",
							minCellHeight: 15,
						};
						return styles;
					}, {} as Record<number, any>),

					didDrawPage: function (data) {
						const currentPage = data.pageNumber;
						doc.setFontSize(8);
						doc.setTextColor(75, 85, 99);
						doc.text(
							`Page ${currentPage}`,
							doc.internal.pageSize.getWidth() - margins.right - 15,
							doc.internal.pageSize.getHeight() - 10,
						);
					},

					showHead: "everyPage",
					theme: "grid",
				});

				yPosition = (doc as any).lastAutoTable.finalY + 20;
			}

			// Save the PDF
			const dateString = new Date().toISOString().split("T")[0];
			doc.save(`${title.replace(/\s+/g, "_")}_Report_${dateString}.pdf`);
		} catch (error) {
			console.error("Export to PDF failed:", error);
		}
	}, [title, getAllTableData]);

	// Calculate total records efficiently
	const totalRecords = useMemo(
		() => tableDataSets.reduce((sum, table) => sum + table.data.length, 0),
		[tableDataSets],
	);

	return (
		<div className="w-full space-y-6 p-6 bg-black min-h-screen text-white">
			{/* Header Section */}
			<div className="bg-black rounded-xl shadow-2xl p-6 border border-yellow-500/50">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
					<div>
						<h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
						<p className="text-sm text-gray-400">
							{isLoading
								? "Loading data..."
								: `${totalRecords} total records across ${tableDataSets.length} tables`}
						</p>
					</div>

					{/* Export Actions */}
					<div className="flex gap-3">
						<Button
							onClick={exportToJSON}
							disabled={isLoading || totalRecords === 0}
							className="bg-black text-white hover:bg-yellow-500/50 transition-all duration-200 shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<Download size={16} />
							Export JSON
						</Button>
						<Button
							onClick={exportToPDF}
							disabled={isLoading || totalRecords === 0}
							className="bg-black text-white hover:bg-yellow-500/50 transition-all duration-200 shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<FileText size={16} />
							Export PDF
						</Button>
					</div>
				</div>
			</div>

			{/* Data Table Sections */}
			<div className="space-y-6">
				{tableDataSets.map((tableSet, index) => (
					<div key={`table-${index}`} className="space-y-2">
						<h3 className="text-2xl font-semibold text-white px-2 mt-20 text-center mb-5">
							{tableSet.title}
							{tableSet.isLoading && (
								<span className="text-sm text-gray-400 ml-2">(Loading...)</span>
							)}
						</h3>
						<CommonTable columns={tableSet.columns} data={tableSet.data} />
					</div>
				))}
			</div>
		</div>
	);
}
