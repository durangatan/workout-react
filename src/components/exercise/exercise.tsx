import React from 'react';
import styled from 'styled-components';
import { renderIf } from '../util';
import { Table } from '../elements';
import { Exercise as ExerciseModel } from '../../../../workout-models';
import { SetType } from '../../../../workout-models/WorkoutSet';
const ExerciseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export default function Exercise({ exercise, setType }: { exercise: ExerciseModel; setType: SetType }) {
  return (
    <ExerciseContainer>
      <h1>
        {exercise.name}
        {exercise.machineId ? ` (#${exercise.machineId})` : ''}
        {setType !== 'Default' ? `- ${setType}` : ''}
      </h1>
      {renderIf(
        Boolean(exercise.notes),
        <h3>
          <i>{exercise.notes}</i>
        </h3>
      )}
      <Table
        rows={[['Range Setting', 'Seat Setting'], [exercise.rangeSetting || 'N/A', exercise.seatSetting || 'N/A']]}
      />
    </ExerciseContainer>
  );
}
