import React from "react";
import styled from "styled-components";
import { useParallax } from "../hooks/useParallax";
import { useParallaxContext } from "./UseParallaxProvider";
import { IParallax } from "../types";

const StyledParallax = styled.div`
  width: 100%;
  height: fit-content;
`;

export const UseParallax = ({children, className, ...rest}: IParallax) => {
  const config = useParallaxContext();
  const { ref, status } = useParallax(config? Object.assign({}, config, { ...rest }) : { ...rest });
  return (
    <StyledParallax ref={ref} className={className}>
      {children && typeof children === 'function' ? children(status) : children}
    </StyledParallax>
  );
};

export default UseParallax;
