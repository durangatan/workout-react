import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LinkStyled = styled(Link)<LinkButtonProps>`
  padding: 24px;
  text-align: center;

  text-decoration: none;
  background: ${({ theme, buttonType }) => getBackgroundColor(buttonType, theme)};
  border-radius: 12px;
  color: ${({ theme, buttonType }) => getFontColor(buttonType, theme)};
`;
type ButtonType = 'default' | 'action';

const getBackgroundColor = (buttonType: ButtonType, theme: any): string => {
  switch (buttonType) {
    case 'default': {
      return theme.color.gray;
    }
    case 'action': {
      return theme.color.blue;
    }
    default: {
      return theme.color.gray;
    }
  }
};

const getFontColor = (buttonType: ButtonType, theme: any): string => {
  switch (buttonType) {
    case 'default': {
      return theme.color.black;
    }
    case 'action': {
      return theme.color.white;
    }
    default: {
      return theme.color.black;
    }
  }
};

type LinkButtonProps = {
  to: string;
  text: string;
  buttonType: ButtonType;
};

export default function LinkButton(props: LinkButtonProps) {
  return <LinkStyled {...props}>{props.text}</LinkStyled>;
}

LinkButton.defaultProps = {
  buttonType: 'default'
};
