import React, { useState, useEffect, useRef, ReactNode } from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ReactSwipe from 'react-swipe';
import { getRoutine } from '../../../api';
import { renderIf, formattedTime } from '../../util/';
import { Button, Table } from '../../elements';
import { ButtonContainer } from '../../elements/button';
import { EndWorkoutConfirmationModal } from './modals';
import { Main } from '../../page';
import RoutineSet from '../../routine-set';

function Timer({
	initialTime,
	currentTime
}: {
	initialTime: number;
	currentTime: number;
}) {
	return;
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
		history.replace('/results', {
			routine,
			completedSets,
			initialTime,
			currentTime
		});
	};

	return (
		<Main>
			<h2>{routine.name}</h2>
			<Table
				rows={[
					['Time Elapsed', 'Sets Completed', 'Sets Remaining'],
					[
						formattedTime(Math.floor(currentTime - initialTime)),
						completedSets.length,
						incompleteSets.length
					]
				]}
			/>

			<ReactSwipe childCount={incompleteSets.length} ref={slideRef}>
				{incompleteSets.map(incompleteSet => (
					<div>
						<RoutineSet
							routineSet={incompleteSet}
							key={incompleteSet.id}
						/>
					</div>
				))}
			</ReactSwipe>
			<ButtonContainer>
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
						setsCopy[currentSetIndex] = {
							...sets[currentSetIndex],
							completed: true
						};
						setSets(setsCopy);
					}}
					text={'Complete Set'}
					buttonType={'success'}
				/>
				<Button
					onClick={openModal}
					text={'End Workout'}
					buttonType={'error'}
				/>
			</ButtonContainer>
		</Main>
	);
}

export default withRouter(Workout);
