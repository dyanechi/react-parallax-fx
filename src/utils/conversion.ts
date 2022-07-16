import { Color, IKeyframe, IParallaxAnimation, IParallaxKeyframe, IParallaxKeyframeAttributes, RGBA } from "../types";
import { SUPPORTED } from "./constants";

export const getHexColor = (color: Color | string): string => {
  if (typeof color === "string") {
    if (color.length === 0) { return ""; }
    if (color.length === 4) color += "f";
    else if (color.length === 7) color += "ff";
    if (
      !(/^#[0-9a-fA-F]{8}$/i.test(color) || /^#[0-9a-fA-F]{4}$/i.test(color))
    ) {
      throw new Error(
        `${color} is invalid. 'Color' must be valid Hex or RGBA value. `
      );
    }
  }
  return color as string;
};

export const getRGBA = (color: Color): RGBA => {
  const arr: number[] = [];
  if (typeof color === "string") {
    if (color.length === 4) color += "f";
    else if (color.length === 7) color += "ff";
    if (/^#[0-9a-fA-F]{8}$/i.test(color)) {
      color
        .replace("#", "")
        .split(/(..)/g)
        .filter((s) => s)
        .forEach((s) => arr.push(Number("0x" + s)));

      arr[arr.length - 1] = arr[arr.length - 1] / 255;
    } else if (/^#[0-9a-fA-F]{4}$/i.test(color)) {
      color
        .replace("#", "")
        .split(/(.)/g)
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


export const keyframesToParallaxAnimation = (
    start: IKeyframe<IParallaxKeyframe>,
    end: IKeyframe<IParallaxKeyframe>
  ) : IParallaxAnimation => {
    
    let merged: IParallaxAnimation = {
      transform: {},
      // gradient: {},
      filter: {}
    };
    Object.entries(start).forEach(([key,val]) => {
      let o = {}
      if (key === 'gradient') {
        o['gradient'] = {
          type: start.gradient!.type,
          dir: [start.gradient!.dir || 0, end.gradient?.dir || start.gradient!.dir],
          start: start.gradient!.colors,
          end: end.gradient?.colors || start.gradient!.colors
        };
      } else if (SUPPORTED.FILTERS.includes(key)) {
        o['filter'] = {
          ...merged.filter,
          [key]: [start[key] || 0, end[key] || start[key]]
        }
      } else if (SUPPORTED.TRANSFORM.includes(key)) {
        o['transform'] = {
          ...merged.transform,
          [key]: [start[key] || 0, (end && end[key]) || 0]
        }
      }
      
      else {
        o = {[key]: [start[key], end[key]]}
      }

      
      merged = {...merged, ...o};
    })
    console.log('Merged',merged);
      // requestAnimationFrame(() => runAnimations(merged, curProgress as number));
    return merged;
  }

