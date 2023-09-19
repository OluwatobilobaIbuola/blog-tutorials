/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        lightPrimary: "var(--lightPrimary)",
        darkPrimary: "var(--darkPrimary)",
        secondary: "var(--secondary)",
        secondaryTwo: "var(--secondaryTwo)",
        secondaryOrange: "var(--secondaryOrange)",
        secondaryOrangeTwo: "var(--secondaryOrangeTwo)",
        secondaryOrangeThree: "var(--secondaryOrangeThree)",
        blackFive: "var(--blackFive)",
        blackTen: "var(--blackTen)",
        subtext: "var(--subtext)",
        bgInput: "var(--bgInput)",
        alertWarning: "var(--alertWarning)",
        alertRemove: "var(--alertRemove)",
        fade: "var(--fade)",
        grayOne: "var(--grayOne)",
        grayTwo: "var(--grayTwo)",
        grayThree: "var(--grayThree)",
        grayFour: "var(--grayFour)",
        grayFive: "var(--grayFive)",
        graySix: "var(--graySix)",
        graySeven: "var(--graySeven)",
        grayEight: "var(--grayEight)",
        lightGray: "var(--lightGray)",
        paleBlue: "var(--paleBlue)",
        paleBlueTwo: "var(--paleBlueTwo)",
        textGrayTwo: "var(--textGrayTwo)",
        textGrayThree: "var(--textGrayThree)",
        textGrayOne: "var(--textGrayOne)",
        lightGreen: "var(--lightGreen)",
        darkGreen: "var(--darkGreen)",
        lightPurple: "var(--lightPurple)",
        darkPurple: "var(--darkPurple)",
        darkGray: "var(--darkGray)",
        lightBlueGray: "var(--lightBlueGray)",
        lightRed: "var(--lightRed)",
        redOrange: "var(--redOrange)",
        altPrimary: "var(--altPrimary)",
        gray: {
          0: "#F9FAFC",
          5: "#F4F5F7",
          10: "#F4EFEB",
          15: "#AAADB7",
          20: "#838E9A",
          25: "#AEAEAE",
          30: "#6E6E6E",
          35: "rgba(28,28,28,0.3)",
          40: "#6E6E6E",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      borderRadius: { radius6: "6px" },
    },
  },
};
