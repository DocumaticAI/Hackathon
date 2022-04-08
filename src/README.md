<!-- Your project description--->

For thisbhackaton I wrote a simple ray-tracer in the console.
It is not ready, since it has some issues with
quartic equations, and I couldn't figure out, why (yet)...

Even if it is not finished, it already has some features:
* Can render a sphere correctly with different light setups
* Can render a donut in a lot of cases, but fails on rotation
* The code already has rotation implementation, but it is not robust and fails in some cases (because of quartic equations)
* The power of light falling onto the object is calculated very precisely
* The code is expandable, so you can at any moment add new geometrical shapes in the future
* As always, no external libs!

To run, use `node .`.

* `math.js`: functions needed for calculations
* `body.js`: shapes and calculations of light reflection and tracings
* `index.js`: main file, creating scene, object and rendering happens here

(Moved to own repository)