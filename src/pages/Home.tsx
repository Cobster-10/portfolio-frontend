import React, { Suspense, useState } from "react";
import NavBar from "../components/NavBar";
import Resume from "../components/Resume";
import SelfPic from "../components/SelfPic";
import { Canvas } from "@react-three/fiber";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Link,
  Text,
  Image,
} from "@chakra-ui/react";
import resumeIcon from "../assets/resume.png";

import "./Home.css";
import Loader from "../components/CustomLoader";
import CustomLoader from "../components/CustomLoader";
import Robot from "../models/Robot";
import { Vector3 } from "three";
import Description from "../assets/SelfDescription.json";
import HeartButton from "../components/HeartButton";

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);

  const [RobotAnimation, setRobotAnimation] = useState<string>(
    "RobotArmature|Robot_Dance"
  );
  const [AnimationCase, setAnimationCase] = useState(1);

  const [canvasHeight, setCanvasHeight] = useState(calculateCanvasHeight());
  const [rowHeight, setRowHeight] = useState(calculateRowHeight());
  function calculateCanvasHeight() {
    const vh40 = window.innerHeight * 0.4;
    return vh40 > 300 ? "40vh" : "300px";
  }
  function calculateRowHeight() {
    const cHeight = canvasHeight;
    if (cHeight === "40vh") {
      return "20vh";
    } else { 
      return "150px";
    }
  }

  window.addEventListener("resize", () => {
    setCanvasHeight(calculateCanvasHeight());
    setRowHeight(calculateRowHeight());
  });

  return (
    <div className="app-background">
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={5}
      >
        <Heading size={["sm", "md", "lg", "xl"]}>
          Howdy! I'm Jacob Kuruvilla
        </Heading>

        <HeartButton></HeartButton>
      </Box>
      <SelfPic></SelfPic>

      <Grid
        height={canvasHeight}
        templateColumns={"repeat(12, 1fr)"}
        
        templateRows={"repeat(2, 1fr)"}
      >
        <GridItem colStart={1} colEnd={8} rowStart={1} rowEnd={2}>
          <Flex alignContent={"center"} justifyContent={"center"}  height={"100%"}>
            <Heading alignSelf={"center"}  size={["sm", "md", "lg", "xl"]}>
              Check out my Resume!
            </Heading>
          </Flex>
        </GridItem>
        <GridItem colStart={1} colEnd={8} rowStart={2} rowEnd={3} height={rowHeight}>
          <Flex justifyContent={"center"}  height={"20vh"}>
            <Link
              isExternal
              href="https://drive.google.com/file/d/1gocyZkpnJLAyVIyyGO1L1Vu7TiMmk-0g/view?usp=sharing"
            >
              <Image
                transition="transform 0.3s ease-in-out"
                _hover={{ transform: "translateY(-10px)" }}
                src={resumeIcon}
                height={"75%"}
              />
            </Link>
          </Flex>
        </GridItem>

        <GridItem colStart={8} colEnd={11} rowStart={1} rowEnd={3}>
          <Flex
            
            className={isRotating ? "cursor-grabbing" : "cursor-grab"}
            height={canvasHeight}
          >
            <Canvas camera={{ position: [0, 0, 5], near: 0.1, far: 1000 }}>
              <Suspense fallback={<CustomLoader />}>
                <directionalLight position={[1, 1, 1]} intensity={5} />
                <hemisphereLight groundColor={"#000000"} />

                <Robot
                  position={new Vector3(0, -2, 0)}
                  scale={new Vector3(1, 1, 1)}
                  rotation={[0, 0, 0]}
                  isRotating={isRotating}
                  setIsRotating={setIsRotating}
                  RobotAnimation={RobotAnimation}
                  setRobotAnimation={setRobotAnimation}
                  AnimationCase={AnimationCase}
                  setAnimationCase={setAnimationCase}
                ></Robot>
              </Suspense>
            </Canvas>
          </Flex>
        </GridItem>
      </Grid>
    </div>
  );
};

export default Home;
