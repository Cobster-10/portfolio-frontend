import { VariableSizeList as List } from "react-window";

import { Box, Flex, HStack, Stack } from "@chakra-ui/react";
import { Canvas } from "@react-three/fiber";
import React, { lazy, Suspense, useEffect, useState, useCallback } from "react";
import { Vector3 } from "three";
import CustomLoader from "../components/CustomLoader";
import Robot from "../models/Robot";
import ProjectImage from "../components/ProjectImage";
import ProjectDescription from "../components/ProjectDescription";
// import Project from "../components/Project";
import CameraAnimator from "../models/CameraAnimator";
import { MoveCameraProvider, useMoveCamera } from "../Hooks/useMoveCamera";
import axios from "axios";
import { useInView } from "react-intersection-observer";

const Project = lazy(() => import("../components/Project"));

const Projects = () => {
  const [isRotating, setIsRotating] = useState(false);
  

  const {
    state: moveCamera,
    setState: setMoveCamera,
    RobotAnimation,
    setRobotAnimation,
    AnimationCase,
    setAnimationCase,
  } = useMoveCamera() as {
    state: any;
    setState: any;
    RobotAnimation: any;
    setRobotAnimation: any;
    AnimationCase: any;
    setAnimationCase: any;
  };
  console.log(moveCamera);

  const [projects, setProjects] = useState([]);
  const [heights, setHeights] = useState<number[]>([]);
  useEffect(() => {
    console.log("hello");
    const fetchProjects = async () => {
      axios
        .get(
          "https://young-beyond-68677-346fa410ea44.herokuapp.com/api/db/projects"
        )
        .then((response) => {
          setProjects(response.data);
          
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchProjects();
  }, []);

  const setProjectHeight = useCallback((index: number, height: number) => {
    setHeights((prevHeights) => {
      const newHeights = [...prevHeights];
      newHeights[index] = height;
      return newHeights;
    });
  }, []);
  const getItemSize = (index: number) => heights[index];

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
          <ProjectLoader  data={project} />
        ))}
        
      </Stack>

      

      {/* <Stack marginLeft={"25vw"} spacing={10}>
        <Suspense fallback={<div>Loading...</div>}>
          <List
            height={800} // The height of the container (visible window)
            itemCount={projects.length} // Total number of items
            itemSize={getItemSize} // Height of each item (adjust as needed)
            width="100%" // The width of the container
          >
            {({index, style,}: {
              index: number;
              style: React.CSSProperties;
            }) => (
              <div style={style}>
                <Project data={projects[index]} />
              </div>
            )}
          </List>
        </Suspense>
      </Stack> */}
    </>
  );



};

interface ProjectData {
  // Define the structure of your project data here
  data:any;
  
}

const ProjectLoader = ({ data }: { data: ProjectData }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only load once when the component is in view
    threshold: 0.1,    // Load when 10% of the component is visible
  });

  return (
    <div ref={ref}>
      {inView ? (
        <Suspense fallback={<div>Loading...</div>}>
          <Project data={data} />
        </Suspense>
      ) : (
        <div style={{ height: '200px' }}> {/* Placeholder height */} </div>
      )}
    </div>
  );
};

export default Projects;
