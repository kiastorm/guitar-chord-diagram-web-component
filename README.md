# Guitar Chord Diagram

Guitar Chord Diagram is a TypeScript library for creating interactive guitar chord diagrams.

## Features

- Interactive chord diagrams
- Customizable number of frets, strings, and tuning
- Supports capo and barre chords
- Mouse events for user interaction

## Installation

`npm install @chorducate/guitar-chord-diagram-wc`

API
setChord(chord: Chord)
Sets the chord to be displayed. The chord parameter is an object with the following properties:

amountOfFrets: The number of frets on the guitar.
frets: An array of fret numbers, one for each string.
fingers: An array of finger numbers, one for each string.
barres: An array of fret numbers that are barred.
capo: A boolean indicating whether or not a capo is used.
baseFret: The fret number of the base fret.
strings: The number of strings on the guitar.
tuning: An array of note names, one for each string.
Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

License
MIT
