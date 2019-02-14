import React, { useState, useEffect } from 'react';
import ebcSets from '../../mocks';
export default function Workout() {
  const [sets, setSets] = useState<Array<any>>([]);
  useEffect(() => setSets(ebcSets), []);
  return (
    <div>
      <h1>Workout</h1>
      {sets.map(set => (
        <div>{set.exercise}</div>
      ))}
    </div>
  );
}
