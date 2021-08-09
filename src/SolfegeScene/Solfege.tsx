import { FunctionComponent } from 'react';
import styled from 'styled-components';

interface Props {
    midiNumber: string;
    activeNotes: array;
}
export const Solfege: FunctionComponent<Props> = ({ bottom, height }) => {
    return <Container />;
};

const Container = styled.div<{ $bottom: string; $height: string }>`

`;
