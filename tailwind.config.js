import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: ["'Source Sans 3'", ...defaultTheme.fontFamily.sans],
      montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
      "source-code": ["'Source Code Pro'", ...defaultTheme.fontFamily.mono],
    },
    extend: {
      fontSize: {
        xs: ["0.75rem", { fontWeight: "500", lineHeight: "1.25rem" }],
        sm: ["0.875rem", { fontWeight: "500", lineHeight: "1.375rem" }],
        base: ["1.063rem", { fontWeight: "500", lineHeight: "1.5rem" }],
        md: ["1rem", { fontWeight: "500", lineHeight: "1.5rem" }],
        lg: ["1.25rem", { fontWeight: "500", lineHeight: "1.75rem" }],
        xl: ["1.5rem", { fontWeight: "500", lineHeight: "2.125rem" }],
        "2xl": ["1.813rem", { fontWeight: "500", lineHeight: "2.625rem" }],
        "3xl": ["2.188rem", { fontWeight: "500", lineHeight: "3rem" }],
        "4xl": ["2.625rem", { fontWeight: "500", lineHeight: "3.5rem" }],
      },
    },
  },
  plugins: [],
};
