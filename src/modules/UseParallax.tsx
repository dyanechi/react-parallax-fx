import React from "react";
import styled from "styled-components";
import { useParallax } from "../hooks/useParallax";
import { IParallaxProps } from "../types";

const StyledParallax = styled.div`
  width: 100%;
  height: fit-content;
`;

export const Parallax = ({children, className, ...rest}: IParallaxProps) => {
  const { ref, status } = useParallax({ ...rest });

  return (
    <StyledParallax ref={ref} className={className}>
      {children && typeof children === 'function' ? children(status) : children}
    </StyledParallax>
  );
};

export default Parallax;
