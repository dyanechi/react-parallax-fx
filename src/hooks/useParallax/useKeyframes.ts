import { useLayoutEffect, useState } from 'react';
import { IKeyframe, IKeyframeEvents, IKeyframesData, IKeyframesProps } from '../../types';


export const useKeyframes = <T>() => {
    const [config, setConfig] = useState<IKeyframesData<T> & IKeyframeEvents>({
        totalLength: 0,
        frames: new Array<IKeyframe<T>>(),
        currentFrame: 0,
        extend: false,
        isInitialized: false,
        easing: 0.1,
        onChange: () => {}
    })

    const init = (cfg: IKeyframesProps<T>, callback?: (len: number) => void) => {
        if (config.isInitialized) {
            console.warn("useKeyframes 'config' is already initialized.");
        } else {
            const frames = new Array<IKeyframe<T>>()
            let length = 0,
                curFrame = {} as IKeyframe<T>;

            cfg.forEach((f, i) => {
                const nextFrame = i >= cfg.length-1 ?
                    cfg[cfg.length-1] : cfg[i+1];
                Object.assign(curFrame, f.hold? {} : nextFrame, f);
                frames.push({...curFrame, start: length + f.start})
                length += f.length;
            })
            console.log(frames);
            setConfig({...config, frames: frames, totalLength: length, isInitialized: true});
            callback && callback(length);
            console.log("'useKeyframe': initialized");
        }
    }

    const getAllFrames = () => config.frames;
    const getFrame = (progress: number) => {
        const curFrameId = updateCurrentFrame(progress);
        const nextFrameId =
            curFrameId >= config.frames.length-2 ?
            config.frames.length-1 : curFrameId + 1;
        // const prevFrameId = 
        //     curFrameId <= 1 ? 0 : curFrameId - 1;

        const curFrame = config.frames[curFrameId];
        const nextFrame = config.frames[nextFrameId];
        // const prevFrame = config.frames[prevFrameId];
        // setCurrentFrame(curFrame);

        const start = curFrame.start / config.totalLength;
        const end = start + curFrame.length / config.totalLength;
        const slope = 1 / (end - start);
        const curProgress = (slope * progress) - (end / (end - start)) + 1;

        return { curFrame, nextFrame, curProgress };
    }

    function updateCurrentFrame (progress: number): number {
        const frames = config.frames;
        const curProgress = progress * config.totalLength;
        
        // Check if there are some common patterns to save calculations
        if (curProgress > frames[frames.length-1].start) {
            setConfig({...config, currentFrame: frames.length-1});
            return frames.length-1;
        }
        if (curProgress < frames[0].length) 
        {
            setConfig({...config, currentFrame: 0});
            return 0;
        }
        if (curProgress > frames[config.currentFrame].start &&
            curProgress < frames[config.currentFrame].length)
            return config.currentFrame;
        

        // Binary search otherwise
        let i = 0,
            first  = 0,
            last   = frames.length - 1,
            middle = Math.floor((last + first)/2);

        let found = false;
        while(!found && first <= last && i < 10) { 
            i++;
            const frame = frames[middle];
            const s = frame.start;
            const end = s + frame.length;;
            
            if (curProgress < s) last = middle - 1;
            else if (curProgress > end) first = middle + 1;

            found = (s < curProgress && curProgress < end);
            if (found) {
                setConfig({...config, currentFrame: middle});
                return middle; // Hope this is right `rest`!
            }
            middle = Math.floor((last + first)/2);
        }
        return config.currentFrame;
    } 

    useLayoutEffect(() => {
        console.info('frames updated');

    }, [config.frames])

    return {
        get: config,
        // set: setCfg,
        init,

        getLength: () => config.totalLength,
        getFrames: () => config.frames,
        getCurrentFrame : getFrame,
        getAllFrames,
        
        isInitialized: config.isInitialized,
    };
}