import { useState, createContext, useContext } from "react";

const MoveCameraContext = createContext({});

import { ReactNode } from "react";

export const MoveCameraProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(false);
  const [RobotAnimation, setRobotAnimation] = useState<string>("RobotArmature|Robot_Yes");
  const [AnimationCase, setAnimationCase] = useState(1);

  return (
    <MoveCameraContext.Provider value={{ state, setState, RobotAnimation, setRobotAnimation, AnimationCase, setAnimationCase}}>
      {children}
    </MoveCameraContext.Provider>
  );
};

export const useMoveCamera = () => {
  return useContext(MoveCameraContext);
};
