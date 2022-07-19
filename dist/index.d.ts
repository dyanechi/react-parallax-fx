/// <reference types="react" />
import React$1 from 'react';

interface ILegacyParallax {
    startScroll?: "top" | "center" | "bottom" | number;
    endScroll?: HTMLValueType;
    speed?: number;
    disabled?: boolean;
    offset?: number;
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
    background?: [start: Color, end: Color];
    dir?: [start: number, end: number] | undefined;
    gradient?: {
        type?: 'linear' | 'radial' | undefined;
        dir?: [start: number, end: number] | undefined;
        start: Color[];
        end: Color[];
    };
    filter?: {
        blur?: [start: number, end: number];
    };
    className?: string;
    children?: IParallaxChildren;
}

interface TransformProps {
    translate?: [
        X: [start: number, end: number],
        Y: [start: number, end: number]
    ];
    translateX?: [start: number, end: number];
    translateY?: [start: number, end: number];
    scale?: [start: number, end: number];
    rotate?: [start: number, end: number];
}
interface GradientProps {
    type?: "linear" | "radial" | undefined;
    dir?: [start: number, end: number] | undefined;
    start: Color[];
    end: Color[];
}
interface FilterProps {
    blur?: [start: number, end: number];
    brightness?: [start: number, end: number];
    contrast?: [start: number, end: number];
    grayscale?: [start: number, end: number];
    hueRotate?: [start: number, end: number];
    opacity?: [start: number, end: number];
    saturate?: [start: number, end: number];
    sepia?: [start: number, end: number];
    dropShadow?: [start: number, end: number];
}
interface IParallaxAnimation {
    offset?: number;
    opacity?: [start: number, end: number];
    background?: [start: Color, end: Color];
    transform?: TransformProps;
    gradient?: GradientProps;
    filter?: FilterProps;
}
interface IParallaxAnimationExposed {
    opacity?: [start: number, end: number];
    background?: [start: Color, end: Color];
    translate?: [
        X: [start: number, end: number],
        Y: [start: number, end: number]
    ];
    translateX?: [start: number, end: number];
    translateY?: [start: number, end: number];
    scale?: [start: number, end: number];
    rotate?: [start: number, end: number];
    blur?: [start: number, end: number];
    brightness?: [start: number, end: number];
    contrast?: [start: number, end: number];
    grayscale?: [start: number, end: number];
    hueRotate?: [start: number, end: number];
    saturate?: [start: number, end: number];
    sepia?: [start: number, end: number];
    gradient?: GradientProps;
}
interface IParallaxAnimationProps extends IParallaxAnimationExposed {
    length: HTMLValueType;
}
interface ParallaxStatus {
    isTransitioning: boolean;
    inView: boolean;
}
declare type IParallaxChildren = ((status: ParallaxStatus) => JSX.Element) | JSX.Element | React.ReactNode;
interface IParallaxProps {
    startScroll?: "top" | "center" | "bottom" | number;
    endScroll?: HTMLValueType;
    speed?: number;
    offset?: number;
    disabled?: boolean;
    extend?: boolean;
    ease?: number;
    fadeIn?: IParallaxAnimationProps;
    fadeOut?: IParallaxAnimationProps;
    keyframes?: IParallaxKeyframe[];
    className?: string;
    children?: IParallaxChildren;
    render?(): React.ReactElement<React.ReactNode>;
    onTransitionChange?: () => void;
}
declare type IParallax = IParallaxProps & IParallaxAnimation;
interface IParallaxKeyframeAttributes {
    translate?: [X: number, Y: number];
    translateX?: number;
    translateY?: number;
    scale?: number;
    rotate?: number;
    opacity?: number;
    background?: Color;
    gradient?: {
        colors: Color[];
        type?: 'linear' | 'radial' | undefined;
        dir?: number;
    };
    blur?: number;
    brightness?: number;
    contrast?: number;
    grayscale?: number;
    hueRotate?: number;
    saturate?: number;
    sepia?: number;
    dropShadow?: [start: number, end: number];
}
interface IParallaxKeyframe extends IParallaxKeyframeAttributes {
    length: HTMLValueType;
    hold?: boolean;
}

declare type RGBA = [red: number, green: number, blue: number, alpha: number];
declare type Color = RGBA | string;
declare type HTMLValueType = number | `${number}%` | string;

declare const Parallax: React$1.FC<ILegacyParallax>;

declare const UseParallax: ({ children, className, ...rest }: IParallax) => JSX.Element;

/**
 * This hook allows you to turn any component into Parallax Component
 */
declare const useParallax: ({ startScroll, endScroll, fadeIn, fadeOut, keyframes, offset, disabled, extend, ease, onTransitionChange, }: IParallaxProps) => {
    ref: (node?: Element | null | undefined) => void;
    status: {
        isTransitioning: boolean;
        inView: boolean;
    };
};

declare const getRGBA: (color: Color) => RGBA;

export { Parallax, UseParallax, getRGBA, useParallax };
