"use client";

import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // ⛔ Evita renderizar en SSR

  return resolvedTheme === "dark" ? (
    <FiSun
      onClick={() => setTheme("light")}
      size={40}
      className="cursor-pointer text-yellow-300 hover:text-yellow-400 transition"
      title="Modo claro"
    />
  ) : (
    <FiMoon
      onClick={() => setTheme("dark")}
      size={40}
      className="cursor-pointer text-gray-700 hover:text-gray-900 transition"
      title="Modo oscuro"
    />
  );
}
