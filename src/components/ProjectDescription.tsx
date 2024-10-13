import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import "./../pages/Projects.css";

import profilePic from "../assets/Jacob Kuruvilla (1).jpg";

interface ProjectDescriptionProps {
  data: Record<string, any>;
}

const ProjectDescription = ({ data }: ProjectDescriptionProps) => {
  return (
    <Flex
      gap={"5px"}
      direction="column"
      width="35vw"
      
      justifyContent={"center"}
    >
      <Flex width={"100%"} >
        <Heading size={["sm", "md", "lg", "xl"]}>
          {data.name ? data.name : "Project"}
        </Heading>
      </Flex>
      <Flex alignContent={"center"} >
        <Avatar size={"md"} src={profilePic} marginRight={"1vw"} />
        <Text
          alignContent={"center"}
          fontSize={["small", "medium", "large", "larger"]}
        >
          - Jacob Kuruvilla {data.date ? data.date : null}
        </Text>
      </Flex>
      <Box display="flex" justifyContent={"center"}>
        <Text
          paddingX={"4px"}
          width={"100%"}
          borderRadius={"5px"}
          bg="yellow.500"
          color={"white"}
          maxW={"35vw"}
          fontSize={["small", "medium", "large", "larger"]}
        >
          {data.description ? data.description : "More info coming soon ..."}
        </Text>
      </Box>
      <Flex wrap={"wrap"}  justifyContent={"flex-start"}>
        {data.Skills
          ? data.Skills.map((skill: string) => (
              <Box
                paddingX={"8px"}
                bgColor={"red.400"}
                margin="2px"
                borderRadius={"5px"}
                border={"1px"}
                justifyContent={"center"}
                width={"fit-content"}
              >
                <Text color={"white"} fontSize={["small", "medium", "large"]}>
                  {skill}
                </Text>
              </Box>
            ))
          : null}
      </Flex>
    </Flex>
  );
};

export default ProjectDescription;
