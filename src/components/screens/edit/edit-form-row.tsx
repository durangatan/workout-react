import React from 'react';
import styled from 'styled-components';
import { Dropdown, Input } from '../../elements';
import { Exercise, ExerciseSet } from 'workout-models';

const FormRowContainer = styled.div`
  width: 100%;
  padding-left: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
type EditFormRowProps = {
  exercises: Array<Exercise>;
  routineSet: ExerciseSet;
  updateRoutineSets: (routineSetId: number, attrs: any) => void;
};

export default function EditFormRow({ exercises, routineSet, updateRoutineSets }: EditFormRowProps) {
  return (
    <FormRowContainer>
      <Dropdown
        activeIndex={exercises.findIndex((exercise: any) => routineSet.exerciseId == exercise.id)}
        options={exercises.map((exercise: any) => ({ value: exercise.id, label: exercise.name }))}
        onChange={event => routineSet.id && updateRoutineSets(routineSet.id, { exerciseId: event.currentTarget.value })}
        name={'Exercise'}
      />
      <Input
        label={'Reps:'}
        value={routineSet.repetitions}
        type="number"
        onChange={event =>
          routineSet.id && updateRoutineSets(routineSet.id, { repetitions: event.currentTarget.value })
        }
      />
      <Input
        label={'Weight'}
        value={routineSet.weight}
        type="number"
        onChange={event => routineSet.id && updateRoutineSets(routineSet.id, { weight: event.currentTarget.value })}
      />
    </FormRowContainer>
  );
}
