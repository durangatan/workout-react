import React, { useState, useEffect, useRef, ReactNode } from 'react';
import move from 'lodash-move';
import { withRouter } from 'react-router-dom';
import { Main } from '../../page';
import { getRoutines, getRoutine, getExercises, postRoutine } from '../../../api';
import { Button, LinkButton, Dropdown, DragAndDropRegion, Input } from '../../elements';
import { EditFormRow } from './';
import { ButtonContainer } from '../../elements/button';
import { Routine, RoutineSet, Exercise, ExerciseSet } from 'workout-models';
type RoutineSetMap = {
  [routineId: number]: Array<ExerciseSet>;
};

function EditScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [routines, setRoutines] = useState<Array<Routine>>([]);
  const [routineSets, setRoutineSets] = useState<RoutineSetMap>({});
  const [exercises, setExercises] = useState<Array<Exercise>>([]);
  const activeRoutine = routines[activeIndex];
  const activeRoutineId = routines[activeIndex] ? routines[activeIndex].id : null;
  const activeRoutineSets = activeRoutineId && routineSets[activeRoutineId] ? routineSets[activeRoutineId] : [];
  useEffect(() => {
    getRoutines().then(routines => {
      setRoutines(routines);
      if (routines[0]) {
        getRoutine(routines[0].id).then(routineWithSets => {
          setRoutineSets({ ...routineSets, [routineWithSets.id]: routineWithSets.sets });
        });
      }
    });
  }, []);

  useEffect(() => {
    getExercises().then(exercises => {
      setExercises(exercises);
    });
  }, []);

  useEffect(() => {
    if (activeRoutine && activeRoutineId) {
      if (activeRoutineSets) {
        setRoutineSets({ ...routineSets, [activeRoutineId]: activeRoutineSets });
      } else {
        getRoutine(activeRoutineId).then(routineWithSets => {
          setRoutineSets({ ...routineSets, [activeRoutineId]: routineWithSets.sets });
        });
      }
    }
  }, [activeIndex]);

  const onDragEnd = (result: any): any => {
    if (!result.destination) {
      return;
    }
    const array = move(activeRoutineSets, result.source.index, result.destination.index);
    if (activeRoutineId) {
      setRoutineSets({ ...routineSets, [activeRoutineId]: array });
    }
  };

  const updateRoutineSets = (routineSetId: number, attrsToMerge: any) => {
    const newActiveRoutineSets = activeRoutineSets.map((routineSet: ExerciseSet) => {
      return routineSet.id === routineSetId ? { ...routineSet, ...attrsToMerge } : routineSet;
    });
    if (activeRoutineId) {
      setRoutineSets({ ...routineSets, [activeRoutineId]: newActiveRoutineSets });
    }
  };

  const saveRoutine = () => {
    if (activeRoutineSets) {
      const routineSets = activeRoutineSets.flatMap((activeExerciseSet: ExerciseSet, index: number) => {
        if (activeExerciseSet.id) {
          return [
            new RoutineSet({
              routineId: activeRoutine.id,
              exerciseSetId: activeExerciseSet.id,
              ordering: index
            })
          ];
        } else {
          return [];
        }
      });
      postRoutine({
        routine: activeRoutine,
        exerciseSets: activeRoutineSets,
        routineSets
      });
    }
  };

  return (
    <Main>
      <h1>Edit Routines</h1>
      <Dropdown
        activeIndex={activeIndex}
        options={routines.map((routine, index) => ({ value: index, label: routine.name }))}
        onChange={event => setActiveIndex(Number(event.currentTarget.value))}
        name={'Routines'}
      />
      <DragAndDropRegion onDragEnd={onDragEnd}>
        {activeRoutineSets.map((set: ExerciseSet) => (
          <EditFormRow key={set.id} exercises={exercises} routineSet={set} updateRoutineSets={updateRoutineSets} />
        ))}
      </DragAndDropRegion>
      <ButtonContainer>
        <LinkButton to="/home" text="Cancel" />
        <Button onClick={saveRoutine} text={'Save'} buttonType={'action'} />
      </ButtonContainer>
    </Main>
  );
}

export default withRouter(EditScreen);
