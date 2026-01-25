"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl md:text-3xl font-bold transition-colors duration-300"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <span className={scrolled ? "text-charcoal" : "text-white"}>
              Eudora Pantry
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#schedule"
              className={`text-base font-medium transition-colors duration-300 ${
                scrolled
                  ? "text-charcoal hover:text-primary"
                  : "text-white hover:text-primary"
              }`}
            >
              Schedule
            </Link>
            <Link
              href="#about"
              className={`text-base font-medium transition-colors duration-300 ${
                scrolled
                  ? "text-charcoal hover:text-primary"
                  : "text-white hover:text-primary"
              }`}
            >
              About
            </Link>
            <Link
              href="#donate"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 ${
                scrolled
                  ? "bg-primary text-charcoal hover:bg-primary-dark"
                  : "bg-primary text-charcoal hover:bg-primary-dark"
              }`}
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Donate
            </Link>
          </div>

          {/* Mobile Donate Button */}
          <Link
            href="#donate"
            className={`md:hidden inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ${
              scrolled
                ? "bg-primary text-charcoal"
                : "bg-primary text-charcoal"
            }`}
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Donate
          </Link>
        </div>
      </div>
    </nav>
  );
}
