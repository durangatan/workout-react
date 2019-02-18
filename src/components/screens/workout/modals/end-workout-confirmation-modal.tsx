import React from 'react';
import { Button } from '../../../elements';
import { ButtonContainer } from '../../../elements/button';

type ConfirmationModalProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

export default function EndWorkoutConfirmationModal({ onCancel, onConfirm }: ConfirmationModalProps) {
  return (
    <React.Fragment>
      <h1>Are You Sure You Want To End This Workout?</h1>
      <ButtonContainer>
        <Button onClick={onCancel} text={'Go Back'} buttonType={'default'} />
        <Button onClick={onConfirm} text={'End Workout'} buttonType={'action'} />
      </ButtonContainer>
    </React.Fragment>
  );
}
