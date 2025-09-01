"use client";

import React, { useEffect, useState } from "react";
import {
    motion,
    useAnimationFrame,
    useMotionTemplate,
    useMotionValue,
    useTransform,
} from "motion/react";

import { useRef } from "react";

import { cn } from "@/lib/utils";

export function Button({
    borderRadius = "1.75rem",
    children,
    as: Component = "button",
    containerClassName,
    borderClassName,
    duration,
    className,
    ...otherProps
}: {
    borderRadius?: string;
    children: React.ReactNode;
    as?: any;
    containerClassName?: string;
    borderClassName?: string;
    duration?: number;
    className?: string;
    [key: string]: any;
}) {
    return (
        <Component
            className={cn(
                "relative h-10 w-18 overflow-hidden bg-transparent p-[1px] text-xl cursor-pointer",
                containerClassName
            )}
            style={{
                borderRadius: borderRadius,
            }}
            {...otherProps}
        >
            <div
                className="absolute inset-0"
                style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
            >
                <MovingBorder duration={duration} rx="30%" ry="30%">
                    <div
                        className={cn(
                            "h-20 w-20 bg-[radial-gradient(#FFD700_40%,transparent_60%)] opacity-[0.8]",
                            borderClassName
                        )}
                    />
                </MovingBorder>
            </div>

            <div
                className={cn(
                    "relative flex h-full w-full items-center justify-center border border-yellow-950 bg-yellow-950/[0.8] text-sm text-white antialiased backdrop-blur-xl",
                    className
                )}
                style={{
                    borderRadius: `calc(${borderRadius} * 0.96)`,
                }}
            >
                {children}
            </div>
        </Component>
    );
}

export const MovingBorder = ({
    children,
    duration = 2000,
    rx,
    ry,
    ...otherProps
}: {
    children: React.ReactNode;
    duration?: number;
    rx?: string;
    ry?: string;
    [key: string]: any;
}) => {
    const pathRef = useRef<SVGPathElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const progress = useMotionValue<number>(0);
    const [dimensions, setDimensions] = useState({ width: 160, height: 64 });

    // Get actual container dimensions
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setDimensions({ width: rect.width, height: rect.height });
            }
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    useAnimationFrame((time) => {
        const length = pathRef.current?.getTotalLength();
        if (length) {
            const pxPerMillisecond = length / duration;
            progress.set((time * pxPerMillisecond) % length);
        }
    });

    const x = useTransform(progress, (val) => {
        if (pathRef.current) {
            try {
                const point = pathRef.current.getPointAtLength(val);
                return point.x;
            } catch (e) {
                return 0;
            }
        }
        return 0;
    });

    const y = useTransform(progress, (val) => {
        if (pathRef.current) {
            try {
                const point = pathRef.current.getPointAtLength(val);
                return point.y;
            } catch (e) {
                return 0;
            }
        }
        return 0;
    });

    // Calculate rotation angle based on path direction
    const rotation = useTransform(progress, (val) => {
        if (pathRef.current) {
            try {
                const length = pathRef.current.getTotalLength();
                const nextVal = (val + 1) % length;
                const currentPoint = pathRef.current.getPointAtLength(val);
                const nextPoint = pathRef.current.getPointAtLength(nextVal);

                const angle = Math.atan2(
                    nextPoint.y - currentPoint.y,
                    nextPoint.x - currentPoint.x
                );
                return (angle * 180) / Math.PI;
            } catch (e) {
                return 0;
            }
        }
        return 0;
    });

    const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%) rotate(${rotation}deg)`;

    // Create rounded rectangle path that matches the button border
    const createBorderPath = () => {
        const { width, height } = dimensions;

        // Parse radius values
        const rxPercent = rx ? parseFloat(rx.replace("%", "")) : 25;
        const ryPercent = ry ? parseFloat(ry.replace("%", "")) : 25;

        // Calculate actual radius values
        const cornerRadiusX = Math.min((width * rxPercent) / 100, width / 2);
        const cornerRadiusY = Math.min((height * ryPercent) / 100, height / 2);

        // Create path that traces exactly along the border
        return `
            M ${cornerRadiusX} 0
            L ${width - cornerRadiusX} 0
            Q ${width} 0 ${width} ${cornerRadiusY}
            L ${width} ${height - cornerRadiusY}
            Q ${width} ${height} ${width - cornerRadiusX} ${height}
            L ${cornerRadiusX} ${height}
            Q 0 ${height} 0 ${height - cornerRadiusY}
            L 0 ${cornerRadiusY}
            Q 0 0 ${cornerRadiusX} 0
            Z
        `
            .replace(/\s+/g, " ")
            .trim();
    };

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-visible">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 pointer-events-none"
                width={dimensions.width}
                height={dimensions.height}
                viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
                {...otherProps}
            >
                <path
                    fill="none"
                    stroke="none"
                    d={createBorderPath()}
                    ref={pathRef}
                />
            </svg>
            <motion.div
                className="absolute pointer-events-none"
                style={{
                    top: 0,
                    left: 0,
                    transform,
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};
