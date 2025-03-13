import React, { useRef, useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

export function Marquee({ items, direction = "left", speed = 20, className }: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [duplicateCount, setDuplicateCount] = useState(2);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const count = Math.ceil((containerWidth * 2) / (containerWidth / items.length)) + 1;
    setDuplicateCount(count);
  }, [items.length]);

  return (
    <div className={cn("relative flex overflow-hidden", className)}>
      <motion.div
        ref={containerRef}
        className="flex whitespace-nowrap"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {Array(duplicateCount)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  className="mx-8 text-lg font-mono text-[#4646E0]"
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    rotate: {
                      duration: 20,
                      ease: "linear",
                      repeat: Infinity,
                    }
                  }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          ))}
      </motion.div>
    </div>
  );
} 