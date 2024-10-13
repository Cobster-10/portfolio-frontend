import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
} from "@chakra-ui/react";
import React from "react";
import resumeIcon from "../assets/resume.png";

const Resume = () => {
  return (
    <Grid templateColumns="auto 30vw 35vw" height="25vh" gap={4}>
      <GridItem
        border={"1px"}
        gridColumn={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Link isExternal href="https://drive.google.com/file/d/1gocyZkpnJLAyVIyyGO1L1Vu7TiMmk-0g/view?usp=sharing">
          <Image
            transition="transform 0.3s ease-in-out"
            _hover={{ transform: "translateY(-10px)" }}
            src={resumeIcon}
            boxSize="25vh"
            border="1px"
          />
        </Link>
      </GridItem>
      <GridItem
        border={"1px"}
        gridColumn={3}
        display="flex"
        justifyContent={"flex-start"}
        alignItems="center"
      >
        <Heading size={["sm", "md", "lg", "xl"]}>
          Click to view my resume!
        </Heading>
      </GridItem>
    </Grid>
  );
};

export default Resume;
