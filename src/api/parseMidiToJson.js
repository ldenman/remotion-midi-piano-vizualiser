const fs = require('fs');
const toneJsMidi = require('@tonejs/midi');
var readline = require('readline');

const FPS = 60;

const { Midi } = toneJsMidi;

const isNoteActive = (currentSecondInVideo, note) => {
    if (note.time >=  currentSecondInVideo) {
        return false;
    }

    if (note.time + note.duration <= currentSecondInVideo) {
        return false;
    }

    return true;
};

const getActiveNotesFromTrack = (currentSecondInVideo, track) => {
    return track.notes
        .filter((note) => isNoteActive(currentSecondInVideo, note))
        .map((note) => ({
            midi: note.midi,
        }));
};

const printProgress = (frame, totalFrames) => {
    const progress = ((frame / totalFrames) * 100).toFixed(2);
    readline.clearLine(process.stdout);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`Converting midi to jsonc : ${progress}% (${frame}/${totalFrames})`);
};

const convertMidiToActiveFramePerNote = (midi) => {
    const dataPerFrame = {};
    const totalFrames = Math.round(midi.duration * FPS);
    for (let frame = 0; frame < totalFrames; frame++) {
        printProgress(frame, totalFrames);
        const currentSecondInVideo = frame / FPS;
        const activesNotesAtFrame = [
            ...getActiveNotesFromTrack(currentSecondInVideo, midi.tracks[0]),
        ];

        activesNotesAtFrame.map((note) => {
            if (!dataPerFrame[note.midi]) {
                dataPerFrame[note.midi] = [];
            }
            dataPerFrame[note.midi].push(frame);
        });
    }

    return dataPerFrame;
};
const readMidi = () => {
    const midiData = fs.readFileSync('input.mid');
    const midi = new Midi(midiData);

    const activeFramePerNote = convertMidiToActiveFramePerNote(midi);
    const dataToWrite = { activeFramePerNote, duration: midi.duration };

    fs.writeFileSync('./src/api/midi.json', JSON.stringify(dataToWrite), null, 4);
};

readMidi();
