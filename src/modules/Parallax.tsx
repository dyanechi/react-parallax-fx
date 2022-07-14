import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useWindowScrollPosition } from "../hooks";
import { IParallax } from "../types";


import { lerp, lerpRGBA } from "../utils";

// ANCHOR: Main Component
const Parallax: React.FC<IParallax> = ({
  startScroll,
  endScroll,
  speed,
  opacity,
  transform,
  offset,
  background,
  gradient,
  filter,
  disabled,
  className,
  children,
}: IParallax) => {
  // --- S T A T E S  &  V A R I A B L E S --- //

  const { ref, inView, entry } = useInView({});

  const target = entry?.target as HTMLElement;
  const topScrollPosition = useWindowScrollPosition(1);
  const [progress, setProgress] = useState(0);

  const status = {
    isTransitioning: false,
  };

  // --- C O N F I G  &  G E T T E R S --- //

  const customScrollPosition = (offset: number) => {
    return offset;
  };

  const getStartScrollValue = (m: "top" | "center" | "bottom" | number) => {
    switch (m) {
      case "top":
        return /* topScrollPosition */ document.documentElement.scrollTop;
      case "center":
        return (
          /* topScrollPosition */ +document.documentElement.scrollTop +
          document.documentElement.clientHeight / 2
        );
      case "bottom":
        return (
          /* topScrollPosition */ +document.documentElement.scrollTop +
          document.documentElement.clientHeight
        );
      default:
        return (
          customScrollPosition(m) ||
          /* topScrollPosition */ +document.documentElement.scrollTop +
            document.documentElement.clientHeight
        );
    }
  };

  const [config, setConfig] = useState({
    startScroll: getStartScrollValue(startScroll || "top"),
    endScroll: endScroll
      ? endScroll.toString().includes("%")
        ? 1000
        : parseInt(endScroll.toString())
      : 300,
    speed: (speed || 20) / 100,
  });

  // --- C A L C U L A T I O N --- //

  // ANIMATION PROGRESS UPDATER
  const calculateProgress = () => {
    if (!target) return;
    const start =
      (target.offsetParent as HTMLElement).offsetTop + (offset || 0);
    const end = start + config.endScroll;
    const scrollHeight = end - start;

    const current = config.startScroll + topScrollPosition;
    const diff = current - start;
    const progress = diff / scrollHeight;
    // const status = (current < start) ? 'above' : (current > end) ? 'below' : 'in progress';
    // const result = (current < start) ? 0 : (current > end) ? 1 : current / scrollHeight;
    const result = progress < 0 ? 0 : progress > 1 ? 1 : progress;
    status.isTransitioning = !!(result > 0 && result < 1);

    console.info(
      "Progress!\n",
      `start: ${start}\n`,
      `end: ${end}\n`,
      `scrollHeight: ${scrollHeight}\n`,
      `config startScroll: ${config.startScroll}\n`,
      `manual startScroll: ${topScrollPosition + window.innerHeight}\n`,
      `automated startScroll: ${getStartScrollValue(startScroll || "top")}\n`,
      `current: ${current}\n`,
      `diff: ${diff}\n`,
      `progress: ${progress}\n`,
      `result: ${result}\n`,
      `isTransitioning: ${status.isTransitioning}`
    );

    setProgress(result);
  };

  // ANIMATION EFFECTS
  const transition = () => {
    if (target) {
      if (opacity) {
        const calculated = lerp(...opacity, progress);
        target.style.opacity = calculated.toFixed(3);
      }

      if (speed) {
        // const dist = target.offsetTop - config.startScroll;
        // target.style.transform = `translateY(${dist*config.speed}px)`;
      }

      if (background) {
        const rgbaValues = lerpRGBA(...background, progress);
        target.style.backgroundColor = `rgba(${rgbaValues.join(",")}) `;
      } else if (gradient) {
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

        const _dir =
          dir && type !== "radial" ? lerp(...dir, progress) + "deg," : "";
        console.log(type, dir, start, end);

        console.log(
          `${(type && type) || "linear"}-gradient(${_dir}${rgbaArray.join(
            ","
          )})`
        );
        target.style.background = `${
          (type && type) || "linear"
        }-gradient(${_dir}${rgbaArray.join(",")})`;
      }

      // TRANSFORM ANIMATIONS
      let _transformStr = "";
      if (transform) {
        const { translate, translateX, translateY, scale, rotate } = transform;

        // --- 2D Transformation --- //
        // Translation
        // Note: If using both translation, `translate` is preferred.
        if (translate) {
          const valueX = lerp(...translate[0], progress);
          const valueY = lerp(...translate[1], progress);
          _transformStr += `translate(${valueX}px, ${valueY}px) `;
        } else if (translateX) {
          _transformStr += `translateX(${lerp(...translateX, progress)}px) `;
        } else if (translateY) {
          _transformStr += `translateY(${lerp(...translateY, progress)}px) `;
        }

        if (scale) {
          _transformStr += `scale(${lerp(...scale, progress)}) `;
        }
        if (rotate) {
          _transformStr += `rotate(${lerp(...rotate, progress)}deg) `;
        }

        if (_transformStr !== "") target.style.transform = _transformStr;
      }

      // FILTERS

      if (filter) {
        const blur = lerp(...(filter.blur || [0, 0]), progress);
        target.style.filter = `blur(${blur}px) `;
      }
    }
  };

  // --- R E N D E R   E F F E C T S --- //

  // CALCULATE PROGRESS ON SCROLL
  useEffect(() => {
    if (disabled) return;
    calculateProgress();
    return () => {};
  }, [topScrollPosition]);

  // PROGRESS ANIMATION FRAME UPDATES
  useEffect(() => {
    requestAnimationFrame(transition);
  }, [progress]);

  // INITIALIZE
  const initialize = () => {
    if (target) {
      console.log(inView);
      const end = endScroll?.toString();
      const _endScroll = end
        ? end.includes("%")
          ? (parseInt(end) / 100) * target.offsetHeight
          : parseInt(end)
        : (target.offsetParent as HTMLElement).offsetHeight;
      setConfig({
        ...config,
        endScroll: _endScroll,
      });
      calculateProgress();
      transition();
    }
  };

  const handleResize = () => {
    setConfig({
      ...config,
      startScroll: getStartScrollValue(startScroll || "top"),
    });
  };

  useEffect(() => {
    initialize();
    return () => {};
  }, [target]);

  useEffect(() => {
    setProgress(0);

    // This is required in order to update beginning of scroll
    // animation after screen resize.
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- J S X   R E T U R N--- //

  //   return children(status.isTransitioning)
  return (
    <div style={{ position: "relative", width: "100%", height: "fit-content" }}>
      <div
        ref={ref}
        style={{
          position: "relative",
          width: "100%",
          height: "fit-content",
          willChange: "transform, opacity, background",
        }}
        className={className}
      >
        {children && typeof children === 'function' ?
          children({
            isTransitioning: progress > 0 && progress < 1,
            inView,
          }) : children
        }
      </div>
    </div>
  );
};

export default Parallax;
