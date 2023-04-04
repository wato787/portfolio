import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    styles: {
      global: {
        body: {
          backgroundColor: "#111111",
          color:"white"
        },
        html: {
          height: "100%", 
        },
      },
    },
  });
  