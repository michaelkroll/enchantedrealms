// React Imports
import { useEffect } from "react";

import { Link as ReactRouterLink } from "react-router-dom";
import {
  Link as ChakraLink,
  Tab,
  TabIndicator,
  TabList,
  Tabs,
  useBreakpointValue,
} from "@chakra-ui/react";

// Chakra UI Imports
import {
  HStack,
  Image,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

// Icon Imports
import { HamburgerIcon } from "@chakra-ui/icons";
import { MdOutlineDarkMode, MdDarkMode, MdInfoOutline } from "react-icons/md";
import { HiOutlineLogout, HiOutlineUser } from "react-icons/hi";
import LogoutConfirmationAlert from "./LogoutConfirmationAlert";
import AboutAlert from "./AboutAlert";
import UserDataAlert from "../userdata/UserDataAlert";

import blackLogo from "../../assets/EnchantedRealmsLogoBlack.svg";
import whiteLogo from "../../assets/EnchantedRealmsLogoWhite.svg";

interface Props {
  email: string;
  sub: string;
  onLogout: () => void;
  onFetchUserProperties: () => void;
}

const NavBar = ({ email, sub, onLogout, onFetchUserProperties }: Props) => {
  // Hook to load the user properties from Amplify
  useEffect(() => {
    onFetchUserProperties();
  }, []);

  // Used for the Color mode toggle and color mode dependent colors
  const { toggleColorMode, colorMode } = useColorMode();
  const navBarColor = useColorModeValue("gray.200", "gray.600");

  const fontSize = useBreakpointValue({
    xs: "9px",
    sm: "9px",
    md: "14px",
    lg: "14px",
    xl: "20px",
    "2xl": "20px",
  });

  const getLogo = (): string => {
    return colorMode == "dark" ? whiteLogo : blackLogo;
  };

  // Logout Confirmation Alert related
  const {
    isOpen: isLogoutConfirmAlertOpen,
    onOpen: onLogoutConfirmAlertOpen,
    onClose: onLogoutConfirmAlertClose,
  } = useDisclosure();

  // About Alert related
  const {
    isOpen: isAboutAlertOpen,
    onOpen: onAboutAlertOpen,
    onClose: onAboutAlertClose,
  } = useDisclosure();

  // UserData related
  const {
    isOpen: isUserDataAlertOpen,
    onOpen: onUserDataAlertOpen,
    onClose: onUserDataAlertClose,
  } = useDisclosure();

  const handleLogout = () => {
    onLogout();
  };

  return (
    <>
      <HStack
        justifyContent="space-between"
        padding="10px"
        background={navBarColor}
        width="100%"
      >
        <HStack>
          <Image boxSize="30px" src={getLogo()} />
          <Text as="b" fontSize="xl">
            Enchanted Realms
          </Text>
        </HStack>

        <HStack>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              <MenuGroup title="Info">
                <MenuItem icon={<MdInfoOutline />} onClick={onAboutAlertOpen}>
                  About Enchanted Realms
                </MenuItem>
              </MenuGroup>

              <MenuGroup title="Settings">
                <MenuItem
                  onClick={toggleColorMode}
                  icon={
                    colorMode === "dark" ? (
                      <MdDarkMode />
                    ) : (
                      <MdOutlineDarkMode />
                    )
                  }
                >
                  {colorMode === "dark"
                    ? "Enable Light Mode"
                    : "Enable Dark Mode"}
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title={"Logged In: " + email}>
                <MenuItem
                  icon={<HiOutlineUser />}
                  onClick={onUserDataAlertOpen}
                >
                  User Data
                </MenuItem>
                <MenuItem
                  icon={<HiOutlineLogout />}
                  onClick={onLogoutConfirmAlertOpen}
                >
                  Logout
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </HStack>
      </HStack>
      <Tabs>
        <TabList>
          <Tab>
            <ChakraLink
              as={ReactRouterLink}
              to="/adventures"
              style={{
                textDecoration: "none",
                fontSize: fontSize,
              }}
            >
              Adventures
            </ChakraLink>
          </Tab>
          <Tab>
            <ChakraLink
              as={ReactRouterLink}
              to="/maps"
              style={{ textDecoration: "none", fontSize: fontSize }}
            >
              Maps
            </ChakraLink>
          </Tab>
          <Tab>
            <ChakraLink
              as={ReactRouterLink}
              to="/tokens"
              style={{ textDecoration: "none", fontSize: fontSize }}
            >
              Tokens
            </ChakraLink>
          </Tab>
          <Tab>
            <ChakraLink
              as={ReactRouterLink}
              to="/entities"
              style={{ textDecoration: "none", fontSize: fontSize }}
            >
              Entities
            </ChakraLink>
          </Tab>
          <Tab>
            <ChakraLink
              as={ReactRouterLink}
              to="/scenes"
              style={{ textDecoration: "none", fontSize: fontSize }}
            >
              Scenes
            </ChakraLink>
          </Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />
      </Tabs>

      <LogoutConfirmationAlert
        isOpen={isLogoutConfirmAlertOpen}
        onClose={onLogoutConfirmAlertClose}
        onLogout={handleLogout}
      />
      <AboutAlert isOpen={isAboutAlertOpen} onClose={onAboutAlertClose} />
      <UserDataAlert
        loggedInEmail={email}
        loggedInSub={sub}
        isOpen={isUserDataAlertOpen}
        onClose={onUserDataAlertClose}
        onFetchUserProperties={onFetchUserProperties}
      />
    </>
  );
};

export default NavBar;
