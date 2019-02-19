import * as React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import ebcTheme from '../theme';

const GlobalStyles = createGlobalStyle`
    body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 100%;
  overflow-x: hidden;
}
* {
  box-sizing: border-box;
  list-style-type: none;
}
`;

const Container = styled.div`
  font-size: ${({ theme }) => theme.font.size.p};
  h1 {
    font-size: ${({ theme }) => theme.font.size.h1};
  }
  h2 {
    font-size: ${({ theme }) => theme.font.size.h2};
  }
  h3 {
    font-size: ${({ theme }) => theme.font.size.h3};
  }
  h4 {
    font-size: ${({ theme }) => theme.font.size.h4};
  }
`;

type PageProps = {
  children: React.ReactChild;
};

export default function Page({ children }: PageProps) {
  return (
    <ThemeProvider theme={ebcTheme}>
      <React.Fragment>
        <GlobalStyles />
        <Container>{children}</Container>
      </React.Fragment>
    </ThemeProvider>
  );
}
