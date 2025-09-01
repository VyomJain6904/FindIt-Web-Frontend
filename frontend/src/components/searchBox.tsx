"use client";

import React from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function SearchDomainBox() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted");
    };
    return (
        <div className="shadow-input mx-auto w-full max-w-md rounded-xl p-2 md:rounded-2xl bg-black">
            <form className="my-4" onSubmit={handleSubmit}>
                <LabelInputContainer className="mb-4 text-xl :text-white">
                    <Label htmlFor="domain" className="text-center text-xl">
                        Search Domain
                    </Label>
                    <Input
                        id="domain"
                        useAnimatedPlaceholder={true}
                        type="domain"
                    />
                </LabelInputContainer>
                <button
                    className="group/btn relative block h-10 w-full rounded-xl font-medium text-white bg-zinc-800 from-zinc-900 to-zinc-900 shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
                    type="submit"
                >
                    Search &rarr;
                    <BottomGradient />
                </button>
            </form>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-yellow-300 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    );
};
