"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Providers";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";

const inter = Inter({ subsets: ["latin"] });

const COLORS_TOP = ["#B8FFE5", "#1E67C6", "#CE84CF", "#DD335C"];

export default function RootLayout({ children }) {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;

  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#030114] text-gray-100`}>
        <motion.div
          style={{ backgroundImage }}
          className="relative min-h-screen overflow-hidden bg-gray-950 text-gray-200"
        >
          <div className="absolute inset-0 z-0">
            <Canvas>
              <Stars radius={50} count={2500} factor={4} fade speed={2} />
            </Canvas>
          </div>
          <div className="relative z-10">
            <AuthProvider>
              {children}
            </AuthProvider>
          </div>
        </motion.div>
      </body>
    </html>
  );
}
