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
It also includes `keyframes` which is currently <b>experimental</b>

## What makes this one unique?

You can create more advanced scroll-based animations without breaking your existing styled elements/components. Simply wrap your components with `<Parallax>` and customize them to your likings.

## Features
Some of the key Features include:
- scroll detection transitions 
- animate elements based on user's scroll
- window + scroll detection
- color transitions
- <b>background transitions<b>
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

```typescript
startScroll?: 'top' | 'center' | 'bottom' | number`
```
Specifies when to detect element based on scroll and window position.
For example if `bottom` is set, elements will start transitioning when entering visible area at bottom of the window.
If `center` is set, elements that enter middle of the screen will start transitioning, etc.
Defaults to `bottom`.



```typescript
endScroll?: number | '${number}%' 
```
Specifies how long (in px) the transition will take.
Defaults to `100%` of the container's `height`.



```typescript
offset?: number
```
It will offset animation by `number` of pixels before it starts transitioning.



```typescript
disabled?: boolean
```
If set to `true`, transition will NOT be performed.
Defaults to `false`



```typescript
children?: any;
```
Any JSX elements can currently be passed to `Parallax` block.
It might change in the future versions.




## Parallax Supported Effects
Most of the transitions are made to have the easiest syntax. Effects take an array with `start` and `end` properties to transition between for a specified amount of time (length of the component or custom length/offset values).

```typescript
opacity?: [start: number, end: number]
```
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

```typescript
background?: [ start: Color, end: Color ]
```
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


### NOT YET IMPLEMENTED

`keyframes?: IParralaxAnimationProps[] & {}`
Will allow to create a set of animations.

`fadeIn?: IParralaxAnimationProps`
Currently only this `fadeIn` animation works as standard feature but is not yet available under this variable.

`fadeOut?: IParralaxAnimationProps`
It will allow to specify easing animation for leaving the screen.



# Support

Plese visit github repository here: https://github.com/dyanechi/react-parallax-pro if you'd like to contribute or have any questions, issues or anything else :) 

## TODO
- Update API
- Improve control over animations
- Add easing functions
- Fix small bugs
- Optimize performance