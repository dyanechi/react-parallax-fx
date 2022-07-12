# React Parallax Pro Components

This package adds support to create Parallax Components in React. Although there might be a few similar packages on the market, not all of them are the right suit for every project.


# What makes this one unique?

You can create more advanced scroll-based animations without breaking your existing styled elements/components. Simply wrap your components with `<Parallax>` and customize them to your likings.

# Features
Some of the key Features include:
- Scroll detection transitions 
- - animate elements based on user's scroll
- Window + Scroll detection:
- - choose to start animation when element is at top|center|bottom of the window
- color transitions
- gradient transitions
- translate, rotate, scale transformations
- offset and delay animations
- filter animations

# Get Started

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

Then you'll want to wrap your component between `<Parallax> MyComponent </Parallax>` JSX

```typescript
    const MyComponent = () => {

        const pxConfig = {
            ...
        }

        return (
            <Parallax ...pxConfig>
                <MyComponent />
            </Parallax>
        )
    }
```

## Parallax Component's Config API

Inside the `pxConfig` you can pass following arguments:

`startScroll?: 'top' | 'center' | 'bottom' | number`
Specifies when to detect element based on scroll and window position.
For example if `bottom` is set, elements will start transitioning when entering visible area at bottom of the window.
If `center` is set, elements that enter middle of the screen will start transitioning, etc.
Defaults to `bottom`.


`endScroll?: number | '${number}%' `
Specifies how long (in px) the transition will take.
Defaults to `100%` of the container's `height`.


`offset?: number`
It will offset animation by `number` of pixels before it starts transitioning.


`disabled?: boolean`
If set to `true`, transition will NOT be performed.
Defaults to `false`


`children?: any;`
Any JSX elements can currently be passed to `Parallax` block.
It might change in the future versions.



## Parallax Supported Effects
Most of the transitions are made to have the easiest syntax. Effects take an array with `start` and `end` properties to transition between for a specified amount of time (length of the component or custom length/offset values).

`opacity?: [start: number, end: number];`
Transition between transparent and opaque elements. Values range is `0 - 1`.

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


`background?: [ start: Color, end: Color ]`
Property `Color` MUST be either RGBA array:
```typescript 
    [r: number, g: number, b: number, a: number]
``` 
OR hexadecimal number `#000` | `#ffff` | `#rrggbb` | `#rrggbbaa`


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

```typescript
filter?: {
    blur?: [start: number, end: number],
}
```
Allows to transition between filters. Currently only `blur` is supported.


## NOT YET IMPLEMENTED

`keyframes?: IParralaxAnimationProps[] & {}`
Will allow to create a set of animations.

`fadeIn?: IParralaxAnimationProps`
Currently only this `fadeIn` animation works as standard feature but is not yet available under this variable.

`fadeOut?: IParralaxAnimationProps`
It will allow to specify easing animation for leaving the screen.



# Support

Plese visit github repository here: https://github.com/dyanechi/react-parallax-pro if you'd like to contribute or have any questions, issues or anything else :) 
