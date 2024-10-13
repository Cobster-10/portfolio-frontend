import { Avatar, Box, Flex, useColorModeValue } from "@chakra-ui/react";
import profilePic from "../assets/Jacob Kuruvilla (1).jpg";
const NavBar = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const hoverBgColor = useColorModeValue("gray.100", "gray.700");
  return (
    
    <Flex
      direction={"row"}
      border="1px"
      borderColor={"black"}
      h="12vh"
      minHeight={"80px"}
      className="nav"
      alignItems={"center"}
      borderBottomRadius={"md"}
      position="fixed"  
      top="0"
      left="0"
      right={"0"}
      zIndex={1000}  
      boxShadow="md"
    >
      {NAV_ITEMS.map((navItem: NavItem) => (
        <Box
          as="a"
          px={[2, 3, 4]}
          href={navItem.href ?? "#"}
          fontSize={["sm", "md", "large"]}
          fontWeight={500}
          color={linkColor}
          _hover={{
            textDecoration: "none",
            color: linkHoverColor,
            backgroundColor: hoverBgColor, // Background color on hover
          }}
          border={"1px"}
          borderRadius={"md"}
          transition={"background-color 0.3s ease"}
        >
          {navItem.label}
        </Box>
      ))}
      <Flex flexGrow={1} justifyContent={"end"}>
        <Avatar size={"lg"} src={profilePic} marginRight={"1vw"} />
      </Flex>
    </Flex>
  );
};

export default NavBar;

interface NavItem {
  label: string;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Support",
    href: "#",
  },
  {
    label: "Contact",
    href: "#",
  },
];
