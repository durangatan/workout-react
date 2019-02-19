import React, { useState, useEffect, useRef, ReactNode } from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ReactSwipe from 'react-swipe';
import { getRoutine } from '../../../api';
import { renderIf, formattedTime } from '../../util/';
import { Button } from '../../elements';
import { EndWorkoutConfirmationModal } from './modals';
import { Main } from '../../page';

function Timer({ initialTime, currentTime }: { initialTime: number; currentTime: number }) {
  return <div>Time Elapsed: {formattedTime(Math.floor(currentTime - initialTime))}</div>;
}

function Exercise({ exercise }: { exercise: any }) {
  return (
    <div>
      <h3>{exercise.name}</h3>
      {renderIf(Boolean(exercise.machineId), <div>Machine ID: {exercise.machineId}</div>)}
      {renderIf(Boolean(exercise.rangeSetting), <div>Range Setting: {exercise.rangeSetting}</div>)}
      {renderIf(Boolean(exercise.seatSetting), <div>Seat Setting: {exercise.seatSetting}</div>)}
      {renderIf(Boolean(exercise.notes), <div>{exercise.notes}</div>)}
    </div>
  );
}

function RoutineSet({ routineSet }: { routineSet: any }) {
  return (
    <div>
      <Exercise exercise={routineSet.exercise} />
      <div>Weight: {routineSet.weight}</div>
      <div>Reps: {routineSet.repetitions}</div>
      {renderIf(routineSet.type !== 'Default', <div>{routineSet.type}</div>)}
      {renderIf(Boolean(routineSet.notes), <div>Notes: {routineSet.notes}</div>)}
    </div>
  );
}

type WorkoutScreenProps = {
  toggleModal: (modalShouldOpen: boolean, modalChildren: ReactNode) => void;
} & RouteComponentProps;

function Workout({ history, toggleModal }: WorkoutScreenProps) {
  const [routine, setRoutine] = useState<any>({});
  const [sets, setSets] = useState<Array<any>>([]);
  const incompleteSets = sets.filter(set => !set.completed);
  const completedSets = sets.filter(set => set.completed);
  const [initialTime] = useState<number>(Date.now());
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  const [currentSetIndex, setCurrentSetIndex] = useState<number>(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  });

  useEffect(() => {
    getRoutine(1).then(routine => {
      setRoutine(routine);
      setSets(routine.sets);
    });
  }, []);

  const slideRef = useRef(null);

  const openModal = () => {
    toggleModal(
      true,
      <EndWorkoutConfirmationModal
        onCancel={() => toggleModal(false, null)}
        onConfirm={() => {
          toggleModal(false, null);
          endWorkout();
        }}
      />
    );
  };

  const endWorkout = () => {
    history.replace('/results', { routine, completedSets, initialTime, currentTime });
  };

  return (
    <Main>
      <h1>{routine.name}</h1>
      <Timer initialTime={initialTime} currentTime={currentTime} />
      <div>Sets Completed: {completedSets.length}</div>
      <div>Sets Remaining: {incompleteSets.length}</div>

      <ReactSwipe childCount={incompleteSets.length} ref={slideRef}>
        {incompleteSets.map(incompleteSet => (
          <div>
            <RoutineSet routineSet={incompleteSet} key={incompleteSet.id} />
          </div>
        ))}
      </ReactSwipe>
      <Button
        onClick={() => {
          if (!incompleteSets.length) {
            endWorkout();
          }
          const currentSlideRef: any = slideRef.current;
          if (currentSlideRef) {
            currentSlideRef.swipe.next();
          }
          setCurrentSetIndex(currentSetIndex + 1);
          const setsCopy = [...sets];
          setsCopy[currentSetIndex] = { ...sets[currentSetIndex], completed: true };
          setSets(setsCopy);
        }}
        text={'Complete Set'}
        buttonType={'action'}
      />
      <Button onClick={openModal} text={'End Workout'} buttonType={'default'} />
    </Main>
  );
}

export default withRouter(Workout);
