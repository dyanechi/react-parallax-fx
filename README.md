# React Parallax Pro Components

This package adds support to create Parallax Components in React. Although there might be a few similar packages on the market, not all of them are the right suit for every project.

## Version ^1.3.0
This version brings new experimental API including `useParallax` hook and `<UseParallax>` component. While this project is still in development, `Parallax` component from previous version works as in specification below in order to prevent conflicts.

Starting this version we recommend to use `<UseParallax>` component which is utilizing the new `useParallax()` hook. You can import it to your project and use in sample like so:
```js
import { UseParallax } from 'react-parallax-pro'
// ...

const App = () => {
    // ...

    const pxConfig = {
        // Possible values: "bottom" | "center" | "top" | number
        startScroll: "center",
        fadeIn: { /* ... */ },
        fadeOut: { /* ... */ },
        // NOTE: do not use `fadeIn` or `fadeOut` while using `keyframes`!
        keyframes: { /* ... */ },
    }

    return (
        <UseParallax {...pxConfig} >
            {({isTransitioning, inView}) => (
                <YourComponent>
                    // ... The rest of components

                    // You can pass exposed variables into components as well, ex:
                </YourComponent>
            )}
        </UseParallax>
    )
}
```

New API includes ability to control `fadeIn` and `fadeOut` animation to allow more customization.
It also includes `keyframes` which is currently <b>experimental</b> and it allows to manually control the animation/transition step-by-step.
<b>Do not</b> use `fadeIn`/`fadeOut` if you're using `keyframes` - it won't work.

## What makes this library unique?

You can create more advanced scroll-based animations without breaking your existing styled elements/components. Simply wrap your components within `<Parallax>` and customize them to your likings.

## Features
Some of the key Features include:
- scroll detection transitions 
- animate elements based on user's scroll
- window + scroll detection
- color transitions
- <b>background transitions</b>
- <b>gradient transitions</b>
- translate, rotate, scale transformations
- offset and delay animations
- filter animations
- fade in transitions
- fade out transitions
- <b>*keyframed animations</b>

## Get Started

Add package to your dev dependencies

```
npm i --save-dev react-parallax-pro
```


# API

## How to import
Import package into your existing react component like so:
```typescript
import { UseParallax } from 'react-parallax-pro';
```

## How to use
Then you'll want to wrap your component between `<Parallax> MyComponent </Parallax>` JSX

```js
const App = (props) => {

    const pxConfig = {
        ...
    }

    return (
        <Parallax {...pxConfig} {...props}>
            <YourComponent />
        </Parallax>
    )
}
```

# Components 
This library is simple yet powerful. There is `useParallax` hook as well as wrapped `<UseParallax>` components for you to start with out of the box!

## `useParallax` hook
It allows you to control <b>any</b> component and turn it into a <b>Parallax Component</b>.
This library already provides `<UseParallax>` component that implements this hook, though you can use it on your own components as well.

## `<UseParallax>` Component
This is a component that can wrap other components to provide <b>Parallax</b> control.
At the moment the usage is following: <br />
Import:
```typescript
import { UseParallax } from "react-parallax-pro";
```

Then use like so:
```js
<UseParallax {...pxConfig}>
    <YourComponent />
</UseParallax>
```

You can also use <b>Function as children</b> technique to get returned value `status` that can be destructured to access following properties:

- `isTransitioning: boolean;`
- `inView: boolean;`
All these values are <i>optional</i>, you can choose <i>any</i> and pass to other components.

Example:
```js
<UseParallax {...pxConfig}>
    {({isTransitioning, inView}) => (
        <YourComponent status={isTransitioning} inView={inView}>
            // ...
        </YourComponent>
    )}
</UseParallax>
```


## Parallax Component's Config API
Inside the `pxConfig` you can pass following arguments:

```ts
interface UseParallaxAPI {
    /* Specifies when to detect element based on scroll and window position */
    startScroll? = 'top' | 'center' | 'bottom' | number; // --> 'bottom'
    
    /* Specifies how long (in px) the transition will take. */
    endScroll?: number | '${number}%'; // --> '100%' of container's height

    /* Offset animation by `number` of pixels before it starts transitioning. */
    offset?: number; // --> 0

    /* If set to `true`, transition will NOT be performed. */
    disabled?: boolean; // --> false

    /* If set to `true`, scroll transition will extend its length to fit all animations. */
    extend?: boolean;

    /* Creates Fade In smooth transition starting at `startScroll` position. */
    fadeIn?: IParallaxAnimationProps;

    /* Creates Fade Out smooth transition starting at `endScroll` position. */
    fadeOut?: IParallaxAnimationProps;

    /* Compose custom animation based on an array of keyframes. */
    // NOTE: Do NOT use `fadeIn` or `fadeOut` with keyframes.
    keyframes?: IParallaxKeyframe[];

    /* Allows to pass custom styles via styled-components or other css modules */
    className?: string;

    // Pass `JSX Component` or a `Function as Children` 
    children?: ((status: ParallaxStatus) => JSX.Element) | JSX.Element | React.ReactNode;
}
```


## Parallax Supported Effects
Most of the transitions are made to have the easiest syntax. Effects take an array with `start` and `end` properties to transition between for a specified amount of time (length of the component or custom length/offset values).

`fadeIn` AND `fadeOut` take following arguments:

```ts
interface IParallaxAnimation {
    /* Transitions transparency (0 - 1 ) */
    opacity?: [start: number, end: number];

    /* Transitions background color */
    background?: [start: Color, end: Color];

    /* Animates component's transformations */
    transform?: TransformProps;

    /* Smoothly animates gradient colors */
    gradient?: GradientProps;

    /* Transition filters */
    filter?: FilterProps;
}
```

## Properties' interface description
Let's explain properties `Color`, `TransformProps`, `GradientProps` and `FilterProps`. <br />

### `Color` Property
Property `Color` MUST be either RGBA array:
```ts 
type RGBA = [r: number, g: number, b: number, a: number]
``` 
OR hexadecimal number `#000` | `#ffff` | `#rrggbb` | `#rrggbbaa`
<br />


### `Transform` Property
Transformation is exactly like you would use it in CSS, but passed as an <b>Array</b> of values instead.
So you'll pass the array of `start -> end` values.
```ts
interface TransformProps {
    /* Translate component's position (X, Y) */
    translate?: [
        X: [start: number, end: number],
        Y: [start: number, end: number]
    ];

    // NOTE: If `translate` is set, `translateX` and `translateY` will be ignored. */
    /* Translate component's horizontal position */
    translateX?: [start: number, end: number];

    /* Translate component's horizontal position */
    translateY?: [start: number, end: number];

    /* Rescale component (1.0 is default) */
    scale?: [start: number, end: number];

    /* Rotate component by `number` degrees */
    rotate?: [start: number, end: number];
}
```
<br />


### `Filter` Property
Filters follow exactly the same syntax as `Transform` and properties are self-explanatory I suppose.

```ts
export interface FilterProps {
    blur?: [start: number, end: number];
    brightness?: [start: nmber, end: number];
    contrast?: [start: numbuer, end: number];
    grayscale?: [start: number, end: number];
    hueRotate?: [start: number, end: number];
    opacity?: [start: number, end: number];
    saturate?: [start: number, end: number];
    sepia?: [start: number, end: number];
}
```
<br />


### `Gradient` Property
Now for the gradients to work we'll need tot take slighlty different approach.
- Values `start` and `end` are <b>required</b>.
- You MUST pass <b>at least 2 </b> values into the `Color[]` array
- You MUST pass <b>the same</b> number of elements to both `start` and `end`
- Value `type` is <i>optional</i> and defaults to `"linear"`
- Value `dir` is <i>optional</i> and defaults to `[0, 0]`
```ts
export interface GradientProps {
    /* Choose whether to use `linear` or `radial` gradient */
    type?: "linear" | "radial" | undefined;

    /* Animate (rotate) the gradient's curve */
    dir?: [start: number, end: number] | undefined;

    /* Array of colors to start with */
    start: Color[];

    /* Array of colors to finish animtation on */
    end: Color[];
}
```


## Keyframes
Keyframes have slightly different API. Each keyframe <b>require</b> parameters: `length` and `animations`.
</br>
There is optional `extend: boolean` that if set to `true` will automatically expand container's animation length in order to fit the full transition:

Example usage:
```js
import { UseParallax } from 'react-parallax-pro';
const App = (props) => {
    
    const pxConfig = {
        startScroll: "bottom",
        keyframes: [
            { length: 300, background: "#000" },
            { length: 200, background: "#eca" },
            { length: 300, background: "#3cf" },
            { length: 500, background: "#fff" },
            { length: 200, background: "#000" },
        ]
    }

    return (
        <UseParallax {...pxConfig} {...props}>
        // ...
        </UseParallax>
    )
}
    
```


### Interface
It's <b>important</b> Keyframes instead of array take `single` values, pretty much same as CSS properties.
Hence instead of passing arrays, you can pass <i>any</i> supported property as is and the interpolations will be automatically calculated for you.
NOTE: You MUST pass <b>at least 2 keyframes</b> for animation to work properly.


```ts
export interface IParallaxKeyframe extends IParallaxKeyframeAttributes {
    /* REQUIRED - Length of animation in `px` */ 
    length: HTMLValueType;

    /* If true, animation will hold previous keyframe's state */
    hold?: boolean;

    /* Transform */
    translate?: [X: number, Y: number];
    translateX?: number;
    translateY?: number;
    scale?: number;
    rotate?: number;

    /* Opacity */
    opacity?: number;

    /* Background */
    background?: Color;

    /* Gradient */
    gradient?: {
        colors: Color[],
        type?: 'linear' | 'radial' | undefined,
        dir?: number
    }

    // Filters //
    blur?: number;
    brightness?: number;
    contrast?: number;
    grayscale?: number;
    hueRotate?: number;
    saturate?: number;
    sepia?: number;
```

## Last Words
Alright, that's all for now. This library is still in development and if you can, please let me know your thoughts on it! <br />

What would you use it for?


# FAQ

### How to fix overflowing components?
When animating transformation, such as `transform`, `scale` or `rotate` with `<UseParallax>` component you might notice overflows out of the container. This may cause various glitches.
In order to fix it, simply wrap all your Parallax elements within a wrapper with `overflow: hidden` style.
Example:
```js
<div style={{overflow: hidden}}>
    <UseParallax><YourComponent1 /><UseParallax />
    <UseParallax><YourComponent2 /><UseParallax />
    <UseParallax><YourComponent3 /><UseParallax />
</div>
```

### How to add share animation between components?
In future versions you'll be able to use provider to set default values (that's in work currently).
As of now you can create a `pxConfig` variable and apply it to multiple components. 
```js
// Your animation
const pxConfig={ ... }

const app = () => {
    //...
 
    return (
        <div style={{overflow: hidden}}>
            <UseParallax {...pxConfig}><YourComponent1 /><UseParallax />
            <UseParallax {...pxConfig}><YourComponent2 /><UseParallax />
            <UseParallax {...pxConfig}><YourComponent3 /><UseParallax />
        </div>
    )
}
```


# Support

Plese visit github repository here: https://github.com/dyanechi/react-parallax-pro if you'd like to contribute or have any questions, issues or anything else :) 

## TODO
- Update API ✓
- Improve control over animations
- Add easing functions
- Fix small bugs
- Optimize performance