"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"        // Apply theme via class on the <html> element
      defaultTheme="dark"     // Default to the user's system preference
      {...props}                // Allow additional props to override defaults
    >
      {children}
    </NextThemesProvider>
  );
}
