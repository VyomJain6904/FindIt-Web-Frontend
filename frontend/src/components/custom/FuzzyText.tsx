"use client";

import React, { useEffect, useRef } from "react";

interface FuzzyTextProps {
	children: React.ReactNode;
	className?: string;
	enableHover?: boolean;
	baseIntensity?: number;
	hoverIntensity?: number;
	// Keep these as optional overrides if needed
	fontSize?: number | string;
	fontWeight?: string | number;
	fontFamily?: string;
	color?: string;
}

const FuzzyText: React.FC<FuzzyTextProps> = ({
	children,
	className = "",
	enableHover = true,
	baseIntensity = 0.18,
	hoverIntensity = 0.5,
	// Optional direct style overrides
	fontSize,
	fontWeight,
	fontFamily,
	color,
}) => {
	const canvasRef = useRef<HTMLCanvasElement & { cleanupFuzzyText?: () => void }>(null);
	const hiddenSpanRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		let animationFrameId: number;
		let isCancelled = false;
		const canvas = canvasRef.current;
		const hiddenSpan = hiddenSpanRef.current;
		if (!canvas || !hiddenSpan) return;

		const init = async () => {
			if (document.fonts?.ready) {
				await document.fonts.ready;
			}
			if (isCancelled) return;

			const ctx = canvas.getContext("2d");
			if (!ctx) return;

			// Get computed styles from the hidden span element
			const computedStyle = window.getComputedStyle(hiddenSpan);

			// Extract styles from CSS or use direct props as fallback
			const extractedFontSize = fontSize || computedStyle.fontSize || "16px";
			const extractedFontWeight = fontWeight || computedStyle.fontWeight || "400";
			const extractedFontFamily = fontFamily || computedStyle.fontFamily || "sans-serif";
			const extractedColor = color || computedStyle.color || "#ffffff";

			// Convert font size to numeric value
			let numericFontSize: number;
			if (typeof extractedFontSize === "number") {
				numericFontSize = extractedFontSize;
			} else {
				numericFontSize = parseFloat(extractedFontSize);
			}

			const fontSizeStr =
				typeof extractedFontSize === "number"
					? `${extractedFontSize}px`
					: extractedFontSize;
			const text = React.Children.toArray(children).join("");

			const offscreen = document.createElement("canvas");
			const offCtx = offscreen.getContext("2d");
			if (!offCtx) return;

			offCtx.font = `${extractedFontWeight} ${fontSizeStr} ${extractedFontFamily}`;
			offCtx.textBaseline = "alphabetic";
			const metrics = offCtx.measureText(text);

			const actualLeft = metrics.actualBoundingBoxLeft ?? 0;
			const actualRight = metrics.actualBoundingBoxRight ?? metrics.width;
			const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;
			const actualDescent = metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;

			const textBoundingWidth = Math.ceil(actualLeft + actualRight);
			const tightHeight = Math.ceil(actualAscent + actualDescent);

			const extraWidthBuffer = 10;
			const offscreenWidth = textBoundingWidth + extraWidthBuffer;

			offscreen.width = offscreenWidth;
			offscreen.height = tightHeight;

			const xOffset = extraWidthBuffer / 2;
			offCtx.font = `${extractedFontWeight} ${fontSizeStr} ${extractedFontFamily}`;
			offCtx.textBaseline = "alphabetic";
			offCtx.fillStyle = extractedColor;
			offCtx.fillText(text, xOffset - actualLeft, actualAscent);

			const horizontalMargin = 50;
			const verticalMargin = 0;
			canvas.width = offscreenWidth + horizontalMargin * 2;
			canvas.height = tightHeight + verticalMargin * 2;
			ctx.translate(horizontalMargin, verticalMargin);

			const interactiveLeft = horizontalMargin + xOffset;
			const interactiveTop = verticalMargin;
			const interactiveRight = interactiveLeft + textBoundingWidth;
			const interactiveBottom = interactiveTop + tightHeight;

			let isHovering = false;
			const fuzzRange = 30;

			const run = () => {
				if (isCancelled) return;
				ctx.clearRect(
					-fuzzRange,
					-fuzzRange,
					offscreenWidth + 2 * fuzzRange,
					tightHeight + 2 * fuzzRange,
				);
				const intensity = isHovering ? hoverIntensity : baseIntensity;
				for (let j = 0; j < tightHeight; j++) {
					const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange);
					ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j, offscreenWidth, 1);
				}
				animationFrameId = window.requestAnimationFrame(run);
			};

			run();

			const isInsideTextArea = (x: number, y: number) =>
				x >= interactiveLeft &&
				x <= interactiveRight &&
				y >= interactiveTop &&
				y <= interactiveBottom;

			const handleMouseMove = (e: MouseEvent) => {
				if (!enableHover) return;
				const rect = canvas.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;
				isHovering = isInsideTextArea(x, y);
			};

			const handleMouseLeave = () => {
				isHovering = false;
			};

			const handleTouchMove = (e: TouchEvent) => {
				if (!enableHover) return;
				e.preventDefault();
				const rect = canvas.getBoundingClientRect();
				const touch = e.touches[0];
				const x = touch.clientX - rect.left;
				const y = touch.clientY - rect.top;
				isHovering = isInsideTextArea(x, y);
			};

			const handleTouchEnd = () => {
				isHovering = false;
			};

			if (enableHover) {
				canvas.addEventListener("mousemove", handleMouseMove);
				canvas.addEventListener("mouseleave", handleMouseLeave);
				canvas.addEventListener("touchmove", handleTouchMove, {
					passive: false,
				});
				canvas.addEventListener("touchend", handleTouchEnd);
			}

			const cleanup = () => {
				window.cancelAnimationFrame(animationFrameId);
				if (enableHover) {
					canvas.removeEventListener("mousemove", handleMouseMove);
					canvas.removeEventListener("mouseleave", handleMouseLeave);
					canvas.removeEventListener("touchmove", handleTouchMove);
					canvas.removeEventListener("touchend", handleTouchEnd);
				}
			};

			canvas.cleanupFuzzyText = cleanup;
		};

		init();

		return () => {
			isCancelled = true;
			window.cancelAnimationFrame(animationFrameId);
			if (canvas && canvas.cleanupFuzzyText) {
				canvas.cleanupFuzzyText();
			}
		};
	}, [
		children,
		className,
		fontSize,
		fontWeight,
		fontFamily,
		color,
		enableHover,
		baseIntensity,
		hoverIntensity,
	]);

	return (
		<div style={{ position: "relative", display: "inline-block" }}>
			{/* Hidden span to extract CSS styles */}
			<span
				ref={hiddenSpanRef}
				className={className}
				style={{
					position: "absolute",
					visibility: "hidden",
					pointerEvents: "none",
					whiteSpace: "nowrap",
				}}
				aria-hidden="true"
			>
				{children}
			</span>
			{/* Canvas for fuzzy effect */}
			<canvas ref={canvasRef} />
		</div>
	);
};

export default FuzzyText;
