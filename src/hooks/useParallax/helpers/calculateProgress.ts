import { useCallback, useEffect, useState } from "react";

export const useCalculateProgress = (
  _start: number,
  _length: number,
  _current: number,
  _offset?: number,
  _ease?: number
) => {
    // Hold current data
    const [data, setData] = useState({
        current: 0,
        previous: 0,
        rounded: 0,
        ease: Math.max(0, Math.min(1, _ease ?? 1)),
    })

    // Hold initial input state
    const [input, setInput] = useState({
        start: 0, /*+ (offset || 0)*/
        end: 0,
        scrollHeight: 0,
    })

    // Hold current transition state
    const [status, setStatus] = useState({
        progress: 0,
        isTransitioning: false,
    })

    // Calculate progress with easing
    const easeProgress = useCallback(() => {
        setData({
            ...data,
            current: _current,
            previous: data.previous + (data.current - data.previous) * data.ease,
            rounded: Math.round(data.previous)
        });

        const diff = data.rounded - input.start;
        const fullProgress = diff / input.scrollHeight;
        setStatus({
            ...status,
            progress: fullProgress < 0 ? 0 : fullProgress > 1 ? 1 : fullProgress,
            isTransitioning: !!(fullProgress > 0 && fullProgress < 1)
        })
    }, [_current, data.rounded])
    
    useEffect(() => {
        requestAnimationFrame(easeProgress);
    }, [easeProgress])

    useEffect(() => {
        const start = _start + (_offset || 0);
        const end = start + _length;
        const scrollHeight = end - start;

        setInput({
            ...input,
            start: start,
            end: end,
            scrollHeight: scrollHeight,
        })
    }, [_start, _length, _offset])

    return {
        ...status,
        scrollHeight: input.scrollHeight
        // scrollHeight,
    };
};
