import { useMemo } from 'react';
import { Workout } from 'workout-models';

export type WorkoutTotals = {
  totalWeight: number;
  totalTime: number;
  totalSets: number;
};

export default function(workouts: Array<Workout>) {
  return useMemo<WorkoutTotals>(
    () =>
      workouts.reduce<WorkoutTotals>(
        (acc, workout) => ({
          totalTime: acc.totalTime + workout.totalTime,
          totalWeight:
            acc.totalWeight +
            (workout.completedExerciseSets
              ? workout.completedExerciseSets.reduce<number>((acc, completedSet) => acc + completedSet.weight, 0)
              : 0),
          totalSets: acc.totalSets + (workout.completedExerciseSets ? workout.completedExerciseSets.length : 0)
        }),
        { totalWeight: 0, totalTime: 0, totalSets: 0 }
      ),
    [workouts]
  );
}
