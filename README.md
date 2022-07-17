# React Parallax Pro Components

This package adds support to create Parallax Components in React. Although there might be a few similar packages on the market, not all of them are the right suit for every project.

## Version ^1.2.0
This version brings new experimental API including `useParallax` hook and `<UseParallax>` component. While this project is still in development, `Parallax` component from previous version works as in specification below in order to prevent conflicts.

Starting this version we recommend to use `<UseParallax>` component which is utilizing the new `useParallax()` hook. You can import it to your project and use in sample like so:
```typescript
import { UseParallax } from 'react-parallax-pro'
// ...

const App = () => {
    // ...

    const animation = {
        // Possible values: "bottom" | "center" | "top" | number
        startScroll: "center",
        fadeIn: { /* ... */ },
        fadeOut: { /* ... */ },
        // NOTE: do not use `fadeIn` or `fadeOut` while using `keyframes`!
        keyframes: { /* ... */ },
    }

    return (
        <UseParallax {...animation} />
            {({isTransitioning, inView}) =>
                <YourComponent>
                    // ... The rest of components

                    // You can pass exposed variables into components as well, ex:
                </YourComponent>
            }
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
    import { Parallax } from 'react-parallax-pro';
```

## How to use
Then you'll want to wrap your component between `<Parallax> MyComponent </Parallax>` JSX

```typescript
    const MyComponent = () => {

        const pxConfig = {
            ...
        }

        return (
            <Parallax {...pxConfig}>
                <MyComponent />
            </Parallax>
        )
    }
```

## Parallax Component's Config API

Inside the `pxConfig` you can pass following arguments:

```typescript
startScroll?: 'top' | 'center' | 'bottom' | number`
```
Specifies when to detect element based on scroll and window position.
For example if `bottom` is set, elements will start transitioning when entering visible area at bottom of the window.
If `center` is set, elements that enter middle of the screen will start transitioning, etc.
Defaults to `bottom`.
<br />


```typescript
endScroll?: number | '${number}%' 
```
Specifies how long (in px) the transition will take.
Defaults to `100%` of the container's `height`.
<br />


```typescript
offset?: number
```
It will offset animation by `number` of pixels before it starts transitioning.
<br />


```typescript
disabled?: boolean
```
If set to `true`, transition will NOT be performed.
Defaults to `false`
<br />


```typescript
children?: any;
```
Any JSX elements can currently be passed to `Parallax` block.
It might change in the future versions.
<br />



## Parallax Supported Effects
Most of the transitions are made to have the easiest syntax. Effects take an array with `start` and `end` properties to transition between for a specified amount of time (length of the component or custom length/offset values).

```typescript
opacity?: [start: number, end: number]
```
Transition between transparent and opaque elements. Values range is `0 - 1`.
<br />

```typescript
transform?: {
    translate?: [
        X: [start: number, end: number],
        Y: [start: number, end: number],
    ];
    translateX?: [start: number, end: number],
    translateY?: [start: number, end: number],
    scale?: [start: number, end: number],
    rotate?: [start: number, end: number],
}
```
You must pass object `transform` and specify any translation you like in transition array.
<br />

```typescript
background?: [ start: Color, end: Color ]
```
Property `Color` MUST be either RGBA array:
```typescript 
    [r: number, g: number, b: number, a: number]
``` 
OR hexadecimal number `#000` | `#ffff` | `#rrggbb` | `#rrggbbaa`
<br />


```typescript
gradient?: {
    type?: 'linear' | 'radial' | undefined;
    dir?: number | undefined;
    start: Color[],
    end: Color[]
}
```
Transition between set of `linear` OR `radial` gradients
- default `type` is `linear`
- default `dir` is `0`
- `start` MUST have the same length as `end`
- `start` and `end` MUST have at least `2` elements for gradient to work
<br />

```typescript
filter?: {
    blur?: [start: number, end: number],
    brightness?: number,
    contrast?: number,
    grayscale?: number,
    hueRotate?: number,
    saturate?: number,
    sepia?: number,
}
```
Allows to transition between filters.
<br />


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
```typescript
<UseParallax {...pxConfig}>
    <YourComponent />
</UseParallax>
```

You can also use <b>Function as children</b> technique to get returned value `status` that can be destructured to access following properties:

- `isTransitioning: boolean;`
- `inView: boolean;`
All these values are <i>optional</i>, you can choose <i>any</i> and pass to other components.

Example:
```typescript
<UseParallax {...pxConfig}>
    {({isTransitioning, inView}) => (
        <YourComponent status={isTransitioning} inView={inView}>
            // ...
        </YourComponent>
    )}
</UseParallax>
```

## Keyframes
Keyframes have slightly different API. Each keyframe <b>require</b> parameters: `length` and `animations`.
</br>
There is optional `extend: boolean` that if set to `true` will automatically expand container's animation length in order to fit the full transition:

Example usage:
```typescript
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
}
    <UseParallax {...pxConfig} {...props}>
        // ...
    </UseParallax>
```

# Support

Plese visit github repository here: https://github.com/dyanechi/react-parallax-pro if you'd like to contribute or have any questions, issues or anything else :) 

## TODO
- Update API
- Improve control over animations
- Add easing functions
- Fix small bugs
- Optimize performance