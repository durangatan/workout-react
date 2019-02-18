import React, { ReactNode } from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div<ModalProps>`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  background: ${props => props.theme.color.white};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
};

export default function Modal({ isOpen, children }: ModalProps) {
  return <ModalContainer isOpen={isOpen}>{children}</ModalContainer>;
}
