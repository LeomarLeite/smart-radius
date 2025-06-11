# BorderRadius Designer

A powerful and flexible tool for visually configuring and exporting border-radius settings for your web elements. Easily generate a JavaScript configuration and apply it to any project with a single script.

## Features

- Visual UI for adjusting border-radius (proportional, fixed, per-corner, native CSS percent, etc.)
- Supports `.lr-auto-radius`, `.lr-auto-radius-top`, `.lr-auto-radius-bottom`, `.lr-auto-radius-left`, `.lr-auto-radius-right` classes for granular control
- Export your settings as a ready-to-use JavaScript constant
- One-click copy of the config in Markdown/code format
- Modern, dark, and tech-inspired UI

## How to Use

1. **Open the UI**  
   Use `index.html` to visually configure your border-radius settings.

2. **Adjust Settings**  
   - Choose between proportional (%) or fixed (px) radius
   - Select the base (largest side, smallest side, or average)
   - Set the application mode (per element, all-max, all-min)
   - Toggle which corners are active
   - Preview changes live

3. **Export the Config**  
   - Copy the generated `const lrAutoRadiusConfig = ...` block using the "Copiar" button.
   - The code is formatted for easy paste into your project.

4. **Apply in Your Project**  
   - Paste the config into your JS file (e.g., `lr-auto-radius.js`)
   - Include the script in your HTML or PHP page
   - Add the desired class (`.lr-auto-radius`, `.lr-auto-radius-top`, etc.) to your elements

5. **Result**  
   All elements with the specified class will automatically receive the configured border-radius on page load.

## Example

```js
const lrAutoRadiusConfig = {
  arredondado: true,
  tipo: "%",
  modo: "all-max",
  base: "base-menor",
  percent: 21,
  px: 20,
  useNativePercent: false,
  corners: {
    tl: true,
    tr: true,
    br: true,
    bl: true
  }
};
```

## Classes Supported

- `.lr-auto-radius` — all corners
- `.lr-auto-radius-top` — top corners only
- `.lr-auto-radius-bottom` — bottom corners only
- `.lr-auto-radius-left` — left corners only
- `.lr-auto-radius-right` — right corners only

## Visual Example

![BorderRadius Designer UI Screenshot](./assets/img/border-radius-ui-demo.png)

---

> For advanced integration, see the comments in `lr-auto-radius.js` and the UI in `index.html`.
