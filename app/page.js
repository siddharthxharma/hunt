"use client";

import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import Navbar from "./(components)/Navbar";

const Home = () => {
  return (
    <>
    <Navbar />
    <motion.section className="relative grid place-content-center px-4 py-48 text-gray-200">
      <div>
        Hello World.
      </div>
    </motion.section>
    </>
  );
};

export default Home;
