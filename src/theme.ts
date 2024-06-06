import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: 'dark',
}


const theme = extendTheme({
  config: {config},
  components: {
    Drawer: {
      variants: {
        permanent: {
          dialog: {
            pointerEvents: 'auto',
          },
          dialogContainer: {
            pointerEvents: 'none',
          },
        },
      },
    },
  },
});

export default theme;