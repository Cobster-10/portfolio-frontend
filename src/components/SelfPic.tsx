import { Flex, Box, Image, Text } from "@chakra-ui/react";
import profilePic from "../assets/aiAvatar.webp";
import Description from "../assets/SelfDescription.json";

const SelfPic = () => {
  return (
    <Flex justifyContent={"space-evenly"} border={"1px"}>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        border={"1px"}
        height={"50vh"}
        width={"50vw"}
      >
        <Image
          src={profilePic}
          objectFit={"contain"}
          borderRadius={"3xl"}
          transition="transform 0.3s ease-in-out"
          _hover={{ transform: "scale(1.1)" }}
          maxH={"100%"}
          maxW={"100%"}
        />
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        border={"1px"}
        height={"50vh"}
        width={"50vw"}
      >
        <Text fontSize={["small", "medium", "large", "larger"]}>
          {Description.Description}
        </Text>
      </Box>
    </Flex>
  );
};

export default SelfPic;
