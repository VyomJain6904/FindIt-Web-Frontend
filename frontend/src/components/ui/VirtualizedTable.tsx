"use client";

import { FixedSizeList as List } from "react-window";
import { useRef, useCallback, memo, ReactNode, CSSProperties } from "react";

// Define manually since react-window v2 doesn't export ListChildComponentProps
interface RowProps {
	index: number;
	style: CSSProperties;
}

interface VirtualizedListProps<T> {
	items: T[];
	height: number;
	itemHeight: number;
	renderItem: (item: T, index: number) => ReactNode;
	className?: string;
}

/**
 * Generic Virtualized List
 * Only renders visible items for performance with large datasets
 */
export function VirtualizedList<T>({
	items,
	height,
	itemHeight,
	renderItem,
	className = "",
}: VirtualizedListProps<T>) {
	const Row = useCallback(
		({ index, style }: RowProps) => {
			const item = items[index];
			return <div style={style}>{renderItem(item, index)}</div>;
		},
		[items, renderItem],
	);

	return (
		<List
			height={height}
			itemCount={items.length}
			itemSize={itemHeight}
			width="100%"
			className={className}
		>
			{Row}
		</List>
	);
}

interface VirtualizedTableProps<T> {
	items: T[];
	height: number;
	rowHeight: number;
	header: ReactNode;
	renderRow: (item: T, index: number) => ReactNode;
	className?: string;
	emptyState?: ReactNode;
}

/**
 * Virtualized Table
 * Fixed header with virtualized scrolling body
 * Handles thousands of rows efficiently
 */
export function VirtualizedTable<T>({
	items,
	height,
	rowHeight,
	header,
	renderRow,
	className = "",
	emptyState,
}: VirtualizedTableProps<T>) {
	if (items.length === 0 && emptyState) {
		return <>{emptyState}</>;
	}

	const Row = useCallback(
		({ index, style }: RowProps) => {
			const item = items[index];
			return <div style={style}>{renderRow(item, index)}</div>;
		},
		[items, renderRow],
	);

	return (
		<div
			className={`bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden ${className}`}
		>
			{/* Fixed Header */}
			<div className="border-b border-zinc-800">{header}</div>

			{/* Virtualized Body */}
			<List
				height={height}
				itemCount={items.length}
				itemSize={rowHeight}
				width="100%"
				style={{ overflowX: "hidden" }}
			>
				{Row}
			</List>
		</div>
	);
}

/** Memoized row wrapper for preventing unnecessary re-renders */
export const MemoizedRow = memo(function MemoizedRow<T>({
	item,
	index,
	render,
}: {
	item: T;
	index: number;
	render: (item: T, index: number) => ReactNode;
}) {
	return <>{render(item, index)}</>;
});
