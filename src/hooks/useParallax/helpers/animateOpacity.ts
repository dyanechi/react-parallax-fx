import { lerp } from "../../../utils";

/** Animate opacity transition */
export const animateOpacity = (
    opacity: [start: number, end: number],
    progress: number
) => {
    // target.style.opacity = lerp(...opacity, progress).toFixed(3);
    return lerp(...opacity, progress).toFixed(3);
}