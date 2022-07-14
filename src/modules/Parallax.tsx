import React from 'react';
import styled from 'styled-components';
import { useParallax } from '../hooks/useParallax';
import { IParallaxProps } from '../types';

const StyledParallax = styled.div`
    width: 100%;
    height: fit-content;
`

export const Parallax = (props: IParallaxProps) => {
    const { ref, status } = useParallax({...props});

    return (
        <StyledParallax ref={ref} className={props.className}>
            {props.children && props.children(status)}
        </StyledParallax>
    );
}

export default Parallax;