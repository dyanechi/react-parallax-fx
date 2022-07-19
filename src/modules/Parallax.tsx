import React from "react";
import styled from "styled-components";
import { IParallax } from "../types";
import { UseParallax } from "./UseParallax";

const StyledParallax = styled.div`
  overflow: hidden;
`;

interface ParallaxProps extends IParallax {

}
export const Parallax = ({children, className, ...rest}: ParallaxProps) => {

  return (
    <StyledParallax className={className}>
        <UseParallax {...rest}>
            {children}
        </UseParallax>
    </StyledParallax>
  );
};

export default Parallax;
