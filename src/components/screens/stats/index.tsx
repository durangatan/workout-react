import React, { useEffect, useState } from 'react';
import { getWorkouts } from '../../../api';
import { Main } from '../../page';
import { formattedTime } from '../../util';
export default function Stats() {
	const [workouts, setWorkouts] = useState<Array<any>>([]);
	useEffect(() => {
		setWorkouts([{ endTime: 3000, startTime: 1000 }]);
		// getWorkouts().then(setWorkouts);
	},[]);
	return (
		<Main>
			<h1>Stats</h1>
			<div>
				{workouts.map(workout => {
          const totalTime = workout.endTime - workout.startTime;
					return <div>Total Time: {formattedTime(totalTime)}</div>;
				})}
			</div>
		</Main>
	);
}
