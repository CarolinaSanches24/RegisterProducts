import { extendTheme } from "@chakra-ui/react";

const customTheme = {
    colors: {
        primary: "#6D28D9",
        secondary: "#34D399",
      },
      fonts: {
        body: "Roboto, sans-serif",
        heading: "Montserrat, serif",
        
      },
};

const theme = extendTheme(customTheme);

export default theme;