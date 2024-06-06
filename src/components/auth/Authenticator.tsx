import { PropsWithChildren } from "react";
import {
  Authenticator as AmplifyAuthenticator,
  ThemeProvider as AmplifyThemeProvider,
  Theme,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

// Import Styles
import "./Authenticator.css";
import logo from "../../assets/EnchantedRealmsLogoLightGray.svg";

const Authenticator: React.FC<PropsWithChildren> = ({ children }) => {
  const theme: Theme = {
    name: "vtt",
    tokens: {
      colors: {
        font: {
          secondary: { value: "{colors.brand.primary.90}" },
        },
        brand: {
          primary: {
            10: { value: "{colors.overlay.10}" },
            20: { value: "{colors.overlay.20}" },
            40: { value: "{colors.overlay.40}" },
            60: { value: "{colors.overlay.60}" },
            80: { value: "{colors.overlay.80}" },
            90: { value: "{colors.black}" },
            100: { value: "{colors.black}" },
          },
          secondary: {
            10: { value: "{colors.neutral.10}" },
            20: { value: "{colors.neutral.20}" },
            40: { value: "{colors.neutral.40}" },
            50: { value: "{colors.neutral.50}" },
            60: { value: "{colors.neutral.60}" },
            70: { value: "{colors.neutral.70}" },
            80: { value: "{colors.neutral.80}" },
            90: { value: "{colors.neutral.90}" },
            100: { value: "{colors.neutral.100}" },
          },
        },
      },
      radii: {
        small: { value: "0.75rem" },
      },
      components: {
        authenticator: {
          modal: {
            backgroundColor: { value: "{colors.brand.primary.100}" },
          },
          router: {
            borderWidth: { value: "0" },
            backgroundColor: { value: "#bbb" },
          },
          state: {
            inactive: {
              backgroundColor: { value: "{colors.brand.primary.100}" },
            },
          },
        },
        tabs: {
          item: {
            borderColor: { value: "{colors.brand.primary.20}" },
            color: { value: "{colors.brand.secondary.70}" },
            backgroundColor: { value: "{colors.brand.primary.10}" },
            _active: {
              backgroundColor: { value: "{colors.brand.secondary.50}" },
              color: { value: "{colors.brand.secondary.100}" },
              borderColor: { value: "#bbb" },
            },
            _hover: {
              color: { value: "{colors.brand.secondary.40}" },
            },
            _focus: {
              color: { value: "{colors.brand.secondary.40}" },
            },
          },
        },
      },
    },
  };

  return (
    <AmplifyThemeProvider theme={theme}>
      <AmplifyAuthenticator
        variation="modal"
        components={{
          Header: () => (
            <div className="auth-container auth-top-div">
              <img
                className="auth_top_icon"
                src={logo}
                width="24"
                height="24"
              />
              <div className="text mx-2">Enchanted Realms</div>
            </div>
          ),
          Footer: () => <div className="container-fluid auth-bottom-div" />,
        }}
        formFields={{
          signUp: {
            email: {
              label:
                "Email (A validation code is sent to this email for account verification. Please check you spam folder.)",
              placeholder: "Enter your email",
            },
          },
        }}
      >
        {children}
      </AmplifyAuthenticator>
    </AmplifyThemeProvider>
  );
};

export default Authenticator;
