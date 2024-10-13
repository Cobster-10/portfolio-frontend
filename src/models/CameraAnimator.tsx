import { useFrame, useThree } from '@react-three/fiber';
import React, { useState } from 'react'
import { gsap } from 'gsap';

interface CameraAnimatorProps {
    animate: boolean;
    setAnimate: (value: boolean) => void;
  }

  const CameraAnimator: React.FC<CameraAnimatorProps> = ({ animate, setAnimate }) => {
    const { camera } = useThree();
    let normalAngle = {
        x: 0,
        y: 0,
        z: 5,
      }
      let deathAngle = {
        x: -4,
        y: 2,
        z: 3,
      }

    useFrame(() => {
        if (animate) {
          gsap.to(camera.position, {
            x: deathAngle.x,
            y: deathAngle.y,
            z: deathAngle.z, 
            duration: 1.5,
            ease: "power1.out",
            onUpdate: () => {  
                camera.lookAt(0, 0, 0);
            }
          });
        }
        else {
          gsap.to(camera.position, {
            x: normalAngle.x,
            y: normalAngle.y,
            z: normalAngle.z, 
            duration: 1.5,
            ease: "power1.out",
            onUpdate: () => {
                camera.lookAt(0, 0, 0);
            }
          });
        }
      });

  return null;
}

export default CameraAnimator