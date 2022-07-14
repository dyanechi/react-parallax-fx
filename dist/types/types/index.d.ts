/// <reference types="react" />
export declare type RGBA = [red: number, green: number, blue: number, alpha: number];
export declare type Color = RGBA | string;
export declare type HTMLValueType = number | `${number}%` | string;
export interface TransformProps {
    translate?: [
        X: [start: number, end: number],
        Y: [start: number, end: number]
    ];
    translateX?: [start: number, end: number];
    translateY?: [start: number, end: number];
    scale?: [start: number, end: number];
    rotate?: [start: number, end: number];
}
export interface GradientProps {
    type?: "linear" | "radial" | undefined;
    dir?: [start: number, end: number] | undefined;
    start: Color[];
    end: Color[];
}
export interface FilterProps {
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
export interface IParallaxAnimation {
    offset?: number;
    opacity?: [start: number, end: number];
    background?: [start: Color, end: Color];
    transform?: TransformProps;
    gradient?: GradientProps;
    filter?: FilterProps;
}
export interface IParallaxAnimationProps extends IParallaxAnimation {
    length: HTMLValueType;
}
export interface ParallaxKeyframe {
    length: HTMLValueType;
    animation: IParallaxAnimationProps;
}
export interface ParallaxStatus {
    isTransitioning: boolean;
    inView: boolean;
}
export declare type IParallaxChildren = ((status: ParallaxStatus) => JSX.Element) | JSX.Element | React.ReactNode;
export interface IParallaxProps {
    startScroll?: "top" | "center" | "bottom" | number;
    endScroll?: HTMLValueType;
    speed?: number;
    disabled?: boolean;
    offset?: number;
    fadeIn?: IParallaxAnimationProps;
    fadeOut?: IParallaxAnimationProps;
    keyframes?: ParallaxKeyframe[];
    className?: string;
    children?: IParallaxChildren;
    render?(): React.ReactElement<React.ReactNode>;
    callback?: () => void;
}
export interface ILegacyParallax {
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
export declare type IParallax = IParallaxProps & IParallaxAnimationProps;
