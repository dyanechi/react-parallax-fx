import { useState, useEffect, useLayoutEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  IKeyframe,
  IParallaxAnimation,
  IParallaxKeyframe,
  IParallaxProps,
} from "../../types";
import { getHexColor, keyframesToParallaxAnimation, parallaxAnimationToKeyframes } from "../../utils";
import { useWindowScrollPosition } from "../useWindowScrollPosition";
import {
  animateBackground,
  animateFilter,
  animateGradient,
  animateOpacity,
  animateTransform,
  useCalculateProgress,
} from "./helpers";
import { toInt } from "./helpers/parsers";
import { useKeyframes } from "./useKeyframes";

/**
 * This hook allows you to turn any component into Parallax Component
 */
export const useParallax = ({
  startScroll,
  endScroll,

  fadeIn,
  fadeOut,
  keyframes,
  offset,
  disabled,
  extend,
  ease,
  onTransitionChange,
}: IParallaxProps) => {
  // --- S T A T E S / V A R I A B L E S --- //

  // Hook intersection observer to track `ref` object
  const { ref, inView, entry } = useInView();

  // Define `target` DOM element to track
  const target = entry?.target as HTMLElement;

  // Hook to get current scroll position at the window's top
  const topScrollPosition = useWindowScrollPosition(1);

  // Configuration
  const [config, setConfig] = useState({
    startScroll: getStartScrollValue(startScroll || "bottom"),
    endScroll: endScroll ? toInt(endScroll) : 300,
    scrollHeight: 0,
    // speed: (speed || 20) / 100,
  });

  // Keyframes conifuration reference from hook
  const keyConfig = useKeyframes<IParallaxKeyframe>();

  // Keep transition progress (number between 0 - 1)
  const { progress, isTransitioning } = useCalculateProgress(
    (target && target.offsetTop) || 0,
    config.endScroll,
    config.startScroll + topScrollPosition,
    offset,
    ease,
  )

  
  // --- G E T T E R S --- //
  // Detect beginning of animation. Defaults to `bottom` of the screen.
  function getStartScrollValue(m: "top" | "center" | "bottom" | number) {
    const height = document.documentElement.clientHeight;
    return m === "top" ? topScrollPosition :
           m === "center" ? topScrollPosition + height / 2 :
           m === "bottom" ? topScrollPosition + height :
           offset || topScrollPosition + height;
  }

  function getFadeAnimations() {
    let framesArr = new Array<IKeyframe<IParallaxKeyframe>>();
    let FadeIn = parallaxAnimationToKeyframes(fadeIn || []);
    let FadeOut = parallaxAnimationToKeyframes(fadeOut || []);

    const fullLength = Math.max(
      config.endScroll,
      target.offsetHeight,
      (toInt(fadeIn?.length || 0)) +
      (toInt(fadeOut?.length || 0)),
    )
    if (FadeIn) {
      const length = toInt(fadeIn!.length, fullLength);
      FadeIn[0].length = length;
      FadeIn[1].start = length;
      Object.assign(framesArr, FadeIn);
      // console.log('FadeIn:', FadeIn)
    }
    if (FadeOut) {
      const length = toInt(fadeOut!.length, fullLength);
      FadeOut[0] = {...FadeOut[0], start: fullLength - length, length: length }
      FadeOut[1].start = fullLength;
      if (FadeIn) {
        FadeIn[1] = {...FadeIn[1], length: fullLength - length }
      } else {
        FadeOut = [{ start: 0, length: fullLength - length }, ...FadeOut]
      }
      framesArr = [...framesArr, ...FadeOut];
    }
    return framesArr;
  }

  // --- I N I T --- //
  const initialize = () => {
    if (target) {
      target.style.background = getHexColor(
        (fadeIn?.background?.[0]) || (fadeIn?.background?.[0]) || ""
      );

      (keyframes || fadeIn || fadeOut) && requestAnimationFrame(keyframesAnimation);
    }
  };


  // --- A N I M A T I O N S --- //
  function runAnimations(
    animations: IParallaxAnimation,
    progress: number
  ) {
    const { opacity, transform, background, gradient, filter } = animations;
    const current = progress;

    opacity && (target.style.opacity = animateOpacity([...opacity], current)).toString();
    transform && (target.style.transform = animateTransform({ ...transform }, current));
    background &&
      (target.style.backgroundColor = animateBackground(
        [...background],
        current
      ));
    gradient &&
      (target.style.background = animateGradient({ ...gradient }, current));
    filter && (target.style.filter = animateFilter({ ...filter }, current));
  }

  function cleanupAnimations() {
    if (!keyConfig.isInitialized) return;
    const { curFrame, nextFrame } = keyConfig.getCurrentFrame(progress);
    const reset = keyframesToParallaxAnimation(curFrame, nextFrame);
    (isNaN(progress) || progress <= 0) && requestAnimationFrame(() => runAnimations(reset, 0));
    progress >= 1 && requestAnimationFrame(() => runAnimations(reset, 1));
  }

  
  // --- K E Y F R A M E S --- //
  
  function initializeKeyframes() {
    if (!keyConfig.isInitialized) {
      const framesArr = new Array<IKeyframe<IParallaxKeyframe>>();
      Object.assign(framesArr, keyframes || getFadeAnimations());
      
      const frames = framesArr!.map(f => {
        return { ...f, start: 0, length: toInt(f.length, target.offsetHeight) }
      });
      keyConfig.init(frames, (length => {
        if (extend && length > config.scrollHeight) {
          setConfig({
            ...config,
            scrollHeight: length,
            endScroll: length
          });
        };
        requestAnimationFrame(cleanupAnimations);
      }));
    }
  }

  /**
   * Animate in between `fadeIn` and `fadeOut` transition
   */
  function keyframesAnimation() {
    if (!keyConfig.isInitialized) return initializeKeyframes();
    const { curFrame, nextFrame, curProgress } = keyConfig.getCurrentFrame(progress);
    const animation = keyframesToParallaxAnimation(curFrame, nextFrame);
    requestAnimationFrame(() => runAnimations(animation, curProgress as number));
  }
  

  // --- R E N D E R   E F F E C T S --- //

  // Update when initialization is complete



  // Call every time `progress` updates
  useLayoutEffect(() => {
    !disabled && isTransitioning && keyConfig.isInitialized && requestAnimationFrame(keyframesAnimation);
    console.log(progress)
  }, [progress, isTransitioning, keyConfig.isInitialized, disabled]);

  // Call a onTransitionChange once transitioning status changed
  useLayoutEffect(() => {
    console.info(`Transitioning changed to: `, isTransitioning);
    target && requestAnimationFrame(cleanupAnimations);
    onTransitionChange && onTransitionChange();
  }, [isTransitioning, onTransitionChange, target, keyConfig.isInitialized]);

  useEffect(() => initialize(), [target]);
  useEffect(() => {}, []);

  return {
    ref,
    status: {
      isTransitioning,
      inView
    },
  };
};
