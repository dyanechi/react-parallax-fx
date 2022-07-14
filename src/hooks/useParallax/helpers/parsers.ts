import { HTMLValueType } from "../../../types";

export const toInt = (value: HTMLValueType, val?: number): number => {
  if (typeof value === "number") {
    return value;
  } else if (typeof value === "string") {
    if (/[0-9]%$/g.test(value.toString())) {
      // console.log(`${value} is in percents!`);
      return val ? val * (parseInt(value) / 100) : parseInt(value) / 100;
    }
    if (/[0-9](px)$/g.test(value.toString())) {
      console.log(`${value} is in pixels!`);
      return parseInt(value);
    }
    if (/[0-9](em)$/g.test(value.toString())) {
      console.log(`${value} is in em!`);
      return parseInt(value) * 16;
    }
    if (/^[0-9](vh)$/g.test(value.toString())) {
      console.log(`${value} is in vh!`);
      return (parseInt(value) / 100) * window.innerHeight;
    }
    if (/^[0-9](vw)$/g.test(value.toString())) {
      console.log(`${value} is in vw!`);
      return (parseInt(value) / 100) * window.innerWidth;
    }
  }

  console.warn("Couldn't find any match for", value);
  return 0;
};
