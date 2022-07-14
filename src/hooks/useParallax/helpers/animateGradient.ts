import { GradientProps } from "../../../types";
import { lerpRGBA, lerp } from "../../../utils";

export const animateGradient = (
    gradient: GradientProps, progress: number
  ) => {
    const { type, dir, start, end } = gradient;
    if (start.length < 2 || end.length < 2)
      throw new Error(`'start' and 'end' must have at least 2 elements`);
    if (start.length !== end.length)
      throw new Error(`'start' and 'end' array length must be the same`);

    const rgbaArray = [];
    for (let i = 0; i < start.length; i++) {
      const rgbaValues = lerpRGBA(start[i], end[i], progress);
      rgbaArray.push(`rgba(${rgbaValues.join(",")})`);
    }

    const _dir = (dir && type !== 'radial') ? lerp(...dir, progress)+'deg,' : '';
    // console.log(type, dir, start, end);

    // console.log(`${type && type || "linear"}-gradient(${_dir}${rgbaArray.join(",")})`)
    // target.style.background = 
    //     `${type && type || "linear"}-gradient(${_dir}${rgbaArray.join(",")})`;
    return `${type && type || "linear"}-gradient(${_dir}${rgbaArray.join(",")})`;
}