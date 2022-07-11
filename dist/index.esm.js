import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

function useWindowScrollPosition(precision) {
    const [scrollPosition, setPosition] = useState(0);
    useLayoutEffect(() => {
        function updatePosition() {
            setPosition(Math.floor(window.pageYOffset / precision) * precision);
        }
        window.addEventListener('scroll', updatePosition);
        updatePosition();
        return () => window.removeEventListener('scroll', updatePosition);
    }, []);
    return scrollPosition;
}

const getRGBA = (color) => {
    const arr = [];
    if (typeof (color) === 'string') {
        if (color.length === 4)
            color += 'f';
        else if (color.length === 7)
            color += 'ff';
        if (/^#[0-9a-fA-F]{8}$/i.test(color)) {
            color
                .replace('#', '')
                .split(/(..)/g)
                .filter(s => s)
                .forEach(s => arr.push(Number('0x' + s)));
            arr[arr.length - 1] = arr[arr.length - 1] / 255;
        }
        else if (/^#[0-9a-fA-F]{4}$/i.test(color)) {
            color
                .replace('#', '')
                .split(/(.)/g)
                .filter(s => s)
                .forEach(s => arr.push(17 * (Number('0x' + s))));
            arr[arr.length - 1] = arr[arr.length - 1] / 255;
        }
        else {
            throw new Error(`${color} is invalid. 'Color' must be valid Hex or RGBA value. `);
        }
        return arr;
    }
    return color;
};
const lerp = (start, end, t, fn) => {
    if (start === end)
        return start;
    const x = start < end ?
        ((end * t) + (start - (start * t)))
        :
            (start - (start * t) + (end * t));
    return fn ? fn(x) : x;
};
const lerpRGBA = (start, end, t) => {
    let _start = getRGBA(start);
    let _end = getRGBA(end);
    return _start.map((s, i) => lerp(s, _end[i], t));
};

// ANCHOR: Main Component
function Parallax({ startScroll, endScroll, speed, opacity, transform, offset, background, gradient, filter, disabled, children }) {
    // --- S T A T E S  &  V A R I A B L E S --- //
    const { ref, inView, entry } = useInView({});
    console.log(inView);
    const target = entry?.target;
    const topScrollPosition = useWindowScrollPosition(1);
    const [progress, setProgress] = useState(0);
    // --- C O N F I G  &  G E T T E R S --- //
    const customScrollPosition = (offset) => {
        return offset;
    };
    const getStartScrollValue = (m) => {
        switch (m) {
            case 'top': return topScrollPosition;
            case 'center': return topScrollPosition + (window.innerHeight / 2);
            case 'bottom': return topScrollPosition + window.innerHeight;
            default: return customScrollPosition(m) || topScrollPosition;
        }
    };
    const [config, setConfig] = useState({
        startScroll: getStartScrollValue(startScroll || 'top'),
        endScroll: endScroll ? endScroll.toString().includes('%') ? 1000 : parseInt(endScroll.toString()) : 300,
        speed: (speed || 20) / 100,
    });
    // --- C  A L C U L A T I O N --- //
    // ANIMATION PROGRESS UPDATER
    const calculateProgress = () => {
        const target = entry && entry.target;
        if (!target)
            return;
        const start = target.offsetParent.offsetTop + (offset ? offset : 0);
        const end = start + config.endScroll;
        const scrollHeight = end - start;
        const current = config.startScroll + topScrollPosition;
        const diff = current - start;
        const progress = diff / scrollHeight;
        // const status = (current < start) ? 'above' : (current > end) ? 'below' : 'in progress';
        // const result = (current < start) ? 0 : (current > end) ? 1 : current / scrollHeight;
        const result = progress < 0 ? 0 : progress > 1 ? 1 : progress;
        // console.info(
        //     'Progress!\n', 
        //     `start: ${start}\n`, 
        //     `end: ${end}\n`, 
        //     `scrollHeight: ${scrollHeight}\n`, 
        //     `config startScroll: ${config.startScroll}\n`,
        //     `manual startScroll: ${topScrollPosition + window.innerHeight}\n`,
        //     `automated startScroll: ${getStartScrollValue(startScroll || "top")}\n`,
        //     `current: ${current}\n`, 
        //     `diff: ${diff}\n`, 
        //     `progress: ${progress}\n`, 
        //     `result: ${result}`
        // );
        setProgress(result);
    };
    // ANIMATION EFFECTS
    const transition = () => {
        if (target) {
            if (opacity) {
                const calculated = lerp(...opacity, progress);
                target.style.opacity = calculated.toFixed(3);
            }
            if (background) {
                const rgbaValues = lerpRGBA(...background, progress);
                target.style.backgroundColor = `rgba(${rgbaValues.join(',')}) `;
            }
            else if (gradient) {
                const { type, dir, start, end } = gradient;
                if (start.length < 2 || end.length < 2)
                    throw new Error(`'start' and 'end' must have at least 2 elements`);
                if (start.length !== end.length)
                    throw new Error(`'start' and 'end' array length must be the same`);
                const rgbaArray = [];
                for (let i = 0; i < start.length; i++) {
                    const rgbaValues = lerpRGBA(start[i], end[i], progress);
                    rgbaArray.push(`rgba(${rgbaValues.join(',')})`);
                }
                console.log(type, dir, start, end);
                target.style.background = `${type ? type : 'linear'}-gradient(${dir ? dir + 'deg,' : ''}${rgbaArray.join(',')})`;
            }
            // TRANSFORM ANIMATIONS
            let _transformStr = "";
            if (transform) {
                const { translate, translateX, translateY, scale, rotate, } = transform;
                // --- 2D Transformation --- //
                // Translation
                // Note: If using both translation, `translate` is preferred.
                if (translate) {
                    const valueX = lerp(...translate[0], progress);
                    const valueY = lerp(...translate[1], progress);
                    _transformStr += `translate(${valueX}px, ${valueY}px) `;
                }
                else if (translateX) {
                    _transformStr += `translateX(${lerp(...translateX, progress)}px `;
                }
                else if (translateY) {
                    _transformStr += `translateY(${lerp(...translateY, progress)}px `;
                }
                if (scale) {
                    _transformStr += `scale(${lerp(...scale, progress)}) `;
                }
                if (rotate) {
                    _transformStr += `rotate(${lerp(...rotate, progress)}deg) `;
                }
                if (_transformStr !== "")
                    target.style.transform = _transformStr;
            }
            // FILTERS
            if (filter) {
                const blur = lerp(...filter.blur || [0, 0], progress);
                target.style.filter = `blur(${blur}px) `;
            }
        }
    };
    // --- R E N D E R   E F F E C T S --- //
    // CALCULATE PROGRESS ON SCROLL
    useEffect(() => {
        if (disabled)
            return;
        calculateProgress();
        return () => { };
    }, [topScrollPosition]);
    // PROGRESS ANIMATION FRAME UPDATES
    useEffect(() => {
        requestAnimationFrame(transition);
    }, [progress]);
    // INITIALIZE
    const initialize = () => {
        if (target) {
            const end = endScroll?.toString();
            const _endScroll = end ? end.includes('%') ? (parseInt(end) / 100) * target.offsetHeight : parseInt(end) : target.offsetParent.offsetHeight;
            setConfig({
                ...config,
                endScroll: _endScroll
            });
            calculateProgress();
            transition();
        }
    };
    const handleResize = () => {
        setConfig({
            ...config,
            startScroll: getStartScrollValue(startScroll || "top")
        });
    };
    useEffect(() => {
        initialize();
        return () => { };
    }, [target]);
    useEffect(() => {
        setProgress(0);
        // This is required in order to update beginning of scroll 
        // animation after screen resize.
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    // --- J S X   R E T U R N--- //
    return (React.createElement("div", { style: { position: "relative", width: "100%", height: "fit-content" } },
        React.createElement("div", { ref: ref, style: {
                position: "relative",
                width: "100%",
                height: "fit-content",
                willChange: "transform, opacity, background"
            } }, children)));
}

export { Parallax };
//# sourceMappingURL=index.esm.js.map
