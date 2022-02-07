module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      borderColor: {
        primary: "#C8A31F",
        secondary: "#6C9E2C",
      },
      backgroundColor: {
        primary: "#C8A31F",
        secondary: "#6C9E2C",
        red: {
          DEFAULT: "#D3BFBF",
        },
        dark: {
          300: "#4B4B4B",
          400: "#1B1B1B",
          500: "#2F3635",
          600: "#454545",
          700: "#404847",
          800: "#3D4746",
          900: "#262C2B",
        },
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          lg: "1140px",
          xl: "1140px",
          "2xl": "1320px",
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      textColor: {
        primary: "#C8A31F",
        secondary: "#6C9E2C",
        red: {
          DEFAULT: "#990A0A",
        },
        gray: {
          DEFAULT: "#CBCDCC",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
