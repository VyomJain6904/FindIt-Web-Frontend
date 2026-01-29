"use client";

import React, { useState } from "react";

import { FileUpload } from "@/components/aceternity/FileUpload";

export function CustomFileUpload() {
	const [files, setFiles] = useState<File[]>([]);
	const handleFileUpload = (files: File[]) => {
		setFiles(files);
		console.log(files);
	};

	return (
		<div className="w-full max-w-4xl mx-auto h-full bg-card rounded-lg border border-border">
			<FileUpload onChange={handleFileUpload} />
		</div>
	);
}
