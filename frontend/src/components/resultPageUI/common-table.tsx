"use client";

import React, { useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon, Loader2 } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/resultPageUI/table";

import {
    flexRender,
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
    RowSelectionState,
} from "@tanstack/react-table";

import { Button } from "@/components/resultPageUI/button";

interface CommonTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    isLoading?: boolean;
    pageSize?: number;
}

export function CommonTable<TData, TValue>({
    columns,
    data,
    isLoading = false,
    pageSize = 10,
}: CommonTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
        {}
    );
    const [globalFilter, setGlobalFilter] = React.useState<string>("");

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: "includesString",
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
        },
        initialState: {
            pagination: {
                pageSize,
            },
        },
    });

    // Optimized text wrapping check
    const shouldWrapText = useCallback(
        (text: string, maxLength: number = 50) => {
            return Boolean(text && text.length > maxLength);
        },
        []
    );

    // Loading skeleton component
    const LoadingSkeleton = () => (
        <div className="flex items-center justify-center p-8">
            <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-yellow-500/50" />
                <span className="text-sm text-gray-400">Loading data...</span>
            </div>
        </div>
    );

    // Empty state component
    const EmptyState = () => (
        <div className="flex flex-col items-center justify-center space-y-2 p-8">
            <span className="text-gray-400">No results found.</span>
            <span className="text-xs text-gray-500">
                {globalFilter
                    ? "Try adjusting your search criteria"
                    : "No data available"}
            </span>
        </div>
    );

    return (
        <div className="bg-black rounded-xl shadow-2xl border border-yellow-500/50 overflow-hidden">
            {/* Table Container */}
            <div>
                <Table>
                    <TableHeader className="sticky top-0 z-10 bg-black">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="border-b-2 border-yellow-500/50"
                            >
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="border-r border-yellow-500/50 px-4 py-4 text-left text-sm font-bold text-white bg-black"
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={`flex items-center gap-2 ${
                                                    header.column.getCanSort()
                                                        ? "cursor-pointer hover:text-yellow-500 transition-colors select-none"
                                                        : ""
                                                }`}
                                                onClick={
                                                    header.column.getCanSort()
                                                        ? header.column.getToggleSortingHandler()
                                                        : undefined
                                                }
                                            >
                                                <span className="break-words">
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext()
                                                    )}
                                                </span>
                                                {header.column.getIsSorted() && (
                                                    <span className="text-yellow-500 flex-shrink-0">
                                                        {header.column.getIsSorted() ===
                                                        "desc"
                                                            ? "↓"
                                                            : "↑"}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    <LoadingSkeleton />
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                    className={`border-b border-yellow-500/50 hover:bg-yellow-500/20 transition-colors duration-150 ${
                                        row.getIsSelected()
                                            ? "bg-gray-800"
                                            : "bg-black"
                                    }`}
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        const cellValue = cell.getValue();
                                        const isLongText = shouldWrapText(
                                            String(cellValue || "")
                                        );

                                        return (
                                            <TableCell
                                                key={cell.id}
                                                className="border-r border-yellow-500/50 px-4 py-3 text-sm text-gray-100 align-top"
                                                style={{
                                                    wordBreak: "break-word",
                                                    whiteSpace: "normal",
                                                }}
                                            >
                                                <div
                                                    className={`text-gray-100`}
                                                    title={String(
                                                        cellValue || ""
                                                    )}
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext()
                                                    )}
                                                </div>
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    <EmptyState />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Enhanced Pagination Section */}
            <div className="bg-black px-6 py-4 border-t border-yellow-500/50">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    {/* Pagination Controls */}
                    <div className="flex items-center gap-2 ">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage() || isLoading}
                            className="px-3 py-2 text-sm bg-black text-gray-100 hover:bg-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-yellow-950 "
                        >
                            First
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage() || isLoading}
                            className="px-2 py-2 bg-black text-gray-100 hover:bg-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-yellow-950 "
                        >
                            <ChevronLeftIcon size={20} />
                        </Button>

                        <span className="px-4 py-2 text-sm font-medium bg-yellow-500/40 text-white rounded-md border border-yellow-950 ">
                            {isLoading
                                ? "Loading..."
                                : `Page ${
                                      table.getState().pagination.pageIndex + 1
                                  } of ${table.getPageCount() || 1}`}
                        </span>

                        <Button
                            variant="outline"
                            size="xs"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage() || isLoading}
                            className="px-2 py-2 bg-black text-gray-100 hover:bg-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-yellow-950 "
                        >
                            <ChevronRightIcon size={20} />
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                table.setPageIndex(table.getPageCount() - 1)
                            }
                            disabled={!table.getCanNextPage() || isLoading}
                            className="px-3 py-2 text-sm bg-black text-gray-100 hover:bg-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-yellow-950 "
                        >
                            Last
                        </Button>
                    </div>

                    {/* Optional: Page size selector for better UX */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-amber-400">
                            Rows per page:
                        </span>
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={(e) =>
                                table.setPageSize(Number(e.target.value))
                            }
                            disabled={isLoading}
                            className="px-2 py-1 text-sm bg-neutral-900 text-amber-300 border border-amber-500 focus:ring-2 focus:ring-amber-400 disabled:opacity-50 rounded-lg"
                        >
                            {[10, 20, 30, 50, 100].map((size) => (
                                <option
                                    key={size}
                                    value={size}
                                    className="bg-neutral-900 text-amber-300"
                                >
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
