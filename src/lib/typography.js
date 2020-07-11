import Typography from "typography";
import "assets/fonts/fonts.css";

export const fonts = {
  thin: "Lato Thin",
  // thinItalic: 'Inter Thin Italic',
  light: "Lato Light",
  // lightItalic: 'Inter Light Italic',
  regular: "Lato Regular",
  // regularItalic: 'Inter Regular Italic',
  // medium: 'Inter Medium',
  // mediumItalic: 'Inter Medium Italic',
  semibold: "Lato Bold",
  // semiboldItalic: 'Inter Semibold Italic',
  bold: "Lato Black",
  // boldItalic: 'Inter Bold Italic',
  titles: "Phosphate",
};

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.55,
  headerLineHeight: 1.4,
  headerFontFamily: [fonts.light, "sans-serif"],
  bodyFontFamily: [fonts.regular, "sans-serif"],
  headerColor: "hsla(0,0%,0%,0.9)",
  bodyColor: "hsla(0,0%,0%,0.8)",

  overrideStyles: ({ rhythm }) => ({
    body: {
      fontVariantLigatures: "none",
    },
    h1: {
      color: "#0443ac",
      fontFamily: fonts.titles,
    },
    "h1 code, h2 code, h3 code, h4 code, h5 code, h6 code": {
      fotSize: "inherit",
    },
    h2: {
      color: "#0443ac",
      fontFamily: fonts.titles,
    },
    "h1,h2,h3,h4,h5,h6": {
      lineHeight: 1,
    },
    "h1,h2,h3,h4": {
      lineHeight: 1.25,
      marginTop: rhythm(1),
      marginBottom: rhythm(1 / 2),
      letterSpacing: "-0.04rem",
    },
    strong: {
      fontFamily: fonts.bold,
      fontStyle: "bold",
    },
  }),
});
// Hot reload typography in development.
if (process.env.NODE_ENV !== "production") {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scalen;
