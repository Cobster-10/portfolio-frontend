import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Image,
  Stack,
} from "@chakra-ui/react";
import projectBG from "../assets/projectBG.jpg";
import { BsArrowUpRight } from "react-icons/bs";
import reactgame from "../assets/reactGame.png";
import { useMoveCamera } from "../Hooks/useMoveCamera";

type ProjectImageProps = {
  data: Record<string, any>;
};

const ProjectImage = ({data}: ProjectImageProps ) => {
  const {
    setState: setMoveCamera,
    setRobotAnimation,
    setAnimationCase,
  } = useMoveCamera() as { setState: any; setRobotAnimation: any; setAnimationCase: any; };
  return (
    <>
      <Stack border={"1px"}>
        <Flex
          width={"35vw"}
          aspectRatio={3 / 2}
          backgroundImage={projectBG}
          backgroundSize={"contain"}
          backgroundRepeat={"no-repeat"}
          justifyContent={"center"}
          borderRadius={"5px"}
        >
          <Image
            border={"1px"}
            src={data.image? data.image: null}
            alt="Hyperledger"
            width={"90%"}
            height={"fit-content"}
            alignSelf={"center"}
            maxH={"100%"}
            objectFit={"contain"}
            borderRadius={"5px"}
            transition="transform 0.3s ease" // Adds smoothness to the scale transition
            _hover={{
              transform: "scale(1.1)", // Scales the image to 110% of its original size on hover
            }}
            onMouseEnter={() => {
              setMoveCamera(true);
              setRobotAnimation("RobotArmature|Robot_Death");
              setAnimationCase(2);
            }}
            onMouseLeave={() =>{ setMoveCamera(false);
              setAnimationCase(3);
             }}
          />
        </Flex>
        <Divider marginX={"auto"} width={"80%"} color={"black"} />
        <HStack dir="row" spacing={4} paddingX={"5px"}>
          
          {data.Links &&
            Object.entries(data.Links).map(([link_name, link_url]) => (
              <Button target="_blank" as='a' href={link_url as string} variant={"brandPrimary"} rightIcon={<BsArrowUpRight />}>
            {link_name}
          </Button>
            ))
          }
          

          
          
        </HStack>
      </Stack>
    </>
  );
};

export default ProjectImage;
