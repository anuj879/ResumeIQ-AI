export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {
    colors: { navy: "#101B2D", off: "#F7F7F2", lime: "#C6F36B", softblue: "#DCE9F5", muted: "#8A929E" },
    fontFamily: { heading: ["Manrope", "sans-serif"], sans: ["Inter", "sans-serif"] },
    boxShadow: { card: "0 1px 3px rgba(16,27,45,.08), 0 10px 28px -14px rgba(16,27,45,.14)" },
  } },
  plugins: [],
};
