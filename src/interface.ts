export type ActiveFrames = Array<number>;

export interface MidiData {
    activeFramePerNote: ActiveFrameForNotes;
    duration: number;
}

export interface SolfegeData {
    activeFramePerNote: ActiveFrameForSolfege;
    duration: number;
}

export interface ActiveFrameForNotes {
    [midi: string]: ActiveFrames;
}
export interface ActiveFrameForSolfege {
    [midi: string]: ActiveFrames;
}

export interface NoteBoundaries {
    startFrame: number;
    endFrame: number;
}
