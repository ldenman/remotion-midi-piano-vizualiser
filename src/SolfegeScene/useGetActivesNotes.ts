import { useCurrentFrame } from 'remotion';
import midiData from '../api/midi.json';
import solfegeData from '../api/solfege.json';
import { DELAY_BEFORE_MUSIC_START } from '../constant';
import { ActiveFrameForNotes, MidiData, ActiveFrameForSolfege, SolfegeData } from '../interface';

const typedSolfegeData: SolfegeData = solfegeData;

const getActivesNotesAtFrame = (frame: number, typedSolfegeData: ActiveFrameForSolfege) => {
    const activeNotes: Array<number> = [];
    Object.keys(typedSolfegeData).forEach((midiNumber: string) => {
        const isNoteActive = typedSolfegeData[midiNumber].includes(frame - DELAY_BEFORE_MUSIC_START);
        if (isNoteActive) {
            activeNotes.push(midiNumber);
        }
    });
    return activeNotes;
};

export const useGetActivesNotes = () => {
    const frame = useCurrentFrame();

    return {
        activeNotesMidiNumber: getActivesNotesAtFrame(frame, typedSolfegeData.activeFramePerNote),
    };
};
