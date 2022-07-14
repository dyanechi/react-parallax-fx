import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParallax } from '../hooks/useParallax';
import { IParallaxChildren, IParallaxProps } from '../types';


interface StyledUseParallaxComponentProps {
    
}
const StyledUseParallaxComponent = styled.div<StyledUseParallaxComponentProps>`
    width: 100%;
    height: fit-content;
`

export function UseParallaxComponent (props: IParallaxProps) {
    const { ref, status } = useParallax({...props});

    return (
        <StyledUseParallaxComponent ref={ref}>
            {props.children && props.children(status)}
        </StyledUseParallaxComponent>
    );
}

export default UseParallaxComponent;