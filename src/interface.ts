export type ActiveFrames = Array<number>;

export interface MidiData {
    activeFramePerNote: ActiveFrameForNotes;
    duration: number;
}

export interface ActiveFrameForNotes {
    [midi: string]: ActiveFrames;
}
