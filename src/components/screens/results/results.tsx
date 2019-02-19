import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { formattedTime } from '../../util';
import { postWorkout } from '../../../api';
import { LinkButton } from '../../elements';
import { ButtonContainer } from '../../elements/button';
function Results({ location }: RouteComponentProps) {
  const routineName = location.state.routine.name;
  const numberOfSets = location.state.completedSets.length;
  const totalWeight = location.state.completedSets.reduce((acc: number, currentSet: any) => acc + currentSet.weight, 0);
  const startTime = location.state.initialTime;
  const endTime = location.state.currentTime;
  const totalTimeMs = location.state.currentTime - location.state.initialTime;

  useEffect(() => {
    postWorkout({
      routines: [location.state.routine],
      startTime,
      endTime,
      completedSets: location.state.completedSets
    });
  }, []);

  return (
    <div>
      <h1>Results</h1>
      <ul>
        <li>You completed {routineName}</li>
        <li>{numberOfSets} sets</li>
        <li>You lifted {totalWeight} lbs</li>
        <li>Workout Length: {formattedTime(totalTimeMs)}</li>
      </ul>
      <ButtonContainer>
        <LinkButton to={'/home'} text="home" buttonType={'action'} />
        <LinkButton to={'/stats'} text="Stats" />
      </ButtonContainer>
    </div>
  );
}

export default withRouter(Results);
