import { useEffect, useLayoutEffect, useState } from 'react';
import { IKeyframe, IKeyframeEvents, IKeyframesData, IKeyframesProps } from '../../types';
import { toInt } from './helpers/parsers';


export const useKeyframes = <T>() => {
    const [config, setConfig] = useState<IKeyframesData<T> & IKeyframeEvents>({
        totalLength: 0,
        frames: new Array<IKeyframe<T>>(),
        currentFrame: 0,
        extend: false,
        isInitialized: false,
        onChange: (event: number) => 0
    })

    const [currentFrame, setCurrentFrame] = useState<IKeyframe<T>>();

    useEffect(() => {
        console.log(`useKeyframes: frame changed to`, currentFrame);
        // config.isInitialized && animate();
    }, [currentFrame]);

    const getAllFrames = () => config.frames;

    const getFrame = (progress: number) => {
        const curFrameId = getCurrentFrame(progress);
        const prevFrameId = 
            curFrameId <= 1 ? 0 :
            curFrameId > config.frames.length-2? config.frames.length-1
            : curFrameId - 1;

        const nextFrameId =
            curFrameId >= config.frames.length-2? config.frames.length-1
            : curFrameId + 1;

        const curFrame = config.frames[curFrameId];
        const prevFrame = config.frames[prevFrameId];
        const nextFrame = config.frames[nextFrameId];
        // setCurrentFrame(curFrame);

        const start = curFrame.start / config.totalLength;
        const end = start + curFrame.length / config.totalLength;
        const slope = 1 / (end - start);
        const curProgress = slope * progress - (end / (end - start)) + 1;
        // console.log(start, end, slope.toFixed(3), current.toFixed(3), progress.toFixed(3));

        // const nextFrameId = config.currentFrame + 1;
        // const nextFrame = nextFrameId > config.frames.length 
        //     ? curFrame : config.frames[nextFrameId];
        // console.log(nextFrame)
        // const prevFrameId = config.currentFrame - 1;
        // const prevFrame = prevFrameId <= 0
        //     ? config.frames[0] : config.frames[prevFrameId];

        return {curFrame, nextFrame, curProgress};
    }

    function getCurrentFrame (progress: number): number {
        const frames = config.frames;
        const curProgress = progress * config.totalLength;
        // const {start, length } = frames[config.currentFrame];
        
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
            
            // console.log('Before:', first, last, middle, s, end, curProgress, found, i);
            if (curProgress < s) last = middle - 1;
            else if (curProgress > end) first = middle + 1;

            found = (s < curProgress && curProgress < end);
            // console.log('After:', first, last, middle, s, end, curProgress, found, i, frames);
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

    const init = (cfg: IKeyframesProps<T>, callback?: (len: number) => void) => {
        if (config.isInitialized) {
            console.warn("useKeyframes 'config' is already initialized.");
        } else {
            const frames = new Array<IKeyframe<T>>()
            let length = 0,
                counter = 0,
                prevFrame = {} as IKeyframe<T>,
                curFrame = {} as IKeyframe<T>;

            cfg.forEach(f => {
                // Check if `prevFrame` has properties not existing on `curFrame`
                // If `curFrame` has `hold` set to true, copy values from `prevFrames`
                // Otherwise set values to default or 0
                Object.assign(curFrame, f);
                // console.info(curFrame, f);
                
                //     Object.keys(prevFrame).forEach(key => {
                //         console.log(counter, key, key in curFrame, curFrame,f);
                //         if (!(key in curFrame)) {
                //             console.log(`${key} not exist on `, curFrame);
                //             curFrame[key] = prevFrame[key];
                //         }
                //     })
                //     Object.keys(curFrame).forEach(key => {
                //         if (!(key in prevFrame)) {
                //             console.log(`${key} not exist on `, prevFrame);
                //             prevFrame[key] = curFrame[key];
                //         }
                //     })
                //     frames[counter] = prevFrame;
                // }
                
                // if (Object.entries(prevFrame).length > 0) {
                //     Object.assign(
                //         frames[counter-1],
                //         frames[counter],
                //         { ...prevFrame, start: curFrame.start - prevFrame.length});
                // }
                frames.push({...curFrame, start: length})
                console.log(prevFrame, frames[counter-1], curFrame, frames[counter]);

                Object.assign(prevFrame, curFrame);
                
                length += f.length;
                counter++;
            })
            console.log(frames);
            setConfig({...config, frames: frames, totalLength: length, isInitialized: true});
            callback && callback(length);
            console.log("'useKeyframe': initialized");
        }
    }

    const setCfg = (cfg: IKeyframesProps<T>) => {
        if (config.isInitialized) {
            console.warn("useKeyframes 'config' is already initialized.");
        } else {
            let length = 0;
            cfg.forEach(f => length += toInt(f.length))
            setConfig({...config, frames: {...cfg}, totalLength: length});
        }
        console.log("'useKeyframe': config updated");
        return config;
    }
    

    return {
        get: config,
        set: setCfg,
        init,

        getLength: () => config.totalLength,
        getFrames: () => config.frames,
        getCurrentFrame : getFrame,
        getAllFrames,
        
        isInitialized: config.isInitialized,
    };
}