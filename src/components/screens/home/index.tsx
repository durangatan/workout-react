import React from 'react';
import styled from 'styled-components';
import { LinkButton } from '../../elements';

const HomeContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  a {
    width: 100%;
    font-size: ${({ theme }) => theme.font.size.h2};
    padding: 100px 25px;
  }
`;

const NavContainer = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: space-between;
  justify-content: space-between;
  width: 100%;
  a {
    font-size: ${({ theme }) => theme.font.size.h3};
    margin: 15px;
  }
`;

export default function Home() {
  return (
    <HomeContainer>
      <h1>My EBC </h1>
      <LinkButton to="/workout" text="START WORKOUT" buttonType="action" />
      <NavContainer>
        <LinkButton to="/edit" text="Edit" />
        <LinkButton to="/stats" text="Stats" />
      </NavContainer>
    </HomeContainer>
  );
}
