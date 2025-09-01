"use client";

import React from "react";
import { motion } from "motion/react";

export default function ColourfulText({ text }: { text: string }) {
    const colors = [
        "rgb(255, 255, 255)", // white
        "rgb(255, 245, 200)", // very light champagne gold
        "rgb(255, 235, 150)", // soft pale gold
        "rgb(255, 225, 120)", // light gold
        "rgb(255, 210, 90)", // warm golden yellow
        "rgb(255, 190, 60)", // mid gold
        "rgb(255, 170, 30)", // rich amber gold
        "rgb(230, 150, 20)", // deeper amber
        "rgb(200, 120, 10)", // strong golden brown
        "rgb(180, 100, 0)", // deep gold / bronze
    ];

    const [currentColors, setCurrentColors] = React.useState(colors);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            const shuffled = [...colors].sort(() => Math.random() - 0.5);
            setCurrentColors(shuffled);
            setCount((prev) => prev + 1);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return text.split("").map((char, index) => (
        <motion.span
            key={`${char}-${count}-${index}`}
            initial={{
                y: 0,
            }}
            animate={{
                color: currentColors[index % currentColors.length],
                y: [0, -3, 0],
                scale: [1, 1.01, 1],
                filter: ["blur(0px)", `blur(5px)`, "blur(0px)"],
                opacity: [1, 0.8, 1],
            }}
            transition={{
                duration: 0.5,
                delay: index * 0.05,
            }}
            className="inline-block whitespace-pre font-sans tracking-tight text-7xl"
        >
            {char}
        </motion.span>
    ));
}
