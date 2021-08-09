import { FunctionComponent } from 'react';
import { Solfege } from './Solfege';
import { useVideoConfig } from 'remotion';
import styled from 'styled-components';
import { FIRST_NOTE, LAST_NOTE } from '../constant';
import { useGetActivesNotes } from './useGetActivesNotes';

export const SolfegeScene: FunctionComponent = () => {
    const { width } = useVideoConfig();
    const { activeNotesMidiNumber } = useGetActivesNotes();

    return (
        <SolfegeContainer>
            <Solfege
		activeNotes={activeNotesMidiNumber}
            />
	    <FooContainer>
	    {activeNotesMidiNumber}
	    </FooContainer>
	    
        </SolfegeContainer>
    );
};

const SolfegeContainer = styled.div`
    position: relative;
    bottom: 0;
    background-color: 'white';
`;

const FooContainer = styled.div<{   }>`

  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);

    font-family: ${({ theme }) => theme.fonts.roboto};
    color: white;
    font-size: 60px;
`;

