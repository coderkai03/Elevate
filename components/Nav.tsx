"use client";

import { useLayoutEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HumeLogo from "./logos/Hume"; // Replace with your logo if necessary
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import Github from "./logos/GitHub";
import logo from "@/public/pic/logo.png";
import bg from "@/public/pic/background1.png";
import pkg from '@/package.json'; // You can modify this if you don't need it

export const Nav = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useLayoutEffect(() => {
    const el = document.documentElement;

    if (el.classList.contains("dark")) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  const toggleDark = () => {
    const el = document.documentElement;
    el.classList.toggle("dark");
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div>
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image src={logo} alt="logo" className="w-8 h-8 rounded-md" />
          <span className="text-2xl font-bold">Elevate</span>

          <nav className="hidden md:flex space-x-6 pl-8">
            <Link className="text-gray-600 hover:text-gray-900" href="#">
              About
            </Link>
            <Link className="text-gray-600 hover:text-gray-900" href="#">
              Features
            </Link>
            <Link className="text-gray-600 hover:text-gray-900" href="#">
              Pricing
            </Link>
            <Link className="text-[#9687EC] hover:text-[#3D364B]" href="#">
              Cases
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {/* <Button
            onClick={() => {
              window.open(pkg.homepage, "_blank", "noopener noreferrer");
            }}
            variant={"ghost"}
            className={"flex items-center gap-1.5"}
          >
            <span>
              <Github className={"size-4"} />
            </span>
            <span>Star on GitHub</span>
          </Button> */}

          {/* <Button onClick={toggleDark} variant={"ghost"} className="flex items-center gap-1.5">
            <span>{isDarkMode ? <Sun className={"size-4"} /> : <Moon className={"size-4"} />}</span>
            <span>{isDarkMode ? "Light" : "Dark"} Mode</span>
          </Button> */}

          <button className="hidden md:block text-gray-600 hover:text-gray-900">Log In</button>
          <button className="bg-[#9687EC] text-white px-4 py-2 rounded-md hover:bg-[#3D364B] transition duration-300">
            Sign In
          </button>
        </div>
      </header>
    </div>
  );
};
