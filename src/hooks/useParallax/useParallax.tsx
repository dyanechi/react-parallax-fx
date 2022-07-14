import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { IParallaxAnimation, IParallaxProps, ParallaxStatus} from "../../types";
import { getHexColor, getRGBA } from "../../utils";
import { useWindowScrollPosition } from "../useWindowScrollPosition";
import {
  animateBackground,
  animateFilter,
  animateGradient,
  animateOpacity,
  animateTransform,
  calculateProgress
} from './helpers'
import { toInt } from "./helpers/parsers";


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
    children,
    callback
}: IParallaxProps) => {

    // --- S T A T E S / V A R I A B L E S --- //
    
    // Hook intersection observer to track `ref` object
    const { ref, inView, entry } = useInView();

    // Define `target` DOM element to track
    const target = entry?.target as HTMLElement;

    // Hook to get current scroll position at the window's top
    const topScrollPosition = useWindowScrollPosition(1);

    // Keep transition progress (number between 0 - 1)
    const [progress, setProgress] = useState<number>(0);

    // Control current status to later return it
    const [status, setStatus] = useState<ParallaxStatus>({
        isTransitioning: false,
        inView: inView,
    })

    // --- C O N F I G --- //
    const [config, setConfig] = useState({
        startScroll: getStartScrollValue(startScroll || "bottom"),
        endScroll: endScroll ? toInt(endScroll) : 300,
        scrollHeight: 0
        // speed: (speed || 20) / 100,
    });


    // --- G E T T E R S --- //

    // If number provided as `startScroll`, Parallax 
    // will start at `offset` global scroll position 
    const customScrollPosition = (offset: number) => offset;

    // Detect beginning of animation. Defaults to `bottom` of the screen. 
    function getStartScrollValue (m: "top" | "center" | "bottom" | number) {
        switch (m) {
          case "top":
            return /* topScrollPosition */ document.documentElement.scrollTop;
          case "center":
            return /* topScrollPosition */ + document.documentElement.scrollTop + document.documentElement.clientHeight / 2;
          case "bottom":
            return /* topScrollPosition */ + document.documentElement.scrollTop + document.documentElement.clientHeight;
          default:
            return (
              customScrollPosition(m) || /* topScrollPosition */ + document.documentElement.scrollTop + document.documentElement.clientHeight
            );
        }
    };

    // --- A N I M A T I N G --- //

    function runAnimations (
      animations: IParallaxAnimation,
      progress: { start: number, end: number, current: number }
    ) {
      const {
        opacity,
        transform,
        background,
        gradient,
        filter
      } = animations;
      const { start, end, current } = progress;
      
      opacity && (target.style.opacity = animateOpacity([...opacity], current));
      transform && (target.style.transform = animateTransform({...transform}, current));
      background && (target.style.backgroundColor = animateBackground([...background], current));
      gradient && (target.style.background = animateGradient({...gradient}, current));
      filter && (target.style.filter = animateFilter({...filter}, current));

    }


    // --- P R O C S S I N G--- //

    /**
     * Animate only at the beginning of Parallax transition
     */
    function fadeInAnimation() {
      const { length, offset, ...rest } = fadeIn!;

      // Get subprogress relative to global progress
      const { start, end, current } = getAnimationOptions(toInt(length, target.offsetHeight), offset);
      const _current = (current/end) / end;
      const subProgress = _current < 0 ? 0 : _current > 1 ? 1 : _current;
      
      const canRun = subProgress > 0 && subProgress < 1;
      // console.log(start, end, current, _current, subProgress, progress, canRun)
      canRun && runAnimations({...rest}, {
        start,
        end,
        current: subProgress,
      })
    }


    /**
     * Animate only at the end of Parallax transition
     */
    function fadeOutAnimation() {
      const { length, offset, ...rest } = fadeOut!;

      const { start, end, current } = getAnimationOptions(toInt(length, target.offsetHeight), offset);
      const _current = ((current/end) / end) - ((1 - end) / end );
      const subProgress = _current < 0 ? 0 : _current > 1 ? 1 : _current;

      const canRun = subProgress > 0 && subProgress < 1;
      // console.log((1-end), (1-start), current, _current, subProgress, progress, canRun)
      canRun && runAnimations({...rest}, { 
        start: 1-end, 
        end: 1-start, 
        current: subProgress
      })

      // console.log(length, offset, opacity, background, transform, gradient, filter);
    }


    /**
     * Animate in between `fadeIn` and `fadeOut` transition
     */
    function keyframesAnimation() {
      keyframes!.forEach(keyframe => {
        console.log(keyframe);
      })
    }

    function getAnimationOptions(
        length: number,
        offset?: number,
      ) {
      const start = (offset || 0) / config.scrollHeight;
      const end = length / config.scrollHeight + start;
      const current = start + (end * progress);
      return { start, end, current };
    }

    function updateGlobalProgress() {
      const progress = calculateProgress(
        target.offsetTop,
        target.offsetTop + config.endScroll,
        config.startScroll + topScrollPosition,
        offset,
        ({isTransitioning}) => { 
          setStatus({...status, isTransitioning});
        }
      )
      setProgress(progress);
      // console.log(config);
    }

    // --- R E N D E R   E F F E C T S --- //

    // Call every time user scrolls on page
    useEffect(() => {
      !disabled && target && updateGlobalProgress();
      return () => {};
    }, [topScrollPosition]);

    // Call every time `progress` updates
    useEffect(() => {
        // Check if the progress is between 0 - 1 range
        if (status.isTransitioning) {
            fadeIn && requestAnimationFrame(fadeInAnimation);
            fadeOut && requestAnimationFrame(fadeOutAnimation);
            keyframes && requestAnimationFrame(keyframesAnimation);
        }
    }, [progress, status.isTransitioning, fadeIn, fadeOut, keyframes]);


    // Call a callback once transitioning status changed
    useEffect(() => {
        console.info (`Transitioning changed to: `, status.isTransitioning);
        callback && callback();
    }, [status.isTransitioning, callback]);

    useEffect(() => setStatus({...status, inView}), [inView]);




    const initialize = () => {
      if (target) {
        const end = endScroll?.toString();
        const _endScroll = end
          ? end.includes("%")
            ? toInt(end) * target.offsetHeight
            : parseInt(end)
          : target.offsetHeight;

        calculateProgress(
          target.offsetTop,
          _endScroll,
          config.startScroll + topScrollPosition,
          offset,
          ({isTransitioning, scrollHeight}) => { 
            setStatus({...status, isTransitioning});
            setConfig({
              ...config,
              endScroll: _endScroll,
              scrollHeight
            });
          }
        )

        target.style.background = getHexColor(
          (fadeIn && fadeIn.background && fadeIn.background[0]) ||
          (fadeOut && fadeOut.background && fadeOut.background[0]) || "");
      }
    };
    useEffect(() => initialize(), [target]);
    useEffect(() => {

    }, [])

    return {
        ref,
        status,
    }
}