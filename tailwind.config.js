module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            fontSize: "1rem",
            fontWeight: 300,
            p: {
              marginBottom: "0.5rem",
            },
            h2: {
              fontSize: "1.125rem",
              lineHeight: "1.5rem",
              fontWeight: 400,
              marginTop: "0.5rem",
              marginBottom: "0.25rem"
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
