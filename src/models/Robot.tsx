/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

import robotScene from "../assets/Animated Robot.glb";
import { GroupProps, useFrame, useThree } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    FootL_1: THREE.Mesh;
    Torso_2: THREE.Mesh;
    Torso_3: THREE.Mesh;
    Head_2: THREE.Mesh;
    Head_3: THREE.Mesh;
    Head_4: THREE.Mesh;
    ShoulderL_1: THREE.Mesh;
    ArmL: THREE.Mesh;
    ShoulderR_1: THREE.Mesh;
    ArmR: THREE.Mesh;
    LegL: THREE.Mesh;
    LowerLegL_1: THREE.Mesh;
    LegR: THREE.Mesh;
    LowerLegR_1: THREE.Mesh;
    FootR_1: THREE.Mesh;
    HandR_1: THREE.SkinnedMesh;
    HandR_2: THREE.SkinnedMesh;
    HandL_1: THREE.SkinnedMesh;
    HandL_2: THREE.SkinnedMesh;
    Bone: THREE.Bone;
  };
  materials: {
    Grey: THREE.MeshStandardMaterial;
    Main: THREE.MeshStandardMaterial;
    Black: THREE.MeshStandardMaterial;
  };
};

type ActionName =
  | "RobotArmature|Robot_Dance"
  | "RobotArmature|Robot_Death"
  | "RobotArmature|Robot_Idle"
  | "RobotArmature|Robot_Jump"
  | "RobotArmature|Robot_No"
  | "RobotArmature|Robot_Punch"
  | "RobotArmature|Robot_Running"
  | "RobotArmature|Robot_Sitting"
  | "RobotArmature|Robot_Standing"
  | "RobotArmature|Robot_ThumbsUp"
  | "RobotArmature|Robot_Walking"
  | "RobotArmature|Robot_WalkJump"
  | "RobotArmature|Robot_Wave"
  | "RobotArmature|Robot_Yes";
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

type Robot1Props = GroupProps & {
  RobotAnimation: string;
  setRobotAnimation: React.Dispatch<React.SetStateAction<string>>;
  AnimationCase: number;
  setAnimationCase: React.Dispatch<React.SetStateAction<number>>;
  
  isRotating?: boolean;
  setIsRotating: React.Dispatch<React.SetStateAction<boolean>>;
};

const Robot: React.FC<Robot1Props> = ({
  setIsRotating,
  isRotating,
  RobotAnimation,
  setRobotAnimation,
  AnimationCase,
  setAnimationCase,
  ...props
}) => {
  const group = useRef<THREE.Group | null>(null);
  const { nodes, materials, animations } = useGLTF(robotScene) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  const { gl, viewport } = useThree();

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  const lastDance = useRef(RobotAnimation);

  // These are the event handlers when the mouse goes up down or moves and it handles the rotation.
  const handlePointerDown = (event: PointerEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);
    const clientX = event.clientX;

    lastX.current = clientX;
  };

  const handlePointerUp = (event: PointerEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  const handlePointerMove = (event: PointerEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (!isRotating) return;

    const clientX = event.clientX;

    const delta = (clientX - lastX.current) / viewport.width;
    if (group.current) {
      group.current.rotation.y += delta * 0.03 * Math.PI;
    }
    lastX.current = clientX;
    rotationSpeed.current = delta *0.03 * Math.PI;
  };

  // This adds the event listeners for the rotation
  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
    };
  }, [gl, viewport, isRotating]);

  // This is the damping effect for the rotation. Slows the rotation down over time.
  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;

      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }
      if (group.current) {
        group.current.rotation.y += rotationSpeed.current;
      }
    }
  });

  useEffect(() => {
    let action = actions[RobotAnimation];
    
    switch (AnimationCase) {
      
      case 1:
        if(action){
          action.reset();
          action.play();
          lastDance.current = RobotAnimation;
        }
        break;
      
      case 2:
        if(action){
          const lastAction = actions[lastDance.current];
          lastAction?.stop();
          
          action.reset();
          action.timeScale = 1; // Play forward
          action.setLoop(THREE.LoopOnce, 1);
          action.clampWhenFinished = true;
          action.play();
          
          lastDance.current = RobotAnimation;
        }
        break;
      
      case 3:
        if(action){
          action.timeScale = -1; // Play backward
          action.setLoop(THREE.LoopOnce, 1);
          action.clampWhenFinished = true;
          if (action.paused) {
            action.paused = false;
          } else {
            action.time = action.getClip().duration; // Set the time to the end of the animation
            action.play();
          }
          setRobotAnimation("RobotArmature|Robot_Yes")
          setAnimationCase(1);
          
          lastDance.current = RobotAnimation;
        }
        break;
    
      default:
        action?.stop();
        break;
    }
    


    
  }, [RobotAnimation, AnimationCase, ]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Root_Scene">
        <group name="RootNode">
          <group
            name="RobotArmature"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <primitive object={nodes.Bone} />
          </group>
          <group
            name="HandR"
            position={[-0.003, 2.37, -0.021]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <skinnedMesh
              name="HandR_1"
              geometry={nodes.HandR_1.geometry}
              material={materials.Main}
              skeleton={nodes.HandR_1.skeleton}
            />
            <skinnedMesh
              name="HandR_2"
              geometry={nodes.HandR_2.geometry}
              material={materials.Grey}
              skeleton={nodes.HandR_2.skeleton}
            />
          </group>
          <group
            name="HandL"
            position={[-0.003, 2.37, -0.021]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <skinnedMesh
              name="HandL_1"
              geometry={nodes.HandL_1.geometry}
              material={materials.Main}
              skeleton={nodes.HandL_1.skeleton}
            />
            <skinnedMesh
              name="HandL_2"
              geometry={nodes.HandL_2.geometry}
              material={materials.Grey}
              skeleton={nodes.HandL_2.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
};

export default Robot;
