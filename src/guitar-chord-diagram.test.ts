import { GuitarChordDiagram } from "./guitar-chord-diagram";

describe("GuitarChordDiagram Class Tests", () => {
  let guitarChordDiagram: GuitarChordDiagram;

  beforeEach(() => {
    guitarChordDiagram = new GuitarChordDiagram();
  });

  test("getNotes should return correct notes for a chord", () => {
    expect(guitarChordDiagram.getNotes()).toEqual([
      "E2",
      "A2",
      "D3",
      "G3",
      "B3",
      "E4",
    ]);
  });

  test("getNote should return correct note for a string and fret", () => {
    expect(guitarChordDiagram.getNote(0, 0)).toEqual("E2");
    expect(guitarChordDiagram.getNote(1, 0)).toEqual("A2");
    expect(guitarChordDiagram.getNote(2, 0)).toEqual("D3");
    expect(guitarChordDiagram.getNote(3, 0)).toEqual("G3");
    expect(guitarChordDiagram.getNote(4, 0)).toEqual("B3");
    expect(guitarChordDiagram.getNote(5, 0)).toEqual("E4");

    expect(guitarChordDiagram.getNote(0, 1)).toEqual("F2");
    expect(guitarChordDiagram.getNote(1, 1)).toEqual("A#2");
    expect(guitarChordDiagram.getNote(2, 1)).toEqual("D#3");
    expect(guitarChordDiagram.getNote(3, 1)).toEqual("G#3");
    expect(guitarChordDiagram.getNote(4, 1)).toEqual("C4");
    expect(guitarChordDiagram.getNote(5, 1)).toEqual("F4");

    expect(guitarChordDiagram.getNote(0, 2)).toEqual("F#2");
    expect(guitarChordDiagram.getNote(1, 2)).toEqual("B2");
    expect(guitarChordDiagram.getNote(2, 2)).toEqual("E3");
    expect(guitarChordDiagram.getNote(3, 2)).toEqual("A3");
    expect(guitarChordDiagram.getNote(4, 2)).toEqual("C#4");
    expect(guitarChordDiagram.getNote(5, 2)).toEqual("F#4");

    expect(guitarChordDiagram.getNote(0, 3)).toEqual("G2");
    expect(guitarChordDiagram.getNote(1, 3)).toEqual("C3");
    expect(guitarChordDiagram.getNote(2, 3)).toEqual("F3");
    expect(guitarChordDiagram.getNote(3, 3)).toEqual("A#3");
    expect(guitarChordDiagram.getNote(4, 3)).toEqual("D4");
    expect(guitarChordDiagram.getNote(5, 3)).toEqual("G4");

    expect(guitarChordDiagram.getNote(0, 4)).toEqual("G#2");
    expect(guitarChordDiagram.getNote(1, 4)).toEqual("C#3");
    expect(guitarChordDiagram.getNote(2, 4)).toEqual("F#3");
    expect(guitarChordDiagram.getNote(3, 4)).toEqual("B3");
    expect(guitarChordDiagram.getNote(4, 4)).toEqual("D#4");
    expect(guitarChordDiagram.getNote(5, 4)).toEqual("G#4");
  });

  test("getMidiNotes should return correct MIDI numbers for a chord", () => {
    expect(guitarChordDiagram.getMidiNotes()).toEqual([40, 45, 50, 55, 59, 64]);
  });

  test("getMidiNote should return correct MIDI number for a string and fret", () => {
    expect(guitarChordDiagram.getMidiNote(0, 0)).toEqual(40);
    expect(guitarChordDiagram.getMidiNote(1, 0)).toEqual(45);
    expect(guitarChordDiagram.getMidiNote(2, 0)).toEqual(50);
    expect(guitarChordDiagram.getMidiNote(3, 0)).toEqual(55);
    expect(guitarChordDiagram.getMidiNote(4, 0)).toEqual(59);
    expect(guitarChordDiagram.getMidiNote(5, 0)).toEqual(64);

    expect(guitarChordDiagram.getMidiNote(0, 1)).toEqual(41);
    expect(guitarChordDiagram.getMidiNote(1, 1)).toEqual(46);
    expect(guitarChordDiagram.getMidiNote(2, 1)).toEqual(51);
    expect(guitarChordDiagram.getMidiNote(3, 1)).toEqual(56);
    expect(guitarChordDiagram.getMidiNote(4, 1)).toEqual(60);
    expect(guitarChordDiagram.getMidiNote(5, 1)).toEqual(65);

    expect(guitarChordDiagram.getMidiNote(0, 2)).toEqual(42);
    expect(guitarChordDiagram.getMidiNote(1, 2)).toEqual(47);
    expect(guitarChordDiagram.getMidiNote(2, 2)).toEqual(52);
    expect(guitarChordDiagram.getMidiNote(3, 2)).toEqual(57);
    expect(guitarChordDiagram.getMidiNote(4, 2)).toEqual(61);
    expect(guitarChordDiagram.getMidiNote(5, 2)).toEqual(66);

    expect(guitarChordDiagram.getMidiNote(0, 3)).toEqual(43);
    expect(guitarChordDiagram.getMidiNote(1, 3)).toEqual(48);
    expect(guitarChordDiagram.getMidiNote(2, 3)).toEqual(53);
    expect(guitarChordDiagram.getMidiNote(3, 3)).toEqual(58);
    expect(guitarChordDiagram.getMidiNote(4, 3)).toEqual(62);
    expect(guitarChordDiagram.getMidiNote(5, 3)).toEqual(67);

    expect(guitarChordDiagram.getMidiNote(0, 4)).toEqual(44);
    expect(guitarChordDiagram.getMidiNote(1, 4)).toEqual(49);
    expect(guitarChordDiagram.getMidiNote(2, 4)).toEqual(54);
    expect(guitarChordDiagram.getMidiNote(3, 4)).toEqual(59);
    expect(guitarChordDiagram.getMidiNote(4, 4)).toEqual(63);
    expect(guitarChordDiagram.getMidiNote(5, 4)).toEqual(68);
  });
});
