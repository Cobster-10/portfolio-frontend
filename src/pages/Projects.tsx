import { Box, Flex, HStack, Stack } from "@chakra-ui/react";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useState } from "react";
import { Vector3 } from "three";
import CustomLoader from "../components/CustomLoader";
import Robot from "../models/Robot";
import ProjectImage from "../components/ProjectImage";
import ProjectDescription from "../components/ProjectDescription";
import Project from "../components/Project";
import CameraAnimator from "../models/CameraAnimator";
import { MoveCameraProvider, useMoveCamera } from "../Hooks/useMoveCamera";
import axios from "axios";

const Projects = () => {
  const [isRotating, setIsRotating] = useState(false);


  const {
    state: moveCamera,
    setState: setMoveCamera,
    RobotAnimation,
    setRobotAnimation,
    AnimationCase, 
    setAnimationCase
  } = useMoveCamera() as { state: any; setState: any; RobotAnimation: any; setRobotAnimation: any; AnimationCase: any; setAnimationCase: any; };
  console.log(moveCamera);

  const [projects, setProjects] = useState([]);
  useEffect(() => {
    console.log("hello");
    const fetchProjects = async () => {
      axios.get("https://young-beyond-68677-346fa410ea44.herokuapp.com/api/db/projects")
      .then((response) => {
        setProjects(response.data);
        for (let i = 0; i < response.data.length; i++) {
          console.log(response.data[i]);
        }
        
      })
      .catch((error) => {
        console.log(error);
      });
    }
    fetchProjects();
  }, []);




  return (
    <>
      <Box
        position={"fixed"}
        top={"12vh"}
        left={"0"}
        width={"25vw"}
        height={"88vh"}
        
        className={isRotating ? "cursor-grabbing" : "cursor-grab"}
      >
        <Canvas camera={{ position: [0, 0, 5], near: 0.1, far: 1000 }}>
          <Suspense fallback={<CustomLoader />}>
            <directionalLight position={[1, 1, 1]} intensity={5} />
            <hemisphereLight groundColor={"#000000"} />
            <CameraAnimator animate={moveCamera} setAnimate={setMoveCamera} />

            <Robot
              position={new Vector3(0, -1, 0)}
              scale={new Vector3(0.5, 0.5, 0.5)}
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
      </Box>

      <Stack marginLeft={"25vw"} spacing={10}>
        {projects.map((project) => (
          <Project
            data={project}
          />
        ))}
        {/* <Project data={{}}/>
        <Project data={{}}/> */}
      </Stack>
    </>
  );
};

export default Projects;
