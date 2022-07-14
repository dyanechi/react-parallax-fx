import { Color } from "../../../types";
import { lerpRGBA } from "../../../utils";

export const animateBackground = (
    background: [start: Color, end: Color],
    progress: number
) => {
    const rgbaValues = lerpRGBA(...background, progress);
    // target.style.backgroundColor = `rgba(${rgbaValues.join(",")}) `;
    return `rgba(${rgbaValues.join(",")}) `;
}