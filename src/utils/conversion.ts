import { toInt } from "../hooks/useParallax/helpers/parsers";
import { Color, IKeyframe, IParallaxAnimation, IParallaxAnimationProps, IParallaxKeyframe, RGBA } from "../types";
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
    if (/^#[0-9a-fA-F]{3}$/i.test(color)) color += "f";
    else if (/^#[0-9a-fA-F]{6}$/i.test(color)) color += "ff";
    if (/^#[0-9a-fA-F]{4}$/i.test(color)) {
      color
        .replace("#", "")
        .split(/(.)/g)
        .filter((s) => s)
        .forEach((s) => arr.push(17 * Number("0x" + s)));

      arr[arr.length - 1] = arr[arr.length - 1] / 255;
    } else if (/^#[0-9a-fA-F]{8}$/i.test(color)) {
      color
        .replace("#", "")
        .split(/(..)/g)
        .filter((s) => s)
        .forEach((s) => arr.push(Number("0x" + s)));

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
    Object.entries(start).forEach(([key]) => {
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
          [key]: [start[key] || 0, (end[key] ?? start[key]) || 0]
        }
      } else if (SUPPORTED.TRANSFORM.includes(key)) {
        o['transform'] = {
          ...merged.transform,
          [key]: (key === 'translate') ? [
             [start!.translate![0], (end?.translate?.[0] ?? start!.translate![0]) || 0], 
             [start!.translate![1], (end?.translate?.[1] ?? start!.translate![1]) || 0], 
            ] : [start[key] || 0, (end[key] ?? start[key]) || 0]
          //   :
          // [key]: [start[key] || 0, (end[key] ?? start[key]) || 0]
        }
      }
      
      else {
        o = {[key]: [start[key], end[key] ?? start[key]]}
      }
      
      merged = {...merged, ...o};
    })
    // console.log('Merged',merged, start, end);
      // requestAnimationFrame(() => runAnimations(merged, curProgress as number));
    return merged;
}

export const parallaxAnimationToKeyframes = (
  animation: IParallaxAnimationProps
) : IKeyframe<IParallaxKeyframe>[] => {
  if (!animation) throw new Error('Animation not provided or is empty'); // Should throw exception if issues will arise
  const startFrame: IKeyframe<IParallaxKeyframe> = { start: 0, length: 0 };
  const endFrame: IKeyframe<IParallaxKeyframe> = { start: 0, length: 0 };

  Object.keys(animation).forEach(key => {
    if (key === 'gradient') {
      const g = animation.gradient!;
      startFrame.gradient = { type: g.type, dir: g.dir![0], colors: g.start }
      endFrame.gradient   = { type: g.type, dir: g.dir![1], colors: g.end }
    } else if (key === 'translate') { 
      startFrame.translate = animation.translate![0];
      endFrame.translate   = animation.translate![1];
    } else if (key === 'length') { 
      startFrame.length = toInt(animation.length![0]);
      endFrame.length   = toInt(animation.length![1]);
      // console.log("Current Processing Length", toInt(animation.length));
    } else {
      const val = animation[key] as [start: number, end: number];
      startFrame[key] = val[0];
      endFrame[key] = val[1];
      // console.log('Processing here', key, animation[key]);
    }
  })

  console.info("Converted frames: ", [startFrame, endFrame])
  return [startFrame, endFrame];
}

