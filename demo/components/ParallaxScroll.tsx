import React from 'react';
import styled from 'styled-components';
import { Parallax } from '../../src/modules/Parallax';

const Container = styled.div`
    background: #333;
`

const ExampleBox = styled.div`
    margin: 30px 0px;
    height: 600px;
    font-size: 60px;
    color: black;
    // background: #777;
    text-align: center;
    display: flex;
`

const Title = styled.div<{color?: string}>`
    margin: auto;
    color: ${({color}) => color? color : 'black'}
`

export const ParallaxScroll = () => {

    return (
        <Container>
            <Parallax 
                gradient={{
                    start: ['#05a', '#5aca', '#0fa3'],
                    end: ['#cac0', '#05ff', '#f3ea']
                }}
            >
                <ExampleBox>
                    <Title color="pink">Parallax 1</Title>
                </ExampleBox>
            </Parallax>

            <Parallax
                startScroll={'center'}
                gradient={{
                    start: ['#fff', '#5aca', '#0fa3'],
                    end: ['#cac0', '#05ff', '#f3ea']
                }}
            >
                <ExampleBox>
                    <Title color="wheat">Parallax 2</Title>
                </ExampleBox>
            </Parallax>

            <Parallax
                startScroll={'bottom'}
                gradient={{
                    type: 'linear',
                    dir: 30,
                    start: ['#fff', '#5aca', '#0fa3'],
                    end: ['#cac0', '#05ff', '#f3ea']
                }}
            >
                <ExampleBox>
                    <Title color="aqua">Parallax 3</Title>
                </ExampleBox>
            </Parallax>

            <Parallax
                startScroll={'bottom'}
                gradient={{
                    type: 'linear',
                    dir: 30,
                    start: ['#000', '#5aca', '#0fa3'],
                    end: ['#cac0', '#05ff', '#f3ea']
                }}
            >
                <ExampleBox>
                    <Title color="lightgreen">Parallax 4</Title>
                </ExampleBox>
            </Parallax>

            <Parallax
                startScroll={'bottom'}
                gradient={{
                    type: 'linear',
                    dir: 30,
                    start: ['#fff', '#5aca', '#0fa3'],
                    end: ['#cac0', '#05ff', '#f3ea']
                }}
            >
                <ExampleBox>
                    <Title color="purple">Parallax 5</Title>
                </ExampleBox>
            </Parallax>
        </Container>
    )
}

export default ParallaxScroll;