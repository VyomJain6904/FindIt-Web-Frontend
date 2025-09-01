import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { useDropzone } from "react-dropzone";

import { cn } from "@/lib/utils";
import { IconUpload, IconAlertCircle } from "@tabler/icons-react";

const mainVariant = {
    initial: {
        x: 0,
        y: 0,
    },
    animate: {
        x: 20,
        y: -20,
        opacity: 0.9,
    },
};

const secondaryVariant = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
};

export const FileUpload = ({
    onChange,
}: {
    onChange?: (files: File[]) => void;
}) => {
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateFile = (file: File): boolean => {
        // Check file extension
        const fileName = file.name.toLowerCase();
        const validExtensions = [".txt"];
        const hasValidExtension = validExtensions.some((ext) =>
            fileName.endsWith(ext)
        );

        // Check MIME type as additional validation
        const validMimeTypes = ["text/plain", "application/octet-stream"];
        const hasValidMimeType =
            validMimeTypes.includes(file.type) || file.type === "";

        return hasValidExtension && hasValidMimeType;
    };

    const handleFileChange = (newFiles: File[]) => {
        setError(""); // Clear previous errors

        // Filter valid files
        const validFiles = newFiles.filter((file) => {
            if (!validateFile(file)) {
                setError(
                    `Invalid file type: ${file.name}. Only .txt files are allowed for wordlists.`
                );
                return false;
            }
            return true;
        });

        if (validFiles.length > 0) {
            setFiles((prevFiles) => [...prevFiles, ...validFiles]);
            onChange && onChange(validFiles);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const { getRootProps, isDragActive } = useDropzone({
        multiple: false,
        noClick: true,
        accept: {
            "text/plain": [".txt"],
        },
        onDrop: handleFileChange,
        onDropRejected: (fileRejections) => {
            const rejectedFile = fileRejections[0];
            if (rejectedFile) {
                setError(
                    `File rejected: ${rejectedFile.file.name}. Only .txt files are allowed for wordlists.`
                );
            }
        },
    });

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
        setError(""); // Clear error when removing files
    };

    return (
        <div className="w-full max-w-xs mx-auto" {...getRootProps()}>
            <motion.div
                onClick={handleClick}
                whileHover="animate"
                className="p-6 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
            >
                <input
                    ref={fileInputRef}
                    id="file-upload-handle"
                    type="file"
                    accept=".txt"
                    onChange={(e) =>
                        handleFileChange(Array.from(e.target.files || []))
                    }
                    className="hidden"
                />
                <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
                    <GridPattern />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="relative z-20 font-sans font-semibold text-neutral-300 text-base">
                        Upload Custom Wordlists
                    </p>
                    <p className="relative z-20 font-sans text-neutral-500 text-sm mt-2">
                        Only .txt files accepted
                    </p>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-md flex items-center gap-2 max-w-xs"
                        >
                            <IconAlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                            <p className="text-red-300 text-sm">{error}</p>
                        </motion.div>
                    )}

                    <div className="relative w-full mt-10 max-w-xs mx-auto">
                        {files.length > 0 &&
                            files.map((file, idx) => (
                                <motion.div
                                    key={"file" + idx}
                                    layoutId={
                                        idx === 0
                                            ? "file-upload"
                                            : "file-upload-" + idx
                                    }
                                    className={cn(
                                        "relative overflow-hidden z-40 bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                                        "shadow-sm border border-green-500/30"
                                    )}
                                >
                                    <div className="flex justify-between w-full items-center gap-4">
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            layout
                                            className="text-base text-neutral-300 truncate max-w-xs"
                                        >
                                            {file.name}
                                        </motion.p>
                                        <div className="flex items-center gap-2">
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                layout
                                                className="rounded-lg px-2 py-1 w-fit shrink-0 text-sm bg-neutral-800 text-white shadow-input"
                                            >
                                                {(
                                                    file.size /
                                                    (1024 * 1024)
                                                ).toFixed(2)}{" "}
                                                MB
                                            </motion.p>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeFile(idx);
                                                }}
                                                className="text-red-400 hover:text-red-300 text-sm"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-400">
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            layout
                                            className="px-1 py-0.5 rounded-md bg-neutral-800 "
                                        >
                                            {file.type || "text/plain"}
                                        </motion.p>

                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            layout
                                        >
                                            modified{" "}
                                            {new Date(
                                                file.lastModified
                                            ).toLocaleDateString()}
                                        </motion.p>
                                    </div>
                                </motion.div>
                            ))}
                        {!files.length && (
                            // Upload Box
                            <motion.div
                                layoutId="file-upload"
                                variants={mainVariant}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                }}
                                className={cn(
                                    "relative group-hover/file:shadow-2xl z-40 bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                                    "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                                )}
                            >
                                {isDragActive ? (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-neutral-600 flex flex-col items-center"
                                    >
                                        Drop it
                                        <IconUpload className="h-4 w-4 text-neutral-400" />
                                    </motion.p>
                                ) : (
                                    <IconUpload className="h-4 w-4 text-neutral-300" />
                                )}
                            </motion.div>
                        )}

                        {!files.length && (
                            <motion.div
                                variants={secondaryVariant}
                                className="absolute opacity-0 border border-dashed border-amber-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
                            ></motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export function GridPattern() {
    const columns = 41;
    const rows = 11;
    return (
        <div className="flex bg-neutral-900 shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
            {Array.from({ length: rows }).map((_, row) =>
                Array.from({ length: columns }).map((_, col) => {
                    const index = row * columns + col;
                    return (
                        <div
                            key={`${col}-${row}`}
                            className={`w-6 h-6 flex shrink-0 rounded-[2px] ${
                                index % 2 === 0
                                    ? "bg-neutral-950"
                                    : "bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
                            }`}
                        />
                    );
                })
            )}
        </div>
    );
}
