import { Color, IParallaxKeyframeAttributes } from "../types"

export const SUPPORTED = {
    TRANSFORM: ['translate', 'translateX', 'translateY', 'scale', 'rotate'],
    FILTERS: [
        'blur', 'brightness', 'contrast', 'grayscale',
        'hueRotate', 'saturate', 'sepia', 'dropShadow'
    ],
}

export const DEFAULTS = {
    COLOR: "#0000" as Color,
    OPACITY: 1,
    SCALE: 1,
    GRADIENT: {
        colors: ["#0000", "#0000"] as Color[],
        type: "linear",
        dir: "0"
    },

    PARALLAX_KEYFRAME: {
        translate: [0, 0],
        translateX: 0,
        translateY: 0,
        scale: 1,
        rotate: 0,
        opacity: 1,
        background: "#fff",
        gradient: {
            type: "linear",
            dir: 0,
            colors: ["#0000", "0000"],
        },
    } as IParallaxKeyframeAttributes
}