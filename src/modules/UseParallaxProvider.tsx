import React, { createContext, PropsWithChildren, useContext } from "react";
import { IParallaxKeyframe } from "../types";

interface UseParallaxConfig {
    startScroll?: "top" | "center" | "bottom" | number;
    ease?: number;
    easeFn?: 'linear' | 'parabolic';
    extend?: boolean;
    offset?: number;
    keyframes?: IParallaxKeyframe[];
}

const defaultUseParallax: UseParallaxConfig = {
    startScroll: "bottom",
    ease: 0.1,
    easeFn: 'linear',
    offset: 0,
    extend: true,
    keyframes: []
}

const UseParallaxContext = createContext(defaultUseParallax);
export const useParallaxContext = () => useContext(UseParallaxContext);

interface UseParallaxProviderProps extends PropsWithChildren{
    config: UseParallaxConfig;
}
export const UseParallaxProvider = ({ children, config }: UseParallaxProviderProps) => {
    return (
    <UseParallaxContext.Provider value={Object.assign({}, defaultUseParallax, config)}>
        {children}
    </UseParallaxContext.Provider>
    )
}

export default UseParallaxProvider;