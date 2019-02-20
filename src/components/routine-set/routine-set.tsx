import React from 'react';
import styled from 'styled-components';

import Exercise from '../exercise';
import { renderIf } from '../util';
import { Table } from '../elements';

const RoutineSetContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export default function RoutineSet({ routineSet }: { routineSet: any }) {
	return (
		<RoutineSetContainer>
			<Exercise
				exercise={routineSet.exercise}
				setType={routineSet.type}
			/>
			<Table
				rows={[
					['Weight', 'Reps'],
					[routineSet.weight, routineSet.repetitions]
				]}
			/>
			{renderIf(
				Boolean(routineSet.notes),
				<h3>Notes: {routineSet.notes}</h3>
			)}
		</RoutineSetContainer>
	);
}