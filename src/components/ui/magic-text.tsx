"use client" 

import * as React from "react"
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
 
export interface MagicTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
}
 
interface WordProps {
  children: string;
  progress: any;
  range: number[];
  className?: string;
}
 
const Word: React.FC<WordProps> = ({ children, progress, range, className }) => {
  const opacity = useTransform(progress, range, [0, 1]);
 
  return (
    <span className={`relative mr-2 inline-block ${className || ""}`}>
      <span className="absolute opacity-[0.12] left-0 top-0 select-none pointer-events-none">{children}</span>
      <motion.span style={{ opacity: opacity }} className="relative z-10">{children}</motion.span>
    </span>
  );
};
 
export const MagicText: React.FC<MagicTextProps> = ({ text, className = "", wordClassName = "" }) => {
  const container = useRef(null);
 
  // Perfect scroll tracking when element enters to when it leaves
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "end 0.2"],
  });

  // Subtle Cinematic Zoom and smooth fade, kept constrained to prevent horizontal overflow on mobile
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0.93, 1.0, 1.0, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [40, 0, 0, -40]);
  
  const words = text.split(" ");
  
  // Word fade-in animation starts and completes in a highly controlled window
  // of the scroll ([0.05, 0.5]) so that the user has a long, stable, static 
  // perfect-view phase ([0.5, 0.8]) to read the fully revealed quote.
  const animationStart = 0.05;
  const animationEnd = 0.55;
  const rangeSpan = animationEnd - animationStart;
 
  return (
    <motion.p 
      ref={container} 
      style={{ scale, opacity, y }}
      className={`flex flex-wrap items-center justify-center leading-relaxed h-full ${className}`}
    >
      {words.map((word, i) => {
        const start = animationStart + (i / words.length) * rangeSpan;
        const end = start + (1 / words.length) * rangeSpan;
 
        return (
          <Word 
            key={i} 
            progress={scrollYProgress} 
            range={[start, end]}
            className={wordClassName}
          >
            {word}
          </Word>
        );
      })}
    </motion.p>
  );
};
