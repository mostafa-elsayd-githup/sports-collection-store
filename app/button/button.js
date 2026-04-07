"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  
  // مكان محجوز شفاف عشان الصفحة متتحركش وقت التحميل
  if (!mounted) return <div className="p-2 w-9 h-9" />; 

  return (
    <button
    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      // شيلنا الـ border والـ bg والـ hover effect
      className="relative flex items-center justify-center bg-transparent border-0 cursor-pointer"
      aria-label="Toggle Dark Mode"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.div
            key="sun"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* الشمس بلون الـ rating اللي حددناه */}
            <Sun size={22} color="var(--rating-color)" strokeWidth={2} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* القمر بلون النص الأساسي بتاعك */}
            <Moon size={22} color="var(--color-primary)" strokeWidth={2} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}