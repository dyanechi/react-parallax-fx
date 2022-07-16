import { Color } from "../types"

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
    }
}