import React from 'react';
import styled from 'styled-components';

import { ButtonType, getBackgroundColor, getFontColor } from '../link-button';

type ButtonProps = {
  onClick: () => void;
  text: string;
  buttonType: ButtonType;
};

const ButtonStyled = styled.button<ButtonProps>`
  text-align: center;
  padding: 24px;
  text-decoration: none;
  background: ${({ theme, buttonType }) => getBackgroundColor(buttonType, theme)};
  border-radius: 12px;
  color: ${({ theme, buttonType }) => getFontColor(buttonType, theme)};
`;

export default function Button(props: ButtonProps) {
  return <ButtonStyled {...props}>{props.text}</ButtonStyled>;
}

export const ButtonContainer = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

Button.defaultProps = {
  buttonType: 'Default'
};
