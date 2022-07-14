import { FilterProps } from "../../../types";
import { lerp } from "../../../utils";

export const animateFilter = (
    filters: FilterProps,
    progress: number
) => {
    const { 
        blur,
        brightness,
        contrast,
        dropShadow,
        grayscale,
        hueRotate,
        opacity,
        saturate,
        sepia 
    } = filters;
    let _filterStr = '';

    if (blur) _filterStr += `blur(${lerp(...blur, progress)}px) `;
    if (brightness) _filterStr += `brightness(${lerp(...brightness, progress)}%) `;
    if (contrast) _filterStr += `contrast(${lerp(...contrast, progress)}%) `;
    if (grayscale) _filterStr += `grayscale(${lerp(...grayscale, progress)}%) `;
    if (hueRotate) _filterStr += `hue-rotate(${lerp(...hueRotate, progress)}deg) `;
    if (opacity) _filterStr += `opacity(${lerp(...opacity, progress)}%) `;
    if (saturate) _filterStr += `saturate(${lerp(...saturate, progress)}%) `;
    if (sepia) _filterStr += `sepia(${lerp(...sepia, progress)}%) `;

    // TODO: Create dropShadow transition!
    if (dropShadow) _filterStr += `drop-shadow(${lerp(...dropShadow, progress)}px) `;

    // target.style.filter = _filterStr;
    return _filterStr;
}