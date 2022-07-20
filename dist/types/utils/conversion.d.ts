import { Color, IKeyframe, IParallaxAnimation, IParallaxAnimationProps, IParallaxKeyframe, RGBA } from "../types";
export declare const getHexColor: (color: Color | string) => string;
export declare const getRGBA: (color: Color) => RGBA;
export declare const lerp: (start: number, end: number, t: number, fn?: ((x: number) => number) | undefined) => number;
export declare const lerpRGBA: (start: Color, end: Color, t: number) => number[];
export declare const keyframesToParallaxAnimation: (start: IKeyframe<IParallaxKeyframe>, end: IKeyframe<IParallaxKeyframe>) => IParallaxAnimation;
export declare const parallaxAnimationToKeyframes: (animation: IParallaxAnimationProps) => IKeyframe<IParallaxKeyframe>[];
