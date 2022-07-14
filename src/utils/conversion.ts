import { Color, RGBA } from "../types";

export const getHexColor = (color: Color | string): string => {
  if (typeof color === "string") {
    if (color.length === 4) color += "f";
    else if (color.length === 7) color += "ff";
    if (!(/^#[0-9a-fA-F]{8}$/i.test(color) || 
        /^#[0-9a-fA-F]{4}$/i.test(color))) 
      {
        throw new Error(
          `${color} is invalid. 'Color' must be valid Hex or RGBA value. `
        );
      }
    }
  return color as string;
}

export const getRGBA = (color: Color): RGBA => {
  const arr: number[] = [];
  if (typeof color === "string") {
    if (color.length === 4) color += "f";
    else if (color.length === 7) color += "ff";
    if (/^#[0-9a-fA-F]{8}$/i.test(color)) {
      color.replace("#", "").split(/(..)/g)
        .filter((s) => s)
        .forEach((s) => arr.push(Number("0x" + s)));

      arr[arr.length - 1] = arr[arr.length - 1] / 255;
    } else if (/^#[0-9a-fA-F]{4}$/i.test(color)) {
      color.replace("#", "").split(/(.)/g)
        .filter((s) => s)
        .forEach((s) => arr.push(17 * Number("0x" + s)));

      arr[arr.length - 1] = arr[arr.length - 1] / 255;
    } else {
      throw new Error(
        `${color} is invalid. 'Color' must be valid Hex or RGBA value. `
      );
    }

    return arr as RGBA;
  }
  return color as RGBA;
};
export const getRGBAValues = (start: Color, end: Color): [RGBA, RGBA] => {
  return [getRGBA(start), getRGBA(end)];
};

export const lerp = (
  start: number,
  end: number,
  t: number,
  fn?: (x: number) => number
): number => {
  if (start === end) return start;
  const x =
    start < end ? end * t + (start - start * t) : start - start * t + end * t;
  return fn ? fn(x) : x;
};

export const lerpRGBA = (start: Color, end: Color, t: number): number[] => {
  let _start = getRGBA(start) as RGBA;
  let _end = getRGBA(end) as RGBA;
  return _start.map((s, i) => lerp(s, _end[i], t));
};
