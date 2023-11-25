# Guitar Chord Diagram Web Component

A web component for rendering interactive guitar chord diagrams.

## Features

- Render guitar chord diagrams in the browser as SVG
- Can be interactive or static.
- Export as SVG or PNG
- Supports capo and barre chords
- Render any chord in any tuning
- Supports finger numbers

## Installation

`npm install @chorducate/guitar-chord-diagram-wc`

## Usage

GCD has the following configurable properties:

`amountOfFrets`: The number of frets on the guitar.
`frets`: An array of fret numbers, one for each string.
`fingers`: An array of finger numbers, one for each string.
`barres`: An array of fret numbers that are barred.
`capo`: A boolean indicating whether or not a capo is used.
`baseFret`: The fret number of the base fret.
`strings`: The number of strings on the guitar.
`tuning`: An array of note names, one for each string.

They are reflected as attributes on the DOM element, so you can set them like this:

```html
<guitar-chord-diagram
  amountOfFrets="4"
  frets="[0, 1, 2, 2, 0, 0]"
  fingers="[0, 1, 2, 3, 0, 0]"
  barres="[2]"
  capo
  baseFret="0"
  strings="6"
  tuning="['E', 'A', 'D', 'G', 'B', 'E']"
></guitar-chord-diagram>
```
