import React from 'react';

declare type RGBA = [red: number, green: number, blue: number, alpha: number];
declare type Color = RGBA | string;
interface IParralaxAnimationProps {
    opacity?: [start: number, end: number];
    transform?: {
        translate?: [
            X: [start: number, end: number],
            Y: [start: number, end: number]
        ];
        translateX?: [start: number, end: number];
        translateY?: [start: number, end: number];
        scale?: [start: number, end: number];
        rotate?: [start: number, end: number];
    };
    offset?: number;
    background?: [
        start: Color,
        end: Color
    ];
    gradient?: {
        type?: 'linear' | 'radial' | undefined;
        dir?: number | undefined;
        start: Color[];
        end: Color[];
    };
    filter?: {
        blur?: [start: number, end: number];
    };
}
interface IParallaxProps extends React.PropsWithChildren, IParralaxAnimationProps {
    startScroll?: 'top' | 'center' | 'bottom' | number;
    endScroll?: number | `${number}%`;
    speed?: number;
    disabled?: boolean;
    keyframes?: IParralaxAnimationProps[] & {};
    fadeIn?: IParralaxAnimationProps;
    fadeOut?: IParralaxAnimationProps;
    children?: any;
}

export { Color, IParallaxProps, IParralaxAnimationProps, RGBA };
